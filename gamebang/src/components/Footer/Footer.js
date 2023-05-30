import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";

import SnakeGameModal from "../Modals/SnakeGameModal/SnakeGameModal";

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
      {modalOpen === 1 && <SnakeGameModal setModalOpen={setModalOpen} />}
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
