import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  GridItem,
  FormErrorMessage,
  HStack,
  Select,
  VStack,
  Box,
  Input,
  SimpleGrid,
  extendTheme,
  Stack,
  Textarea,
  Text,
  Divider,
  Heading,
  Center
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { redirect, useNavigate } from "react-router";
import ResumeTemplate from "../Components/template";
import { ResumeContext } from "../context/ResumeContext";
import Personal from './Personal.jsx';

export default function Education() {


  const navigate = useNavigate();
  const personalInfo = JSON.parse(localStorage.getItem("personal"));
  const { resumeInfo } = useContext(ResumeContext)

  const handleViewClick = (fieldName, i, level) => {
    const url = education[level][i][fieldName];
    console.log(url);
    if (url) {
      window.open(url, '_blank');
    }
  };

  const [inputKeys, setInputKeys] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  const [inputKeys1, setInputKeys1] = useState([]);
  const [fileNames1, setFileNames1] = useState([]);

  const [inputKey10, setInputKey10] = useState(Date.now());
  const [inputKeys10, setInputKeys10] = useState([]);
  const [fileNames10, setFileNames10] = useState('');

  const [inputKey11, setInputKey11] = useState(Date.now());
  const [inputKeys11, setInputKeys11] = useState([]);
  const [fileNames11, setFileNames11] = useState('');

  const [inputKey12, setInputKey12] = useState(Date.now());
  const [inputKeys12, setInputKeys12] = useState([]);
  const [fileNames12, setFileNames12] = useState('');

  const handleDeleteClick = async (fieldName, i, educationType) => {
    let educationData;
    console.log(localStorage.getItem("SIDofStudentToEdit"))
    switch (educationType) {
      case 'underGraduation':
        educationData = education.underGraduation;
        // setFileName1('');
        break;
      case 'postGraduation':
        educationData = education.postGraduation;
        // setFileName('');
        break;
      case 'tenthStandard':
        educationData = education.tenthStandard;
        setFileNames10('');
        break;
      case 'eleventhStandard':
        educationData = education.eleventhStandard;
        setFileNames11('');

        break;
      case 'twelthStandard':
        educationData = education.twelthStandard;
        setFileNames12('');

        break;
      default:
        alert('Invalid education type');
        return;
    }

    const urlToDelete = educationData[i][fieldName];
    if (!urlToDelete) {
      alert('No file to delete.');
      return;
    }

    try {
      await axios.post('https://testapi1.nursingpioneer.com/deleteFile', {
        sid: localStorage.getItem("SIDofStudentToEdit"),
        url: urlToDelete,
      });

      const fileInput = document.getElementById(`fileInput-${educationType}-${i}`);
      if (fileInput) {
        fileInput.value = '';
      }
      // Update the state to remove the deleted file
      const updatedEducation = { ...education };
      updatedEducation[educationType][i][fieldName] = '';
      setEducation(updatedEducation);
      // Update the input keys and file names
      const updateKeysAndNames = (setInputKey, setInputKeys, setFileNames) => {
        const newKey = Date.now();
        setInputKey(newKey);
        setInputKeys(keys => {
          const newKeys = [...keys];
          newKeys[i] = Date.now();
          return newKeys;
        });

        if (setFileNames != setFileNames10 && setFileNames != setFileNames11 && setFileNames != setFileNames12) {
          setFileNames(names => {
            const newNames = [...names];
            newNames[i] = '';
            return newNames;
          });
        }

        if (setFileNames === setFileNames10) {
          setFileNames10('');
        }
        else if (setFileNames === setFileNames11) {
          setFileNames11('');
        }
        else if (setFileNames === setFileNames12) {
          setFileNames12('');
        }

      };

      switch (educationType) {
        case 'underGraduation':
          updateKeysAndNames(setInputKey1, setInputKeys1, setFileNames1);
          break;
        case 'postGraduation':
          updateKeysAndNames(setInputKey, setInputKeys, setFileNames);
          break;
        case 'tenthStandard':
          updateKeysAndNames(setInputKey10, setInputKeys10, setFileNames10);
          break;
        case 'eleventhStandard':
          updateKeysAndNames(setInputKey11, setInputKeys11, setFileNames11);
          break;
        case 'twelthStandard':
          updateKeysAndNames(setInputKey12, setInputKeys12, setFileNames12);
          break;
        default:
          break;
      }
    } catch (err) {
      alert('Error deleting file');
    }

  };

  const [inputKey, setInputKey] = useState(Date.now());
  const [fileName, setFileName] = useState('');

  const handleDeleteClickPostGraduation = async (fileType) => {
    const updatedEducation = { ...education };
    const fileUrl = updatedEducation.postGraduation[0][fileType];

    try {
      // Delete the file from the server
      await axios.post('https://testapi1.nursingpioneer.com/deleteFile', {
        sid: JSON.parse(localStorage.getItem("SIDofStudentToEdit")),
        url: fileUrl,
      });

      // Remove the file URL from the education data
      updatedEducation.postGraduation[0][fileType] = null;
      setEducation(updatedEducation);
      setInputKey(Date.now());
      setFileName('');
      // Show the name of the deleted file
      // alert(`Deleted file: ${fileUrl}`);
    } catch (e) {
      alert("Error in deleting file");
    }
  };


  const [inputKey1, setInputKey1] = useState(Date.now());
  const [fileName1, setFileName1] = useState('');

  const handleDeleteClickUnderGraduation = async (fieldName) => {
    const educationData = education.underGraduation;
    const urlToDelete = educationData[0][fieldName];
    if (!urlToDelete) {
      alert('No file to delete.');
      return;
    }

    try {
      await axios.post('https://testapi1.nursingpioneer.com/deleteFile', {
        sid: localStorage.getItem("sid"),
        url: urlToDelete,
      });

      const fileInput = document.getElementById(`marksheet-underGraduation-${0}`);
      if (fileInput) {
        fileInput.value = '';
      }

      // Update the state to remove the deleted file
      const updatedEducation = { ...education };
      updatedEducation.underGraduation[0][fieldName] = '';
      setEducation(updatedEducation);

      setInputKey1(Date.now());
      setFileName1('');
      // Update the input keys and file names
    } catch (err) {
      alert('Error deleting file');
    }
  };

  const handleDeleteClickGerman = async (fieldName, i, educationType) => {
    const urlToDelete = education[educationType][i][fieldName];
    const sid = JSON.parse(localStorage.getItem("SIDofStudentToEdit"))

    try {
      await axios.post('https://testapi1.nursingpioneer.com/deleteFile', {
        sid: sid,
        url: urlToDelete,
      });

      // Update the state to remove the deleted file
      const updatedEducation = { ...education };
      updatedEducation[educationType][i][fieldName] = '';
      setEducation(updatedEducation);

      // Reset the file input
      const fileInput = document.querySelector(`input[type="file"][name="${educationType}-${i}-${fieldName}"]`);
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (e) {
      alert("Error in deleting file");
    }
  };


  const [education, setEducation] = useState(
    {
      postGraduation: [
        {
          name: "",
          yearSem: "",
          from: "",
          to: "",
          marksheet: "",
          university: "",
          place: ""
        }
      ],
      underGraduation: [
        {
          name: "",
          yearSem: "",
          from: "",
          to: "",
          marksheet: "",
          university: "",
          place: ""
        }
      ],
      twelthStandard: [
        {
          from: "",
          to: "",
          marksheet: "",
          university: "",
          place: ""
        }
      ],
      eleventhStandard: [
        {

        }
      ],
      tenthStandard: [
        {
          from: "",
          to: "",
          marksheet: "",
          university: "",
          place: ""
        }
      ],
      firstToNinthStandard: [
        {
          from: "",
          to: "",
          university: "",
          place: ""
        }
      ],
      blankYear: [
        {
          reason: "",
          from: "",
          to: "",
          place: ""
        }
      ],
      motherTongue: "",
      english: "",
      german: [
        {
          level: "",
          from: "",
          to: "",
          certificate: "",
          listeningMarksheet: "",
          speakingMarksheet: "",
          readingMarksheet: "",
          writingMarksheet: ""
        }
      ]
    }
  );

  const validateEducation = () => {
    const emptyFields = [];

    // Validation for postGraduation
    // const firstPostGraduationEntry = education.postGraduation[0];
    // if (!Object.values(firstPostGraduationEntry).every((value) => value !== "")) {
    //   emptyFields.push("Post Graduation ");
    // }

    // Validation for underGraduation
    // const firstUnderGraduationEntry = education.underGraduation[0];
    // if (!Object.values(firstUnderGraduationEntry).every((value) => value !== "")) {
    //   emptyFields.push("Under Graduation");
    // }

    // Validation for twelthStandard
    if (education.twelthStandard.length === 1 && !Object.values(education.twelthStandard[0]).every((value) => value !== "")) {
      emptyFields.push("Twelfth Standard");
    }

    // Validation for eleventhStandard
    if (education.eleventhStandard.length === 1 && !Object.values(education.eleventhStandard[0]).every((value) => value !== "")) {
      emptyFields.push("Eleventh Standard");
    }

    // Validation for tenthStandard
    if (education.tenthStandard.length === 1 && !Object.values(education.tenthStandard[0]).every((value) => value !== "")) {
      emptyFields.push("Tenth Standard");
    }

    // Validation for firstToNinthStandard
    if (education.firstToNinthStandard.length === 1 && !Object.values(education.firstToNinthStandard[0]).every((value) => value !== "")) {
      emptyFields.push("First to Ninth Standard");
    }

    // Validation for blankYear
    // if (education.blankYear.length === 1 && !Object.values(education.blankYear[0]).every((value) => value !== "")) {
    //   emptyFields.push("Blank Year");
    // }

    // Validation for motherTongue, english, and german
    if (education.motherTongue === "") {
      emptyFields.push("Mother Tongue");
    }
    if (education.english === "") {
      emptyFields.push("English");
    }
    //   const isGermanValid =
    //   education.german.length === 1 &&
    //   Object.values(education.german[0]).every(
    //     (value, key) => key === "level" || key === "from" || key === "to" ? value !== "" : true
    //   );

    // if (!isGermanValid) {
    //   emptyFields.push("German - Level, From, or To");
    // }

    if (emptyFields.length > 0) {
      //alert(`The following fields are empty:\n${emptyFields.join("\n")}`);
      return false;
    }

    return true;
  };
  const [errors, setErrors] = useState({
    postGraduationName: false,

  });











  useEffect(() => {
    console.log(education)
  }, [education])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const paragraphStyle = {
    color: "red",
  };

  useEffect(() => {
    const education = JSON.parse(localStorage.getItem("education"));
    if (education) {
      setEducation(education)
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


  const headName = userData?.language === 'English' ? 'EDUCATIONAL QUALIFICATION' : userData?.language === 'German' ? 'SCHULISCHE QUALIFIKATION' : ''
  const from = userData?.language === 'English' ? 'From' : userData?.language === 'German' ? 'Von' : ''
  const To = userData?.language === 'English' ? 'To' : userData?.language === 'German' ? 'Bis' : ''
  const University = userData?.language === 'English' ? 'School / University' : userData?.language === 'German' ? 'Schule/Universität' : ''
  const MotherTounge = userData?.language === 'English' ? 'Mother Tongue' : userData?.language === 'German' ? 'Muttersprache' : ''
  const English = userData?.language === 'English' ? 'English' : userData?.language === 'German' ? 'Englisch ' : ''
  const Lang = userData?.language === 'English' ? 'Language Proficiency' : userData?.language === 'German' ? ' Sprachkenntnisse ' : ''
  const German = userData?.language === 'English' ? 'German' : userData?.language === 'German' ? 'Deutschh' : '';
  const info = userData?.language === 'English' ? 'Attention!! German Authorities and Employers need a gapless (!) CV. Enter your educational qualification, years of completion of that education qualification with at most care and Very Correctly. You also need to specify all the educational qualification you have achieved till date (today!). Provide correct information. If you have taken a break in between your education, mention that also with the help of blank field. Declaration of information regarding your educational background is mandatory. Transparency is key to success. Remember: - A simple mistake can cause your VISA & Recognition process rejection.' : userData?.language === 'German' ? 'Achtung! Die deutche Behörde benötigen einen Lükenlosen Lebenslauf. Geben Sie Ihren Bildungsabschluss und die Jahre des Abschlusses dieses Bildungsabschlusses mit größter Sorgfalt und sehr korrekt ein. Sie brauchen alle Bildungsabschluss erwähnen, die Sie bis jetzt erreicht haben. Bitte geben Sie die richtige Information ab. Wenn Sie zwischen Ihrer Ausbildung eine Pause gemacht haben, geben Sie dies ebenfalls mit Hilfe eines leeren Feldes an. Die Angabe von Informationen zu Ihrem Bildungshintergrund ist obligatorisch. Die Transparenz ist der Schlüssel zum Erfolg. Erinnern – Ein einfacher Fehler kann zur Ablehnung von Ihrer Visum und Anerkennungprozess führen' : '';
  const Good = userData?.language === 'English' ? 'Good' : userData?.language === 'German' ? 'Von' : ''
  const Average = userData?.language === 'English' ? 'Average' : userData?.language === 'German' ? 'Von' : ''
  const Poor = userData?.language === 'English' ? 'Poor' : userData?.language === 'German' ? 'Von' : ''
  const Place = userData?.language === 'English' ? 'Place,state' : userData?.language === 'German' ? 'Ort, Land' : ''
  const cer = userData?.language === 'English' ? 'Certifictae Date' : userData?.language === 'German' ? 'Certifikate level' : ''

  useState(() => {
    if (localStorage.getItem("education")) {
      setEducation(JSON.parse(localStorage.getItem("education")));
    }
  })

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
              <Heading mb={4} fontSize="2xl">{headName}</Heading>
            </Center><br />
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                  <FormControl>
                    <FormLabel style={{ fontWeight: 'bold' }} >Post Graduation/Masters</FormLabel>
                  </FormControl>
                  <FormControl >

                    <Select
                      placeholder="Select an option"
                      name="postGraduation"
                      value={education.postGraduation[0]?.name}
                      onChange={e => {
                        const updatedEducation = { ...education };
                        updatedEducation.postGraduation[0].name = e.target.value;
                        setEducation(updatedEducation);


                      }}
                    >
                      <option value="Post B.Sc.">Post B.Sc.</option>
                      <option value="Post Graduation">Post Graduation</option>
                      <option value="Master Program">Master Program</option>
                      <option value="Any other course">Any other course</option>
                    </Select>
                  </FormControl>

                </SimpleGrid
                ><br />
                <Divider
                  orientation="horizontal"
                  borderColor="#2F4F4F"
                  borderWidth="2px"
                />
                <br />
                <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                  <FormControl>
                    <FormLabel>Year / Semester</FormLabel>
                  </FormControl>
                  <FormControl  >
                    <Select
                      placeholder="Select an option"
                      name="PGyearSem"
                      value={education.postGraduation[0]?.yearSem}
                      onChange={e => {
                        const updatedEducation = { ...education };
                        updatedEducation.postGraduation[0].yearSem = e.target.value;
                        setEducation(updatedEducation);
                      }}

                    >
                      <option value="Year 3/Semester 3">Year 3/Semester 3</option>
                      <option value="Year 2/Semester 2">Year 2/Semester 2</option>
                      <option value="Year 1/Semester 1">Year 1/Semester 1</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>{from}</FormLabel>
                  </FormControl>
                  <FormControl  >
                    <Input
                      type="date"
                      name="PGfrom"
                      value={education.postGraduation[0]?.from}
                      onChange={e => {

                        const updatedEducation = { ...education };
                        updatedEducation.postGraduation[0].from = e.target.value;
                        setEducation(updatedEducation);
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>{To} </FormLabel>
                  </FormControl>
                  <FormControl>
                    <Input
                      type="date"
                      name="PGto"
                      value={education.postGraduation[0]?.to}
                      onChange={e => {
                        const updatedEducation = { ...education };
                        updatedEducation.postGraduation[0].to = e.target.value;
                        setEducation(updatedEducation);
                      }}
                    />
                  </FormControl>
                </SimpleGrid>
                <br /><SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                  <FormControl>
                    <FormLabel>Upload Marksheets(pdf)</FormLabel>
                  </FormControl>

                  <FormControl  >
                    <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
                      <Input
                        type="file"
                        accept=".pdf"
                        colorScheme="#00b0ff"
                        id={`marksheet-postGraduation-${0}`}
                        key={inputKey}
                        w="6.2rem"
                        padding={0}
                        marginRight={8}
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          setFileName(file.name);
                          const sid = localStorage.getItem("SIDofStudentToEdit") ? localStorage.getItem("SIDofStudentToEdit") : localStorage.getItem("sid")
                          const formData = new FormData();
                          formData.append("file", e.target.files[0]);
                          formData.append("sid", sid);
                          formData.append("firstName", JSON.parse(localStorage.getItem("personal")).firstName);
                          formData.append("lastName", JSON.parse(localStorage.getItem("personal")).lastName);
                          formData.append("name", "post_graduation_marksheet");
                          try {
                            const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                            const url = res.data.file_url;
                            const updatedEducation = { ...education };
                            updatedEducation.postGraduation[0].marksheet = url;
                            setEducation(updatedEducation);

                          } catch (e) {
                            alert("Error in uploading file");
                          }

                        }}

                      />

                      <Button
                        color="#00b0ff"

                        marginRight={"4%"}
                        onClick={() => handleViewClick('marksheet', 0, "postGraduation")}
                      >
                        View
                      </Button>
                      <Button color="red" onClick={() => handleDeleteClickPostGraduation('marksheet')} >
                        Delete
                      </Button>
                    </div>
                    <p>{fileName}</p>
                  </FormControl>

                </SimpleGrid><br />




                <br />


              </FormControl>

            </VStack>

            {/* {/<span style={{color:"red"}}>*</span> mapping postgraduation <span style={{color:"red"}}>*</span>/} */}

            {education.postGraduation.length > 1 ? education.postGraduation.map((element, i) => {
              if (i > 0) {

                return (
                  <FormControl key={i}>

                    <Divider
                      orientation="horizontal"
                      borderColor="#2F4F4F"
                      borderWidth="2px"
                    />
                    <br />
                    <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                      <FormControl>
                        <FormLabel>Year / Semester</FormLabel>
                      </FormControl>
                      <FormControl>
                        <Select
                          placeholder="Select an option"
                          name="PGyearSem"
                          value={education.postGraduation[i]?.yearSem}
                          onChange={e => {
                            const updatedEducation = { ...education };
                            updatedEducation.postGraduation[i].yearSem = e.target.value;
                            setEducation(updatedEducation);
                          }}

                        >
                          <option value="Year 3/Semester 3">Year 3/Semester 3</option>
                          <option value="Year 2/Semester 2">Year 2/Semester 2</option>
                          <option value="Year 1/Semester 1">Year 1/Semester 1</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>{from}</FormLabel>
                      </FormControl>
                      <FormControl>
                        <Input
                          type="date"
                          name="PGfrom"
                          value={education.postGraduation[i].from}
                          onChange={e => {
                            const updatedEducation = { ...education };
                            updatedEducation.postGraduation[i].from = e.target.value;
                            setEducation(updatedEducation);
                          }}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>{To} </FormLabel>
                      </FormControl>
                      <FormControl>
                        <Input
                          type="date"
                          name="PGto"
                          value={education.postGraduation[i].to}

                          onChange={e => {

                            const updatedEducation = { ...education };
                            updatedEducation.postGraduation[i].to = e.target.value;
                            setEducation(updatedEducation);
                          }}
                        />
                      </FormControl>
                    </SimpleGrid>
                    <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                      <FormControl>
                        <FormLabel marginTop={3}>Upload Marksheets(pdf)</FormLabel>
                      </FormControl>

                      <FormControl marginTop={6}>
                        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>

                          <Input
                            type="file" accept=".pdf"
                            colorScheme="#00b0ff"
                            w="6.2rem"
                            padding={0}
                            id={`marksheet-${'postGraduation'}-${i}`}
                            key={inputKeys[i] || i}
                            marginRight={8}
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              setFileNames(names => {
                                const newNames = [...names];
                                newNames[i] = file.name;
                                return newNames;
                              });
                              const formData = new FormData();
                              formData.append("file", e.target.files[0]);
                              formData.append("sid", localStorage.getItem("sid"));
                              formData.append("firstName", JSON.parse(localStorage.getItem("personal")).firstName);
                              formData.append("lastName", JSON.parse(localStorage.getItem("personal")).lastName);
                              formData.append("name", `post_graduation_marksheet${i + 1}`);
                              try {
                                const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                                const url = res.data.file_url;
                                const updatedEducation = { ...education };
                                updatedEducation.postGraduation[i].marksheet = url;
                                setEducation(updatedEducation);

                              } catch (e) {
                                alert("Error in uploading file");
                              }

                            }}

                          />

                          <Button
                            color="#00b0ff"

                            marginRight={"4%"}
                            onClick={() => handleViewClick('marksheet', i, "postGraduation")}
                          >
                            View
                          </Button>
                          <Button color="red" onClick={() => handleDeleteClick('marksheet', i, 'postGraduation')}>
                            Delete
                          </Button>
                        </div>
                        <p>{fileNames[i]}</p>
                      </FormControl>

                    </SimpleGrid><br />





                  </FormControl>
                )
              }
            }) : (null)}


            <Divider
              orientation="horizontal"
              borderColor="#2F4F4F"
              borderWidth="2px"
            />


            <br />
            <FormControl >
              <FormLabel>
                Name of  {University}
              </FormLabel>
              <Input
                type="text"
                placeholder=" university/ Schule -Universität"
                name="PGuniversity"
                value={education.postGraduation[0]?.university}
                onChange={e => {
                  const updatedEducation = { ...education };
                  updatedEducation.postGraduation[0].university = e.target.value;
                  setEducation(updatedEducation);
                }}
              />
            </FormControl>   <br />
            <FormControl >
              <FormLabel>
                {Place}
              </FormLabel>
              <Input
                type="text"
                placeholder="place/state "
                name="PGplace"
                value={education.postGraduation[0]?.place}
                onChange={e => {
                  const updatedEducation = { ...education };
                  updatedEducation.postGraduation[0].place = e.target.value;
                  setEducation(updatedEducation);
                }}
              />
            </FormControl>   <br />
            <Divider
              orientation="horizontal"
              borderColor="#2F4F4F"
              borderWidth="2px"
            /><br />

            <div className="flex">
              <Button
                marginRight={2}
                color="#00b0ff"
                onClick={e => {
                  const updatedEducation = { ...education };
                  updatedEducation.postGraduation.push({
                    name: "",
                    yearSem: "",
                    from: "",
                    to: "",
                    marksheet: "",
                    university: "",
                  });
                  setEducation(updatedEducation);
                }}
              >
                Add
              </Button>
              <Button
                color="red"
                onClick={e => {
                  if (education.postGraduation.length > 1) {
                    const updatedEducation = { ...education };
                    updatedEducation.postGraduation.pop();
                    setEducation(updatedEducation);

                  }
                }}
              >
                Delete
              </Button>
            </div>
            <br /><br />
            {/* {/<span style={{color:"red"}}>*</span> end of post graduation mapping <span style={{color:"red"}}>*</span>/} */}
            <br /> <br />
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                  <FormControl>
                    <FormLabel style={{ fontWeight: 'bold' }}> Under Graduate Degree/Diploma </FormLabel>
                  </FormControl>
                  <FormControl >
                    <Select
                      placeholder="Select an option"
                      name="underGraduation"
                      value={education.underGraduation[0]?.name}
                      onChange={e => {
                        const updatedEducation = { ...education };
                        updatedEducation.underGraduation[0].name = e.target.value;
                        setEducation(updatedEducation);
                      }}

                    >
                      <option value="	Under Graduate Degree">
                        {" "}
                        Under Graduate Degree
                      </option>
                      <option value="Diploma">Diploma</option>
                    </Select>
                  </FormControl>
                </SimpleGrid> <br />
                <Divider
                  orientation="horizontal"
                  borderColor="#2F4F4F"
                  borderWidth="2px"
                />
                <br />

                <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                  <FormControl>
                    <FormLabel>Year / Semester:</FormLabel>
                  </FormControl>
                  <FormControl >
                    <Select
                      placeholder="Select an option"
                      name="UGyearSem"
                      value={education.underGraduation[0]?.yearSem}
                      onChange={e => {
                        const updatedEducation = { ...education };
                        updatedEducation.underGraduation[0].yearSem = e.target.value;
                        setEducation(updatedEducation);
                      }}

                    >

                      <option value="Year 3/Semester 3">Year 3/Semester 3</option>
                      <option value="Year 2/Semester 2">Year 2/Semester 2</option>
                      <option value="Year 1/Semester 1">Year 1/Semester 1</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>{from}</FormLabel>
                  </FormControl>
                  <FormControl >
                    <Input
                      type="date"
                      name="UGfrom"
                      value={education.underGraduation[0].from}
                      onChange={e => {

                        const updatedEducation = { ...education };
                        updatedEducation.underGraduation[0].from = e.target.value;
                        setEducation(updatedEducation);
                      }}

                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>{To} </FormLabel>
                  </FormControl>
                  <FormControl >
                    <Input
                      type="date"
                      name="UGto"
                      value={education.underGraduation[0].to}

                      onChange={e => {

                        const updatedEducation = { ...education }
                        updatedEducation.underGraduation[0].to = e.target.value;
                        setEducation(updatedEducation);
                      }}

                    />
                  </FormControl>
                </SimpleGrid><br />
                <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                  <FormControl>
                    <FormLabel>Upload Marksheet(pdf)</FormLabel>
                  </FormControl>

                  <FormControl  >
                    <div style={{ display: 'flex', flexWrap: 'nowrap' }}>

                      <Input
                        type="file" accept=".pdf"

                        marginRight={8}

                        w="6.2rem"
                        id={`fileInput-${'underGraduation'}-${0}`}
                        padding={0}
                        key={inputKey1}
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          setFileName1(file.name);
                          const formData = new FormData();
                          formData.append("file", e.target.files[0]);
                          formData.append("sid", localStorage.getItem("sid"));
                          formData.append("firstName", JSON.parse(localStorage.getItem("personal")).firstName);
                          formData.append("lastName", JSON.parse(localStorage.getItem("personal")).lastName);
                          formData.append("name", "under_graduation_marksheet");
                          try {
                            const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                            const url = res.data.file_url;
                            const updatedEducation = { ...education };
                            updatedEducation.underGraduation[0].marksheet = url;
                            setEducation(updatedEducation);

                          }
                          catch (e) {
                            alert("Error in uploading file");
                          }
                        }}
                      />


                      <Button
                        color="#00b0ff"

                        marginRight={"4%"}

                        onClick={() => handleViewClick('marksheet', 0, "underGraduation")}
                      >
                        View
                      </Button>
                      <Button color="red" onClick={() => handleDeleteClickUnderGraduation('marksheet')}>
                        Delete
                      </Button>
                    </div>
                    <p>{fileName1}</p>


                  </FormControl>
                </SimpleGrid>
                <br />


              </FormControl>
            </VStack>
            <br />
            {/* {/<span style={{color:"red"}}>*</span> mapping under graduation start<span style={{color:"red"}}>*</span>/} */}

            {education.underGraduation.length > 1 ? education.underGraduation.map((element, i) => {
              if (i > 0) {
                return (
                  <VStack key={i} spacing={4} align="flex-start">
                    <FormControl>

                      <Divider
                        orientation="horizontal"
                        borderColor="#2F4F4F"
                        borderWidth="2px"
                      />
                      <br />

                      <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                        <FormControl>
                          <FormLabel>Year / Semester</FormLabel>
                        </FormControl>
                        <FormControl>
                          <Select
                            placeholder="Select an option"
                            name="UGyearSem"
                            value={education.underGraduation[i]?.yearSem}
                            onChange={e => {
                              const updatedEducation = { ...education };
                              updatedEducation.underGraduation[i].yearSem = e.target.value;
                              setEducation(updatedEducation);
                            }}

                          >
                            <option value="Year 3/Semester 3">Year 3/Semester 3</option>
                            <option value="Year 2/Semester 2">Year 2/Semester 2</option>
                            <option value="Year 1/Semester 1">Year 1/Semester 1</option>
                          </Select>
                        </FormControl>

                        <FormControl>
                          <FormLabel>{from}</FormLabel>
                        </FormControl>
                        <FormControl>
                          <Input
                            type="date"
                            name="UGfrom"
                            value={education.underGraduation[i].from}

                            onChange={e => {
                              const updatedEducation = { ...education };
                              updatedEducation.underGraduation[i].from = e.target.value;;
                              setEducation(updatedEducation);
                            }}

                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>{To}</FormLabel>
                        </FormControl>
                        <FormControl>
                          <Input
                            type="date"
                            name="UGto"
                            value={education.underGraduation[i].to}

                            onChange={e => {
                              const updatedEducation = { ...education }
                              updatedEducation.underGraduation[i].to = e.target.value;
                              setEducation(updatedEducation);
                            }}

                          />
                        </FormControl>
                      </SimpleGrid><br />
                      <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                        <FormControl>
                          <FormLabel>Upload Marksheet(pdf)</FormLabel>
                        </FormControl>

                        <FormControl>
                          <div style={{ display: 'flex', flexWrap: 'nowrap' }}>

                            <Input
                              type="file" accept=".pdf"
                              marginRight={8}
                              variant="whatsapp"
                              w="6.2rem"
                              padding={0}
                              id={`fileInput-${'underGraduation'}-${i}`}
                              key={inputKeys1[i] || i}
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                setFileNames1(names => {
                                  const newNames = [...names];
                                  newNames[i] = file.name;
                                  return newNames;
                                });
                                const formData = new FormData();
                                formData.append("file", e.target.files[0]);
                                formData.append("sid", localStorage.getItem("sid"));
                                formData.append("firstName", JSON.parse(localStorage.getItem("personal")).firstName);
                                formData.append("lastName", JSON.parse(localStorage.getItem("personal")).lastName);
                                formData.append("name", `under_graduation_marksheet${i + 1}`);
                                try {
                                  const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                                  const url = res.data.file_url;
                                  const updatedEducation = { ...education };
                                  updatedEducation.underGraduation[i].marksheet = url;
                                  setEducation(updatedEducation);

                                }
                                catch (e) {
                                  alert("Error in uploading file");
                                }
                              }}
                            />


                            <Button
                              color="#00b0ff"

                              marginRight={"4%"}
                              onClick={() => handleViewClick('marksheet', i, "underGraduation")}
                            >
                              View
                            </Button>
                            <Button color="red" onClick={() => handleDeleteClick('marksheet', i, 'underGraduation')}>
                              Delete
                            </Button>
                          </div>
                          <p>{fileNames1[i]}</p>
                          <br />

                        </FormControl>
                      </SimpleGrid>
                      <br />



                    </FormControl>
                  </VStack>
                )
              }
            }) : (null)}
            <Divider
              orientation="horizontal"
              borderColor="#2F4F4F"
              borderWidth="2px"
            />

            <br />
            <FormControl >
              <FormLabel>
                Name of {University}
              </FormLabel>
            </FormControl>
            <FormControl >
              <Input
                type="text"
                placeholder=" university/ Schule -Universität"
                name="UGuniversity"
                value={education.underGraduation[0]?.university}
                onChange={e => {
                  const updatedEducation = { ...education };
                  updatedEducation.underGraduation[0].university = e.target.value;
                  setEducation(updatedEducation);
                }}

              />
            </FormControl><br />
            <FormControl >
              <FormLabel>
                {Place}
              </FormLabel>
            </FormControl>
            <FormControl >
              <Input
                type="text"
                placeholder="Place,state"
                name="UGplace"
                value={education.underGraduation[0]?.place}
                onChange={e => {
                  const updatedEducation = { ...education };
                  updatedEducation.underGraduation[0].place = e.target.value;
                  setEducation(updatedEducation);
                }}

              />
            </FormControl><br />
            <Divider
              orientation="horizontal"
              borderColor="#2F4F4F"
              borderWidth="2px"
            /> <br />
            {/* {/<span style={{color:"red"}}>*</span> mapping under graduation end <span style={{color:"red"}}>*</span>/} */}
            <div className="flex">
              <Button
                marginRight={2}
                color="#00b0ff"
                onClick={e => {
                  const updatedEducation = { ...education };
                  updatedEducation.underGraduation.push({
                    name: "",
                    yearSem: "",
                    from: "",
                    to: "",
                    marksheet: "",
                    university: "",
                  });
                  setEducation(updatedEducation);
                }}
              >
                Add
              </Button>
              <Button
                color="red"
                onClick={e => {
                  if (education.underGraduation.length > 1) {
                    const updatedEducation = { ...education };
                    updatedEducation.underGraduation.pop();
                    setEducation(updatedEducation);

                  }
                }}

              >
                Delete
              </Button>
            </div>
            <br />
            <br />
            <br />
            <br />
            <FormControl>
              <FormLabel style={{ fontWeight: 'bold', }}>12th & 11th Standard<span style={{ color: "red" }}>*</span></FormLabel>
            </FormControl>
            <Divider
              orientation="horizontal"
              borderColor="#2F4F4F"
              borderWidth="2px"
            /> <br />
            {/* <FormLabel style={{ fontWeight: 'bold', }}>12th Standard<span style={{ color: "red" }}>*</span></FormLabel> */}

            <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">

              <FormControl>
                <FormLabel>{from}<span style={{ color: "red" }}>*</span></FormLabel>
              </FormControl>
              <FormControl isInvalid={isSubmitted && education.twelthStandard[0]['from'].trim() === ""}>
                <Input
                  type="date"
                  value={education.twelthStandard[0].from}
                  onChange={e => {
                    const updatedEducation = { ...education };
                    updatedEducation.twelthStandard[0].from = e.target.value;
                    setEducation(updatedEducation);
                  }}


                /> <FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>{To} <span style={{ color: "red" }}>*</span></FormLabel>
              </FormControl>
              <FormControl isInvalid={isSubmitted && education.twelthStandard[0]['to'].trim() === ""}>
                <Input
                  type="date"
                  value={education.twelthStandard[0].to}
                  onChange={e => {
                    const updatedEducation = { ...education };
                    updatedEducation.twelthStandard[0].to = e.target.value;
                    setEducation(updatedEducation);
                  }}

                /> <FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl>
            </SimpleGrid><br />
            <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
              <FormControl>
                <FormLabel>Upload Marksheets(pdf)<span style={{ color: "red" }}>*</span></FormLabel>
                <p><span style={{ color: "red" }}>Upload only 12th marksheet</span></p>
              </FormControl>

              <FormControl isInvalid={isSubmitted && education.twelthStandard[0]['marksheet'].trim() === ""}>
                <div style={{ display: 'flex', flexWrap: 'nowrap' }}>

                  <Input
                    type="file" accept=".pdf"

                    marginRight={8}

                    w="6.2rem"
                    padding={0}
                    key={inputKey12}
                    id={`fileInput-${'twelthStandard'}-${0}`}
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      setFileNames12(file.name);
                      const formData = new FormData();
                      formData.append("file", e.target.files[0]);
                      formData.append("sid", localStorage.getItem("sid"));
                      formData.append("firstName", JSON.parse(localStorage.getItem("personal")).firstName);
                      formData.append("lastName", JSON.parse(localStorage.getItem("personal")).lastName);
                      formData.append("name", "12th_marksheet");
                      try {
                        const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                        const url = res.data.file_url;
                        const updatedEducation = { ...education };
                        updatedEducation.twelthStandard[0].marksheet = url;
                        setEducation(updatedEducation);
                      } catch (e) {
                        alert("Error in uploading file");
                      }
                    }}
                  />


                  <Button
                    color="#00b0ff"

                    marginRight={"4%"}
                    onClick={() => handleViewClick('marksheet', 0, "twelthStandard")}
                  >
                    View
                  </Button>
                  <Button color="red" onClick={() => handleDeleteClick('marksheet', 0, 'twelthStandard')}>
                    Delete
                  </Button>
                </div>
                <p>{fileNames12}</p>
                <FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <FormControl>

              <FormLabel>
                Name of {University}
                <span style={{ color: "red" }}>*</span></FormLabel>
            </FormControl>
            <FormControl isInvalid={isSubmitted && education.twelthStandard[0]['university'].trim() === ""}>
              <Input
                type="text"
                placeholder=" university/ Schule -Universität"
                name="12thUniversity"
                value={education.twelthStandard[0]?.university}
                onChange={e => {
                  const updatedEducation = { ...education };
                  updatedEducation.twelthStandard[0].university = e.target.value;
                  setEducation(updatedEducation);
                }}

              /> <FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
            </FormControl><br />
            <FormControl>

              <FormLabel>{Place}
                <span style={{ color: "red" }}>*</span></FormLabel>
            </FormControl>
            <FormControl isInvalid={isSubmitted && education.twelthStandard[0]['university'].trim() === ""}>
              <Input
                type="text"
                placeholder="Place,state "
                name="12thPlace"
                value={education.twelthStandard[0]?.place}
                onChange={e => {
                  const updatedEducation = { ...education };
                  updatedEducation.twelthStandard[0].place = e.target.value;
                  setEducation(updatedEducation);
                }}

              /> <FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
            </FormControl><br />



            {/* <FormControl>
              <FormLabel style={{ fontWeight: 'bold' }}>11th Standard<span style={{ color: "red" }}>*</span></FormLabel>
            </FormControl>
            */}

            <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
              {/* <FormControl>
                <FormLabel>{from}<span style={{ color: "red" }}>*</span></FormLabel>
              </FormControl> */}
              {/* <FormControl isInvalid={isSubmitted && education.eleventhStandard[0]['from'].trim() === ""}>
                <Input
                  type="date"
                  value={education.eleventhStandard[0].from}
                  onChange={e => {

                    const updatedEducation = { ...education };
                    updatedEducation.eleventhStandard[0].from = e.target.value;
                    setEducation(updatedEducation);
                  }}


                /> <FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl> */}

              {/* <FormControl>
                <FormLabel>{To} <span style={{ color: "red" }}>*</span></FormLabel>
              </FormControl>
              <FormControl isInvalid={isSubmitted && education.eleventhStandard[0]['to'].trim() === ""}>
                <Input
                  type="date"
                  value={education.eleventhStandard[0].to}

                  onChange={e => {

                    const updatedEducation = { ...education };
                    updatedEducation.eleventhStandard[0].to = e.target.value;
                    setEducation(updatedEducation);
                  }}
                /> <FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl> */}
            </SimpleGrid><br />
            {/* <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
              <FormControl>
                <FormLabel>Upload Marksheets(pdf)<span style={{ color: "red" }}>*</span></FormLabel>
              </FormControl>

              <FormControl isInvalid={isSubmitted && education.eleventhStandard[0]['marksheet'].trim() === ""} >
                <div style={{ display: 'flex', flexWrap: 'nowrap' }}>

                  <Input
                    type="file" accept=".pdf"

                    marginRight={8}

                    w="6.2rem"
                    padding={0}
                    key={inputKey11}
                    id={`fileInput-${'eleventhStandard'}-${0}`}

                    onChange={async (e) => {
                      const file = e.target.files[0];
                      setFileNames11(file.name);
                      const formData = new FormData();
                      formData.append("file", e.target.files[0]);
                      formData.append("sid", localStorage.getItem("sid"));
                      try {
                        const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                        const url = res.data.file_url;
                        const updatedEducation = { ...education };
                        updatedEducation.eleventhStandard[0].marksheet = url;
                        setEducation(updatedEducation);
                      } catch (e) {
                        alert("Error in uploading file");
                      }
                    }}

                  />


                  <Button
                    color="#00b0ff"

                    marginRight={"4%"}
                    onClick={() => handleViewClick('marksheet', 0, "eleventhStandard")}
                  >
                    View
                  </Button>
                  <Button color="red" onClick={() => handleDeleteClick('marksheet', 0, 'eleventhStandard')} >
                    Delete
                  </Button>
                </div>
                <p>{fileNames11}</p>
                <FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl>
            </SimpleGrid> */}
            {/* <FormControl>
              <br />
              <FormLabel>
                Name of school {University}{" "}
                <span style={{ color: "red" }}>*</span></FormLabel>
            </FormControl>
            <FormControl isInvalid={isSubmitted && education.eleventhStandard[0]['university'].trim() === ""}>
              <Input
                type="text"
                placeholder=" university/ Schule -Universität"
                value={education.eleventhStandard[0]?.university}
                onChange={e => {
                  const updatedEducation = { ...education };
                  updatedEducation.eleventhStandard[0].university = e.target.value;
                  setEducation(updatedEducation);
                }}
              /> <FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
            </FormControl> <br /> */}
            <Divider
              orientation="horizontal"
              borderColor="#2F4F4F"
              borderWidth="2px"
            />
            <br /> <br /> <br /> <br />
            <FormControl >
              <FormLabel style={{ fontWeight: 'bold' }}>5th to 10th Standard<span style={{ color: "red" }}>*</span></FormLabel>
            </FormControl>
            <Divider
              orientation="horizontal"
              borderColor="#2F4F4F"
              borderWidth="2px"
            />
            <br />
            <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">

              <FormControl>
                <FormLabel>{from}<span style={{ color: "red" }}>*</span></FormLabel>
              </FormControl>
              <FormControl isInvalid={isSubmitted && education.tenthStandard[0]['from'].trim() === ""}>
                <Input
                  type="date"
                  value={education.tenthStandard[0].from}
                  onChange={e => {

                    const updatedEducation = { ...education };
                    updatedEducation.tenthStandard[0].from = e.target.value;
                    setEducation(updatedEducation);
                  }}

                /><FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>{To} <span style={{ color: "red" }}>*</span></FormLabel>
              </FormControl>
              <FormControl isInvalid={isSubmitted && education.tenthStandard[0]['to'].trim() === ""}>
                <Input
                  type="date"
                  value={education.tenthStandard[0].to}

                  onChange={e => {

                    const updatedEducation = { ...education };
                    updatedEducation.tenthStandard[0].to = e.target.value;
                    setEducation(updatedEducation);
                  }}

                /><FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl>
            </SimpleGrid><br />
            <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
              <FormControl>
                <FormLabel>Upload Marksheets(pdf)<span style={{ color: "red" }}>*</span></FormLabel>
                <p><span style={{ color: "red" }}>Upload only 10th marksheet</span></p>
              </FormControl>

              <FormControl isInvalid={isSubmitted && education.tenthStandard[0]['marksheet'].trim() === ""}>
                <div style={{ display: 'flex', flexWrap: 'nowrap' }}>

                  <Input
                    type="file" accept=".pdf"
                    marginRight={8}

                    w="6.2rem"
                    padding={0}
                    key={inputKey10}
                    id={`fileInput-${'tenthStandard'}-${0}`}
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      setFileNames10(file.name);
                      const formData = new FormData();
                      formData.append("file", e.target.files[0]);
                      formData.append("sid", localStorage.getItem("sid"));
                      formData.append("firstName", JSON.parse(localStorage.getItem("personal")).firstName);
                      formData.append("lastName", JSON.parse(localStorage.getItem("personal")).lastName);
                      formData.append("name", "10th_marksheet");
                      try {
                        const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                        const url = res.data.file_url;
                        const updatedEducation = { ...education };
                        updatedEducation.tenthStandard[0].marksheet = url;
                        setEducation(updatedEducation);
                      } catch (e) {
                        alert("Error in uploading file");
                      }
                    }}
                  />


                  <Button
                    color="#00b0ff"

                    marginRight={"4%"}
                    onClick={() => handleViewClick('marksheet', 0, "tenthStandard")}
                  >
                    View
                  </Button>
                  <Button color="red" onClick={() => handleDeleteClick('marksheet', 0, 'tenthStandard')}>
                    Delete
                  </Button>
                </div>
                <p>{fileNames10}</p>
                <FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <FormControl isInvalid={isSubmitted && education.tenthStandard[0]['university'].trim() === ""}>
              <br />
              <FormLabel  >
                Name of {University}
                <span style={{ color: "red" }}>*</span></FormLabel>

              <Input
                type="text"
                placeholder=" university/ Schule -Universität"
                value={education.tenthStandard[0]?.university}
                onChange={e => {
                  const updatedEducation = { ...education };
                  updatedEducation.tenthStandard[0].university = e.target.value;
                  setEducation(updatedEducation);
                }}

              /><FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
            </FormControl>
            <br />
            <FormControl >
              <br />
              <FormLabel  >
                {Place}
                <span style={{ color: "red" }}>*</span></FormLabel>

              <Input
                type="text"
                placeholder="Place,state"
                value={education.tenthStandard[0]?.place}
                onChange={e => {
                  const updatedEducation = { ...education };
                  updatedEducation.tenthStandard[0].place = e.target.value;
                  setEducation(updatedEducation);
                }}

              /><FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
            </FormControl>
            <br />
            <Divider
              orientation="horizontal"
              borderColor="#2F4F4F"
              borderWidth="2px"
            />
            <br /> <br /> <br /> <br />
            <FormControl>
              <FormLabel style={{ fontWeight: 'bold' }}>1st to 4th Standard<span style={{ color: "red" }}>*</span></FormLabel>
            </FormControl>
            <Divider
              orientation="horizontal"
              borderColor="#2F4F4F"
              borderWidth="2px"
            />
            <br />
            <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">

              <FormControl>
                <FormLabel>{from}<span style={{ color: "red" }}>*</span></FormLabel>
              </FormControl>
              <FormControl isInvalid={isSubmitted && education.firstToNinthStandard[0]['from'].trim() === ""}>
                <Input
                  type="date"
                  value={education.firstToNinthStandard[0].from}
                  onChange={e => {

                    const updatedEducation = { ...education };
                    updatedEducation.firstToNinthStandard[0].from = e.target.value;
                    setEducation(updatedEducation);
                  }}

                /><FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>{To} <span style={{ color: "red" }}>*</span></FormLabel>
              </FormControl>
              <FormControl isInvalid={isSubmitted && education.firstToNinthStandard[0]['to'].trim() === ""}>
                <Input
                  type="date"
                  value={education.firstToNinthStandard[0].to}

                  onChange={e => {

                    const updatedEducation = { ...education };
                    updatedEducation.firstToNinthStandard[0].to = e.target.value;
                    setEducation(updatedEducation);
                  }}

                /><FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl>


            </SimpleGrid>
            <FormControl isInvalid={isSubmitted && education.firstToNinthStandard[0]['university'].trim() === ""}>
              <br />
              <FormLabel>
                Name of {University}{" "}
                <span style={{ color: "red" }}>*</span></FormLabel>

              <Input
                type="text"
                placeholder=" university/ Schule -Universität"
                value={education.firstToNinthStandard[0]?.university}
                onChange={e => {
                  const updatedEducation = { ...education };
                  updatedEducation.firstToNinthStandard[0].university = e.target.value;
                  setEducation(updatedEducation);
                }}

              /><FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
            </FormControl>

            <br />
            <FormControl isInvalid={isSubmitted && education.firstToNinthStandard[0]['university'].trim() === ""}>
              <br />
              <FormLabel>
                {Place}
                <span style={{ color: "red" }}>*</span></FormLabel>

              <Input
                type="text"
                placeholder="Place,state"
                value={education.firstToNinthStandard[0]?.place}
                onChange={e => {
                  const updatedEducation = { ...education };
                  updatedEducation.firstToNinthStandard[0].place = e.target.value;
                  setEducation(updatedEducation);
                }}

              /><FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
            </FormControl>

            <br />

            <Divider
              orientation="horizontal"
              borderColor="#2F4F4F"
              borderWidth="2px"
            />
            <br /> <br /> <br />
            <SimpleGrid spacing={4}>
              <br />
              <FormControl>
                <FormLabel style={{ fontWeight: 'bold' }}>Blank Year(if any)</FormLabel>
              </FormControl>
              <Divider
                orientation="horizontal"
                borderColor="#2F4F4F"
                borderWidth="2px"
              /> <br />
            </SimpleGrid>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                  <FormControl>
                    <FormLabel>Reason for Break </FormLabel>
                  </FormControl>
                  <FormControl >

                    <Input
                      type="text"
                      placeholder=" Reason for Break"
                      value={education.blankYear[0]?.reason}
                      onChange={e => {
                        const updatedEducation = { ...education };
                        updatedEducation.blankYear[0].reason = e.target.value;
                        setEducation(updatedEducation);
                      }}

                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>{from}</FormLabel>
                  </FormControl>
                  <FormControl >
                    <Input
                      type="date"
                      value={education.blankYear[0].from}
                      onChange={e => {
                        const updatedEducation = { ...education };
                        updatedEducation.blankYear[0].from = e.target.value;
                        setEducation(updatedEducation);
                      }}

                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>{To} </FormLabel>
                  </FormControl>
                  <FormControl >
                    <Input
                      type="date"
                      value={education.blankYear[0].to}

                      onChange={e => {


                        const updatedEducation = { ...education };
                        updatedEducation.blankYear[0].to = e.target.value;
                        setEducation(updatedEducation);
                      }}

                    />
                  </FormControl>
                </SimpleGrid>
                {education.blankYear.length > 1 ? education.blankYear.map((element, i) => {
                  if (i > 0) {
                    return (
                      <FormControl key={i}><br />
                        <Divider
                          orientation="horizontal"
                          borderColor="#2F4F4F"
                          borderWidth="2px"
                        /><br />
                        <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                          <FormControl>
                            <FormLabel>Reason for Break </FormLabel>
                          </FormControl>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder=" Reason for Break"
                              value={education.blankYear[i]?.reason}
                              onChange={e => {
                                const updatedEducation = { ...education };
                                updatedEducation.blankYear[i].reason = e.target.value;
                                setEducation(updatedEducation);
                              }}

                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>{from}</FormLabel>
                          </FormControl>
                          <FormControl>
                            <Input
                              type="date"
                              value={education.blankYear[i].from}
                              onChange={e => {


                                const updatedEducation = { ...education };
                                updatedEducation.blankYear[i].from = e.target.value;
                                setEducation(updatedEducation);
                              }}

                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>{To}</FormLabel>
                          </FormControl>
                          <FormControl>
                            <Input
                              type="date"
                              value={education.blankYear[i].to}

                              onChange={e => {

                                const updatedEducation = { ...education };
                                updatedEducation.blankYear[i].to = e.target.value;
                                setEducation(updatedEducation);
                              }}

                            />
                          </FormControl>
                        </SimpleGrid>
                      </FormControl>
                    )
                  }
                }) : (null)}

                <br />
                <Divider
                  orientation="horizontal"
                  borderColor="#2F4F4F"
                  borderWidth="2px"
                />

                <br />
                <Button marginRight={2}
                  color="#00b0ff"
                  onClick={e => {
                    const updatedEducation = { ...education };
                    updatedEducation.blankYear.push({
                      reason: "",
                      from: "",
                      to: "",
                    });
                    setEducation(updatedEducation);
                  }}
                >
                  Add
                </Button>
                <Button
                  color="red"
                  onClick={e => {
                    if (education.blankYear.length > 1) {
                      const updatedEducation = { ...education };
                      updatedEducation.blankYear.pop();
                      setEducation(updatedEducation);

                    }
                  }}

                >
                  Delete
                </Button>
              </FormControl> <br />
            </VStack>
            <p style={paragraphStyle}>
              {info}
            </p> <br /> <br />
            <Divider
              orientation="horizontal"
              borderColor="#2F4F4F"
              borderWidth="2px"
            />
            <br />
            <br />
            <br /> <br />
            <FormControl >
              <FormLabel style={{ fontWeight: 'bold' }}>{Lang}: <span style={{ color: "red" }}>*</span></FormLabel>
            </FormControl>

            <Divider
              orientation="horizontal"
              borderColor="#2F4F4F"
              borderWidth="2px"
            /> <br />
            <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
              <FormControl isInvalid={isSubmitted && education.motherTongue.trim() === ""}>
                <FormLabel>{MotherTounge}<span style={{ color: "red" }}>*</span></FormLabel>
                <Input
                  type="text"
                  placeholder="Mothen tongue"
                  value={education.motherTongue}
                  onChange={e => {
                    const updatedEducation = { ...education };
                    updatedEducation.motherTongue = e.target.value;
                    setEducation(updatedEducation);
                  }}


                /><FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={isSubmitted && education.english.trim() === ""} >
                <FormLabel>{English} <span style={{ color: "red" }}>*</span></FormLabel>
                <Select
                  placeholder="Select an option"
                  value={education.english}
                  onChange={e => {
                    const updatedEducation = { ...education };
                    updatedEducation.english = e.target.value;
                    setEducation(updatedEducation);
                  }}

                >
                  <option value="Good/ Gut">Good/ Gut </option>
                  <option value="Average/ Durchschnittlich">Average/ Durchschnittlich </option>
                  <option value="Poor /Schlecht">Poor /Schlecht </option>
                </Select><FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
              </FormControl>
              <br />
            </SimpleGrid>
            <Divider
              orientation="horizontal"
              borderColor="#2F4F4F"
              borderWidth="2px"
            />
            <br /> <br />

            <FormLabel style={{ fontWeight: 'bold' }}>{German}<span style={{ color: "red" }}>*</span></FormLabel>
            <Divider
              orientation="horizontal"
              borderColor="#2F4F4F"
              borderWidth="2px"
            /> <br />
            <FormControl>
              <Stack>
                <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                  <FormControl>
                    <FormLabel>Select an option<span style={{ color: "red" }}>*</span></FormLabel>
                  </FormControl>
                  <FormControl isInvalid={isSubmitted && education.german[0]['level'].trim() === ""}>
                    <Select
                      placeholder="Select option"
                      value={education.german[0]?.level}
                      onChange={e => {
                        const updatedEducation = { ...education };
                        updatedEducation.german[0].level = e.target.value;
                        setEducation(updatedEducation);
                      }}


                    >
                      {/* {/<span style={{color:"red"}}>*</span> Your Select options here <span style={{color:"red"}}>*</span>/} */}


                      <option value="A1">A1</option>
                      <option value="A2">A2</option>
                      <option value="B1">B1</option>
                      <option value="B2">B2</option>
                    </Select> <FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
                  </FormControl>

                  <FormControl>
                    <FormLabel>{from}<span style={{ color: "red" }}>*</span></FormLabel>
                  </FormControl>
                  <FormControl isInvalid={isSubmitted && education.german[0]['from'].trim() === ""} >
                    <Input
                      type="date"
                      value={education.german[0].from}

                      onChange={e => {

                        const updatedEducation = { ...education };
                        updatedEducation.german[0].from = e.target.value;
                        setEducation(updatedEducation);
                      }}

                    /><FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
                  </FormControl>

                  <FormControl >
                    <FormLabel>{To} <span style={{ color: "red" }}>*</span></FormLabel>
                  </FormControl>
                  <FormControl isInvalid={isSubmitted && education.german[0]['to'].trim() === ""}>
                    <Input
                      type="date"
                      value={education.german[0].to}

                      onChange={e => {


                        const updatedEducation = { ...education };
                        updatedEducation.german[0].to = e.target.value;
                        setEducation(updatedEducation);
                      }}

                    /><FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
                  </FormControl>  <FormControl >
                    <FormLabel>{cer} <span style={{ color: "red" }}>*</span></FormLabel>
                  </FormControl>
                  <FormControl isInvalid={isSubmitted && education.german[0]['to'].trim() === ""}>
                    <Input
                      type="date"
                      value={education.german[0].certificate}

                      onChange={e => {


                        const updatedEducation = { ...education };
                        updatedEducation.german[0].certificate = e.target.value;
                        setEducation(updatedEducation);
                      }}

                    /><FormErrorMessage>{isSubmitted && "required."}</FormErrorMessage>
                  </FormControl>
                  {/* {/<span style={{color:"red"}}>*</span> <FormControl>
            <FormLabel>Certificate (Level / date)/ Zertifikat (Stufe/Datum) <span style={{color:"red"}}>*</span></FormLabel>
          </FormControl>
          <FormControl>
            <Input
              type="date"


            />
          </FormControl> <span style={{color:"red"}}>*</span>/} */}
                </SimpleGrid> <br />
                {/* {/<span style={{color:"red"}}>*</span> {(resumeInfo?.edu?.level[0] === "B1" || resumeInfo?.edu?.level[0] === "B2") && ( <span style={{color:"red"}}>*</span>/} */}
                {(education.german[0]?.level === "B1" || education.german[0]?.level === "B2") ?
                  (<FormControl>
                    <SimpleGrid
                      columns={[1, 1, 1, 4]}
                      spacing={1}
                      placeItems="center"
                    >


                      <FormControl>
                        <FormLabel>Listening Module Marksheet<span style={{ color: "red" }}>*</span>(pdf)</FormLabel>
                      </FormControl>

                      <FormControl>



                        <Input

                          type="file" accept=".pdf"
                          marginRight={8}
                          name={`${'german'}-${0}-${'listeningMarksheet'}`}
                          variant="whatsapp"
                          w="100"
                          onChange={async (e) => {
                            const formData = new FormData();
                            formData.append("file", e.target.files[0]);
                            formData.append("sid", localStorage.getItem("sid"));
                            formData.append("firstName", JSON.parse(localStorage.getItem("personal")).firstName);
                            formData.append("lastName", JSON.parse(localStorage.getItem("personal")).lastName);
                            formData.append("name", "Listening Module Marksheet");
                            try {
                              const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                              const url = res.data.file_url;
                              const updatedEducation = { ...education };
                              updatedEducation.german[0].listeningMarksheet = url;
                              setEducation(updatedEducation);
                            } catch (e) {
                              alert("Error in uploading file");
                            }
                          }}

                        />

                      </FormControl>
                      <FormControl>
                      </FormControl>
                      <FormControl>
                        <Button
                          color="#00b0ff"
                          marginRight={"4%"}
                          onClick={() => handleViewClick('listeningMarksheet', 0, "german")}
                        >
                          View
                        </Button>
                        <Button marginRight={-10} color="red" onClick={() => handleDeleteClickGerman('listeningMarksheet', 0, "german")}>
                          Delete
                        </Button>

                      </FormControl>
                      <FormControl>
                        <FormLabel>Speaking Module Marksheet<span style={{ color: "red" }}>*</span>(pdf)</FormLabel>
                      </FormControl>
                      <FormControl>
                        <Input
                          type="file" accept=".pdf"

                          marginRight={8}
                          variant="whatsapp"
                          w="100"
                          name={`${'german'}-${0}-${'speakingMarksheet'}`}
                          onChange={async (e) => {
                            const formData = new FormData();
                            formData.append("file", e.target.files[0]);
                            formData.append("sid", localStorage.getItem("sid"));
                            formData.append("firstName", JSON.parse(localStorage.getItem("personal")).firstName);
                            formData.append("lastName", JSON.parse(localStorage.getItem("personal")).lastName);
                            formData.append("name", "Speaking Module Marksheet");
                            try {
                              const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                              const url = res.data.file_url;
                              const updatedEducation = { ...education };
                              updatedEducation.german[0].speakingMarksheet = url;
                              setEducation(updatedEducation);
                            } catch (e) {
                              alert("Error in uploading file");
                            }
                          }}
                        />
                      </FormControl>
                      <FormControl>

                      </FormControl>
                      <FormControl>

                        <Button
                          color="#00b0ff"
                          marginRight={"4%"}
                          onClick={() => handleViewClick('speakingMarksheet', 0, "german")}
                        >
                          View
                        </Button>
                        <Button color="red" marginRight={-10} onClick={() => handleDeleteClickGerman('speakingMarksheet', 0, "german")}>
                          Delete
                        </Button>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Reading Module Marksheet<span style={{ color: "red" }}>*</span>(pdf)</FormLabel>
                      </FormControl>
                      <FormControl>
                        <Input
                          type="file" accept=".pdf"

                          marginRight={8}
                          variant="whatsapp"
                          w="100"
                          name={`${'german'}-${0}-${'readingMarksheet'}`}
                          onChange={async (e) => {
                            const formData = new FormData();
                            formData.append("file", e.target.files[0]);
                            formData.append("sid", localStorage.getItem("sid"));
                            formData.append("firstName", JSON.parse(localStorage.getItem("personal")).firstName);
                            formData.append("lastName", JSON.parse(localStorage.getItem("personal")).lastName);
                            formData.append("name", "Reading Module Marksheet");
                            try {
                              const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                              const url = res.data.file_url;
                              const updatedEducation = { ...education };
                              updatedEducation.german[0].readingMarksheet = url;
                              setEducation(updatedEducation);
                            } catch (e) {
                              alert("Error in uploading file");
                            }
                          }}
                        />
                      </FormControl>
                      <FormControl>



                      </FormControl>
                      <FormControl>


                        <Button
                          color="#00b0ff"
                          marginRight={"4%"}
                          onClick={() => handleViewClick('readingMarksheet', 0, "german")}

                        >
                          View
                        </Button>
                        <Button color="red" marginRight={-10} onClick={() => handleDeleteClickGerman('readingMarksheet', 0, "german")}>
                          Delete
                        </Button>
                      </FormControl>



                      <FormControl>
                        <FormLabel>Writing Module Marksheet<span style={{ color: "red" }}>*</span>(pdf)</FormLabel>
                      </FormControl>
                      <FormControl>
                        <Input
                          type="file" accept=".pdf"
                          name={`${'german'}-${0}-${'writingMarksheet'}`}
                          marginRight={8}
                          variant="whatsapp"
                          w="100"
                          onChange={async (e) => {
                            const formData = new FormData();
                            formData.append("file", e.target.files[0]);
                            formData.append("sid", localStorage.getItem("sid"));
                            formData.append("firstName", JSON.parse(localStorage.getItem("personal")).firstName);
                            formData.append("lastName", JSON.parse(localStorage.getItem("personal")).lastName);
                            formData.append("name", "Writing Module Marksheet");
                            try {
                              const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                              const url = res.data.file_url;
                              const updatedEducation = { ...education };
                              updatedEducation.german[0].writingMarksheet = url;
                              setEducation(updatedEducation);
                            } catch (e) {
                              alert("Error in uploading file");
                            }
                          }}
                        />
                      </FormControl>
                      <FormControl>


                      </FormControl>
                      <FormControl>

                        <Button
                          color="#00b0ff"
                          marginRight={"4%"}
                          onClick={() => handleViewClick('writingMarksheet', 0, "german")}
                        >
                          View
                        </Button>
                        <Button color="red" marginRight={-10} onClick={() => handleDeleteClickGerman('writingMarksheet', 0, "german")}>
                          Delete
                        </Button>
                      </FormControl>

                    </SimpleGrid>
                  </FormControl>) : (null)
                }
                <Divider
                  orientation="horizontal"
                  borderColor="#2F4F4F"
                  borderWidth="2px"
                />
              </Stack>

            </FormControl>
            {/* {/<span style={{color:"red"}}>*</span> german mapping starts <span style={{color:"red"}}>*</span>/} */}

            {education.german.length > 1 ? education.german.map((element, i) => {
              if (i > 0) {
                return (
                  <FormControl key={i}>
                    <Stack><br />
                      <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                        <FormControl>
                          <FormLabel>Select an option<span style={{ color: "red" }}>*</span></FormLabel>
                        </FormControl>
                        <FormControl>
                          <Select
                            placeholder="Select option"
                            value={education.german[i]?.level}
                            onChange={e => {
                              const updatedEducation = { ...education };
                              updatedEducation.german[i].level = e.target.value;
                              setEducation(updatedEducation);
                            }}


                          >
                            {/* {/<span style={{color:"red"}}>*</span> Your Select options here <span style={{color:"red"}}>*</span>/} */}


                            <option value="A1">A1</option>
                            <option value="A2">A2</option>
                            <option value="B1">B1</option>
                            <option value="B2">B2</option>
                          </Select>
                        </FormControl>

                        <FormControl>
                          <FormLabel>{from}<span style={{ color: "red" }}>*</span></FormLabel>
                        </FormControl>
                        <FormControl>
                          <Input
                            type="date"
                            placeholder=""
                            value={education.german[i].from}

                            onChange={e => {

                              const updatedEducation = { ...education };
                              updatedEducation.german[i].from = e.target.value;
                              setEducation(updatedEducation);
                            }}

                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>{To} <span style={{ color: "red" }}>*</span></FormLabel>
                        </FormControl>
                        <FormControl>
                          <Input
                            type="date"
                            value={education.german[i].to}

                            onChange={e => {

                              const updatedEducation = { ...education };
                              updatedEducation.german[i].to = e.target.value;
                              setEducation(updatedEducation);
                            }}

                          />
                        </FormControl> <FormControl>
                          <FormLabel>{cer} <span style={{ color: "red" }}>*</span></FormLabel>
                        </FormControl>
                        <FormControl>
                          <Input
                            type="date"
                            value={education.german[i].certificate}

                            onChange={e => {

                              const updatedEducation = { ...education };
                              updatedEducation.german[i].certificate = e.target.value;
                              setEducation(updatedEducation);
                            }}

                          />
                        </FormControl>
                        {/* {/<span style={{color:"red"}}>*</span> <FormControl>
            <FormLabel>Certificate (Level / date)/ Zertifikat (Stufe/Datum) <span style={{color:"red"}}>*</span></FormLabel>
          </FormControl>
          <FormControl>
            <Input
              type="date"


            />
          </FormControl> <span style={{color:"red"}}>*</span>/} */}
                      </SimpleGrid> <br />
                      {/* {/<span style={{color:"red"}}>*</span> {(resumeInfo?.edu?.level[0] === "B1" || resumeInfo?.edu?.level[0] === "B2") && ( <span style={{color:"red"}}>*</span>/} */}
                      {(education.german[i]?.level === "B1" || education.german[i]?.level === "B2") ?
                        (
                          <FormControl>
                            <SimpleGrid
                              columns={[1, 1, 1, 4]}
                              spacing={1}
                              placeItems="center"
                            >


                              <FormControl>
                                <FormLabel>Listening Module Marksheet<span style={{ color: "red" }}>*</span>(pdf)</FormLabel>
                              </FormControl>
                              <FormControl>



                                <Input
                                  type="file" accept=".pdf"
                                  marginRight={8}
                                  variant="whatsapp"
                                  w="100"
                                  name={`${'german'}-${i}-${'listeningMarksheet'}`}
                                  onChange={async (e) => {


                                    const formData = new FormData();
                                    formData.append("file", e.target.files[0]);
                                    formData.append("sid", localStorage.getItem("sid"));
                                    formData.append("firstName", JSON.parse(localStorage.getItem("personal")).firstName);
                                    formData.append("lastName", JSON.parse(localStorage.getItem("personal")).lastName);
                                    formData.append("name", `listening_marksheet${i + 1}`);
                                    try {
                                      const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                                      const url = res.data.file_url;
                                      const updatedEducation = { ...education };
                                      updatedEducation.german[i].listeningMarksheet = url;
                                      setEducation(updatedEducation);
                                    } catch (e) {
                                      alert("Error in uploading file");
                                    }
                                  }}

                                />

                              </FormControl>
                              <FormControl>
                              </FormControl>
                              <FormControl>
                                <Button
                                  color="#00b0ff"
                                  marginRight={"4%"}
                                  onClick={() => handleViewClick('listeningMarksheet', i, "german")}
                                >
                                  View
                                </Button>
                                <Button color="red" marginRight={-10} onClick={() => handleDeleteClickGerman('listeningMarksheet', 1, "german")}>
                                  Delete
                                </Button>

                              </FormControl>
                              <FormControl>
                                <FormLabel>Speaking Module Marksheet<span style={{ color: "red" }}>*</span>(pdf)</FormLabel>
                              </FormControl>
                              <FormControl>
                                <Input
                                  type="file" accept=".pdf"

                                  marginRight={8}
                                  variant="whatsapp"
                                  w="100"
                                  name={`${'german'}-${i}-${'speakingMarksheet'}`}
                                  onChange={async (e) => {
                                    const formData = new FormData();
                                    formData.append("file", e.target.files[0]);
                                    formData.append("sid", localStorage.getItem("sid"));
                                    formData.append("firstName", JSON.parse(localStorage.getItem("personal")).firstName);
                                    formData.append("lastName", JSON.parse(localStorage.getItem("personal")).lastName);
                                    formData.append("name", `speaking_marksheet${i + 1}`);
                                    try {
                                      const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                                      const url = res.data.file_url;
                                      const updatedEducation = { ...education };
                                      updatedEducation.german[i].speakingMarksheet = url;
                                      setEducation(updatedEducation);
                                    } catch (e) {
                                      alert("Error in uploading file");
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormControl>

                              </FormControl>
                              <FormControl>

                                <Button
                                  color="#00b0ff"
                                  marginRight={"4%"}
                                  onClick={() => handleViewClick('speakingMarksheet', i, "german")}
                                >
                                  View
                                </Button>
                                <Button color="red" marginRight={-10} onClick={() => handleDeleteClickGerman('speakingMarksheet', i, "german")} >
                                  Delete
                                </Button>
                              </FormControl>
                              <FormControl>
                                <FormLabel>Reading Module Marksheet<span style={{ color: "red" }}>*</span>(pdf)</FormLabel>
                              </FormControl>
                              <FormControl>
                                <Input
                                  type="file" accept=".pdf"

                                  marginRight={8}
                                  variant="whatsapp"
                                  w="100"
                                  name={`${'german'}-${i}-${'readingMarksheet'}`}
                                  onChange={async (e) => {
                                    const formData = new FormData();
                                    formData.append("file", e.target.files[0]);
                                    formData.append("sid", localStorage.getItem("sid"));
                                    formData.append("firstName", JSON.parse(localStorage.getItem("personal")).firstName);
                                    formData.append("lastName", JSON.parse(localStorage.getItem("personal")).lastName);
                                    formData.append("name", `reading_marksheet${i + 1}`);
                                    try {
                                      const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                                      const url = res.data.file_url;
                                      const updatedEducation = { ...education };
                                      updatedEducation.german[i].readingMarksheet = url;
                                      setEducation(updatedEducation);
                                    } catch (e) {
                                      alert("Error in uploading file");
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormControl>



                              </FormControl>
                              <FormControl>


                                <Button
                                  color="#00b0ff"

                                  marginRight={"4%"}
                                  onClick={() => handleViewClick('readingMarksheet', i, "german")}
                                >
                                  View
                                </Button>
                                <Button color="red" marginRight={-10} onClick={() => handleDeleteClickGerman('readingMarksheet', i, "german")}>
                                  Delete
                                </Button>
                              </FormControl>



                              <FormControl>
                                <FormLabel>Writing Module Marksheet<span style={{ color: "red" }}>*</span>(pdf)</FormLabel>
                              </FormControl>
                              <FormControl>
                                <Input
                                  type="file" accept=".pdf"

                                  marginRight={8}
                                  variant="whatsapp"
                                  w="100"
                                  name={`${'german'}-${i}-${'writingMarksheet'}`}
                                  onChange={async (e) => {
                                    const formData = new FormData();
                                    formData.append("file", e.target.files[0]);
                                    formData.append("sid", localStorage.getItem("sid"));
                                    formData.append("firstName", JSON.parse(localStorage.getItem("personal")).firstName);
                                    formData.append("lastName", JSON.parse(localStorage.getItem("personal")).lastName);
                                    formData.append("name", `writing_marksheet${i + 1}`);
                                    try {
                                      const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                                      const url = res.data.file_url;
                                      const updatedEducation = { ...education };
                                      updatedEducation.german[i].writingMarksheet = url;
                                      setEducation(updatedEducation);
                                    } catch (e) {
                                      alert("Error in uploading file");
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormControl>


                              </FormControl>
                              <FormControl>

                                <Button
                                  color="#00b0ff"
                                  marginRight={"4%"}
                                  onClick={() => handleViewClick('writingMarksheet', i, "german")}
                                >
                                  View
                                </Button>
                                <Button color="red" marginRight={-10} onClick={() => handleDeleteClickGerman('writingMarksheet', i, "german")}>
                                  Delete
                                </Button>
                              </FormControl>

                            </SimpleGrid>
                          </FormControl>) : (null)
                      }
                      <Divider
                        orientation="horizontal"
                        borderColor="#2F4F4F"
                        borderWidth="2px"
                      />
                    </Stack>

                  </FormControl>
                )
              }
            }) : (null)}

            {/* {/<span style={{color:"red"}}>*</span> german mapping ends <span style={{color:"red"}}>*</span>/} */}

            <FormControl>

              <br />
              <Button
                marginRight={2}
                color="#00b0ff"
                onClick={e => {
                  const updatedEducation = { ...education };
                  updatedEducation.german.push({
                    level: "",
                    from: "",
                    to: "",
                    listeningMarksheet: "",
                    speakingMarksheet: "",
                    readingMarksheet: "",
                    writingMarksheet: "",
                  });
                  setEducation(updatedEducation);
                }}
              >
                Add
              </Button>
              <Button
                color="red"
                onClick={e => {
                  if (education.german.length > 1) {
                    const updatedEducation = { ...education };
                    updatedEducation.german.pop();
                    setEducation(updatedEducation);

                  }
                }}
              >
                Delete
              </Button>
            </FormControl><br />
            <br />




            <HStack spacing={8} justify="center">
              <Button
                colorScheme="blue"
                onClick={() => {
                  navigate("/personal");
                }}
                leftIcon={<ChevronLeftIcon />}
              >
                Back
              </Button>
              <Button
                color="#00b0ff"
                onClick={async (e) => {
                  window.scrollTo(0, 0);
                  setIsSubmitted(true);
                  e.preventDefault();

                  // Validate the education state
                  const isEducationValid = validateEducation();

                  if (isEducationValid) {
                    // Save to local storage
                    localStorage.setItem("education", JSON.stringify(education));



                    // Navigate to the next page
                    navigate("/work");
                  } else {
                    // Handle validation error (e.g., show an error message)
                    console.error("Education data is not valid. Please fill in all required fields.");
                  }
                }}



              >
                Next
              </Button>
            </HStack>

          </Box>
        </Stack>
        <div className="w-full sm:w-1/2 p-2 sm:pt-0">           <ResumeTemplate info={personalInfo} route={'education'} education={education} work={[]} internship={[]} />
        </div>
      </div>
    </div>
  );
};

