import dashboard_icon from "@/public/icons/dashboard_icon.svg";
import home_icon from "@/public/icons/home_icon.svg";
import pages_icon from "@/public/icons/pages_icon.svg";
import journey_icon from "@/public/icons/journey_icon.svg";
import contact_icon from "@/public/icons/contact_icon.svg";
import query_icon from "@/public/icons/query_icon.svg";

const cmsNavbar = [
  {
    parentName: "Dashboard",
    icon: dashboard_icon,
    link: "/cms",
    child: [
      //   {
      //     childName: "",
      //     icon: "",
      //     link: "",
      //   },
    ],
  },
  {
    parentName: "Home Manager",
    icon: home_icon,
    link: "/",
    child: [
      // {
      //   childName: "Keys Manager",
      //   icon: pages_icon,
      //   link: "/cms/keys",
      // },
      {
        childName: "Skills Manager",
        icon: pages_icon,
        link: "/cms/skills",
      },
      {
        childName: "Latest Project",
        icon: pages_icon,
        link: "/cms/latestProject",
      },
      {
        childName: "Work Solution",
        icon: pages_icon,
        link: "/cms/workSolution",
      },
      {
        childName: "FAQ",
        icon: pages_icon,
        link: "/cms/faq",
      },
      {
        childName: "Testimonials",
        icon: pages_icon,
        link: "/cms/testimonial",
      },
    ],
  },
  // {
  //   parentName: "About Manager",
  //   icon: "",
  //   link: "/cms/about",
  //   child: [
  //     //   {
  //     //     childName: "",
  //     //     icon: "",
  //     //     link: "",
  //     //   },
  //   ],
  // },
  {
    parentName: "Journey Manager",
    icon: journey_icon,
    link: "/cms/journey",
    child: [
      //   {
      //     childName: "",
      //     icon: "",
      //     link: "",
      //   },
    ],
  },
  {
    parentName: "Contact Manager",
    icon: contact_icon,
    link: "/cms/contact",
    child: [
      //   {
      //     childName: "",
      //     icon: "",
      //     link: "",
      //   },
    ],
  },
  {
    parentName: "Query Manager",
    icon: query_icon,
    link: "/cms/query",
    child: [
      //   {
      //     childName: "",
      //     icon: "",
      //     link: "",
      //   },
    ],
  },
];

export default cmsNavbar;
