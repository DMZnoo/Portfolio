import React, {useEffect, useState} from "react";
import webproject1 from '../../resources/web-project-1.png';
import webproject2 from '../../resources/web-project-2.png'
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
        <div className="ui columns grid"
             onMouseEnter={() => (detectMouse(true))}
             onMouseLeave={() => (detectMouse(false))}
             onClick={()=>(detectMouse(true))}
        >
            {!modalIsOpen && (
                <div className="ui ten wide column">
                    <button
                        className={`ui orange inverted button ${config.button}`}
                        onClick={() => setIsOpen(true)}
                        style={{fontSize:"1em",position:"relative"}}>Learn More</button>
                </div>
            )

            }
            <div className="ui large image column" style={{borderRadius:"50%", width:"90vw",zIndex:"0"}}>
                {config.id === 1 && (<img src={webproject1}/>)}
                {config.id === 2 && (<img src={webproject2}/>)}
            </div>
            {modalIsOpen && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={()=>setIsOpen(false)}
                    style={config.style}
                    contentLabel="Project Modal"
                >
                    <div className="ui segment" style={{width:"100%",height:"90%",zIndex:"1000",overflow:"scroll"}}>
                        <h2>{config.projectTitle}</h2>
                        <h4>Technologies: </h4>
                        <p>{config.languageUsed}</p>
                        <h4>Description: </h4>
                        <p>
                            {config.description}
                            {config.descList}
                        </p>
                        <h4>Repository: </h4>
                        <p>
                            Check out the repository: <a href={config.projectURL} target="_blank"> URL</a>
                        </p>
                    </div>
                    <div className="ui vertical segment" style={{paddingTop: "1em"}}>
                        <button className="ui red inverted button" onClick={()=>closeModal(true)}>close</button>
                    </div>

                </Modal>
            )

            }
        </div>
    )
};
export default WebProjects;
