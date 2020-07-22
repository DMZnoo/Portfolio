import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";
// import webproject1 from "../../resources/web-project-1.png";
import Modal from "react-modal";

const SoftwareProjects = ({config}) =>
{

    const [isShown, SetIsShown] = useState(false);
    const [isPlayable,SetPlayable] = useState(false);

    const [modalIsOpen,setIsOpen] = useState(false);

    function detectMouse(n)
    {
        SetIsShown(n);
        SetPlayable(n);
    }
    function closeModal(modalN){
        SetIsShown(modalN);
        SetPlayable(modalN);
        setIsOpen(!modalN);
    }



    return (
        <div
            className="cell software-projects"
        >
            <div
                 onMouseEnter={() => (detectMouse(true))}
                 onMouseLeave={() => (detectMouse(false))}
                 onClick={()=>(detectMouse(true))}

            >
                {!modalIsOpen && (
                    <div>
                        <button
                            className={`ui orange inverted button ${config.button}`}
                            onClick={() => setIsOpen(true)}
                            style={{opacity:isShown ? 1:0,transition: "opacity 1s",zIndex:"5"}}>Learn More</button>
                    </div>
                )

                }


                <ReactPlayer
                    url={config.projectURL}
                    width='45vw'
                    height="40vh"
                    volume={1}
                    muted={true}
                    loop={false}
                    playing={isPlayable ? false:true}
                    // controls={isPlayable==1 ? 0 : 1}
                    controls={true}
                ></ReactPlayer>
                {modalIsOpen && (
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={()=>setIsOpen(false)}
                        style={config.style}
                        contentLabel="Example Modal"
                    >
                        <div className="ui segment" style={{width:"100%",height:"100%",zIndex:"10"}}>
                            <h2>{config.projectTitle}</h2>
                            <h4>Technologies: </h4>
                            <p>{config.languageUsed}</p>
                            <h4>Description: </h4>
                            <p>
                                {config.description}
                            </p>
                            <h4>Repository: </h4>
                            <p>
                                Check out the repository: <a href={config.repoURL} target="_blank"> URL</a>
                            </p>
                        </div>
                        <div className="ui vertical segment">
                            <button className="ui red inverted button" onClick={()=>closeModal(true)}>close</button>
                        </div>

                    </Modal>
                )

                }
            </div>
        </div>

    )

};
export default SoftwareProjects;
