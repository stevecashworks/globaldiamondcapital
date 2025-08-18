const explain_error = (field_Name, form_data) => {
  const err_messages = {
    firstname: "First name was not provided",
    lastname: "Last name was not provided",
    phone: "Phone number is required",
    email: "Email  is required",
    SSN: "SSN is required",
    Address: "Address is required",
    idImg: "Upload image of drivers license or other government id to continue",

    password: "Password is required to continue",
  };
  // check email for validity using regex pattern
  if (!/\w+@\w+\.[a-zA-Z]+/.test(form_data["email"])) {
    err_messages["email"] = "Email provided is not valid";
  }
  //
  if (
    !form_data["repeatpassword"] ||
    form_data["password"] !== form_data["repeatpassword"]
  ) {
    err_messages["password"] = "Passwords do not match";
    err_messages["repeatpassword"] = "Passwords do not match";
  }

  return err_messages[field_Name];
};
export default explain_error;
