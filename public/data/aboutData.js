"use client";
import Image from "next/image";
import React from "react";
import designEducation from "@/public/icons/design-education-painting-svgrepo-com.svg";
import figmaSvg from "@/public/icons/figma-svgrepo-com.svg";
import graphic_icon from "@/public/icons/graphic_icon.svg";
import photo_edit from "@/public/icons/photo-edit-svgrepo-com.svg";
import seo1_svgrepo from "@/public/icons/seo-1-svgrepo-com.svg";
import social_svgrepo from "@/public/icons/social-svgrepo-com.svg";

const aboutDatas = [
  {
    icon: <Image src={designEducation} alt="designEducation" />,
    title: "Motion & Web Graphy",
    description:
      "Expertise in motion graphics and web design to create visually compelling and engaging digital experiences.",
  },
  {
    icon: <Image src={figmaSvg} alt="figmaSvg" />,
    title: "UI/UX Consultasy",
    description:
      "Specialized consultation in user interface and user experience design to enhance usability and customer satisfaction.",
  },
  {
    icon: <Image src={graphic_icon} alt="graphic_icon" />,
    title: "Branding & Design",
    description:
      "Comprehensive branding and design services to establish and elevate your brand's identity and visual presence.",
  },
  {
    icon: <Image src={photo_edit} alt="photo_edit" />,
    title: "Product & Photography",
    description:
      "High-quality product photography and editing services to showcase your products in the best light.",
  },
  {
    icon: <Image src={seo1_svgrepo} alt="seo1_svgrepo" />,
    title: "Key SEO Optimization",
    description:
      "Critical SEO optimization strategies to improve your website's search engine rankings and visibility.",
  },
  {
    icon: <Image src={social_svgrepo} alt="social_svgrepo" />,
    title: "Social Management",
    description:
      "Effective social media management to enhance your online presence and engage with your audience.",
  },
];

export default aboutDatas;
