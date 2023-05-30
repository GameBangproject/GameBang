import React, { useRef, useEffect } from "react";

import "./SnakeGameModal.css";
import SnakeGameVideo from "../../snakegame_video/SnakeGameVideo.mov";

const SnakeGameModal = ({ setModalOpen }) => {
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
          <video src={SnakeGameVideo} controls></video>
        </div>
        <div className="game-description-play">
          <div className="game-description">
            <h2>SnakeGame</h2>
            <hr></hr>
            <span>
              Snake Game은 전통적인 아케이드 스타일의 게임으로, 플레이어는 뱀을
              조종하여 먹이를 먹으며 점수를 획득하는 게임입니다.
              <br />
              플레이어는 키보드의 화살표 키를 사용하여 뱀의 이동 방향을
              제어합니다.
              <br />
              뱀은 화면 내에서 계속 이동하며, 먹이를 먹을 때마다 뱀의 길이가
              늘어납니다. 뱀이 벽이나 자기 자신과 충돌하면 게임이 종료됩니다.
            </span>
          </div>
          <a
            href={process.env.PUBLIC_URL + "/games/Snakegame/SnakeGame.html"}
            className="SnakePlayButton"
          >
            게임 플레이
          </a>
        </div>
      </div>
    </div>
  );
};

export default SnakeGameModal;
