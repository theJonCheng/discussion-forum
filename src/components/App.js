import React from "react";
import styled from "styled-components";
import Header from "./Header";
import PostControl from "./PostControl";
import SideBar from "./SideBar";

const PageStyle = styled.div`
  font-family: IBMPlexSans, Arial, sans-serif;
  padding: 0.5rem;
  background-color: #0b1416;

  .header {
    color: #eee;
    background-color: gray;
  }

  .content-sidebar {
    display: flex;
    flex-wrap: wrap;
  }

  .content-sidebar > *:nth-child(1) {
    flex: 1 1 70%;
    color: #d7dadc;
    background-color: #242526;
  }

  .content-sidebar > *:nth-child(2) {
    flex: 1 1 30%;
    color: #d7dadc;
    background-color: #242526;
  }
`;

function App() {
  return (
    <React.Fragment>
      <PageStyle>
        <div className="header">
          <Header />
        </div>
        <div className="content-sidebar">
          <div className="col">
            <PostControl />
          </div>
          <div className="col">
            <SideBar />
          </div>
        </div>
      </PageStyle>
    </React.Fragment>
  );
}

export default App;
