import React from "react";
import styled, { keyframes } from 'styled-components';
import { slideInLeft } from 'react-animations';
import NavbarTransitionFix from "./NavbarTransitionFix";
const Intro = () => {
    const profilePhoto = require('../resources/profile.png');
    const SlideIn = styled.div`animation: 2s ${keyframes`${slideInLeft}`} 1 `;
    return (
        <div className="intro">
            <NavbarTransitionFix/>
            <div className="ui center aligned segment">
                <SlideIn>
                    <div className="ui centered small circular image" style={{borderRadius:"50%",padding: "0em", maxHeight:"50rem",maxWidth:"50rem",zIndex:"5"}}>
                        <img src={profilePhoto}/>
                    </div>
                </SlideIn>
                <div className="content">
                    <h1 className="ui header">Hi there!</h1>
                    <h1 className="ui header">My name is Daniel</h1>
                    <h3>I am a software engineer currently residing in Auckland,NZ</h3>
                    <h3>I am passionate about
                        <span className="container">
                        <span className="text text-a">A</span>
                        <span className="text text-u">u</span>
                        <span className="text text-d">d</span>
                        <span className="text text-i">i</span>
                        <span className="text text-o">o</span>
                    </span>
                        Programming and <span className="container graphics">GRAPHICS</span>
                        <span> Engine development</span></h3>
                </div>

                {/*<FadeIn><div className="ui centered" style={{backgroundColor:"orange",top:"5px",width:"100em",height:"30em",position:"absolute",zIndex:"3"}}></div></FadeIn>*/}
            </div>
        </div>


    )
};
export default Intro;
