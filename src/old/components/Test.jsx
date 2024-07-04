import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Divider, List, ListItem,Button} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import ReactToPrint from "react-to-print";

import axios from 'axios';
const StudentProfile = () => {
  const ref = React.useRef(null);

  // const [student,setStudent] = useState();
  const [data, setData] = useState({});

  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paramValue = queryParams.get('email');
    axios.get(`${process.env.REACT_APP_HOST}/getStudentByEmail/${paramValue}`,{headers:{'authToken':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3YzYwN2YxYTE5OWVkYjNiNTU0MmE0IiwidXNlck5hbWUiOiJQYXJ0aEJhcnNlIn0sImlhdCI6MTcwMjgzNjgwNH0.vuSGAts4bfjC9EUaGwjeIkaYpH0Esr_5uz-z0SAR0_s'}}).then(x => setData(x.data));
    console.log('run')
  }, [location.search]);

  useEffect(() => {
    console.log('hello' + data)
  }, [data])

  if(!data.student){
    return <h3>loading...</h3>
  }

  return (
    <Box p={4}>
      <div ref={ref}>
      <Heading as="h2" size="lg" mb={4}>
        Student Profile
      </Heading>
      <Divider my={4} />
      <Box mb={4}>
        <Heading as="h3" size="md" mb={2}>
          Personal Information
        </Heading>
        <Text>Name: {`${data.student.first_name} ${data.student.last_name}`}</Text>
        <Text>Email: {data.student.email}</Text>
        <Text>Mobile: {data.student.mobile}</Text>
        {/* <Text>Father's Name: {data.student.resume.father_name}</Text> */}
        <Text>Address: {data.student.resume.address}</Text>
        <Text>Contact Number: {data.student.resume.birth_date}</Text>
        <Text>Birth Date: {data.student.resume.birth_date}</Text>
        <Text>Place of Birth: {data.student.resume.place_of_birth}</Text>
        <Text>Marital Status: {data.student.resume.marital_status}</Text>
        <Text>Gender: {data.student.resume.gender}</Text>
      </Box>

      <Box mb={4}>
        <Heading as="h3" size="md" mb={2}>
          Computer Skills
        </Heading>
        <List>
          {data.student.resume.computer_skills.map((skill, index) => (
            <ListItem key={index}>{skill}</ListItem>
          ))}
        </List>
      </Box>

      <Box mb={4}>
        <Heading as="h3" size="md" mb={2}>
          Hobbies
        </Heading>
        <List>
          {data.student.resume.hobbies.map((hobby, index) => (
            <ListItem key={index}>{hobby}</ListItem>
          ))}
        </List>
      </Box>
      </div>

      <div>
            <ReactToPrint
              trigger={() => (
                <Button
                  colorScheme="messenger"
                  w="max-content"
                >
                  Download
                </Button>
              )}
              content={() => ref.current}
            />
          </div>

      {/* <Box mb={4}>
        <Heading as="h3" size="md" mb={2}>
          Passport
        </Heading>
        <img src={passport} alt="Passport" />
      </Box> */}
      
    </Box>
  );
};

export default StudentProfile;
