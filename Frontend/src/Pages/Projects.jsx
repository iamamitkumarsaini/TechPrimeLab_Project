import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Image,
  Spinner,
  SkeletonText,
  Skeleton,
  HStack,
} from "@chakra-ui/react";
import VerticalBar from "../Components/VerticalBar";
import { ChevronLeftIcon, Search2Icon } from "@chakra-ui/icons";
import backgroundImage from "../assets/login-bg-1.svg";
import logo from "../assets/Logo.svg";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { BsFilterLeft } from "react-icons/bs";
import HorizontalBar from "../Components/HorizontalBar";
import logout from "../assets/Logout.svg";
import {
  getProjectsData,
  updateProjectsData,
} from "../Redux/AppReducer/action";
import { useDispatch, useSelector } from "react-redux";

function Projects() {
  const [width, setWidth] = useState(() => window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialSort = queryParams.get("sort") || "";
  const initialSearch = queryParams.get("search") || "";
  const [emptyArr, setEmptyArr] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [page, setPage] = useState(initialPage);
  const [sort, setSort] = useState(initialSort);
  const [search, setSearch] = useState(initialSearch);

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.AppReducer.projects);
  const totalCount = useSelector((state) => state.AppReducer.totalCount);
  const isLoading = useSelector((state) => state.AppReducer.isLoading);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    const searchParams = new URLSearchParams(location.search);
    const sortParams = searchParams.get("sort");
    const searchingParams = searchParams.get("search");

    if (sortParams && searchingParams) {
      searchParams.set("page", nextPage);
      navigate(`${location.pathname}?${searchParams.toString()}`);
    } else if (sortParams) {
      searchParams.set("page", nextPage);
      navigate(`${location.pathname}?${searchParams.toString()}`);
    } else if (searchingParams) {
      searchParams.set("page", nextPage);
      navigate(`${location.pathname}?${searchParams.toString()}`);
    } else {
      navigate(`${location.pathname}?page=${nextPage}`);
    }
  };

  const handlePreviousPage = () => {
    const prevPage = page - 1;
    setPage(prevPage);

    const searchParams = new URLSearchParams(location.search);
    const sortParams = searchParams.get("sort");
    const searchingParams = searchParams.get("search");

    if (prevPage === 1) {
      searchParams.delete("page");
    } else {
      if (sortParams && searchingParams) {
        searchParams.set("page", prevPage);
      } else if (sortParams) {
        searchParams.set("page", prevPage);
      } else if (searchingParams) {
        searchParams.set("page", prevPage);
      } else {
        searchParams.set("page", prevPage);
      }
    }

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleSelectChange = (e) => {
    const selected = e.target.value || e.target.dataset.value;
    setSort(selected);

    const searchParams = new URLSearchParams(location.search);
    const pageParams = searchParams.get("page");
    const searchingParams = searchParams.get("search");

    if (!selected) {
      searchParams.delete("sort");
    } else {
      if (searchingParams && pageParams) {
        searchParams.set("sort", selected);
      } else if (searchingParams) {
        searchParams.set("sort", selected);
      } else if (pageParams) {
        searchParams.set("sort", selected);
      } else {
        searchParams.set("sort", selected);
      }
    }

    navigate(`${location.pathname}?${searchParams.toString()}`);
    handleClose();
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearch(val);

    const searchParams = new URLSearchParams(location.search);
    const pageParams = searchParams.get("page");
    const sortParams = searchParams.get("sort");

    if (val === "") {
      searchParams.delete("search");
    } else {
      if (sortParams && pageParams) {
        searchParams.set("search", val);
      } else if (sortParams) {
        searchParams.set("search", val);
      } else if (pageParams) {
        searchParams.set("search", val);
      } else {
        searchParams.set("search", val);
      }
    }

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleStartChange = (id) => {
    dispatch(updateProjectsData(id, { status: "Running" })).then(() => {
      dispatch(getProjectsData(page, search, sort));
    });
  };

  const handleCloseChange = (id) => {
    dispatch(updateProjectsData(id, { status: "Closed" })).then(() => {
      dispatch(getProjectsData(page, search, sort));
    });
  };

  const handleCancelChange = (id) => {
    dispatch(updateProjectsData(id, { status: "Cancelled" })).then(() => {
      dispatch(getProjectsData(page, search, sort));
    });
  };

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

  useEffect(() => {
    dispatch(getProjectsData(page, search, sort));
  }, [page, search, sort]);

  return (
    <Stack
      direction={"row"}
      spacing={0}
      minH={["100vh", "130vh", "155vh", "155vh", "135vh"]}
      bgColor={"gray.100"}
    >
      <VerticalBar />

      <Stack w={"full"} border={"0px solid red"}>
        <Stack
          bg={`
            url(${width < 863 ? "" : logo}) top / 60px auto no-repeat,
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
          direction={["row", "row", "column"]}
          justifyContent={["space-between", "space-between", "normal"]}
        >
          <Text
            color={"white"}
            fontWeight={"bold"}
            fontSize={"21px"}
            mt={[-1, 4]}
            mb={5}
          >
            <NavLink to={"/"}>
              <span>
                <ChevronLeftIcon fontSize={"24px"} />
              </span>
            </NavLink>
            &nbsp; &nbsp; Project Listing
          </Text>

          <Stack display={["block", "block", "none"]} pt={[-1, 6]} mb={5}>
            <Image
              _hover={{ cursor: "pointer" }}
              onClick={handleLogout}
              src={logout}
              alt={"Logout"}
            />
          </Stack>
        </Stack>

        <Stack
          border={"0px solid red"}
          position={["relative", ""]}
          width={["95%", "96%", "97%", "98%"]}
          alignSelf={["center", ""]}
          boxShadow={"md"}
          bgColor={"#fff"}
          borderRadius={5}
          p={4}
          spacing={4}
          top={["80px", "-65px", "-60px", "-50px"]}
          zIndex={[0, 4]}
          pb={["80px", "21px"]}
        >
          <Flex
            border={"0px solid red"}
            align={"center"}
            justify={"space-between"}
          >
            <Stack borderBottom={"2px solid gray"}>
              <InputGroup>
                <InputLeftElement>
                  <Search2Icon color="gray.300" />
                </InputLeftElement>
                <Input
                  border={"none"}
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Stack>

            <Stack
              direction={"row"}
              display={["none", "none", "flex"]}
              border={"0px solid red"}
              minW={["30%", "18%", "28%", "20%"]}
              align={"center"}
            >
              <Text color={"gray.500"} fontSize={"16px"}>
                Sort&nbsp;By&nbsp;:
              </Text>
              <Select
                onChange={handleSelectChange}
                fontSize={"16px"}
                fontWeight={400}
                color={"blackAlpha.900"}
                value={sort}
              >
                <option value="">Select any</option>
                <option value="title">Title</option>
                <option value="reason">Reason</option>
                <option value="type">Type</option>
                <option value="divison">Divison</option>
                <option value="category">Category</option>
                <option value="priority">Priority</option>
                <option value="department">Department</option>
                <option value="start_date">Start Date</option>
                <option value="location">Location</option>
                <option value="status">Status</option>
                <option value="_id">Recently Added</option>
              </Select>
            </Stack>

            <Box display={["block", "block", "none"]}>
              <BsFilterLeft
                _hover={{ cursor: "pointer" }}
                fontSize={"2rem"}
                onClick={handleOpen}
              />

              <Modal
                isOpen={isOpen}
                onClose={handleClose}
                motionPreset="slideInBottom"
              >
                <ModalOverlay />
                <ModalContent
                  position="fixed"
                  top={["auto", 16]}
                  bottom={[-16, "auto"]}
                  left={[0, "auto"]}
                  right={[0, "auto"]}
                >
                  <ModalHeader>Sort Projects By</ModalHeader>
                  <ModalCloseButton />

                  <ModalBody>
                    <Stack spacing={3} pb={2}>
                      <Text
                        _hover={{ cursor: "pointer" }}
                        data-value=""
                        onClick={handleSelectChange}
                      >
                        Reset
                      </Text>
                      <Text
                        _hover={{ cursor: "pointer" }}
                        data-value="reason"
                        onClick={handleSelectChange}
                      >
                        Reason
                      </Text>
                      <Text
                        _hover={{ cursor: "pointer" }}
                        data-value="type"
                        onClick={handleSelectChange}
                      >
                        Type
                      </Text>
                      <Text
                        _hover={{ cursor: "pointer" }}
                        data-value="divison"
                        onClick={handleSelectChange}
                      >
                        Divison
                      </Text>
                      <Text
                        _hover={{ cursor: "pointer" }}
                        data-value="category"
                        onClick={handleSelectChange}
                      >
                        Category
                      </Text>
                      <Text
                        _hover={{ cursor: "pointer" }}
                        data-value="priority"
                        onClick={handleSelectChange}
                      >
                        Priority
                      </Text>
                      <Text
                        _hover={{ cursor: "pointer" }}
                        data-value="department"
                        onClick={handleSelectChange}
                      >
                        Department
                      </Text>
                      <Text
                        _hover={{ cursor: "pointer" }}
                        data-value="start_date"
                        onClick={handleSelectChange}
                      >
                        Start Date
                      </Text>
                      <Text
                        _hover={{ cursor: "pointer" }}
                        data-value="location"
                        onClick={handleSelectChange}
                      >
                        Location
                      </Text>
                      <Text
                        _hover={{ cursor: "pointer" }}
                        data-value="_id"
                        onClick={handleSelectChange}
                      >
                        Recently Added
                      </Text>
                    </Stack>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Box>
          </Flex>

          <Stack border={"0px solid red"} display={["none", "none", "block"]}>
            <TableContainer px={1}>
              <Table size={"sm"}>
                <Thead>
                  <Tr>
                    <Th p={0}>Project Name</Th>
                    <Th>Reason</Th>
                    <Th>Type</Th>
                    <Th>Divison</Th>
                    <Th>Category</Th>
                    <Th>Priority</Th>
                    <Th>Dept.</Th>
                    <Th>Location</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>

                {isLoading ? (
                  <Tbody>
                    {" "}
                    {emptyArr.map((elem, index) => (
                      <Tr height={"50px"} key={index}>
                        <Td>
                          <Skeleton height={"10px"} />
                        </Td>
                        <Td>
                          <Skeleton height={"10px"} />
                        </Td>
                        <Td>
                          <Skeleton height={"10px"} />
                        </Td>
                        <Td>
                          <Skeleton height={"10px"} />
                        </Td>
                        <Td>
                          <Skeleton height={"10px"} />
                        </Td>
                        <Td>
                          <Skeleton height={"10px"} />
                        </Td>
                        <Td>
                          <Skeleton height={"10px"} />
                        </Td>
                        <Td>
                          <Skeleton height={"10px"} />
                        </Td>
                        <Td>
                          <Skeleton height={"10px"} />
                        </Td>
                        <Td>
                          <Skeleton height={"10px"} width={"70px"} />
                        </Td>
                        <Td>
                          <Skeleton height={"10px"} width={"70px"} />
                        </Td>
                        <Td>
                          <Skeleton height={"10px"} width={"70px"} />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                ) : (
                  <Tbody>
                    {projects?.map((elem) => (
                      <Tr key={elem._id} verticalAlign={"top"}>
                        <Td p={0} py={3}>
                          <Text
                            w={"max-content"}
                            fontSize={"16px"}
                            mb={"5px"}
                            fontWeight={600}
                          >
                            {elem.title}
                          </Text>
                          <Stack
                            w={"max-content"}
                            direction={"row"}
                            fontSize={"15px"}
                            spacing={1}
                          >
                            <Text w={"max-content"}>{elem.start_date}</Text>
                            <Text w={"max-content"}>to</Text>
                            <Text w={"max-content"}> {elem.end_date}</Text>
                          </Stack>
                        </Td>
                        <Td pt={3}>{elem.reason}</Td>
                        <Td pt={3}>{elem.type}</Td>
                        <Td pt={3}>{elem.divison}</Td>
                        <Td pt={3}>{elem.category}</Td>
                        <Td pt={3}>{elem.priority}</Td>
                        <Td pt={3}>{elem.department}</Td>
                        <Td pt={3}>{elem.location}</Td>
                        <Td pt={3}>{elem.status}</Td>
                        <Td px={0} pt={2}>
                          <Button
                            h={"30px"}
                            onClick={() => handleStartChange(elem._id)}
                            px={6}
                            borderRadius={24}
                            fontSize={"16px"}
                            fontWeight={400}
                            letterSpacing={0.6}
                            colorScheme="blue"
                          >
                            Start
                          </Button>
                        </Td>
                        <Td px={[0, 2, 2, 2, 2]} pt={2}>
                          <Button
                            colorScheme="white"
                            onClick={() => handleCloseChange(elem._id)}
                            h={"28px"}
                            px={4}
                            borderRadius={24}
                            fontSize={"16px"}
                            fontWeight={400}
                            letterSpacing={0.6}
                            border={"1px solid blue"}
                            color={"blue.500"}
                          >
                            Close
                          </Button>
                        </Td>
                        <Td px={0} pt={2}>
                          <Button
                            colorScheme="white"
                            h={"28px"}
                            onClick={() => handleCancelChange(elem._id)}
                            px={3}
                            borderRadius={24}
                            fontSize={"16px"}
                            fontWeight={400}
                            letterSpacing={0.6}
                            border={"1px solid blue"}
                            color={"blue.500"}
                          >
                            Cancel
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                )}
              </Table>
            </TableContainer>
          </Stack>

          {isLoading ? (
            <Stack display={["block", "block", "none"]} pb={6}>
              {emptyArr.map((elem, index) => (
                <Stack
                  key={index}
                  boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                  borderRadius={12}
                  p={4}
                  spacing={2}
                >
                  <Stack border={"0px solid red"} spacing={2}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Text>
                        <Skeleton width={"160px"} height={"18px"} />
                      </Text>
                      <Text>
                        <Skeleton height={"14px"} width={"80px"} />
                      </Text>
                    </Stack>
                    <Skeleton width={"200px"} height={"10px"} />
                  </Stack>

                  <Stack border={"0px solid red"} spacing={[2]}>
                    <Text color={"GrayText"} fontSize={["16px"]}>
                      Reason:
                      <span style={{ color: "black" }}>
                        <Skeleton height={"12px"} width={"120px"} />
                      </span>
                    </Text>

                    <Flex gap={8}>
                      <HStack>
                        <Text color={"GrayText"} fontSize={["16px"]}>
                          Type:
                        </Text>
                        <Text>
                          <Skeleton height={"12px"} width={"120px"} />
                        </Text>
                      </HStack>
                      <Box color={"GrayText"} fontSize={["16px"]}>
                        <ul>
                          <li>
                            <HStack>
                              <Text color={"GrayText"} fontSize={["16px"]}>
                                Category
                              </Text>
                              <Skeleton height={"12px"} width={"120px"} />
                            </HStack>
                          </li>
                        </ul>
                      </Box>
                    </Flex>

                    <Flex gap={8}>
                      <HStack>
                        <Text color={"GrayText"} fontSize={["16px"]}>
                          Div:
                        </Text>
                        <Text>
                          <Skeleton height={"12px"} width={"120px"} />
                        </Text>
                      </HStack>
                      <Box color={"GrayText"} fontSize={["16px"]}>
                        <ul>
                          <li>
                            <HStack>
                              <Text color={"GrayText"} fontSize={["16px"]}>
                                Department
                              </Text>
                              <Skeleton height={"12px"} width={"120px"} />
                            </HStack>
                          </li>
                        </ul>
                      </Box>
                    </Flex>

                    <HStack>
                      <Text color={"GrayText"} fontSize={["16px"]}>
                        Location:
                      </Text>
                      <Skeleton height={"12px"} width={"120px"} />
                    </HStack>

                    <HStack>
                      <Text color={"GrayText"} fontSize={["16px"]}>
                        Priority:
                      </Text>
                      <Skeleton height={"12px"} width={"120px"} />
                    </HStack>
                  </Stack>

                  <Flex gap={[2, 4]} alignSelf={"center"}>
                    <Skeleton height={"12px"} width={"90px"} />
                    <Skeleton height={"12px"} width={"90px"} />
                    <Skeleton height={"12px"} width={"90px"} />
                  </Flex>
                </Stack>
              ))}
            </Stack>
          ) : (
            <Stack display={["block", "block", "none"]} pb={6}>
              {projects.map((elem) => (
                <Stack
                  key={elem._id}
                  boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                  borderRadius={12}
                  p={4}
                  spacing={2}
                >
                  <Stack border={"0px solid red"} spacing={0}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Text fontSize={"18px"} fontWeight={600}>
                        {elem.title}
                      </Text>
                      <Text fontSize={"16px"} fontWeight={600}>
                        {elem.status}
                      </Text>
                    </Stack>

                    <Stack direction={"row"} fontSize={"15px"} spacing={1}>
                      <Text>{elem.start_date}</Text>
                      <Text>to</Text>
                      <Text> {elem.end_date}</Text>
                    </Stack>
                  </Stack>

                  <Stack border={"0px solid red"} spacing={[2]}>
                    <Text color={"GrayText"} fontSize={["16px"]}>
                      Reason:{" "}
                      <span style={{ color: "black" }}>{elem.reason}</span>
                    </Text>

                    <Flex gap={8}>
                      <Text color={"GrayText"} fontSize={["16px"]}>
                        Type:{" "}
                        <span style={{ color: "black" }}>{elem.type}</span>
                      </Text>
                      <Box color={"GrayText"} fontSize={["16px"]}>
                        <ul>
                          <li>
                            Category:{" "}
                            <span style={{ color: "black" }}>
                              {elem.category}
                            </span>
                          </li>
                        </ul>
                      </Box>
                    </Flex>

                    <Flex gap={8}>
                      <Text color={"GrayText"} fontSize={["16px"]}>
                        Div:{" "}
                        <span style={{ color: "black" }}>{elem.divison}</span>
                      </Text>
                      <Box color={"GrayText"} fontSize={["16px"]}>
                        <ul>
                          <li>
                            Dept:{" "}
                            <span style={{ color: "black" }}>
                              {elem.department}
                            </span>
                          </li>
                        </ul>
                      </Box>
                    </Flex>

                    <Text color={"GrayText"} fontSize={["16px"]}>
                      Location:{" "}
                      <span style={{ color: "black" }}>{elem.location}</span>
                    </Text>
                    <Text color={"GrayText"} fontSize={["16px"]}>
                      Priority:{" "}
                      <span style={{ color: "black" }}>{elem.priority}</span>
                    </Text>
                  </Stack>

                  <Flex gap={[2, 4]} alignSelf={"center"}>
                    <Button
                      h={"30px"}
                      px={[4, 6]}
                      onClick={() => handleStartChange(elem._id)}
                      borderRadius={24}
                      fontSize={["14px", "16px"]}
                      fontWeight={400}
                      letterSpacing={0.6}
                      colorScheme="blue"
                    >
                      Start
                    </Button>
                    <Button
                      h={"30px"}
                      px={[4, 6]}
                      onClick={() => handleCloseChange(elem._id)}
                      borderRadius={24}
                      fontSize={["14px", "16px"]}
                      fontWeight={400}
                      letterSpacing={0.6}
                      colorScheme="white"
                      border={"1px solid blue"}
                      color={"blue.500"}
                    >
                      Close
                    </Button>
                    <Button
                      h={"30px"}
                      px={[4, 6]}
                      onClick={() => handleCancelChange(elem._id)}
                      borderRadius={24}
                      fontSize={["14px", "16px"]}
                      fontWeight={400}
                      letterSpacing={0.6}
                      colorScheme="white"
                      border={"1px solid blue"}
                      color={"blue.500"}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </Stack>
              ))}
            </Stack>
          )}

          <Stack
            align={"center"}
            justifyContent={"center"}
            direction={"row"}
            pb={18}
          >
            <Button
              isDisabled={page == 1}
              colorScheme="teal"
              onClick={handlePreviousPage}
            >
              Prev
            </Button>
            <Text fontWeight={500} fontSize={"24px"} px={2}>
              {page}
            </Text>
            <Button
              isDisabled={page == Math.ceil(totalCount / 10)}
              colorScheme="teal"
              onClick={handleNextPage}
            >
              Next
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <HorizontalBar />
    </Stack>
  );
}

export default Projects;
