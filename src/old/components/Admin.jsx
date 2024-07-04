import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Heading, Table, Thead, Tbody, Tr, Th, Td, FormControl, Select, Button, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner,faThumbsUp,faThumbsDown,faTrash} from '@fortawesome/free-solid-svg-icons';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Admin = ({ changeAction }) => {

  const headingStyle = {
    textAlign: 'center',
  };

  

  const { isOpen, onOpen, onClose, } = useDisclosure();
  const [loadingStates_approve, setLoadingStates_approve] = useState({});
  const [loadingStates_disapprove, setLoadingStates_disapprove] = useState({});

  const host = `https://testapi1.nursingpioneer.com/`

  const navigate = useNavigate();
  useEffect(() => {
    // console.log('admin'+ localStorage.getItem('aid'))
    if (!localStorage.getItem("aid")) {
      navigate('/adminlogin');
    }
  }, [])

  const [resumes, setResumes] = useState([]);
  const [disApproveComment, setDisAppoveComment] = useState('')
  const [popUp, setPopUp] = useState(false)
  const [disApproveStudent, setDisAppoveStudent] = useState(null)
  const [approved, setApproved] = useState(null);
  const [job, setJob] = useState(null);
  const [Apprenticeship, setApprenticeship] = useState(null);
  const [disApprovedResumes, setDisApprovedResumes] = useState(null)
  const [current, setCurrent] = useState("resumes")
  const [id, setId] = useState('');

  const [loading, setLoading] = useState(false);

  const approveResume = async (SID) => {
    try {
      // Set the loading state for the specific resume to true
      setLoadingStates_approve((prevLoadingStates) => ({
        ...prevLoadingStates,
        [SID]: true,
      }));

      const res1 = await axios({
        method: "get",
        url: `${host}/sendApproveNew?sid=${SID}`,
      });

      alert("Resume approved");
      window.location.reload();
      getAllResumes();
    } catch (err) {
      alert("Something went wrong");
    } finally {
      // Set the loading state for the specific resume to false
      setLoadingStates_approve((prevLoadingStates) => ({
        ...prevLoadingStates,
        [SID]: false,
      }));
    }

  };

  const disApproveResume = async () => {
    // const SID = disApproveStudent.sid;
    try {
      setLoadingStates_disapprove((prevLoadingStates) => ({
        ...prevLoadingStates,
        [disApproveStudent.sid]: true,
      }));

      const res1 = await axios({
        method: 'get',
        url: `${host}/sendDisapproveNew?sid=${disApproveStudent.sid}&comment=${disApproveComment}`,
      });

      setPopUp(false);
      alert('Resume Disapproved');
      window.location.reload();
      getAllResumes();
    } catch (err) {
      alert('Something went wrong');
    } finally {
      setLoadingStates_disapprove((prevLoadingStates) => ({
        ...prevLoadingStates,
        [disApproveStudent.sid]: false,
      }));
    }
  };

  const getAllResumes = async () => {
    const res = await axios({
      method: "get",
      url: `https://testapi1.nursingpioneer.com/getAllStudentsResume`,
      // headers : {
      //   authToken : localStorage.getItem("token")
      // }
    })
    // if(res.data.success === true){
    setResumes(res.data.resumes)
    console.log(res.data.resumes);
    // }
    // console.log(res);
  }

  const getAllDisApprovedResumes = async () => {
    console.log({ "start": resumes });
    const res = await axios({
      method: "get",
      url: `${host}/getAllStudentsResume`,
    })
    const st = res.data.resumes.filter((ele) => {
      return ele.isApproved === "Disapproved"
    })
    setDisApprovedResumes(st)
    console.log("kr to raha hun");
  }

  const getAllApprovedResumes = async () => {
    const res = await axios({
      method: "get",
      url: `${host}/getAllStudentsResume`,
    })
    const st = res.data.resumes.filter((ele) => {
      return ele.isApproved === "Approved"
    })
    setApproved(st)
  }

  const getJobTypeResume = async () => {
    const res = await axios.get(`${host}/getAllStudentsResume`);
    const jt = res.data.resumes.filter(e => e.personal.jobType === 'Job')
    setJob(jt);
  }
  useEffect(()=>{
    console.log('job',job)
  },[job])
  const getApprenticeship = async () => {
    const res = await axios.get(`${host}/getAllStudentsResume`);
    const jt = res.data.resumes.filter(e => {
      return e.personal.jobType === 'Apprenticeship'
    })
    setApprenticeship(jt);
  }



  const deleteResume = async (SID) => {
    const res = await axios({
      method: "get",
      url: `${host}/deleteResume?sid=${SID}`,
    })
    if (res.data.success === true) {
      console.log(res.data);
      getAllResumes()
      alert("Resume Deleted");
      window.location.reload();
    }
  }
  const [checkFields, setCheckFields] = useState({
    personal: false,
    education: false,
    work: false,
  })

  function checkAcademicYear(array, year_no) {
    console.log(array);
    const filteredArr = array.filter((ele) => {
      console.log({
        ele: ele.yearSem,
        year_no
      });
      return ele.yearSem === year_no
    })
    return filteredArr[0]
  }

  useEffect(() => {

    getAllResumes()
    getAllDisApprovedResumes()
    getAllApprovedResumes()
    getJobTypeResume();
    getApprenticeship();
  }, [])

  function handleCheck(e) {
    // const v = e.target.value;
    if (checkFields[e.target.value] === false) {
      setCheckFields({ ...checkFields, [e.target.value]: true })
    } else {
      setCheckFields({ ...checkFields, [e.target.value]: false })
    }
  }
  useEffect(() => {
    console.log(checkFields);
  }, [checkFields])

  const [checkboxes, setCheckboxes] = useState({
    "Candidate Photo": false,
    "Passport Photo": false,
    "Post Graduation": false,
    "Under Graduation": false,
    "12th and": false,
    "10th": false,
    "listening": false,
    "speaking": false,
    "reading": false,
    "writing": false,
    "Work Experience": false,
    "Internship Certificate": false,
    "Motivation Letter": false
  });

  const handleCheckboxChange = (name) => {
    setCheckboxes(prevState => ({
      ...prevState,
      [name]: !prevState[name] // Toggle the checkbox value
    }));
  };
  const handleDownload = () => {

  }

  const [currentModal, setCurrentModal] = useState();

  

  return (
    <ChakraProvider >
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Click to view</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='flex flex-col'>


            {/* Render checkboxes using state */}
            {/* {Object.keys(checkboxes).map(name => (
              <label key={name}>
                <input
                  type="checkbox"
                  name={name}
                  checked={checkboxes[name]}
                  onChange={() => handleCheckboxChange(name)}
                />
                {name}
              </label>
            ))} */}

            <label><a style={{ color: 'black', textDecoration: 'none' }} target='_blank' href={currentModal?.personal.candidatePhoto} name="Candidate Photo" onMouseOver={(e) => e.target.style.color = 'blue'} onMouseOut={(e) => e.target.style.color = 'black'}>Candidate Photo</a></label>
            <label><a style={{ color: 'black', textDecoration: 'none' }} target='_blank' href={currentModal?.personal.passport} name="Passport Photo" onMouseOver={(e) => e.target.style.color = 'blue'} onMouseOut={(e) => e.target.style.color = 'black'}>Passport Photo</a></label>
            <label><a style={{ color: 'black', textDecoration: 'none' }} target='_blank' href={currentModal?.education.postGraduation[0].marksheet} name="Post Graduation" onMouseOver={(e) => e.target.style.color = 'blue'} onMouseOut={(e) => e.target.style.color = 'black'}>Post Graduation</a></label>
            <label><a style={{ color: 'black', textDecoration: 'none' }} target='_blank' href={currentModal?.education.underGraduation[0].marksheet} name="Under Graduation" onMouseOver={(e) => e.target.style.color = 'blue'} onMouseOut={(e) => e.target.style.color = 'black'}>Under Graduation</a></label>
            <label><a style={{ color: 'black', textDecoration: 'none' }} target='_blank' href={currentModal?.education.twelthStandard[0].marksheet} name="12th " onMouseOver={(e) => e.target.style.color = 'blue'} onMouseOut={(e) => e.target.style.color = 'black'}>12th</a></label>
            <label><a style={{ color: 'black', textDecoration: 'none' }} target='_blank' href={currentModal?.education.tenthStandard[0].marksheet} name="10th" onMouseOver={(e) => e.target.style.color = 'blue'} onMouseOut={(e) => e.target.style.color = 'black'}>10th</a></label>
            <label><a style={{ color: 'black', textDecoration: 'none' }} target='_blank' href={currentModal?.education.german[0].listeningMarksheet} name="listening" onMouseOver={(e) => e.target.style.color = 'blue'} onMouseOut={(e) => e.target.style.color = 'black'}>Listening</a></label>
            <label><a style={{ color: 'black', textDecoration: 'none' }} target='_blank' href={currentModal?.education.german[0].speakingMarksheet} name="speaking" onMouseOver={(e) => e.target.style.color = 'blue'} onMouseOut={(e) => e.target.style.color = 'black'}>Speaking</a></label>
            <label><a style={{ color: 'black', textDecoration: 'none' }} target='_blank' href={currentModal?.education.german[0].readingMarksheet} name="reading" onMouseOver={(e) => e.target.style.color = 'blue'} onMouseOut={(e) => e.target.style.color = 'black'}>Reading</a></label>
            <label><a style={{ color: 'black', textDecoration: 'none' }} target='_blank' href={currentModal?.education.german[0].writingMarksheet} name="writing" onMouseOver={(e) => e.target.style.color = 'blue'} onMouseOut={(e) => e.target.style.color = 'black'}>Writing</a></label>
            <label><a style={{ color: 'black', textDecoration: 'none' }} target='_blank' href={currentModal?.work[0].certificate} name="Work Experience" onMouseOver={(e) => e.target.style.color = 'blue'} onMouseOut={(e) => e.target.style.color = 'black'}>Work Experience</a></label>
            <label><a style={{ color: 'black', textDecoration: 'none' }} target='_blank' href={currentModal?.internship[0].certificate} name="Internship Certificate" onMouseOver={(e) => e.target.style.color = 'blue'} onMouseOut={(e) => e.target.style.color = 'black'}>Internship Certificate</a></label>

            <button style={{ position: 'absolute', bottom: '10px', right: '10px', border: '1px solid', padding: '10px', background: 'transparent' }} onClick={async (e) => {
              const res = await axios.get(`https://testapi1.nursingpioneer.com/downloadZip?uid=${currentModal.sid}`);
              const url = res.data.zip;
              const data = axios.get(url, {
                responseType: 'blob'
              }).then((response) => {
                // create file link in browser's memory
                const href = URL.createObjectURL(response.data);
              
                // create "a" HTML element with href to file & click
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', `${currentModal.personal.lastName.toUpperCase()}_${currentModal.personal.firstName}_all_documents.zip`); //or any other extension
                document.body.appendChild(link);
                link.click();
              
                // clean up "a" element & remove ObjectURL
                document.body.removeChild(link);
                URL.revokeObjectURL(href);
              });
            }}>
              Download All
            </button>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button> */}
            {/* <Button colorScheme='blue' mr={3} onClick={handleDownload}>Download</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Your loading overlay */}
      {/* {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              border: '4px solid rgba(0, 0, 0, 0.1)',
              borderLeft: '4px solid #3498db',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 1s linear infinite',
            }}
          ></div>
          Loading...
        </div>
      )} */}
      <FormControl className='flex justify-end'>

        <Select
          backgroundColor={'#f1f1f1'}
          className=''
          placeholder="Select an option"
          style={{ border: '1px solid black' }}
          onChange={(e) => {
            setCurrent(e.target.value)
            // const updateValue = {
            //   ...resumeInfo.edu,
            //   post_graduate : [
            //     ...resumeInfo.edu.post_graduate , {...post_graduate[0], year_no : e.target.value }
            //   ],
            // };
            // const updateResumeInfo = { ...resumeInfo, edu: updateValue };
            // setResumeInfo(updateResumeInfo);
          }}
        >
          <option value="resumes" selected>All</option>
          <option value="approvedResumes">Approved</option>
          <option value="disApprovedResumes">DisApproved</option>
          <option value="Job">Job</option>
          <option value="Apprenticeship">Apprenticeship</option>


        </Select>

        <Button
          onClick={e => { navigate('/adminregister') }}
          style={{ backgroundColor: '#00b0ff', color: 'white' }}
        >
          Register Admin
        </Button>

      </FormControl>

      {current === "resumes" ? resumes !== null && resumes.length > 0 ? <> <Heading mb="4" mt="10" style={headingStyle}>- Registered Students -</Heading> <Box textAlign="center" p="8" marginBottom={'4%'} overflowX={"scroll"} >
        {/* <Heading mb="4">Registered Students</Heading> */}
        <Table variant="simple" >
          <div style={{ maxHeight: '700px', overflowX: 'hidden' }}>
            <Thead position="sticky" top="0" bg="white" zIndex="1">
              <Tr bg="#00b0ff" >
                <Th color="White">Name</Th>
                {/* <Th color="White">Father's Name</Th> */}
                <Th color="White">Mobile-no</Th>
                <Th color="White">Email-id</Th>
                {/* <Th color="White">Passport Photo</Th> */}
                {/* <Th color="White">Candidate Photo</Th> */}
                <Th color="White">View More</Th>
                <Th color="White">Download CV</Th>
                {/* <Th color="White">Download filter CV</Th> */}
                {/* <Th color="White">Academic Year / Semester</Th> */}
                {/* <Th color="White">Post graduate Marksheet</Th> */}
                {/* <Th color="White">Undergraduate/ Diploma Marksheet</Th> */}
                {/* <Th color="White">12th Marksheet</Th> */}
                {/* <Th color="White">11th Marksheet</Th> */}
                {/* <Th color="White">10th Marksheet</Th> */}
                {/* <Th color="White">Language level</Th> */}
                {/* <Th color="White">listening</Th> */}
                {/* <Th color="White">speaking</Th> */}
                {/* <Th color="White">reading</Th> */}
                {/* <Th color="White">writing</Th> */}
                {/* <Th color="White">Employer</Th> */}
                {/* <Th color="White">Work Experience Certificate</Th> */}
                {/* <Th color="White">Hospital Name</Th> */}
                {/* <Th color="White">Internship</Th> */}
                {/* <Th color="White">Internship Certificate</Th> */}
                <Th color="White">Motivation Letter</Th>
                {/* <Th color="White">Download All Documents</Th> */}
                <Th color="White">View and Download Documents</Th>
                <Th color="White">Actions</Th>
                {/* <Th color="White">Disapprove</Th>
                <Th color="White">Delete</Th> */}
              </Tr>
            </Thead>


            <Tbody >
              {resumes.map((resume, i) => (

                <Tr key={resume.sid} bg={i % 2 === 0 ? 'white' : 'gray.100'}>
                  <Td style={{ whiteSpace: 'nowrap' }}>{resume.personal.firstName + " " + resume.personal.lastName}</Td>                  {/* <Td >
                    {resume.personal.firstName}
                  </Td> */}
                  {/* <Td> */}
                    {/* <Link to={`/view/${student.id}`} color="#00b0ff"> */}
                    {/* {resume.personal.fatherName} */}
                    {/* </Link> */}
                  {/* </Td> */}
                  <Td>
                    {/* <Link to={`/view/${student.id}`} color="#00b0ff"> */}
                    {resume.personal.contactNumber}
                    {/* </Link> */}

                  </Td>
                  <Td>
                    {resume.personal.email}
                  </Td>
                  {/* <Td >
                    <a href={`${resume.personal.passport}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='whitespace-nowrap block'>
                      View and Download
                    </a>
                  </Td> */}
                  {/* <Td>
                    <a href={`${resume.personal.candidatePhoto}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='whitespace-nowrap block'> View and Download
                    </a>
                  </Td> */}
                  <Td>
                    {/* <a href={`/personal`}> */}
                    <button
                      onClick={() => {
                        changeAction("editByAdmin")
                        localStorage.setItem("personal", JSON.stringify(resume.personal))
                        localStorage.setItem("education", JSON.stringify(resume.education))
                        localStorage.setItem("work", JSON.stringify(resume.work));
                        localStorage.setItem("internship", JSON.stringify(resume.internship));
                        localStorage.setItem("declaration", JSON.stringify(resume.declaration));
                        localStorage.setItem("motivation", JSON.stringify(resume.motivation));
                        localStorage.setItem("SIDofStudentToEdit", resume.sid);
                        localStorage.setItem("sid", resume.sid);

                        navigate("/personal")
                      }}
                    >View{'\u00A0'}More</button>
                    <br />
                    <br />
                    <button
                      onClick={() => {
                        changeAction("editByAdmin")
                        localStorage.setItem("personal", JSON.stringify(resume.personal))
                        localStorage.setItem("education", JSON.stringify(resume.education))
                        localStorage.setItem("work", JSON.stringify(resume.work));
                        localStorage.setItem("internship", JSON.stringify(resume.internship));
                        localStorage.setItem("declaration", JSON.stringify(resume.declaration));
                        localStorage.setItem("motivation", JSON.stringify(resume.motivation));
                        localStorage.setItem("SIDofStudentToEdit", resume.sid);
                        localStorage.setItem("sid", resume.sid);
                        console.log(resume.sid)
                        console.log("barseeeeeeeeeeeeeeeeeeeee")
                        navigate("/personal")
                        
                      }}
                    >Edit</button>
                    {/* </a> */}
                  </Td>
                  {/* <Td >
                      <a href={`/cv?email=${resume.email}`}><button >Download Full CV</button></a>
                  </Td>
                  <Td>
                  <button >Download Filtered CV</button>
                  </Td> */}
                  <Td>
                    <a href={`/resume?sid=${resume.sid}`}><Button variant={'ghost'}>Full CV</Button></a>
                    <br />
                    <a href={`/filteredcv?sid=${resume.sid}`}><Button variant={'ghost'}>Filtered CV</Button></a>
                  </Td>
                  {/* <Td >
                    <p className='min-w-max h-[50px]'>Year 3/ semester 3</p>
                    <p className='min-w-max h-[50px]'>Year 2/ semester 2</p>
                    <p className='min-w-max h-[50px]'>Year 1/ semester 1</p>
                  </Td> */}

                  {/* <Td >

                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.postGraduation, "Year 3/Semester 3") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 3/Semester 3").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.postGraduation, "Year 2/Semester 2") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 2/Semester 2").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.postGraduation, "Year 1/Semester 1") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 1/Semester 1").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                  </Td> */}
                  {/* <Td >

                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.underGraduation, "Year 3/Semester 3") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 3/Semester 3").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.underGraduation, "Year 2/Semester 2") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 2/Semester 2").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.underGraduation, "Year 1/Semester 1") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 1/Semester 1").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                  </Td> */}
                  {/* <Td>
                    <a href={`${resume.education.twelthStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                      View and Download
                    </a>
                  </Td> */}
                  {/* <Td>
                    <a href={`${resume.education.eleventhStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                      View and Download
                    </a>
                  </Td>
                  <Td>
                    <a href={`${resume.education.tenthStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                      View and Download
                    </a>
                  </Td> */}
                  {/* <Td> */}
                    {/* <div className='flex flex-col gap-3 items-center'> */}
                      {/* { */}
                        {/* resume.education.german.map((ele) => { */}
                          {/* return <p> */}
                            {/* {ele.level} */}
                          {/* </p> */}
                        {/* // }) */}
                      {/* } */}
                    {/* </div> */}
                  {/* </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.listeningMarksheet) {
                            return <a href={`${ele.listeningMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              listening module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.readingMarksheet) {
                            return <a href={`${ele.readingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              Reading module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.speakingMarksheet) {
                            return <a href={`${ele.speakingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              Speaking module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.writingMarksheet) {
                            return <a href={`${ele.writingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              Writing module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}

                  {/* <Td>
                    <div className='flex flex-col items-center gap-3'>
                      <p color="#00b0ff" className='block whitespace-nowrap'>
                        Current/last
                      </p>
                      <p color="#00b0ff" className='block whitespace-nowrap'>
                        Employer 1
                      </p>
                      <p className='block whitespace-nowrap'>
                        Employer2
                      </p>
                    </div>
                  </Td> */}
                  {/* <Td >
                    <div className='flex flex-col items-center gap-3'>
                      {resume.work.length > 0 ? <a href={`${resume.work[0]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.work.length > 1 ? <a href={`${resume.work[1]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.work.length > 2 ? <a href={`${resume.work[2]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p>&nbsp;&nbsp;&nbsp;</p>}
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col items-center gap-3'>
                      {resume.internship.length > 0 ? <div className='flex gap-2'>
                        <p className='whitespace-nowrap  pr-2'>{resume.internship[0].hospital}</p> */}
                        {/* {resume.internship[0].certificate ? <a href={`${resume.internship[0]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p className='whitespace-nowrap'>Certificate &nbsp;&nbsp;&nbsp;</p>} */}
                      {/* </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 1 ? <div className='flex gap-2'>
                        <p className='whitespace-nowrap  pr-2'>{resume.internship[1].hospital}</p> */}
                        {/* {resume.internship[1].certificate ? <a href={`${resume.internship[1]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p className='whitespace-nowrap'>Certificate &nbsp;&nbsp;&nbsp;</p>} */}
                      {/* </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 2 ? <div className='flex gap-2'>
                        <p className='whitespace-nowrap  pr-2'>{resume.internship[2].hospital}</p> */}
                        {/* {resume.internship[2].certificate ? <a href={`${resume.internship[2]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p className='whitespace-nowrap'>Certificate &nbsp;&nbsp;&nbsp;</p>} */}
                      {/* </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col items-center gap-3'>
                      {resume.internship.length > 0 ? <div className='flex gap-2'>
                        {resume.internship[0].certificate ? <a href={`${resume.internship[0]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                          View and Download
                        </a> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 1 ? <div className='flex gap-2'>
                        {resume.internship[1].certificate ? <a href={`${resume.internship[1]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                          View and Download
                        </a> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 2 ? <div className='flex gap-2'>
                        {resume.internship[2].certificate ? <a href={`${resume.internship[2]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                          View and Download
                        </a> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                    </div>
                  </Td> */}
                  <Td className='flex flex-col items-center justify-center space-y-2'>
                    <Link to={`/motivationletter?sid=${resume.sid}`}>View and Download</Link>
                    <br />
                    <Link to={`/motivationletteredit?sid=${resume.sid}`}>Edit</Link>
                  </Td>
                  {/* <Td>
                    <button onClick={async (e) => {
                      const res = await axios.get(`https://testapi1.nursingpioneer.com/downloadZip?uid=${resume.sid}`);
                      const url = res.data.zip;
                      const data = axios.get(url, {
                        responseType: 'blob'
                      }).then((response) => {
                        // create file link in browser's memory
                        const href = URL.createObjectURL(response.data);

                        // create "a" HTML element with href to file & click
                        const link = document.createElement('a');
                        link.href = href;
                        link.setAttribute('download', `${resume.personal.lastName.toUpperCase()}${resume.personal.firstName}-all.zip`); //or any other extension
                        document.body.appendChild(link);
                        link.click();

                        // clean up "a" element & remove ObjectURL
                        document.body.removeChild(link);
                        URL.revokeObjectURL(href);
                      });

                    }}>
                      Download All
                    </button>
                  </Td> */}
                  <Td>
                    <Button onClick={e => {
                      onOpen();
                      // localStorage.setItem('currentModal', JSON.stringify(resume))
                      setCurrentModal(resume)
                    }}>Open</Button>
                  </Td>
                <Td>
                <div key={resume.sid} className="flex space-x-2">
                  {/* Individual "Approve" button with loading spinner */}
                  <button
                    className='p-2 bg-green-700 rounded-md text-white border-green-500 border-2'
                    onClick={() => approveResume(resume.sid)}
                    disabled={loadingStates_approve[resume.sid]}
                  >
                    {loadingStates_approve[resume.sid] ? (
                      <span>
                        <FontAwesomeIcon icon={faSpinner} spin />
                      </span>
                    ) : (
                      <FontAwesomeIcon icon={faThumbsUp} />
                    )}
                  </button>
                  
                  <button
                    className="p-2 bg-yellow-600 rounded-md text-white"
                    onClick={() => {
                      setPopUp(true);
                      setDisAppoveStudent(resume);
                    }}
                  >
                    {loadingStates_disapprove[resume.sid] ? (
                      <span>
                        <FontAwesomeIcon icon={faSpinner} spin />
                      </span>
                    ) : (
                      <FontAwesomeIcon icon={faThumbsDown} />
                    )}
                  </button>
                  
                  <button
                    className="p-2 bg-red-700 rounded-md text-white"
                    onClick={() => deleteResume(resume.sid)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </Td>
                </Tr>
              ))}
            </Tbody>
          </div>
        </Table>
      </Box></> : <h2 className='text-center text-5xl'>No Resume to show</h2> : null}
      {current === "approvedResumes" ? approved !== null && approved.length > 0 ? <><Heading mb="4" mt="10" style={headingStyle}>- Approved Students -</Heading> <Box textAlign="center" p="8" marginBottom={'4%'} overflowX={"scroll"} >
        {/* <Heading mb="4">Approved Students</Heading> */}
        <Table variant="simple" >
          <div style={{ maxHeight: '700px', overflowX: 'hidden' }}>
            <Thead position="sticky" top="0" bg="white" zIndex="1">
              <Tr bg="#00b0ff" >
                <Th color="White">Name</Th>
                {/* <Th color="White">Father's Name</Th> */}
                <Th color="White">Mobile-no</Th>
                <Th color="White">Email-id</Th>
                {/* <Th color="White">Passport Photo</Th> */}
                {/* <Th color="White">Candidate Photo</Th> */}
                <Th color="White">View More</Th>
                <Th color="White">Download CV</Th>
                {/* <Th color="White">Download filter CV</Th> */}
                {/* <Th color="White">Academic Year / Semester</Th> */}
                {/* <Th color="White">Post graduate Marksheet</Th> */}
                {/* <Th color="White">Undergraduate/ Diploma Marksheet</Th> */}
                {/* <Th color="White">12th Marksheet</Th> */}
                {/* <Th color="White">11th Marksheet</Th> */}
                {/* <Th color="White">10th Marksheet</Th> */}
                {/* <Th color="White">Language level</Th> */}
                {/* <Th color="White">listening</Th> */}
                {/* <Th color="White">speaking</Th> */}
                {/* <Th color="White">reading</Th> */}
                {/* <Th color="White">writing</Th> */}
                {/* <Th color="White">Employer</Th> */}
                {/* <Th color="White">Work Experience Certificate</Th> */}
                {/* <Th color="White">Hospital Name</Th> */}
                {/* <Th color="White">Internship</Th> */}
                {/* <Th color="White">Internship Certificate</Th> */}
                <Th color="White">Motivation Letter</Th>
                {/* <Th color="White">Download All Documents</Th> */}
                <Th color="White">View and Download Documents</Th>
                <Th color="White">Actions</Th>
                {/* <Th color="White">Disapprove</Th>
                <Th color="White">Delete</Th> */}
              </Tr>
            </Thead>


            <Tbody >
              {approved.map((resume, i) => 
              (

                <Tr key={resume.sid} bg={i % 2 === 0 ? 'white' : 'gray.100'}>
                  <Td style={{ whiteSpace: 'nowrap' }}>{resume.personal.firstName + " " + resume.personal.lastName}</Td>
                  {/* <Td >
                    {resume.personal.firstName}
                  </Td> */}
                  {/* <Td> */}
                    {/* <Link to={`/view/${student.id}`} color="#00b0ff"> */}
                    {/* {resume.personal.fatherName} */}
                    {/* </Link> */}
                  {/* </Td> */}
                  <Td>
                    {/* <Link to={`/view/${student.id}`} color="#00b0ff"> */}
                    {resume.personal.contactNumber}
                    {/* </Link> */}

                  </Td>
                  <Td>
                    {resume.personal.email}
                  </Td>
                  {/* <Td >
                    <a href={`${resume.personal.passport}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='whitespace-nowrap block'>
                      View and Download
                    </a>
                  </Td> */}
                  {/* <Td>
                    <a href={`${resume.personal.candidatePhoto}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='whitespace-nowrap block'> View and Download
                    </a>
                  </Td> */}
                  <Td>
                    {/* <a href={`/personal`}> */}
                    <button
                      onClick={() => {
                        changeAction("editByAdmin")
                        localStorage.setItem("personal", JSON.stringify(resume.personal))
                        localStorage.setItem("education", JSON.stringify(resume.education))
                        localStorage.setItem("work", JSON.stringify(resume.work));
                        localStorage.setItem("internship", JSON.stringify(resume.internship));
                        localStorage.setItem("declaration", JSON.stringify(resume.declaration));
                        localStorage.setItem("motivation", JSON.stringify(resume.motivation));
                        localStorage.setItem("SIDofStudentToEdit", resume.sid);
                        localStorage.setItem("sid", resume.sid);

                        navigate("/personal")
                      }}
                    >View{'\u00A0'}More</button>
                    <br />
                    <br />
                    <button
                      onClick={() => {
                        changeAction("editByAdmin")
                        localStorage.setItem("personal", JSON.stringify(resume.personal))
                        localStorage.setItem("education", JSON.stringify(resume.education))
                        localStorage.setItem("work", JSON.stringify(resume.work));
                        localStorage.setItem("internship", JSON.stringify(resume.internship));
                        localStorage.setItem("declaration", JSON.stringify(resume.declaration));
                        localStorage.setItem("motivation", JSON.stringify(resume.motivation));
                        localStorage.setItem("SIDofStudentToEdit", resume.sid);
                        localStorage.setItem("sid", resume.sid);

                        navigate("/personal")
                      }}
                    >Edit</button>
                    {/* </a> */}
                  </Td>
                  {/* <Td >
                      <a href={`/cv?email=${resume.email}`}><button >Download Full CV</button></a>
                  </Td>
                  <Td>
                  <button >Download Filtered CV</button>
                  </Td> */}
                  <Td>
                    <a href={`/resume?sid=${resume.sid}`}><Button variant={'ghost'}>Full CV</Button></a>
                    <br />
                    <a href={`/filteredcv?sid=${resume.sid}`}><Button variant={'ghost'}>Filtered CV</Button></a>
                  </Td>
                  {/* <Td >
                    <p className='min-w-max h-[50px]'>Year 3/ semester 3</p>
                    <p className='min-w-max h-[50px]'>Year 2/ semester 2</p>
                    <p className='min-w-max h-[50px]'>Year 1/ semester 1</p>
                  </Td> */}

                  {/* <Td >

                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.postGraduation, "Year 3/Semester 3") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 3/Semester 3").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.postGraduation, "Year 2/Semester 2") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 2/Semester 2").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.postGraduation, "Year 1/Semester 1") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 1/Semester 1").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                  </Td> */}
                  {/* <Td >

                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.underGraduation, "Year 3/Semester 3") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 3/Semester 3").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.underGraduation, "Year 2/Semester 2") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 2/Semester 2").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.underGraduation, "Year 1/Semester 1") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 1/Semester 1").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                  </Td> */}
                  {/* <Td>
                    <a href={`${resume.education.twelthStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                      View and Download
                    </a>
                  </Td> */}
                  {/* <Td>
                    <a href={`${resume.education.eleventhStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                      View and Download
                    </a>
                  </Td>
                  <Td>
                    <a href={`${resume.education.tenthStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                      View and Download
                    </a>
                  </Td> */}
                  {/* <Td> */}
                    {/* <div className='flex flex-col gap-3 items-center'> */}
                      {/* { */}
                        {/* resume.education.german.map((ele) => { */}
                          {/* return <p> */}
                            {/* {ele.level} */}
                          {/* </p> */}
                        {/* }) */}
                      {/* } */}
                    {/* </div> */}
                  {/* </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.listeningMarksheet) {
                            return <a href={`${ele.listeningMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              listening module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.readingMarksheet) {
                            return <a href={`${ele.readingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              Reading module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.speakingMarksheet) {
                            return <a href={`${ele.speakingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              Speaking module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.writingMarksheet) {
                            return <a href={`${ele.writingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              Writing module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}

                  {/* <Td>
                    <div className='flex flex-col items-center gap-3'>
                      <p color="#00b0ff" className='block whitespace-nowrap'>
                        Current/last
                      </p>
                      <p color="#00b0ff" className='block whitespace-nowrap'>
                        Employer 1
                      </p>
                      <p className='block whitespace-nowrap'>
                        Employer2
                      </p>
                    </div>
                  </Td> */}
                  {/* <Td >
                    <div className='flex flex-col items-center gap-3'>
                      {resume.work.length > 0 ? <a href={`${resume.work[0]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.work.length > 1 ? <a href={`${resume.work[1]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.work.length > 2 ? <a href={`${resume.work[2]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p>&nbsp;&nbsp;&nbsp;</p>}
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col items-center gap-3'>
                      {resume.internship.length > 0 ? <div className='flex gap-2'>
                        <p className='whitespace-nowrap  pr-2'>{resume.internship[0].hospital}</p> */}
                        {/* {resume.internship[0].certificate ? <a href={`${resume.internship[0]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p className='whitespace-nowrap'>Certificate &nbsp;&nbsp;&nbsp;</p>} */}
                      {/* </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 1 ? <div className='flex gap-2'>
                        <p className='whitespace-nowrap  pr-2'>{resume.internship[1].hospital}</p> */}
                        {/* {resume.internship[1].certificate ? <a href={`${resume.internship[1]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p className='whitespace-nowrap'>Certificate &nbsp;&nbsp;&nbsp;</p>} */}
                      {/* </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 2 ? <div className='flex gap-2'>
                        <p className='whitespace-nowrap  pr-2'>{resume.internship[2].hospital}</p> */}
                        {/* {resume.internship[2].certificate ? <a href={`${resume.internship[2]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p className='whitespace-nowrap'>Certificate &nbsp;&nbsp;&nbsp;</p>} */}
                      {/* </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col items-center gap-3'>
                      {resume.internship.length > 0 ? <div className='flex gap-2'>
                        {resume.internship[0].certificate ? <a href={`${resume.internship[0]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                          View and Download
                        </a> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 1 ? <div className='flex gap-2'>
                        {resume.internship[1].certificate ? <a href={`${resume.internship[1]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                          View and Download
                        </a> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 2 ? <div className='flex gap-2'>
                        {resume.internship[2].certificate ? <a href={`${resume.internship[2]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                          View and Download
                        </a> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                    </div>
                  </Td> */}
                  <Td className='flex flex-col items-center justify-center space-y-2'>
                    <Link to={`/motivationletter?sid=${resume.sid}`}>View and Download</Link>
                    <br />
                    <Link to={`/motivationletteredit?sid=${resume.sid}`}>Edit</Link>
                  </Td>
                  {/* <Td>
                    <button onClick={async (e) => {
                      const res = await axios.get(`https://testapi1.nursingpioneer.com/downloadZip?uid=${resume.sid}`);
                      const url = res.data.zip;
                      const data = axios.get(url, {
                        responseType: 'blob'
                      }).then((response) => {
                        // create file link in browser's memory
                        const href = URL.createObjectURL(response.data);

                        // create "a" HTML element with href to file & click
                        const link = document.createElement('a');
                        link.href = href;
                        link.setAttribute('download', `${resume.personal.lastName.toUpperCase()}${resume.personal.firstName}-all.zip`); //or any other extension
                        document.body.appendChild(link);
                        link.click();

                        // clean up "a" element & remove ObjectURL
                        document.body.removeChild(link);
                        URL.revokeObjectURL(href);
                      });

                    }}>
                      Download All
                    </button>
                  </Td> */}
                  <Td>
                    <Button onClick={e => {
                      onOpen();
                      // localStorage.setItem('currentModal', JSON.stringify(resume))
                      setCurrentModal(resume)
                    }}>Open</Button>
                  </Td>
                  <Td>
                <div key={resume.sid} className="flex space-x-2">
                  {/* Individual "Approve" button with loading spinner */}
                  <button
                    className='p-2 bg-green-700 rounded-md text-white border-green-500 border-2'
                    onClick={() => approveResume(resume.sid)}
                    disabled={loadingStates_approve[resume.sid]}
                  >
                    {loadingStates_approve[resume.sid] ? (
                      <span>
                        <FontAwesomeIcon icon={faSpinner} spin />
                      </span>
                    ) : (
                      <FontAwesomeIcon icon={faThumbsUp} />
                    )}
                  </button>
                  
                  <button
                    className="p-2 bg-yellow-600 rounded-md text-white"
                    onClick={() => {
                      setPopUp(true);
                      setDisAppoveStudent(resume);
                    }}
                  >
                    {loadingStates_disapprove[resume.sid] ? (
                      <span>
                        <FontAwesomeIcon icon={faSpinner} spin />
                      </span>
                    ) : (
                      <FontAwesomeIcon icon={faThumbsDown} />
                    )}
                  </button>
                  
                  <button
                    className="p-2 bg-red-700 rounded-md text-white"
                    onClick={() => deleteResume(resume.sid)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </Td>
                </Tr>
              ))}
            </Tbody>
          </div>
        </Table>
      </Box></> : <h2 className='text-center text-5xl'>No Approved Resume to show</h2> : null}
      {current === "disApprovedResumes" ? disApprovedResumes !== null && disApprovedResumes.length > 0 ? <> <Heading mb="4" mt="10" style={headingStyle}>- Disapproved Students -</Heading> <Box textAlign="center" p="8" marginBottom={'4%'} overflowX={"scroll"}>
        {/* <Heading mb="4" mt="10" style={headingStyle}>Disapproved Students</Heading> */}
        <Table variant="simple" >
          <div style={{ maxHeight: '700px', overflowX: 'hidden' }}>
            <Thead position="sticky" top="0" bg="white" zIndex="1">
              <Tr bg="#00b0ff" >
                <Th color="White">Name</Th>
                {/* <Th color="White">Father's Name</Th> */}
                <Th color="White">Mobile-no</Th>
                <Th color="White">Email-id</Th>
                {/* <Th color="White">Passport Photo</Th> */}
                {/* <Th color="White">Candidate Photo</Th> */}
                <Th color="White">View More</Th>
                <Th color="White">Download CV</Th>
                {/* <Th color="White">Download filter CV</Th> */}
                {/* <Th color="White">Academic Year / Semester</Th> */}
                {/* <Th color="White">Post graduate Marksheet</Th> */}
                {/* <Th color="White">Undergraduate/ Diploma Marksheet</Th> */}
                {/* <Th color="White">12th Marksheet</Th> */}
                {/* <Th color="White">11th Marksheet</Th> */}
                {/* <Th color="White">10th Marksheet</Th> */}
                {/* <Th color="White">Language level</Th> */}
                {/* <Th color="White">listening</Th> */}
                {/* <Th color="White">speaking</Th> */}
                {/* <Th color="White">reading</Th> */}
                {/* <Th color="White">writing</Th> */}
                {/* <Th color="White">Employer</Th> */}
                {/* <Th color="White">Work Experience Certificate</Th> */}
                {/* <Th color="White">Hospital Name</Th> */}
                {/* <Th color="White">Internship</Th> */}
                {/* <Th color="White">Internship Certificate</Th> */}
                <Th color="White">Motivation Letter</Th>
                {/* <Th color="White">Download All Documents</Th> */}
                <Th color="White">View and Download Documents</Th>
                <Th color="White">Actions</Th>
                {/* <Th color="White">Disapprove</Th>
                <Th color="White">Delete</Th> */}
              </Tr>
            </Thead>


            <Tbody >
              {disApprovedResumes.map((resume, i) => (

                <Tr key={resume.sid} bg={i % 2 === 0 ? 'white' : 'gray.100'}>
                  <Td style={{ whiteSpace: 'nowrap' }}>{resume.personal.firstName + " " + resume.personal.lastName}</Td>
                  {/* <Td >
                    {resume.personal.firstName}
                  </Td> */}
                  {/* <Td> */}
                    {/* <Link to={`/view/${student.id}`} color="#00b0ff"> */}
                    {/* {resume.personal.fatherName} */}
                    {/* </Link> */}
                  {/* </Td> */}
                  <Td>
                    {/* <Link to={`/view/${student.id}`} color="#00b0ff"> */}
                    {resume.personal.contactNumber}
                    {/* </Link> */}

                  </Td>
                  <Td>
                    {resume.personal.email}
                  </Td>
                  {/* <Td >
                    <a href={`${resume.personal.passport}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='whitespace-nowrap block'>
                      View and Download
                    </a>
                  </Td> */}
                  {/* <Td>
                    <a href={`${resume.personal.candidatePhoto}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='whitespace-nowrap block'> View and Download
                    </a>
                  </Td> */}
                  <Td>
                    {/* <a href={`/personal`}> */}
                    <button
                      onClick={() => {
                        changeAction("editByAdmin")
                        localStorage.setItem("personal", JSON.stringify(resume.personal))
                        localStorage.setItem("education", JSON.stringify(resume.education))
                        localStorage.setItem("work", JSON.stringify(resume.work));
                        localStorage.setItem("internship", JSON.stringify(resume.internship));
                        localStorage.setItem("declaration", JSON.stringify(resume.declaration));
                        localStorage.setItem("motivation", JSON.stringify(resume.motivation));
                        localStorage.setItem("SIDofStudentToEdit", resume.sid);
                        localStorage.setItem("sid", resume.sid);

                        navigate("/personal")
                      }}
                    >View{'\u00A0'}More</button>
                    <br />
                    <br />
                    <button
                      onClick={() => {
                        changeAction("editByAdmin")
                        localStorage.setItem("personal", JSON.stringify(resume.personal))
                        localStorage.setItem("education", JSON.stringify(resume.education))
                        localStorage.setItem("work", JSON.stringify(resume.work));
                        localStorage.setItem("internship", JSON.stringify(resume.internship));
                        localStorage.setItem("declaration", JSON.stringify(resume.declaration));
                        localStorage.setItem("motivation", JSON.stringify(resume.motivation));
                        localStorage.setItem("SIDofStudentToEdit", resume.sid);
                        localStorage.setItem("sid", resume.sid);

                        navigate("/personal")
                      }}
                    >Edit</button>
                    {/* </a> */}
                  </Td>
                  {/* <Td >
                      <a href={`/cv?email=${resume.email}`}><button >Download Full CV</button></a>
                  </Td>
                  <Td>
                  <button >Download Filtered CV</button>
                  </Td> */}
                  <Td>
                    <a href={`/resume?sid=${resume.sid}`}><Button variant={'ghost'}>Full CV</Button></a>
                    <br />
                    <a href={`/filteredcv?sid=${resume.sid}`}><Button variant={'ghost'}>Filtered CV</Button></a>
                  </Td>
                  {/* <Td >
                    <p className='min-w-max h-[50px]'>Year 3/ semester 3</p>
                    <p className='min-w-max h-[50px]'>Year 2/ semester 2</p>
                    <p className='min-w-max h-[50px]'>Year 1/ semester 1</p>
                  </Td> */}

                  {/* <Td >

                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.postGraduation, "Year 3/Semester 3") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 3/Semester 3").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.postGraduation, "Year 2/Semester 2") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 2/Semester 2").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.postGraduation, "Year 1/Semester 1") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 1/Semester 1").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                  </Td> */}
                  {/* <Td >

                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.underGraduation, "Year 3/Semester 3") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 3/Semester 3").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.underGraduation, "Year 2/Semester 2") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 2/Semester 2").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.underGraduation, "Year 1/Semester 1") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 1/Semester 1").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                  </Td> */}
                  {/* <Td>
                    <a href={`${resume.education.twelthStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                      View and Download
                    </a>
                  </Td> */}
                  {/* <Td>
                    <a href={`${resume.education.eleventhStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                      View and Download
                    </a>
                  </Td>
                  <Td>
                    <a href={`${resume.education.tenthStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                      View and Download
                    </a>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-3 items-center'>
                      {
                        resume.education.german.map((ele) => {
                          return <p>
                            {ele.level}
                          </p>
                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.listeningMarksheet) {
                            return <a href={`${ele.listeningMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              listening module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.readingMarksheet) {
                            return <a href={`${ele.readingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              Reading module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.speakingMarksheet) {
                            return <a href={`${ele.speakingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              Speaking module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.writingMarksheet) {
                            return <a href={`${ele.writingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              Writing module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}

                  {/* <Td>
                    <div className='flex flex-col items-center gap-3'>
                      <p color="#00b0ff" className='block whitespace-nowrap'>
                        Current/last
                      </p>
                      <p color="#00b0ff" className='block whitespace-nowrap'>
                        Employer 1
                      </p>
                      <p className='block whitespace-nowrap'>
                        Employer2
                      </p>
                    </div>
                  </Td> */}
                  {/* <Td >
                    <div className='flex flex-col items-center gap-3'>
                      {resume.work.length > 0 ? <a href={`${resume.work[0]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.work.length > 1 ? <a href={`${resume.work[1]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.work.length > 2 ? <a href={`${resume.work[2]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p>&nbsp;&nbsp;&nbsp;</p>}
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col items-center gap-3'>
                      {resume.internship.length > 0 ? <div className='flex gap-2'>
                        <p className='whitespace-nowrap  pr-2'>{resume.internship[0].hospital}</p> */}
                        {/* {resume.internship[0].certificate ? <a href={`${resume.internship[0]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p className='whitespace-nowrap'>Certificate &nbsp;&nbsp;&nbsp;</p>} */}
                      {/* </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 1 ? <div className='flex gap-2'>
                        <p className='whitespace-nowrap  pr-2'>{resume.internship[1].hospital}</p> */}
                        {/* {resume.internship[1].certificate ? <a href={`${resume.internship[1]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p className='whitespace-nowrap'>Certificate &nbsp;&nbsp;&nbsp;</p>} */}
                      {/* </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 2 ? <div className='flex gap-2'>
                        <p className='whitespace-nowrap  pr-2'>{resume.internship[2].hospital}</p> */}
                        {/* {resume.internship[2].certificate ? <a href={`${resume.internship[2]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p className='whitespace-nowrap'>Certificate &nbsp;&nbsp;&nbsp;</p>} */}
                      {/* </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col items-center gap-3'>
                      {resume.internship.length > 0 ? <div className='flex gap-2'>
                        {resume.internship[0].certificate ? <a href={`${resume.internship[0]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                          View and Download
                        </a> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 1 ? <div className='flex gap-2'>
                        {resume.internship[1].certificate ? <a href={`${resume.internship[1]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                          View and Download
                        </a> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 2 ? <div className='flex gap-2'>
                        {resume.internship[2].certificate ? <a href={`${resume.internship[2]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                          View and Download
                        </a> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                    </div>
                  </Td> */}
                  <Td className='flex flex-col items-center justify-center space-y-2'>
                    <Link to={`/motivationletter?sid=${resume.sid}`}>View and Download</Link>
                    <br />
                    <Link to={`/motivationletteredit?sid=${resume.sid}`}>Edit</Link>
                  </Td>
                  {/* <Td>
                    <button onClick={async (e) => {
                      const res = await axios.get(`https://testapi1.nursingpioneer.com/downloadZip?uid=${resume.sid}`);
                      const url = res.data.zip;
                      const data = axios.get(url, {
                        responseType: 'blob'
                      }).then((response) => {
                        // create file link in browser's memory
                        const href = URL.createObjectURL(response.data);

                        // create "a" HTML element with href to file & click
                        const link = document.createElement('a');
                        link.href = href;
                        link.setAttribute('download', `${resume.personal.lastName.toUpperCase()}${resume.personal.firstName}-all.zip`); //or any other extension
                        document.body.appendChild(link);
                        link.click();

                        // clean up "a" element & remove ObjectURL
                        document.body.removeChild(link);
                        URL.revokeObjectURL(href);
                      });

                    }}>
                      Download All
                    </button>
                  </Td> */}
                  <Td>
                    <Button onClick={e => {
                      onOpen();
                      // localStorage.setItem('currentModal', JSON.stringify(resume))
                      setCurrentModal(resume)
                    }}>Open</Button>
                  </Td>
                  <Td>
                <div key={resume.sid} className="flex space-x-2">
                  {/* Individual "Approve" button with loading spinner */}
                  <button
                    className='p-2 bg-green-700 rounded-md text-white border-green-500 border-2'
                    onClick={() => approveResume(resume.sid)}
                    disabled={loadingStates_approve[resume.sid]}
                  >
                    {loadingStates_approve[resume.sid] ? (
                      <span>
                        <FontAwesomeIcon icon={faSpinner} spin />
                      </span>
                    ) : (
                      <FontAwesomeIcon icon={faThumbsUp} />
                    )}
                  </button>
                  
                  <button
                    className="p-2 bg-yellow-600 rounded-md text-white"
                    onClick={() => {
                      setPopUp(true);
                      setDisAppoveStudent(resume);
                    }}
                  >
                    {loadingStates_disapprove[resume.sid] ? (
                      <span>
                        <FontAwesomeIcon icon={faSpinner} spin />
                      </span>
                    ) : (
                      <FontAwesomeIcon icon={faThumbsDown} />
                    )}
                  </button>
                  
                  <button
                    className="p-2 bg-red-700 rounded-md text-white"
                    onClick={() => deleteResume(resume.sid)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </Td>
                </Tr>
              ))}
            </Tbody>
          </div>
        </Table>
      </Box></> : <h2 className='text-center text-5xl'>No DisApproved Resume to show</h2> : null}

      {(current === 'Job' && job != null) ? <> <Heading mb="4" mt="10" style={headingStyle}>- Job -</Heading>
        <Box textAlign="center" p="8" marginBottom={'4%'} overflowX={"scroll"}>
          {/* <Heading mb="4">Job</Heading> */}
          <Table variant="simple" >
          <div style={{ maxHeight: '700px', overflowX: 'hidden' }}>
            <Thead position="sticky" top="0" bg="white" zIndex="1">
              <Tr bg="#00b0ff" >
                <Th color="White">Name</Th>
                {/* <Th color="White">Father's Name</Th> */}
                <Th color="White">Mobile-no</Th>
                <Th color="White">Email-id</Th>
                {/* <Th color="White">Passport Photo</Th> */}
                {/* <Th color="White">Candidate Photo</Th> */}
                <Th color="White">View More</Th>
                <Th color="White">Download CV</Th>
                {/* <Th color="White">Download filter CV</Th> */}
                {/* <Th color="White">Academic Year / Semester</Th> */}
                {/* <Th color="White">Post graduate Marksheet</Th> */}
                {/* <Th color="White">Undergraduate/ Diploma Marksheet</Th> */}
                {/* <Th color="White">12th Marksheet</Th> */}
                {/* <Th color="White">11th Marksheet</Th> */}
                {/* <Th color="White">10th Marksheet</Th> */}
                {/* <Th color="White">Language level</Th> */}
                {/* <Th color="White">listening</Th> */}
                {/* <Th color="White">speaking</Th> */}
                {/* <Th color="White">reading</Th> */}
                {/* <Th color="White">writing</Th> */}
                {/* <Th color="White">Employer</Th> */}
                {/* <Th color="White">Work Experience Certificate</Th> */}
                {/* <Th color="White">Hospital Name</Th> */}
                {/* <Th color="White">Internship</Th> */}
                {/* <Th color="White">Internship Certificate</Th> */}
                <Th color="White">Motivation Letter</Th>
                {/* <Th color="White">Download All Documents</Th> */}
                <Th color="White">View and Download Documents</Th>
                {/* <Th color="White">Actions</Th> */}
                {/* <Th color="White">Disapprove</Th>
                <Th color="White">Delete</Th> */}
              </Tr>
            </Thead>


            <Tbody >
              {job.map((resume, i) => (

                <Tr key={resume.sid} bg={i % 2 === 0 ? 'white' : 'gray.100'}>
                  <Td style={{ whiteSpace: 'nowrap' }}>{resume.personal.firstName + " " + resume.personal.lastName}</Td>
                  {/* <Td >
                    {resume.personal.firstName}
                  </Td> */}
                  {/* <Td> */}
                    {/* <Link to={`/view/${student.id}`} color="#00b0ff"> */}
                    {/* {resume.personal.fatherName} */}
                    {/* </Link> */}
                  {/* </Td> */}
                  <Td>
                    {/* <Link to={`/view/${student.id}`} color="#00b0ff"> */}
                    {resume.personal.contactNumber}
                    {/* </Link> */}

                  </Td>
                  <Td>
                    {resume.personal.email}
                  </Td>
                  {/* <Td >
                    <a href={`${resume.personal.passport}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='whitespace-nowrap block'>
                      View and Download
                    </a>
                  </Td> */}
                  {/* <Td>
                    <a href={`${resume.personal.candidatePhoto}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='whitespace-nowrap block'> View and Download
                    </a>
                  </Td> */}
                  <Td>
                    {/* <a href={`/personal`}> */}
                    <button
                      onClick={() => {
                        changeAction("editByAdmin")
                        localStorage.setItem("personal", JSON.stringify(resume.personal))
                        localStorage.setItem("education", JSON.stringify(resume.education))
                        localStorage.setItem("work", JSON.stringify(resume.work));
                        localStorage.setItem("internship", JSON.stringify(resume.internship));
                        localStorage.setItem("declaration", JSON.stringify(resume.declaration));
                        localStorage.setItem("motivation", JSON.stringify(resume.motivation));
                        localStorage.setItem("SIDofStudentToEdit", resume.sid);
                        localStorage.setItem("sid", resume.sid);

                        navigate("/personal")
                      }}
                    >View{'\u00A0'}More</button>
                    <br />
                    <br />
                    <button
                      onClick={() => {
                        changeAction("editByAdmin")
                        localStorage.setItem("personal", JSON.stringify(resume.personal))
                        localStorage.setItem("education", JSON.stringify(resume.education))
                        localStorage.setItem("work", JSON.stringify(resume.work));
                        localStorage.setItem("internship", JSON.stringify(resume.internship));
                        localStorage.setItem("declaration", JSON.stringify(resume.declaration));
                        localStorage.setItem("motivation", JSON.stringify(resume.motivation));
                        localStorage.setItem("SIDofStudentToEdit", resume.sid);
                        localStorage.setItem("sid", resume.sid);

                        navigate("/personal")
                      }}
                    >Edit</button>
                    {/* </a> */}
                  </Td>
                  {/* <Td >
                      <a href={`/cv?email=${resume.email}`}><button >Download Full CV</button></a>
                  </Td>
                  <Td>
                  <button >Download Filtered CV</button>
                  </Td> */}
                  <Td>
                    <a href={`/resume?sid=${resume.sid}`}><Button variant={'ghost'}>Full CV</Button></a>
                    <br />
                    <a href={`/filteredcv?sid=${resume.sid}`}><Button variant={'ghost'}>Filtered CV</Button></a>
                  </Td>
                  {/* <Td >
                    <p className='min-w-max h-[50px]'>Year 3/ semester 3</p>
                    <p className='min-w-max h-[50px]'>Year 2/ semester 2</p>
                    <p className='min-w-max h-[50px]'>Year 1/ semester 1</p>
                  </Td> */}

                  {/* <Td >

                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.postGraduation, "Year 3/Semester 3") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 3/Semester 3").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.postGraduation, "Year 2/Semester 2") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 2/Semester 2").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.postGraduation, "Year 1/Semester 1") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 1/Semester 1").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                  </Td> */}
                  {/* <Td >

                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.underGraduation, "Year 3/Semester 3") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 3/Semester 3").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.underGraduation, "Year 2/Semester 2") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 2/Semester 2").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.underGraduation, "Year 1/Semester 1") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 1/Semester 1").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                  </Td> */}
                  {/* <Td>
                    <a href={`${resume.education.twelthStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                      View and Download
                    </a>
                  </Td> */}
                  {/* <Td>
                    <a href={`${resume.education.eleventhStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                      View and Download
                    </a>
                  </Td>
                  <Td>
                    <a href={`${resume.education.tenthStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                      View and Download
                    </a>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-3 items-center'>
                      {
                        resume.education.german.map((ele) => {
                          return <p>
                            {ele.level}
                          </p>
                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.listeningMarksheet) {
                            return <a href={`${ele.listeningMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              listening module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.readingMarksheet) {
                            return <a href={`${ele.readingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              Reading module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.speakingMarksheet) {
                            return <a href={`${ele.speakingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              Speaking module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.writingMarksheet) {
                            return <a href={`${ele.writingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              Writing module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}

                  {/* <Td>
                    <div className='flex flex-col items-center gap-3'>
                      <p color="#00b0ff" className='block whitespace-nowrap'>
                        Current/last
                      </p>
                      <p color="#00b0ff" className='block whitespace-nowrap'>
                        Employer 1
                      </p>
                      <p className='block whitespace-nowrap'>
                        Employer2
                      </p>
                    </div>
                  </Td> */}
                  {/* <Td >
                    <div className='flex flex-col items-center gap-3'>
                      {resume.work.length > 0 ? <a href={`${resume.work[0]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.work.length > 1 ? <a href={`${resume.work[1]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.work.length > 2 ? <a href={`${resume.work[2]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p>&nbsp;&nbsp;&nbsp;</p>}
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col items-center gap-3'>
                      {resume.internship.length > 0 ? <div className='flex gap-2'>
                        <p className='whitespace-nowrap  pr-2'>{resume.internship[0].hospital}</p> */}
                        {/* {resume.internship[0].certificate ? <a href={`${resume.internship[0]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p className='whitespace-nowrap'>Certificate &nbsp;&nbsp;&nbsp;</p>} */}
                      {/* </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 1 ? <div className='flex gap-2'>
                        <p className='whitespace-nowrap  pr-2'>{resume.internship[1].hospital}</p> */}
                        {/* {resume.internship[1].certificate ? <a href={`${resume.internship[1]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p className='whitespace-nowrap'>Certificate &nbsp;&nbsp;&nbsp;</p>} */}
                      {/* </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 2 ? <div className='flex gap-2'>
                        <p className='whitespace-nowrap  pr-2'>{resume.internship[2].hospital}</p> */}
                        {/* {resume.internship[2].certificate ? <a href={`${resume.internship[2]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p className='whitespace-nowrap'>Certificate &nbsp;&nbsp;&nbsp;</p>} */}
                      {/* </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col items-center gap-3'>
                      {resume.internship.length > 0 ? <div className='flex gap-2'>
                        {resume.internship[0].certificate ? <a href={`${resume.internship[0]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                          View and Download
                        </a> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 1 ? <div className='flex gap-2'>
                        {resume.internship[1].certificate ? <a href={`${resume.internship[1]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                          View and Download
                        </a> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 2 ? <div className='flex gap-2'>
                        {resume.internship[2].certificate ? <a href={`${resume.internship[2]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                          View and Download
                        </a> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                    </div>
                  </Td> */}
                  <Td className='flex flex-col items-center justify-center space-y-2'>
                    <Link to={`/motivationletter?sid=${resume.sid}`}>View and Download</Link>
                    <br />
                    <Link to={`/motivationletteredit?sid=${resume.sid}`}>Edit</Link>
                  </Td>
                  {/* <Td>
                    <button onClick={async (e) => {
                      const res = await axios.get(`https://testapi1.nursingpioneer.com/downloadZip?uid=${resume.sid}`);
                      const url = res.data.zip;
                      const data = axios.get(url, {
                        responseType: 'blob'
                      }).then((response) => {
                        // create file link in browser's memory
                        const href = URL.createObjectURL(response.data);

                        // create "a" HTML element with href to file & click
                        const link = document.createElement('a');
                        link.href = href;
                        link.setAttribute('download', `${resume.personal.lastName.toUpperCase()}${resume.personal.firstName}-all.zip`); //or any other extension
                        document.body.appendChild(link);
                        link.click();

                        // clean up "a" element & remove ObjectURL
                        document.body.removeChild(link);
                        URL.revokeObjectURL(href);
                      });

                    }}>
                      Download All
                    </button>
                  </Td> */}
                  <Td>
                    <Button onClick={e => {
                      onOpen();
                      // localStorage.setItem('currentModal', JSON.stringify(resume))
                      setCurrentModal(resume)
                    }}>Open</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </div>
        </Table>
        </Box>
      </> : null}

      {(current === 'Apprenticeship' && Apprenticeship != null) ? <> <Heading mb="4" mt="10" style={headingStyle}>- Apprenticeship -</Heading>
        <Box textAlign="center" p="8" marginBottom={'4%'} overflowX={"scroll"}>
          {/* <Heading mb="4">Apprenticeship</Heading> */}
          <Table variant="simple" >
          <div style={{ maxHeight: '700px', overflowX: 'hidden' }}>
            <Thead position="sticky" top="0" bg="white" zIndex="1">
              <Tr bg="#00b0ff" >
                <Th color="White">Name</Th>
                {/* <Th color="White">Father's Name</Th> */}
                <Th color="White">Mobile-no</Th>
                <Th color="White">Email-id</Th>
                {/* <Th color="White">Passport Photo</Th> */}
                {/* <Th color="White">Candidate Photo</Th> */}
                <Th color="White">View More</Th>
                <Th color="White">Download CV</Th>
                {/* <Th color="White">Download filter CV</Th> */}
                {/* <Th color="White">Academic Year / Semester</Th> */}
                {/* <Th color="White">Post graduate Marksheet</Th> */}
                {/* <Th color="White">Undergraduate/ Diploma Marksheet</Th> */}
                {/* <Th color="White">12th Marksheet</Th> */}
                {/* <Th color="White">11th Marksheet</Th> */}
                {/* <Th color="White">10th Marksheet</Th> */}
                {/* <Th color="White">Language level</Th> */}
                {/* <Th color="White">listening</Th> */}
                {/* <Th color="White">speaking</Th> */}
                {/* <Th color="White">reading</Th> */}
                {/* <Th color="White">writing</Th> */}
                {/* <Th color="White">Employer</Th> */}
                {/* <Th color="White">Work Experience Certificate</Th> */}
                {/* <Th color="White">Hospital Name</Th> */}
                {/* <Th color="White">Internship</Th> */}
                {/* <Th color="White">Internship Certificate</Th> */}
                <Th color="White">Motivation Letter</Th>
                {/* <Th color="White">Download All Documents</Th> */}
                <Th color="White">View and Download Documents</Th>
                {/* <Th color="White">Actions</Th> */}
                {/* <Th color="White">Disapprove</Th>
                <Th color="White">Delete</Th> */}
              </Tr>
            </Thead>


            <Tbody >
              {Apprenticeship.map((resume, i) => (

                <Tr key={resume.sid} bg={i % 2 === 0 ? 'white' : 'gray.100'}>
                  <Td style={{ whiteSpace: 'nowrap' }}>{resume.personal.firstName + " " + resume.personal.lastName}</Td>
                  {/* <Td >
                    {resume.personal.firstName}
                  </Td> */}
                  {/* <Td> */}
                    {/* <Link to={`/view/${student.id}`} color="#00b0ff"> */}
                    {/* {resume.personal.fatherName} */}
                    {/* </Link> */}
                  {/* </Td> */}
                  <Td>
                    {/* <Link to={`/view/${student.id}`} color="#00b0ff"> */}
                    {resume.personal.contactNumber}
                    {/* </Link> */}

                  </Td>
                  <Td>
                    {resume.personal.email}
                  </Td>
                  {/* <Td >
                    <a href={`${resume.personal.passport}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='whitespace-nowrap block'>
                      View and Download
                    </a>
                  </Td> */}
                  {/* <Td>
                    <a href={`${resume.personal.candidatePhoto}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='whitespace-nowrap block'> View and Download
                    </a>
                  </Td> */}
                  <Td>
                    {/* <a href={`/personal`}> */}
                    <button
                      onClick={() => {
                        changeAction("editByAdmin")
                        localStorage.setItem("personal", JSON.stringify(resume.personal))
                        localStorage.setItem("education", JSON.stringify(resume.education))
                        localStorage.setItem("work", JSON.stringify(resume.work));
                        localStorage.setItem("internship", JSON.stringify(resume.internship));
                        localStorage.setItem("declaration", JSON.stringify(resume.declaration));
                        localStorage.setItem("motivation", JSON.stringify(resume.motivation));
                        localStorage.setItem("SIDofStudentToEdit", resume.sid);
                        localStorage.setItem("sid", resume.sid);

                        navigate("/personal")
                      }}
                    >View{'\u00A0'}More</button>
                    <br />
                    <br />
                    <button
                      onClick={() => {
                        changeAction("editByAdmin")
                        localStorage.setItem("personal", JSON.stringify(resume.personal))
                        localStorage.setItem("education", JSON.stringify(resume.education))
                        localStorage.setItem("work", JSON.stringify(resume.work));
                        localStorage.setItem("internship", JSON.stringify(resume.internship));
                        localStorage.setItem("declaration", JSON.stringify(resume.declaration));
                        localStorage.setItem("motivation", JSON.stringify(resume.motivation));
                        localStorage.setItem("SIDofStudentToEdit", resume.sid);
                        localStorage.setItem("sid", resume.sid);

                        navigate("/personal")
                      }}
                    >Edit</button>
                    {/* </a> */}
                  </Td>
                  {/* <Td >
                      <a href={`/cv?email=${resume.email}`}><button >Download Full CV</button></a>
                  </Td>
                  <Td>
                  <button >Download Filtered CV</button>
                  </Td> */}
                  <Td>
                    <a href={`/resume?sid=${resume.sid}`}><Button variant={'ghost'}>Full CV</Button></a>
                    <br />
                    <a href={`/filteredcv?sid=${resume.sid}`}><Button variant={'ghost'}>Filtered CV</Button></a>
                  </Td>
                  {/* <Td >
                    <p className='min-w-max h-[50px]'>Year 3/ semester 3</p>
                    <p className='min-w-max h-[50px]'>Year 2/ semester 2</p>
                    <p className='min-w-max h-[50px]'>Year 1/ semester 1</p>
                  </Td> */}

                  {/* <Td >

                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.postGraduation, "Year 3/Semester 3") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 3/Semester 3").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.postGraduation, "Year 2/Semester 2") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 2/Semester 2").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.postGraduation, "Year 1/Semester 1") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 1/Semester 1").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                  </Td> */}
                  {/* <Td >

                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.underGraduation, "Year 3/Semester 3") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 3/Semester 3").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.underGraduation, "Year 2/Semester 2") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 2/Semester 2").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                    <p className='min-w-max h-[50px]'>
                      {checkAcademicYear(resume.education.underGraduation, "Year 1/Semester 1") ? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 1/Semester 1").marksheet}`}>View and Download</a> : "Not added"}
                    </p>
                  </Td> */}
                  {/* <Td>
                    <a href={`${resume.education.twelthStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                      View and Download
                    </a>
                  </Td> */}
                  {/* <Td>
                    <a href={`${resume.education.eleventhStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                      View and Download
                    </a>
                  </Td>
                  <Td>
                    <a href={`${resume.education.tenthStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                      View and Download
                    </a>
                  </Td> */}
                  {/* <Td> */}
                    {/* <div className='flex flex-col gap-3 items-center'> */}
                      {/* { */}
                        {/* resume.education.german.map((ele) => { */}
                          {/* return <p> */}
                            {/* {ele.level} */}
                          {/* </p> */}
                        {/* }) */}
                      {/* } */}
                    {/* </div> */}
                  {/* </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.listeningMarksheet) {
                            return <a href={`${ele.listeningMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              listening module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.readingMarksheet) {
                            return <a href={`${ele.readingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              Reading module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.speakingMarksheet) {
                            return <a href={`${ele.speakingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              Speaking module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col gap-2'>
                      {
                        resume.education.german.map((ele) => {
                          if (ele.writingMarksheet) {
                            return <a href={`${ele.writingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                              Writing module marksheet
                            </a>
                          } else {
                            return <p>&nbsp;&nbsp;&nbsp;</p>
                          }

                        })
                      }
                    </div>
                  </Td> */}

                  {/* <Td>
                    <div className='flex flex-col items-center gap-3'>
                      <p color="#00b0ff" className='block whitespace-nowrap'>
                        Current/last
                      </p>
                      <p color="#00b0ff" className='block whitespace-nowrap'>
                        Employer 1
                      </p>
                      <p className='block whitespace-nowrap'>
                        Employer2
                      </p>
                    </div>
                  </Td> */}
                  {/* <Td >
                    <div className='flex flex-col items-center gap-3'>
                      {resume.work.length > 0 ? <a href={`${resume.work[0]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.work.length > 1 ? <a href={`${resume.work[1]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.work.length > 2 ? <a href={`${resume.work[2]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p>&nbsp;&nbsp;&nbsp;</p>}
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col items-center gap-3'>
                      {resume.internship.length > 0 ? <div className='flex gap-2'>
                        <p className='whitespace-nowrap  pr-2'>{resume.internship[0].hospital}</p> */}
                        {/* {resume.internship[0].certificate ? <a href={`${resume.internship[0]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p className='whitespace-nowrap'>Certificate &nbsp;&nbsp;&nbsp;</p>} */}
                      {/* </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 1 ? <div className='flex gap-2'>
                        <p className='whitespace-nowrap  pr-2'>{resume.internship[1].hospital}</p> */}
                        {/* {resume.internship[1].certificate ? <a href={`${resume.internship[1]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p className='whitespace-nowrap'>Certificate &nbsp;&nbsp;&nbsp;</p>} */}
                      {/* </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 2 ? <div className='flex gap-2'>
                        <p className='whitespace-nowrap  pr-2'>{resume.internship[2].hospital}</p> */}
                        {/* {resume.internship[2].certificate ? <a href={`${resume.internship[2]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                        View and Download
                      </a> : <p className='whitespace-nowrap'>Certificate &nbsp;&nbsp;&nbsp;</p>} */}
                      {/* </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                    </div>
                  </Td> */}
                  {/* <Td>
                    <div className='flex flex-col items-center gap-3'>
                      {resume.internship.length > 0 ? <div className='flex gap-2'>
                        {resume.internship[0].certificate ? <a href={`${resume.internship[0]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                          View and Download
                        </a> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 1 ? <div className='flex gap-2'>
                        {resume.internship[1].certificate ? <a href={`${resume.internship[1]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                          View and Download
                        </a> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      {resume.internship.length > 2 ? <div className='flex gap-2'>
                        {resume.internship[2].certificate ? <a href={`${resume.internship[2]?.certificate}`} target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                          View and Download
                        </a> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                      </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                    </div>
                  </Td> */}
                  <Td className='flex flex-col items-center justify-center space-y-2'>
                    <Link to={`/motivationletter?sid=${resume.sid}`}>View and Download</Link>
                    <br />
                    <Link to={`/motivationletteredit?sid=${resume.sid}`}>Edit</Link>
                  </Td>
                  {/* <Td>
                    <button onClick={async (e) => {
                      const res = await axios.get(`https://testapi1.nursingpioneer.com/downloadZip?uid=${resume.sid}`);
                      const url = res.data.zip;
                      const data = axios.get(url, {
                        responseType: 'blob'
                      }).then((response) => {
                        // create file link in browser's memory
                        const href = URL.createObjectURL(response.data);

                        // create "a" HTML element with href to file & click
                        const link = document.createElement('a');
                        link.href = href;
                        link.setAttribute('download', `${resume.personal.lastName.toUpperCase()}${resume.personal.firstName}-all.zip`); //or any other extension
                        document.body.appendChild(link);
                        link.click();

                        // clean up "a" element & remove ObjectURL
                        document.body.removeChild(link);
                        URL.revokeObjectURL(href);
                      });

                    }}>
                      Download All
                    </button>
                  </Td> */}
                  <Td>
                    <Button onClick={e => {
                      onOpen();
                      // localStorage.setItem('currentModal', JSON.stringify(resume))
                      setCurrentModal(resume)
                    }}>Open</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </div>
        </Table>
        </Box></>
        : null}



      {popUp &&
        <div className='w-full h-full fixed top-10 left-0 flex items-center justify-center'>
          <div className='flex flex-col gap-2 bg-[#26495a]  w-1/2 p-4 rounded-sm'>
            <input type="text" placeholder='Write reason of disapproval' className='p-2 rounded-md outline-none' value={disApproveComment} onChange={(e) => setDisAppoveComment(e.target.value)} />
            <button className='bg-yellow-500 text-white p-1 rounded-md' onClick={() => setPopUp(false)}>Cancel</button>
            <button className='bg-red-700 text-white p-1 rounded-md' onClick={disApproveResume}>Disapprove</button>
          </div>
        </div>
      }
    </ChakraProvider>
  );
};

export default Admin;