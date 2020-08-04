import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import AboutMe from "./components/AboutMe";
import React, {useEffect, useState} from "react";
import Projects from "./components/Projects";
import ScrollToTop from "./components/ScrollToTop";
import {withRouter} from 'react-router';
import Contact from "./components/Contact";
import { Route, Switch, Redirect} from "react-router-dom";
import Cover from "./Cover";
import styled from 'styled-components';

const App = () =>
{
    const [isClicked,SetClick] = useState(false);

    const AppWrapper = styled.div`
        width:90%;
        margin:auto;
        align-content: center;
    `;
    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Cover onClick={SetClick}/>
                </Route>
                {!isClicked ? <Redirect to="/"/> :
                        <Route path='/about'>
                            <Navbar/>
                            <AppWrapper>
                                <Intro/>
                                <AboutMe/>
                                <Projects/>
                                <ScrollToTop/>
                                <Contact/>
                            </AppWrapper>
                        </Route>
                }
            </Switch>

        </main>

    );
};

export default a(App);
