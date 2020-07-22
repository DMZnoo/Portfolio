import React, {useState,useEffect} from "react";
import styled, { keyframes } from 'styled-components';
import { slideInLeft } from 'react-animations';
import NavbarTransitionFix from "./NavbarTransitionFix";
import { useLocation } from 'react-router-dom';
const Intro = () => {
    const profilePhoto = require('../resources/profile.png');
    const SlideIn = styled.div`animation: 2s ${keyframes`${slideInLeft}`} 1 `;
    const location = useLocation();
    const [isProfession,SetProfession] = useState("");
    useEffect(()=>{
        SetProfession(location.state.prof);
    },[location]);
    return (
        <div className="intro">
            {/*<NavbarTransitionFix/>*/}
            <div className="ui center aligned segment">
                <SlideIn>
                    <div className="ui centered small circular image" style={{borderRadius:"50%",padding: "0em", maxHeight:"50rem",maxWidth:"50rem",zIndex:"5"}}>
                        <img src={profilePhoto}/>
                    </div>
                </SlideIn>
                <div className="content">
                    <h1 className="ui header">Hi there!</h1>
                    <h1 className="ui header">My name is Daniel</h1>
                    {isProfession === "web" && (
                        <div>
                            <h3>I am a Full Stack Developer currently residing in Auckland,NZ</h3>
                            <h3>I am passionate about
                                <span className="container">
                                <span className="text text-a">r</span>
                                <span className="text text-a">e</span>
                                <span className="text text-u">s</span>
                                <span className="text text-u">p</span>
                                <span className="text text-d">o</span>
                                    <span className="text text-d">n</span>
                                    <span className="text text-i">s</span>
                                     <span className="text text-i">i</span>
                                     <span className="text text-o">v</span>
                                    <span className="text text-o">e</span>
                            </span>
                                        Design Practices and writing <span className="container graphics">Quality</span>
                                        <span> Code</span>
                                    </h3>
                        </div>

                    )
                    }
                    {isProfession === "software" && (
                        <div>
                            <h3>I am a Software Engineer currently residing in Auckland,NZ</h3>
                            <h3>I am passionate about
                                <span className="container">
                        <span className="text text-a">A</span>
                        <span className="text text-u">u</span>
                        <span className="text text-d">d</span>
                        <span className="text text-i">i</span>
                        <span className="text text-o">o</span>
                    </span>
                                Programming and <span className="container graphics">GRAPHICS</span>
                                <span> Engine development</span>
                            </h3>
                        </div>

                    )
                    }
                    {isProfession === "ml" && (
                        <div>
                            <h3>I am a Machine Learning Engineer currently residing in Auckland,NZ</h3>
                            <h3>I am passionate about
                                <span className="container">
                                <span className="text text-a">A</span>
                                <span className="text text-a">r</span>
                                <span className="text text-u">t</span>
                                <span className="text text-u">i</span>
                                <span className="text text-d">f</span>
                                    <span className="text text-d">i</span>
                                    <span className="text text-i">c</span>
                                     <span className="text text-i">i</span>
                                     <span className="text text-o">a</span>
                                    <span className="text text-o">l</span>
                            </span>
                                Intelligence and writing <span className="container graphics">Scalable</span>
                                <span> Machine Learning models</span>
                            </h3>
                        </div>

                    )
                    }


                </div>
            </div>
        </div>


    )
};
export default Intro;
