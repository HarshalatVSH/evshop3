/* eslint-disable*/
import React, { useEffect, useState } from 'react';

import { AnalyticEvent, CtaType, ImageUrlBase, MessageType, StarIcon, grayIconImg } from '../constants';
import {
  formatInteger,
  formatPrice,
  getInlineVariant,
  getProductUrls,
  getRoundedStar,
  isComparablePrice,
  sendAC,
} from '../helper';
import { ImageUrlBaseStyle, StarIconStyle, averageStars, grayBtnUrlStyle, inlineStyle, linkStyle, reviewPromptSumm, reviewSummary, tertiSmallLinkStyle } from './InlineCSS';

/**
 * Main Inline Script - rendering inline best price label
 */
function Inline() {
  const [context, setContext] = useState(null);
  const [evIsCheaper, setEvIsCheaper] = useState(null);
  const [formattedBestPrice, setFormattedBestPrice] = useState(null);
  const [productUrls, setProductUrls] = useState({});
  const [user, setUser] = useState(null);
  const [variant, setVariant] = useState(null);
  const [hoverValue, setHoverValue] = useState("")

  const btnStyle = {
    alignItems: "center",
    display: "flex",
    height: "40px",
    lineHeight: "14px",
    padding: "0 18px 0 12px",
    width: "unset",
    background: hoverValue === "signInBtn" ? "rgb(227, 62, 56)" : "rgb(252, 69, 64)",
    color: "rgb(255, 255, 255)",
    borderRadius: "3px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "medium"
  };

  const NoSavingBtn = {
    height: "40px",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    border: "none",
    color: "rgb(117, 117, 117)",
    outline: "none",
    textDecoration: "none",
    background: hoverValue === "nosaving" ? "rgba(227, 223, 223, 0.93)" : "rgb(242, 242, 242)",
    borderRadius: "3px",
    textAlign: "center",
    fontFamily: "inherit",
    fontSize: "15px",
    padding: "0px 18px 0px 12px",
    width: "unset",
    fontWeight: 500
  };

  const DiscountsBtn = {
    alignItems: 'center',
    display: 'flex',
    height: '40px',
    lineHeight: '14px',
    padding: '0px 18px 0px 12px',
    width: 'unset',
    background: hoverValue === "discount" ? "rgb(227, 62, 56)" : "rgb(252, 69, 64)",
    color: 'rgb(255, 255, 255)',
    borderRadius: '3px',
    fontFamily: 'inherit',
    fontSize: '15px',
    fontWeight: 600,
    textAlign: 'center',
    outline: 'none',
    textDecoration: 'none',
    border: 'none',
    cursor: "pointer",
  };

  useEffect(() => {
    // Bind the message listener to respond to the background worker
    const listener = (msg) => {
      if (msg.type === MessageType.DATA) {
        setContext(msg.context);
        setUser(msg.user);
        setVariant(getInlineVariant(msg.context, msg.user));

        const isCheaper = isComparablePrice(msg.context.product, msg.context.page);
        setEvIsCheaper(isCheaper);
        if (isCheaper) {
          setFormattedBestPrice(formatPrice(msg.context.product));
        }

        setProductUrls(getProductUrls(msg.context.product, 'INLINE'));
      }
    };

    browser.runtime.onMessage.addListener(listener);
    return () => {
      browser.runtime.onMessage.removeListener(listener);
    };
  }, [context]);

  const sendCtaClickEvent = (type = CtaType.PDP, source = 'button') => () => {
    sendAC(AnalyticEvent.INLINE_CTA_CLICK, {
      brand: context.brand || null,
      product: context.product || null,
      source,
      type,
      variant,
    });
  };

  const renderReviewSummary = () => {
    if (context.product.reviewCount) {
      const roundedStars = getRoundedStar(context.product.reviewStars);
      return (
        <a
          className="review-summary"
          style={reviewSummary}
          href={productUrls.reviews}
          onClick={sendCtaClickEvent(CtaType.PDP_REVIEWS, 'review-summary')}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="average-stars type-title" style={averageStars}>
            <img src={StarIcon} alt="" style={StarIconStyle} />
            {roundedStars}
          </div>

          <div className="secondary-text small-text link" style={linkStyle}>
            {context.product.reviewCount > 1
              ? `${formatInteger(context.product.reviewCount)} expert reviews`
              : '1 expert review'}
          </div>
        </a>
      );
    }
    if (user) {
      return (
        <a
          className="review-summary review-prompt"
          style={reviewPromptSumm}
          href={productUrls.reviewPrompt}
          onClick={sendCtaClickEvent(CtaType.PDP_REVIEW_PROMPT, 'review-prompt')}
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="exp-ux-starFilled exp-ux-small" />
          <span className="tertiary-text small-text link"
            style={tertiSmallLinkStyle}>
            Leave an expert review
          </span>
        </a>
      );
    }

    return null;
  };

  if (!context || !context.product) {
    return null;
  }

  return (
    <section id="inline" style={inlineStyle}>
      {!user ? (
        // Logged out state
        <button
          className="btn btn-primary"
          style={btnStyle}
          onClick={() => {
            sendCtaClickEvent(CtaType.LOGIN);
            browser.runtime.sendMessage({ type: MessageType.LOGIN_START });
          }}
          type="button"
          onMouseEnter={() => setHoverValue("signInBtn")}
          onMouseLeave={() => setHoverValue("")}
        >
          <img src={ImageUrlBase} alt="" style={ImageUrlBaseStyle}
          />
          Sign in for discounts
        </button>
      ) : (
        evIsCheaper === false ? (
          // No savings available
          <a
            className="btn btn-gray"
            href={productUrls.pdp}
            onClick={sendCtaClickEvent(CtaType.PDP)}
            rel="noopener noreferrer"
            target="_blank"
            style={NoSavingBtn}
            onMouseEnter={() => setHoverValue("nosaving")}
            onMouseLeave={() => setHoverValue("")}
          >
            <img src={grayIconImg} alt="" style={grayBtnUrlStyle} />
            No savings
          </a>
        ) : (
          !context.product.inStock && context.product.accessConfirmed ? (
            // Product is out of stock on EV
            <a
              className="btn btn-gray"
              href={productUrls.pdp}
              onClick={sendCtaClickEvent(CtaType.PDP)}
              rel="noopener noreferrer"
              target="_blank"
              style={NoSavingBtn}
              onMouseEnter={() => setHoverValue("nosaving")}
              onMouseLeave={() => setHoverValue("")}
            >
              <img src={grayIconImg} alt="" style={grayBtnUrlStyle} />
              {evIsCheaper ? (
                <span className="best-price-unavailable">{`${formattedBestPrice}`}</span>
              ) : null}
              Out of Stock
            </a>
          ) : (
            // EV offers some discount for product
            <a
              className="btn btn-primary"
              href={productUrls.pdp}
              style={DiscountsBtn}
              onClick={sendCtaClickEvent(CtaType.PDP)}
              rel="noopener noreferrer"
              target="_blank"
              onMouseEnter={() => setHoverValue("discount")}
              onMouseLeave={() => setHoverValue("")}
            >
              <img src={ImageUrlBase} alt="" style={ImageUrlBaseStyle} />
              {evIsCheaper 
                ? `Buy for ${formattedBestPrice}`
                : context.brand.discount > 0
                  ? `Up to ${context.brand.discount}% off`
                  : 'Discounts Available'}
            </a>
          )
        )
      )}

      {renderReviewSummary()}
    </section>
  );
}

export default Inline;