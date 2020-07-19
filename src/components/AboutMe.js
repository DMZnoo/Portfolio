import React, {useEffect, useState} from "react";
import styled, { keyframes } from 'styled-components';
import Hobbies from './Hobbies';
import LanguageList from "./LanguageList";
import HistoryOfMe from "./HistoryOfMe";
import "grid-css/grid.min.css";
import { slideInLeft, slideInRight, } from 'react-animations';
import {useLocation} from "react-router-dom";



const hobbiesConfig =
    [
        {
            hobby:"Gym",
            image:false,
            icon:"heartbeat icon",
            content:"I've been into weight lifting for 10+ years. Les Mills member since 2 0 1 8! :)",
            segmentColor:"red"
        },
        {
            hobby:"Piano",
            image:false,
            icon:"music icon",
            content:"I've always been into music and had recently picked up piano as a hobby :)",
            segmentColor:"purple"
        },
        {
            hobby:"Swimming",
            image:true,
            ImageICON: <img src={require('../resources/swimming.png')} style={{width:"1.5em",paddingRight:"0.3em",height:"1em"}}/>,
            content:"Swimmer since I was 9. Definitely not afraid of the water :)",
            segmentColor:"blue"
        },
        {
            hobby:"Electronic Music",
            image:true,
            ImageICON:<img src={require('../resources/Electronic_Music.png')} style={{width:"1.5em",paddingRight:"0.3em",height:"1em"}}/>,
            content:"I find it great for programming. I've also gone to several raves/festivals.",
            segmentColor:"yellow"
        }
    ];

function AboutMe() {
    const SlideInLeft = styled.div`animation: 2s ${keyframes`${slideInLeft}`} infinite `;
    const SlideInLeftOnce = styled.div`animation: 2s ${keyframes`${slideInLeft}`} 1 `;
    const SlideInRight = styled.div`animation: 2s ${keyframes`${slideInRight}`} infinite `;
    const location = useLocation();
    const [isProfession,SetProfession] = useState("");
    useEffect(()=>{
        SetProfession(location.state.prof);
    },[location]);
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
                <div>
                    <h2 className="ui header">Favorite Activities</h2>
                    <Hobbies config={hobbiesConfig[0]}/>
                    <Hobbies config={hobbiesConfig[1]}/>
                    <Hobbies config={hobbiesConfig[2]}/>
                    <Hobbies config={hobbiesConfig[3]}/>
                </div>


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
