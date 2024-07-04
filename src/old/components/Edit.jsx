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
import RegistrationPage from "./Registration";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const ResumeForm = () => {
  const [page, setPage] = React.useState(0);
  const [isMobile] = useMediaQuery("(max-width: 798px)");
  const [token, setToken] = useState(false)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emailFromUrl = new URLSearchParams(window.location.search).get("id");
        const res = await axios({
          method: "get",
          url: `${process.env.REACT_APP_HOST}/getStudentByEmail/${emailFromUrl}`,
          headers: {
            authToken: localStorage.getItem("token")
          }
        });

        if (res.data.success === true) {
          setUser(res.data.student);

          setResumeInfo({
            ...initialState,
            ...res.data.student.resume,
            files: {
              ...initialState.files,
              _id: res.data.student.resume._id
            },
            profile: {
              ...initialState.profile,
              firstname: res.data.student.first_name,
              lastname: res.data.student.last_name,
              // father: res.data.student.resume.father,
              // father_name: res.data.student.resume.father_name,
              Country_code: "", // Add the appropriate value or leave it as an empty string
              phone: res.data.student.mobile,
              email: res.data.student.email,
              password: res.data.student.password,
              level: res.data.student.resume.german.level,
              from: res.data.student.resume.german.from,
              to: res.data.student.resume.german.to,
              certification_date: res.data.student.resume.german.certification_date,
              institute: res.data.student.resume.twelweth.institute,
              from_date: res.data.student.resume.twelweth.from_date,
              to_date: res.data.student.resume.twelweth.to_date,
              marksheet: res.data.student.resume.twelweth.marksheet,
              institute: res.data.student.resume.eleventh.institute,
              from_date: res.data.student.resume.eleventh.from_date,
              to_date: res.data.student.resume.eleventh.to_date,
              marksheet: res.data.student.resume.eleventh.marksheet,
              institute: res.data.student.resume.tenth.institute,
              from_date: res.data.student.resume.tenth.from_date,
              to_date: res.data.student.resume.tenth.to_date,
              marksheet: res.data.student.resume.tenth.marksheet,
              institute: res.data.student.resume.first_to_ninth.institute,
              from_date: res.data.student.resume.first_to_ninth.from_date,
              to_date: res.data.student.resume.first_to_ninth.to_date,
              given_name: res.data.student.resume.given_name,
              sur_name: res.data.student.resume.sur_name,
              address: res.data.student.resume.address,
              contact_number: res.data.student.resume.contact_number,
              email: res.data.student.resume.email,
              birth_date: res.data.student.resume.birth_date,
              place_of_birth: res.data.student.resume.place_of_birth,
              marital_status: res.data.student.resume.marital_status,
              gender: res.data.student.resume.gender,
              computer_skills: res.data.student.resume.computer_skills,
              hobbies: res.data.student.resume.hobbies,
              candidate: res.data.student.resume.candidate,
              passport: res.data.student.resume.passport,
              post_graduate: res.data.student.resume.post_graduate,
              under_graduate: res.data.student.resume.under_graduate,
              blank_year: res.data.student.resume.blank_year,
              languages: res.data.student.resume.languages,
              internship: res.data.student.resume.internship,
              work_experience: res.data.student.resume.work_experience,
              // ... Add other properties from the student data as needed
            },
            // ... Add other sections from the student data as needed
          });
        } else {
          alert("Log out and log in again because something went wrong");
        }
        console.log(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      setToken(true);
      fetchData();
    }
  }, [navigate]);
  

  const initialState = {
    register: {
      First_name: [],



    },
    files: {
      _id: "",
      passport: "",
      candidate: "",
      under_graduation_marksheet_1: "",
      under_graduation_marksheet_2: "",
      under_graduation_marksheet_3: "",
      post_graduation_marksheet_1: "",
      post_graduation_marksheet_2: "",
      post_graduation_marksheet_3: "",
      twelweth_marksheet: "",
      eleventh_marksheet: "",
      tenth_marksheet: "",
      signature: "",
      listening_module_marksheet: "",
      reading_module_marksheet: "",
      speaking_module_marksheet: "",
      writing_module_marksheet: "",
    },

    profile: {
      firstname: "",
      lastname: "",
      // father: " ",
      Country_code: "",
      phone: "",
      email: "",
      linkedin: "",
      github: "",
      website: "",
      address: "",
      passport_file_name: "",
      candidate: "",
      country: "",
      lang: "",
      birth: "",
      pod: "",
      pass: "",
      mari: "",
      Gender: "",
      CS: "",
      hobbi1: [],
      ComputerSkills1: [],
      Pin: "",
      game: ""
    },


    edu: {
      post_graduate: [],
      under_graduate: [],
      blank_year: [],
      University: "",

      grad: "",
      twelweth: {
        institute: "",
        from_date: "",
        to_date: "",
        marksheet: ""
      },


      eleventh: {
        institute: "",
        from_date: "",
        to_date: "",
        marksheet: ""
      },
      tenth: {
        institute: "",
        from_date: "",
        to_date: "",
        marksheet: ""
      },
      first_to_ninth: {
        institute: "",
        from_date: "",
        to_date: "",
        marksheet: ""
      },
      english_level: "",
      mother_tongue: "",
      german: {
        level: "",
        from: "",
        to: "",
        certification_date: "",
        listening_module_marksheet: "",
        reading_module_marksheet: "",
        speaking_module_marksheet: "",
        writing_module_marksheet: "",
      },

      Year1Array: [],
      from1Array: [],
      to1Array: [],
      file: [],



      Year2Array: [],

      to2Array: [],
      from2Array: [],


      to3: "",
      from3: "",
      to4: "",
      from4: "",
      to5: "",
      from5: "",
      to6: "",
      from6: "",
      to7: "",
      from7: "",
      to8: "",
      from8: "",
      quali: "",

      Ugrad: "",
      summary: "",
      skills: "",

      University1: "",
      University2: "",
      University3: "",
      University4: "",
      University5: "",
      Reason: "",
      motherT: "",
      english: "",
      level: [],
      to9: [],
      from9: [],
      Certificate: [],
      fileA: [],
      fileB: [],
      fileC: [],
      fileD: [],
    },
    personal: {
      birthday: "",
      placesOf: "",
      passport: "",
      maritial: "",
      gender: "",
      computerSkills: "",
      hobbies: "",
      summary: "",
      skills: "",
      work: [],
    },
    declaration: {
      place: "",
      country: "",
      date: "",
      signature_photo: ""
    },

    work: {
      work_experience: [],
      internship: [],
      EmpName: "",
      Dept: "",
      from: "",
      to: "",
      from2: "",
      to2: "",
      Hosp: "",
      Dept2: "",
      from2A: [],
      to2A: [],
      HospA: [],
      Dept2A: [],
      Duty: [
        {
          dut: []
        }
      ],

      Dura: [
        {
          dur: []
        }
      ],
    },

    internship: {
      from: [],
      to: [],
      Hosp_name: [],
      Dept_name: [],
      Duty: [],
      Dura: [],
    }

  };

  const [resumeInfo, setResumeInfo] = useState(initialState);

  const formPage = [
    "PERSONAL DATA/ PERSÖNLICHE ANGABEN",
    "EDUCATIONAL QUALIFICATION / SCHULISCHE QUALIFIKATION",
    "WORK EXPERIENCE / ARBEITSERFAHRUNG",
    "DECLARATION /  ERKLÄRUNG",
    "MOTIVATION LETTER",
  ];
  // const getUser = async () => {
  //   const res = await axios({
  //     method: "get",
  //     url: `${process.env.REACT_APP_HOST}/getUser`,
  //     headers: {
  //       authToken: localStorage.getItem("token")
  //     }
  //   })
  //   if (res.data.success === true) {
  //     setUser(res.data.User)
  //     setResumeInfo({
  //       ...resumeInfo, files: {
  //         ...resumeInfo.files, _id: res.data.User._id
  //       }
  //     })
  //   } else {
  //     alert("Log out and log in again because something went wrong")
  //   }
  //   console.log(res);
  // }

  const sendData = async (e) => {
    // e.preventDefault()
    // // formData.append("_id", "657301450afd17735c0f117e")
    // const resume = resumeInfo.Object.keys()

    // console.log("resumeInfo" , resumeInfo);

    const { firstname, lastname, Country_code, phone, email, passport_file_name, linkedin, passport, candidate, github, website, address, country, lang, birth, pob, pass, mari, Gender, CS, hobbi, hobbi1, ComputerSkills, ComputerSkills1 } = resumeInfo.profile

    const res1 = await axios({
      method: "post",
      url: `${process.env.REACT_APP_HOST}/createResume`,
      headers: {
        authToken: localStorage.getItem("token")
      },
      data: {
        "given_name": firstname,
        "sur_name": lastname,
        // "father_name": father,
        "address": address,
        "contact_number": phone,
        "country": country,
        "country_code": Country_code,
        "passport_no": passport,
        "passport": passport_file_name,
        "candidate": candidate,
        "email": email,
        "birth_date": birth,
        "place_of_birth": pob,
        "marital_status": mari,
        "gender": Gender,
        "computer_skills": ComputerSkills1,
        "hobbies": hobbi1,
        "language_of_resume": lang,
        "post_graduate": resumeInfo.edu.post_graduate,
        "under_graduate": resumeInfo.edu.under_graduate,
        "twelweth": resumeInfo.edu.twelweth,
        "eleventh": resumeInfo.edu.eleventh,
        "tenth": resumeInfo.edu.tenth,
        "first_to_ninth": resumeInfo.edu.first_to_ninth,
        "blank_year": resumeInfo.edu.blank_year,
        "english_level": resumeInfo.edu.english_level,
        "mother_tongue": resumeInfo.edu.mother_tongue,
        "german": resumeInfo.edu.german,
        // "languages" : [{}],
        "internship": resumeInfo.work.internship,
        "work_experience": resumeInfo.work.work_experience,
        "declaration": resumeInfo.declaration
      },
    })
    console.log(res1)
    // console.log(res1)
    console.log(resumeInfo)

    function appendToFormData(obj, formData, parentKey = '') {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          const newKey = key;
          console.log({ key, value });
          // If the value is not an object, append it to formData
          formData.append(newKey, value);
        }
      }
    }
    // formData.append("passport" , resumeInfo.files.passport)

    const formData = new FormData()
    appendToFormData(resumeInfo.files, formData);
    formData.forEach((value, key) => {
      console.log(key, value)
    })

    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_HOST}/addFiles`,
      data: formData
    })
    alert('saved successfully!')
    console.log(res);
  }

  const submit = (e) => {
    console.log(resumeInfo);
    sendData()
  }
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/")
    } else {
      setToken(true)
      // getUser()
      
    }
  }, [])

  const renderForm = () => {

    switch (page) {
      case 0:
        return (
          <BasicDetails
            resumeInfo={resumeInfo}
            setResumeInfo={setResumeInfo}
            setPage={setPage}
          />
        );

      case 1:
        return (
          <PersonalDetails
            resumeInfo={resumeInfo}
            setResumeInfo={setResumeInfo}
            setPage={setPage}
          />
        );

      case 2:
        return (
          <Educ
            resumeInfo={resumeInfo}
            setResumeInfo={setResumeInfo}
            setPage={setPage}
          />
        );




      case 3:
        return (
          <EducationDetails
            resumeInfo={resumeInfo}
            setResumeInfo={setResumeInfo}
            setPage={setPage}
          />
        );


      case 4:
        return (
          <div>
            <Motivation
              resumeInfo={resumeInfo}
              setResumeInfo={setResumeInfo}
              setPage={setPage}
            />
            <Button
              style={{marginLeft:220,
                marginTop:20
            }}
              onClick={submit}
            >Save and Submit</Button>
          </div>
        );


      default:
        return;
    }
  };

  return (
    <>
      {token ? <Stack mb="50px">
        
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
              <ResumeTemplate resumeInfo={resumeInfo} page={page} />
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
              <ResumeTemplate resumeInfo={resumeInfo} page={page} />
            </VStack>
          </HStack>
        )}
      </Stack> : ""}
    </>
  );
};

export default ResumeForm;


// EDIT****