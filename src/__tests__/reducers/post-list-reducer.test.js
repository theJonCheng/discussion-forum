import postListReducer from "../../reducers/post-list-reducer";
import * as c from "./../../actions/ActionTypes";
import { formatDistanceToNow } from "date-fns";

describe("postListReducer", () => {
  let action;
  const postData = {
    title: "How rare is this cat?",
    text: "Cat found with 5 toes on each paw!",
    upvotes: 0,
    downvotes: 0,
    score: 0,
    timeOpen: new Date(),
    formattedWaitTime: formatDistanceToNow(new Date(), {
      addSuffix: true,
    }),
    id: 1,
    imageUrl: "https://www.w3.org/Style/Woolly/woolly-mc.png",
  };

  const currentState = {
    1: {
      title: "How rare is this cat?",
      text: "Cat found with 5 toes on each paw!",
      upvotes: 0,
      downvotes: 0,
      score: 0,
      timeOpen: 0,
      formattedWaitTime: "less than a minute ago",
      id: 1,
      imageUrl: "https://www.w3.org/Style/Woolly/woolly-mc.png",
    },
    2: {
      title: "Puppy sitting in the snow",
      text: "Adorable golden retriever puppy",
      upvotes: 0,
      downvotes: 0,
      score: 0,
      timeOpen: 0,
      formattedWaitTime: "less than a minute ago",
      id: 2,
      imageUrl: "https://img.freepik.com/free-photo/shot-adorable-white-golden-retriever-puppy-sitting-snow_181624-44122.jpg",
    },
  };

  test("Should return default state if no action type passed into reducer", () => {
    expect(postListReducer({}, { type: null })).toEqual({});
  });

  test("Should successfully add new post data to mainPostList", () => {
    const { title, text, upvotes, downvotes, score, timeOpen, formattedWaitTime, id, imageUrl } = postData;
    action = {
      type: c.ADD_POST,
      title: title,
      text: text,
      upvotes: upvotes,
      downvotes: downvotes,
      score: score,
      timeOpen: timeOpen,
      formattedWaitTime: formattedWaitTime,
      id: id,
      imageUrl: imageUrl,
    };
    expect(postListReducer({}, action)).toEqual({
      [id]: {
        title: title,
        text: text,
        upvotes: upvotes,
        downvotes: downvotes,
        score: score,
        timeOpen: timeOpen,
        formattedWaitTime: "less than a minute ago",
        id: id,
        imageUrl: imageUrl,
      },
    });
  });

  test("Should successfully delete a post", () => {
    action = {
      type: c.DELETE_POST,
      id: 1,
    };
    expect(postListReducer(currentState, action)).toEqual({
      2: {
        title: "Puppy sitting in the snow",
        text: "Adorable golden retriever puppy",
        upvotes: 0,
        downvotes: 0,
        score: 0,
        timeOpen: 0,
        formattedWaitTime: "less than a minute ago",
        id: 2,
        imageUrl: "https://img.freepik.com/free-photo/shot-adorable-white-golden-retriever-puppy-sitting-snow_181624-44122.jpg",
      },
    });
  });
  test("Should increase number of upvotes by one, increase total score by 1, and update state slice appropriately", () => {
    const { upvotes, score, id } = currentState[2];
    let action2 = {
      type: c.UPVOTE,
      upvotes: upvotes,
      score: score,
      id: id,
    };
    expect(postListReducer(currentState, action2)).toEqual({
      1: {
        title: "How rare is this cat?",
        text: "Cat found with 5 toes on each paw!",
        upvotes: 0,
        downvotes: 0,
        score: 0,
        timeOpen: 0,
        formattedWaitTime: "less than a minute ago",
        id: 1,
        imageUrl: "https://www.w3.org/Style/Woolly/woolly-mc.png",
      },
      2: {
        title: "Puppy sitting in the snow",
        text: "Adorable golden retriever puppy",
        upvotes: 1,
        downvotes: 0,
        score: 1,
        timeOpen: 0,
        formattedWaitTime: "less than a minute ago",
        id: 2,
        imageUrl: "https://img.freepik.com/free-photo/shot-adorable-white-golden-retriever-puppy-sitting-snow_181624-44122.jpg",
      },
    });
  });
  test("Should increase number of downvotes by one, decrease total score by 1, and update state slice appropriately", () => {
    const { downvotes, score, id } = currentState[2];
    let action2 = {
      type: c.DOWNVOTE,
      downvotes: downvotes,
      score: score,
      id: id,
    };
    expect(postListReducer(currentState, action2)).toEqual({
      1: {
        title: "How rare is this cat?",
        text: "Cat found with 5 toes on each paw!",
        upvotes: 0,
        downvotes: 0,
        score: 0,
        timeOpen: 0,
        formattedWaitTime: "less than a minute ago",
        id: 1,
        imageUrl: "https://www.w3.org/Style/Woolly/woolly-mc.png",
      },
      2: {
        title: "Puppy sitting in the snow",
        text: "Adorable golden retriever puppy",
        upvotes: 0,
        downvotes: 1,
        score: -1,
        timeOpen: 0,
        formattedWaitTime: "less than a minute ago",
        id: 2,
        imageUrl: "https://img.freepik.com/free-photo/shot-adorable-white-golden-retriever-puppy-sitting-snow_181624-44122.jpg",
      },
    });
  });
  test("Should add a formatted wait time to ticket entry", () => {
    const { title, text, upvotes, downvotes, score, timeOpen, id, imageUrl } = postData;
    action = {
      type: c.UPDATE_TIME,
      formattedWaitTime: "4 minutes ago",
      id: id,
    };
    expect(postListReducer({ [id]: postData }, action)).toEqual({
      [id]: {
        title: title,
        text: text,
        upvotes: upvotes,
        downvotes: downvotes,
        score: score,
        timeOpen: timeOpen,
        formattedWaitTime: "4 minutes ago",
        id: id,
        imageUrl: imageUrl,
      },
    });
  });
});
