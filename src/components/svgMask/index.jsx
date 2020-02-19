import React from "react";
import styles from "./styles.module.css";

function SvgMask() {
  return (
    <svg className={styles.svg}>
      <mask
        xmlns="http://www.w3.org/2000/svg"
        id="svg-mask-avatar-default"
        maskContentUnits="objectBoundingBox"
        viewBox="0 0 1 1"
      >
        <circle fill="white" cx="0.5" cy="0.5" r="0.5" />
      </mask>

      <mask
        xmlns="http://www.w3.org/2000/svg"
        id="svg-mask-guilds-default"
        maskContentUnits="objectBoundingBox"
        viewBox="0 0 1 1"
      >
        <circle fill="white" cx="0.5" cy="0.5" r="0.5" />
      </mask>

      <mask
        xmlns="http://www.w3.org/2000/svg"
        id="svg-mask-guilds-selected"
        fill="black"
        x="0"
        y="0"
        width="48"
        height="48"
      >
        <path
          fill="white"
          d="M 0 24 C 0 16.5449 0 12.8174 1.21793 9.87706 C 2.84183 5.95662 5.95662 2.84183 9.87706 1.21793 C 12.8174 0 16.5449 0 24 0 C 31.4551 0 35.1826 0 38.1229 1.21793 C 42.0434 2.84183 45.1582 5.95662 46.7821 9.87706 C 48 12.8174 48 16.5449 48 24 C 48 31.4551 48 35.1826 46.7821 38.1229 C 45.1582 42.0434 42.0434 45.1582 38.1229 46.7821 C 35.1826 48 31.4551 48 24 48 C 16.5449 48 12.8174 48 9.87706 46.7821 C 5.95662 45.1582 2.84183 42.0434 1.21793 38.1229 C 0 35.1826 0 31.4551 0 24 Z"
        />
        <rect
          fill="black"
          transform="translate(20 -20)"
          x="28"
          y="-4"
          width="24"
          height="24"
          rx="12"
          ry="12"
        />
        <rect
          fill="black"
          transform="translate(20 20)"
          x="28"
          y="28"
          width="24"
          height="24"
          rx="12"
          ry="12"
        />
      </mask>

      <mask
        id="svg-mask-vertical-fade"
        maskContentUnits="objectBoundingBox"
        viewBox="0 0 1 1"
      >
        <linearGradient
          id="svg-mask-vertical-fade-gradient"
          gradientTransform="rotate(90)"
          x1="0"
          x2="1"
          y1="0"
          y2="0"
        >
          <stop offset="70%" stopColor="white"></stop>
          <stop offset="100%" stopColor="black"></stop>
        </linearGradient>
        <rect
          fill="url(#svg-mask-vertical-fade-gradient)"
          x="0"
          y="0"
          width="1"
          height="1"
        ></rect>
      </mask>
    </svg>
  );
}

export default SvgMask;
