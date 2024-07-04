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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function MotivationLetter() {

    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const id = params.get('sid');

    const [info, setInfo] = useState({});
    const [education, setEducation] = useState({});
    const [work, setWork] = useState([]);
    const [internship, setInternship] = useState([]);
    const [loading, setLoading] = useState(true)

    // const personal = JSON.parse(localStorage.getItem("personal"));
    // const personalDataString = localStorage.getItem('personal');
    // const personalData = JSON.parse(personalDataString);
    // const firstName = personalData.firstName;
    // const lastName = personalData.lastName;
    // const address = personalData.address;
    // const contactNumber = personalData.contactNumber;
    // const email = personalData.email;


    const [resume, setResume] = useState({});

    useEffect(() => {

        console.log('fetching...')
        async function fetchData() {

            try {
                const res = await axios.get(`https://testapi1.nursingpioneer.com/getStudent?sid=${id}`);
                console.log(res.data)
                if (res.data) {
                    setResume(res.data)
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
        if (resume.resume) {

            console.log(resume.resume)
        }

    }, [resume])



    return (
        <div className="min-h-screen p-10 text-center">
            <h1 className="text-2xl font-bold mb-4">Motivation Letter</h1>

            <p className="text-xl text-left">{resume?.resume?.personal?.firstName +" " +resume?.resume?.personal?.lastName}</p>
            <p className="text-xl text-left">{resume?.resume?.personal?.address}</p>
            <p className="text-xl text-left">{resume?.resume?.personal?.email}</p>
            <p className="text-xl text-left">{resume?.resume?.personal?.contactNumber}</p>
<br/><br/>

            <p className="text-xl text-left">{resume?.resume?.motivation?.name2}</p>
            <p className="text-xl text-left">{resume?.resume?.motivation?.address2}</p>
            <p className="text-xl mb-4 text-left">{resume?.resume?.motivation?.pincode}</p>

            <p className="text-xl mb-4 text-right">{resume?.resume?.motivation?.place}, {resume?.resume?.motivation?.date} </p>


<br/><br/>

            <p className="text-xl font-bold text-left">Motivation Letter</p>
            <br/>

            <p className="text-xl text-left">
                Please write this letter by addressing the following questions:<br/>
                1. What training would you like to complete in Germany?<br/>
                2. Why do you want to complete your training in Germany?<br/>
                3. What are your plans after completing your training?<br/>
                4. How, where and how long have you been learning German?<br/>
            </p>
            <br/>
            <p className="text-lg text-left">{resume?.resume?.motivation?.description}</p>
<br/><br/>
            <p className="text-xl text-left">Best regards,</p>
            <p className="text-xl font-bold text-left">{`${resume?.resume?.motivation?.name3}`}</p>
<br/><br/><br/>
            <p className="text-xl text-left">Signature</p>
            <Button id="print" className="mt-10 text-left" onClick={e=>{window.print()}}>Download</Button>
        </div>
    );
};

