/* eslint-disable  */
import React, { useState } from "react";
import PropTypes from "prop-types";

import { AnalyticEvent, BackbtnIcon, ClosebtnIcon, MessageType } from "../constants";
import { sendAC } from "../helper";
import { ErrorAlert } from "../components/Alert";
import { FormValidation, btnIconStyles, closeBtnStyles, formDivStyles, panelActionsStyles, panelBody, panelHeaderStyles, passwordLabelStyles, popupStyles, signUpLinkStyles, subTextStyles, titleTextStyles, userNameLabelStyles } from "./LoginFormCSS";


const Errors = {
  "signIn.invalid": "Oops. this account information was not recognized.",
  "signIn.locked": "Looks like it's time to change your password. Give it a quick update and try logging in again.",
  "signIn.unauthorized": "Uh oh, the account information you entered is incorrect.",
  "signIn.restricted": "Uh oh, looks like your access to ExpertVoice has been disabled. Contact your store manager or HR department to find out why.",
  "signIn.serviceError": "Sorry, we can't log you in right now. Please come back in a few minutes and try again.",
};

/**
 * Login Form
 */
function LoginForm(props) {
  const [error, setError] = useState(null);
  const [identifier, setIdentifier] = useState("");
  const [interactions, setInteractions] = useState({});
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hoverValue, setHoverValue] = useState("")

  // const popupStyles = {
  //   backgroundColor: "rgb(255, 255, 255)",
  //   borderRadius: "3px",
  //   boxShadow: "rgba(107, 101, 95, 0.2) 0px 1px 2px 1px",
  //   position: "fixed",
  //   right: "12px",
  //   top: "12px",
  //   width: "300px",
  //   zIndex: 2147483647,
  // };

  // const panelHeaderStyles = {
  //   borderBottom: "1px solid rgb(227, 227, 227)",
  //   alignItems: "center",
  //   display: "flex",
  //   justifyContent: "space-between",
  //   padding: "8px",
  // };

  // const btnIconStyles = {
  //   marginRight: "6px",
  //   color: "rgb(117, 117, 117)",
  //   background: "none",
  //   border: "medium"
  // };

  // const titleTextStyles = {
  //   color: "rgb(37, 37, 37)",
  //   fontWeight: 400,
  //   margin: "0px 0px -1px",
  //   fontSize: "14px"
  // };

  // const panelActionsStyles = {
  //   alignItems: "center",
  //   display: "flex",
  //   flex: "1 1 auto",
  //   justifyContent: "flex-end",
  // };

  // const closeBtnStyles = {
  //   color: "rgb(117, 117, 117)",
  //   background: "none",
  //   border: "medium"
  // }

  // const panelBody = {
  //   padding: "18px",
  //   textAlign: "center"
  // }

  // const formDivStyles = {
  //   position: "relative",
  //   marginBottom: "24px",
  // };

  const usenameInputStyles = {
    background: hoverValue === "username" ? "rgb(237,237, 237)" : "rgb(247,247, 247)",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    borderImage: "initial",
    borderBottom: hoverValue === "username" ? "1px solid black" :
      (hoverValue === "user_change" && identifier) && "1px solid rgb(60, 152, 199)",
    borderRadius: "3px 3px 0px 0px",
    color: "rgb(79, 77, 77)",
    fontSize: "inherit",
    outline: "none",
    padding: "16px 12px 14px",
    width: "90%",
  };

  // const userNameLabelStyles = {
  //   display: "none",
  //   pointerEvents: "none",
  //   position: "absolute",
  //   top: "4px",
  // };

  const isDisabled = !identifier || !password;

  const btnDisableStyles = {
    borderRadius: "3px",
    display: "block",
    fontFamily: "inherit",
    fontSize: "15px",
    fontWeight: 600,
    padding: "12px",
    textAlign: "center",
    width: "100%",
    color: "rgb(255, 255, 255)",
    cursor: "pointer",
    background: isDisabled
      ? "rgb(252, 191, 189)"
      :
      hoverValue === "signInBtn" ?
        "rgb(227,62,56)" :
        "rgb(252, 69, 64)",
    border: "medium",
  };

  const passwordDivStyles = {
    background: hoverValue === "password" ? "rgb(237,237, 237)" : "rgb(247,247, 247)",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    borderImage: "initial",
    borderBottom: hoverValue === "password" ? "1px solid black" :
      (hoverValue === "pass_change" && password) && "1px solid rgb(60, 152, 199)",
    borderRadius: "3px 3px 0px 0px",
    color: "rgb(37, 37, 37)",
    fontSize: "inherit",
    outline: "none",
    padding: "16px 12px 14px",
    width: "90%",
    position: "relative",
    marginBottom: "2px",
  };

  // const passwordLabelStyles = {
  //   display: "none",
  //   pointerEvents: "none",
  //   position: "absolute",
  //   top: "4px",
  // };

  // const subTextStyles = {
  //   margin: "17px 0px 0px",
  //   fontSize: "12px",
  //   fontWeight: 400,
  //   lineHeight: "18px",
  //   color: "rgb(117, 117, 117)",
  //   width: "97%"
  // };

  // const signUpLinkStyles = {
  //   marginLeft: "3px",
  //   textDecoration: "underline",
  //   color: "rgb(117, 117, 117)",
  // };

  const ClosebtnIconStyle = {
    height: "27px",
    opacity: hoverValue === "closeIconBtn" ? "0.9" : "0.6",
    cursor: "pointer"
  }

  const BackbtnIconStyle = {
    height: "23px",
    opacity: hoverValue === "backIconBtn" ? "0.9" : "0.6",
    position: "relative",
    top: "2px",
    cursor: "pointer"
  }

  // const FormValidation = {
  //   color: "rgb(234, 77, 75)",
  //   fontSize: "12px",
  //   textAlign: "left"
  // }

