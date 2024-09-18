import React from "react";
import { Input } from "@chakra-ui/react";

const ISinput = React.memo(
  ({ value, onChange, isInvalid, placeholder, type, name }) => {
    return (
      <Input
        variant="filled"
        placeholder={placeholder}
        size="sm"
        className="rounded-lg"
        errorBorderColor="red.300"
        isInvalid={isInvalid}
        type={type}
        name={name}
        onChange={onChange}
        value={value} // Bind the value to the input
      />
    );
  }
);

export default ISinput;
