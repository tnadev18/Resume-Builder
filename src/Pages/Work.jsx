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
    Center,
    Text,
    Heading,
    Box,
    Radio,
    RadioGroup, VStack, Divider
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import ResumeTemplate from "../Components/template";

export default function Work() {
    const navigate = useNavigate();
    const location = useLocation();
    const search = new URLSearchParams(location.search);

    const education = JSON.parse(localStorage.getItem("education"));
    const personal = JSON.parse(localStorage.getItem("personal"));

    const [searchParams, setSearchParams] = useSearchParams();
    function handleParamChange(e) {
        const param = new URLSearchParams();
        param.set('option', e.target.value);
        setSearchParams(param);
    }
    const [isSubmitted, setIsSubmitted] = useState(false);


    const [work, setWork] = useState(
        [
            {
                from: "",
                to: "12/3",
                employer: "",
                place: "",
                department: "",
                certificate: "",
                duties: [
                    {
                        duty: "",

                    }
                ]
            }
        ]);
    const [workErrors, setWorkErrors] = useState({});

    const validateWorkFields = () => {
        const errors = {};

        work.forEach((item, index) => {
            Object.entries(item).forEach(([field, value]) => {
                // Check if value is a string before calling trim()
                if (typeof value === 'string' && value.trim() === "") {
                    if (!errors[index]) {
                        errors[index] = {};
                    }
                    errors[index][field] = `${field} is required.`;
                }
            });
        });

        setWorkErrors(errors);

        return errors;
    };

    const [internship, setInternship] = useState(
        [
            {
                from: "",
                to: "",
                hospital: "",
                place: "",
                department: "",
                certificate: "",
                duties: [
                    {
                        duty: "",

                    }
                ]
            }
        ]
    );

    useEffect(() => {
        console.log(internship)
    }, [internship])
    const [internshipErrors, setInternshipErrors] = useState({});

    const validateInternshipFields = () => {
        let hasErrors = false;

        const updateErrorState = (fieldName, errorMessage) => {
            setInternshipErrors((prevErrors) => ({
                ...prevErrors,
                [fieldName]: errorMessage,
            }));
            hasErrors = true;
        };

        // Validate 'from' field
        if (!internship[0].from || typeof internship[0].from !== 'string' || internship[0].from.trim() === "") {
            updateErrorState("from", "From date is required.");
        }

        // Validate 'to' field


        // Validate 'hospital' field
        if (!internship[0].hospital || typeof internship[0].hospital !== 'string' || internship[0].hospital.trim() === "") {
            updateErrorState("hospital", "Hospital is required.");
        }

        // Validate 'department' field
        if (!internship[0].department || typeof internship[0].department !== 'string' || internship[0].department.trim() === "") {
            updateErrorState("department", "Department is required.");
        }

        // Validate 'certificate' field
        if (!internship[0].certificate || typeof internship[0].certificate !== 'string' || internship[0].certificate.trim() === "") {
            updateErrorState("certificate", "Certificate is required.");
        }

        // Validate 'duties' array


        // Display an alert with detailed error messages
        if (hasErrors) {
            const errorMessages = Object.entries(internshipErrors)
                .filter(([field, error]) => !!error)
                .map(([field, error]) => `${field}: ${error}`)
                .join("\n");
            //alert(`Form has the following validation errors:\n${errorMessages}`);
        }

        return !hasErrors;
    };


    useEffect(() => {
        console.log(internship)
    }, [internship])

    const paragraphStyle = {
        color: 'red',
    };

    const handleViewClick = (fieldName, i, level) => {
        const url = work[i][fieldName];
        console.log(url);
        console.log(url);
        if (url) {
            window.open(url, '_blank');
        }
    };

    useEffect(() => {
        const work = JSON.parse(localStorage.getItem("work"));
        const internship = JSON.parse(localStorage.getItem("internship"));
        if (work, internship) {
            setWork(work)
            setInternship(internship)
        }
    }, [])
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


    const head = userData?.language === 'English' ? 'WORK EXPERIENCE' : userData?.language === 'German' ? 'ARBEITSERFAHRUNG' : ''
    const from = userData?.language === 'English' ? 'From' : userData?.language === 'German' ? 'Von' : ''
    const to = userData?.language === 'English' ? 'to' : userData?.language === 'German' ? 'Bis' : ''
    const Emp = userData?.language === 'English' ? 'Employer Name / Address' : userData?.language === 'German' ? 'Employer Adresse des Arbeitgebers' : ''
    const Dep = userData?.language === 'English' ? 'Department / Position ' : userData?.language === 'German' ? 'Abteilung / Position' : ''
    const Hos = userData?.language === 'English' ? 'Hospital Name / Address ' : userData?.language === 'German' ? 'Adresse des Krankenhauses/der Klinik' : ''
    const info = userData?.language === 'English' ? 'Please briefly and succinctly describe the tasks and activities you learned during your internship. Mention specific departments or facilities. The more details, the better. However, keep in mind that you may be asked about your skills and experience during the interview, and you should be able to explain them ' : userData?.language === 'German' ? 'Bitte schreiben sie hier so kurz und detalliert wie möglich über die Aufgaben und die Aktivitäten, die Ihr während Ihres Praktikum gelernt haben. Erwähnen Sie auch Fachabteilungen/ Einrichtungen. Je mehr, desto besser. Aber bitte beachte dass, Sie während des Vorstellungsgespräch über Ihre Fähigkeiten und Erfahrung gefragt werden. Sie müssen sie erklären können convert to english' : ''
    const Place = userData?.language === 'English' ? 'Place,state' : userData?.language === 'German' ? 'Ort,Land' : ''







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
                            <Heading mb={4} fontSize="2xl">{head}</Heading>
                        </Center><br />
                        <Text > <strong>Do you have any work experience?</strong></Text>
                        <Box p={4}>
                            <div className="space-x-6 flex items-center">
                                <div className="space-x-1">
                                    <input type="radio" name="exp" value="yes"
                                        onChange={handleParamChange} />
                                    <label>Yes</label>
                                </div>
                                <div className="space-x-1">
                                    <input type="radio" name="exp" value="no"
                                        onChange={handleParamChange} />
                                    <label>No</label>
                                </div>
                                <div className="space-x-1">
                                    <input type="radio" name="exp" value="none"
                                        onChange={handleParamChange}
                                    />

                                    <label>School graduate/12th passed</label>
                                </div>
                                {/* </VStack> */}
                            </div>
                            <br />
                            {searchParams.get('option') === 'none' ? (<HStack spacing={8} justify="center">

                                <Button
                                    colorScheme="blue"
                                    leftIcon={<ChevronLeftIcon />}
                                    onClick={async (e) => {
                                        navigate('/Education');
                                    }}
                                >
                                    back
                                </Button>
                                <Button
                                    color="#00b0ff"
                                    rightIcon={<ChevronRightIcon />}
                                    onClick={async (e) => {
                                        window.scrollTo(0, 0);
                                        localStorage.setItem("work", JSON.stringify(work));
                                        localStorage.setItem("internship", JSON.stringify(internship));
                                        navigate('/Declaration');
                                    }}
                                >
                                    Next
                                </Button>
                            </HStack>) :












                                searchParams.get('option') === 'yes' ? (<FormControl >
                                    <SimpleGrid >

                                        <VStack spacing={4} align="flex-start">
                                            <FormControl >
                                                <h2 className="font-bold">Current</h2>
                                                <SimpleGrid className="border-2 p-4">

                                                    <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                                                        <FormControl>
                                                            <FormLabel>{from}<span style={{ color: "red" }}><span style={{ color: "red" }}>*</span></span></FormLabel>
                                                        </FormControl>
                                                        <FormControl isInvalid={isSubmitted && work[0]['from'].trim() === ""}>
                                                            <Input
                                                                type="date"
                                                                name="from"
                                                                value={work[0].from}
                                                                onChange={(e) => {
                                                                    const updatedWork = [...work];
                                                                    updatedWork[0].from = e.target.value;
                                                                    setWork(updatedWork);
                                                                }}



                                                            /></FormControl>
                                                        {/* <FormControl>
                                                            <FormLabel> to/bis (Monat - Jahr)<span style={{ color: "red" }}><span style={{ color: "red" }}>*</span></span></FormLabel>
                                                        </FormControl>
                                                        <FormControl>
                                                            <Input
                                                                type="date"
                                                                name="to"
                                                                value={work[0].to}
                                                                onChange={(e) => {
                                                                    const updatedWork = [...work];
                                                                    updatedWork[0].to = e.target.value;
                                                                    setWork(updatedWork);
                                                                }}


                                                            /></FormControl> */}
                                                        <FormControl>
                                                            <FormLabel> {Emp}<span style={{ color: "red" }}><span style={{ color: "red" }}>*</span></span></FormLabel>
                                                        </FormControl>
                                                        <FormControl isInvalid={isSubmitted && work[0]['employer'].trim() === ""}>
                                                            <Input
                                                                type="text"
                                                                placeholder="enter name"
                                                                name="employer"
                                                                value={work[0].employer}
                                                                onChange={(e) => {
                                                                    const updatedWork = [...work];
                                                                    updatedWork[0].employer = e.target.value;
                                                                    setWork(updatedWork);
                                                                }}

                                                            /></FormControl>
                                                        <FormControl>
                                                            <FormLabel> {Place}<span style={{ color: "red" }}><span style={{ color: "red" }}>*</span></span></FormLabel>
                                                        </FormControl>
                                                        <FormControl isInvalid={isSubmitted && work[0]['employer'].trim() === ""}>
                                                            <Input
                                                                type="text"
                                                                placeholder="Place,State"
                                                                name="place"
                                                                value={work[0].place}
                                                                onChange={(e) => {
                                                                    const updatedWork = [...work];
                                                                    updatedWork[0].place = e.target.value;
                                                                    setWork(updatedWork);
                                                                }}

                                                            /></FormControl>
                                                        <FormControl>
                                                            <FormLabel>{Dep}<span style={{ color: "red" }}><span style={{ color: "red" }}>*</span></span></FormLabel>
                                                        </FormControl>
                                                        <FormControl isInvalid={isSubmitted && work[0]['department'].trim() === ""}>
                                                            <Input
                                                                type="text"
                                                                placeholder="enter department"
                                                                name="department"
                                                                value={work[0].department}
                                                                onChange={(e) => {
                                                                    const updatedWork = [...work];
                                                                    updatedWork[0].department = e.target.value;
                                                                    setWork(updatedWork);
                                                                }}














                                                            /></FormControl>
                                                    </SimpleGrid>
                                                    <br />








                                                    <   SimpleGrid columns={[1, 1, 1, 2]} spacing={4} >

                                                        <FormLabel >Duties handled</FormLabel>


                                                        <SimpleGrid columns={[1, 1, 1, 1]} spacing={2} >
                                                            <FormControl isInvalid={isSubmitted && work[0].duties[0].duty.trim() === ""}>
                                                                <Input
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={work[0]?.duties?.[0]?.duty}
                                                                    onChange={(e) => {
                                                                        const updatedWork = [...work];
                                                                        updatedWork[0].duties[0].duty = e.target.value;
                                                                        setWork(updatedWork);
                                                                    }}
                                                                />


                                                            </FormControl>




                                                            {work[0].duties?.length > 1 ? work[0].duties.map((item, i) => {
                                                                if (i > 0) {
                                                                    return (
                                                                        <div key={i}>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="text"
                                                                                    placeholder=""
                                                                                    value={work[0].duties[i].duty}
                                                                                    onChange={(e) => {
                                                                                        const updatedWork = [...work];
                                                                                        updatedWork[0].duties[i].duty = e.target.value;
                                                                                        setWork(updatedWork);
                                                                                    }}


                                                                                />



                                                                            </FormControl>




                                                                        </div>
                                                                    )
                                                                }
                                                            }) : ''}

                                                            <SimpleGrid columns={[1, 1, 1, 4]} spacing={2} >

                                                                <Button
                                                                    color="#00b0ff"
                                                                    style={{ marginLeft: "0%", marginTop: "2%" }}
                                                                    size="sm"

                                                                    onClick={() => {
                                                                        const updatedWork = [...work];
                                                                        updatedWork[0].duties.push({
                                                                            duty: "",
                                                                            duration: "",
                                                                        });
                                                                        setWork(updatedWork);
                                                                    }}
                                                                >
                                                                    Add
                                                                </Button>


                                                                <Button color="red"
                                                                    style={{ marginTop: "2%" }}
                                                                    size="sm"

                                                                    onClick={() => {
                                                                        if (work[0].duties.length > 1) {
                                                                            const updatedWork = [...work];
                                                                            updatedWork[0].duties.pop();
                                                                            setWork(updatedWork);
                                                                        }
                                                                    }}

                                                                >
                                                                    Delete
                                                                </Button>  </SimpleGrid> </SimpleGrid>

                                                    </SimpleGrid>

                                                    <br />



                                                    <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} >
                                                        <FormControl>
                                                            <FormLabel>Upload Experience Certificate(pdf)<span style={{ color: "red" }}><span style={{ color: "red" }}>*</span></span></FormLabel>
                                                        </FormControl>
                                                        <FormControl className="space-x-2" isInvalid={isSubmitted && work[0]['certificate'].trim() === ""}>
                                                            <Input
                                                                type="file"
                                                                colorScheme="#00b0ff"
                                                                w="100%"
                                                                accept=".pdf"
                                                                name={`${'work'}-${0}-${'certificate'}`}
                                                                onChange={async (e) => {
                                                                    const sid = localStorage.getItem("SIDofStudentToEdit") ? localStorage.getItem("SIDofStudentToEdit") : localStorage.getItem("sid")
                                                                    const formData = new FormData();
                                                                    formData.append("file", e.target.files[0]);
                                                                    formData.append("sid", sid);
                                                                    formData.append("firstName", personal.firstName);
                                                                    formData.append("lastName", personal.lastName);
                                                                    formData.append("name", "Experience_certificate-1")
                                                                    try {
                                                                        const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                                                                        const url = res.data.file_url;
                                                                        const updatedWork = [...work];
                                                                        updatedWork[0].certificate = url;
                                                                        setWork(updatedWork);

                                                                    } catch (e) {
                                                                        alert("Error in uploading file");
                                                                    }

                                                                }}
                                                            /><br />
                                                            <Button color="#00b0ff"
                                                                style={{ marginTop: "2%" }}
                                                                size="sm"
                                                                onClick={() => handleViewClick("certificate", 0, "work")}
                                                            >
                                                                View
                                                            </Button>
                                                            <Button
                                                                color="red"
                                                                style={{ marginTop: "2%" }}
                                                                size="sm"
                                                                onClick={(e) => {

                                                                    const updatedWork = [...work];
                                                                    updatedWork[0].certificate = "";
                                                                    setWork(updatedWork);
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </FormControl>
                                                    </SimpleGrid><br />
                                                </SimpleGrid>
                                                <br />

                                                {/* mapping starts */}

                                                {work.length > 1 ? <h2 className="font-bold">Past</h2> : ''}
                                                {work.length > 1 ? work.map((item, i) => {
                                                    if (i > 0) {
                                                        return (
                                                            <SimpleGrid key={i} className="border-2 p-4 ">

                                                                <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                                                                    <FormControl>
                                                                        <FormLabel>{from}<span style={{ color: "red" }}><span style={{ color: "red" }}>*</span></span></FormLabel>
                                                                    </FormControl>
                                                                    <FormControl>
                                                                        <Input
                                                                            type="date"
                                                                            name="from"
                                                                            value={work[i].from}
                                                                            onChange={(e) => {
                                                                                const updatedWork = [...work];
                                                                                updatedWork[i].from = e.target.value;
                                                                                setWork(updatedWork);
                                                                            }}



                                                                        /></FormControl>
                                                                    <FormControl>
                                                                        <FormLabel> {to}<span style={{ color: "red" }}><span style={{ color: "red" }}>*</span></span></FormLabel>
                                                                    </FormControl>
                                                                    <FormControl>
                                                                        <Input
                                                                            type="date"
                                                                            name="to"
                                                                            value={work[i].to}
                                                                            onChange={(e) => {
                                                                                const updatedWork = [...work];
                                                                                updatedWork[i].to = e.target.value;
                                                                                setWork(updatedWork);
                                                                            }}


                                                                        /></FormControl>
                                                                    <FormControl>
                                                                        <FormLabel> {Emp}<span style={{ color: "red" }}><span style={{ color: "red" }}>*</span></span></FormLabel>
                                                                    </FormControl>
                                                                    <FormControl>
                                                                        <Input
                                                                            type="text"
                                                                            placeholder="enter name"
                                                                            name="employer"
                                                                            value={work[i].employer}
                                                                            onChange={(e) => {
                                                                                const updatedWork = [...work];
                                                                                updatedWork[i].employer = e.target.value;
                                                                                setWork(updatedWork);
                                                                            }}

                                                                        /></FormControl>

                                                                    <FormControl>
                                                                        <FormLabel> {Place}<span style={{ color: "red" }}><span style={{ color: "red" }}>*</span></span></FormLabel>
                                                                    </FormControl>
                                                                    <FormControl>
                                                                        <Input
                                                                            type="text"
                                                                            placeholder="Place,state"
                                                                            name="place"
                                                                            value={work[i].place}
                                                                            onChange={(e) => {
                                                                                const updatedWork = [...work];
                                                                                updatedWork[i].place = e.target.value;
                                                                                setWork(updatedWork);
                                                                            }}

                                                                        /></FormControl>


                                                                    <FormControl>
                                                                        <FormLabel>{Dep}<span style={{ color: "red" }}><span style={{ color: "red" }}>*</span></span></FormLabel>
                                                                    </FormControl>
                                                                    <FormControl>
                                                                        <Input
                                                                            type="text"
                                                                            placeholder="enter department"
                                                                            name="department"
                                                                            value={work[i].department}
                                                                            onChange={(e) => {
                                                                                const updatedWork = [...work];
                                                                                updatedWork[i].department = e.target.value;
                                                                                setWork(updatedWork);
                                                                            }}

                                                                        /></FormControl>
                                                                </SimpleGrid>
                                                                <br />


                                                                <   SimpleGrid columns={[1, 1, 1, 2]} spacing={4} >

                                                                    <FormLabel >Duties handled</FormLabel>


                                                                    <SimpleGrid columns={[1, 1, 1, 1]} spacing={2} >
                                                                        <FormControl>
                                                                            <Input
                                                                                type="text"
                                                                                placeholder=""
                                                                                value={work[i]?.duties?.[0] || ''} // Provide a default value if duties or its first element is undefined
                                                                                onChange={(e) => {
                                                                                    const updatedWork = [...work];
                                                                                    if (!updatedWork[i].duties) { // Check if duties array is undefined
                                                                                        updatedWork[i].duties = []; // Initialize duties as an empty array if it's undefined
                                                                                    }
                                                                                    updatedWork[i].duties[0] = e.target.value;
                                                                                    setWork(updatedWork);
                                                                                }}
                                                                            />
                                                                        </FormControl>


                                                                        {work[i].duties && work[i].duties.length > 1 ? (
                                                                            work[i].duties.map((item, j) => {
                                                                                if (j > 0) {
                                                                                    return (
                                                                                        <div key={j}>
                                                                                            <FormControl>
                                                                                                <Input
                                                                                                    type="text"
                                                                                                    placeholder=""
                                                                                                    value={work[i].duties[j]?.duty || ''}
                                                                                                    onChange={(e) => {
                                                                                                        const updatedWork = [...work];
                                                                                                        if (updatedWork[i].duties[j]) {
                                                                                                            updatedWork[i].duties[j].duty = e.target.value;
                                                                                                            setWork(updatedWork);
                                                                                                        }
                                                                                                    }}
                                                                                                />
                                                                                                <br />
                                                                                                <br />
                                                                                            </FormControl>
                                                                                        </div>
                                                                                    );
                                                                                } else {
                                                                                    return null; // Skip rendering the first duty
                                                                                }
                                                                            })
                                                                        ) : null}


                                                                        <SimpleGrid columns={[1, 1, 1, 4]} >
                                                                            <Button
                                                                                color="#00b0ff"
                                                                                size="sm"
                                                                                onClick={() => {
                                                                                    const updatedWork = [...work];
                                                                                    updatedWork[i].duties.push({
                                                                                        duty: "",
                                                                                    });
                                                                                    setWork(updatedWork);
                                                                                }}
                                                                            >
                                                                                Add
                                                                            </Button>

                                                                            <Button
                                                                                ml={2}
                                                                                size="sm"
                                                                                color="red"
                                                                                onClick={() => {
                                                                                    if (work[i].duties.length > 1) {
                                                                                        const updatedWork = [...work];
                                                                                        updatedWork[i].duties.pop(); // This removes the last duty, consider alternative if needed
                                                                                        setWork(updatedWork);
                                                                                    }
                                                                                }}
                                                                            >
                                                                                Delete
                                                                            </Button>

                                                                        </SimpleGrid>


                                                                    </SimpleGrid>

                                                                </SimpleGrid><br />


                                                                <SimpleGrid columns={[1, 1, 1, 2]} spacing={4} placeItems="center">
                                                                    <FormControl>
                                                                        <FormLabel>Upload Experience Certificate(pdf)<span style={{ color: "red" }}><span style={{ color: "red" }}>*</span></span></FormLabel>
                                                                    </FormControl>
                                                                    <FormControl className="space-x-2 space-y-2">
                                                                        <Input
                                                                            type="file"
                                                                            colorScheme="#00b0ff"
                                                                            w="100%"
                                                                            accept=".pdf"
                                                                            name={`${'work'}-${i}-${'certificate'}`}
                                                                            onChange={async (e) => {
                                                                                const sid = localStorage.getItem("SIDofStudentToEdit") ? localStorage.getItem("SIDofStudentToEdit") : localStorage.getItem("sid")
                                                                                const formData = new FormData();
                                                                                formData.append("file", e.target.files[0]);
                                                                                formData.append("sid", sid);
                                                                                formData.append("firstName", personal.firstName);
                                                                                formData.append("lastName", personal.lastName);
                                                                                formData.append("name", `Experience_certificate-${i + 1}}`)
                                                                                try {
                                                                                    const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                                                                                    const url = res.data.file_url;
                                                                                    const updatedWork = [...work];
                                                                                    updatedWork[i].certificate = url;
                                                                                    setWork(updatedWork);

                                                                                } catch (e) {
                                                                                    alert("Error in uploading file");
                                                                                }

                                                                            }}
                                                                        /><br />
                                                                        <Button
                                                                            color="red"
                                                                            size="sm"
                                                                            onClick={() => handleViewClick("certificate", i, "work")}
                                                                        >
                                                                            View
                                                                        </Button>
                                                                        <Button color="#00b0ff"
                                                                            size="sm"
                                                                            onClick={(e) => {

                                                                                const updatedWork = [...work];
                                                                                updatedWork[i].certificate = "";
                                                                                setWork(updatedWork);
                                                                            }}
                                                                        >
                                                                            Delete
                                                                        </Button>
                                                                    </FormControl>
                                                                </SimpleGrid><br /><br />

























                                                            </SimpleGrid>
                                                        )
                                                    }
                                                }) : ''}
                                                <br />
                                                {/* mapping ends */}

                                                <Button marginRight={2} color="#00b0ff"
                                                    onClick={() => {
                                                        const updatedWork = [...work];
                                                        updatedWork.push({
                                                            from: "",
                                                            to: "",
                                                            employer: "",
                                                            department: "",
                                                            certificate: "",
                                                        });
                                                        setWork(updatedWork);
                                                    }}

                                                >
                                                    Add
                                                </Button>
                                                <Button
                                                    color="red"
                                                    onClick={() => {
                                                        if (work.length > 1) {
                                                            const updatedWork = [...work];
                                                            updatedWork.pop();
                                                            setWork(updatedWork);
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </Button>

                                            </FormControl>
                                        </VStack>
                                    </SimpleGrid>
                                    <br />
                                    <HStack spacing={8} justify="center">

                                        <Button
                                            colorScheme="blue"
                                            leftIcon={<ChevronLeftIcon />}
                                            onClick={async (e) => {
                                                navigate('/Education');
                                            }}
                                        >
                                            back
                                        </Button>
                                        <Button
                                            color="#00b0ff"
                                            rightIcon={<ChevronRightIcon />}
                                            onClick={async (e) => {
                                                setIsSubmitted(true);
                                                window.scrollTo(0, 0);
                                                e.preventDefault();

                                                // Validate work fields before proceeding
                                                const errors = validateWorkFields();

                                                // Check if there are no errors in the "work" section before proceeding
                                                if (Object.values(errors).every((error) => !error)) {
                                                    // Save data to localStorage
                                                    localStorage.setItem("work", JSON.stringify(work));
                                                    localStorage.setItem("internship", JSON.stringify(internship));



                                                    // Navigate to the next step
                                                    navigate('/Declaration');
                                                } else {
                                                    // Display an alert with detailed error messages for the "work" section
                                                    const errorMessages = Object.entries(errors)
                                                        .map(([index, error]) =>
                                                            Object.entries(error).map(([field, message]) => `Work ${index + 1}: ${field} - ${message}`)
                                                        )
                                                        .flat()
                                                        .join("\n");

                                                    //  alert(`Form has the following validation errors:\n${errorMessages}`);
                                                    // Optionally, you can display an error message or handle validation errors here.
                                                }
                                            }}
                                        >
                                            Next
                                        </Button>
                                    </HStack>
                                </FormControl>) :




                                    searchParams.get('option') === 'no' ?

                                        (<VStack align="stretch">
                                            <FormLabel style={{ fontWeight: 'bold' }}>Internship	<span style={{ color: "red" }}>*</span></FormLabel>

                                            <Heading fontSize="sm">Internship 1</Heading>

                                            <Box className="space-y-5" borderWidth="1px" p={4} borderRadius="md">
                                                <FormControl>
                                                    <FormLabel>{from}<span style={{ color: "red" }}>*</span></FormLabel>
                                                </FormControl>
                                                <FormControl isInvalid={isSubmitted && internship[0]['from'].trim() === ""}>
                                                    <Input
                                                        type="date"
                                                        placeholder=""
                                                        value={internship[0].from}
                                                        onChange={(e) => {
                                                            const updatedInternship = [...internship];
                                                            updatedInternship[0].from = e.target.value;
                                                            setInternship(updatedInternship);
                                                        }}


                                                    />
                                                </FormControl>

                                                <FormControl>
                                                    <FormLabel> {to}<span style={{ color: "red" }}>*</span></FormLabel>
                                                </FormControl>
                                                <FormControl isInvalid={isSubmitted && internship[0]['to'].trim() === ""}>
                                                    <Input
                                                        type="date"
                                                        placeholder=""
                                                        value={internship[0].to}
                                                        onChange={(e) => {
                                                            const updatedInternship = [...internship];
                                                            updatedInternship[0].to = e.target.value;
                                                            setInternship(updatedInternship);
                                                        }}

                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>{Hos}<span style={{ color: "red" }}>*</span></FormLabel>
                                                </FormControl>
                                                <FormControl isInvalid={isSubmitted && internship[0]['hospital'].trim() === ""}>
                                                    <Input
                                                        type="text"
                                                        placeholder=""
                                                        value={internship[0].hospital}
                                                        onChange={(e) => {
                                                            const updatedInternship = [...internship];
                                                            updatedInternship[0].hospital = e.target.value;
                                                            setInternship(updatedInternship);
                                                        }}

                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>{Place}<span style={{ color: "red" }}>*</span></FormLabel>
                                                </FormControl>
                                                <FormControl isInvalid={isSubmitted && internship[0]['hospital'].trim() === ""}>
                                                    <Input
                                                        type=""
                                                        placeholder="Place,state"
                                                        value={internship[0].place}
                                                        onChange={(e) => {
                                                            const updatedInternship = [...internship];
                                                            updatedInternship[0].place = e.target.value;
                                                            setInternship(updatedInternship);
                                                        }}

                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>{Dep}<span style={{ color: "red" }}>*</span></FormLabel>
                                                </FormControl>
                                                <FormControl isInvalid={isSubmitted && internship[0]['department'].trim() === ""}>
                                                    <Input
                                                        type="text"
                                                        placeholder=""
                                                        value={internship[0].department}
                                                        onChange={(e) => {
                                                            const updatedInternship = [...internship];
                                                            updatedInternship[0].department = e.target.value;
                                                            setInternship(updatedInternship);
                                                        }}

                                                    />
                                                </FormControl>
                                               
                                                <FormControl>
                                                    <FormLabel>Upload Certificate<span style={{ color: "red" }}>*</span></FormLabel>
                                                </FormControl>
                                                <FormControl className="space-x-2" isInvalid={isSubmitted && internship[0]['certificate'].trim() === ""}>
                                                    <Input
                                                        type="file"
                                                        colorScheme="#00b0ff"
                                                        w="100%"
                                                        accept=".pdf"
                                                        name={`${'internship'}-${0}-${'certificate'}`}
                                                        marginRight={8}
                                                        onChange={async (e) => {
                                                            const sid = localStorage.getItem("SIDofStudentToEdit") ? localStorage.getItem("SIDofStudentToEdit") : localStorage.getItem("sid")
                                                            const formData = new FormData();
                                                            formData.append("file", e.target.files[0]);
                                                            formData.append("sid", sid);
                                                            formData.append("firstName", personal.firstName);
                                                            formData.append("lastName", personal.lastName);
                                                            formData.append("name", "Internship certificate-1")
                                                            try {
                                                                const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                                                                const url = res.data.file_url;
                                                                const updatedInternship = [...internship];
                                                                updatedInternship[0].certificate = url;
                                                                setInternship(updatedInternship);


                                                            } catch (e) {
                                                                alert("Error in uploading file");
                                                            }

                                                        }}

                                                    />

                                                    <Button
                                                        color="#00b0ff"

                                                        marginRight={"4%"}
                                                        onClick={e => {
                                                            window.open(internship[0].certificate, '_blank')
                                                        }}
                                                    >
                                                        View
                                                    </Button>
                                                    <Button color="red"
                                                        onClick={(e) => {

                                                            const updatedInternship = [...internship];
                                                            updatedInternship[0].certificate = "";
                                                            setInternship(updatedInternship);
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </FormControl>




                                                <div>

                                                    <FormControl>
                                                        <FormLabel>Duties handled<span style={{ color: "red" }}>*</span></FormLabel>
                                                    </FormControl>


                                                    <FormControl isInvalid={isSubmitted && internship[0].duties[0].duty.trim() === ""}>
                                                        <Input
                                                            type="text"
                                                            placeholder=""
                                                            value={internship[0].duties[0].duty}
                                                            onChange={(e) => {
                                                                const updatedInternship = [...internship];
                                                                updatedInternship[0].duties[0].duty = e.target.value;
                                                                setInternship(updatedInternship);
                                                            }}


                                                        />



                                                    </FormControl>




                                                </div>

                                                {internship[0].duties.length > 1 ? internship[0].duties.map((item, i) => {
                                                    if (i > 0) {
                                                        return (
                                                            <div key={i}>

                                                                <FormControl>
                                                                    <Input
                                                                        type="text"
                                                                        placeholder=""
                                                                        value={internship[0].duties[i].duty}
                                                                        onChange={(e) => {
                                                                            const updatedInternship = [...internship];
                                                                            updatedInternship[0].duties[i].duty = e.target.value;
                                                                            setInternship(updatedInternship);
                                                                        }}


                                                                    />
                                                                </FormControl>

                                                            </div>
                                                        )
                                                    }
                                                }) : ''}

                                                <Button
                                                    color="#00b0ff" mt={2}
                                                    size="sm"
                                                    onClick={() => {
                                                        const updatedInternship = [...internship];
                                                        updatedInternship[0].duties.push({
                                                            duty: "",

                                                        });
                                                        setInternship(updatedInternship);
                                                    }}
                                                >
                                                    Add Duty
                                                </Button>

                                                <Button mt={2} ml={2} size="sm" color="red"
                                                    onClick={() => {
                                                        if (internship[0].duties.length > 1) {
                                                            const updatedInternship = [...internship];
                                                            updatedInternship[0].duties.pop();
                                                            setInternship(updatedInternship);
                                                        }
                                                    }}

                                                >
                                                    Delete Duty
                                                </Button>

                                            </Box>
                                            <br />
                                            {internship.length > 1 ? internship.map((item, i) => {
                                                if (i > 0) {
                                                    return (
                                                        <Box key={i} borderWidth="1px" p={4} className="space-y-5" borderRadius="md">
                                                            <br /><Heading fontSize="sm">Internship {i+1}</Heading><br />

                                                            <FormControl>
                                                                <FormLabel>{from}<span style={{ color: "red" }}>*</span></FormLabel>
                                                            </FormControl>
                                                            <FormControl>
                                                                <Input
                                                                    type="date"
                                                                    placeholder=""
                                                                    value={internship[i].from}
                                                                    onChange={(e) => {
                                                                        const updatedInternship = [...internship];
                                                                        updatedInternship[i].from = e.target.value;
                                                                        setInternship(updatedInternship);
                                                                    }}


                                                                />
                                                            </FormControl>

                                                            <FormControl>
                                                                <FormLabel> {to}<span style={{ color: "red" }}>*</span></FormLabel>
                                                            </FormControl>
                                                            <FormControl>
                                                                <Input
                                                                    type="date"
                                                                    placeholder=""
                                                                    value={internship[i].to}
                                                                    onChange={(e) => {
                                                                        const updatedInternship = [...internship];
                                                                        updatedInternship[i].to = e.target.value;
                                                                        setInternship(updatedInternship);
                                                                    }}

                                                                />
                                                            </FormControl>
                                                            <FormControl>
                                                                <FormLabel>{Hos}<span style={{ color: "red" }}>*</span></FormLabel>
                                                            </FormControl>
                                                            <FormControl>
                                                                <Input
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={internship[i].hospital}
                                                                    onChange={(e) => {
                                                                        const updatedInternship = [...internship];
                                                                        updatedInternship[i].hospital = e.target.value;
                                                                        setInternship(updatedInternship);
                                                                    }}

                                                                />
                                                            </FormControl>
                                                            <FormControl>
                                                                <FormLabel>{Place}<span style={{ color: "red" }}>*</span></FormLabel>
                                                            </FormControl>
                                                            <FormControl>
                                                                <Input
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={internship[i].place}
                                                                    onChange={(e) => {
                                                                        const updatedInternship = [...internship];
                                                                        updatedInternship[i].place = e.target.value;
                                                                        setInternship(updatedInternship);
                                                                    }}

                                                                />
                                                            </FormControl>
                                                            <FormControl>
                                                                <FormLabel>{Dep}<span style={{ color: "red" }}>*</span></FormLabel>
                                                            </FormControl>
                                                            <FormControl>
                                                                <Input
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={internship[i].department}
                                                                    onChange={(e) => {
                                                                        const updatedInternship = [...internship];
                                                                        updatedInternship[i].department = e.target.value;
                                                                        setInternship(updatedInternship);
                                                                    }}

                                                                />
                                                            </FormControl>


                                                            <FormControl>
                                                                <FormLabel>Upload Certificate<span style={{ color: "red" }}>*</span></FormLabel>
                                                            </FormControl>
                                                            <FormControl className="space-x-2">
                                                                <Input
                                                                    type="file"
                                                                    colorScheme="#00b0ff"
                                                                    w="100%"
                                                                    accept=".pdf"
                                                                    name={`${'internship'}-${0}-${'certificate'}`}
                                                                    marginRight={8}
                                                                    onChange={async (e) => {
                                                                        const sid = localStorage.getItem("SIDofStudentToEdit") ? localStorage.getItem("SIDofStudentToEdit") : localStorage.getItem("sid")
                                                                        const formData = new FormData();
                                                                        formData.append("file", e.target.files[0]);
                                                                        formData.append("sid", sid);
                                                                        formData.append("firstName", personal.firstName);
                                                                        formData.append("lastName", personal.lastName);
                                                                        formData.append("name", `Internship_certificate-${i + 1}`)
                                                                        try {
                                                                            const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                                                                            const url = res.data.file_url;
                                                                            const updatedInternship = [...internship];
                                                                            updatedInternship[i].certificate = url;
                                                                            setInternship(updatedInternship);


                                                                        } catch (e) {
                                                                            alert("Error in uploading file");
                                                                        }

                                                                    }}

                                                                />

                                                                <Button
                                                                    color="#00b0ff"

                                                                    marginRight={"4%"}
                                                                    onClick={e => {
                                                                        window.open(internship[i].certificate, '_blank')
                                                                    }}
                                                                >
                                                                    View
                                                                </Button>
                                                                <Button color="red"
                                                                    onClick={(e) => {

                                                                        const updatedInternship = [...internship];
                                                                        updatedInternship[i].certificate = "";
                                                                        setInternship(updatedInternship);
                                                                    }}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </FormControl>







                                                            <div>
                                                                <FormControl>
                                                                    <FormLabel>Duties handled<span style={{ color: "red" }}>*</span></FormLabel>
                                                                </FormControl>


                                                                <FormControl>
                                                                    <Input
                                                                        type="text"
                                                                        placeholder=""
                                                                        value={internship[i].duties[0].duty}
                                                                        onChange={(e) => {
                                                                            const updatedInternship = [...internship];
                                                                            updatedInternship[i].duties[0].duty = e.target.value;
                                                                            setInternship(updatedInternship);
                                                                        }}


                                                                    />




                                                                </FormControl>




                                                            </div>

                                                            {internship[0].duties.length > 1 ? internship[i].duties.map((item, j) => {
                                                                if (j > 0) {
                                                                    return (
                                                                        <div key={j}>



                                                                            <FormControl>
                                                                                <Input
                                                                                    type="text"
                                                                                    placeholder=""
                                                                                    value={internship[i].duties[j].duty}
                                                                                    onChange={(e) => {
                                                                                        const updatedInternship = [...internship];
                                                                                        updatedInternship[i].duties[j].duty = e.target.value;
                                                                                        setInternship(updatedInternship);
                                                                                    }}


                                                                                />



                                                                            </FormControl>
                                                                        </div>
                                                                    )
                                                                }
                                                            }) : ''}

                                                            <Button
                                                                color="#00b0ff" mt={2}
                                                                size="sm"
                                                                onClick={() => {
                                                                    const updatedInternship = [...internship];
                                                                    updatedInternship[i].duties.push({
                                                                        duty: "",
                                                                        duration: "",
                                                                    });
                                                                    setInternship(updatedInternship);
                                                                }}
                                                            >
                                                                Add Duty
                                                            </Button>

                                                            <Button mt={2} ml={2} size="sm" color="red"
                                                                onClick={() => {
                                                                    if (internship[i].duties.length > 1) {
                                                                        const updatedInternship = [...internship];
                                                                        updatedInternship[i].duties.pop();
                                                                        setInternship(updatedInternship);
                                                                    }
                                                                }}

                                                            >
                                                                Delete Duty
                                                            </Button>

                                                        </Box>
                                                    )
                                                }
                                            }) : ''}


                                            <SimpleGrid columns={[1, 1, 1, 2]} spacing={1} placeItems="center">
                                                <FormControl>
                                                    <Button
                                                        marginRight={2}
                                                        color="#00b0ff"
                                                        onClick={() => {
                                                            const updatedInternship = [...internship];
                                                            updatedInternship.push({
                                                                from: "",
                                                                to: "",
                                                                hospital: "",
                                                                department: "",
                                                                certificate: "",
                                                                duties: [
                                                                    {
                                                                        duty: "",
                                                                        duration: "",
                                                                    }
                                                                ]
                                                            });
                                                            setInternship(updatedInternship);
                                                        }}
                                                    >
                                                        Add
                                                    </Button>
                                                    <Button
                                                        color="red"
                                                        onClick={() => {
                                                            if (internship.length > 1) {
                                                                const updatedInternship = [...internship];
                                                                updatedInternship.pop();
                                                                setInternship(updatedInternship);
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </FormControl>
                                            </SimpleGrid>
                                            <HStack spacing={8} justify="center">

                                                <Button
                                                    colorScheme="blue"
                                                    leftIcon={<ChevronLeftIcon />}
                                                    onClick={async (e) => {
                                                        navigate('/Education');
                                                    }}
                                                >
                                                    back
                                                </Button>
                                                <Button
                                                    color="#00b0ff"
                                                    rightIcon={<ChevronRightIcon />}
                                                    onClick={async (e) => {
                                                        setIsSubmitted(true);
                                                        window.scrollTo(0, 0);
                                                        e.preventDefault();

                                                        // Validate internship fields before proceeding
                                                        const isValidInternship = validateInternshipFields();

                                                        if (isValidInternship) {
                                                            // Save data to localStorage
                                                            localStorage.setItem("internship", JSON.stringify(internship));
                                                            localStorage.setItem("work", JSON.stringify(work));



                                                            navigate('/Declaration');
                                                        } else {

                                                        }
                                                    }}

                                                >
                                                    Next
                                                </Button>
                                            </HStack>
                                        </VStack>) : <HStack spacing={8} justify="center">
                                            <Button
                                                colorScheme="blue"
                                                leftIcon={<ChevronLeftIcon />}
                                                onClick={async () => {
                                                    navigate('/Education');
                                                }}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                color="#00b0ff" 
                                                rightIcon={<ChevronRightIcon />}
                                                onClick={async () => {
                                                    navigate('/Declaration');
                                                }}
                                            >
                                                Next
                                            </Button>
                                        </HStack>}







                        </Box>






                    </Box>
                </Stack>
                <div className="w-full sm:w-1/2 p-2 sm:pt-0">
                    <ResumeTemplate info={personal} education={education} work={work} internship={internship} />
                </div>
            </div>

        </div>

    );

};

