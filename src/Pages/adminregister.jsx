// RegistrationPage.js
import React, { useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    Checkbox,
    Stack,
    Select
} from '@chakra-ui/react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
export default function AdminRegistrationPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        phn: '',
        password: '',

    });

    const [registrationComplete, setRegistrationComplete] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        });
    };
    const handleRegistration = async (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Password validation
        if (formData.password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        // Contact number validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phn)) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        const res = await axios.post(`https://testapi1.nursingpioneer.com/registerAdmin`, formData);
        if (res.data.success) {
            let message = res.data.message;
            if (message === "Admin added successfully") {
                message = "The user is Registered Successfully";
            }
            alert(message);
            localStorage.setItem('sid', res.data.sid);
            navigate('/admin');
        }
        else {
            alert(res.data.error);
        }
    };

    return (
        <Flex align="center" justify="center" h="100vh" marginBottom={4}>
            <Box
                p={30}  // Decrease padding to make it smaller
                maxWidth="400px"
                 // Adjust the maximum width as needed
                borderWidth={3}
                borderRadius={14}
                borderColor="blue"
                boxShadow="80g"
                bg="white"
                position="absolute"
                marginBottom={'15%'}
                left="50%"
                transform="translate(-50%, 20%)"
            >



                <Heading mb={4} textAlign="center" color="black">
                    Registration
                </Heading>
                {registrationComplete ? (
                    <Box color="black" textAlign="center">
                        Registration completed! Check your email for confirmation.
                    </Box>
                ) : (
                    <form>
                        <FormControl mb={4} isRequired>
                            <FormLabel color="black">First name</FormLabel>
                            <Input
                                type="text"
                                name="fname"
                                value={formData.fname}
                                onChange={handleInputChange}
                                color="black"
                                bg="white"
                            />
                        </FormControl>
                        <FormControl mb={4} isRequired>
                            <FormLabel color="black">Last name</FormLabel>
                            <Input
                                type="text"
                                name="lname"
                                value={formData.lname}
                                onChange={handleInputChange}
                                color="black"
                                bg="white"
                            />
                        </FormControl>
                        <FormControl mb={4} isRequired>
                            <FormLabel color="black">Mobile Number</FormLabel>
                            <Input
                                type="tel"
                                name="phn"
                                value={formData.phn}
                                onChange={(e) => {
                                    // Remove non-numeric characters and limit to 10 digits
                                    const numericValue = e.target.value.replace(/\D/g, '');
                                    const limitedValue = numericValue.slice(0, 10);

                                    // Update the state with the limited value
                                    handleInputChange({
                                        target: {
                                            name: 'phn',
                                            value: limitedValue,
                                        },
                                    });
                                }}
                                color="black"
                                bg="white"
                                pattern="^[0-9]{10}$"
                            />
                        </FormControl>
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
                        <Stack spacing={4}>

                            <Button onClick={handleRegistration} colorScheme="blackAlpha" width="100%" >
                                Register
                            </Button>
                        </Stack>
                    </form>
                )}
            </Box>
        </Flex>
    );
};

