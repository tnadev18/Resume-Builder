import React, { useState } from 'react';
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

export default function ResetPassword(){
    const [formData, setFormData] = useState({
        email: '',
    });
    
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAdminLogin = () => {
        navigate('/admin');
    };
    




    const navigate = useNavigate();

    const handleLogin = async (e) => {
        setError('');
        setSuccess('');
        setLoading(true);
        try{
            const dat = new FormData();
            dat.append('email', formData.email);
            const res = await axios.post('https://testapi1.nursingpioneer.com/forgot_password', dat);
            if(res.data.success){
                setSuccess("Password reset link sent to your email.");
            }
            setLoading(false);
            // navigate('/admin');
        }catch(e){
            setLoading(false);
            console.log(e.response.data.msg)
            setError(e.response.data.msg)
            // alert("Enter Valid Details.")
            setFormData({
                email: '',
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
                className='flex-col space-y-7'
            >
                <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" bg="#00b0ff">
                    <form >
                        <Heading mb={4} textAlign="center" color="white">
                            Reset Password
                        </Heading>
                        <FormControl mb={4} isRequired>
                            <FormLabel color="black">Enter email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                placeholder='Enter your email'
                                value={formData.email}
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
                            {loading ? 'Loading...' : 'Reset Password'}
                        </Button>
                    </form>
                </Box>
                        {success=='Password reset link sent to your email.'?<p className='text-green-500'>{success}</p>:<p className='text-red-500'>{error}</p>}
                        
            </Flex>
        </ChakraProvider>
    );
};


