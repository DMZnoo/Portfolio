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

            {/*<Switch>*/}
            {/*    <Route exact path='/' component={App}>*/}
                    <Navbar/>
                    <Intro/>
                    <AboutMe/>
                    <Projects/>
                    <ScrollToTop/>
                    <Contact/>
            {/*    </Route>*/}
            {/*    <Route path='/about-me' component={AboutMe}/>*/}
            {/*    <Route path='/project' component={App} />*/}
            {/*</Switch>*/}
        </div>

    );
};

export default withRouter(App);
