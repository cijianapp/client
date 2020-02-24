import * as React from "react";

function SvgComment(props) {
  return (
    <svg
      className="comment_svg__Zi comment_svg__Zi--Comment comment_svg__Button-zi"
      fill="currentColor"
      viewBox="-3 -3 30 30"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M10.241 19.313a.97.97 0 00-.77.2 7.908 7.908 0 01-3.772 1.482.409.409 0 01-.38-.637 5.825 5.825 0 001.11-2.237.605.605 0 00-.227-.59A7.935 7.935 0 013 11.25C3 6.7 7.03 3 12 3s9 3.7 9 8.25-4.373 9.108-10.759 8.063z"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgComment;
