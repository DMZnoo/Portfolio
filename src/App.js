import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import AboutMe from "./components/AboutMe";
import React from "react";
import Projects from "./components/Projects";
import ScrollToTop from "./components/ScrollToTop";
import {withRouter} from 'react-router';
import Contact from "./components/Contact";
const App = () =>
{

    return (
        <div>
                    <Navbar/>
                    <Intro/>
                    <AboutMe/>
                    <Projects/>
                    <ScrollToTop/>
                    <Contact/>
        </div>

    );
};

export default withRouter(App);
