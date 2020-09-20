import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SoftwareProjects from "./projects/SoftwareProjects";
import WebProjects from "./projects/WebProjects";
const Projects = () => {
  const location = useLocation();
  const [isProfession, SetProfession] = useState("");
  useEffect(() => {
    SetProfession(location.state.prof);
  }, [location]);

  return (
    <div className="ui center aligned segment">
      {isProfession === "software" && (
        <div className="ui grid">
          <div className="column">
            <SoftwareProjects />
          </div>
        </div>
      )}
      {isProfession === "web" && (
        <div className="ui grid">
          <WebProjects />
        </div>
      )}
    </div>
  );
};
export default Projects;
