/* eslint-disable */
export const sendEvent = (action, data = {}) => {
  fetch(`https://www.expertvoice.com/xapi/ac/pub/1.0/event`, {
    method: "POST",
    body: JSON.stringify({
      action,
      appName: "ev-shop-plugin",
      data: {
        version: browser.runtime.getManifest().version,
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
  })
    // .then((res) => console.log("sendEvent", res))
    // .catch((err) => console.log("sendEventErr", err));
};

export const loadContext = async (pageData) => {
  try {
    const response = await fetch(
      `https://www.expertvoice.com/xapi/browser-support/pub/1.0/search`,
      {
        method: "POST",
        body: JSON.stringify({
          ...pageData,
          maxResults: 1,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Re-throw the error so that it can be handled in your component
  }
};