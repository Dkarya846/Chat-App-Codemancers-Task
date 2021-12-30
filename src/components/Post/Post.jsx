import React from "react";
import "./Post.styles.css";

const Post = (props) => {
  const { post } = props;
  return (
    //Post Container
    <div className="post-container">
      {/* post text  */}
      <p className="post-text">{post.content}</p>

      {/* Post GIF showed only when there is a gif present */}
      {post.gif && (
        <img
          draggable={false}
          className="post-gif"
          src={post.gif}
          alt="post's GIF"
        />
      )}
    </div>
  );
};

export default Post;
