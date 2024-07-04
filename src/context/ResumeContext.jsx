import React, { useState } from 'react'
import { createContext } from "react";


export const ResumeContext = createContext(null)


const ResumeState = (props) => {
    const [resumeInfo, setResumeInfo] = useState({
        declaration : {},
        education : {},
        internship : [],
        isApproved : "",
        motivation : {},
        personal : {},
        sid : "",
        work : []
    })
  return (
    <ResumeContext.Provider value={{resumeInfo, setResumeInfo}}>
        {props.children}
    </ResumeContext.Provider>      
  )
}

export default ResumeState
