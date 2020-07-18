import React, {useState} from 'react'
import ReactPlayer from "react-player";
import Modal from 'react-modal';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

const Projects = () => {
    const [isShown, SetIsShown] = useState({
        vid1:false,
        vid2:false
    });
    const [isPlayable,SetPlayable] = useState({
        vid1:false,
        vid2:false
    });

    const [modalIsOpen,setIsOpen] = useState({
        vid1:false,
        vid2:false
    });
    function detectMouse(n)
    {
        SetIsShown(n);
        SetPlayable(n);
    }
    function closeModal(modalN){
        SetIsShown({
            [modalN]:true
        });
        SetPlayable({
            [modalN]:true
        });
        setIsOpen({
            [modalN]:false
        });
    }
    return(
        <div className="ui center aligned segment" id="project">
            <div className="ui centered grid">
                <div className="cell"
                     onMouseEnter={() => (detectMouse({vid1:true}))}
                     onMouseLeave={() => (detectMouse({vid1:false}))}
                     onClick={()=>(detectMouse({vid1:true}))}
                >
                    {!modalIsOpen.vid1 && (
                        <div>
                            <button
                                className="ui orange inverted button demo1"
                                onClick={() => setIsOpen({vid1: true})}
                                style={{opacity:isShown.vid1 ? 1:0,transition: "opacity 1s",zIndex:"5"}}>Learn More</button>
                        </div>
                    )

                    }
                    <ReactPlayer
                        url="https://youtu.be/qxyVnWaRFz8"
                        width='40vw'
                        height='40vh'
                        volume={1}
                        muted={true}
                        loop={false}
                        playing={isPlayable.vid1===true ? false:true}
                        // controls={isPlayable==1 ? 0 : 1}
                        controls={true}
                    ></ReactPlayer>
                    {modalIsOpen.vid1 && (
                        <Modal
                            isOpen={modalIsOpen.vid1}
                            onRequestClose={()=>setIsOpen({vid1:false})}
                            style={customStyles}
                            contentLabel="Example Modal"

                        >
                            <div className="ui segment" style={{width:"40vw",height:"40vh",zIndex:"6"}}>
                                <h2>Helicopter Simulation</h2>
                                <h4>Written in: C++ and OpenGL </h4>
                                <div className="grid">
                                    <div className="cell">
                                        <p>Check out the repository: </p>
                                    </div>
                                    <div className="cell">
                                        <a href="https://github.com/DMZnoo/Helicopter" target="_blank">REPO</a>
                                    </div>
                                </div>
                            </div>
                            <div className="ui vertical segment">
                                <button className="ui red inverted button" onClick={()=>closeModal('vid1')}>close</button>
                            </div>

                        </Modal>
                    )

                    }
                </div>
                <div className="cell"
                     onMouseEnter={() => (detectMouse({vid2:true}))}
                     onMouseLeave={() => (detectMouse({vid2:false}))}
                     onClick={()=>(detectMouse({vid2:true}))}
                >
                    {!modalIsOpen.vid2 && (
                        <div>
                            <button
                                className="ui orange inverted button demo2"
                                onClick={() => setIsOpen({vid2:true})}
                                style={{opacity:isShown.vid2 ? 1:0,transition: "opacity 1s",zIndex:"5"}}>Learn More</button>
                        </div>
                    )

                    }

                    <ReactPlayer
                        url="https://youtu.be/osDyGag0H-E"
                        width='40vw'
                        height='40vh'
                        volume={1}
                        muted={true}
                        loop={false}
                        playing={isPlayable.vid2===true ? false:true}
                        controls={true}
                    ></ReactPlayer>
                    {modalIsOpen.vid2 && (
                        <Modal
                            isOpen={modalIsOpen.vid2}
                            onRequestClose={()=>setIsOpen({vid2:false})}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <div className="ui segment" style={{width:"40vw",height:"40vh",zIndex:"6"}}>
                                <h2>Solar System Simulation</h2>
                                <h4>Written in: C++ and OpenGL </h4>
                                <div className="grid">
                                    <div className="cell">
                                        <p>Check out the repository: </p>
                                    </div>
                                    <div className="cell">
                                        <a href="https://github.com/DMZnoo/Solar_System" target="_blank">REPO</a>
                                    </div>
                                </div>
                            </div>
                            <div className="ui vertical segment">
                                <button className="ui red inverted button" onClick={()=>closeModal('vid2')}>close</button>
                            </div>

                        </Modal>
                    )

                    }

                </div>
            </div>
        </div>
    );
};
export default Projects;
