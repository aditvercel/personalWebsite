"use client";
import React, { useState, useEffect } from "react";
import api from "@/utils/axiosInstance";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Page() {
  const [homePageDatas, setHomePageDatas] = useState({
    contactDatas: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res] = await Promise.all([
          api.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/contact`),
        ]);

        if (res.data.statusCode === 200) {
          setHomePageDatas((prev) => ({
            ...prev,
            contactDatas: res.data.result,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const codeString = `
const contact = ${JSON.stringify(homePageDatas.contactDatas, null, 2)}
  `;

  return (
    <div className="shadow-black p-5 bg-gray-900">
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}
