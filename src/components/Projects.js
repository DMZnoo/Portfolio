import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import SoftwareProjects from "./projects/SoftwareProjects";
import WebProjects from "./projects/WebProjects";

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
        },
        {
            projectTitle:"Solar System Simulation",
            projectURL:"https://youtu.be/osDyGag0H-E",
            languageUsed:"C++ and OpenGL",
            repoURL:"https://github.com/DMZnoo/Solar_System",
            button:"demo2",
            description:
                "The camera tracking of the nearest object and some basic light system in GLSL shaders were the major learning outcome of this project. The space was rendered with an inverted sphere with its texture applied inside out.",
        }
    ];
const webConfig =
    [
        {
            id:0,
            projectTitle:"Orion Health Developer Portal",
            projectURL:"https://developer.orionhealth.io/",
            languageUsed:"JQuery,CSS,Gulp,Node.js",
            button:"demo1",
            description:"This was part of my summer internship in 2019. For this project, " +
                "I was assigned to improve the front end of the website. Major changes include: ",
            descList:
                <ul>
                    <li>implemented the search bar/functionality from scratch</li>
                    <li>implemented JSON sample response panel for the API page</li>
                    <li>resolved minor bugs/scaling issues across the site</li>
                </ul>
        },
        {
            id:1,
            projectTitle:"Starwars API",
            projectURL:"https://starwars-api.dmznoo.vercel.app/",
            languageUsed:"React,Axios,Redux",
            button:"demo1",
            description:"This project was done to learn how to use the API as backend. " +
                "Learning outcomes include: ",
            descList:
                <ul>
                    <li>Fetch/read JSON from the API</li>
                    <li>Dynamically generate pages via API endpoint</li>
                    <li>Using redux to store API's pagination data</li>
                </ul>
        }
    ]
const Projects = () => {


    const location = useLocation();
    const [isProfession,SetProfession] = useState("");
    useEffect(()=>{
        SetProfession(location.state.prof);
    },[location]);


    return(
        <div className="ui center aligned segment">
                {isProfession==="software" && (
                    <div className="ui grid">
                        <div className="column">
                            <SoftwareProjects config={softwareConfig[0]}/>
                        </div>

                    </div>
                )
                }
            {isProfession==="web" && (
                <div className="ui grid">
                    <WebProjects/>
                </div>
            )

            }


        </div>
    );
};
export default Projects;
