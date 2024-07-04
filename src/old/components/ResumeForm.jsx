import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  VStack,
  Center,
  Heading,
  Progress,
  Stack,
  HStack,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import BasicDetails from "./BasicDetailsForm";
import EducationDetails from "./Declaration";
import ResumeTemplate from "./ResumeTemplate";
import PersonalDetails from "./Education";
import Educ from "./workExp";
import Motivation from "./Motivation";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const ResumeForm = () => {
  
  const [page, setPage] = React.useState(0);
  const [isMobile] = useMediaQuery("(max-width: 798px)");
  const [token, setToken] = useState(false)
 

  const navigate = useNavigate()
  

  

  const formPage = [
    "PERSONAL DATA/ PERSÖNLICHE ANGABEN",
    "EDUCATIONAL QUALIFICATION / SCHULISCHE QUALIFIKATION",
    "WORK EXPERIENCE / ARBEITSERFAHRUNG",
    "DECLARATION /  ERKLÄRUNG",
    "MOTIVATION LETTER",
  ];
 


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/")
    } else {
      setToken(true)
    }
  }, [])

  const renderForm = () => {

    switch (page) {
      case 0:
        return (
          <BasicDetails
            setPage={setPage}
          />
        );

      case 1:
        return (
          <PersonalDetails
            setPage={setPage}
          />
        );

      case 2:
        return (
          <Educ
            setPage={setPage}
          />
        );
      case 3:
        return (
          <EducationDetails
            setPage={setPage}
          />
        );


      case 4:
        return (
          <div>
            <Motivation
              setPage={setPage}
            />
            <Button
              style={{
                marginLeft: 220,
                marginTop: 20
              }}
           
            >Save and Submit</Button>
          </div>
        );
      default:
        return;
    }
  };

  return (
    <>
      {token ?
        <Stack mb="50px">

          <Center
            style={{ display: page === 5 ? "none" : "flex" }}
            w="100%"
            px="12px"
            flexDir="column"
          >
            <Heading p={4}>
              Build Your Resume <EditIcon boxSize={8} />
            </Heading>
            <Box w="60%" borderRadius="lg">
              <Progress
                color="#00b0ff"
                value={page === 0 ? 33.3 : page === 1 ? 66.6 : 100}
              />
            </Box>
          </Center>
          {isMobile ? (
            <HStack p={4} spacing={3} justify="center">
              <VStack
                justify="center"
                spacing={4}
                width="90%"
                style={{ display: page === 5 ? "none" : "block" }}
              >
                <Box
                  p={8}
                  borderRadius="lg"
                  bg="white"
                  color="gray.900te"
                  boxShadow="xl"
                  rounded="md"
                >
                  <Center>
                    <Heading mb={4}>{formPage[page]}</Heading>
                  </Center>
                  {renderForm()}
                </Box>
              </VStack>
              <VStack style={{ display: page === 5 ? "block" : "none" }}>
                <ResumeTemplate  page={page} />
              </VStack>
            </HStack>
          ) : (
            <HStack p={4} spacing={3} align="stretch" justify="center">
              <VStack
                justify="center"
                spacing={4}
                width="50%"
                style={{ display: page === 5 ? "none" : "block" }}
              >
                <Box
                  p={8}
                  borderRadius="lg"
                  bg="white"
                  color="gray.900"
                  boxShadow="xl"
                  rounded="md"
                  border="2px solid #e2e8f0"
                >
                  <Center>
                    <Heading mb={4}>{formPage[page]}</Heading>
                  </Center>
                  {renderForm()}
                </Box>
              </VStack>
              <VStack style={{ width: page === 5 ? "80%" : "50%" }}>
                <ResumeTemplate  page={page} />
              </VStack>
            </HStack>
          )}
        </Stack> : ""}
    </>
  );
};

export default ResumeForm;
