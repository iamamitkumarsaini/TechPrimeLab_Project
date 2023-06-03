import React, { useEffect, useState } from 'react';
import { Button, Flex, Input, InputGroup, InputLeftElement, Select, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import VerticalBar from '../Components/VerticalBar';
import { ChevronLeftIcon, Search2Icon } from '@chakra-ui/icons';
import backgroundImage from "../assets/login-bg-1.svg";
import logo from "../assets/Logo.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Projects() {

    const [width, setWidth] = useState(() => window.innerWidth);
    const [arr, setArr] = useState([]);
    const [totalCount, setTotalCount] = useState("");


    const navigate = useNavigate()
    const params = useParams();
    const location = useLocation();


    const queryParams = new URLSearchParams(location.search);

    const initialPage = parseInt(queryParams.get('page')) || 1;
    const initialSort = queryParams.get("sort") || "";
    const initialSearch = queryParams.get("search") || "";

    const [page, setPage] = useState(initialPage);
    const [sort, setSort] = useState(initialSort);
    const [search, setSearch] = useState(initialSearch);


    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options).replace(' ', '-');
      }

    const getData = async () => {

        try {
            let res = await fetch(`http://localhost:8090/projects?page=${page}`);
            let data = await res.json();
            setTotalCount(data.totalCount)
            data = data.projects;
            const formattedData = data.map((elem) => {
                return {
                    ...elem,
                    start_date: formatDate(elem.start_date),
                    end_date: formatDate(elem.end_date)
                }
            })
            setArr(formattedData)
        } 
        
        catch (err) {
            console.log(err)
        }
    }

    const handleNextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);

        const searchParams = new URLSearchParams(location.search);
        const sortParams = searchParams.get("sort");
        const searchingParams = searchParams.get("search");

        if(sortParams && searchingParams){
            searchParams.set("page",nextPage);
            navigate(`${location.pathname}?${searchParams.toString()}`);
        }
        else if(sortParams){
            searchParams.set("page",nextPage);
            navigate(`${location.pathname}?${searchParams.toString()}`);
        }

        else if(searchingParams){
            searchParams.set("page",nextPage);
            navigate(`${location.pathname}?${searchParams.toString()}`);
        }

        else {
            navigate(`${location.pathname}?page=${nextPage}`);
        }
    }

    const handlePreviousChange = () => {
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
          
    }

    const handleSelectChange = (e) => {
        const selected = e.target.value;
        setSort(selected);

        const searchParams = new URLSearchParams(location.search);
        const pageParams = searchParams.get("page");
        const searchingParams = searchParams.get("search");

        if (selected === "") {
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
    }

    const handleInputChange = (e) => {
        const val = e.target.value;
        setSearch(val)

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
    }


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
        getData();
      },[page])

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
            &nbsp; &nbsp; Project Listing
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
          p={4}
          spacing={4}
          top={["80px", "-65px", "-60px", "-50px"]}
          zIndex={[0, 4]}
          pb={["80px", "21px"]}
        >

            <Flex border={"0px solid red"} align={"center"} justify={"space-between"}>
                <Stack borderBottom={"2px solid gray"}>
                    <InputGroup>
                        <InputLeftElement>
                            <Search2Icon color='gray.300' />
                        </InputLeftElement>
                        <Input border={"none"} type="text" placeholder='Search' value={search} onChange={handleInputChange} />
                    </InputGroup>
                </Stack>

                <Stack direction={"row"} border={"0px solid red"} w={"18%"} align={"center"}>
                    <Text color={"gray.500"} fontSize={"16px"}>Sort&nbsp;By&nbsp;:</Text>
                    <Select onChange={handleSelectChange}
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

                    </Select>
                </Stack>
            </Flex>

            <Stack>
                <TableContainer px={1}>
                    <Table size={"sm"}>
                        <Thead>
                            <Tr>
                            <Th p={0}>Project Name</Th>
                            <Th >Reason</Th>
                            <Th >Type</Th>
                            <Th >Divison</Th>
                            <Th >Category</Th>
                            <Th >Priority</Th>
                            <Th >Dept.</Th>
                            <Th >Location</Th>
                            <Th >Status</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {
                                arr?.map((elem) => (
                                    
                                    <Tr key={elem._id} verticalAlign={"top"}>
                                      <Td p={0}  py={3}>
                                        <Text w={"max-content"} fontSize={"16px"} mb={"5px"} fontWeight={600}>{elem.title}</Text>
                                        <Stack w={"max-content"} direction={"row"} fontSize={"15px"} spacing={1}>
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
                                        <Button h={"30px"} px={6} borderRadius={24} fontSize={"16px"} fontWeight={400} letterSpacing={0.6} colorScheme='blue'>Start</Button>
                                    </Td>
                                    <Td px={0} pt={2}>
                                        <Button colorScheme='white' h={"28px"} px={4} borderRadius={24} fontSize={"16px"} fontWeight={400} letterSpacing={0.6} border={"1px solid blue"}color={"blue.500"}>Close</Button>
                                    </Td>
                                    <Td px={0}pt={2}>
                                        <Button colorScheme='white' h={"28px"} px={3} borderRadius={24} fontSize={"16px"} fontWeight={400} letterSpacing={0.6} border={"1px solid blue"} color={"blue.500"}>Cancel</Button>
                                    </Td>
                                </Tr>
                                )) 
                            }

                        </Tbody>
                    </Table>
                </TableContainer>
            </Stack>

        </Stack>

        <Stack align={"center"} justifyContent={"center"} direction={"row"} pb={12}>
            <Button isDisabled={page==1} colorScheme="teal" onClick={handlePreviousChange}>Prev</Button>
            <Text fontWeight={500} fontSize={"24px"} px={2}>{page}</Text>
            <Button colorScheme="teal" onClick={handleNextPage}>Next</Button>
        </Stack>


        </Stack>

      </Stack>
    );
}

export default Projects;