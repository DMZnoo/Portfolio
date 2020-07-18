import React from "react";
import styled, { keyframes } from 'styled-components';
import Hobbies from './Hobbies';
import LanguageList from "./LanguageList";
import HistoryOfMe from "./HistoryOfMe";
import "grid-css/grid.min.css";
import { slideInLeft, slideInRight, } from 'react-animations';

function AboutMe() {
    const SlideInLeft = styled.div`animation: 2s ${keyframes`${slideInLeft}`} infinite `;
    const SlideInLeftOnce = styled.div`animation: 2s ${keyframes`${slideInLeft}`} 1 `;
    const SlideInRight = styled.div`animation: 2s ${keyframes`${slideInRight}`} infinite `;

    // useEffect(()=>{
    //     window.scrollTo({
    //         top: 400,
    //         behavior: 'smooth',
    //     })
    //     console.log("HERE1");
    // });


    return(
            <div>
            <div className="ui center aligned segment">

                <h1 className="ui header" style={{fontWeight:"900"}} id="aboutme">
                    <SlideInLeft style={{display:"inline-block"}}>
                        <i className="caret right icon" style={{textAlign:"left",fontSize:"1em"}}/>
                    </SlideInLeft>
                    About Me
                    <SlideInRight style={{display:"inline-block"}}>
                        <i className="caret left icon" style={{textAlign:"right",fontSize:"1em"}}/>
                    </SlideInRight>
                </h1>

            </div>
            <div className="ui left aligned segment">
                <h2 className="ui header">Skill Set</h2>
                <div className="grid assessmentList">
                    <div className="cell"></div>
                    <div className="cell">Beginner</div>
                    <div className="cell">Elementary</div>
                    <div className="cell">Intermediate</div>
                    <div className="cell">Advanced</div>
                    <div className="cell">Expert</div>
                </div>

                <SlideInLeftOnce>
                    <LanguageList/>
                </SlideInLeftOnce>

                <Hobbies/>
            </div>
            <HistoryOfMe/>
            <div className="ui center aligned segment">
                <h1 className="ui header" style={{fontWeight:"900"}}>
                    <SlideInLeft style={{display:"inline-block"}}>
                        <i className="caret right icon" style={{textAlign:"left",fontSize:"1em"}}/>
                    </SlideInLeft>
                    Projects
                    <SlideInRight style={{display:"inline-block"}}>
                        <i className="caret left icon" style={{textAlign:"right",fontSize:"1em"}}/>
                    </SlideInRight>
                </h1>
            </div>
            </div>

    )
};
export default AboutMe;
