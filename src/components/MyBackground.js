import React, { useState } from "react";
import { slideInDown, slideInUp } from "react-animations";
import styled, { keyframes } from "styled-components";
const MyBackground = () => {
  const [isShown, SetIsShown] = useState(false);
  const SlideInDown = styled.div`
    animation: 2s ${keyframes`${slideInDown}`} 1;
  `;
  const SlideInUp = styled.div`
    animation: 1s ${keyframes`${slideInUp}`} 1;
  `;
  const toggleState = () => SetIsShown(!isShown);

  return (
    <div>
      {!isShown && (
        <div className="ui center segment">
          <SlideInDown>
            <button className="ui inverted green button" onClick={toggleState}>
              Why did I start coding?
            </button>
          </SlideInDown>
        </div>
      )}
      {isShown && (
        <SlideInUp>
          <div className="ui center segment">
            <p className="aboutMe">
              My journey to code began around 2017, when I was in the Korean
              Army. Prior to this, I was studying to become a personal trainer
              in the United States.
              <br />
              <br />
              It was a difficult choice, as I had lived in the U.S for over 10
              years and I had to stop my education and go back to South Korea,
              where I was born, but it felt like a very different place. There,
              I was able to gain fresh perspective and what I should do after
              the military.
              <br />
              <br />
              During the military, I was only given access the internet for 1
              hour per day and was not allowed to have a phone. Therefore, I was
              really able to put a hard reset from my previous life and find out
              what I enjoy the most. It was also during this time that I had
              witnessed Deep Mind's AlphaGo, absolutely dominating the South
              Korea's well-known grandmaster Lee Sedol. It was this very moment
              when I had become fully invested in learning how to code.
            </p>
            <button className="ui filled red button" onClick={toggleState}>
              Close?
            </button>
          </div>
        </SlideInUp>
      )}
    </div>
  );
};

export default MyBackground;
