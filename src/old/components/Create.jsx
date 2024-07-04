import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Button, Text } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Heading, Table, Thead, Tbody, Tr, Th, Td, Link } from '@chakra-ui/react';

const Create = ({changeAction}) => {
  // useEffect(()=>{
    for(let i=0 ; i < localStorage.length; i++){
      if(localStorage.key(i) !== 'sid' && localStorage.key(i) !== 'aid' && localStorage.key(i) !== 'email' && localStorage.key(i) !== 'display_name'){
        localStorage.removeItem(localStorage.key(i))
      }
    }

  // },[])

  const navigate = useNavigate();
  const [resume, setResume] = useState(null)
  const host = `https://testapi1.nursingpioneer.com/`;
  useEffect(()=>{
    if(localStorage.getItem("sid") || localStorage.getItem("aid")){
      getUser()
    }
    else{
      navigate('/')
    }
  },[])

  const getUser = async () => {
    const res = await axios({
      method: "get",
      url: `${host}/getStudent?sid=${localStorage.getItem("sid")}`,
    })
    if (res.data.success === true) {
      setResume(res.data.resume)
    } else {
      alert("Log out and log in again because something went wrong")
    }
    // console.log(user);
  }

  const deleteResume = async(SID) => {
    const res = await axios({
      method : "get",
      url : `${host}/deleteResume?sid=${SID}`,
    })
    if(res.data.success === true){
      console.log(res.data);
      getUser()
      alert("Resume Deleted")
    }
  }

  function checkAcademicYear (array, year_no) {
    // console.log(array);
    const filteredArr = array.filter((ele)=>{
      // console.log({
      //   ele : ele.yearSem,
      //   year_no
      // });
      return ele.yearSem === year_no
    })
    return filteredArr[0]
  }

  // function getSem(arrayOfSemesters, year_no) {
  //   const fil = arrayOfSemesters.filter((ele) => {
  //     if (ele && ele.marksheet && typeof ele.marksheet === 'string') {
  //       const parts = ele.marksheet.split("_");

  //       if (parts.length > 1) {
  //         const semesterYear = parts[parts.length - 1].split(".")[0];

  //         if (semesterYear === String(year_no).trim()) {
  //           return true;
  //         }
  //       }
  //     }

  //     return false;
  //   });

  //   return fil;
  // }


  // const deleteResume = async (resumeId, userId) => {
  //   console.log(resumeId);
  //   const res = await axios({
  //     method: "delete",
  //     url: `${process.env.REACT_APP_HOST}/deleteResume`,
  //     data: {
  //       resumeId: resumeId,
  //       userId: userId
  //     }
  //   })
  //   if (res.data.success === true) {
  //     console.log(res.data);
  //     getUser()
  //     alert("Resume Deleted")
  //   }
  // }

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/")
  //   } else {
  //     getUser()
  //   }
  // }, [])
  return (
    <>
      <ChakraProvider>
        
      {resume!==null ? <Box textAlign="center" marginBottom={'4%'} marginLeft={'5%'} marginRight={'5%'} overflowX={"scroll"} >
      <Table variant="simple" style={{ width: '40%' }}>
  <Thead>
    <Tr>
      <Th bg="#00b0ff" color="White">Passport Photo</Th>
      <Tr key={resume.sid}>
      <Td>
        <a href={`${resume.personal.passport}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='whitespace-nowrap block'>
          View and Download
        </a>
      </Td>
    </Tr>
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">Candidate Photo</Th>
      <Tr key={resume.sid}>
      <Td>
        <img src={`${resume.personal.candidatePhoto}`} alt="candidate" className='w-16'/>
      </Td>
    </Tr>
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">Academic Year / Semester</Th>
      <Tr key={resume.sid}>
      <Td>
        <p className='min-w-max h-[50px]'>Year 1/ semester 1</p>
        <p className='min-w-max h-[50px]'>Year 2/ semester 2</p>
        <p className='min-w-max h-[50px]'>Year 3/ semester 3</p>
      </Td>
    </Tr>
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">Post graduate Marksheet</Th>
      <Tr key={resume.sid}>
          <Td >
          <p className='min-w-max h-[50px]'>
          {checkAcademicYear(resume.education.postGraduation, "Year 3/Semester 3")? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 3/Semester 3").marksheet}`}>View and Download</a>: "Not Added" }
          </p>
          <p className='min-w-max h-[50px]'>
          {checkAcademicYear(resume.education.postGraduation, "Year 2/Semester 2")? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 2/Semester 2").marksheet}`}>View and Download</a>: "Not Added" }
          </p>
          <p className='min-w-max h-[50px]'>
          {checkAcademicYear(resume.education.postGraduation, "Year 1/Semester 1")? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.postGraduation, "Year 1/Semester 1").marksheet}`}>View and Download</a>: "Not Added" }
          </p>
          </Td>  </Tr>  
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">Undergraduate/ Diploma Marksheet</Th>
           
      <Tr key={resume.sid}>
          <Td >
          <p className='min-w-max h-[50px]'>
          {checkAcademicYear(resume.education.underGraduation, "Year 3/Semester 3")? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 3/Semester 3").marksheet}`}>View and Download</a>: "Not Added" }
          </p>
          <p className='min-w-max h-[50px]'>
          {checkAcademicYear(resume.education.underGraduation, "Year 2/Semester 2")? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 2/Semester 2").marksheet}`}>View and Download</a>: "Not Added" }
          </p>
          <p className='min-w-max h-[50px]'>
          {checkAcademicYear(resume.education.underGraduation, "Year 1/Semester 1")? <a className='block' target='_blank' href={`${checkAcademicYear(resume.education.underGraduation, "Year 1/Semester 1").marksheet}`}>View and Download</a>: "Not Added" }
          </p>
          </Td>  </Tr>  
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">12th Marksheet</Th>
      <Tr key={resume.sid}>
                  <Td>
                  <a href={`${resume.education.twelthStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer"> 
                          View and Download
                        </a>
                  </Td>
                  </Tr>
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">11th Marksheet</Th>
      <Tr key={resume.sid}>
                  <Td>
                  <a href={`${resume.education.eleventhStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                          View and Download
                        </a>
                  </Td>
                  </Tr>  
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">10th Marksheet</Th>
      
      <Tr key={resume.sid}>
                  <Td>
                  <a href={`${resume.education.tenthStandard[0].marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
                          View and Download
                        </a>
                  </Td>
                  </Tr>  
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">Language level</Th>
      <Tr key={resume.sid}>
                  <Td>
                    <div className='flex flex-col gap-3 items-center'>
                  {
                    resume.education.german.map((ele)=>{
                      return <p>
                        {ele.level}
                        </p>
                    })
                  }
                    </div>
                  </Td>
                  </Tr>  
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">Listening</Th>
      <Tr key={resume.sid}>
                  <Td>
                  <div className='flex flex-col gap-2'>
                  {
                    resume.education.german.map((ele)=>{
                      if (ele.listeningMarksheet) 
                    {return <a href={`${ele.listeningMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                  listening module marksheet
                  </a>}else{
                    return <p>&nbsp;&nbsp;&nbsp;</p>
                  }
                  
                })
              }
                  </div>
                  </Td>
                  </Tr>  
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">Speaking</Th>
      <Tr key={resume.sid}>
                  <Td>
                  <div className='flex flex-col gap-2'>
                  {
                    resume.education.german.map((ele)=>{
                      if (ele.readingMarksheet) 
                    {return <a href={`${ele.readingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                  Reading module marksheet
                  </a>}else{
                    return <p>&nbsp;&nbsp;&nbsp;</p>
                  }
                  
                })
              }
                  </div>
                  </Td>
                  </Tr>  
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">Reading</Th>
      <Tr key={resume.sid}>
                  <Td>
                  <div className='flex flex-col gap-2'>
                  {
                    resume.education.german.map((ele)=>{
                      if (ele.speakingMarksheet) 
                    {return <a href={`${ele.speakingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                  Speaking module marksheet
                  </a>}else{
                    return <p>&nbsp;&nbsp;&nbsp;</p>
                  }
                  
                })
              }
                  </div>
                  </Td>
                  </Tr>  
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">Writing</Th>
      <Tr key={resume.sid}>
                  <Td>
                  <div className='flex flex-col gap-2'>
                  {
                    resume.education.german.map((ele)=>{
                      if (ele.writingMarksheet) 
                    {return <a href={`${ele.writingMarksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                  Writing module marksheet
                  </a>}else{
                    return <p>&nbsp;&nbsp;&nbsp;</p>
                  }
                  
                })
              }
                  </div>
                  </Td>
                  </Tr>  
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">Employer</Th>
      <Tr key={resume.sid}>
                  <Td>
                  <div className='flex flex-col items-center gap-3'>
                    <p color="#00b0ff" className='block whitespace-nowrap'>
                  Current/last
                        </p>
                  <p color="#00b0ff"  className='block whitespace-nowrap'>
                  Employer 1
                        </p>
                        <p className='block whitespace-nowrap'>
                  Employer2
                        </p>
                        </div>
                  </Td>
                  </Tr>  
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">Work Experience Certificate</Th>
      <Tr key={resume.sid}>
                  <Td > 
                  <div className='flex flex-col items-center gap-3'>
                  {resume.work.length > 0 ?<a href={`${resume.work[0]?.certificate}`}  target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                    View and Download
                  </a> : <p>&nbsp;&nbsp;&nbsp;</p> }
                  {resume.work.length > 1 ?<a href={`${resume.work[1]?.certificate}`}  target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                    View and Download
                  </a> : <p>&nbsp;&nbsp;&nbsp;</p> }
                  {resume.work.length > 2 ?<a href={`${resume.work[2]?.certificate}`}  target='_blank' rel="noopener noreferrer" className='block whitespace-nowrap'>
                    View and Download
                  </a> : <p>&nbsp;&nbsp;&nbsp;</p> }
                  </div>
                  </Td>
                  </Tr>  
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">Internship</Th>
      <Tr key={resume.sid}>
                  <Td>
                  <div className='flex flex-col items-center gap-3'>
                    {resume.internship.length > 0 ? <div className='flex gap-2'>
                      <p className='whitespace-nowrap  pr-2'>{resume.internship[0].hospital}</p>
                     
                    </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                    {resume.internship.length > 1 ? <div className='flex gap-2'>
                      <p className='whitespace-nowrap  pr-2'>{resume.internship[1].hospital}</p>
                   
                    </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                    {resume.internship.length > 2 ? <div className='flex gap-2'>
                      <p className='whitespace-nowrap  pr-2'>{resume.internship[2].hospital}</p>
                     
                    </div> : <p className='whitespace-nowrap'>&nbsp;&nbsp;&nbsp;</p>}
                  </div>
                </Td>
                </Tr>  
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">Internship Certificate</Th>
      <Tr key={resume.sid}>
                <Td>
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
                </Td>
                </Tr>  
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">Edit</Th>
      <Tr key={resume.sid}>
                  <Td>
                  <button
                  disabled={resume.isApproved!=="Approved"?false:true} 
                  className={`p-2 ${resume.isApproved!=="Approved"?"bg-green-700":"bg-gray-400 cursor-not-allowed"} rounded-md text-white whitespace-nowrap`} 
                    onClick={() => {
                      changeAction("editByStudent")
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
                  </Td>
                  </Tr>  
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">Download CV</Th>
      <Tr key={resume.sid}>
                  <Td>
                        <button disabled={resume.isApproved==="Approved"?false:true} onClick={e=>navigate(`/resume?sid=${resume.sid}`)} className={`p-2 ${resume.isApproved==="Approved"?"bg-green-700":"bg-gray-400 cursor-not-allowed"} rounded-md text-white`}>Download</button>
                  </Td>
                  </Tr>  
    </Tr>
    <Tr>
      <Th bg="#00b0ff" color="White">View</Th>
      <Tr key={resume.sid}>
                  <Td>
                        <button disabled={resume.isApproved==="Approved"?false:true} onClick={e=>navigate(`/view?sid=${resume.sid}`)} className={`p-2 ${resume.isApproved==="Approved"?"bg-green-700":"bg-gray-400 cursor-not-allowed"} rounded-md text-white`}>View</button>
                  </Td>
                 
                </Tr>
    </Tr>
  </Thead>
  <Tbody>
 
    
   
                
                
             
                 
           
              
              
               
              
            
              
              
               
          
               
          
               
              
            </Tbody>
          </Table>
        </Box> : <Box textAlign="center" p="8" marginBottom={'35%'}>
          <Button
            bg="#00b0ff"
            color="white"
            borderRadius="full"
            size="lg"
            boxShadow="lg"
            onClick={() => {
              const sid = localStorage.getItem('sid');
              const aid = localStorage.getItem('aid');
              const email = localStorage.getItem('email')
              const display_name = localStorage.getItem('display_name')
              localStorage.clear();
              if (sid) {
                localStorage.setItem('sid', sid);
              }
              if (aid) {
                localStorage.setItem('aid', aid);
              }
              if(email){
                localStorage.setItem('email',email);
                
              }
              if(display_name){
                localStorage.setItem('display_name',display_name);
              }
              navigate('/personal');
            }}
          >
            <Box as={FaPlus} fontSize="2xl" mr="2" />
          </Button>
          <Text mt="4" fontSize="xl">
            Create new
          </Text>
        </Box> }

        </ChakraProvider>
    </>
  );
};

export default Create;


// 

// {user !== null && user.resume && <Box textAlign="center" p="8" marginBottom={'4%'} overflowX={"scroll"} key={1}>
// <Heading mb="4">Registered Students</Heading>
// <Table variant="simple" >
//   <Thead>
//     <Tr bg="#00b0ff" >
//       <Th color="White">Surname</Th>
//       <Th color="White">Givenname</Th>
//       <Th color="White">Father's Name</Th>
//       <Th color="White">Mobile-no</Th>
//       <Th color="White">Email-id</Th>
//       <Th color="White">Passport Photo</Th>
//       <Th color="White">Candidate Photo</Th>
//       <Th color="White">View More</Th>
//       <Th color="White">CV</Th>
//       <Th color="White">Academic Year / Semester</Th>
//       <Th color="White">Post graduate Marksheet</Th>
//       <Th color="White">Undergraduate/ Diploma Marksheet</Th>
//       <Th color="White">12th Marksheet</Th>
//       <Th color="White">11th Marksheet</Th>
//       <Th color="White">10th Marksheet</Th>
//       <Th color="White">Status</Th>
//       <Th color="White">DownLoad</Th>
//       <Th color="White">Delete</Th>
//       {/* <Th color="White">Approve</Th>
//   <Th color="White">Disapprove</Th>
//   <Th color="White">Delete</Th> */}
//     </Tr>
//   </Thead>
//   <Tbody>
//     <Tr key={user._id}>
//       <Td bg="white" color="black">
//         {user.last_name}
//       </Td>
//       <Td bg="white" color="black">
//         {user.first_name}
//       </Td>
//       <Td>
//         {/* <Link to={`/view/${user.id}`} color="#00b0ff"> */}
//         {user.resume.father_name}
//         {/* </Link> */}
//       </Td>
//       <Td>
//         {/* <Link to={`/view/${user.id}`} color="#00b0ff"> */}
//         {user.mobile}
//         {/* </Link> */}

//       </Td>
//       <Td>
//         {user.email}
//       </Td>
//       <Td>
//         {/* {"passport photo"} */}
//         {/* <img src={`/${host}/${user._id}/${user.passport}`} alt="passport" /> */}
//         <img src={`${host}/${user._id}/${user.resume.passport}`} alt="candidate" />
//       </Td>
//       <Td>
//         {/* {"candidate photo"} */}
//         <img src={`${host}/${user._id}/${user.resume.candidate}`} alt="candidate" />
//         {/* <img src={`/${host}/${user._id}/${user.candidate}`} alt="candidate" /> */}
//       </Td>
//       <Td>
//         <button >View More</button>
//       </Td>

//       <Td >
//         <p className='min-w-max h-[50px]'>Year 1/ semester 1</p>
//         <p className='min-w-max h-[50px]'>Year 2/ semester 2</p>
//         <p className='min-w-max h-[50px]'>Year 3/ semester 3</p>
//       </Td>
//       <Td >
        
//         <a className='min-w-max h-[50px] block' href={getSem(user.resume.post_graduate, 1)[0] ? `${host}/${user._id}/${getSem(user.resume.post_graduate, 1)[0].marksheet}` : "#"} target='_blank'>{getSem(user.resume.post_graduate, 1)[0] ? "View and Download" : "Not Added"}</a>
//         <a className='min-w-max h-[50px] block' href={getSem(user.resume.post_graduate, 2)[0] ? `${host}/${user._id}/${getSem(user.resume.post_graduate, 2)[0].marksheet}` : "#"} target='_blank'>{getSem(user.resume.post_graduate, 2)[0] ? "View and Download" : "Not Added"}</a>
//         <a className='min-w-max h-[50px] block' href={getSem(user.resume.post_graduate, 3)[0] ? `${host}/${user._id}/${getSem(user.resume.post_graduate, 3)[0].marksheet}` : "#"} target='_blank'>{getSem(user.resume.post_graduate, 3)[0] ? "View and Download" : "Not Added"}</a>
//       </Td>
//       <Td>
//         <a className='min-w-max h-[50px] block' href={getSem(user.resume.under_graduate, 1)[0] ? `${host}/${user._id}/${getSem(user.resume.under_graduate, 1)[0].marksheet}` : "#"} target='_blank'>{getSem(user.resume.under_graduate, 1)[0] ? "View and Download" : "Not Added"}</a>
//         <a className='min-w-max h-[50px] block' href={getSem(user.resume.under_graduate, 2)[0] ? `${host}/${user._id}/${getSem(user.resume.under_graduate, 2)[0].marksheet}` : "#"} target='_blank'>{getSem(user.resume.under_graduate, 2)[0] ? "View and Download" : "Not Added"}</a>
//         <a className='min-w-max h-[50px] block' href={getSem(user.resume.under_graduate, 3)[0] ? `${host}/${user._id}/${getSem(user.resume.under_graduate, 3)[0].marksheet}` : "#"} target='_blank'>{getSem(user.resume.under_graduate, 3)[0] ? "View and Download" : "Not Added"}</a>
//       </Td>
//       <Td>
//         <a href={`${host}/${user._id}/${user.resume.twelweth.marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
//           View and Download
//         </a>
//       </Td>
//       <Td>
//         <a href={`${host}/${user._id}/${user.resume.eleventh.marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
//           View and Download
//         </a>
//       </Td>
//       <Td>
//         <a href={`${host}/${user._id}/${user.resume.tenth.marksheet}`} color="#00b0ff" target='_blank' rel="noopener noreferrer">
//           View and Download
//         </a>
//       </Td>
//       <Td >
//         <p> {user.resume.status ? user.resume.status === "true" || true ? "Approved" : "DisApproved" : "Not Decided Yet"}</p>
//       </Td>
//       <Td >
//         {/* <p> {user.resume.status?user.resume.status==="true"?"Approved":"DisApproved":"Not Decided Yet"}</p> */}
//         {user.resume.status && (user.resume.status === "true" || true) ? (
//           <a href={`/cv?email=${user.email}`} className="text-white">
//             <button
//               className="bg-green-500 text-white p-2 rounded-md"
//               disabled={false}
//             >
//               Download
//             </button>
//           </a>
//         ) : (
//           <button className="bg-gray-500 text-white p-2 rounded-md" disabled={true}>
//             Download
//           </button>
//         )}

//       </Td>
//       <Td>
//         <button className='p-2 bg-red-700 rounded-md text-white' onClick={() => deleteResume(user.resume._id, user._id)}>Delete</button>
//       </Td>
//     </Tr>

//   </Tbody>
// </Table>
// </Box>}