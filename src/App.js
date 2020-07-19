import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import AboutMe from "./components/AboutMe";
import React from "react";
import Projects from "./components/Projects";
import ScrollToTop from "./components/ScrollToTop";
import {withRouter} from 'react-router';
import Contact from "./components/Contact";
import { Route, Switch} from "react-router-dom";
import Cover from "./Cover";
const App = () =>
{

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Cover/>
                </Route>
                <Route path='/about'>
                    <Navbar/>
                    <Intro />
                    <AboutMe/>
                    <Projects/>
                    <ScrollToTop/>
                    <Contact/>
                </Route>
            </Switch>

        </main>

    );
};

export default withRouter(App);
