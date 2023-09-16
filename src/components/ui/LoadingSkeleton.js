import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={476}
    height={124}
    viewBox="0 0 476 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x="67" y="8" rx="3" ry="3" width="238" height="18" /> 
    <Rect x="22" y="36" rx="3" ry="3" width="285" height="60" /> 
    <Rect x="22" y="102" rx="3" ry="3" width="30" height="24" /> 
    <Rect x="56" y="103" rx="3" ry="3" width="30" height="24" /> 
    <Rect x="24" y="1" rx="0" ry="0" width="39" height="32" />
  </ContentLoader>
)

export default MyLoader