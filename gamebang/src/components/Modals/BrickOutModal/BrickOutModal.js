import React, { useRef, useEffect } from "react";

import "./BrickOutModal.css";
import BrickGameVideo from "../../videos/BrickGameVideo.mov";

const BrickOutModal = ({ setModalOpen }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(0);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="modal" ref={modalRef}>
      <div className="modal-content">
        <div className="game-demo">
          <video src={BrickGameVideo} controls></video>
        </div>
        <div className="game-description-play">
          <div className="game-description">
            <h1 style={{ marginTop: "0px", marginBottom: "0px" }}>Brickout</h1>
            <hr></hr>
            <span style={{ fontSize: "20px" }}>
              <strong>Brickout 게임은</strong> 플레이어가 패들을
              좌우로 움직여 공을 튕겨내어 화면 상단의 벽돌들을 파괴해야 합니다.{" "}
              <br />
              <br />
              공은 패들에 튕겨져 다시 위쪽으로 향하며, 벽돌을 맞추면 벽돌이
              사라집니다. 목표는 모든 벽돌을 제거하는 것입니다. <br />
              <br />
              플레이어가 공을 튕겨내지 못하고 화면 아래로 떨어뜨리면, 게임이 종료됩니다.<br />
              <br />
              이 게임은 직관적이며 쉽게 플레이 가능하고, 공의 튕기는 방향이 변화하기 때문에 플레이어의 반응속도와 능력을 테스트합니다.
            </span>
          </div>
          <a
            href={process.env.PUBLIC_URL + "/games/BrickOut/BrickOut.html"}
            className="PlayButton"
          >
            게임 플레이
          </a>
        </div>
      </div>
    </div>
  );
};

export default BrickOutModal;
