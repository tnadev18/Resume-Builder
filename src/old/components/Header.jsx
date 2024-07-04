// src/components/Header.js

import React from 'react';
import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaDoorClosed } from 'react-icons/fa';
import { FaFontAwesome } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';

const Header = () => {
  const location = useLocation();
  console.log(location)
  const navigate = useNavigate();
  return (

    <Box bg="#F0F8FF" p={4}>
      <Flex align="center" justify="space-between">
        <Image src='logo.jpeg' id='logo' alt="Logo" boxSize={{ base: "4rem", sm: "6rem" }} />
        <div className='flex flex-col justify-end items-end space-y-4'>
          <div className='flex'>
            <Text color="navy" id='print' fontSize="1.2rem" fontWeight="bold" mr={4} className='hidden sm:block'>
              Call for Enquiry:
            </Text>
            <Text color="navy" id='print' fontSize="1.2rem" fontWeight="bold" className='hidden sm:block'>
              +91-7558323069
            </Text>

          </div>


          {localStorage.getItem('sid') || localStorage.getItem('aid') ? (<div className='flex flex-col justify-center items-center'>

            <div id='print' className='flex justify-center items-center space-x-2 '>
              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
              <p>  {localStorage.getItem('display_name')}</p>
            </div>

            <Button id="print" onClick={e => {
              localStorage.clear()
              navigate('/')

            }}

              className='flex items-center font-bold space-x-2'
            >
              <p>Logout</p>
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></svg>
            </Button>
          </div>) : ''}


        </div>
      </Flex>
    </Box>
  );
};

export default Header;
