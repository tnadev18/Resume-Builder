import React, { useEffect, useState } from 'react';
import { ChakraProvider, extendTheme, Box, Flex, Heading, Input, Button, Link, FormControl, FormLabel, } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useLocation } from 'react-router-dom';

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

export default function ForgotPassword(){
    const [formData, setFormData] = useState({
        password: '',
        pass2: '',
    });

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const email = params.get('email');
    const reset_token = params.get('reset_token');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [redirecting, setRedirecting] = useState(false);

    useEffect(()=>{
        if(redirecting){
            setTimeout(()=>{
                navigate('/');
            }, 1000);
        }
    })


    const navigate = useNavigate();

    const handleLogin = async (e) => {
        setError('');
        setSuccess('');
        setLoading(true);
        if(formData.password !== formData.pass2){
            setError("Passwords do not match.");
            setLoading(false);
            formData.password = '';
            formData.pass2 = '';    
            return;
        }
        try{
            const dat = new FormData();
            dat.append('email', email);
            dat.append('reset_token', reset_token);
            dat.append('new_password', formData.password);
            const res = await axios.post('https://testapi1.nursingpioneer.com/reset_password', dat);

            if(res.data.success){
                setLoading(false)
                setSuccess("Password reset successfully, redirecting...");
                setRedirecting(true);
            }

            
            // navigate('/admin');
        }catch(e){
            // alert("Enter Valid Details.")
            setLoading(false);
            setError('Error resetting password')
            setFormData({
                password: '',
                pass2: '',
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
                className='flex flex-col space-y-7'
            >
                <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" bg="#00b0ff">
                    <form >
                        <Heading mb={4} textAlign="center" color="white">
                            Forgot Password
                        </Heading>
                        <FormControl mb={4} isRequired>
                            <FormLabel color="black">Enter new password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                color="black"
                                bg="white"
                            />
                        </FormControl>
                        <FormControl mb={4} isRequired>
                            <FormLabel color="black">Confirm Password</FormLabel>
                            <Input
                                type="password"
                                name="pass2"
                                value={formData.pass2}
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
                        {(success=="Password reset successfully, redirecting...")?<p className='text-green-500'>{success}</p>:<p className='text-red-500'>{error}</p>}

            </Flex>
        </ChakraProvider>
    );
};


