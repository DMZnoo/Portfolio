import React from "react";
import ReactDOM from "react-dom";
import "./styles/Index.scss";
import App from './App';
import Cover from './Cover';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter,Switch,Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    ,
    document.querySelector("#root")
);
