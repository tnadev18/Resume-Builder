import { AddIcon, ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Alert,
  Checkbox,
  FormErrorMessage,
  AlertIcon,
  SimpleGrid,
  Heading,
  Stack,
  Box
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router";
import ResumeTemplate from "../Components/template";

export default function Declaration() {
  const navigate = useNavigate();
  const [declaration, setDeclaration] = useState({
    signature: "",
    place: "",
    country: "",
    date:""
    
  });



  const [declarationErrors, setDeclarationErrors] = useState({
    signature: "",
    place: "",
    country: ""
  });

  const validateDeclarationFields = () => {
    let hasErrors = false;

    const updateErrorState = (fieldName, errorMessage) => {
      setDeclarationErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: errorMessage,
      }));
      hasErrors = true;
    };

    // Validate 'signature' field
    if (!declaration.signature || typeof declaration.signature !== 'string' || declaration.signature.trim() === "") {
      updateErrorState("signature", "Signature is required.");
    }

    // Validate 'place' field
    if (!declaration.place || typeof declaration.place !== 'string' || declaration.place.trim() === "") {
      updateErrorState("place", "Place is required.");
    }

    // Validate 'country' field
    if (!declaration.country || typeof declaration.country !== 'string' || declaration.country.trim() === "") {
      updateErrorState("country", "Country is required.");
    }

    // Validate 'date' field
    if (!declaration.date || typeof declaration.date !== 'string' || declaration.date.trim() === "") {
      updateErrorState("date", "Date is required.");
    }

    // Display an alert with detailed error messages
    if (hasErrors) {
      const errorMessages = Object.entries(declarationErrors)
        .filter(([field, error]) => !!error)
        .map(([field, error]) => `${field}: ${error}`)
        .join("\n");
      //    alert(`Form has the following validation errors:\n${errorMessages}`);
    }

    return !hasErrors;
  };



  const personal = JSON.parse(localStorage.getItem("personal"));
  const education = JSON.parse(localStorage.getItem("education"));
  const work = JSON.parse(localStorage.getItem("work"));
  const internship = JSON.parse(localStorage.getItem("internship"));

  useEffect(() => {
    const declaration = JSON.parse(localStorage.getItem("declaration"));
    if (declaration) {
      setDeclaration(declaration)
    }
  }, [])
  const [isSubmitted, setIsSubmitted] = useState(false);



  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem('personal');

    if (storedData) {
      // Parse the JSON data
      const parsedData = JSON.parse(storedData);

      // Extract 'language' property and set it in the state
      const { language } = parsedData;
      setUserData({ language });
    }
  }, []);


  const headName = userData?.language === 'English' ? 'DECLARATION ' : userData?.language === 'German' ? 'ERKLÄRUNG' : ''
  const para = userData?.language === 'English' ? ' I hereby declare that the above information is correct and complete to the best of my knowledge and belief. ' : userData?.language === 'German' ? ' Hiermit erkläre ich, dass die obigen Angaben nach meinem besten Wissen und Gewissen richtig und vollständig aufgelistet sind.RUNG' : ''

  useEffect(() => {
    if (localStorage.getItem('declaration')) {
      setDeclaration(JSON.parse(localStorage.getItem('declaration')));
    }
  }, [])

  useEffect(() => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Note: Months are 0-indexed
    const year = currentDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    setDeclaration((prev) => ({ ...prev, date: formattedDate }));
  }, []);

  return ( 
    <div>
      <Box
        borderBottom="10px solid #00b0ff"
        mb={8}
        width={{ base: "full", sm: "1/3", lg: "30%" }} // Full width on small screens and 1/3 width on larger screens
        mx="auto"
        minHeight={{ base: "auto", sm: "screen" }} // Auto height on small screens and full screen height on larger screens
      >
        <Heading p={4} textAlign="center">
          Build Your Resume
        </Heading>
      </Box>
      <div className="flex ">

        <Stack className="p-2 sm:w-1/2 w-full">

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
              <Heading mb={4} fontSize="2xl">{headName}</Heading>
            </Center><br />
            <div style={{ display: "flex", flexDirection: 'start' }}>
              <div style={{ display: "flex", flexDirection: 'column' }}>
                <FormLabel>&nbsp;<span style={{ color: "red" }}>*</span></FormLabel>
                <Checkbox
                  style={{
                    borderColor: '#333',
                    transform: 'scale(1)', // Adjust the scale factor as needed
                    marginRight: '10px',
                  }}
                />
              </div>
              <div>
                <span>
                  {para}
                </span>
                <br />
              </div>
            </div>


            <br />
            <br />
            <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">

              <FormControl isInvalid={isSubmitted && declaration.signature.trim() === ""} >
                <FormLabel>Signature-Image(Jpg)<span style={{ color: "red" }}>*</span></FormLabel>

                <Input
                  type="file"
                  accept=".jpg"
                  colorScheme="#00b0ff"
                  w="80%"

                  onChange={async (e) => {
                    const formData = new FormData();
                    formData.append("file", e.target.files[0]);
                    formData.append("sid", localStorage.getItem("sid"));
                    formData.append("firstName", personal.firstName);
                    formData.append("lastName", personal.lastName);
                    formData.append("name", "signature")
                    try {
                      const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                      const url = res.data.file_url;
                      setDeclaration((prev) => ({ ...prev, signature: url }));

                    } catch (e) {
                      alert("Error in uploading file");
                    }
                  }}
                />
                <FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl >
              <FormControl isInvalid={isSubmitted && declaration.place.trim() === ""}>
                <FormLabel>Place<span style={{ color: "red" }}>*</span></FormLabel>
                <Input
                  type="text"
                  placeholder="Place"
                  value={declaration.place}
                  onChange={(e) => {
                    setDeclaration((prev) => ({ ...prev, place: e.target.value }));
                  }}

                /><FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={isSubmitted && declaration.country.trim() === ""}>
                <FormLabel>Country<span style={{ color: "red" }}>*</span></FormLabel>
                <Input
                  type="text"
                  placeholder="Country"
                  value={declaration.country}
                  onChange={(e) => {
                    setDeclaration((prev) => ({ ...prev, country: e.target.value }));
                  }}

                /><FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl>

              {/* <FormControl isInvalid={isSubmitted && declaration.date.trim() === ""}>
                <FormLabel>Date<span style={{ color: "red" }}>*</span></FormLabel>
                <Input
                  type="date"
                  placeholder="DD-MM-YYYY"
                  value={declaration.date}
                // onChange={(e) => {
                //   setDeclaration((prev) => ({ ...prev, date: e.target.value }));
                // }}

                /><FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl> */}
<FormControl >
                <FormLabel>Date<span style={{ color: "red" }}>*</span></FormLabel>
                <Input
                  type="Date"
                  value={declaration.date}
                
                  
                  onChange={(e) => {
                    setDeclaration((prev) => ({ ...prev, date   : e.target.value }));
                  }}

                /></FormControl>
            </SimpleGrid>

            <Center mt={8}>
              <Button
                colorScheme="blue"
                onClick={async (e) => {
                  navigate("/work");
                }}
                leftIcon={<ChevronLeftIcon />}
              >
                back
              </Button>

              <Button
                color="#00b0ff"
                onClick={async (e) => {

                  setIsSubmitted(true);
                  window.scrollTo(0, 0);
                  e.preventDefault();

                  // Validate declaration fields before proceeding
                  const isValidDeclaration = validateDeclarationFields();

                  // Check if there are no errors before proceeding
                  if (isValidDeclaration) {
                    // Save data to localStorage
                    localStorage.setItem("declaration", JSON.stringify(declaration));



                    // Navigate to the next step
                    navigate("/motivation");
                  }
                }}

                rightIcon={<ChevronRightIcon />}
                marginLeft={"4%"}
              >
                Next
              </Button>
            </Center>
          </Box>  </Stack>
        <div className="w-1/2 p-2 hidden sm:block
">
          <ResumeTemplate info={personal} education={education} work={work} internship={internship} />
        </div> </div>
    </div>
  );
};
