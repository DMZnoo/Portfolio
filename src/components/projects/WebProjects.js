import React, {useEffect, useState} from "react";
import webproject1 from '../../resources/web-project-1.png';
import Modal from "react-modal";

const WebProjects = ({config}) => {
    const [isShown, SetIsShown] = useState(false);
    const [modalIsOpen,setIsOpen] = useState(false);
    function detectMouse(n)
    {
        SetIsShown(n);
        // SetPlayable(n);
    }
    function closeModal(modalN){
        SetIsShown(modalN);
        // SetPlayable(modalN);
        setIsOpen(!modalN);
    }
    return (
        <div className="cell"
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
            <div className="ui large image" style={{borderRadius:"50%",paddingTop:"7em", width:"90vw",zIndex:"0"}}>
                <img src={webproject1}/>
            </div>
            {modalIsOpen && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={()=>setIsOpen(false)}
                    style={config.style}
                    contentLabel="Example Modal"

                >
                    <div className="ui segment" style={{width:"100%",height:"100%",zIndex:"6"}}>
                        <h2>{config.projectTitle}</h2>
                        <h4>Written in: {config.languageUsed} </h4>
                        <div className="grid">
                            <div className="cell">
                                <p>Check out the website: </p>
                            </div>
                            <div className="cell">
                                <a href={config.projectURL} target="_blank">LINK</a>
                            </div>
                        </div>
                    </div>
                    <div className="ui vertical segment">
                        <button className="ui red inverted button" onClick={()=>closeModal(true)}>close</button>
                    </div>

                </Modal>
            )

            }
        </div>
    )
};
export default WebProjects;
