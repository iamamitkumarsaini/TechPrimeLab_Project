import React, { useState, useEffect } from "react";
import {
  Button,
  VStack,
  InputGroup,
  InputRightElement,
  Link,
  Input,
  Stack,
  Text,
  HStack,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import loginbg from "../assets/login-bg-1.svg";
import logo from "../assets/Logo.svg";
import "../Styles/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { postLoginUser } from "../Redux/AuthReducer/action";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const toast = useToast();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.AuthReducer.userData);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsEmailEmpty(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsPasswordEmpty(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.trim() === "") {
      setIsEmailEmpty(true);
    } else if (password.trim() === "") {
      setIsPasswordEmpty(true);
    } else {
      dispatch(postLoginUser({ email, password }))
        .then(() => {
          toast({
            title: "Logged In successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });

          setTimeout(() => {
            navigate("/");
          }, 2000);
        })

        .catch((err) => {
          setIsLogin(true);
        });
    }
  };

  useEffect(() => {
    const handleHeightChange = () => {
      setHeight(window.innerHeight);
    };

    // Attach the event listener to window resize
    window.addEventListener("resize", handleHeightChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleHeightChange);
    };
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [height]);

  return (
    <Stack
      align={"center"}
      bg={`
        url(${logo}) top / 85px auto no-repeat,
        url(${loginbg}) center / cover no-repeat
        `}
      width="100%"
      height={
        height > 665 && height < 770 && width < 540
          ? "35vh"
          : height > 771 && height < 930 && width < 540
          ? "27vh"
          : ["40vh", "76vh", "76vh", "76vh", "67vh"]
      }
      borderBottomLeftRadius="110px"
      backgroundPosition={[
        "center 55px, center",
        "center 70px, center",
        "center 70px, center",
      ]}
    >
      <Text
        mt={["148px", "162px", "162px"]}
        fontSize={"16px"}
        color="white"
        mb={["95px", "20px"]}
      >
        Online Project Management
      </Text>

      <VStack
        align={["start", "center"]}
        border={"0px solid red"}
        spacing={isEmailEmpty ? [0, 2] : [1, 3, 3, 4]}
        width={["90%", "410px"]}
        py={["0px", "45px"]}
        px={[0, 8]}
        borderRadius="md"
        boxShadow={[" ", "md", "md"]}
        bgColor={["", "#fff", "#fff"]}
      >
        <Text mb={4} fontSize={"20px"}>
          Login to get Started
        </Text>
        <InputGroup pb={isEmailEmpty ? "0px" : 4} border={"0px solid red"}>
          <VStack alignItems="flex-start" width="100%">
            <FormLabel
              color={isEmailEmpty ? "red" : "grey"}
              mb={"-7px"}
              fontSize={"16px"}
              fontWeight="thick"
            >
              Email
            </FormLabel>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              isInvalid={isEmailEmpty}
            />
            {isEmailEmpty && (
              <Text color="red.500" fontSize={"15px"} fontWeight={500}>
                Email is required
              </Text>
            )}
          </VStack>
        </InputGroup>
        <InputGroup border={"0px solid red"} pb={3}>
          <VStack alignItems="flex-start" width="100%">
            <FormLabel
              color={isPasswordEmpty ? "red" : "grey"}
              mb={"-7px"}
              fontSize={"16px"}
              fontWeight="thick"
            >
              Password
            </FormLabel>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              isInvalid={isPasswordEmpty}
            />
            <HStack
              justifyContent={!isPasswordEmpty ? "right" : "space-between"}
              w={"100%"}
            >
              {isPasswordEmpty && (
                <Text color="red.500" fontSize={"15px"} fontWeight={500}>
                  Password is required
                </Text>
              )}
              <Link color="blue.500" fontSize={"15px"} fontWeight={500}>
                Forgot password?
              </Link>
            </HStack>
            <Text
              display={isLogin ? "block" : "none"}
              color={"red"}
              fontWeight={500}
              fontSize={"15px"}
            >
              Invalid credentials
            </Text>
          </VStack>
          <InputRightElement mt={["26px"]}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? (
                <ViewOffIcon fontSize={"21px"} />
              ) : (
                <ViewIcon fontSize={"21px"} />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          colorScheme="blue"
          px={[0, 16]}
          width={["100%", "auto"]}
          borderRadius={24}
          h={"40px"}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </VStack>

      <Text
        display={isLogin ? "block" : "none"}
        pt={5}
        pb={16}
        color={"red"}
        fontWeight={500}
        fontSize={"15px"}
      >
        Invalid credentials
      </Text>
    </Stack>
  );
}

export default Login;
