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
  FormLabel,
  SimpleGrid
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function ResumeTemplate({ info, option, route, education, work, internship, motivation,declaration }) {

  const head = info.language === 'English' ? 'PERSONAL DATA' : info.language === 'German' ? 'PERSÖNLICHE ANGABEN' : 'PERSONAL DATA'
  const givenName = info.language === 'English' ? 'Given Name(s)' : info.language === 'German' ? 'Vorname' : ''
  // const fatherName = info.language === 'English' ? "Father's Name" : info.language === 'German' ? 'Vater Name' : ''
  const surName = info.language === 'English' ? 'Surname' : info.language === 'German' ? 'Nachname' : ''
  const Country = info.language === 'English' ? 'Nationality' : info.language === 'German' ? 'Staatsangehörigkeit' : ''
  const Address = info.language === 'English' ? 'Address' : info.language === 'German' ? 'Adresse' : ''
  const contactNumber = info.language === 'English' ? 'Contact Number' : info.language === 'German' ? 'Kontaknummer' : ''
  const emailAddress = info.language === 'English' ? 'Email Address' : info.language === 'German' ? 'E-Mail-Adresse' : ''
  const Birthdate = info.language === 'English' ? 'Birthdate' : info.language === 'German' ? 'Geburtsdatum' : ''
  const placeOfBirth = info.language === 'English' ? 'Place of Birth ' : info.language === 'German' ? 'Geburtsort' : ''
  const passportNumber = info.language === 'English' ? 'Passport Number' : info.language === 'German' ? 'Reisepassnummer' : ''
  const maritalStatus = info.language === 'English' ? 'Marital Status' : info.language === 'German' ? 'Familienstand' : ''
  const Gender = info.language === 'English' ? 'Gender' : info.language === 'German' ? 'Geschlecht(wie im reisepass)' : ''
  const Hobbies = info.language === 'English' ? 'Hobbies ' : info.language === 'German' ? 'Hobbies' : ''
  const computerSkills = info.language === 'English' ? 'Computer skills ' : info.language === 'German' ? 'Computerkenntnisse' : ''
  const candidateImage = info.language === 'English' ? 'Candidate Image' : info.language === 'German' ? 'Foto des Kandidaten' : ''
  const headName = info.language === 'English' ? 'EDUCATIONAL QUALIFICATION' : info.language === 'German' ? 'SCHULISCHE QUALIFIKATION' : ''
  const from = info.language === 'English' ? 'From' : info.language === 'German' ? 'Von' : ''
  const To = info.language === 'English' ? 'To' : info.language === 'German' ? 'Bis' : ''
  const University = info.language === 'English' ? 'Name of School / University & Degree' : info.language === 'German' ? 'Name der Schule/Hochschule und Fachrichtung' : ''
  const MotherTounge = info.language === 'English' ? 'Mother Tongue' : info.language === 'German' ? 'Muttersprache' : ''
  const English = info.language === 'English' ? 'English' : info.language === 'German' ? 'Englisch ' : ''
  const Lang = info.language === 'English' ? 'Language Proficiency' : info.language === 'German' ? ' Sprachkenntnisse ' : ''
  const German = info.language === 'English' ? 'German' : info.language === 'German' ? 'Deutschh' : '';
  const headW = info.language === 'English' ? 'WORK EXPERIENCE' : info.language === 'German' ? 'ARBEITSERFAHRUNG' : ''
  const Emp = info.language === 'English' ? 'Employer Name / Address' : info.language === 'German' ? 'Employer Adresse des Arbeitgebers' : ''
  const Dep = info.language === 'English' ? 'Department / Position ' : info.language === 'German' ? 'Abteilung / Position' : ''
  const Hos = info.language === 'English' ? 'Hospital Name / Address ' : info.language === 'German' ? 'Adresse des Krankenhauses/der Klinik' : ''
  const School = info.language === 'English' ? 'School Education ' : info.language === 'German' ? 'Schulische Laufbahn' : ''
  const Place = info.language === 'English' ? 'Place,state ' : info.language === 'German' ? 'Ort, Land' : ''
  const good = info.language === 'English' ? 'Good ' : info.language === 'German' ? 'gut' : ''
  const poor = info.language === 'English' ? 'Poor ' : info.language === 'German' ? 'durchschnittlich' : ''
  const average = info.language === 'English' ? 'Average ' : info.language === 'German' ? 'schlecht' : ''
  const actual = info.language === 'English' ? 'Actual level / Course  ' : info.language === 'German' ? 'Aktuelles Level / Kurs' : ''
  const certificate = info.language === 'English' ? 'Certificate (Module / Date) ' : info.language === 'German' ? 'Zertifikat (Level / Datum)' : ''
  const workExp = info.language === 'English' ? 'Work experience  ' : info.language === 'German' ? 'Praktikum' : ''
  const intershipExp = info.language === 'English' ? ' Internship Experience ' : info.language === 'German' ? 'Arbeitserfahrung' : ''
  const NameEmp = info.language === 'English' ? ' Name of the Employer  ' : info.language === 'German' ? 'Name der Krankenhauses/ Firma/  ward/ Station' : ''
  const CurrentEmp = info.language === 'English' ? ' Current Employer ' : info.language === 'German' ? 'aktueller Arbeitgeber' : ''
  const PastEmp = info.language === 'English' ? ' Previous Employer  ' : info.language === 'German' ? 'ehemaliger Mitarbeiter' : ''
  const intern = info.language === 'English' ? ' Intership  ' : info.language === 'German' ? 'Praktikum ' : ''
  const Reason = info.language === 'English' ? ' Reason ' : info.language === 'German' ? 'Praktikum ' : ''
  // const Decline = info.language === 'English' ? 'Declaration:I hereby declare that the above informationis Listes correctly and completely to the best of my knowledge and belief ' : info.language === 'German' ? 'Erklärung: Hiermit erkläre ich, dass die obigen Angaben nach meinem besten Wissen und Gewissen richtig und vollständig aufgelistet sind. ' : ''
  // const Sign = info.language === 'English' ? ' Signature ' : info.language === 'German' ? 'Unterschrift' : ''	
  // const Date = info.language === 'English' ? ' Place,Date' : info.language === 'German' ? 'Ort,Datum' : ''	



  function formatBirthDate(x) {
    // Check if x is defined
    if (x) {
      const formattedDate = x.split('-').reverse().join('-');
      return formattedDate;
    } else {
      // Handle the case where x is undefined
      console.error("Input date is undefined.");
      return ""; // or return null or handle it as appropriate in your context
    }
  }
  function formatDate(x) {
    // Check if x is defined
    if (x) {
      const [year, month] = x.split('-').slice(0, 2); // Extract year and month
      return `${month}/${year}`; // Format as month-year
    } else {
      // Handle the case where x is undefined
      console.error("Input date is undefined.");
      return ""; // or return null or handle it as appropriate in your context
    }
  }

  return (

    <Box
   
  >
      <Stack spacing={4} m={6} fontFamily="sans-serif">
        <Stack spacing={1}>

          <Heading as="h1">
            Curriculum Vitae
          </Heading>

        </Stack>

        <VStack spacing={2} align="stretch">
          <Heading as="h2" fontSize="xl" borderBottomWidth="1px">

            {head}
          </Heading>

          <div >
            <table className=" w-full table-fixed  ">

              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black">{surName}:</td>
                  <td className="border px-4 py-2 border-black">{info.lastName ? info.lastName : ''}</td>
                  {/* <td className="border px-4 py-2 border-black" rowSpan="17">{info.candidatePhoto ? <img src={info.candidatePhoto} alt="" width="200" /> : ''}</td> */}
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black">{givenName} </td>
                                   <td className="border px-4 py-2 border-black">{info.firstName.charAt(0).toUpperCase()+info.firstName.slice(1).toLowerCase() ? info.firstName.charAt(0).toUpperCase()+info.firstName.slice(1).toLowerCase() : ''}</td>
                </tr>
                {/* <tr>
                  <td className="border px-4 py-2 border-black font-bold bg-gray-300">{fatherName}</td>
                  <td className="border px-4 py-2 border-black">{info.fatherName}</td>
                </tr> */}
                <tr>
                  <td className="border px-4 py-2 border-black font-bold bg-gray-300">{Address} : </td>
                  <td className="border px-4 py-2 border-black "></td>
                </tr>
                <tr>
                  <td className="border px-10 py-2 font-bold bg-gray-300 border-black">{Address} line 1 </td>
                  <td className="border border-black px-4 py-2">{info.address}</td>
                </tr>
                <tr>
                  <td className="border px-10 py-2 font-bold bg-gray-300 border-black">{Address} line 2 </td>
                  <td className="border px-4 py-2 border-black">{info.address2}</td>
                </tr>
                <tr>
                  <td className="border px-10 py-2 font-bold bg-gray-300 border-black">{Address} line 3</td>
                  <td className="border px-4 py-2 border-black">{info.address3}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black">{contactNumber}</td>
                  <td className="border px-4 py-2 border-black">{info.contactNumber}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black">{emailAddress}</td>
                  <td className="border px-4 py-2 border-black">{info.email}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black">{Birthdate}</td>
                  <td className="border px-4 py-2 border-black">{formatBirthDate(info.dob)}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black">{placeOfBirth}</td>
                  <td className="border px-4 py-2  border-black">{info.placeOfBirth}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black">{passportNumber}</td>
                  <td className="border px-4 py-2 border-black">{info.passportNumber}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black">{maritalStatus}</td>
                  <td className="border px-4 py-2 border-black">{info.maritalStatus} </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black">{Gender}</td>
                  <td className="border px-4 py-2 border-black">{info.gender}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 border-black font-bold bg-gray-300">{Country}</td>
                  <td className="border px-4 py-2 border-black">{info.nationality}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 border-black font-bold bg-gray-300">{Hobbies}</td>
                  <td className="border px-4 py-2 border-black">{info.hobby?.map((x, i) => <li key={i}>{x}</li>)}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black">{computerSkills}</td>
                  <td className="border px-4 py-2 border-black"> {info.computerSkill?.map((x, i) => <li key={i}>{x}</li>)}</td>
                </tr>
              </tbody>
            </table>
          </div>


        </VStack>

        {Object.keys(education).length > 0 ? (<VStack spacing={1} align="stretch">
          <Heading as="h3" fontSize="xl" borderBottomWidth="2px">
            {headName}
          </Heading>







          <table className=" w-full table-fixed  ">
            <thead>
              <tr>
                <td className="border px-4 py-2 font-bold bg-gray-300 border-black">{School}</td>
                <td className="border px-4 py-2 font-bold border-black bg-gray-300">{from}-{To}</td>
                <td className="border px-4 py-2 font-bold border-black bg-gray-300">{University}</td>
                <td className="border px-4 py-2 font-bold border-black bg-gray-300">{Place}</td>
              </tr>
            </thead>
            <tbody>
              {education?.postGraduation?.map((x, i) => (
                <tr key={i}>
                  {x.from && (<td className="border px-4 py-2 font-bold border-black">Post Graduate</td>)}
                  {x.from && (<td className="border px-4 py-2  border-black">{formatDate(x.from)} - {formatDate(x.to)}</td>)}
                  {x.from && (<td className="border px-4 py-2  border-black">{x.university}</td>)}
                  {x.from && (<td className="border px-4 py-2  border-black">{x.place}</td>)}
                </tr>
              ))}
              {education?.underGraduation?.map((x, i) => (
                <tr key={i}>
                  {x.from && (<td className="border px-4 py-2 font-bold border-black">Under Graduate Degree</td>)}
                  {x.from && (<td className="border px-4 py-2  border-black">{formatDate(x.from)} - {formatDate(x.to)}</td>)}
                  {x.from && (<td className="border px-4 py-2  border-black">{x.university}</td>)}
                  {x.from && (<td className="border px-4 py-2  border-black">{x.place}</td>)}
                </tr>
              ))}
              <tr >
                <td className="border px-4 py-2 font-bold border-black">11th & 12th</td>
                <td className="border px-4 py-2  border-black">{formatDate(education?.twelthStandard[0].from)}  {formatDate(education?.twelthStandard[0].to)}</td>
                <td className="border px-4 py-2  border-black">{education?.twelthStandard[0].university}</td>
                <td className="border px-4 py-2  border-black">{education?.twelthStandard[0].place}</td>
              </tr>
              <tr >
                <td className="border px-4 py-2 font-bold border-black">5th to 10th</td>
                <td className="border px-4 py-2  border-black">{formatDate(education?.tenthStandard[0].from)}  {formatDate(education?.tenthStandard[0].to)}<br /></td>
                <td className="border px-4 py-2  border-black">{education?.tenthStandard[0].university}</td>
                <td className="border px-4 py-2  border-black">{education?.tenthStandard[0].place}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold border-black">1st to 4th</td>
                <td className="border px-4 py-2  border-black">{formatDate(education?.firstToNinthStandard[0].from)}  {formatDate(education?.firstToNinthStandard[0].to)}</td>
                <td className="border px-4 py-2  border-black">{education?.firstToNinthStandard[0].university}</td>
                <td className="border px-4 py-2  border-black">{education?.firstToNinthStandard[0].place}</td>
              </tr>
            </tbody>
            
            </table>


            <br />



<table className="table-auto w-full">
<thead>
              <tr>
                <td className="border px-4 py-2 font-bold bg-gray-300 border-black" rowSpan="2">Blank-Year </td>
                <td className="border px-4 py-2 font-bold border-black bg-gray-300">{Reason}</td>
                <td className="border px-4 py-2 font-bold border-black bg-gray-300">{from}-{To}</td>

              </tr>
            </thead>
<tbody>
{education?.blankYear?.map((x, i) => (
                <tr key={i}>
                  {x.from && (<td className="border px-4 py-2 bg-gray-300 font-bold border-black"></td>)}
                  {x.from && (<td className="border px-4 py-2 border-black">{x.reason}</td>)}
                  {x.from && (<td className="border px-4 py-2 border-black">{formatDate(x.from)} - {formatDate(x.to)}</td>)}
                </tr>
              ))}
</tbody></table> 
          {/* {education?.postGraduation?.map((x, i) => {
            return (
              <div key={i}>
                {x.yearSem && (
                  <>
                    <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}> Year / Semester: </Text>{x.yearSem}  </FormLabel>
                  </>
                )}
              </div>
            )
          })} */}


          {/* <Text style={{ fontWeight: 'bold' }}>program:{education?.postGraduation[0]?.name}</Text>

          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}> Year / Semester:{education?.postGraduation[0]?.yearSem}</Text>  </FormLabel>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}> From:{education?.postGraduation[0]?.from}</Text><Text as="span" style={{ fontWeight: 'bold' }}> To:{education?.postGraduation[0]?.to}</Text><br /> </FormLabel>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>University:{education?.postGraduation[0]?.university}</Text></FormLabel> */}




          {/* 
          {education?.underGraduation?.map((x, i) => {
            return (
              <div key={i}>
                {x.yearSem && (
                  <>
                    <FormLabel display="inline">
                      <Text as="span" style={{ fontWeight: 'bold' }}> Year / Semester: </Text>{x.yearSem}
                    </FormLabel>
                    <FormLabel display="inline">
                      <Text as="span" style={{ fontWeight: 'bold' }}>{from}: </Text>{formatDate(x.from)}&nbsp;&nbsp;&nbsp;
                      <Text as="span" style={{ fontWeight: 'bold' }}> {To} </Text>{formatDate(x.to)}<br />
                    </FormLabel>
                  </>
                )}
              </div>
            );
          })} */}


          {/* <Text style={{ fontWeight: 'bold' }}>program:{education?.underGraduation[0].name}</Text>


          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>Year / Semester:{education?.underGraduation[0].yearSem}</Text>  <Text as="span" style={{ fontWeight: 'bold' }}> From:</Text>  <Text as="span" style={{ fontWeight: 'bold' }}> To:</Text> <br /></FormLabel>
          <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}>University:{education?.underGraduation[0].university}</Text></FormLabel> */}



          <br />






          {/* 
          {education?.blankYear?.map((x, i) => {
            return (

              <div key={i}>

                {x.from && (<>
                  <Heading as="h3" className="font-bold text-lg" fontSize="m" >
                    <br />

                    Break Year (if any)
                  </Heading>
                  <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}> {from}: </Text>{formatDate(x.from)}<Text as="span" style={{ fontWeight: 'bold' }}> {To}: </Text>{formatDate(x.to)}<br /> </FormLabel>
                  <FormLabel display="inline" >   <Text as="span" style={{ fontWeight: 'bold' }}> Reason for Break: </Text>{x.reason}</FormLabel>
                </>)}
              </div>
            )
          })} */}

          {/* <FormLabel display="inline" >
            <Text as="span" style={{ fontWeight: 'bold' }}> From:</Text>
            <Text as="span" style={{ fontWeight: 'bold' }}> To:</Text>
            <Text as="span" style={{ fontWeight: 'bold' }}> Reason for Break:</Text>  <br />
          </FormLabel> */}
          <div className="w-full ">
            <table className="w-full table-fixed  ">

              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black"  >{Lang}</td>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black" colSpan="4"></td>

                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold  border-black"  >{MotherTounge}:</td>
                  <td className="border px-4 py-2   border-black" colSpan="4"> {education?.motherTongue}</td>

                </tr>
                <tr>
                  <td className="border px-4 py-1 font-bold border-black">{English}</td>
                  {education?.english === 'Good/ Gut' && (
                    <td className="border px-4 py-1 border-black" colSpan="4">{good}</td>
                  )}
                  {education?.english === 'Average/ Durchschnittlich' && (
                    <td className="border px-4 py-1 border-black" colSpan="4">{average}</td>
                  )}
                  {education?.english === 'Poor /Schlecht' && (
                    <td className="border px-4 py-1 border-black" colSpan="4">{poor}</td>
                  )}
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black" ></td>

                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black"  >{actual} </td>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black" >{from}–{To}  (Month/Year)</td>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black" colSpan={2}>{certificate} </td>

                </tr>
                {education?.german?.map((x, i) => (
                  <tr key={i}>
                    <td className="border px-4 py-2 font-bold border-black">{German}</td>
                    <td className="border px-4 py-2 border-black">
                      <FormLabel display="center"> {x.level} </FormLabel>
                    </td>
                    <td className="border px-4 py-2 border-black">{formatDate(x.from)} - {formatDate(x.to)} </td>
                    <td className="border px-4 py-2 border-black" colSpan={2}>
  <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
    {x.listeningMarksheetDate && <li>listeningMarksheet :- {formatBirthDate(x.listeningMarksheetDate)}</li>}
    {x.speakingMarksheetDate && <li>speakingMarksheet :- {formatBirthDate(x.speakingMarksheetDate)}</li>}
    {x.readingMarksheetDate && <li>readingMarksheet :- {formatBirthDate(x.readingMarksheetDate)}</li>}
    {x.writingMarksheetDate && <li>writingMarksheet :- {formatBirthDate(x.writingMarksheetDate)}</li>}
  </ul>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          {/* <Text style={{ fontWeight: 'bold' }}> Level:{education?.german[0].level}  from: {education?.german[0].from}  to: {education?.german[0].to} </Text><br /> */}
          {/* <Text style={{ fontWeight: 'bold' }}>  Certificate:      </Text> */}




        </VStack>) : ''}

        <br />
        {option == 'no' || option == 'yes' || (work?.[0]?.employer || internship?.[0]?.hospital) ? (<Heading as="h3" fontSize="xl" borderBottomWidth="1px">
          {headW}
        </Heading>) : ''}
        {work?.[0]?.employer ? (<VStack spacing={4} align="stretch">

          {work?.slice(0, 1).map((x, i) => {
            return (
              <div key={i}>
                {x.employer && (<>
                  <Heading as="h3" fontSize="large" >
                    Employer
                  </Heading>
                </>)}
              </div>
            )
          })}

          <div className="w-full">
            <table className=" w-full table-fixed  ">
              <thead>
                <tr>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black">{workExp}</td>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black">{from}–{To} (Month/Year)</td>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black">{NameEmp}</td>
                  <td className="border px-4 py-2 font-bold bg-gray-300 border-black">{Place}</td>
                </tr>
              </thead>
              <tbody className="w-full">
                {work?.map((x, i) => {
                  const status = (i === 0) ? CurrentEmp : PastEmp;
                  return (
                    <React.Fragment key={i}>
                      {x.employer && (
                        <tr className="w-full">
                          <td className="border px-4 py-2 border-black">{status}</td>
                          <td className="border px-4 py-2 border-black">{formatDate(x.from)}   {i !== 0 ? "-" +formatDate(x.to) : null}
 </td>
                          <td className="border px-4 py-2 border-black">{x.employer} {x.department}</td>
                          <td className="border px-4 py-2 border-black">{x.place}</td>
                        </tr>
                      )}
                      <tr>
                        <td className="border px-4 py-2 border-black">Duties handle</td>
                        <td className="border w-full px-4 py-2 border-black" colSpan={3}>
                          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                            {Array.isArray(x.duties) && x.duties.map((duty, dutyIndex) => (
                              <li key={dutyIndex}>
                                {typeof duty === 'string' ? duty : <p>{duty.duty}</p>}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}

              </tbody>
            </table>
          </div>


        </VStack>) : ''}



        {internship?.slice(0, 1).map((x, i) => {
          return (
            <div key={i}>
              {x.hospital && (<>
                <br />

                <div className="w-full ">
                  <table className=" w-full table-fixed  ">
                    <thead>
                      <tr>
                        <td className="border px-4 py-2 font-bold bg-gray-300 border-black" >{intershipExp} </td>
                        <td className="border px-4 py-2 font-bold bg-gray-300 border-black"  >{from} – {To}  (Month/Year) </td>
                        <td className="border px-4 py-2 font-bold bg-gray-300 border-black" >{NameEmp}</td>
                        <td className="border px-4 py-2 font-bold bg-gray-300 border-black" >{Place}</td>

                      </tr>

                    </thead>


                    {internship?.map((x, i) => {
                      return (
                        <tbody>




                          <tr key={i}>
                            <td className="border px-4 py-2 border-black font-bold ">{intern} {i + 1} </td>
                            <td className="border px-4 py-2 border-black"> {formatDate(x.from)} - {formatDate(x.to)} </td>
                            <td className="border px-4 py-2 border-black">{x.hospital} {x.department}</td>
                            <td className="border px-4 py-2 border-black">{x.place} </td>
                          </tr>

                          <tr key={i}>
                            <td className="border px-4 py-2 border-black font-bold ">Duties Handled  </td>
                            <td className="border px-4 py-2 border-black" colSpan={4}>
                              {internship.map((item, index) => (
                                <div key={index}>
                                  <ul style={{ listStyleType: 'disc', color: 'black', paddingLeft: '20px' }}>
                                    {item.duties.map((duty, dutyIndex) => (
                                      <li key={dutyIndex}>
                                        {typeof duty === 'string' ? duty : <p>{duty.duty}</p>}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </td>


                          </tr>
                        </tbody>
                      )

                    })}
                  </table>
                </div>


              </>)}
            </div>
          )
        })}


        {/* <HStack divider={<StackDivider />} pt="24px">
          <Button
            w="max-content"
            colorScheme="messenger"
            isDisabled={page !== 5}
            onClick={() => {
              window.location.reload();
            }}
          >
            Create New
          </Button>
          <div style={{ fontWeight: 'bold' }}>
            
                <Button
                  colorScheme="messenger"
                  w="max-content"
                  isDisabled={page !== 5}
                >
                  View
                </Button>

          </div>
        </HStack> */}
        {/* <SimpleGrid columns={[1, 1, 1, 4]} spacing={4} >
          <FormLabel>Place/Date</FormLabel>
          <div></div>
          <div></div>
          <FormLabel>Signature</FormLabel> */}
          {/* <embed src={internship.signature}></embed> */}

        {/* </SimpleGrid> */}
        
        {/* <p>{Decline}</p> */}
       
       </Stack>
       <div className="flex justify-between">
   {/* <FormLabel>{Date}</FormLabel>
   <FormLabel>{Sign}</FormLabel> */}
 </div>
 
           
       
     </Box>
  );
};

