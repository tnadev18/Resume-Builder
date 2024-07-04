import { AddIcon, ArrowRightIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  FormControl,
  Textarea,
  FormHelperText,
  Alert, AlertIcon,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Stack,
  Radio,
  Box,
  RadioGroup,
  Heading,
  Select,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ResumeTemplate from "../Components/template";
import { ResumeContext } from "../context/ResumeContext";
import passport from '../assets/passport.png';

export default function Personal({ action, }) {

  const navigation = useNavigate();
  useEffect(() => {

    const s = localStorage.getItem("sid");
    console.log(s);
    if (localStorage.getItem("sid") || localStorage.getItem("aid")) {

    } else {
      navigation('/');
    }
  })
  const { setResumeInfo } = useContext(ResumeContext)


  const paragraphStyle = {
    color: "red",
  };

  // const [resume, setResume] = useState({});

  const [resume, setResume] = useState({
    language: "",
    jobType: "",
    firstName: "",
    lastName: "",
    country: "",
    nationality: "",
    address: "",
    address2: "",
    address3: "",
    gender: " ",
    contactNumber: "",
    email: "",
    dob: "",
    placeOfBirth: "",
    passportNumber: "",
    passport: "",
    maritalStatus: "",
    hobby: ['',],
    computerSkill: ['',],
    candidatePhoto: "",
  });

  const [errors, setErrors] = useState({
    language: "",
    firstName: "",
    lastName: "",
    gender: " ",

    country: "",
    address: "",
    contactNumber: "",
    email: "",
    dob: "",
    placeOfBirth: "",
    passportNumber: "",
    passport: "",
    maritalStatus: "",
    hobby: [""],
    computerSkill: [""],
    candidatePhoto: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert value to uppercase if the field is 'lastName'
    const updatedValue = name === 'lastName' ? value.toUpperCase() : value;

    // Update resume state
    setResume({ ...resume, [name]: updatedValue });

    // Validate the field
    validateField(name, updatedValue);

    // Format the date field if it is the 'dob' field
    if (name === 'dob') {
      const formattedDate = formatDateString(updatedValue);
      setResume((prevResume) => ({ ...prevResume, [name]: formattedDate }));
    }
  };






  const validateField = (fieldName, value) => {

    if (fieldName === "hobby" || fieldName === "computerSkill") {
      // You can add validation logic specific to these array elements here
      // For example, ensure that the first element is not an empty string
      if (Array.isArray(value) && value.length > 0 && value[0].trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `${fieldName} is required.`,
        }));
        return fieldName; // Return the field name for tracking
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "",
        }));
        return null;
      }
    }


    switch (fieldName) {
      case "language":
      case "jobType":
      case "passport":
      case "candidatePhoto":
      case "firstName":
      case "lastName":
      case "country":
      case "address":
      case "placeOfBirth":
      case "hobby":
      case "computerSkill":
      case "maritalStatus":
      case "gender":
        return validateRequiredField(fieldName, value);

      case "contactNumber":
        return validatePhoneNumberField(fieldName, value);

      case "email":
        return validateEmailField(fieldName, value);

      case "dob":
        return validateDateOfBirthField(fieldName, value);

      case "passportNumber":
        return validatePassportNumberField(fieldName, value);

      // Add more cases for other fields if needed

      default:
        return null;
    }
  };

  const validateRequiredField = (fieldName, value) => {
    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `required.`,
      }));
      return fieldName;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
      return null;
    }
  };

  const validatePhoneNumberField = (fieldName, value) => {
    // Basic phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Invalid ${fieldName}.`,
      }));
      return fieldName;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
      return null;
    }
  };

  const validateEmailField = (fieldName, value) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Invalid ${fieldName}.`,
      }));
      return fieldName;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
      return null;
    }
  };

  const validateDateOfBirthField = (fieldName, value) => {
    // Basic date of birth validation
    // You can replace this with your specific date of birth validation logic
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `${fieldName} is required.`,
      }));
      return fieldName;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
      return null;
    }
  };

  const validatePassportNumberField = (fieldName, value) => {
    
    const passportRegex = /^[A-Za-z0-9]{8,12}$/;

    if (!passportRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Invalid ${fieldName}. Must be alphanumeric and between 8 and 12 digits.`,
      }));
      return fieldName;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
      return null;
    }
  };


  const handleViewClick = (fieldName) => {
    const url = resume[fieldName];
    if (url) {
      window.open(url, '_blank');
    }
  };

  const [filecandidatePhoto, setfilecandidatePhoto] = useState('');
  // const [inputKey1, setInputKey1] = useState(Date.now());

  const [filepassport, setfilepassport] = useState('');
  // const [inputKey, setInputKey] = useState(Date.now());


  const handleDeleteClick = async (fieldName) => {
    const urlToDelete = resume[fieldName];
    console.log(urlToDelete,fieldName)
    console.log(localStorage.getItem('SIDofStudentToEdit'))
    if (!urlToDelete) {
      alert('No file to delete.');
      return;
    }
    try {
      const response =
      await axios.post('https://testapi1.nursingpioneer.com/deleteFile', {
        sid:localStorage.getItem("sid"),
        url: urlToDelete,
      });
console.log(response)
      // Update the state to remove the deleted file
      setResume({ ...resume, [fieldName]: '' });
      switch (fieldName) {
        case 'candidatePhoto':
          document.getElementById('candidatePhotoInput').value = '';
          setfilecandidatePhoto('');
          // setInputKey(Date.now());
          break;
        case 'passport':
          document.getElementById('passportInput').value = '';
          setfilepassport('');
          // setInputKey1(Date.now());
          break;
        // Add more cases as needed
        default:
          break;
      }
    } catch (err) {
      alert('Error deleting file');
    }

  };


  

  const handleNext = async (e) => {
    window.scrollTo(0, 0);
    setIsSubmitted(true);

    e.preventDefault();

    // Array to store empty fields
    const emptyFields = [];

    // Validate all fields before proceeding
    Object.keys(resume).forEach((fieldName) => {
      const emptyField = validateField(fieldName, resume[fieldName]);
      if (emptyField) {
        emptyFields.push(emptyField);
      }
    });

    // Check if there are no errors before proceeding
    if (emptyFields.length === 0) {
      // Save data to localStorage
      localStorage.setItem("personal", JSON.stringify(resume));
      setResume(localStorage.getItem("personal"));



      // Navigate to the next step
      navigation("/education");
    } else {
      //  alert(`The following fields are empty: ${emptyFields.join(", ")}`);
      // Optionally, you can display an error message or handle validation errors here.
    }
  };
  useEffect(() => {
    if (action === "create") {
      // localStorage.removeItem("SIDofStudentToEdit");
      // localStorage.removeItem("personal");
      // localStorage.removeItem("education");
      // localStorage.removeItem("work");
      // localStorage.removeItem("internship");
      // localStorage.removeItem("declaration");
      // localStorage.removeItem("motivation");
    }
    else {
      const personal = JSON.parse(localStorage.getItem("personal"));
      if (personal) {
        setResume(personal)
      }
    }
  }, [])
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleRadioChange = (event) => {
    console.log(event.target.value);
  };

  useEffect(() => {
    console.log(resume)
  }, [resume])

  const formatDateString = (inputDateString) => {
    const dateArray = inputDateString;

    return inputDateString;
  };

  const [showImage, setShowImage] = useState(false);

  const toggleImage = () => {
    setShowImage(!showImage);
  };


  const head = resume.language === 'English' ? 'PERSONAL DATA' : resume.language === 'German' ? 'PERSÖNLICHE ANGABEN' : 'PERSONAL DATA'
  const givenName = resume.language === 'English' ? 'Given Name(s)' : resume.language === 'German' ? 'Vorname' : ''
  const surName = resume.language === 'English' ? 'Surname' : resume.language === 'German' ? 'Nachname' : ''
  const Country = resume.language === 'English' ? 'Country' : resume.language === 'German' ? 'Länder' : ''
  const Address = resume.language === 'English' ? 'Address' : resume.language === 'German' ? 'Adresse' : ''
  const contactNumber = resume.language === 'English' ? 'Contact Number' : resume.language === 'German' ? 'Kontaknummer' : ''
  const emailAddress = resume.language === 'English' ? 'Email address' : resume.language === 'German' ? 'E-Mail-Adresse' : ''
  const Birthdate = resume.language === 'English' ? 'Birthdate' : resume.language === 'German' ? 'Geburtsdatum' : ''
  const placeOfBirth = resume.language === 'English' ? 'Place of Birth ' : resume.language === 'German' ? 'Geburtsort' : ''
  const passportNumber = resume.language === 'English' ? 'Passport Number' : resume.language === 'German' ? 'Reisepassnummer' : ''
  const maritalStatus = resume.language === 'English' ? 'Marital Status' : resume.language === 'German' ? 'Familienstand' : ''
  const Gender = resume.language === 'English' ? 'Gender' : resume.language === 'German' ? 'Geschlecht(wie im reisepass)' : ''
  const Hobbies = resume.language === 'English' ? 'Hobbies ' : resume.language === 'German' ? 'Hobbies' : ''
  const computerSkills = resume.language === 'English' ? 'Computer skills ' : resume.language === 'German' ? 'Computerkenntnisse' : ''
  const candidateImage = resume.language === 'English' ? 'Candidate Image' : resume.language === 'German' ? 'foto des kandidaten ' : ''
  const nameInfo = resume.language === 'English' ? 'Your full name must match that of your (future) passport and must be spelled in full. Abbreviated names will not be accepted. All documents, i.e. CV, certificates and relevant documents, must match. Your name(s) should be the same everywhere, otherwise your VISA and recognition procedure in Germany will be rejected due to errors by the official German authorities. In the worst case, you will risk not being allowed to enter Germany' : resume.language === 'German' ? 'Ihre ganze Name musst mit ihrem (zukünftliche) Reisepass zusammenpassen und vollständig geschrieben sein. Abgekürzte Namen werden nicht akzeptiert. Alle Dokumente wie; Lebenslauf, Bescheinigungen und relevante Unterlagen müssen zusammenpassen. Ihre Name soll überall dieselbe sein, sonst wird Ihre Anerkennugsverfahren in Deutschland wegen die Fehler von offiziellen deutschen Behörden abgesoßen. Im schlimmsten Fall werden Sie ins Deutschland verboten sein/ Sie riskieren, nicht nach Deutschland einreisen zu dürfen. ' : ''
  const addressInfo = resume.language === 'English' ? '3 lines (like in passport) / 3 Zeilen (wie im Reisepass) Instructions to the Candidate: You must enter the exact address as it is (or will be) in your passport. This is usually three lines for the address. The same address will be used by the German employer to prepare your offer letter and your employment contract. Note: The German authorities will also check your CV for the VISA application and other applications, e. g. for recognition. They will reject applications where the information in the documents does not match. Any later correction will lead to high costs.' : resume.language === 'German' ? 'Sie müssen die präzise Adresse eingeben, die in Ihrem Reisepass steht (oder werden sein). Normalerweise gibt es drei Zeilen für die Adresse. Die gleiche Adresse wird von dem deutschen Arbeitsgeber verwendet, um Ihr Angebotsschreiben und Anstellungsvertrag vorzubereiten. Notiz: Die deutsche Behörde werden auch Ihren Lebenslauf für den Visum und anderen Antrag; zum Beispiel Anerkennung prüfen. Sie werden die Bewerbungen abstoßen, in denen die Information in den Dokumenten enthält, die nicht zusammenpassen. Die spätere Korrekturen werden zu hohen Kosten führen. ' : ''
  const contactInfo = resume.language === 'English' ? ' Contact No. of Candidate is required in this field. Candidates are not allowed to write their Parents or relatives contact number here. Your Contact Number should be same everywhere i.e. CV and all other relevant documents. All communication for employment and migration process will be done to this contact number only' : resume.language === 'German' ? 'In diesem Bereich ist die Kontaknummer des Kandidates benötigt. Die Kandidaten dürfen hier die Kontaktnummer von ihren Eltern oder Verwandeten nicht schreiben. Ihre Kontaktnummer soll überall wie; Lebenslauf und in anderen relevanten Dokumenten dieselbe sein. Die gesamte Kommunikation zum Beschäftigungs und Migrationsprozess erfolgt ausschließlich über diese Kontaktnummer. ' : ''
  const emailInfo = resume.language === 'English' ? 'Keep only one email address for all your documents. Your email Address should be same everywhere i.e. CV and all other relevant documents. All communication will be done to this email address only' : resume.language === 'German' ? 'Behalten nur eine Email Adresse für alle Ihre Dokumente. Ihre Email Adresse soll überall wie; Lebenslauf und andere relevante Dokumente dieselbe sein. Die gesamte Kommunikation erfolgt ausschließlich über diese Email Adresse. ' : ''
  const genderInfo = resume.language === 'English' ? ' Attention! Enter your birthdate, place of birth, Marital Status, Gender & Passport Number correctly. It will be checked in migration and employment process by the authorities.' : resume.language === 'German' ? ' Achtung! Geben Sie Ihre Geburtsdatum, Geburtsort, Familienstand, Geschlect und Reisepassnummer korrekt ein. Während der Migrations und Beschäftigungsprozess werden die Behörde diese Einzelheiten prüfen. ' : ''
  const photoInfo = resume.language === 'English' ? 'The photo must be a passport photo and should be the same everywhere. A high-resolution photo is required,Photo Size: 35X45mm, white background, 80% face size.' : resume.language === 'German' ? 'Das Foto muss ein Passfoto sein und soll überall dieselbe sein. Hochauflösendes Foto erforderlich.' : ''
  const Nationality = resume.language === 'English' ? 'Nationality' : resume.language === 'German' ? 'Staatsangehörigkeit' : ''

  useEffect(() => {
    if (localStorage.getItem("personal")) {
      setResume(JSON.parse(localStorage.getItem("personal")))
    }
  }, [])

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
            <div style={{ overflowX: 'auto', marginRight: '-20px' }}>
              <FormLabel>
                Choose one Language to fill up the form<span style={{ color: "red" }}>*</span>
              </FormLabel>
            </div>
            <SimpleGrid columns={[1, 1, 1, 2]} spacing={9} placeItems="center">
              <FormControl isInvalid={Boolean(errors.language)}>

                <Box p={4}>
                  <input
                    type="radio"
                    name="language"
                    value="English"
                    onChange={handleChange}
                    checked={resume.language === "English"}
                  /> English
                  <br />
                  <input
                    type="radio"
                    name="language"
                    value="German"
                    onChange={handleChange}
                    checked={resume.language === "German"}
                  /> German
                </Box><FormErrorMessage>{"required."}</FormErrorMessage>
              </FormControl>
              <br />

              <FormControl isInvalid={Boolean(errors.jobType)}>

                <FormLabel>
                  Apprenticeship/Job<span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Box p={4}>
                  <label>
                    <input
                      type="radio"
                      name="jobType"
                      value="Apprenticeship"
                      onChange={handleChange}
                      checked={resume.jobType === "Apprenticeship"}
                    /> Apprenticeship
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="jobType"
                      value="Job"
                      onChange={handleChange}
                      checked={resume.jobType === "Job"}
                    /> Job
                  </label>
                </Box><FormErrorMessage>{"required."}</FormErrorMessage>
              </FormControl>
              <br />


              <FormControl isInvalid={Boolean(errors.lastName)}>
                <FormLabel>{surName}<span style={{ color: "red" }}>*</span></FormLabel>
                <Input
                  type="text"
                  placeholder="Your last name"
                  name="lastName"
                  value={resume.lastName.toUpperCase()}
                  onChange={handleChange}

                /><FormErrorMessage>{"required."}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.firstName)}>
                <FormLabel>
                  {givenName}<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Your first name"
                  name="firstName"
                  value={resume.firstName.charAt(0).toUpperCase() + resume.firstName.slice(1).toLowerCase()}
                  onChange={handleChange}

                />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>

              </FormControl>
              





         
            </SimpleGrid><br />
            <p style={paragraphStyle}>
              {nameInfo}
            </p>
            <br />




            <FormControl isInvalid={Boolean(errors.country)}>
              <FormLabel>{Country}<span style={{ color: "red" }}>*</span>: </FormLabel>
              <Select
                type="text"
                placeholder=" country"
                name="country"
                onChange={handleChange}

              >
                <option>India</option>
                <option>Afghanistan</option>
                <option>Albania</option>
                <option>Algeria</option>
                <option>Andorra</option>
                <option>Angola</option>
                <option>Antarctica</option>
                <option>Argentina</option>
                <option>Armenia</option>
                <option>Aruba</option>
                <option>Australia</option>
                <option>Austria</option>
                <option>Azerbaijan</option>
                <option>Bahamas</option>
                <option>Bahrain</option>
                <option>Bangladesh</option>
                <option>Barbados</option>
                <option>Belarus</option>
                <option>Belgium</option>
                <option>Belize</option>
                <option>Benin</option>
                <option>Bermuda</option>
                <option>Bhutan</option>
                <option>Bolivia</option>
                <option>Bosnia and Herzegovina</option>
                <option>Botswana</option>
                <option>Brazil</option>
                <option>British Indian Ocean Territory (UK)</option>
                <option>British Virgin Islands (UK)</option>
                <option>Brunei</option>
                <option>Bulgaria</option>
                <option>Burkina Faso</option>
                <option>Burundi</option>
                <option>Cambodia</option>
                <option>Cameroon</option>
                <option>Canada</option>
                <option>Cape Verde</option>
                <option>Caribbean Netherlands</option>
                <option>Cayman Islands (UK)</option>
                <option>Central African Republic</option>
                <option>Chad</option>
                <option>Chile</option>
                <option>China</option>
                <option>Christmas Island (Australia)</option>
                <option>Cocos (Keeling) Islands (Australia)</option>
                <option>Colombia</option>
                <option>Comoros</option>
                <option>Cook Islands (New Zealand)</option>
                <option>Costa Rica</option>
                <option>Croatia</option>
                <option>Cuba</option>
                <option>Curaçao (Netherlands)</option>
                <option>Cyprus</option>
                <option>Czech Republic</option>
                <option>Democratic Republic of the Congo</option>
                <option>Denmark</option>
                <option>Djibouti</option>
                <option>Dominica</option>
                <option>Dominican Republic</option>
                <option>Timor-Leste</option>
                <option>Ecuador</option>
                <option>Egypt</option>
                <option>El Salvador</option>
                <option>Equatorial Guinea</option>
                <option>Eritrea</option>
                <option>Estonia</option>
                <option>Eswatini</option>
                <option>Ethiopia</option>
                <option>Falkland Islands (UK)</option>
                <option>Faroe Islands (Denmark)</option>
                <option>Fiji</option>
                <option>Finland</option>
                <option>France</option>
                <option>French Polynesia (France)</option>
                <option>Gabon</option>
                <option>Gambia</option>
                <option>Georgia</option>
                <option>Germany</option>
                <option>Ghana</option>
                <option>Gibraltar (UK)</option>
                <option>Greece</option>
                <option>Greenland (Denmark)</option>
                <option>Grenada</option>
                <option>Guam</option>
                <option>Guatemala</option>
                <option>Guernsey (UK)</option>
                <option>Guinea</option>
                <option>Guinea-Bissau</option>
                <option>Guyana</option>
                <option>Haiti</option>
                <option>Honduras</option>
                <option>Hong Kong</option>
                <option>Hungary</option>
                <option>Iceland</option>
                <option>Indonesia</option>
                <option>Iran</option>
                <option>Iraq</option>
                <option>Ireland</option>
                <option>Isle of Man (UK)</option>
                <option>Israel</option>
                <option>Italy</option>
                <option>Ivory Coast</option>
                <option>Jamaica</option>
                <option>Japan</option>
                <option>Jersey (UK)</option>
                <option>Jordan</option>
                <option>Kazakhstan</option>
                <option>Kenya</option>
                <option>Kiribati</option>
                <option>Kosovo</option>
                <option>Kuwait</option>
                <option>Kyrgyzstan</option>
                <option>Laos</option>
                <option>Latvia</option>
                <option>Lebanon</option>
                <option>Lesotho</option>
                <option>Liberia</option>
                <option>Libya</option>
                <option>Liechtenstein</option>
                <option>Lithuania</option>
                <option>Luxembourg</option>
                <option>Macau</option>
                <option>Madagascar</option>
                <option>Malawi</option>
                <option>Malaysia</option>
                <option>Maldives</option>
                <option>Mali</option>
                <option>Malta</option>
                <option>Marshall Islands</option>
                <option>Mauritania</option>
                <option>Mauritius</option>
                <option>Mayotte (France)</option>
                <option>Mexico</option>
                <option>Micronesia</option>
                <option>Moldova</option>
                <option>Monaco</option>
                <option>Mongolia</option>
                <option>Montenegro</option>
                <option>Montserrat (UK)</option>
                <option>Morocco</option>
                <option>Mozambique</option>
                <option>Myanmar</option>
                <option>Namibia</option>
                <option>Nauru</option>
                <option>Nepal</option>
                <option>Netherlands</option>
                <option>New Caledonia (France)</option>
                <option>New Zealand</option>
                <option>Nicaragua</option>
                <option>Niger</option>
                <option>Nigeria</option>
                <option>Niue (New Zealand)</option>
                <option>North Korea</option>
                <option>North Macedonia</option>
                <option>Northern Mariana Islands (USA)</option>
                <option>Norway</option>
                <option>Oman</option>
                <option>Pakistan</option>
                <option>Palau</option>
                <option>Palestine</option>
                <option>Panama</option>
                <option>Papua New Guinea</option>
                <option>Paraguay</option>
                <option>Peru</option>
                <option>Philippines</option>
                <option>Pitcairn Islands (New Zealand)</option>
                <option>Poland</option>
                <option>Portugal</option>
                <option>Puerto Rico (USA)</option>
                <option>Qatar</option>
                <option>Republic of the Congo</option>
                <option>Réunion (France)</option>
                <option>Romania</option>
                <option>Russia</option>
                <option>Rwanda</option>
                <option>Saint Barthélemy (France)</option>
                <option>Saint Helena (UK)</option>
                <option>Saint Kitts and Nevis</option>
                <option>Saint Lucia</option>
                <option>Saint Martin (France)</option>
                <option>Saint Pierre and Miquelon (France)</option>
                <option>Saint Vincent and the Grenadines</option>
                <option>Samoa</option>
                <option>San Marino</option>
                <option>Sao Tome and Principe</option>
                <option>Saudi Arabia</option>
                <option>Senegal</option>
                <option>Serbia</option>
                <option>Seychelles</option>
                <option>Sierra Leone</option>
                <option>Singapore</option>
                <option>Sint Maarten (Netherlands)</option>
                <option>Slovakia</option>
                <option>Slovenia</option>
                <option>Solomon Islands</option>
                <option>Somalia</option>
                <option>South Africa</option>
                <option>South Korea</option>
                <option>South Sudan</option>
                <option>Spain</option>
                <option>Sri Lanka</option>
                <option>Sudan</option>
                <option>Suriname</option>
                <option>Sweden</option>
                <option>Switzerland</option>
                <option>Syria</option>
                <option>Taiwan</option>
                <option>Tajikistan</option>
                <option>Tanzania</option>
                <option>Thailand</option>
                <option>The Gambia</option>
                <option>Timor-Leste</option>
                <option>Togo</option>
                <option>Tokelau (New Zealand)</option>
                <option>Tonga</option>
                <option>Trinidad and Tobago</option>
                <option>Tunisia</option>
                <option>Turkey</option>
                <option>Turkmenistan</option>
                <option>Turks and Caicos Islands (UK)</option>
                <option>Tuvalu</option>
                <option>Uganda</option>
                <option>Ukraine</option>
                <option>United Arab Emirates</option>
                <option>United Kingdom</option>
                <option>United States</option>
                <option>Uruguay</option>
                <option>Uzbekistan</option>
                <option>Vanuatu</option>
                <option>Vatican City</option>
                <option>Venezuela</option>
                <option>Vietnam</option>
                <option>Wallis and Futuna (France)</option>
                <option>Western Sahara</option>
                <option>Yemen</option>
                <option>Zambia</option>
                <option>Zimbabwe</option>
              </Select>
              <FormErrorMessage>{"required."}</FormErrorMessage>
              <br />

            </FormControl>

            <FormControl isInvalid={Boolean(errors.address)}>
              <FormLabel>{Address}<span style={{ color: "red" }}>*</span>: </FormLabel>
              <Input
                placeholder="line 1"

                name="address"
                value={resume.address}
                onChange={handleChange}
              /><FormErrorMessage>{"required."}</FormErrorMessage>
              <Input
                placeholder="line 2"

                name="address2"
                value={resume.address2}
                onChange={handleChange}
              /><FormErrorMessage>{"required."}</FormErrorMessage>
              <Input
                placeholder="line 3"

                name="address3"
                value={resume.address3}
                onChange={handleChange}
              /><FormErrorMessage>{"required."}</FormErrorMessage>
            </FormControl>
            <br />
            <p style={paragraphStyle}>
              {addressInfo}
            </p>


            <br />
            <FormControl isInvalid={Boolean(errors.contactNumber)}>
              <FormLabel >{contactNumber}<span style={{ color: "red" }}>*</span>:</FormLabel>

              <InputGroup>

                <Select
                  w="20rem"
                  // placeholder="Select an option"
                  name="countryCode"
                  value={resume.countryCode}
                  onChange={handleChange}
                >
                  <option>+91 IN: India</option>
                  <option>+93 AF: Afghanistan</option>
                  <option>+355 AL: Albania</option>
                  <option>+213 DZ: Algeria</option>
                  <option>+376 AD: Andorra</option>
                  <option>+244 AO: Angola</option>
                  <option>+672 AQ: Antarctica</option>
                  <option>+54 AR: Argentina</option>
                  <option>+374 AM: Armenia</option>
                  <option>+297 AW: Aruba</option>
                  <option>+61 AU: Australia</option>
                  <option>+43 AT: Austria</option>
                  <option>+994 AZ: Azerbaijan</option>
                  <option>+1 BS: Bahamas</option>
                  <option>+973 BH: Bahrain</option>
                  <option>+880 BD: Bangladesh</option>
                  <option>+1 BB: Barbados</option>
                  <option>+375 BY: Belarus</option>
                  <option>+32 BE: Belgium</option>
                  <option>+501 BZ: Belize</option>
                  <option>+229 BJ: Benin</option>
                  <option>+1 BM: Bermuda</option>
                  <option>+975 BT: Bhutan</option>
                  <option>+591 BO: Bolivia</option>
                  <option>+387 BA: Bosnia and Herzegovina</option>
                  <option>+267 BW: Botswana</option>
                  <option>+55 BR: Brazil</option>
                  <option>+1 IO: British Indian Ocean Territory (UK)</option>
                  <option>+1 VG: British Virgin Islands (UK)</option>
                  <option>+673 BN: Brunei</option>
                  <option>+359 BG: Bulgaria</option>
                  <option>+226 BF: Burkina Faso</option>
                  <option>+257 BI: Burundi</option>
                  <option>+855 KH: Cambodia</option>
                  <option>+237 CM: Cameroon</option>
                  <option>+1 CA: Canada</option>
                  <option>+238 CV: Cape Verde</option>
                  <option>+599 AN: Caribbean Netherlands</option>
                  <option>+1 KY: Cayman Islands (UK)</option>
                  <option>+236 CF: Central African Republic</option>
                  <option>+235 TD: Chad</option>
                  <option>+56 CL: Chile</option>
                  <option>+86 CN: China</option>
                  <option>+61 CX: Christmas Island (Australia)</option>
                  <option>+61 CC: Cocos (Keeling) Islands (Australia)</option>
                  <option>+57 CO: Colombia</option>
                  <option>+269 KM: Comoros</option>
                  <option>+682 CK: Cook Islands (New Zealand)</option>
                  <option>+506 CR: Costa Rica</option>
                  <option>+385 HR: Croatia</option>
                  <option>+53 CU: Cuba</option>
                  <option>+599 CW: Curaçao (Netherlands)</option>
                  <option>+357 CY: Cyprus</option>
                  <option>+420 CZ: Czech Republic</option>
                  <option>+243 CD: Democratic Republic of the Congo</option>
                  <option>+45 DK: Denmark</option>
                  <option>+253 DJ: Djibouti</option>
                  <option>+1 DM: Dominica</option>
                  <option>+1 DO: Dominican Republic</option>
                  <option>+670 TL: Timor-Leste</option>
                  <option>+593 EC: Ecuador</option>
                  <option>+20 EG: Egypt</option>
                  <option>+503 SV: El Salvador</option>
                  <option>+240 GQ: Equatorial Guinea</option>
                  <option>+291 ER: Eritrea</option>
                  <option>+372 EE: Estonia</option>
                  <option>+268 SZ: Eswatini</option>
                  <option>+251 ET: Ethiopia</option>
                  <option>+500 FK: Falkland Islands (UK)</option>
                  <option>+298 FO: Faroe Islands (Denmark)</option>
                  <option>+679 FJ: Fiji</option>
                  <option>+358 FI: Finland</option>
                  <option>+33 FR: France</option>
                  <option>+594 GF: French Guiana (France)</option>
                  <option>+689 PF: French Polynesia (France)</option>
                  <option>+262 RE: Réunion (France)</option>
                  <option>+241 GA: Gabon</option>
                  <option>+220 GM: Gambia</option>
                  <option>+995 GE: Georgia</option>
                  <option>+49 DE: Germany</option>
                  <option>+233 GH: Ghana</option>
                  <option>+350 GI: Gibraltar (UK)</option>
                  <option>+30 GR: Greece</option>
                  <option>+299 GL: Greenland (Denmark)</option>
                  <option>+1 GD: Grenada</option>
                  <option>+590 BL: Saint Barthélemy (France)</option>
                  <option>+1 GP: Guadeloupe (France)</option>
                  <option>+1 GU: Guam</option>
                  <option>+502 GT: Guatemala</option>
                  <option>+44 GG: Guernsey (UK)</option>
                  <option>+224 GN: Guinea</option>
                  <option>+245 GW: Guinea-Bissau</option>
                  <option>+592 GY: Guyana</option>
                  <option>+509 HT: Haiti</option>
                  <option>+504 HN: Honduras</option>
                  <option>+852 HK: Hong Kong</option>
                  <option>+36 HU: Hungary</option>
                  <option>+354 IS: Iceland</option>
                  <option>+62 ID: Indonesia</option>
                  <option>+98 IR: Iran</option>
                  <option>+964 IQ: Iraq</option>
                  <option>+353 IE: Ireland</option>
                  <option>+44 IM: Isle of Man (UK)</option>
                  <option>+972 IL: Israel</option>
                  <option>+39 IT: Italy</option>
                  <option>+225 CI: Ivory Coast</option>
                  <option>+1 JM: Jamaica</option>
                  <option>+81 JP: Japan</option>
                  <option>+44 JE: Jersey (UK)</option>
                  <option>+962 JO: Jordan</option>
                  <option>+7 KZ: Kazakhstan</option>
                  <option>+254 KE: Kenya</option>
                  <option>+686 KI: Kiribati</option>
                  <option>+383 XK: Kosovo</option>
                  <option>+965 KW: Kuwait</option>
                  <option>+996 KG: Kyrgyzstan</option>
                  <option>+856 LA: Laos</option>
                  <option>+371 LV: Latvia</option>
                  <option>+961 LB: Lebanon</option>
                  <option>+266 LS: Lesotho</option>
                  <option>+231 LR: Liberia</option>
                  <option>+218 LY: Libya</option>
                  <option>+423 LI: Liechtenstein</option>
                  <option>+370 LT: Lithuania</option>
                  <option>+352 LU: Luxembourg</option>
                  <option>+853 MO: Macau</option>
                  <option>+389 MK: North Macedonia</option>
                  <option>+261 MG: Madagascar</option>
                  <option>+265 MW: Malawi</option>
                  <option>+60 MY: Malaysia</option>
                  <option>+960 MV: Maldives</option>
                  <option>+223 ML: Mali</option>
                  <option>+356 MT: Malta</option>
                  <option>+692 MH: Marshall Islands</option>
                  <option>+596 MQ: Martinique (France)</option>
                  <option>+222 MR: Mauritania</option>
                  <option>+230 MU: Mauritius</option>
                  <option>+262 YT: Mayotte (France)</option>
                  <option>+52 MX: Mexico</option>
                  <option>+691 FM: Micronesia</option>
                  <option>+373 MD: Moldova</option>
                  <option>+377 MC: Monaco</option>
                  <option>+976 MN: Mongolia</option>
                  <option>+382 ME: Montenegro</option>
                  <option>+1 MS: Montserrat (UK)</option>
                  <option>+212 MA: Morocco</option>
                  <option>+258 MZ: Mozambique</option>
                  <option>+95 MM: Myanmar</option>
                  <option>+264 NA: Namibia</option>
                  <option>+674 NR: Nauru</option>
                  <option>+977 NP: Nepal</option>
                  <option>+31 NL: Netherlands</option>
                  <option>+687 NC: New Caledonia (France)</option>
                  <option>+64 NZ: New Zealand</option>
                  <option>+505 NI: Nicaragua</option>
                  <option>+227 NE: Niger</option>
                  <option>+234 NG: Nigeria</option>
                  <option>+683 NU: Niue (New Zealand)</option>
                  <option>+672 NF: Norfolk Island (Australia)</option>
                  <option>+1 KP: North Korea</option>
                  <option>+1 MP: Northern Mariana Islands (USA)</option>
                  <option>+47 NO: Norway</option>
                  <option>+968 OM: Oman</option>
                  <option>+92 PK: Pakistan</option>
                  <option>+680 PW: Palau</option>
                  <option>+970 PS: Palestine</option>
                  <option>+507 PA: Panama</option>
                  <option>+675 PG: Papua New Guinea</option>
                  <option>+595 PY: Paraguay</option>
                  <option>+51 PE: Peru</option>
                  <option>+63 PH: Philippines</option>
                  <option>+64 PN: Pitcairn Islands (New Zealand)</option>
                  <option>+48 PL: Poland</option>
                  <option>+351 PT: Portugal</option>
                  <option>+1 PR: Puerto Rico (USA)</option>
                  <option>+974 QA: Qatar</option>
                  <option>+262 RE: Réunion (France)</option>
                  <option>+40 RO: Romania</option>
                  <option>+7 RU: Russia</option>
                  <option>+250 RW: Rwanda</option>
                  <option>+290 SH: Saint Helena (UK)</option>
                  <option>+1 KN: Saint Kitts and Nevis</option>
                  <option>+1 LC: Saint Lucia</option>
                  <option>+590 MF: Saint Martin (France)</option>
                  <option>+508 PM: Saint Pierre and Miquelon (France)</option>
                  <option>+1 VC: Saint Vincent and the Grenadines</option>
                  <option>+685 WS: Samoa</option>
                  <option>+378 SM: San Marino</option>
                  <option>+239 ST: Sao Tome and Principe</option>
                  <option>+966 SA: Saudi Arabia</option>
                  <option>+221 SN: Senegal</option>
                  <option>+381 RS: Serbia</option>
                  <option>+248 SC: Seychelles</option>
                  <option>+232 SL: Sierra Leone</option>
                  <option>+65 SG: Singapore</option>
                  <option>+1 SX: Sint Maarten (Netherlands)</option>
                  <option>+421 SK: Slovakia</option>
                  <option>+386 SI: Slovenia</option>
                  <option>+677 SB: Solomon Islands</option>
                  <option>+252 SO: Somalia</option>
                  <option>+27 ZA: South Africa</option>
                  <option>+211 SS: South Sudan</option>
                  <option>+500 GS: South Georgia and the South Sandwich Islands (UK)</option>
                  <option>+82 KR: South Korea</option>
                  <option>+211 ES: Spain</option>
                  <option>+94 LK: Sri Lanka</option>
                  <option>+249 SD: Sudan</option>
                  <option>+597 SR: Suriname</option>
                  <option>+47 SJ: Svalbard and Jan Mayen (Norway)</option>
                  <option>+268 SZ: Eswatini</option>
                  <option>+46 SE: Sweden</option>
                  <option>+41 CH: Switzerland</option>
                  <option>+963 SY: Syria</option>
                  <option>+886 TW: Taiwan</option>
                  <option>+992 TJ: Tajikistan</option>
                  <option>+255 TZ: Tanzania</option>
                  <option>+66 TH: Thailand</option>
                  <option>+228 TG: Togo</option>
                  <option>+690 TK: Tokelau (New Zealand)</option>
                  <option>+676 TO: Tonga</option>
                  <option>+1 TT: Trinidad and Tobago</option>
                  <option>+216 TN: Tunisia</option>
                  <option>+90 TR: Turkey</option>
                  <option>+993 TM: Turkmenistan</option>
                  <option>+1 TC: Turks and Caicos Islands (UK)</option>
                  <option>+688 TV: Tuvalu</option>
                  <option>+1 VI: U.S. Virgin Islands (USA)</option>
                  <option>+256 UG: Uganda</option>
                  <option>+380 UA: Ukraine</option>
                  <option>+971 AE: United Arab Emirates</option>
                  <option>+44 GB: United Kingdom</option>
                  <option>+1 US: United States</option>
                  <option>+598 UY: Uruguay</option>
                  <option>+998 UZ: Uzbekistan</option>
                  <option>+678 VU: Vanuatu</option>
                  <option>+39 VA: Vatican City</option>
                  <option>+58 VE: Venezuela</option>
                  <option>+84 VN: Vietnam</option>
                  <option>+681 WF: Wallis and Futuna (France)</option>
                  <option>+967 YE: Yemen</option>
                  <option>+260 ZM: Zambia</option>
                  <option>+263 ZW: Zimbabwe</option>





                </Select>

                <Input
                  type="number"
                  placeholder="Phone number"
                  maxLength={10}
                  name="contactNumber"
                  value={resume.contactNumber}
                  onChange={(e) => {
                    // Remove non-numeric characters from the input
                    const numericValue = e.target.value.replace(/\D/g, '');

                    // Limit the input to 10 digits
                    const limitedValue = numericValue.slice(0, 10);

                    // Update the state with the limited value
                    handleChange({
                      target: {
                        name: 'contactNumber',
                        value: limitedValue,
                      },
                    });
                  }}
                />
              </InputGroup><FormErrorMessage>{"required."}</FormErrorMessage>
            </FormControl>
            <br />
            <p style={paragraphStyle}>
              {contactInfo}
            </p>
            <br />

            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel>{emailAddress}<span style={{ color: "red" }}>*</span>:</FormLabel>
              <Input
                type="email"
                placeholder="Your email address"
                name="email"
                value={resume.email}
                onChange={handleChange}
              /><FormErrorMessage>{"required."}</FormErrorMessage>

            </FormControl>
            <br />
            <p style={paragraphStyle}>
              {emailInfo}
            </p>
            <br />

            <SimpleGrid columns={[1, 1, 1, 2]} spacingX={38} spacingY={42} placeItems="center">
              <FormControl isInvalid={Boolean(errors.dob)}>
                <FormLabel>{Birthdate}<span style={{ color: "red" }}>*</span></FormLabel>
                <Input
                  type="date"
                  placeholder="Birthdate/Geburtsdatum:"
                  name="dob"
                  value={resume.dob}
                  onChange={(e) => {
                    const formattedDate = formatDateString(e.target.value);
                    handleChange(e, 'dob', formattedDate);
                  }}
                /><FormErrorMessage>{"required."}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.placeOfBirth)}>
                <FormLabel>{placeOfBirth}<span style={{ color: "red" }}>*</span>:</FormLabel>
                <Input
                  type="text"
                  placeholder="Place of Birth / Geburtsort:"
                  name="placeOfBirth"
                  value={resume.placeOfBirth}
                  onChange={handleChange}
                /><FormErrorMessage>{"required."}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.passportNumber)}>
                <FormLabel>{passportNumber}<span style={{ color: "red" }}>*</span>:</FormLabel>
                <Input
                  type="text"
                  placeholder="Passport Number / Reisepassnummer:"
                  name="passportNumber"
                  value={resume.passportNumber}
                  onChange={handleChange}
                  maxLength={12} // Add this line to restrict to 12 characters
                />
                <span style={{ color: "red" }}>{errors.passportNumber}</span>
              </FormControl>




              <FormControl isInvalid={isSubmitted && resume.passport.trim() === ""} > <FormLabel>Upload passport<span style={{ color: "red" }}>*</span> (pdf)</FormLabel>

                <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
                  <Input
                    type="file" colorScheme="#00b0ff"
                    // key={inputKey}
                    id="passportInput"
                    accept=".pdf"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      setfilepassport(file.name);
                      const formData = new FormData();
                      formData.append("file", e.target.files[0]);
                      formData.append("sid", localStorage.getItem("sid"));
                      formData.append("firstName", resume.firstName);
                      formData.append("lastName", resume.lastName);
                      formData.append("name", "passport");
                      try {
                        const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                        const url = res.data.file_url;
                        setResume({ ...resume, passport: url });
                      }
                      catch (err) {
                        alert('Error uploading file');
                      }
                    }}
                    w="6.2rem"
                    padding={0} />

                </div>
                <p>{filepassport}</p><FormErrorMessage>{"required."}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={[1, 1, 1, 2]} >
              <div></div>   <div>
                <Button size="sm" color="#00b0ff" marginRight={4} marginLeft={4} onClick={() => handleViewClick('passport')}>View</Button>
                <Button size="sm" color="red" onClick={() => handleDeleteClick('passport')}>Delete</Button>
                <Button size="sm" color="green" marginLeft={4} onClick={toggleImage}>sample</Button>     {showImage && (
                  <div className="modal-overlay fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
                    <div className="modal bg-white p-4 rounded shadow-lg relative">
                      <button onClick={toggleImage} className="absolute top-0 right-0 mt-2 mr-2 text-white font-bold text-xl">
                        <svg className="h-8 w-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M6.293 6.293a1 1 0 0 1 1.414 0L12 10.586l4.293-4.293a1 1 0 1 1 1.414 1.414L13.414 12l4.293 4.293a1 1 0 0 1-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L10.586 12 6.293 7.707a1 1 0 0 1 0-1.414z" />
                        </svg>
                      </button>
                      <img src={passport} alt="Your Image" className="max-w-full max-h-full" />
                    </div>
                  </div>
                )}</div>
            </SimpleGrid><br />

            <SimpleGrid columns={[1, 1, 1, 2]} spacingX={38} spacingY={42} placeItems="center">

              <FormControl isInvalid={Boolean(errors.maritalStatus)}>
                <FormLabel>{maritalStatus}<span style={{ color: "red" }}>*</span>:</FormLabel>
                <Select
                  placeholder="Select an option"
                  name="maritalStatus"
                  value={resume.maritalStatus}
                  onChange={handleChange}
                >
                  <option value="Married">Married</option>
                  <option value="Single ">Single </option>
                  <option value="Other">Other </option>
                </Select><FormErrorMessage>{"required."}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={isSubmitted && resume.gender.trim() === ""}>
                <FormLabel>{Gender}<span style={{ color: "red" }}>*</span></FormLabel>
                <Select
                  placeholder="Select an option"
                  name="gender"
                  value={resume.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select><FormErrorMessage>{"required."}</FormErrorMessage>
              </FormControl>


            </SimpleGrid>
            <br />
            <FormControl>
              <FormLabel>{Nationality}</FormLabel>
              <Select
                type="text"
                name="nationality"
                onChange={handleChange}


              >
                <option>Select an option</option>
                <option>Indian</option>
                <option>Afghan</option>
                <option>Albanian</option>
                <option>Algerian</option>
                <option>Andorran</option>
                <option>Angolan</option>
                <option>Antarctican</option>
                <option>Argentinian</option>
                <option>Armenian</option>
                <option>Aruban</option>
                <option>Australian</option>
                <option>Austrian</option>
                <option>Azerbaijani</option>
                <option>Bahamian</option>
                <option>Bahraini</option>
                <option>Bangladeshi</option>
                <option>Barbadian</option>
                <option>Belarusian</option>
                <option>Belgian</option>
                <option>Belizean</option>
                <option>Beninese</option>
                <option>Bermudian</option>
                <option>Bhutanese</option>
                <option>Bolivian</option>
                <option>Bosnian</option>
                <option>Botswanan</option>
                <option>Brazilian</option>
                <option>British Indian Ocean Territory</option>
                <option>British Virgin Islands</option>
                <option>Bruneian</option>
                <option>Bulgarian</option>
                <option>Burkinabé</option>
                <option>Burundian</option>
                <option>Cambodian</option>
                <option>Cameroonian</option>
                <option>Canadian</option>
                <option>Cape Verdean</option>
                <option>Caribbean Netherlands</option>
                <option>Cayman Islands</option>
                <option>Central African</option>
                <option>Chadian</option>
                <option>Chilean</option>
                <option>Chinese</option>
                <option>Christmas Island</option>
                <option>Cocos (Keeling) Islands</option>
                <option>Colombian</option>
                <option>Comorian</option>
                <option>Cook Islands</option>
                <option>Costa Rican</option>
                <option>Croatian</option>
                <option>Cuban</option>
                <option>Curaçaoan</option>
                <option>Cypriot</option>
                <option>Czech</option>
                <option>Democratic Republic of the Congo</option>
                <option>Denmark</option>
                <option>Djiboutian</option>
                <option>Dominican</option>
                <option>East Timorese</option>
                <option>Ecuadorian</option>
                <option>Egyptian</option>
                <option>Salvadoran</option>
                <option>Equatorial Guinean</option>
                <option>Eritrean</option>
                <option>Estonian</option>
                <option>Eswatini</option>
                <option>Ethiopian</option>
                <option>Falkland Islander</option>
                <option>Faroe Islander</option>
                <option>Fijian</option>
                <option>Finnish</option>
                <option>French</option>
                <option>French Polynesian</option>
                <option>Gabonese</option>
                <option>Gambian</option>
                <option>Georgian</option>
                <option>German</option>
                <option>Ghanaian</option>
                <option>Gibraltar</option>
                <option>Greek</option>
                <option>Greenlandic</option>
                <option>Grenadian</option>
                <option>Guamanian</option>
                <option>Guatemalan</option>
                <option>Guernsey</option>
                <option>Guinean</option>
                <option>Guinea-Bissauan</option>
                <option>Guyanese</option>
                <option>Haitian</option>
                <option>Honduran</option>
                <option>Hong Konger</option>
                <option>Hungarian</option>
                <option>Icelander</option>
                <option>Indonesian</option>
                <option>Iranian</option>
                <option>Iraqi</option>
                <option>Irish</option>
                <option>Isle of Man</option>
                <option>Israeli</option>
                <option>Italian</option>
                <option>Ivorian</option>
                <option>Jamaican</option>
                <option>Japanese</option>
                <option>Jersey</option>
                <option>Jordanian</option>
                <option>Kazakhstani</option>
                <option>Kenyan</option>
                <option>Kiribati</option>
                <option>Kosovar</option>
                <option>Kuwaiti</option>
                <option>Kyrgyzstani</option>
                <option>Laotian</option>
                <option>Latvian</option>
                <option>Lebanese</option>
                <option>Basotho</option>
                <option>Liberian</option>
                <option>Libyan</option>
                <option>Liechtensteiner</option>
                <option>Lithuanian</option>
                <option>Luxembourger</option>
                <option>Macanese</option>
                <option>Malagasy</option>
                <option>Malawian</option>
                <option>Malaysian</option>
                <option>Maldivian</option>
                <option>Malian</option>
                <option>Maltese</option>
                <option>Marshallese</option>
                <option>Mauritanian</option>
                <option>Mauritian</option>
                <option>Mayotte</option>
                <option>Mexican</option>
                <option>Micronesian</option>
                <option>Moldovan</option>
                <option>Monégasque</option>
                <option>Mongolian</option>
                <option>Montenegrin</option>
                <option>Montserratian</option>
                <option>Moroccan</option>
                <option>Mozambican</option>
                <option>Burmese</option>
                <option>Namibian</option>
                <option>Nauruan</option>
                <option>Nepali</option>
                <option>Dutch</option>
                <option>New Caledonian</option>
                <option>New Zealander</option>
                <option>Nicaraguan</option>
                <option>Nigerien</option>
                <option>Nigerian</option>
                <option>Niuean</option>
                <option>North Korean</option>
                <option>Macedonian</option>
                <option>Northern Mariana Islander</option>
                <option>Norwegian</option>
                <option>Omani</option>
                <option>Pakistani</option>
                <option>Palauan</option>
                <option>Palestinian</option>
                <option>Panamanian</option>
                <option>Papua New Guinean</option>
                <option>Paraguayan</option>
                <option>Peruvian</option>
                <option>Filipino</option>
                <option>Pitcairn Islander</option>
                <option>Polish</option>
                <option>Portuguese</option>
                <option>Puerto Rican</option>
                <option>Qatari</option>
                <option>Republic of the Congo</option>
                <option>Réunion</option>
                <option>Romanian</option>
                <option>Russian</option>
                <option>Rwandan</option>
                <option>Saint Barthélemy</option>
                <option>Saint Helenian</option>
                <option>Saint Kitts and Nevisian</option>
                <option>Saint Lucian</option>
                <option>Saint Martiner</option>
                <option>Saint-Pierrais et Miquelonnais</option>
                <option>Vincentian</option>
                <option>Samoan</option>
                <option>San Marinese</option>
                <option>São Toméan</option>
                <option>Saudi Arabian</option>
                <option>Senegalese</option>
                <option>Serbian</option>
                <option>Seychellois</option>
                <option>Sierra Leonean</option>
                <option>Singaporean</option>
                <option>Dutch</option>
                <option>Slovak</option>
                <option>Slovene</option>

              </Select>
            </FormControl>
            <p style={paragraphStyle}>
              {genderInfo}
            </p><br />
            <SimpleGrid columns={[1, 1, 1, 2]} spacing={9} placeItems="center">

              <FormControl isInvalid={Boolean(errors.hobby && errors.hobby.length > 0 && errors.hobby[0])}>
                <FormLabel>{Hobbies}<span style={{ color: "red" }}>*</span></FormLabel>
                <Input
                  placeholder="Hobby 1"
                  isInvalid={Boolean(errors.hobby[0])}
                  name="hobby"
                  value={resume.hobby[0] || ''}
                  // value={resume.length > 0 ? resume.hobby[0] : ''}
                  onChange={e => {
                    const updatedHobby = [...resume.hobby];
                    updatedHobby[0] = e.target.value;
                    setResume({ ...resume, hobby: updatedHobby });
                  }}
                  marginBottom={2}
                />
                {Boolean(errors.hobby && errors.hobby.length > 0 && errors.hobby[0]) && (
                  <FormErrorMessage>{"required."}</FormErrorMessage>
                )}

                {resume.hobby?.length > 1 ? resume.hobby.map((element, i) => {
                  if (i > 0) {
                    return (
                      <Input key={i} placeholder={`Hobby ${i + 1}`}
                        name="hobby"
                        value={element}
                        onChange={e => {
                          const updatedHobby = [...resume.hobby];
                          updatedHobby[i] = e.target.value;
                          setResume({ ...resume, hobby: updatedHobby });
                        }}
                        marginBottom={2} />
                    )
                  }
                }) : null}


              </FormControl>
              <FormControl>
                <FormControl>
                  <FormLabel>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FormLabel>
                  <Button
                    marginRight={4}
                    color="#00b0ff"
                    onClick={() => {
                      const updatedHobby = [...resume.hobby];
                      updatedHobby.push('');
                      setResume({ ...resume, hobby: updatedHobby });
                    }}
                  >
                    Add&nbsp;
                  </Button>

                  <Button
                    color="red"
                    onClick={() => {
                      if (resume.hobby.length > 1) {

                        const updatedHobby = [...resume.hobby];
                        updatedHobby.pop();
                        setResume({ ...resume, hobby: updatedHobby });
                      }
                    }}
                  >
                    Delete
                  </Button>
                </FormControl>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.computerSkill && errors.computerSkill.length > 0 && errors.computerSkill[0])}>
                <FormLabel>{computerSkills}<span style={{ color: "red" }}>*</span></FormLabel>
                <Input
                  placeholder="Computer skills 1"
                  isInvalid={Boolean(errors.computerSkill[0])}

                  name="computerSkill"
                  value={resume.computerSkill[0] || ''}
                  // value={resume.computerSkill?.length > 1 ? resume.computerSkill[0] : ''}
                  onChange={e => {
                    const updatedComputerSkill = [...resume.computerSkill];
                    updatedComputerSkill[0] = e.target.value;
                    setResume({ ...resume, computerSkill: updatedComputerSkill });
                  }}
                  marginBottom={2} />
                {Boolean(errors.computerSkill && errors.computerSkill.length > 0 && errors.computerSkill[0]) && (
                  <FormErrorMessage>{"required."}</FormErrorMessage>
                )}

                {resume.computerSkill?.length > 1 ? resume.computerSkill.map((element, i) => {
                  if (i > 0) {
                    return (
                      <Input key={i} placeholder={`Computer skills ${i + 1}`}
                        name="computerSkill"
                        value={element}
                        onChange={e => {
                          const updatedComputerSkill = [...resume.computerSkill];
                          updatedComputerSkill[i] = e.target.value;
                          setResume({ ...resume, computerSkill: updatedComputerSkill });
                        }}
                        marginBottom={2} />
                    )
                  }
                }) : null}


              </FormControl>
              <FormControl >
                <FormLabel>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FormLabel>
                <Button
                  marginRight={4}
                  color="#00b0ff"
                  onClick={() => {
                    const updatedComputerSkill = [...resume.computerSkill];
                    updatedComputerSkill.push('');
                    setResume({ ...resume, computerSkill: updatedComputerSkill });
                  }}
                >
                  Add&nbsp;
                </Button>
                <Button
                  color="red"
                  onClick={() => {
                    if (resume.computerSkill.length > 1) {

                      const updatedComputerSkill = [...resume.computerSkill];
                      updatedComputerSkill.pop();
                      setResume({ ...resume, computerSkill: updatedComputerSkill });
                    }
                  }}
                >
                  Delete
                </Button>
              </FormControl>



              <FormControl >
                <FormLabel style={{ marginRight: '-20px' }}>{candidateImage}<span style={{ color: "red" }}>*</span>(jpg)</FormLabel>
              </FormControl>

              <FormControl isInvalid={isSubmitted && resume.candidatePhoto.trim() === ""}>

                <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
                  <Input
                    type="file"
                    w="6.2rem"
                    // key={inputKey1}
                    id="candidatePhotoInput"
                    accept=".jpg, .jpeg, .png"
                    padding={0}
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      setfilecandidatePhoto(file.name);
                      const formData = new FormData();
                      formData.append("file", e.target.files[0]);
                      formData.append("sid", localStorage.getItem("sid"));
                      formData.append("firstName", resume.firstName);
                      formData.append("lastName", resume.lastName);
                      formData.append("name", "candidateImage");
                      try {
                        const res = await axios.post('https://testapi1.nursingpioneer.com/uploadFile', formData);
                        const url = res.data.file_url;
                        setResume({ ...resume, candidatePhoto: url });
                      }
                      catch (err) {
                        alert('Error uploading file');
                      }
                    }}
                  />





                  <Button color="#00b0ff" marginLeft={4} marginRight={4} onClick={() => handleViewClick('candidatePhoto')}>View</Button>
                  <Button color="red" onClick={() => handleDeleteClick('candidatePhoto')}>Delete</Button>
                </div>
                <p>{filecandidatePhoto}</p><FormErrorMessage>{"required."}</FormErrorMessage>
              </FormControl>
            </SimpleGrid><br />
            <p style={paragraphStyle}>
              {photoInfo}
            </p>


            <Center mt={8}>
              <Button
                color="#00b0ff"
                variant="solid"
                className="space-x-2"
                onClick={handleNext}
              >
                <p>Next</p> <ArrowRightIcon />
              </Button>
            </Center>
          </Box>
        </Stack>
        <div className="w-full sm:w-1/2 p-2 sm:pt-0">          <ResumeTemplate info={resume} route={'personal'} education={{}} work={[]} internship={[]} />
        </div>
      </div>
    </div>
  );
};

