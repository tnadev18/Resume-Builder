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
import { useLocation } from "react-router-dom";

export default function MotivationLetterEdit() {
    const navigate = useNavigate();
    const [action, setAction] = useState("create");
    const [loading, setLoading] = useState(true);
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
    const [resume, setResume] = useState({});
    const paragraphStyle = {
        color: "red",
    };

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('sid');

    //     const personal = JSON.parse(localStorage.getItem("personal"));
    //   const personalDataString = localStorage.getItem('personal');
    //   const personalData = JSON.parse(personalDataString);
    //   const firstName = personalData.firstName;
    //   const lastName = personalData.lastName;
    //   const address = personalData.address;
    //   const contactNumber = personalData.contactNumber;
    //   const email = personalData.email;

    useEffect(() => {
        async function fetchData() {

            try {
                const res = await axios.get(`https://testapi1.nursingpioneer.com/getStudent?sid=${id}`);
                console.log(res.data)
                if (res.data) {
                    setMotivation(res.data.resume.motivation)
                    setResume(res.data.resume)
                    setLoading(false)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])
    useEffect(() => {
        console.log(motivation)
    }, [motivation])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Box borderBottom="10px solid #00b0ff" mb={8} width="30%"
                mx="auto"
            >
                <Heading p={4} textAlign="center">
                    Build Your Resume
                </Heading>
            </Box>
            <div className="flex">
                <Stack className="p-2 basis-1/2">
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

                            <Input type="text" placeholder="Your Name" value={resume.personal.firstName + " " + resume.personal.lastName} />

                            <Input type="text" placeholder="Postal Address,PIN CODE, CITY" value={resume.personal.address} />

                            <Input
                                type="tel"
                                placeholder="phone number"
                                value={resume.personal.contactNumber}
                                maxLength={10}
                                pattern="[0-9]{10}"
                            />

                            <Input type="email" placeholder="Your email address" value={resume.personal.email} />
                            <br />
                            <br />
                            <br />

                            <Input
                                type="text"
                                placeholder="Name of the Adresse "
                                value={motivation.name2}
                                onChange={(e) => {
                                    setMotivation((prev) => ({ ...prev, name2: e.target.value }));
                                }}
                            />

                            <Input
                                type="text"
                                placeholder="Postal Address"
                                pattern="[0-9]{10}"
                                value={motivation.address2}
                                onChange={(e) => {
                                    setMotivation((prev) => ({ ...prev, address2: e.target.value }));
                                }}
                            />

                            <Input
                                type="text"
                                placeholder="PIN CODE, CITY"
                                value={motivation.pincode}
                                onChange={(e) => {
                                    setMotivation((prev) => ({ ...prev, pincode: e.target.value }));
                                }}
                            />
                            <br />
                            <br />
                            <br />

                            <SimpleGrid columns={[1, 1, 1, 4]} spacing={4} textAlign="Right">
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
                                        placeholder="DD-MM-YYYY"
                                        value={motivation.date}
                                        onChange={(e) => {
                                            setMotivation((prev) => ({ ...prev, date: e.target.value }));
                                        }}
                                    />
                                </FormControl>
                            </SimpleGrid>
                            <br />
                            <br />

                            <p style={paragraphStyle}>
                                Please write this letter by addressing the following questions:
                                <br />
                                1. What training would you like to complete in Germany?
                                <br />
                                2. Why do you want to complete your training in Germany?
                                <br />
                                3. What are your plans after completing your training?
                                <br />
                                4. How, where and how long have you been learning German?
                                <br />
                            </p>
                            <br />
                            <br />
                            <textarea
                                id="description"
                                style={{ border: "2px solid grey" }}
                                placeholder="Type your Letter here"
                                name="description"
                                rows="8"
                                cols="90"
                                border="1px"
                                value={motivation.description}
                                onChange={(e) => {
                                    setMotivation((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }));
                                }}
                            ></textarea>
                            <br />
                            <br />
                            <br />

                            <br />

                            <p>Best Regards</p>
                        </FormControl>

                        <FormControl>
                            <Input
                                type="text"
                                placeholder="Your Name"
                                value={resume.personal.firstName + " " + resume.personal.lastName}
                                onChange={(e) => {
                                    setMotivation((prev) => ({ ...prev, name3: e.target.value }));
                                }}
                            />
                        </FormControl>

                        <FormControl>
                            {/* <FormLabel>Signature-Image(pdf)</FormLabel> */}

                            {/* <Input
                                type="file"
                                colorScheme="#00b0ff"
                                w="100%"
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
                            <Button onClick={async (e) => {
                                setResume((prev) => ({ ...prev, motivation: motivation }));

                                try {
                                    await axios.put('https://testapi1.nursingpioneer.com/editStudentResume', { motivation: motivation, sid: id });
                                    alert('data edited successfully...')
                                }
                                catch (err) {
                                    alert('error editing data...')
                                }
                            }}>Save</Button>
                        </FormControl>
                        <br />
                        <SimpleGrid
                            columns={[1, 1, 1, 3]}
                            spacing={4}
                            placeItems="center"
                        ></SimpleGrid>


                    </Box>
                </Stack>

            </div>
        </div>
    );
}
