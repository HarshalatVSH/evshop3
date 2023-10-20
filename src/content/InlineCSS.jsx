/* eslint-disable*/ 
import './font.css';

export const inlineStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px 18px",
    margin: "18px 0px",
  };
 
 
export const reviewSummary = {
    height: "40px",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    border: "none",
    color: "inherit",
    outline: "none",
    textDecoration: "none",
    fontFamily: "Source Sans Pro , -apple-system, sans-serif"
  };
 
export const averageStars = {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "24px",
    alignItems: "center",
    display: "inline-flex",
    marginRight: "8px",
  };
 
export const linkStyle = {
    lineHeight: "19px",
    fontWeight: 600,
    textDecoration: "underline",
    fontSize: "13px",
    lineHeight: "18px",
    color: "rgb(77, 77, 77)",
  };
 
export const ImageUrlBaseStyle = {
    marginRight: "12px",
    height: "20px",
    width: "20px"
  }
 
export const grayBtnUrlStyle = {
    marginRight: "12px",
    height: "20px",
    width: "20px",
    opacity: 0.7
  }
 
export const StarIconStyle = {
    marginRight: "4px",
    height: "25px",
    width: "20px"
  }
  
export const reviewPrompt = {
    color: "lightGray",
    marginRight: " 8px"
  }
 
export  const reviewPromptSumm = { ...reviewSummary, ...reviewPrompt }
 
export  const tertiSmallLinkStyle = {
    lineHeight: "19px",
    fontSize: "13px",
    fontWeight: 600,
    lineHeight: "18px",
    color: "lightGray",
    textDecoration: "underline",
    fontFamily: "Source Sans Pro , -apple-system, sans-serif"
  }
  