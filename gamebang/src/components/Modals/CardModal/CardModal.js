import React, { useRef, useEffect } from "react";

import "./CardModal.css";
import CardGameVideo from "../../videos/CardGameVideo.mov";

const CardModal = ({ setModalOpen }) => {
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
          <video src={CardGameVideo} controls></video>
        </div>
        <div className="game-description-play">
          <div className="game-description">
            <h1 style={{ marginTop: "0px", marginBottom: "0px" }}>Fruit Flip</h1>
            <hr></hr>
            <span style={{ fontSize: "20px" }}>
              <strong>Fruit Flip</strong>은 메모리 카드 뒤집기 게임으로서, 각각의
              카드 뒷면에 과일 이미지가 부착되어 있습니다. <br />
              <br />
              게임의 목적은 플레이어가 카드를 뒤집어 동일한 과일 이미지를 가진
              두 카드를 찾아내는 것입니다.
              <br />
              <br />
              게임이 시작될 때, 모든 카드는 무작위로 배열되며, 각 카드의
              뒷면에는 임의의 과일 이미지가 부착되어 있습니다.플레이어는 두 개의
              카드를 선택하여 뒤집을 수 있습니다.
              <br />
              <br />
              만약 뒤집은 두 카드의 과일 이미지가 일치하면, 그 카드들은 매치된
              것으로 간주되고 게임판에서 남아있게 됩니다. 그렇지 않으면, 뒤집은
              카드들은 다시 원래대로 돌아가게 됩니다.
              <br />
              <br />
              게임 시작 후 60초의 시간이 주어지며, 이 시간 내에 가능한 한 많은
              카드 쌍을 찾아내야 합니다.사용자가 카드를 뒤집는 행위는 시도로
              계산되며, 이 시도 횟수는 게임 화면에 표시됩니다.
              <br />
              <br />
              시간이 다 되면 게임이 종료되며, 사용자는 스페이스바를 눌러서
              게임을 재시작할 수 있습니다.모든 카드 쌍을 찾아내면 게임을
              클리어한 것으로 간주됩니다. 이후, 사용자는 스페이스바를 눌러서
              게임을 재시작할 수 있습니다.
            </span>
          </div>
          <a
            href={process.env.PUBLIC_URL + "/games/Card/card.html"}
            className="PlayButton"
          >
            게임 플레이
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