return (
  <section className="panel" id="popup" style={popupStyles} >
    <header className="panel-header" style={panelHeaderStyles}>
      {submitting ? null : (
        <>
          <button
            className="btn-icon back-button"
            style={btnIconStyles}
            onClick={() => {
              props.onCancel();
            }}
            type="button"
          >
            {/* <i className="exp-ux-chevron exp-ux-medium" /> */}
            <img src={BackbtnIcon} alt="" style={BackbtnIconStyle}
              onMouseEnter={() => setHoverValue("backIconBtn")}
              onMouseLeave={() => setHoverValue("")} />
          </button>
          <span className="title-text" style={titleTextStyles}>Sign into ExpertVoice</span>
        </>
      )}

      <div className="actions" style={panelActionsStyles}>
        <button className="btn-icon close-button" style={closeBtnStyles} onClick={props.onClose} type="button">
          {/* <i className="exp-ux-close exp-ux-small" /> */}
          <img src={ClosebtnIcon} alt="" style={ClosebtnIconStyle} onMouseEnter={() => setHoverValue("closeIconBtn")}
            onMouseLeave={() => setHoverValue("")} />
        </button>
      </div>
    </header>
    <main className="panel-body" style={panelBody}>
      <form
        className="login-form exp-form"
        onSubmit={async (e) => {
          e.preventDefault();

          setError(null);
          setSubmitting(true);

          // const res = await browser.runtime.sendMessage({ identifier, password, type: MessageType.LOGIN });
          fetch(`https://www.expertvoice.com/sign-on/service/sign-in`, {
            method: "POST",
            body: `identifier=${encodeURIComponent(identifier)}&password=${encodeURIComponent(password)}`,
            credentials: "include",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              // sendResponse(data);
              setSubmitting(false);

              if (res?.error) {
                setError(res.error);
                sendAC(AnalyticEvent.LOGIN_ERROR, { error: res.error });
              } else if (res?.user) {
                props.onLogin(res.user);
                sendAC(AnalyticEvent.LOGIN);
              }
            });
        }}
      >
        {error ? <ErrorAlert style={FormValidation} className="form-error">{Errors[error] || "Oops. Something went wrong. Please try again."}</ErrorAlert> : null}

        <div className="form-control" style={formDivStyles}>
          <input
            autoCapitalize="off"
            autoCorrect="off"
            id="identifier"
            name="identifier"
            style={usenameInputStyles}
            onBlur={() => {
              setInteractions({ ...interactions, identifier: true });
            }}
            onChange={(e) => {
              setIdentifier(e.currentTarget.value);
              setHoverValue("user_change")
            }}
            placeholder="Email or Username"
            type="text"
            value={identifier}
            onMouseEnter={() => setHoverValue("username")}
            onMouseLeave={() => setHoverValue("")}
          />
          <label htmlFor="identifier" style={userNameLabelStyles}>Email or Username</label>

          {!identifier && interactions.identifier ? <div style={FormValidation} className="form-helper guidance warning">You must provide an email or username to sign in.</div> : null}
        </div>
        <div className="form-control" style={formDivStyles}>
          <input
            id="password"
            name="password"
            onBlur={() => {
              setInteractions({ ...interactions, password: true });
            }}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
              setHoverValue("pass_change")
            }}
            placeholder="Password"
            type="password"
            value={password}
            style={passwordDivStyles}
            onMouseEnter={() => setHoverValue("password")}
            onMouseLeave={() => setHoverValue("")}
          />
          <label htmlFor="password" style={passwordLabelStyles}>Password</label>

          {!password && interactions.password ? <div style={FormValidation} className="form-helper guidance warning">You must provide your password to sign in.</div> : null}
        </div>

        <button className="btn btn-primary btn-report-submit" style={btnDisableStyles} disabled={!identifier || !password} type="submit"
          onMouseEnter={() => setHoverValue("signInBtn")}
          onMouseLeave={() => setHoverValue("")}>
          Sign in
        </button>

        <p className="subtext tertiary-text small-text" style={subTextStyles}>
          Don&apos;t have an account?
          <a
            className="sign-up-link link"
            href="https://www.expertvoice.com/?onb_autoShow=true"
            onClick={() => {
              sendAC(AnalyticEvent.SIGN_UP);
            }}
            style={signUpLinkStyles}
          >
            Sign up
          </a>
        </p>
      </form>
    </main>
  </section>
);
}

LoginForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
