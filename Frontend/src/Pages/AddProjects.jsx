import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import backgroundImage from "../assets/login-bg-1.svg";
import logo from "../assets/Logo.svg";
import VerticalBar from "../Components/VerticalBar";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import HorizontalBar from "../Components/HorizontalBar";

function AddProjects() {
  const [width, setWidth] = useState(() => window.innerWidth);
  const [title, setTitle] = useState("");
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isStartDateEmpty, setIsStartDateEmpty] = useState(false);
  const [isEndDateEmpty, setIsEndDateEmpty] = useState(false);

  useEffect(() => {
    const handleWidthChange = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWidthChange);

    setWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleWidthChange);
    };
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setIsTitleEmpty(false);
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };
  // console.log("Start Date", startDate)

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };
  // console.log("end date", endDate);

  const handleSubmit = () => {
    if (title.trim() === "") {
      setIsTitleEmpty(true);
    }
    if (startDate.trim() === "") {
      setIsStartDateEmpty(true);
    }
    if (endDate.trim() === "") {
      setIsEndDateEmpty(true);
    } else if (startDate > endDate) {
      alert("Start date is Greater than end date");
    }
  };

  console.log("startDate", startDate);
  console.log("endDate", endDate);

  return (
    <Stack
      direction={"row"}
      spacing={0}
      minH={["100vh", "130vh", "155vh", "155vh", "135vh"]}
      bgColor={"gray.100"}
    >
      <VerticalBar />

      <Stack w={"full"}>
        <Stack
          bg={`
            url(${width < 540 ? "" : logo}) top / 60px auto no-repeat,
            url(${backgroundImage}) center / cover no-repeat
            `}
          width={"100%"}
          height={["12vh", "25vh", "24vh", "24vh", "21vh"]}
          backgroundPosition={"center 27px, top"}
          borderBottomLeftRadius={["50px", "90px"]}
          padding={[6, 5]}
          position={["fixed", "static"]}
          zIndex={[4, 0]}
          top={[0, ""]}
        >
          <Text
            color={"white"}
            fontWeight={"bold"}
            fontSize={"21px"}
            mt={[-1, 4]}
            mb={5}
          >
            <span>
              <ChevronLeftIcon fontSize={"24px"} />
            </span>
            &nbsp; &nbsp; Create Project
          </Text>
        </Stack>

        <Stack
          border={"0px solid red"}
          position={["relative", ""]}
          width={["95%","96%","97%", "98%"]}
          alignSelf={["center", ""]}
          boxShadow={"md"}
          bgColor={"#fff"}
          borderRadius={5}
          p={6}
          spacing={6}
          top={["80px", "-65px", "-60px", "-50px"]}
          zIndex={[0, 4]}
          pb={["80px", ""]}
        >
          <Stack direction="row" justifyContent={"space-between"}>
            <VStack width={["100%", "59%"]} align={"left"} spacing={1}>
              <Input
                type="text"
                placeholder="Enter Project Theme"
                p={4}
                fontSize={"16px"}
                value={title}
                onChange={handleTitleChange}
                isInvalid={isTitleEmpty}
                pt={5}
                pb={"52px"}
                borderColor={"RGBA(0, 0, 0, 0.36)"}
              />
              {isTitleEmpty && (
                <Text color="red.500" fontSize={"16px"} fontWeight={400}>
                  Project Theme required
                </Text>
              )}
            </VStack>

            <Button
              display={["none", "block"]}
              fontWeight={400}
              fontSize={"16px"}
              px={8}
              borderRadius={20}
              h={"35px"}
              colorScheme="blue"
              color={"white"}
              onClick={handleSubmit}
            >
              Save Project
            </Button>
          </Stack>

          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
            ]}
            border={"0px solid red"}
            width={"100%"}
            rowGap={4}
            columnGap={7}
            pb={[0, 16, 80]}
          >
            <GridItem>
              <VStack spacing={0} align={"left"}>
                <FormLabel
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.800"}
                  mb={"4px"}
                >
                  Reason
                </FormLabel>
                <Select
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.900"}
                  borderColor={"RGBA(0, 0, 0, 0.36)"}
                >
                  <option value="Business">For Business</option>
                  <option value="Dealership">For Dealership</option>
                  <option value="Transport">For Transport</option>
                </Select>
              </VStack>
            </GridItem>

            <GridItem>
              <VStack spacing={0} align={"left"}>
                <FormLabel
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.800"}
                  mb={"4px"}
                >
                  Type
                </FormLabel>
                <Select
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.900"}
                  borderColor={"RGBA(0, 0, 0, 0.36)"}
                >
                  <option value="Internal">Internal</option>
                  <option value="External">External</option>
                  <option value="Vendor">Vendor</option>
                </Select>
              </VStack>
            </GridItem>

            <GridItem>
              <VStack spacing={0} align={"left"}>
                <FormLabel
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.800"}
                  mb={"4px"}
                >
                  Divison
                </FormLabel>
                <Select
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.900"}
                  borderColor={"RGBA(0, 0, 0, 0.36)"}
                >
                  <option value="Filters">Filters</option>
                  <option value="Compressor">Compressor</option>
                  <option value="Pumps">Pumps</option>
                  <option value="Glass">Glass</option>
                  <option value="Water Heater">Water Heater</option>
                </Select>
              </VStack>
            </GridItem>

            <GridItem>
              <VStack spacing={0} align={"left"}>
                <FormLabel
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.800"}
                  mb={"4px"}
                >
                  Category
                </FormLabel>
                <Select
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.900"}
                  borderColor={"RGBA(0, 0, 0, 0.36)"}
                >
                  <option value="Quality A">Quality A</option>
                  <option value="Quality B">Quality B</option>
                  <option value="Quality C">Quality C</option>
                  <option value="Quality D">Quality D</option>
                </Select>
              </VStack>
            </GridItem>

            <GridItem>
              <VStack spacing={0} align={"left"}>
                <FormLabel
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.800"}
                  mb={"4px"}
                >
                  Priority
                </FormLabel>
                <Select
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.900"}
                  borderColor={"RGBA(0, 0, 0, 0.36)"}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Select>
              </VStack>
            </GridItem>

            <GridItem>
              <VStack spacing={0} align={"left"}>
                <FormLabel
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.800"}
                  mb={"4px"}
                >
                  Department
                </FormLabel>
                <Select
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.900"}
                  borderColor={"RGBA(0, 0, 0, 0.36)"}
                >
                  <option value="Strategy">Strategy</option>
                  <option value="Finance">Finance</option>
                  <option value="Quality">Quality</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Store">Store</option>
                </Select>
              </VStack>
            </GridItem>

            <GridItem>
              <VStack spacing={0} align={"left"}>
                <FormLabel
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.800"}
                  mb={"4px"}
                >
                  Start Date as per Project Plan
                </FormLabel>
                <Input
                  type="date"
                  onChange={handleStartDate}
                  value={startDate}
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.900"}
                  borderColor={"RGBA(0, 0, 0, 0.36)"}
                  required
                  isInvalid={isStartDateEmpty}
                />
                {isStartDateEmpty && (
                  <Text color="red.500" fontSize={"16px"} fontWeight={400}>
                    Start Date required
                  </Text>
                )}
              </VStack>
            </GridItem>

            <GridItem>
              <VStack spacing={0} align={"left"}>
                <FormLabel
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.800"}
                  mb={"4px"}
                >
                  End Date as per Project Plan
                </FormLabel>
                <Input
                  type="date"
                  placeholder="D Month, Yr"
                  onChange={handleEndDate}
                  value={endDate}
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.900"}
                  borderColor={"RGBA(0, 0, 0, 0.36)"}
                  isInvalid={isEndDateEmpty}
                />
                {isEndDateEmpty && (
                  <Text color="red.500" fontSize={"16px"} fontWeight={400}>
                    End Date required
                  </Text>
                )}
              </VStack>
            </GridItem>

            <GridItem>
              <VStack spacing={0} align={"left"}>
                <FormLabel
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.800"}
                  mb={"4px"}
                >
                  Location
                </FormLabel>
                <Select
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.900"}
                  borderColor={"RGBA(0, 0, 0, 0.36)"}
                >
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Indore">Indore</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Bengalore">Bengalore</option>
                </Select>
              </VStack>
            </GridItem>

            <GridItem gridColumn={["auto", "auto", "3 / span 1"]} mt={"auto"}>
              <Stack direction={"row"} border={"0px solid blue"} spacing={-2}>
                <FormLabel
                  fontSize={"16px"}
                  fontWeight={400}
                  color={"blackAlpha.800"}
                >
                  Status:
                </FormLabel>
                <Text fontSize={"16px"} fontWeight={500}>
                  Registered
                </Text>
              </Stack>
            </GridItem>
          </Grid>
        </Stack>

        <Stack display={["block", "none"]} align={"center"} px={8}>
          <Button
            fontWeight={400}
            fontSize={"16px"}
            px={8}
            width={"100%"}
            mb={24}
            borderRadius={20}
            h={"45px"}
            colorScheme="blue"
            color={"white"}
            onClick={handleSubmit}
          >
            Save Project
          </Button>
        </Stack>
      </Stack>

      <HorizontalBar />
    </Stack>
  );
}

export default AddProjects;
