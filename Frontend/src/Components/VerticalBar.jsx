import React, { useEffect, useState } from "react";
import { Box, Image, Stack } from "@chakra-ui/react";
import ActiveDashboard from "../assets/Dashboard-active.svg";
import Dashboard from "../assets/Dashboard.svg";
import ProjectList from "../assets/Project-list.svg";
import ActiveProjectList from "../assets/Project-list-active.svg";
import CreateProject from "../assets/create-project.svg";
import ActiveCreateProject from "../assets/create-project-active.svg";
import Logout from "../assets/Logout.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function VerticalBar() {
  const [isActiveDashboard, setIsActiveDashboard] = useState(false);
  const [isActiveProjectList, setIsActiveProjectList] = useState(false);
  const [isActiveCreateProject, setIsActiveCreateProject] = useState(false);

  const loaction = useLocation();
  const current_URL = loaction.pathname;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
      display={["none", "none", "block"]}
      border={"0px solid red"}
      bgColor={"white"}
      minWidth={["10px", "68px"]}
      maxH={"120vh"}
    >
      <Stack border={"0px solid red"} mt={"41vh"} align={"center"} spacing={8}>
        <Box
          borderLeft={isActiveDashboard ? "5px solid blue" : "none"}
          borderRadius={4}
        >
          <NavLink to={"/"}>
            <Image
              px={4}
              py={2}
              src={isActiveDashboard ? ActiveDashboard : Dashboard}
              alt="Dashboad"
            />
          </NavLink>
        </Box>

        <Box borderBottom={"2px solid gray"} pb={8}>
          <Box
            borderLeft={isActiveProjectList ? "5px solid blue" : "none"}
            borderRadius={4}
          >
            <NavLink to={"/projects"}>
              <Image
                px={4}
                py={2}
                src={isActiveProjectList ? ActiveProjectList : ProjectList}
                alt="Project-list"
              />
            </NavLink>
          </Box>
        </Box>

        <Box
          borderLeft={isActiveCreateProject ? "5px solid blue" : "none"}
          borderRadius={4}
        >
          <NavLink to={"/add/project"}>
            <Image
              px={4}
              py={2}
              src={isActiveCreateProject ? ActiveCreateProject : CreateProject}
              alt="Create-project"
            />
          </NavLink>
        </Box>
      </Stack>

      <Box pt={"35vh"} align={"center"}>
        <Image
          _hover={{ cursor: "pointer" }}
          onClick={handleLogout}
          src={Logout}
          alt="Dashboad"
        />
      </Box>
    </Stack>
  );
}

export default VerticalBar;
