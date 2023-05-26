import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import cappadocia from "../../resources/cappadocia.png";
import dokyo from "../../resources/dokyo.png";
import Paris from "../../resources/Paris.png";
import taipei from "../../resources/taipei.png";
import "./Footer.css";

const Footer = () => {
  useEffect(() => {
    startImageLoop();
  }, []);

  function startImageLoop() {
    const container = document.querySelector(".image-container");
    const images = container.querySelectorAll("img");
    const containerWidth = container.offsetWidth;
    const imageCount = images.length;
    const imageWidth = images[0].offsetWidth;
    let offset = 0;

    // 이미지 복제
    for (let i = 0; i < imageCount; i++) {
      const clone = images[i].cloneNode(false);
      container.appendChild(clone);
    }

    // 컨테이너 너비를 뷰포트의 너비로 설정
    container.style.width = `${window.innerWidth}px`;

    // 이미지를 움직이는 함수
    function moveImages() {
      offset -= 0.25;

      if (offset <= -imageWidth * (imageCount - 1)) {
        const firstChild = container.children[0];
        container.appendChild(firstChild.cloneNode(true));
        container.removeChild(firstChild);
        offset += imageWidth;
      }

      container.style.transform = `translateX(${offset}px)`;
      requestAnimationFrame(moveImages);
    }

    // 애니메이션 시작
    moveImages();
  }

  return (
    <div className="footerContainer">
      <div className="image-container">
        <a href={process.env.PUBLIC_URL + "/games/Snakegame/SnakeGame.html"}>
          <img src={cappadocia} alt="Cappadocia" />
        </a>
        <img src={dokyo} alt="Dokyo" />
        <img src={Paris} alt="Paris" />
        <img src={taipei} alt="Taipei" />
      </div>
    </div>
  );
};

export default Footer;
