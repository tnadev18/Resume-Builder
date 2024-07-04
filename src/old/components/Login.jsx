import React, { useEffect, useState } from 'react';
import { ChakraProvider, extendTheme, Box, Flex, Heading, Input, Button, FormControl, FormLabel, } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { Link } from 'react-router-dom';
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'black',
      },
    },
  },
});

const LoginPage = () => {

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('sid')) {
      navigate('/create');
    }
  })
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });






  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email.includes("@")) {
      alert("Enter a valid Email");
    } else if (formData.email.length > 0 && formData.password.length > 0 && formData.email.includes("@")) {
      try {
        const res = await axios.post(`https://testapi1.nursingpioneer.com/loginStudent`, formData);

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("sid", res.data.sid);
          localStorage.setItem("email", formData.email)
          localStorage.setItem("display_name", res.data.display_name)
          console.log(res.data);
          navigate('/create');
        } else {
          console.log(res.data.error);
          alert("Enter Valid Details.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Enter Valid Details.");
      }
    } else {
      alert("Email or password cannot be empty");
    }
  };
  const handleRegister = () => {
    // Implement your register logic here
    //alert('Register clicked!');
    navigate('/Registration');
  };

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
    navigate('/Forget-Password');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex
        align="center"
        justify="center"
        h="100vh"
      >
        <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" bg="#00b0ff">
          <form >
            <Heading mb={4} textAlign="center" color="white">
              Login
            </Heading>
            <FormControl mb={4} isRequired>
              <FormLabel color="black">Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                color="black"
                bg="white"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel color="black">Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                color="black"
                bg="white"
              />
            </FormControl>

            <Button
              onClick={handleLogin}
              colorScheme="blackAlpha"
              mb={2}
              width="100%"
            >
              Login
            </Button>
            <p direction="column" align="center" mb={4}>   First time user register first</p>
          </form>
          <Flex direction="column" align="center" mb={4}>
            <Link to={'/resetpassword'} className='my-1'>
              Forgot Password?
            </Link>
            <Button
              onClick={handleRegister}
              colorScheme="blackAlpha"
              mb={2}
              width="100%"
            >
              Register
            </Button>
          </Flex>
          <Button
            onClick={e => { navigate('/adminlogin') }}
            colorScheme="blackAlpha"

            width="100%"
          >
            Login as Admin
          </Button>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default LoginPage;
