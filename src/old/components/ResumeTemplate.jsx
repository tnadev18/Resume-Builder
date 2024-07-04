import { PhoneIcon } from "@chakra-ui/icons";
import {
  Text,
  Center,
  Heading,
  HStack,
  Stack,
  Link,
  VStack,
  StackDivider,
  Button,
  Box,
  FormLabel
} from "@chakra-ui/react";
import React from "react";
import ReactToPrint from "react-to-print";

const ResumeTemplate = (props) => {


  return (
    <Box
      p={8}
      borderRadius="3g"
      bg="white"
      color="gray.900"
      boxShadow="xl"
      rounded="md"
      border="2px solid #e2e8f0"
      width="100%"
      height="100%"
    >
      <Stack spacing={4}  m={6} fontFamily="sans-serif">
        <Stack spacing={1}>
          <Center>
            <Heading as="h1">

            </Heading>
          </Center>
          <Center>
            <HStack
              justify="center"
              wrap="wrap"
              divider={<StackDivider borderColor="gray.500" />}
            >

            </HStack>
          </Center>
          <HStack justify="center">
            <address>
              <PhoneIcon />

            </address>
          </HStack>
        </Stack>

        <VStack spacing={2} align="stretch">
          <Heading as="h3" fontSize="xl" borderBottomWidth="1px">
            PERSONAL DATA/ PERSÖNLICHE ANGABEN
          </Heading>

          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>Language:</Text></FormLabel>
          {/* <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>Father's Name / Vater Name:</Text>  </FormLabel> */}
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>Birthdate / Geburtsdatum:</Text> </FormLabel>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>Place of Birth / Geburtsort: </Text>  </FormLabel>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>Passport Number / Reisepassnummer:</Text>  </FormLabel>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>Marital Status/ Familienstand:</Text> </FormLabel>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>Computer skills /Computerkenntnisse:</Text> </FormLabel>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>Hobbies / Hobbies :</Text></FormLabel>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>Address: </Text> </FormLabel>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>country:  </Text></FormLabel>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>Marital Status/ Familienstand: </Text> </FormLabel>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>Gender/Geschlecht(wie im reisepass): </Text> </FormLabel>
        </VStack>

        <VStack spacing={2} align="stretch">
          <Heading as="h3" fontSize="xl" borderBottomWidth="2px">
            EDUCATIONAL QUALIFICATION / SCHULISCHE QUALIFIKATION
          </Heading>
          <Heading as="h3" fontSize="m" >
            Post Graduation/Masters
          </Heading>

          <Text style={{ fontWeight: 'bold' }}>program:</Text>

          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}> Year / Semester:</Text>  </FormLabel>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}> From:</Text><Text as="span" style={{ fontWeight: 'bold' }}> To:</Text><br /> </FormLabel>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>University:</Text></FormLabel>

          <Heading as="h3" fontSize="m" >
            Under Graduate Degree/Diploma
          </Heading>
          <Text style={{ fontWeight: 'bold' }}>program:</Text>


          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>Year / Semester:</Text>  <Text as="span" style={{ fontWeight: 'bold' }}> From:</Text>  <Text as="span" style={{ fontWeight: 'bold' }}> To:</Text> <br /></FormLabel>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>University:</Text></FormLabel>




          <Heading as="h3" fontSize="m" >
            12th
          </Heading>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}> From:</Text>
            <Text as="span" style={{ fontWeight: 'bold' }}>University:</Text></FormLabel>
          <Heading as="h3" fontSize="m" >


            11th
          </Heading>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>  From:</Text>   <Text as="span" style={{ fontWeight: 'bold' }}>  To: </Text>

            <Text as="span" style={{ fontWeight: 'bold' }}>University:</Text></FormLabel>

          <Heading as="h3" fontSize="m" >
            10th
          </Heading>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>  From:</Text>  <Text as="span" style={{ fontWeight: 'bold' }}> To: </Text><br />

            <Text as="span" style={{ fontWeight: 'bold' }}>University:</Text></FormLabel>

          <Heading as="h3" fontSize="m" >
            1st to 9th
          </Heading>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}> From: </Text><Text as="span" style={{ fontWeight: 'bold' }}> To:</Text><br />

            <Text as="span" style={{ fontWeight: 'bold' }}>University:</Text></FormLabel>
          <Heading as="h3" fontSize="m" >
            Break Year (ifany)
          </Heading>


          <FormLabel display="inline" >
            <Text as="span" style={{ fontWeight: 'bold' }}> From:</Text>
            <Text as="span" style={{ fontWeight: 'bold' }}> To:</Text>
            <Text as="span" style={{ fontWeight: 'bold' }}> Reason for Break:</Text>  <br />
          </FormLabel>



          <Heading as="h3" fontSize="m" >
            Language Proficiency / Sprachkenntnisse:
          </Heading>
          <Text style={{ fontWeight: 'bold' }}>Mother Tongue/ Muttersprache:</Text>
          <Text style={{ fontWeight: 'bold' }}>English/ Englisch: </Text>


          <Heading as="h3" fontSize="m" >
            German / Deutsch*
          </Heading>


          <Text style={{ fontWeight: 'bold' }}> Level:  from:  to: </Text><br />
          <Text style={{ fontWeight: 'bold' }}>  Certificate:      </Text>




        </VStack>


        <VStack spacing={4} align="stretch">
          <Heading as="h3" fontSize="xl" borderBottomWidth="1px">
            WORK EXPERIENCE
          </Heading>

          <Heading as="h3" fontSize="m" >
            Employer
          </Heading>






          <Text style={{ fontWeight: 'bold' }}>Currenr/past</Text>
          <Text style={{ fontWeight: 'bold' }}>From/von (month / year): To: </Text>
          <Text style={{ fontWeight: 'bold' }}>Employer Name / Address Name/Adresse des Arbeitgebers: </Text>
          <Text style={{ fontWeight: 'bold' }}>Department / Position Abteilung / Position: </Text>




          <Heading as="h3" fontSize="m" >
            Internship
          </Heading>

          <Text style={{ fontWeight: 'bold' }}> Current/Past</Text>
          <Text style={{ fontWeight: 'bold' }}>From / von (month / year):  to / bis (Monat - Jahr): </Text>
          <Text style={{ fontWeight: 'bold' }}>Employer Name / Address Name / Adresse des Arbeitgebers: </Text>
          <Text style={{ fontWeight: 'bold' }}>Department / Position Abteilung / Position: </Text>
          <Text style={{ fontWeight: 'bold' }}> Duty1 </Text>



          <Text style={{ fontWeight: 'bold' }}> Information about duties performed:</Text>

          <Text style={{ fontWeight: 'bold' }}>Duration (in months): </Text>






        </VStack>


        <HStack divider={<StackDivider />} pt="24px">
          <Button
            w="max-content"
            colorScheme="messenger"
            isDisabled={page !== 5}
            onClick={() => {
              window.location.reload();
            }}
          >
            Create New
          </Button>
          <div style={{ fontWeight: 'bold' }}>
            <ReactToPrint
              trigger={() => (
                <Button
                  colorScheme="messenger"
                  w="max-content"
                  isDisabled={page !== 5}
                >
                  View
                </Button>
              )}
            />
          </div>
        </HStack>
      </Stack>
    </Box>
  );
};

export default ResumeTemplate;
