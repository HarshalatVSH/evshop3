/* eslint-disable  */
import { AnalyticEvent, CdnUrlBase, MessageType, NotificationType, UrlBase } from "./constants";
import { getAuthCookie, getCacheable, getNotificationType, isAuthCookie, isAuthenticated, toAbsoluteUrl, removeFromCache} from "./helper";

const ACTIVE_ICONS = {
  16: "assets/images/icon16.png",
  48: "assets/images/icon48.png",
  128: "assets/images/icon128.png",
};

const INACTIVE_ICONS = {
  16: "assets/images/icon16_gray.png",
  48: "assets/images/icon48_gray.png",
  128: "assets/images/icon128_gray.png",
};

const loadUser = () =>
  getCacheable(
    "user",
    async () => {
      // Quick check of the auth cookie to see if the user is even logged in
      const authed = await isAuthenticated();
      if (authed) {
        // Load the user's details
        const res = await fetch(`${UrlBase}/xapi/user/ext/1.0/users/me`);
        if (res.ok) {
          const data = await res.json();
          return {
            avatar: data.avatar,
            firstName: data.firstName,
            lastName: data.lastName,
            userId: data.userId,
            uuid: data.uuid,
          };
        }

        return null;
      }

      return null;
    },
    { ttl: 86400000 }
  ); // 1 day

const loadContext =  (data,params) => {
  try {
    let [brand] = data.brands || [];
    let [product] = data.products || [];
    if (brand) {
      brand = {
        accessType: brand.accessType,
        active: brand.active,
        avatar: toAbsoluteUrl(brand.avatarUrl, CdnUrlBase),
        discount: brand.discount,
        exactMatch: brand.exactMatch,
        name: brand.text,
        orgId: brand.orgId,
        orgKey: brand.orgKey,
        rewarded: brand.accessType === "REWARDED",
        score: brand.score,
        targeted: brand.accessType !== "UNKNOWN",
        url: toAbsoluteUrl(brand.url),
      };
    }
    if (product && brand?.orgId === product.orgId) {
      product = {
        accessConfirmed: product.accessConfirmed,
        bestPrice: product.bestPrice,
        currencyCode: product.currencyCode,
        discountPct: product.discountPct,
        exactMatch: product.exactMatch,
        imageUrl: product.imageUrl,
        inStock: product.inStock,
        msrp: product.msrp,
        name: product.text,
        orgId: product.orgId,
        pdpUrl: toAbsoluteUrl(product.pdpUrl),
        price: product.price,
        productCode: product.productCode,
        reviewCount: product.reviewCount,
        reviewRating: product.reviewRating,
        reviewStars: product.reviewStars,
        score: product.score,
      };
    } else {
      product = undefined;
    }
    return {
      brand,
      page: params,
      product,
    };
  } catch (ex) {
    // ignore
  }
  return null;
};

  
const sendEvent = (action, data = {}) => {
  fetch(`${UrlBase}/xapi/ac/pub/1.0/event`, {
    method: "POST",
    body: JSON.stringify({
      action,
      appName: "ev-shop-plugin",
      data: {
        version: chrome.runtime.getManifest().version,
        ...data,
      },
      mfgId: data?.mfgId || data?.orgId || undefined,
      url: data?.url || undefined,
      version: 1,
    }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => console.log(res,"helperRes"))
  .catch((err) => console.log(err,"helperErr"));;
};

const syncBadge = (tabId, context, user) => {
  if (context) {
    const notif = getNotificationType(context, user);
    if (context?.brand?.active && notif) {
      // We got a high-confidence match, update the icon to be 'active'.
      browser.browserAction.setIcon({ tabId, path: ACTIVE_ICONS });
      browser.browserAction.setBadgeText({ tabId, text: "1" });
      browser.browserAction.setBadgeBackgroundColor({
        tabId,
        color: notif === NotificationType.ACTIVE ? "#52B382" : "#E3E3E3",
      });
    } else {
      // Keep the extension icon in the 'inactive' state.
      browser.browserAction.setIcon({ tabId, path: INACTIVE_ICONS });
      browser.browserAction.setBadgeText({ tabId, text: "" });
    }
  } else {
    browser.browserAction.setIcon({ tabId, path: INACTIVE_ICONS });
    browser.browserAction.setBadgeText({ tabId, text: "" });
  }
};

const syncContext = (tabId, context, user) => {
  browser.tabs.sendMessage(tabId, { type: MessageType.DATA, context, user });
};

const triggerSync = async (tabId, user, sendResponse) => {
  const context = await browser.tabs.sendMessage(tabId, { type: MessageType.SYNC, user });
  if (context.brand) {
    syncBadge(tabId, context, user);
    syncContext(tabId, context, user);
  }
  if (sendResponse) {
    sendResponse({
      ...context,
      user,
    });
  }
};
browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.type || "") {
    case MessageType.AC:
      if(msg.data){
        sendEvent(msg.action, msg.data);
        // event(msg.action, msg.data);
      }
      break;
    case MessageType.CONTEXT:
      // Search for the brand & load the user
      let contextApiData = msg.data.apiData;
      let params = msg.data.pageData;

    let contextData = loadContext(contextApiData,params)
      Promise.all([loadUser()]).then(([user]) => {
        // Sync the badge with the brand results
        syncBadge(sender.tab.id, contextData, user);
        syncContext(sender.tab.id, contextData, user);

        sendResponse({
          ...contextData,
          user,
        });
      });
      break;
    case MessageType.LOGIN:
      fetch(`${UrlBase}/sign-on/service/sign-in`, {
        method: "POST",
        body: `identifier=${encodeURIComponent(msg.identifier)}&password=${encodeURIComponent(msg.password)}`,
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          sendResponse(data);
        });
      break;
    case MessageType.LOGOUT:
      // Fire the sign-out request so on-platform things happen.
      fetch(`${UrlBase}/sign-out`, {
        credentials: "include",
        redirect: "follow",
      }).then(async (res) => {
        if (res.ok) {
          // Clear the cached results
          await removeFromCache("user");
        }

        return sendResponse(res.ok);
      });
      break;
    case MessageType.RESET:
      triggerSync(sender.tab.id, msg.user, sendResponse);
      break;
    case MessageType.LOGIN_START:
      browser.tabs.sendMessage(sender.tab.id, { type: MessageType.LOGIN_SHOW });
      break;
    default:
      return false;
  }

  return true; // Tell chrome it's asynchronous
});

// Send an AC event when the user first installs
browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === browser.runtime.OnInstalledReason.INSTALL) {
    sendEvent(AnalyticEvent.INSTALL);
  }
});

// Trigger the content popup on the tab where the action (extension icon) was clicked
browser.browserAction?.onClicked.addListener((tab) => {
  browser.tabs.sendMessage(tab.id, { type: MessageType.OPEN });
  // browser.runtime.sendMessage(tab.id, { type: MessageType.OPEN });
});

// Watch for changes to the auth cookie to maintain the auth state
browser.cookies.onChanged.addListener(async (e) => {
  // Check if this is our auth cookie
  if (isAuthCookie(e.cookie)) {
    const c = await getAuthCookie();
    if (!c) {
      // The user signed out. Clear the user state.
      removeFromCache("user");
    }
  }
});

// Trigger a sync event whenever a tab is reactivated
browser.tabs.onActivated.addListener(async () => {
  try {
    const user = await loadUser();

    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

    triggerSync(tab.id, user);
  } catch (ex) {
    // ignore
  }
});