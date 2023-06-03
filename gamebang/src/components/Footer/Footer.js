import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Footer.css";

import SnakeGameModal from "../Modals/SnakeGameModal/SnakeGameModal";
import BrickOutModal from "../Modals/BrickOutModal/BrickOutModal";
import CardModal from "../Modals/CardModal/CardModal";

import SnakeGameVideo from "../videos/SnakeGameVideo.mov";

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(0);
  const modalRef = useRef(null);
  const containerRef = useRef(null);

  const videoRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current.pause();
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
      const buttonWidth = buttons[0].offsetWidth;

      // CSS 애니메이션 시작
      container.style.animation = `slide ${buttonCount * 10}s infinite linear`;

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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => setModalOpen(1)}
        >
          {!isHovered && (
            <div
              className="image-thumbnail"
              style={{
                backgroundImage:
                  'url("../../resources/SnakeGameThumbnail.png")',
                opacity: isHovered ? 0 : 1,
                transition: "opacity 0.5s ease-in-out",
              }}
            />
          )}
          <video
            ref={videoRef}
            muted
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <source src={SnakeGameVideo} type="video/mp4" />
          </video>
        </button>
        <button
          className="BrickGameModalButton"
          onClick={() => setModalOpen(2)}
        ></button>
        <button
          className="CardModalButton"
          onClick={() => setModalOpen(3)}
        ></button>
        <button
          className="modalButton"
          onClick={() => setModalOpen(4)}
        ></button>
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
