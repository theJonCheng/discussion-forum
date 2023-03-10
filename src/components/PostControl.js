import React from "react";
import NewPostForm from "./NewPostForm";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import EditPostForm from "./EditPostForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as a from "./../actions";
import { formatDistanceToNow } from "date-fns";

class PostControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() => this.updateTicketElapsedWaitTime(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.mainPostList).forEach((post) => {
      const newFormattedWaitTime = formatDistanceToNow(post.timeOpen, {
        addSuffix: true,
      });
      const action = a.updateTime(post.id, newFormattedWaitTime);
      dispatch(action);
    });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    if (this.props.editing) {
      const action = a.editFormToggle();
      dispatch(action);
      this.setState({
        selected: null,
      });
    } else if (this.state.selected !== null) {
      this.setState({
        selected: null,
      });
    } else {
      const action = a.toggleForm();
      dispatch(action);
    }
  };

  handleAddingNewPostToList = (newPost) => {
    const { dispatch } = this.props;
    const action = a.addPost(newPost);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  };

  handleChangingSelectedPost = (id) => {
    this.setState({
      selected: id,
    });
  };

  handleEditClick = () => {
    const { dispatch } = this.props;
    const action = a.editFormToggle();
    dispatch(action);
  };

  handleEditingPostInList = (postToEdit) => {
    const { dispatch } = this.props;
    const action = a.editPost(postToEdit);
    dispatch(action);
    const action2 = a.editFormToggle();
    dispatch(action2);
    this.setState({
      selected: null,
    });
  };

  handleDeletingPost = (id) => {
    const { dispatch } = this.props;
    const action = a.deletePost(id);
    dispatch(action);
    this.setState({
      selected: null,
    });
  };

  handleUpvoteClick = (postId) => {
    const { dispatch } = this.props;
    const postToUpvote = this.props.mainPostList[postId];
    const action = a.upvote(postToUpvote);
    dispatch(action);
  };

  handleDownvoteClick = (postId) => {
    const { dispatch } = this.props;
    const postToDownvote = this.props.mainPostList[postId];
    const action = a.downvote(postToDownvote);
    dispatch(action);
  };

  render() {
    let currentlyDisplayed = null;
    let buttonText = null;

    if (this.props.editing) {
      currentlyDisplayed = <EditPostForm postId={this.state.selected} onEditPost={this.handleEditingPostInList} />;
      buttonText = "Return to Posts";
    } else if (this.state.selected !== null) {
      currentlyDisplayed = (
        <PostDetail
          postId={this.state.selected}
          whenUpvoteClicked={this.handleUpvoteClick}
          whenDownvoteClicked={this.handleDownvoteClick}
          onEditClick={this.handleEditClick}
          onDeleteClick={this.handleDeletingPost}
        />
      );
      buttonText = "Return to Posts";
    } else if (this.props.formVisibleOnPage) {
      currentlyDisplayed = <NewPostForm onNewPostCreation={this.handleAddingNewPostToList} />;
      buttonText = "Cancel";
    } else {
      currentlyDisplayed = (
        <PostList
          postList={this.props.mainPostList}
          onUpvoteClick={this.handleUpvoteClick}
          onDownvoteClick={this.handleDownvoteClick}
          onPostSelection={this.handleChangingSelectedPost}
        />
      );
      buttonText = "Create New Post";
    }

    return (
      <React.Fragment>
        {currentlyDisplayed}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

PostControl.propTypes = {
  mainPostList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool,
  editing: PropTypes.bool,
};

const mapStateToProps = (state) => {
  // function sortPostsByScore(a, b) {
  //   const score1 = a.score;
  //   const score2 = b.score;

  //   let comparison = 0;

  //   if (score1 > score2) {
  //     comparison = 1;
  //   } else if (score1 < score2) {
  //     comparison = -1;
  //   }
  //   return comparison;
  // }

  // const orderedPostList = state.mainPostList.score.sort((a, b) => (a.score > b.score ? 1 : -1));

  return {
    mainPostList: state.mainPostList,
    formVisibleOnPage: state.formVisibleOnPage,
    editing: state.editing,
  };
};

PostControl = connect(mapStateToProps)(PostControl);

export default PostControl;
