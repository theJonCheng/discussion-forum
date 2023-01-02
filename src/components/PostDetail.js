import React from "react";

function PostDetail(props) {
  const { post } = props;
  return (
    <React.Fragment>
      <h2>Post Detail</h2>
      <hr />
      <h3>{post.title}</h3>
      <p>{post.text}</p>
      <hr />
      <button onClick={props.onEditClick}>Edit Ticket</button>
      <button onClick={props.onDeleteClick}>Delete Ticket</button>
      <br />
    </React.Fragment>
  );
}

export default PostDetail;