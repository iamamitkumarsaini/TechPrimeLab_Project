import React, { useEffect, useState } from "react";
import { Box, Image, Stack } from "@chakra-ui/react";
import ActiveDashboard from "../assets/Dashboard-active.svg";
import Dashboard from "../assets/Dashboard.svg";
import ProjectList from "../assets/Project-list.svg";
import ActiveProjectList from "../assets/Project-list-active.svg";
import CreateProject from "../assets/create-project.svg";
import ActiveCreateProject from "../assets/create-project-active.svg";
import { NavLink, useLocation } from "react-router-dom";

function HorizontalBar() {
  const [isActiveDashboard, setIsActiveDashboard] = useState(false);
  const [isActiveProjectList, setIsActiveProjectList] = useState(false);
  const [isActiveCreateProject, setIsActiveCreateProject] = useState(false);

  const loaction = useLocation();
  const current_URL = loaction.pathname;

  useEffect(() => {
    if (current_URL == "/") {
      setIsActiveDashboard(true);
    } else if (current_URL == "/add/project") {
      setIsActiveCreateProject(true);
    } else if (current_URL == "/projects") {
      setIsActiveProjectList(true);
    }
  }, []);

  return (
    <Stack
      display={["block", "block", "none"]}
      boxShadow={"md"}
      bgColor={"#fff"}
      position={"fixed"}
      zIndex={4}
      bottom={"0px"}
      direction={"row"}
      border={"0px solid blue"}
      width={"100%"}
      h={"65px"}
    >
      <Stack
        direction={"row"}
        border={"0px solid red"}
        spacing={0}
        px={12}
        pt={3}
        justifyContent={"space-between"}
      >
        <Box
          borderBottom={isActiveDashboard ? "5px solid blue" : "none"}
          borderBottomRadius={6}
          p={1}
        >
          <NavLink to={"/"}>
            <Image
              pb={2}
              src={isActiveDashboard ? ActiveDashboard : Dashboard}
              alt="Dashboad"
            />
          </NavLink>
        </Box>

        <Box
          borderBottom={isActiveProjectList ? "5px solid blue" : "none"}
          borderBottomRadius={6}
          p={1}
        >
          <NavLink to={"/projects"}>
            <Image
              src={isActiveProjectList ? ActiveProjectList : ProjectList}
              alt="Project-list"
            />
          </NavLink>
        </Box>

        <Box
          borderBottom={isActiveCreateProject ? "5px solid blue" : "none"}
          borderBottomRadius={6}
          p={1}
        >
          <NavLink to={"/add/project"}>
            <Image
              src={isActiveCreateProject ? ActiveCreateProject : CreateProject}
              alt="Create-project"
            />
          </NavLink>
        </Box>
      </Stack>
    </Stack>
  );
}

export default HorizontalBar;

{
  /* <Stack display={["block", "none"]} boxShadow={"md"} bgColor={"black"} position={"fixed"} zIndex={4} bottom={"0px"} direction={"row"} border={"0px solid blue"} width={"100%"} h={"65px"}>
<Text>Amit</Text>
<Text>Saini</Text>

</Stack>

HorizontalBar */
}
