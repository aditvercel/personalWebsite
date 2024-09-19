import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function ISinput(props) {
  const [validationState, setValidationState] = useState({
    hasNumber: false,
    hasSymbol: false,
    hasSyntax: false,
  });

  const handleValidation = (value) => {
    const hasNumber = /\d/; // Regular expression to check for numbers
    const hasSymbol = /[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\]/; // Regular expression to check for specific symbols
    const hasSyntax = /[><{}:]/; // Regular expression to check for specific syntax

    const isInvalidNumber = props.noNumber && hasNumber.test(value);
    const isInvalidSymbol = props.noSymbol && hasSymbol.test(value);
    const isInvalidSyntax = props.noSyntax && hasSyntax.test(value);

    setValidationState({
      hasNumber: isInvalidNumber,
      hasSymbol: isInvalidSymbol,
      hasSyntax: isInvalidSyntax,
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    props.onChange(e); // Call parent onChange
    handleValidation(value); // Validate input
  };

  const isError =
    validationState.hasNumber ||
    validationState.hasSymbol ||
    validationState.hasSyntax;

  return (
    <FormControl isInvalid={isError} isRequired={props.required}>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <Input
        variant="filled"
        placeholder={props.placeholder}
        size="sm"
        className="rounded-lg text-black bg-white"
        errorBorderColor="red.300"
        isInvalid={isError} // Use the combined error state
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={handleChange}
      />
      <div className="grid grid-cols-2 gap-x-1 ">
        {props.noNumber && validationState.hasNumber && (
          <FormErrorMessage color={"red.300"}>
            <div className="h-3 w-3 rounded-full bg-white mr-1"></div> Number
            aren&apos;t allowed
          </FormErrorMessage>
        )}
        {props.noSymbol && validationState.hasSymbol && (
          <FormErrorMessage color={"red.300"}>
            <div className="h-3 w-3 rounded-full bg-white mr-1"></div>
            Symbols aren&apos;t allowed
          </FormErrorMessage>
        )}
        {props.noSyntax && validationState.hasSyntax && (
          <FormErrorMessage color={"red.300"}>
            <div className="h-3 w-3 rounded-full bg-white mr-1"></div>
            Syntax aren&apos;t allowed
          </FormErrorMessage>
        )}
      </div>
    </FormControl>
  );
}
