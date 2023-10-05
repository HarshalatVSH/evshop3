/* eslint-disable*/
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { CtaType, StarIcon } from '../constants';
import {
  formatInteger,
  formatPrice,
  formatProductName,
  getBrandUrls,
  getProductUrls,
  getRoundedStar,
  isComparablePrice,
} from '../helper';

function ProductMatch(props) {
  const brandUrls = getBrandUrls(props.brand);
  const productUrls = getProductUrls(props.product);

  const evIsCheaper = isComparablePrice(props.product, props.page);
  const formattedBestPrice = evIsCheaper ? formatPrice(props.product) : null;

  const productName = formatProductName(props.product.name);

  const [hoverValue, setHoverValue] = useState("")

  const titleStyle = {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "24px",
    margin: "0px",
  };

  const headerAnchorStyle = {
    border: "none",
    color: "inherit",
    outline: "none",
    textDecoration: "none",
    fontSize: "17px",
    fontWeight: 402,
    lineHeight: "28px"
  };

  const pillAnchorStyles = {
    borderRadius: "30px",
    fontWeight: 600,
    padding: "3px 16px",
    backgroundColor: "rgb(82, 179, 130)",
  };

  const NoSavingHeader = {
    borderRadius: "30px",
    fontWeight: 500,
    padding: "3px 16px",
    backgroundColor: "rgb(227, 227, 227)",
    textDecoration: "none",
    color: "rgb(37, 37, 37)",
  };

  const FoundOnExpert = {
    border: "medium",
    color: "inherit",
    outline: "none",
    textDecoration: "none",
    padding: "3px 16px",
    fontWeight: 400,
    borderRadius: "30px",
    backgroundColor: "rgb(82, 179, 130)"
  }

  const combinedStyles = { ...headerAnchorStyle, ...pillAnchorStyles };

  const matchDetailsStyles = {
    alignItems: "center",
    display: "flex",
    flexFlow: "column",
    marginBottom: "18px",
  };

  const reviewSummaryStyles = {
    marginTop: "18px",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  };

  const averageStarsStyles = {
    alignItems: "center",
    display: "inline-flex",
    marginRight: "8px",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "24px",
    textDecoration: "none",
    color: "inherit"
  };

  const smallTextStyles = {
    lineHeight: "19px",
    textDecoration: "underline",
    fontSize: "13px",
    fontWeight: 400,
    color: "rgb(117, 117, 117)",
  };

  const subtextStyle = {
    margin: "19px 0px 15px",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "18px",
    color: "rgb(77, 77, 77)",
  };

  const subtextStyles = {
    margin: "11px 0px 0px",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "18px",
    color: "rgb(77, 77, 77)",
  };

  const btnProductLink = {
    borderRadius: "3px",
    display: "block",
    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: 500,
    padding: "12px",
    textAlign: "center",
    width: "90%",
    background: "white",
    border: "1px solid rgb(117, 117, 117)",
    color:hoverValue === "btnproduct" ? "rgb(91, 87, 87)" : "rgb(117, 117, 117)",
    margin: "6px 0px 18px",
    textDecoration: "none",
  };

  const pillsSuccessStyle = {
    borderRadius: '30px',
    fontWeight: 400,
    padding: '3px 16px',
    backgroundColor: 'rgb(82, 179, 130)',
    color: "black",
    textDecoration: "none"
  };

  const productLink = {
    background: hoverValue === "viewOnExp" ? "rgb(227, 62, 56)" : "rgb(252, 69, 64)",
    color: "rgb(255, 255, 255)",
    textDecoration: "none",
    margin: '18px 0px',
    borderRadius: '3px',
    display: 'block',
    fontFamily: 'inherit',
    fontSize: '14px',
    fontWeight: 600,
    padding: '12px',
    textAlign: 'center',
    width: '90%',
  };

  const unlockTextStyle = {
    color: "rgb(117, 117, 117)",
    fontSize: "12px"
  }

  const StarIconStyle = {
    marginRight: "4px",
    height: "25px",
    width: "20px"
  }

  const btnStyle = {
    borderRadius: "3px",
    display: "block",
    fontFamily: "inherit",
    fontSize: "15px",
    fontWeight: 600,
    padding: "12px",
    textAlign: "center",
    width: "90%",
    background: hoverValue === "viewOnExpert" ? "rgb(227, 62, 56)" : "rgb(252, 69, 64)",
    border: "1px solid lightGray",
    color: "lightGray",
    margin: "18px 0",
    margin: "6px 0 18px 0"
  }

  const shopMoreBtn = {
    borderRadius: "5px",
    display: "block",
    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: 600,
    padding: "12px",
    textAlign: "center",
    width: "90%",
    background: hoverValue === "shopmorebtn" ? "rgb(227, 62, 56)" : "rgb(252, 69, 64)",
    border: "1px solid lightGray",
    color: "rgb(255, 255, 255)",
    margin: "18px 0",
    margin: "6px 0 18px 0",
    textDecoration: "none",
  };

  const renderReviewSummary = () => {
    if (!props.product.reviewCount) return null;

    const roundedStars = getRoundedStar(props.product.reviewStars);
    return (
      <div className="review-summary" style={reviewSummaryStyles}>
        <a
          className="average-stars type-title"
          style={averageStarsStyles}
          href={productUrls.reviews}
          onClick={props.sendCtaClickEvent(CtaType.PDP_REVIEWS, 'review-stars')}
          rel="noopener noreferrer"
          target="_blank"
        >
          {/* <i className="exp-ux-starFilled exp-ux-small" /> */}
          <img src={StarIcon} alt="" style={StarIconStyle} />
          {roundedStars}
        </a>
        <a
          className="tertiary-text small-text link"
          style={smallTextStyles}
          href={productUrls.reviews}
          onClick={props.sendCtaClickEvent(CtaType.PDP_REVIEWS, 'review-count')}
          rel="noopener noreferrer"
          target="_blank"
        >
          {props.product.reviewCount > 1
            ? `${formatInteger(props.product.reviewCount)} reviews`
            : '1 review'}
        </a>
      </div>
    );
  };

  return (
    <>
      <div className="match-details" style={matchDetailsStyles}>
        {props.product.imageUrl ? (
          <a
            href={productUrls.pdp}
            onClick={props.sendCtaClickEvent(CtaType.PDP, 'image')}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt={props.product.name}
              className="match-image"
              src={props.product.imageUrl}
              style={{ height: '48px', width: '48px' }}
            />
          </a>
        ) : null}
        <h1 className="type-title match-name" style={titleStyle}>
          <a
            href={productUrls.pdp}
            style={headerAnchorStyle}
            onClick={props.sendCtaClickEvent(CtaType.PDP, 'name')}
            rel="noopener noreferrer"
            target="_blank"
          >
            {props.brand.name} - {productName}
          </a>
        </h1>
      </div>

      <>
        {!props.user ? (
          // Logged out state
          <>
            <div className="status-indicator">
              <a
                className="pill pill-success"
                href={productUrls.pdp}
                onClick={props.sendCtaClickEvent(CtaType.PDP, 'pill')}
                rel="noopener noreferrer"
                style={FoundOnExpert}
                target="_blank"
              >
                Found on ExpertVoice
              </a>
            </div>

            {renderReviewSummary()}

            <p className="subtext secondary-text small-text" style={subtextStyles}>
              Sign in to find out if you qualify for discounts.
            </p>
          </>
        ) : (
          evIsCheaper === false ? (
            // No savings available
            <>
              <div className="status-indicator">
                <a
                  className="pill pill-secondary"
                  href={productUrls.pdp}
                  style={NoSavingHeader}
                  onClick={props.sendCtaClickEvent(CtaType.PDP, 'pill')}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  No savings
                </a>
              </div>

              {renderReviewSummary()}

              <p className="subtext secondary-text small-text" style={subtextStyles}>
                No savings for this item, but you may qualify for great discounts on similar
                products.
              </p>
              <a
                className="btn btn-primary product-link"
                href={productUrls.pdp}
                style={productLink}
                onClick={props.sendCtaClickEvent(CtaType.PDP)}
                rel="noopener noreferrer"
                target="_blank"
                onMouseEnter={() => setHoverValue("viewOnExp")}
                onMouseLeave={() => setHoverValue("")}
              >
                View on ExpertVoice
              </a>
            </>
          ) : (
            !props.product.inStock && props.product.accessConfirmed ? (
              // Product is out of stock on EV
              <>
                <div className="status-indicator">
                  <a
                    className="pill pill-secondary"
                    style={NoSavingHeader}
                    href={productUrls.pdp}
                    onClick={props.sendCtaClickEvent(CtaType.PDP, 'pill')}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {evIsCheaper ? (
                      <span className="best-price-unavailable">{`${formattedBestPrice}`}</span>
                    ) : null}
                    Out of Stock
                  </a>
                </div>

                {renderReviewSummary()}

                <p className="subtext secondary-text small-text" style={subtextStyle}>
                  Visit ExpertVoice to view details and sign up to get notified when
                  it’s back in stock.
                </p>
                <a
                  className="btn btn-outline product-link"
                  href={productUrls.pdp}
                  style={btnProductLink}
                  onClick={props.sendCtaClickEvent(CtaType.PDP)}
                  rel="noopener noreferrer"
                  target="_blank"
                  onMouseEnter={() => setHoverValue("btnproduct")}
                  onMouseLeave={() => setHoverValue("")}
                >
                  View on ExpertVoice
                </a>

                <p className="subtext secondary-text small-text" style={subtextStyles}>
                  {props.brand.discount > 0 ? (
                    <>
                      Save up to <strong>{props.brand.discount}% off</strong>
                    </>
                  ) : 'Discounts available'} on other products
                </p>
                <a
                  className="btn btn-primary brand-products-link"
                  style={shopMoreBtn}
                  href={brandUrls.plp}
                  onClick={props.sendCtaClickEvent(CtaType.BRAND_PLP)}
                  rel="noopener noreferrer"
                  target="_blank"
                  onMouseEnter={() => setHoverValue("shopmorebtn")}
                  onMouseLeave={() => setHoverValue("")}
                >
                  Shop more {props.brand.name}
                </a>
              </>
            ) : (
              evIsCheaper ? (
                // EV offers lower or equal price
                <>
                  <div className="status-indicator">
                    <a
                      className="pill pill-success"
                      href={productUrls.pdp}
                      style={pillsSuccessStyle}
                      onClick={props.sendCtaClickEvent(CtaType.PDP, 'pill')}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {`Lowest price ${formattedBestPrice}`}
                    </a>
                  </div>

                  {renderReviewSummary()}

                  <p className="subtext secondary-text small-text" style={unlockTextStyle}>
                    Don’t miss out on your expert discount.
                  </p>
                  <a
                    className="btn btn-primary product-link"
                    href={productUrls.pdp}
                    style={productLink}
                    onClick={props.sendCtaClickEvent(CtaType.PDP)}
                    rel="noopener noreferrer"
                    target="_blank"
                    onMouseEnter={() => setHoverValue("viewOnExp")}
                    onMouseLeave={() => setHoverValue("")}
                  >
                    Buy on ExpertVoice
                  </a>
                </>
              ) : (
                // EV offers discount but price unknown
                <>
                  <div className="status-indicator">
                    <a
                      className="pill pill-success"
                      href={productUrls.pdp}
                      style={pillsSuccessStyle}
                      onClick={props.sendCtaClickEvent(CtaType.PDP, 'pill')}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {props.brand.discount > 0
                        ? `Up to ${props.brand.discount}% off`
                        : 'Discounts Available'}
                    </a>
                  </div>

                  {renderReviewSummary()}

                  <p className="subtext secondary-text small-text" style={unlockTextStyle}>
                    Unlock your discounted price on ExpertVoice.
                  </p>
                  <a
                    className="btn btn-primary product-link"
                    href={productUrls.pdp}
                    style={productLink}
                    onClick={props.sendCtaClickEvent(CtaType.PDP)}
                    rel="noopener noreferrer"
                    target="_blank"
                    onMouseEnter={() => setHoverValue("viewOnExp")}
                    onMouseLeave={() => setHoverValue("")}
                  >
                    View on ExpertVoice
                  </a>
                </>
              )
            )
          )
        )}
      </>
    </>
  );
}

ProductMatch.defaultProps = {
  user: null,
};

ProductMatch.propTypes = {
  brand: PropTypes.shape({
    discount: PropTypes.number,
    name: PropTypes.string.isRequired,
    orgId: PropTypes.number.isRequired,
  }).isRequired,
  page: PropTypes.shape({
    price: PropTypes.string,
  }).isRequired,
  product: PropTypes.shape({
    accessConfirmed: PropTypes.bool,
    bestPrice: PropTypes.number,
    imageUrl: PropTypes.string,
    inStock: PropTypes.bool,
    name: PropTypes.string.isRequired,
    pdpUrl: PropTypes.string,
    reviewCount: PropTypes.number,
    reviewStars: PropTypes.number,
  }).isRequired,
  sendCtaClickEvent: PropTypes.func.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};

export default ProductMatch;