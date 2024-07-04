import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  FormControl,
  Textarea,
  FormHelperText,
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
import React, { useState } from "react";

const BasicDetails = (props) => {
  const { resumeInfo, setResumeInfo, setPage } = props;
















  const paragraphStyle = {
    color: "red",
  };



  return (
    <Stack>
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={9} placeItems="center">
        <FormControl>
          <FormLabel>Choose one Language to fill up the form*</FormLabel>
          <Box p={4}>
            <RadioGroup

            >
              <Stack direction="row" spacing={4}>
                <Radio value="English">English</Radio>
                <Radio value="German">German</Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </FormControl>
        <br />

        <FormControl>
          <FormLabel>Given Name(s) / Vorname*</FormLabel>
          <Input
            type="text"
            placeholder="Your first name"
          />
        </FormControl>
        {/* <FormControl>
          <FormLabel>Father's Name / Vater Name*</FormLabel>
          <Input
            type="text"
            placeholder="your father name"


          />
        </FormControl> */}

        <FormControl>
          <FormLabel>Surname/ Nachname*</FormLabel>
          <Input
            type="text"
            placeholder="Your last name"

          />
        </FormControl>




        <br /><br />
      </SimpleGrid><br />
      <p style={paragraphStyle}>
        Your full name must match that of your (future) passport and must be
        spelled in full. Abbreviated names will not be accepted. All documents,
        i.e. CV, certificates and relevant documents, must match. Your name(s)
        should be the same everywhere, otherwise your VISA and recognition
        procedure in Germany will be rejected due to errors by the official
        German authorities. In the worst case, you will risk not being allowed
        to enter Germany.
      </p>
      <br />




      <FormControl>
        <FormLabel>Country/Länder*: </FormLabel>
        <Select
          type="text"
          placeholder=" country"

        >
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
          <option>India</option>
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

        <br />

      </FormControl>

      <FormControl>
        <FormLabel>Address/ Adresse*: </FormLabel>
        <Textarea
          placeholder=""
        />
      </FormControl>
      <br />
      <p style={paragraphStyle}>
        3 lines (like in passport) / 3 Zeilen (wie im Reisepass) Instructions to
        the Candidate: You must enter the exact address as it is (or will be) in
        your passport. This is usually three lines for the address. The same
        address will be used by the German employer to prepare your offer letter
        and your employment contract. Note: The German authorities will also
        check your CV for the VISA application and other applications, e. g. for
        recognition. They will reject applications where the information in the
        documents does not match. Any later correction will lead to high costs.
      </p>


      <br />
      <FormControl>
        <FormLabel>Contact Number/Kontaknummer*:</FormLabel>

        <InputGroup>

          <Select
            w="20rem"

          >

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
            <option>+91 IN: India</option>
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
            type="tel"
            placeholder="phone number"
            maxLength={10}
            pattern="[0-9]{10}"

          />
        </InputGroup>
      </FormControl>
      <br />
      <p style={paragraphStyle}>
        Instructions to the Candidate: Contact No. of Candidate is required in
        this field. Candidates are not allowed to write their Parents or
        relatives contact number here. Your Contact Number should be same
        everywhere i.e. CV and all other relevant documents. All communication
        for employment and migration process will be done to this contact number
        only.
      </p>
      <br />

      <FormControl>
        <FormLabel>Email address / E-Mail-Adresse*:</FormLabel>
        <Input
          type="email"
          placeholder="Your email address"

        />

      </FormControl>
      <br />
      <p style={paragraphStyle}>
        Keep only one email address for all your documents. Your email Address
        should be same everywhere i.e. CV and all other relevant documents. All
        communication will be done to this email address only.
      </p>
      <br />

      <SimpleGrid columns={[1, 1, 1, 2]} spacingX={38} spacingY={42} placeItems="center">
        <FormControl>
          <FormLabel>Birthdate/Geburtsdatum*</FormLabel>
          <Input
            type="date"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Place of Birth / Geburtsort*:</FormLabel>
          <Input
            type="text"
            placeholder="Place of Birth / Geburtsort:"

          />
        </FormControl>

        <FormControl>
          <FormLabel>Passport Number / Reisepassnummer*:</FormLabel>
          <Input
            type="text"
            placeholder="Passport Number / Reisepassnummer:"

          />
        </FormControl>


        <br />
        <FormControl> <FormLabel>Upload passport* (pdf)</FormLabel>
        </FormControl>

        <FormControl>
          <Input type="file" colorScheme="#00b0ff"
            w="8rem" />


          <Button color="#00b0ff" marginRight={4} marginLeft={4}>View</Button>
          <Button color="red">Delete</Button>

        </FormControl>
      </SimpleGrid><br />
      <SimpleGrid columns={[1, 1, 1, 2]} spacingX={38} spacingY={42} placeItems="center">

        <FormControl>
          <FormLabel>Marital Status/ Familienstand*:</FormLabel>
          <Select
            placeholder="Select an option"

          >
            <option value="Married">Married</option>
            <option value="Single ">Single </option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Gender/Geschlecht(wie im reisepass)*</FormLabel>
          <Select
            placeholder="Select an option"

          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgendeer">Transgender</option>
          </Select>
        </FormControl>


      </SimpleGrid>
      <br />
      <p style={paragraphStyle}>
        Instructions to the Candidate: Attention! Enter your birthdate, place of
        birth, Marital Status, Gender & Passport Number correctly. It will be
        checked in migration and employment process by the authorities.
      </p><br />
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={9} placeItems="center">
      <FormControl>
          <FormLabel>Nationality*</FormLabel>
          <Input placeholder="Hobby 1"



            marginBottom={2} />


        </FormControl>
        <FormControl>
          <FormLabel>Hobbies / Hobbies*</FormLabel>
          <Input placeholder="Hobby 1"



            marginBottom={2} />


        </FormControl>
        <FormControl>
          <FormControl>
            <FormLabel>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FormLabel>
            <Button marginRight={4} color="#00b0ff" >
              Add&nbsp;
            </Button>

            <Button color="red">
              Delete
            </Button>
          </FormControl>
        </FormControl>

        <FormControl>
          <FormLabel>Computer skills /Computerkenntnisse*</FormLabel>
          <Input placeholder="Computer skills 1"
            marginBottom={2} />

        
        </FormControl>
        <FormControl>
          <FormLabel>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FormLabel>
          <Button marginRight={4} color="#00b0ff" >
            Add&nbsp;
          </Button>
          <Button
            color="red"
          >
            Delete
          </Button>
        </FormControl>



        <FormControl>
          <FormLabel>Candidate image/foto des kandidaten*(jpg)</FormLabel>
        </FormControl>

        <FormControl>


          <Input
            type="file"
            w="8rem"
          />





          <Button color="#00b0ff" marginLeft={4} marginRight={4}>View</Button>
          <Button color="red">Delete</Button>
         
        </FormControl>
      </SimpleGrid><br />
      


      <Center mt={8}>
        <Button
          color="#00b0ff"
          onClick={() => {
            setPage((p) => p + 1);
          }}
          rightIcon={<ChevronRightIcon />}
        >
          Save
        </Button>
      </Center>
    </Stack>
  );
};

export default BasicDetails;
