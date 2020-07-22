import React, {useEffect, useState} from "react";
import styled, {keyframes} from 'styled-components';
import {slideOutUp,slideOutDown} from 'react-animations';
import {useHistory} from "react-router-dom";
import DelayLink from "./DelayLink";


const Cover = ({onClick}) => {
    const history = useHistory();
    const SlideOutUp = styled.div`animation: 2s ${keyframes`${slideOutUp}`} 1 `;
    const SlideOutDown = styled.div`animation: 2s ${keyframes`${slideOutDown}`} 1 `;
    const [isButtonClicked,SetButtonClick] = useState(
        {
            web:false,
            software:false,
            ml:false,
            transition:false
        }
    );
    function setOnClick(param1,param2){
        SetButtonClick({[param1]:true,[param2]:true});
        onClick(true);
        history.push("/");
    }

    return (
        <div className="ui segments">
            {isButtonClicked.transition  && (
                <SlideOutUp>
                    <div className="ui segment grid-top top-cover"/>
                </SlideOutUp>
            )
            }
            {!isButtonClicked.transition && (
                <div className="ui segment grid-top top-cover"/>
            )
            }
            <div className="ui segment grid choices" style={{border:'none'}}>
                <h1 className="ui cell">Portfolio Categories</h1>
                <div className="ui segment grid choices" style={{border:'none'}}>
                    <DelayLink
                        to={{
                            pathname:'/about',
                            state:{prof:"web"}
                        }}
                        className="ui cell inverted right labeled icon red button"
                        delay={1500}
                        onDelayStart={()=>setOnClick("web","transition")}
                        style={{width:"auto",fontSize:"1em"}}
                    ><i className="right arrow icon"></i>Front/Back-end Developer</DelayLink>
                    <DelayLink
                        to={{
                            pathname:'/about',
                            state:{prof:"software"}
                        }}
                        className=" ui cell inverted right labeled icon blue button"
                        delay={1500}
                        onDelayStart={()=>setOnClick("software","transition")}
                        state={isButtonClicked}
                        style={{width:"auto",fontSize:"1em"}}
                    ><i className="right arrow icon"></i>Software Engineer</DelayLink>
                    <DelayLink
                        to={{
                            pathname:'/about',
                            state:{prof:"ml"}
                        }}
                        className=" ui cell inverted right labeled icon violet button"
                        delay={1500}
                        onDelayStart={()=>setOnClick("ml","transition")}
                        state={isButtonClicked}
                        style={{width:"auto",fontSize:"1em"}}
                    ><i className="right arrow icon"></i>Machine Learning Engineer</DelayLink>
                </div>
            </div>
            {isButtonClicked.transition && (
                <SlideOutDown className="bottom-cover-div">
                    <div className="ui segment grid-bottom bottom-cover"></div>
                </SlideOutDown>
            )
            }
            {!isButtonClicked.transition && (
                <div className="bottom-cover-div">
                    <div className="ui segment grid-bottom bottom-cover"></div>
                </div>
            )
            }
        </div>
    )
};
export default Cover;
