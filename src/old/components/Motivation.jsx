import { AddIcon, ChevronRightIcon,ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  FormControl,
  
  FormLabel,
  Input,
  Alert,
  Checkbox,
  AlertIcon,
  
  SimpleGrid,
  Stack,
  border,
} from "@chakra-ui/react";
import React, { useState } from 'react';
import {  Text } from '@chakra-ui/react';

const Motivation = (props) => {
  const { resumeInfo, setResumeInfo, setPage } = props;
 

  
  const paragraphStyle = {
    color: 'red',
  };

  return (
    <Stack>

<FormControl>




        <Input
            type="text"
            placeholder="Your Name"
           
          />
        
        <Input
            type="text"
            placeholder="Postal Address,PIN CODE, CITY"
          
          />


<Input
              type="tel"
              placeholder="phone number"
              maxLength={10}
              pattern="[0-9]{10}"
           
            />

<Input
            type="email"
            placeholder="Your email address"
           
          />
    <br/>
    <br/>
    <br/>

    <Input
            type="text"
            placeholder="Name of the Adresse "
          
          />


<Input
              type="text"
              placeholder="Postal Address"
              
              pattern="[0-9]{10}"
             
             
            />

<Input
            type="text"
            placeholder="PIN CODE, CITY"
          
          />
    <br/>
    <br/>
    <br/>

<SimpleGrid columns={[1, 1, 1, 4]} spacing={4}  textAlign="Right">
          
      <Input
  type="text"
  placeholder="Place"
  
 
/>


        <FormControl>
          <Input
            type="Date"
            placeholder="DD-MM-YYYY"
          
          />
        </FormControl>

</SimpleGrid>
<br/>
<br/>



 <p style={paragraphStyle}>Please write this letter by addressing the following questions:<br/>
1. What training would you like to complete in Germany?<br/>
2. Why do you want to complete your training in Germany?<br/>
3. What are your plans after completing your training?<br/>
4. How, where and how long have you been learning German?<br/></p>
<br/><br/>
<textarea id="description"  style={{ border: '2px solid grey' }} placeholder="Type your Letter here" name="description" rows="8" cols="90" border="1px" ></textarea>
<br/>
<br/>
<br/>

<br/>


    <p>Best Regards</p>

</FormControl>


<FormControl>
        
          <Input
            type="text"
            placeholder="Your Name"
         
           
          />
        </FormControl>



    
    
        
     
        <FormControl>
          <FormLabel>Signature-Image(pdf)</FormLabel>
        
          <Input
          type="file"
       
          colorScheme="#00b0ff"
          w="100%"
          rightIcon={<AddIcon />}
        />
       



        </FormControl><br/>
        <SimpleGrid columns={[1, 1, 1, 3]} spacing={4} placeItems="center">

        
      </SimpleGrid>
     

      


      <Center mt={8}>
      <Button
          colorScheme="blue"
          onClick={() => {
            setPage((p) => p - 1);
          }}
          leftIcon={<ChevronLeftIcon />}
        >
          back
        </Button>

        <Button
          color="#00b0ff"
          onClick={() => {
            setPage((p) => p + 1);
          }}
          rightIcon={<ChevronRightIcon />}
          marginLeft={'4%'}
        >
          Save & Submit
        </Button>
      </Center>
    </Stack>
  );
};

export default Motivation;
