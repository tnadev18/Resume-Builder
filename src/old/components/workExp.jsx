import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  GridItem,
  HStack,
  Select,
  Input,
  SimpleGrid,
  extendTheme,
  Stack,
  Textarea,
  Text,
  Box,
  Radio,
  RadioGroup, VStack, Divider
} from "@chakra-ui/react";
import React, { useState } from "react";









const WorkDetails = (props) => {

  const { resumeInfo, setResumeInfo, setPage } = props;


  const paragraphStyle = {
    color: 'red',
  };
  const [option, setOption] = useState('');



  const handleOptionChange = (value) => {
    setOption(value);
    // Reset form data when changing options

  };

  return (


    <Stack>
      <text > <strong>Do you have any work experirnce?</strong></text>
      <Box p={4}>
        <RadioGroup onChange={(e) => handleOptionChange(e)} value={option}>
          <VStack spacing={4} align="flex-start">
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
            <Radio value="idk">School graduate/12th passed</Radio>
          </VStack>
        </RadioGroup>
        <br />
        {option === 'yes' && (
          <FormControl>
            <SimpleGrid>

              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <SimpleGrid>
                    <FormLabel>Employer*</FormLabel><br />

                    <FormLabel>Current/Last*</FormLabel>

                    <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                      <FormControl>
                        <FormLabel>From /von (month / year)*</FormLabel></FormControl>
                      <FormControl>
                        <Input
                          type="date"

                        
                        /></FormControl>
                      <FormControl>
                        <FormLabel> to/bis (Monat - Jahr)*</FormLabel></FormControl>
                      <FormControl>
                        <Input
                          type="date"

                       
                        /></FormControl>
                      <FormControl>
                        <FormLabel> "Employer Name / Address
                          Name/Adresse des Arbeitgebers"*</FormLabel></FormControl>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder=""
                         
                        /></FormControl>
                      <FormControl>
                        <FormLabel>"Department / Position
                          Abteilung / Position"*</FormLabel></FormControl>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder=""
                         
                        /></FormControl>
                    </SimpleGrid>
                    <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                      <FormControl>
                        <FormLabel>Upload Experience Certificate(pdf)*</FormLabel></FormControl>
                      <FormControl> <Input
                        type="file"
                        colorScheme="#00b0ff"
                        w="8rem"
                        rightIcon={<AddIcon />}

                      />

                        <Button color="#00b0ff">
                          View</Button>
                        <Button color="#00b0ff">
                          Delete</Button></FormControl>
                    </SimpleGrid><br />
                  </SimpleGrid>

               
                  <Divider
                    orientation="horizontal"
                    borderColor="#2F4F4F"
                    borderWidth="2px"
                  />

                  <Button marginRight={2} color="#00b0ff" >
                    Add
                  </Button>
                  <Button
                    color="red"
                 
                  >
                    Delete
                  </Button>

                </FormControl>
              </VStack>
            </SimpleGrid>
          </FormControl>

        )}

        {option === 'no' && (
          
          <VStack spacing={4} align="stretch">
             <FormLabel style={{ fontWeight: 'bold' }}>Internship	*</FormLabel><br />
          

            <Box  borderWidth="1px" p={4} borderRadius="md">
              <FormControl>
      <FormLabel>From - to (month / year)*</FormLabel> </FormControl>
    <FormControl>
    <Input
        type="date"
        placeholder=""

      
      />
    </FormControl>

    <FormControl>
      <FormLabel> von -bis (Monat - Jahr)*</FormLabel> </FormControl>
    <FormControl>
      <Input
        type="date"
        placeholder=""
    
      /> </FormControl>
    <FormControl>
      <FormLabel>"Hospital Name / Address
        Adresse des Krankenhauses/der Klinik"*</FormLabel> </FormControl>
    <FormControl>
      <Input
        type="text"
        placeholder=""
       
      /> </FormControl>
    <FormControl>
      <FormLabel>"Department / Position
        Abteilung / Position"*</FormLabel> </FormControl>
    <FormControl>
      <Input
        type="text"
        placeholder=""
     
      /> </FormControl>

            

<div>  
<FormLabel style={{ fontWeight: 'bold' }}>Duty 1`</FormLabel>
  <FormControl>
          <FormLabel>"Information about duties performed	"*</FormLabel></FormControl>

       
<FormControl>
      <Input
        type="text"
        placeholder=""
       
        
      />
          <FormLabel>Duration (in months)	*</FormLabel></FormControl>
        <FormControl>
          <Input
            type="text"
            placeholder=""
          
          />
         

          </FormControl>



                
                </div>
            
              <Button  color="#00b0ff" mt={2} size="sm">
                Add Duty
              </Button>
             
              <Button  mt={2} ml={2} size="sm" color="red">
                Delete Duty
              </Button>
          
            </Box>
         

<SimpleGrid columns={[1, 1, 1, 2]} spacing={1} placeItems="center">
      <FormControl>
        <Button marginRight={2} color="#00b0ff">
          Add
        </Button>
        <Button
          color="red"
          
        >
          Delete
        </Button></FormControl>
    </SimpleGrid>
        </VStack>
           )}
      </Box>

      <HStack spacing={8} justify="center">

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
        >
          Save
        </Button>
      </HStack></Stack>


  );

};

export default WorkDetails;
