import React from "react";
import { v4 } from "uuid";
import ReusableForm from "./ReusableForm";

function NewPostForm(props) {
  function handleNewPostFormSubmission(event) {
    event.preventDefault();

    props.onNewTicketCreation({
      title: event.target.title.value,
      text: event.target.text.value,
      id: v4(),
    });
  }

  return (
    <React.Fragment>
      <h2>New Post Form</h2>
      <ReusableForm onFormSubmission={handleNewPostFormSubmission} buttonText="Post" />
    </React.Fragment>
  );
}

export default NewPostForm;