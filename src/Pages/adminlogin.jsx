import React, { useEffect, useState } from 'react';
import { ChakraProvider, extendTheme, Box, Flex, Heading, Input, Button, Link, FormControl, FormLabel, } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

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

const AdminLoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

// const navigate = useNavigate();
  


    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('aid')) {
          navigate('/admin');
        }
      })

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('https://testapi1.nursingpioneer.com/loginAdmin', formData);
            if(res.data.success){
                localStorage.setItem("aid", res.data.aid);
                localStorage.setItem("display_name", "Admin");
            }
            navigate('/admin');
        }catch(e){
            alert("Enter Valid Details.")
            setFormData({
                email: '',
                password: '',
            });
        }
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
                           Admin Login
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
                    </form>
                </Box>
            </Flex>
        </ChakraProvider>
    );
};

export default AdminLoginPage;
