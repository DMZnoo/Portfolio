import React, {useEffect, useState} from 'react'
import ReactPlayer from "react-player";
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';
import SoftwareProjects from "./projects/SoftwareProjects";
import WebProjects from "./projects/WebProjects";
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width:"90%",
        height:"60%"
    }
};
const softwareConfig =
    [
        {
            projectTitle:"Helicopter Simulation",
            projectURL:"https://youtu.be/qxyVnWaRFz8",
            languageUsed:"C++ and OpenGL",
            repoURL:"https://github.com/DMZnoo/Helicopter",
            button:"demo1",
            style:customStyles
        },
        {
            projectTitle:"Solar System Simulation",
            projectURL:"https://youtu.be/osDyGag0H-E",
            languageUsed:"C++ and OpenGL",
            repoURL:"https://github.com/DMZnoo/Solar_System",
            button:"demo2",
            style:customStyles
        }
    ];
const webConfig =
    [
        {
            projectTitle:"Orion Health Developer Portal",
            projectURL:"https://developer.orionhealth.io/",
            languageUsed:"JQuery,CSS,Gulp,Node.js",
            button:"demo1",
            style:customStyles
        }
    ]
const Projects = () => {


    const location = useLocation();
    const [isProfession,SetProfession] = useState("");
    useEffect(()=>{
        SetProfession(location.state.prof);
    },[location]);


    return(
        <div className="ui center aligned segment" id="project">
                {isProfession==="software" && (
                    <div className="ui centered grid">
                        <SoftwareProjects config={softwareConfig[0]}/>
                        <SoftwareProjects config={softwareConfig[1]}/>
                    </div>
                )
                }
            {isProfession==="web" && (
                <div className="ui centered grid">
                    <WebProjects config={webConfig[0]}/>
                </div>
            )

            }


        </div>
    );
};
export default Projects;
