/* eslint-disable  */
import React from 'react';
import PropTypes from 'prop-types';

import './Alert.less';
import { DangerMode } from '../constants';

/**
 * Alert Component
 *
 * @author jon.morris
 */
import '../content/font.css';
function Alert(props) {
  const IconStyle = {
    margin: "-4px",
    width: "30px"
  }

  const Alert = {
    color: "rgb(37, 37, 37)",
    marginBottom: "17px",
    fontFamily: "Source Sans Pro , -apple-system, sans-serif",
    fontSize : "15px"
  }
  return (
    <div className={`alert alert-${props.type}${props.className ? ` ${props.className}` : ''}`}>
      {props.icon ? (
        <div className="alert-before">
          <img src={DangerMode} alt="" style={IconStyle} />
        </div>
      ) : null}

      <div className="alert-content" style={Alert}>
        {props.children}
      </div>

      {props.onClose ? (
        <div className="alert-after">
          <button
            className="btn-icon close-button"
            onClick={(e) => props.onClose?.(e)}
            type="button"
          >
            <i className="exp-ux-close exp-ux-small" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

Alert.defaultProps = {
  className: '',
  icon: '',
  iconSize: 'small',
  onClose: null,
};

Alert.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  className: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.oneOf(['mini', 'small', 'medium', 'large', 'xlarge']),
  onClose: PropTypes.func,
  type: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

// Syntactic Sugar Variants

export function InfoAlert(props) {
  return React.createElement(Alert, {
    ...props,
    type: 'info',
  });
}

export function ErrorAlert(props) {
  return React.createElement(Alert, {
    ...props,
    icon: 'skull',
    type: 'error',
  });
}

export function SuccessAlert(props) {
  return React.createElement(Alert, {
    ...props,
    type: 'success',
  });
}

export function WarningAlert(props) {
  return React.createElement(Alert, {
    ...props,
    type: 'warning',
  });
}

export default Alert;
