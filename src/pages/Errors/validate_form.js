import  explain_error from "./explain_error.js"
const validate_form= (formDetails)=>{
    // check which detail the user did not fill
    const details_not_provided=Object.keys(formDetails).filter(detail=>!formDetails[detail]);
    
    // for each detail not filled, return an explanation  to the user
     let error_explanations=details_not_provided.map(x=>explain_error(x,formDetails))
    // check email for validity using regex pattern
if(!(/\w+@\w+\.[a-zA-Z]+/).test(formDetails["email"])){
    error_explanations.push("Email provided is not valid")
   }
   // converting to a set then back to an array, to remove duplicates
   error_explanations= new Set(error_explanations)
   error_explanations= Array.from (error_explanations)

    console.log("Error Explanations",error_explanations)
    return error_explanations

}
export default validate_form