export const isValid = (inputValue, identifier) => {
  if (identifier === "contact_number") {
    if (inputValue.length === 0) return "No empty contact number allowed";
    else if (inputValue.length > 10) return "Not more than 10 digits";
  } else {
    if (inputValue.length === 0) return "No empty name allowed";
    else if (inputValue.length > 15)
      return "Try your nick name, this is quite long";
  }
};
