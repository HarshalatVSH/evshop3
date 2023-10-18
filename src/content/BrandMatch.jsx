/* eslint-disable  */
import React from 'react';
import PropTypes from 'prop-types';

import { CtaType } from '../constants';
import { getBrandUrls, getEVBrandsUrl } from '../helper';
import { btnbrandLinkStyles, headerAnchorStyle, matchDetailsStyles, pillOutlineStyle, subtextStyles, titleStyle, viewAllBtn } from './BrandMatchCSS';

function BrandMatch(props) {
  const brandUrls = getBrandUrls(props.brand);
  let cta = brandUrls.brand;
  let ctaType = CtaType.BRAND;
  if (props.brand.active && props.brand.rewarded && props.user) {
    cta = brandUrls.plp;
    ctaType = CtaType.BRAND_PLP;
  }

  // const matchDetailsStyles = {
  //   alignItems: "center",
  //   display: "flex",
  //   flexFlow: "column",
  //   marginBottom: "10px",
  // };

  // const headerAnchorStyle = {
  //   border: "none",
  //   color: "inherit",
  //   outline: "none",
  //   textDecoration: "none",
  //   fontWeight:400,
  //   margin:"5px 0px 4px 0px",
  //   display:"block"
  //   };

  // const imgStyle = {
  //   height: "48px",
  //   width: "48px",
  //   borderRadius: "3px",
  //   marginBottom: "6px",
  // };

  // const titleStyle = {
  //   fontSize: "18px",
  //   fontWeight: 600,
  //   lineHeight: "24px",
  //   margin: "0px",
  // };

  const pillsSuccessStyle = {
    borderRadius: '30px',
    fontWeight: 450,
    padding: '3px 16px',
    backgroundColor: props.user ? 'rgb(227, 227, 227)' : "rgb(82, 179, 130)",
    color:'rgb(45, 44, 44)',
    cursor: "pointer",
    textDecoration:'none'
  };

  // const viewAllBtn = {
  //   margin: "12px 0px",
  //   background: "rgb(252, 69, 64)",
  //   color: "rgb(255, 255, 255)",
  //   borderRadius: "3px",
  //   display: "block",
  //   fontFamily: "inherit",
  //   fontSize: "14px",
  //   fontWeight: 600,
  //   padding: "12px",
  //   textAlign: "center",
  //   width: "90%",
  //   textDecoration: "none"
  // };

  // const subtextStyles = {
  //   marginTop: "15px",
  //   color: "rgb(125, 121, 121)",
  //   fontSize: "12px",
  //   fontWeight:"498",
  //   fontFamily:"inherit",
  //   lineHeight:"20px"
  // }

  // const btnbrandLinkStyles = {
  //   border: 'none',
  //   cursor: 'pointer',
  //   margin: '0px',
  //   outline: 'none',
  //   padding: '0px',
  //   textDecoration: 'none',
  //   background: "rgb(252, 69, 64)",
  //   color: "rgb(255, 255, 255)",
  //   margin: " 18px 0"
  // };

  // const pillStyle = {
  //   bordradius: "30px",
  //   fontWeight: "bold",
  //   padding: "3px 16px",
  // }

  // const pillOutline = {
  //   border: "1px solid lightGray",
  //   color: "lightGray"
  // }

  // const pillOutlineStyle = { ...pillStyle, ...pillOutline }

  return (
    <>
      <div className="match-details"
        style={matchDetailsStyles}>
        {props.brand.avatar ? (
          <a
            style={headerAnchorStyle}
            href={cta}
            onClick={props.sendCtaClickEvent(ctaType, 'image')}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt={props.brand.name}
              className="match-image"
              src={`${props.brand.avatar}${props.brand.avatar.includes('?') ? '&' : '?'}s=96x96`}
              style={{ height: '48px', width: '48px' , borderRadius: "2px" }}
            />
          </a>
        ) : null}
        <h1 className="type-title match-name" style={titleStyle}>
          <a
            href={cta}
            style={headerAnchorStyle}
            onClick={props.sendCtaClickEvent(ctaType, 'name')}
            rel="noopener noreferrer"
            target="_blank"
          >
            {props.brand.name}
          </a>
        </h1>
      </div>

      {props.brand.active && props.brand.targeted && props.user ? (
        // The brand is active and the user is authenticated
        <>
          {props.brand?.rewarded ? (
            // The brand is active and targeting the user with stores
            <>
              <div className="status-indicator">
                <a
                  className="pill pill-success"
                  href={cta}
                  onClick={props.sendCtaClickEvent(ctaType, 'pill')}
                  rel="noopener noreferrer"
                  target="_blank"
                  style={pillsSuccessStyle}
                >
                  {props.brand.discount > 0
                    ? `Up to ${props.brand.discount}% off`
                    : 'Discounts Available'}
                </a>
              </div>
              <p className="subtext secondary-text small-text" style={subtextStyles}>
                Don&apos;t miss out on exclusive discounts from <span className="brand-name">{props.brand.name}</span> on ExpertVoice.
              </p>
              <a
                className="btn btn-primary brand-link"
                href={cta}
                style={btnbrandLinkStyles}
                onClick={props.sendCtaClickEvent(ctaType)}
                rel="noopener noreferrer"
                target="_blank"
              >
                View discounts
              </a>
            </>
          ) : (
            // The brand is active and the user is targeted, but not for stores
            <>
              <div className="status-indicator">
                <a
                  className="pill pill-secondary"
                  href={cta}
                  style={pillsSuccessStyle}
                  onClick={props.sendCtaClickEvent(ctaType, 'pill')}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Insider Access
                </a>
              </div>
              <p className="subtext secondary-text small-text" style={subtextStyles}>
                You have exclusive access to content from <span className="brand-name">{props.brand.name}</span> that may include opportunities to preview or sample new products, provide feedback to their team, and much more.
              </p>
              <a
                className="btn btn-primary brand-link"
                href={cta}
                style={viewAllBtn}
                onClick={props.sendCtaClickEvent(ctaType)}
                rel="noopener noreferrer"
                target="_blank"
              >
                View all offers
              </a>
            </>
          )}
        </>
      ) : props.brand.active && !props.user ? (
        // The active brand was found but the user is not logged in
        <>
          <div className="status-indicator">
            <a
              className="pill pill-success"
              href={cta}
              style={pillsSuccessStyle}
              onClick={props.sendCtaClickEvent(ctaType, 'pill')}
              rel="noopener noreferrer"
              target="_blank"
            >
              Found on ExpertVoice
            </a>
          </div>
          <p className="subtext secondary-text small-text" style={subtextStyles}>
            Sign in to find out if you qualify for
            discounts, education, or other exclusive offers.
          </p>
        </>
      ) : (
        // The brand was found, but it's either inactive or not targeting the user
        <>
          <div className="status-indicator">
            <span className="pill pill-outline" style={pillOutlineStyle}>Not Available</span>
          </div>

          {props.user ? (
            <>
              <p className="subtext secondary-text small-text" style={subtextStyles}>
                <span className="brand-name">{props.brand.name}</span> is not available to you on ExpertVoice.
              </p>
              <a
                className="btn btn-outline brand-link"
                href={getEVBrandsUrl()}
                style={btnbrandLinkStyles}
                onClick={props.sendCtaClickEvent(CtaType.EV_BRANDS)}
                rel="noopener noreferrer"
                target="_blank"
              >
                View brands I have access to
              </a>
            </>
          ) : (
            <p className="subtext secondary-text small-text" style={subtextStyles}>
              <span className="brand-name">{props.brand.name}</span> is not available on ExpertVoice.
              Sign in to see the brands you have access to.
            </p>
          )}
        </>
      )}
    </>
  );
}

BrandMatch.defaultProps = {
  user: null,
};

BrandMatch.propTypes = {
  brand: PropTypes.shape({
    active: PropTypes.bool,
    avatar: PropTypes.string,
    discount: PropTypes.number,
    name: PropTypes.string.isRequired,
    orgId: PropTypes.number.isRequired,
    rewarded: PropTypes.bool,
    targeted: PropTypes.bool,
    url: PropTypes.string.isRequired,
  }).isRequired,
  sendCtaClickEvent: PropTypes.func.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};

export default BrandMatch;
