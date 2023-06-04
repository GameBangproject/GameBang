import React from "react";
import { Helmet } from 'react-helmet';
import "./Header.css";

const Header = () => {
  return (
    <div className="headerContainer">
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap" rel="stylesheet" />
      </Helmet>
      <span className="gameTitle">
        GameBang
      </span>
    </div>
  );
};

export default Header;
