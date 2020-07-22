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
            description:
                "This project was done as part of the graphics and animation class at AUT. I've learned how to build a camera and load obj files as part of the scene. The cube skymap was used to render the sky.",
            style: customStyles
        },
        {
            projectTitle:"Solar System Simulation",
            projectURL:"https://youtu.be/osDyGag0H-E",
            languageUsed:"C++ and OpenGL",
            repoURL:"https://github.com/DMZnoo/Solar_System",
            button:"demo2",
            description:
                "The camera tracking of the nearest object and some basic light system in GLSL shaders were the major learning outcome of this project. The space was rendered with an inverted sphere with its texture applied inside out.",
            style: customStyles
        }
    ];
const webConfig =
    [
        {
            projectTitle:"Orion Health Developer Portal",
            projectURL:"https://developer.orionhealth.io/",
            languageUsed:"JQuery,CSS,Gulp,Node.js",
            button:"demo1",
            description:"This was part of my summer internship in 2019. For this project, I was assigned to improve the front end of the website. The major changes would be the side bar. I had included the search bar and method drop downs for better navigation",
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
                    <div className="ui grid">
                        <div className="two column row">
                            <SoftwareProjects config={softwareConfig[0]}/>
                            <SoftwareProjects config={softwareConfig[1]}/>
                        </div>

                    </div>
                )
                }
            {isProfession==="web" && (
                <div className="ui grid">
                    <WebProjects config={webConfig[0]}/>
                </div>
            )

            }


        </div>
    );
};
export default Projects;
