import React from "react";

function PostImage({ imageSrc }) {
  return <img src={imageSrc} className="timelinePostImage" />;
}

export default React.memo(PostImage);
