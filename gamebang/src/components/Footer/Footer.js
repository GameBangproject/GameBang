import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Footer.css";

import SnakeGameModal from "../Modals/SnakeGameModal/SnakeGameModal";
import BrickOutModal from "../Modals/BrickOutModal/BrickOutModal";
import CardModal from "../Modals/CardModal/CardModal";

import SnakeGameVideo from "../videos/SnakeGameVideo.mov";
import BrickGameVideo from "../videos/BrickGameVideo.mov";
import CardGameVideo from "../videos/CardGameVideo.mov";

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(0);
  const modalRef = useRef(null);
  const containerRef = useRef(null);

  const snakeGameVideoRef = useRef();
  const brickGameVideoRef = useRef();
  const cardGameVideoRef = useRef();

  const [isSnakeGameHovered, setIsSnakeGameHovered] = useState(false);
  const [isBrickGameHovered, setIsBrickGameHovered] = useState(false);
  const [isCardGameHovered, setIsCardGameHovered] = useState(false);

  const handleMouseEnterSnakeGame = () => {
    setIsSnakeGameHovered(true);
    snakeGameVideoRef.current.play();
  };

  const handleMouseLeaveSnakeGame = () => {
    setIsSnakeGameHovered(false);
    snakeGameVideoRef.current.pause();
  };

  const handleMouseEnterBrickGame = () => {
    setIsBrickGameHovered(true);
    brickGameVideoRef.current.play();
  };

  const handleMouseLeaveBrickGame = () => {
    setIsBrickGameHovered(false);
    brickGameVideoRef.current.pause();
  };

  const handleMouseEnterCardGame = () => {
    setIsCardGameHovered(true);
    cardGameVideoRef.current.play();
  };

  const handleMouseLeaveCardGame = () => {
    setIsCardGameHovered(false);
    cardGameVideoRef.current.pause();
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(0);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = modalOpen
        ? "paused"
        : "running";
    }
    console.log("Modal open state: ", modalOpen);
  }, [modalOpen]);

  useEffect(() => {
    startImageLoop();
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function startImageLoop() {
    const container = containerRef.current;
    const buttons = container.querySelectorAll(".modalButton");
    const buttonCount = buttons.length;

    if (buttonCount > 0) {
      // CSS 애니메이션 시작
      container.style.animation = `slide ${buttonCount * 10}s infinite linear`;

      // 각 버튼에 대해 이벤트 핸들러를 설정합니다.
      buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          container.style.animationPlayState = "paused";
        });

        button.addEventListener("mouseleave", () => {
          container.style.animationPlayState = "running";
        });
      });
    }
  }

  return (
    <div className="footerContainer">
      <div className="image-container" ref={containerRef}>
        <div className="infinite-scroll-x">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <button
                className="SnakeGameModalButton"
                onMouseEnter={handleMouseEnterSnakeGame}
                onMouseLeave={handleMouseLeaveSnakeGame}
                onClick={() => setModalOpen(1)}
              >
                {!isSnakeGameHovered && (
                  <div
                    className="image-thumbnail"
                    style={{
                      backgroundImage:
                        'url("../../resources/SnakeGameThumbnail.png")',
                      opacity: isSnakeGameHovered ? 0 : 1,
                      transition: "opacity 0.5s ease-in-out",
                    }}
                  />
                )}
                <video
                  ref={snakeGameVideoRef}
                  muted
                  autoPlay
                  style={{
                    position: "relative",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    opacity: isSnakeGameHovered ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                  }}
                >
                  <source src={SnakeGameVideo} type="video/mp4" />
                </video>
              </button>
              <button
                className="BrickGameModalButton"
                onMouseEnter={handleMouseEnterBrickGame}
                onMouseLeave={handleMouseLeaveBrickGame}
                onClick={() => setModalOpen(2)}
              >
                {!isBrickGameHovered && (
                  <div
                    className="image-thumbnail"
                    style={{
                      backgroundImage:
                        'url("../../resources/BrickGaemThumbnail.png")',
                      opacity: isBrickGameHovered ? 0 : 1,
                      transition: "opacity 0.5s ease-in-out",
                    }}
                  />
                )}
                <video
                  ref={brickGameVideoRef}
                  autoPlay
                  muted
                  style={{
                    position: "relative",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: isBrickGameHovered ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                  }}
                >
                  <source src={BrickGameVideo} type="video/mp4" />
                </video>
              </button>
              <button
                className="CardModalButton"
                onMouseEnter={handleMouseEnterCardGame}
                onMouseLeave={handleMouseLeaveCardGame}
                onClick={() => setModalOpen(3)}
              >
                {!isCardGameHovered && (
                  <div
                    className="image-thumbnail"
                    style={{
                      backgroundImage:
                        'url("../../resources/CardGameThumbnail.png")',
                      opacity: isCardGameHovered ? 0 : 1,
                      transition: "opacity 0.5s ease-in-out",
                    }}
                  />
                )}
                <video
                  ref={cardGameVideoRef}
                  autoPlay
                  muted
                  style={{
                    position: "relative",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    opacity: isCardGameHovered ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                  }}
                >
                  <source src={CardGameVideo} type="video/mp4" />
                </video>
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
      <CSSTransition
        in={modalOpen === 1}
        timeout={300}
        classNames="my-node"
        unmountOnExit
      >
        <SnakeGameModal setModalOpen={setModalOpen} />
      </CSSTransition>
      <CSSTransition
        in={modalOpen === 2}
        timeout={300}
        classNames="my-node"
        unmountOnExit
      >
        <BrickOutModal setModalOpen={setModalOpen} />
      </CSSTransition>
      <CSSTransition
        in={modalOpen === 3}
        timeout={300}
        classNames="my-node"
        unmountOnExit
      >
        <CardModal setModalOpen={setModalOpen} />
      </CSSTransition>
    </div>
  );
};

export default Footer;
