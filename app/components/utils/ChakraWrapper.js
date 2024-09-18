// ChakraWrapper.js
import { ChakraProvider } from "@chakra-ui/react";

const ChakraWrapper = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default ChakraWrapper;
