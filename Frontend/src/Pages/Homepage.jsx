import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import VerticalBar from "../Components/VerticalBar";
import header from "../assets/Header-bg.svg";
import logo from "../assets/Logo.svg";
import logout from "../assets/Logout.svg";
import { NavLink, useNavigate } from "react-router-dom";
import HorizontalBar from "../Components/HorizontalBar";
import { getProjectStats } from "../Redux/AppReducer/action";
import { useDispatch, useSelector } from "react-redux";
import ApexChart from "../Components/Chart";


function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projectStats = useSelector((state) => state.AppReducer.projectStats);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getProjectStats());
  }, []);

  return (
    <Stack
      direction={"row"}
      spacing={0}
      minH={["100vh", "100vh", "120vh"]}
      bgColor={"gray.100"}
    >
      <VerticalBar />

      <Stack
        bg={`url(${header}) center / cover no-repeat`}
        width={"100%"}
        height={["12vh", "14vh", "24vh", "24vh", "23vh"]}
        backgroundPosition={"center, top"}
        borderBottomLeftRadius={["50px", "90px"]}
        padding={[6, 5]}
        zIndex={[4, 0]}
      >
        <Flex
          border={"0px solid red"}
          justifyContent={["space-between", "space-between", "normal"]}
        >
          <NavLink to="/">
            <Text
              color={"white"}
              fontWeight={500}
              fontSize={"27px"}
              mt={[-3, -2, 5]}
              mb={[6, 10, 4]}
            >
              Dashboard
            </Text>
          </NavLink>

          <Stack display={["none", "none", "block"]} pl={["10%", "20%", "37%"]}>
            <Image src={logo} alt={"Logo"} />
          </Stack>

          <Stack display={["block", "block", "none"]} pt={[0, 1, 6]}>
            <Image
              _hover={{ cursor: "pointer" }}
              onClick={handleLogout}
              src={logout}
              alt={"Logout"}
            />
          </Stack>
        </Flex>

        <Box border={"0px solid red"}>
          <Flex border={"0px solid red"} overflowX={"auto"} pb={4}>
            <Flex
              w={"full"}
              justifyContent={[
                "flex-start",
                "flex-start",
                "flex-start",
                "space-between",
              ]}
              gap={[4, 4, 4, 0]}
            >
              <Stack
                boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                borderRightRadius={8}
                borderLeft={"7px solid"}
                flexShrink={0}
                borderColor={"cyan.400"}
                bgColor={"#fff"}
                align={"start"}
                w={["35%", "35%", "24%", "19%"]}
                py={[2, 3]}
                px={[2, 5]}
                spacing={0}
              >
                <Text color={"GrayText"} fontSize={["14px", "16px"]}>
                  Total Proejcts
                </Text>
                <Heading color={"gray.700"}>
                  {projectStats.length > 0 && projectStats[0].total_Projects}
                </Heading>
              </Stack>

              <Stack
                boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                borderRightRadius={8}
                borderLeft={"7px solid"}
                flexShrink={0}
                borderColor={"cyan.400"}
                bgColor={"#fff"}
                align={"start"}
                w={["35%", "35%", "24%", "19%"]}
                py={[2, 3]}
                px={[2, 5]}
                spacing={0}
              >
                <Text color={"GrayText"} fontSize={["14px", "16px"]}>
                  Closed
                </Text>
                <Heading color={"gray.700"}>
                  {projectStats.length > 0 && projectStats[0].closed_Projects}
                </Heading>
              </Stack>

              <Stack
                boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                borderRightRadius={8}
                borderLeft={"7px solid"}
                flexShrink={0}
                borderColor={"cyan.400"}
                bgColor={"#fff"}
                align={"start"}
                w={["35%", "35%", "24%", "19%"]}
                py={[2, 3]}
                px={[2, 5]}
                spacing={0}
              >
                <Text color={"GrayText"} fontSize={["14px", "16px"]}>
                  Running
                </Text>
                <Heading color={"gray.700"}>
                  {projectStats.length > 0 && projectStats[0].running_Projects}
                </Heading>
              </Stack>

              <Stack
                boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                borderRightRadius={8}
                borderLeft={"7px solid"}
                flexShrink={0}
                borderColor={"cyan.400"}
                bgColor={"#fff"}
                align={"start"}
                w={["35%", "35%", "24%", "19%"]}
                py={[2, 3]}
                px={[2, 5]}
                spacing={0}
              >
                <Text color={"GrayText"} fontSize={["14px", "16px"]}>
                  Closure Delay
                </Text>
                <Heading color={"gray.700"}>
                  {projectStats.length > 0 && projectStats[0].closure_Delay}
                </Heading>
              </Stack>

              <Stack
                boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                borderRightRadius={8}
                borderLeft={"7px solid"}
                flexShrink={0}
                borderColor={"cyan.400"}
                bgColor={"#fff"}
                align={"start"}
                w={["35%", "35%", "24%", "19%"]}
                py={[2, 3]}
                px={[2, 5]}
                spacing={0}
              >
                <Text color={"GrayText"} fontSize={["14px", "16px"]}>
                  Cancelled
                </Text>
                <Heading color={"gray.700"}>
                  {projectStats.length > 0 &&
                    projectStats[0].cancelled_Projects}
                </Heading>
              </Stack>
            </Flex>
          </Flex>
        </Box>

        <Stack
          spacing={3}
          border={"0px solid red"}
          w={["100%", "100%", "75%", "70%", "50%"]}
        >
          <Box>
            <Text fontSize={["18", "21px", "24px"]} fontWeight={500}>
              Department wise - Total Vs Closed
            </Text>
          </Box>

          <Stack
            boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
            bgColor={"#fff"}
            borderRadius={12}
          >
            <ApexChart />
          </Stack>
        </Stack>
      </Stack>

      <HorizontalBar />
    </Stack>
  );
}

export default Homepage;
