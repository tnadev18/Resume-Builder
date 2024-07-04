// VerificationPage.js
import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
 
} from '@chakra-ui/react';

const VerificationPage = () => {
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
 

  const handleAnswerSubmit = () => {
    // Simulate sending a password to the user's email
    // In a real application, this would involve backend logic for verification and email sending
    console.log(`Password sent to email. Answer: ${answer}`);

    // Set isSubmitted to true for demo purposes
    setIsSubmitted(true);
  };

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" bg="#00b0ff">
        <Heading mb={4} textAlign="center" color="white">
          Verify Your Identity
        </Heading>
        {isSubmitted ? (
          <Box color="white" textAlign="center">
            Password sent to your email. Check your inbox!
          </Box>
        ) : (
          <form>
            <FormControl mb={4} isRequired>
              <FormLabel color="white">What is your favorite food?</FormLabel>
              <Input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                color="black"
                bg="white"
              />
            </FormControl>
            <Button
              type="button"
              colorScheme="blackAlpha"
              width="100%"
              onClick={handleAnswerSubmit}
            >
              Submit
            </Button>
          </form>
        )}
      </Box>
    </Flex>
  );
};

export default VerificationPage;
