import React, { useEffect, useState } from "react";
import webproject1 from "../../resources/web-project-1.png";
import webproject2 from "../../resources/web-project-2.png";
import webproject3 from "../../resources/web-project-3.png";
import webproject4 from "../../resources/web-project-4.png";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import webConfig from "../config/webConfig.json";
const WebProjects = () => {
  const [isConfig, SetConfig] = useState(webConfig);
  const [modalIsOpen, setIsOpen] = useState([false, false, false]);
  const [imgSrc, SetimgSrc] = useState([
    webproject1,
    webproject2,
    webproject3,
    webproject4,
  ]);
  return (
    <>
      {isConfig.map((config, idx) => {
        return (
          <div className="ui columns grid">
            <div className="ui ten wide column">
              <button
                className={`ui orange inverted button`}
                onClick={() =>
                  setIsOpen((modalIsOpen) => [
                    ...modalIsOpen.slice(0, idx),
                    true,
                    ...modalIsOpen.slice(idx + 1),
                  ])
                }
                style={{ fontSize: "1em", position: "relative" }}
              >
                Learn More
              </button>
            </div>
            <div
              className="ui large image column"
              style={{
                borderRadius: "50%",
                width: "90vw",
                zIndex: "0",
                clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
              }}
            >
              <img src={imgSrc[config.id]} />
            </div>
            {modalIsOpen && (
              <Modal
                id={config.id}
                onClose={() =>
                  setIsOpen((modalIsOpen) => [
                    ...modalIsOpen.slice(0, config.id),
                    false,
                    ...modalIsOpen.slice(config.id + 1),
                  ])
                }
                onOpen={() =>
                  setIsOpen((modalIsOpen) => [
                    ...modalIsOpen.slice(0, config.id),
                    true,
                    ...modalIsOpen.slice(config.id + 1),
                  ])
                }
                open={modalIsOpen[config.id]}
              >
                <Modal.Header>{config.projectTitle}</Modal.Header>
                <Modal.Content image>
                  <Image size="medium" src={imgSrc[config.id]} wrapped />
                  <Modal.Description>
                    <Header>{config.projectTitle}</Header>
                    <h4>Tech Stack: </h4>
                    <p>{config.techStack}</p>
                    <h4>Description: </h4>
                    <div className={"description"}>
                      {config.description}
                      {Array.isArray(config.descList) ? (
                        <ul>
                          {config.descList.map((el) => {
                            return <li>{el}</li>;
                          })}
                        </ul>
                      ) : (
                        <>{config.descList}</>
                      )}
                    </div>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    color="black"
                    onClick={() =>
                      setIsOpen((modalIsOpen) => [
                        ...modalIsOpen.slice(0, config.id),
                        false,
                        ...modalIsOpen.slice(config.id + 1),
                      ])
                    }
                  >
                    Close
                  </Button>
                  <a
                    className="ui positive right labeled icon button"
                    onClick={() =>
                      setIsOpen((modalIsOpen) => [
                        ...modalIsOpen.slice(0, config.id),
                        false,
                        ...modalIsOpen.slice(config.id + 1),
                      ])
                    }
                    href={config.projectURL}
                    target="_blank"
                  >
                    Go
                  </a>
                </Modal.Actions>
              </Modal>
            )}
          </div>
        );
      })}
    </>
  );
};
export default WebProjects;
