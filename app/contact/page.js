import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Page() {
  const codeString = `
const contact = [
  {
    _id: 1,
    title: "Linkedin",
    platform: "linkedin",
    link: "https://www.linkedin.com/in/aditya-marzuk-mulyo-saputra-8603771a1/",
    phone: 082320664029
  },
  {
    _id: 2,
    title: "Instagram",
    platform: "instagram",
    link: "https://www.instagram.com/adityamms_/",
    phone: 082320664029
  },
  {
    _id: 3,
    title: "X",
    platform: "x",
    link: "",
    phone: 082320664029
  },
  {
    _id: 4,
    title: "Facebook",
    platform: "facebook",
    link: "https://www.facebook.com/adityamms",
    phone: 082320664029
  },
 
];
  `;

  return (
    <div className=" shadow-black p-5 bg-gray-900">
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}
