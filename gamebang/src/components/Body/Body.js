import React from "react";

import "./Body.css";

const Body = () => {
  return (
    <div className="bodyContainer">
      <span style={{ color: "black" }}>This is Body</span>
      <a href={process.env.PUBLIC_URL + "/games/Snakegame/SnakeGame.html"}>Snake</a>
    </div>
  );
};

export default Body;
