import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import AboutMe from "./components/AboutMe";
import React, {useEffect} from "react";
import Projects from "./components/Projects";
import ScrollToTop from "./components/ScrollToTop";
import {withRouter} from 'react-router';
import Contact from "./components/Contact";
import { Route, Switch} from "react-router-dom";
import Cover from "./Cover";
import styled from 'styled-components';

const App = () =>
{
    const AppWrapper = styled.div`
        width:90%;
        margin:auto;
        align-content: center;
    `;

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Cover/>
                </Route>
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
            </Switch>

        </main>

    );
};

export default withRouter(App);
