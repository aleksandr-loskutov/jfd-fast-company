import React from "react";

function Bookmark({ status, onBookmark }) {
  return (
    <button onClick={onBookmark}>
      <i className={"bi bi-bookmark" + (status ? "-fill" : "")}></i>
    </button>
  );
}

export default Bookmark;
