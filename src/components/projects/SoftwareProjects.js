import React, { useState} from "react";
import ReactPlayer from "react-player";
import { Button, Header, Modal } from 'semantic-ui-react'
import "video-react";
import softwareConfig from '../config/softwareConfig.json'

const SoftwareProjects = () =>
{
    const [isConfig,SetConfig] = useState(softwareConfig);
    const [isPlayable,SetPlayable] = useState(false);
    const [modalIsOpen,setIsOpen] = useState(false);

    function detectMouse(n)
    {
        SetPlayable(n);
    }



    return (
        <div className={"ui segment"}>
            {isConfig.map((config)=>{
                return(
                    <div
                        className="cell software-projects"
                    >
                        <div
                            onMouseEnter={() => (detectMouse(true))}
                            onMouseLeave={() => (detectMouse(false))}
                            onClick={()=>(detectMouse(true))}

                        >
                            <div className="ui ten wide column">
                                <button
                                    className={`ui orange inverted button ${config.button}`}
                                    onClick={() => setIsOpen(true)}
                                    style={{position:"relative",marginBottom:"1vh"}}>Learn More</button>
                            </div>
                            <div className="react-player-wrapper">
                                <ReactPlayer
                                    className="react-player"
                                    playsInline
                                    width='100%'
                                    height='100%'
                                    url={config.projectURL}
                                    volume={1}
                                    muted={true}
                                    loop={false}
                                    playing={isPlayable ? false:true}
                                    // controls={isPlayable==1 ? 0 : 1}
                                    controls={true}
                                ></ReactPlayer>
                            </div>

                            {modalIsOpen && (
                                <Modal
                                    onClose={() => setIsOpen(false)}
                                    onOpen={() => setIsOpen(true)}
                                    open={modalIsOpen}
                                    trigger={<Button>Show Modal</Button>}
                                >
                                    <Modal.Header>Select a Photo</Modal.Header>
                                    <Modal.Content image>
                                        <Modal.Description>
                                            <Header>{config.projectTitle}</Header>
                                            <h4>Technologies: </h4>
                                            <p>{config.languageUsed}</p>
                                            <h4>Description: </h4>
                                            <div className={"description"}>
                                                {config.description}
                                                {config.descList}
                                            </div>
                                        </Modal.Description>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button color='black' onClick={() => setIsOpen(false)}>
                                            Close
                                        </Button>
                                        <a className="ui positive right labeled icon button"
                                           onClick={() => setIsOpen(false)}
                                           href={config.projectURL} target="_blank">Go</a>
                                    </Modal.Actions>
                                </Modal>
                            )

                            }
                        </div>
                    </div>
                )
            })

            }
        </div>

    )

};
export default SoftwareProjects;
