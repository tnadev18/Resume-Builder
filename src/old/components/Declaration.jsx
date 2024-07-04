import { AddIcon, ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import React, { useState,useEffect } from "react";
import { Text } from "@chakra-ui/react";

const Declaration = (props) => {
  const { resumeInfo, setResumeInfo, setPage } = props;


  useEffect(() => {

    window.scrollTo(0, 0);
  }, []);


  return (
    <Stack>
      <div  style={{ display: "flex" , flexDirection: 'start' }}>
      <div style={{ display: "flex" , flexDirection: 'column' }}>
        <FormLabel>&nbsp;*</FormLabel>
        <Checkbox
          style={{
            borderColor: '#333',
            transform: 'scale(1)', // Adjust the scale factor as needed
            marginRight: '15px',}}
        />
        </div>
        <div>
          <span>
            I hereby declare that the above information is correct and complete
            to the best of my knowledge and belief.
          </span>
          <br />
          <span>
            Hiermit erkläre ich, dass die obigen Angaben nach meinem besten
            Wissen und Gewissen richtig und vollständig aufgelistet sind.
          </span>
        </div>
      </div>


     <br/>
      <br />
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">

      <FormControl>
        <FormLabel>Signature-Image(pdf)*</FormLabel>

        <Input
          type="file"
          
          colorScheme="#00b0ff"
          w="80%"
          rightIcon={<AddIcon />}
        />
       
      </FormControl>
        <FormControl>
          <FormLabel>Place*</FormLabel>
          <Input
            type="text"
            placeholder=""
           
          />
        </FormControl>
        <FormControl>
          <FormLabel>Country*</FormLabel>
          <Input
            type="text"
            placeholder=""
           
          />
        </FormControl>

        <FormControl>
          <FormLabel>Date*</FormLabel>
          <Input
            type="date"
            placeholder="DD-MM-YYYY"
          
          />
        </FormControl>

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
          marginLeft={"4%"}
        >
          Save
        </Button>
      </Center>
    </Stack>
  );
};

export default Declaration;
