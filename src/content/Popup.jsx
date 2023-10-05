/* eslint-disable  */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import BrandMatch from './BrandMatch';
import LoginForm from './LoginForm';
import ReportForm from './ReportForm';
import ProductMatch from './ProductMatch';

import {
  AnalyticEvent,
  ClosebtnIcon,
  CtaType,
  ExpertVoiceIcon,
  MessageType,
  NotificationType,
  PopupMode,
} from '../constants';
import { getEVHomeUrl, sendAC } from '../helper';

/**
 * EV Shop Extension Popup
 */
function Popup(props) {
  const [mode, setMode] = useState(props.mode);
  // const [isSignIn , setSignIn] = useState(false);
  const [hoverValue, setHoverValue] = useState("")

  useEffect(() => {
    // Bind the message listener to respond to the background worker
    const listener = (msg) => {
      if (msg.type === MessageType.LOGIN_SHOW) {
        setMode(PopupMode.LOGIN);
        return false;
      }
      return true;
    };

    browser.runtime.onMessage.addListener(listener);
    return () => {
      browser.runtime.onMessage.removeListener(listener);
    };
  });
  if (mode === PopupMode.LOGIN) {
    return (
      <LoginForm
        onCancel={() => setMode(null)}
        onClose={props.onClose}
        onLogin={(u) => {
          if (u) {
            props.onLogin(u);
            setMode(null);
          }
        }}
      />
    );
  }

  if (mode === PopupMode.REPORT) {
    return (
      <ReportForm
        onClose={props.onClose}
        onFinish={() => setMode(null)}
      />
    );
  }

  const sendCtaClickEvent = (type = CtaType.BRAND, source = 'button') => () => {
    sendAC(AnalyticEvent.CTA_CLICK, {
      brand: props.brand || null,
      product: props.product || null,
      source,
      type,
    });
  };

  const popupStyle = {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "3px",
    boxShadow: "rgba(107, 101, 95, 0.2) 0px 1px 2px 1px",
    position: "fixed",
    right: "12px",
    top: "12px",
    width: "300px",
    zIndex: 2147483647,
  };

  const panelHeaderStyle = {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: "8px",
    borderBottom: "1px solid rgb(227, 227, 227)",
  };

  const titleText = {
    color: "rgb(37, 37, 37)",
    fontWeight: 401,
    margin: "0px 6px",
  };

  const badgeSuccess = {
    backgroundColor: props.notification === NotificationType.ACTIVE ? "rgb(82, 179, 130)" : "rgb(227, 227, 227)",
    borderRadius: "6px",
    fontWeight: 401,
    height: "22px",
    textAlign: "center",
    width: "22px",
  };

  const actionStyle = {
    alignItems: "center",
    display: "flex",
    flex: "1 1 auto",
    justifyContent: "flex-end",
  };

  const closeBtnStyles = {
    color: "rgb(117, 117, 117)",
    background: "none",
    border: "none",
    cursor: "pointer",
    margin: "0px",
    outline: "none",
    padding: "0px",
    textDecoration: "none",
  };

  const closeIcon = {
    position: "relative",
    top: "2px",
    fontSize: "18px",
  };

  const panelBodyStyle = {
    padding: "18px",
    textAlign: "center",
  };

  const btnLoginStyles = {
    margin: "12px 0px",
    background: hoverValue === "signInBtn" ? "rgb(227, 62, 56)" : "rgb(252, 69, 64)",
    color: "rgb(255, 255, 255)",
    borderRadius: "3px",
    display: "block",
    fontFamily: "inherit",
    fontSize: "15px",
    fontWeight: 600,
    padding: "12px",
    textAlign: "center",
    width: "100%",
    cursor: "pointer",
    border: "medium"
  };

  const tertiaryTextStyles = {
    fontSize: "13px",
    fontWeight: 400,
    lineHeight: "18px",
    color: "rgb(117, 117, 117)",
  };

  const reportIssueStyles = {
    margin: "18px 0px 0px",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "18px",
    color: "rgb(117, 117, 117)",
  };

  const btnReport = {
    textDecoration: "underline",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "18px",
    color: "rgb(117, 117, 117)",
    background: "none",
    border: "none",
    cursor: "pointer"
  };

  const signOutBtn = {
    background: "none",
    border: "medium",
    textDecoration: "underline",
    color: "rgb(117, 117, 117)",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "400"
  };

  const ExpertVoiceIconStyle = {
    height: "20px",
    width: "20px"
  }

  const ClosebtnIconStyle = {
    height: "27px",
    opacity: hoverValue === "closeIconBtn" ? "0.9" : "0.6"
  }

  const typetitle = {
    fontSize: "17px",
    fontWeight: "400",
    lineHeight: "24px",
    color: "rgb(38,40,39)",
    marginTop: "0px"
  }
  
  const subtextStyle = {
    marginTop: "18px",
    color: "rgb(141, 137, 137)",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "18px",
  }

  const samplepanelStyle = {
    backgroundColor: "rgb(242,242,242)",
    margin: "23px 0",
    padding: "7px"
  }

  const smallTextStyle = {
    fontSize: "12px",
    fontWeight: "410",
    lineHeight: "18px",
    marginTop: "-2px",
    color: "rgb(102,99,99)"
  }

  const tertiSmallLinkStyle = {
    lineHeight: "19px",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "18px",
    color: "rgb(117, 117, 117)",
    textDecoration: "none"
  }

  return (
    <section className="panel" id="popup" style={popupStyle}>
      <header className="panel-header" style={panelHeaderStyle}>
        {/* <i className="exp-ux-bolt exp-ux-small ev-logo" /> */}
        <img src={ExpertVoiceIcon} alt="" style={ExpertVoiceIconStyle} />
        <span className="title-text" style={titleText}>Tips</span>
        {props.notification ? (
          <div className={`badge badge-${props.notification === NotificationType.ACTIVE ? 'success' : 'secondary'}`}
            style={badgeSuccess}>1</div>
        ) : null}

        <div className="actions" style={actionStyle}>
          <button
            className="btn-icon close-button"
            onClick={props.onClose}
            type="button"
            style={closeBtnStyles}
          >
            {/* <i className="exp-ux-close exp-ux-small" /> */}
            <img src={ClosebtnIcon} alt="" style={ClosebtnIconStyle}
            onMouseEnter={() => setHoverValue("closeIconBtn")}
            onMouseLeave={() => setHoverValue("")} 
            />
          </button>
        </div>
      </header>

      <main className="panel-body" style={panelBodyStyle}>
        {props.product && props.brand?.active ? (
          <ProductMatch
            brand={props.brand}
            notification={props.notification}
            product={props.product}
            page={props.page}
            sendCtaClickEvent={sendCtaClickEvent}
            user={props.user}
          />
        ) : (
          props.brand ? (
            <BrandMatch
              brand={props.brand}
              sendCtaClickEvent={sendCtaClickEvent}
              user={props.user}
            />
          ) : (
            <>
              <h1 className="type-title" style={typetitle}>No tips for this page</h1>
              <p className="subtext tertiary-text small-text" style={subtextStyle}>
                As you browse Amazon.com, we&apos;ll automatically look for
                brands that may offer you exclusive discounts on ExpertVoice.
              </p>
              <div className="sample-panel" style={samplepanelStyle}>
                <img
                  alt="Example"
                  style={{ marginBottom: "12px" }}
                  className="sample-image"
                  src={browser.runtime.getURL('assets/images/preview.png')}
                />
                <p className="small-text" style={smallTextStyle}>An alert will let you know when there may be a relevant offer on ExpertVoice.</p>
              </div>
            </>
          )
        )}

        <div className="learn-more">
          {props.user ? (
            <p className="tertiary-text small-text" style={{ color: "rgb(117, 117, 117)", fontSize: "12px", fontWeight: "400" }}>
              Signed in as {props.user.firstName} {props.user.lastName}.
              <button
                className="btn-logout link tertiary-text small-text"
                onClick={props.onLogout}
                type="button"
                style={signOutBtn}
              >
                Sign out
              </button>
            </p>
          ) : (
            <>
              {!props.brand ? (
                <p className="tertiary-text small-text" style={tertiSmallLinkStyle}>
                  Sign in to ExpertVoice to get more accurate tips.
                </p>
              ) : null}
              <button
                className="btn btn-primary btn-login"
                onClick={() => {
                  setMode(PopupMode.LOGIN);
                  
                }}
                onMouseEnter={() => setHoverValue("signInBtn")}
                onMouseLeave={() => setHoverValue("")}
                style={btnLoginStyles}
                type="button"
              >
                Sign in
              </button>
              <p className="tertiary-text small-text"
                style={tertiaryTextStyles}>
                Learn more about
                <> </>
                <a
                  className="link"
                  style={{ textDecoration: "underline", color: "rgb(117, 117, 117)" }}
                  href={getEVHomeUrl()}
                  onClick={sendCtaClickEvent(CtaType.EV_HOME, 'learn')}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  ExpertVoice
                </a>
              </p>
            </>
          )}
        </div>

        <p className="report-issue tertiary-text small-text" style={reportIssueStyles}>
          Does something look wrong?
          <button
            className="btn-report link tertiary-text small-text"
            style={btnReport}
            onClick={() => {
              setMode(PopupMode.REPORT);
            }}
            type="button"
          >
            Report an issue
          </button>
        </p>
      </main>
    </section>
  );
}

Popup.defaultProps = {
  brand: null,
  mode: null,
  notification: null,
  page: {},
  product: null,
  user: null,
};

Popup.propTypes = {
  brand: PropTypes.shape({
    active: PropTypes.bool,
    avatar: PropTypes.string,
    discount: PropTypes.number,
    name: PropTypes.string.isRequired,
    orgId: PropTypes.number.isRequired,
    rewarded: PropTypes.bool,
    targeted: PropTypes.bool,
    url: PropTypes.string.isRequired,
  }),
  mode: PropTypes.string,
  notification: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  page: PropTypes.shape({
    price: PropTypes.string,
  }),
  product: PropTypes.shape({
    accessConfirmed: PropTypes.bool,
    name: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};

export default Popup;