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
  Box,
  Heading,
  border,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import axios from "axios";
import ResumeTemplate from "../Components/template";

export default function Motivation({ action, changeAction }) {
  const navigate = useNavigate();
  // const [action, setAction] = useState("create");
  const [motivation, setMotivation] = useState({
    name2: "",
    address2: "",
    pincode: "",
    place: "",
    date: "",
    description: "",
    name3: "",
    signature: "",
  });

  const paragraphStyle = {
    color: "red",
  };
  const personal = JSON.parse(localStorage.getItem("personal"));
  const personalDataString = localStorage.getItem('personal');
  const personalData = JSON.parse(personalDataString);
  const firstName = personalData.firstName;
  const lastName = personalData.lastName;
  const address = personalData.address;
  const contactNumber = personalData.contactNumber;
  const email = personalData.email;

  const declaration = JSON.parse(localStorage.getItem("declaration"));
  const declarationDataString = localStorage.getItem('declaration');
  const declarationData = JSON.parse(declarationDataString);
  const signature = declarationData.signatureName;


  const education = JSON.parse(localStorage.getItem("education"));
  const work = JSON.parse(localStorage.getItem("work"));
  const internship = JSON.parse(localStorage.getItem("internship"));
  useEffect(() => {
    const motivation = JSON.parse(localStorage.getItem("motivation"));
    if (motivation) {
      setMotivation(motivation);
    }
  }, []);
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


  const NameofAdress = userData?.language === 'English' ? 'Name of the Adresse ' : userData?.language === 'German' ? 'Name des Empfängers' : ''
  const postal = userData?.language === 'English' ? 'Postal Address' : userData?.language === 'German' ? 'Postanschrift' : ''
  const PIN = userData?.language === 'English' ? 'PIN CODE, CITY' : userData?.language === 'German' ? 'PLZ Ort' : ''
  const p1 = userData?.language === 'English' ? 'Please write this letter by addressing the following questions:' : userData?.language === 'German' ? 'Bitte gehen Sie auf folgende Fragen ein' : ''
  const p2 = userData?.language === 'English' ? '1. What training would you like to complete in Germany?' : userData?.language === 'German' ? '1.	Warum möchten Sie in Deutschland den Freiwilligendienst ableisten?' : ''
  const p3 = userData?.language === 'English' ? '2. Why do you want to complete your training in Germany?' : userData?.language === 'German' ? '2.	Wie, wo und wie lange lernen Sie schon Deutsch? ' : ''
  const p4 = userData?.language === 'English' ? '3. What are your plans after completing your training?' : userData?.language === 'German' ? '3.	Welchen Nutzen erhoffen Sie sich von dem Freiwilligendienst?' : ''
  const p5 = userData?.language === 'English' ? '4. How, where and how long have you been learning German?' : userData?.language === 'German' ? '4.	Welche Ausbildung möchten Sie nach dem Freiwilligendienst in Deutschland absolvieren?' : ''
  const p6 = userData?.language === 'English' ? '' : userData?.language === 'German' ? '5.	Warum möchten Sie die Ausbildung in Deutschland absolvieren?' : ''
  const p7 = userData?.language === 'English' ? '' : userData?.language === 'German' ? '6.	Wie passt dieser Aufenthalt in ihre konkrete Lebensplanung und zu Ihrer beruflichen Perspektive?' : ''
  const Best = userData?.language === 'English' ? 'Best Regards' : userData?.language === 'German' ? 'Mit freundlichen Grüßen,' : ''
  const Sign = userData?.language === 'English' ? 'Signature' : userData?.language === 'German' ? 'Unterschrift,' : ''
  const g1 = userData?.language === 'English' ? '' : userData?.language === 'German' ? 'Motivationsschreiben ' : ''
  const g2 = userData?.language === 'English' ? '' : userData?.language === 'German' ? 'Sehr geehrte Damen und Herren,' : ''
  const g3 = userData?.language === 'English' ? '' : userData?.language === 'German' ? 'Bitte stelle dich kurz vor: Name, Alter, Familie…,' : ''
  const place = userData?.language === 'English' ? 'Place' : userData?.language === 'German' ? 'Ort    ' : ''

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
      <div className="flex flex-wrap justify-evenly">

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
              <Heading mb={4} fontSize="xx-large">MOTIVATION LETTER</Heading>
            </Center><br />

            <FormControl>

              <Input type="text" placeholder="Your Name" value={firstName + " " + lastName} />

              <Input type="text" placeholder="Postal Address,PIN CODE, CITY" value={address} />

              <Input type="text" placeholder={place} />


              <Input type="email" placeholder="Your email address" value={email} />
              <Input
                type="tel"
                placeholder="phone number"
                value={contactNumber}
                maxLength={10}
                pattern="[0-9]{10}"
              />
              <br />
              <br />
              <br />

              <Input
                type="text"
                placeholder={NameofAdress}
                value={motivation.name2}
                onChange={(e) => {
                  setMotivation((prev) => ({ ...prev, name2: e.target.value }));
                }}
              />

              <Input
                type="text"
                placeholder={postal}
                pattern="[0-9]{10}"
                value={motivation.address2}
                onChange={(e) => {
                  setMotivation((prev) => ({ ...prev, address2: e.target.value }));
                }}
              />

              <Input
                type="text"
                placeholder={PIN}
                value={motivation.pincode}
                onChange={(e) => {
                  setMotivation((prev) => ({ ...prev, pincode: e.target.value }));
                }}
              />

              <br />
              <br />
              <br />

              <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} textAlign="Right">
                <div></div><div></div>    
                <Input
                  type="text"
                  placeholder="Place"
                  value={motivation.place}
                  onChange={(e) => {
                    setMotivation((prev) => ({ ...prev, place: e.target.value }));
                  }}
                />

                <FormControl>
                <Input
                  type="Date"
                  placeholder="Date"
                  value={motivation.date}
                  onChange={(e) => {
                    setMotivation((prev) => ({ ...prev, date: e.target.value }));
                  }}
                />
                </FormControl>

              </SimpleGrid>
              <h3 className="font-semibold">{g1}</h3>
              <br />
              <p>{g2}</p>
              <br />
              {g3}
              <br />
              <br />

              <p style={paragraphStyle}>
                {p1}
                <br />
                {p2}
                <br />
                {p3}
                <br />
                {p4}
                <br />
                {p5}
                <br />

                {p6}
                <br />
                {p7}
                <br />
              </p>
              <br />
              <br />
              <SimpleGrid columns={[1, 1, 1, 1]} spacing={4} textAlign="Right">

                <textarea
                  id="description"
                  style={{ border: "2px solid grey" }}
                  placeholder="Type your Letter here"
                  name="description"
                  rows="8"
                  cols="90%"
                  value={motivation.description}
                  onChange={(e) => {
                    setMotivation((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                ></textarea>              </SimpleGrid>

              <br />
              <br />
              <br />

              <br />

              <p>{Best}</p>
            </FormControl>

            <FormControl>
              <Input
                type="text"
                placeholder="Your Name"
                value={firstName + " " + lastName}
                onChange={(e) => {
                  setMotivation((prev) => ({ ...prev, name3: e.target.value }));
                }}
              />
            </FormControl>
            <br />
            <FormControl className="flex">
              <FormLabel>{Sign}:</FormLabel>

              {/* <Input
                type="file"
                colorScheme="#00b0ff"
                accept=".pdf"
                w="100%"
                value={signature}
                onChange={async (e) => {
                  const formData = new FormData();
                  formData.append("file", e.target.files[0]);
                  formData.append("sid", localStorage.getItem("sid"));
                  try {
                    const res = await axios.post(
                      "https://testapi1.nursingpioneer.com/uploadFile",
                      formData
                    );
                    const url = res.data.file_url;
                    setMotivation((prev) => ({ ...prev, signature: url }));
                  } catch (e) {
                    alert("Error in uploading file");
                  }
                }}
              /> */}
              <a href={declaration.signature}><Button size="sm" color="#00b0ff" marginRight={4} marginLeft={4}>View</Button></a>
            </FormControl>
            <br />
            <SimpleGrid
              columns={[1, 1, 1, 3]}
              spacing={4}
              placeItems="center"
            ></SimpleGrid>

            <Center mt={8}>
              <Button
                colorScheme="blue"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/declaration");
                }}
                leftIcon={<ChevronLeftIcon />}
              >
                back
              </Button>

              <Button
                color="#00b0ff"
                onClick={async (e) => {
                  const personal = JSON.parse(localStorage.getItem("personal"));
                  const education = JSON.parse(localStorage.getItem("education"));
                  const work = JSON.parse(localStorage.getItem("work"));
                  const internship = JSON.parse(localStorage.getItem("internship"));
                  const declaration = JSON.parse(
                    localStorage.getItem("declaration")
                  );
                  const sid = localStorage.getItem('sid')
                  const resume = {
                    personal: personal,
                    education: education,
                    work: work,
                    internship: internship,
                    declaration: declaration,
                    motivation: motivation,
                    sid: sid,
                  };
                  try {
                    if (action === "create") {
                      resume.sid = localStorage.getItem('sid')
                      const res = await axios.post(
                        "https://testapi1.nursingpioneer.com/submitResume",
                        resume
                      );
                      localStorage.removeItem("personal");
                      localStorage.removeItem("education");
                      localStorage.removeItem("work");
                      localStorage.removeItem("internship");
                      localStorage.removeItem("declaration");
                      localStorage.removeItem("motivation");
                      alert("Resume Submitted Successfully");
                      navigate("/create");
                    } else if (action === "editByAdmin" || action === "editByStudent") {
                      const updatedResume = {
                        ...resume,
                        sid: localStorage.getItem("SIDofStudentToEdit")
                      };
                      console.log(updatedResume);
                      console.log(action);
                      const res = await axios.put(
                        "https://testapi1.nursingpioneer.com/editStudentResume",
                        updatedResume
                      );
                      localStorage.removeItem("SIDofStudentToEdit");
                      localStorage.removeItem("personal");
                      localStorage.removeItem("education");
                      localStorage.removeItem("work");
                      localStorage.removeItem("internship");
                      localStorage.removeItem("declaration");
                      localStorage.removeItem("motivation");
                      alert("Resume Edited Successfully");
                      if (action === "editByStudent") {
                        navigate("/create")
                      } else {
                        navigate("/admin");
                      }
                      changeAction("create")
                    }
                  } catch (e) {
                    alert("Error in submitting resume");
                  }
                }}
                rightIcon={<ChevronRightIcon />}
                marginLeft={"4%"}
              >
                {action === "create" ? "Save & Submit" : "Save and Edit"}
              </Button>
            </Center>
          </Box>  </Stack>
        <div className="w-full sm:w-1/2 p-2 sm:pt-0">
          <ResumeTemplate
            info={personal}
            education={education}
            work={work}
            internship={internship}
            motivation={motivation}
          />
        </div>
      </div>
    </div>
  );
}
