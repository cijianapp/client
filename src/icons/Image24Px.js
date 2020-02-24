import * as React from "react";

function SvgImage24Px(props) {
  return (
    <svg
      viewBox="-50 -100 900 1000"
      preserveAspectRatio="none"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M725 100v575a50 50 0 01-50 50H100a25 25 0 00-25 25 50 50 0 0050 50h575a100 100 0 00100-100V125a50 50 0 00-50-50 25 25 0 00-25 25z" />
      <path d="M625 675H50a50 50 0 01-50-50V50A50 50 0 0150 0h575a50 50 0 0150 50v575a50 50 0 01-50 50zM75 75v475l114.64-114.64a50 50 0 0170.71 0L300 475l139.79-139a50 50 0 0170.47 0L600 425V75z" />
      <path d="M225 150a75 75 0 0175 75 75 75 0 01-75 75 75 75 0 01-75-75 75 75 0 0175-75z" />
    </svg>
  );
}

export default SvgImage24Px;
