import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";

import SnakeGameVideo from "../snakegame_video/SnakeGameVideo.mov";

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(0);
  const modalRef = useRef(null);
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(0);
    }
  };

  useEffect(() => {
    startImageLoop();
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = modalOpen
        ? "paused"
        : "running";
    }
  }, [modalOpen]);

  function startImageLoop() {
    const container = containerRef.current;
    const buttons = container.querySelectorAll(".modalButton");
    const buttonCount = buttons.length;

    if (buttonCount > 0) {
      const buttonWidth = buttons[0].offsetWidth;

      // CSS 애니메이션 시작
      container.style.animation = `slide ${buttonCount * 5}s infinite linear`;

      container.addEventListener("mouseenter", () => {
        container.style.animationPlayState = "paused";
      });

      container.addEventListener("mouseleave", () => {
        container.style.animationPlayState = "running";
      });
    }
  }

  return (
    <div className="footerContainer">
      <div className="image-container" ref={containerRef}>
        <button
          className="SnakeGameModalButton"
          onClick={() => setModalOpen(1)}
        ></button>
        <button
          className="TetrisGameModalButton"
          onClick={() => setModalOpen(2)}
        ></button>
        <button
          className="modalButton"
          onClick={() => setModalOpen(3)}
        ></button>
        <button
          className="modalButton"
          onClick={() => setModalOpen(4)}
        ></button>
      </div>
      {modalOpen === 1 && (
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
                  Snake Game은 전통적인 아케이드 스타일의 게임으로, 플레이어는
                  뱀을 조종하여 먹이를 먹으며 점수를 획득하는 게임입니다.
                  <br />
                  플레이어는 키보드의 화살표 키를 사용하여 뱀의 이동 방향을
                  제어합니다.
                  <br />
                  뱀은 화면 내에서 계속 이동하며, 먹이를 먹을 때마다 뱀의 길이가
                  늘어납니다. 뱀이 벽이나 자기 자신과 충돌하면 게임이
                  종료됩니다.
                </span>
              </div>
              <a
                href={
                  process.env.PUBLIC_URL + "/games/Snakegame/SnakeGame.html"
                }
                className="SnakePlayButton"
              >
                게임 플레이
              </a>
            </div>
          </div>
        </div>
      )}
      {modalOpen === 2 && (
        <div className="modal" ref={modalRef}>
          <button onClick={() => setModalOpen(0)}>Close Modal 2</button>
        </div>
      )}
      {modalOpen === 3 && (
        <div className="modal" ref={modalRef}>
          <button onClick={() => setModalOpen(0)}>Close Modal 3</button>
        </div>
      )}
      {modalOpen === 4 && (
        <div className="modal" ref={modalRef}>
          <button onClick={() => setModalOpen(0)}>Close Modal 4</button>
        </div>
      )}
    </div>
  );
};

export default Footer;
