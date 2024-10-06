"use client";
import React, { useEffect, useState } from "react";
import IStoolbar from "../components/utils/IStoolbar";
import api from "@/utils/axiosInstance";
import photosaya from "@/public/images/photo_saya.png";
import cvImage from "@/public/images/cvImage.png";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

export default function Page() {
  const [homePageDatas, setHomePageDatas] = useState({
    latestProject: {
      items: [],
      totalPages: 0,
      currentPage: 0,
    },
    skeletons: {
      latestProject: false,
    },
  });

  const [latestProjectQuery, setLatestProjectQuery] = useState({
    category: 0,
    page: 1,
    totalPages: 0,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "Adityamms",
    description:
      "a full-stack developer skilled in both front-end and back-end technologies...",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file input separately
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose(); // Close the modal after submitting
  };

  useEffect(() => {
    const fetchData = async () => {
      setHomePageDatas((item) => ({
        ...item,
        skeletons: {
          ...item.skeletons,
          latestProject: false,
        },
      }));

      try {
        const res = await api.get(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/latestProject?category=${latestProjectQuery.category}&page=1`
        );

        if (res.data.statusCode === 200) {
          setHomePageDatas((item) => ({
            ...item,
            latestProject: {
              items: [...res.data.result.items],
              totalPages: res.data.result.totalPages,
              currentPage: res.data.result.currentPage,
            },
            skeletons: {
              ...item.skeletons,
              latestProject: true,
            },
          }));
        }
      } catch (err) {
        setHomePageDatas((item) => ({
          ...item,
          skeletons: {
            ...item.skeletons,
            latestProject: false,
          },
        }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative">
      <IStoolbar title="Dashboard" />
      <div className="flex gap-5">
        {/*Main*/}
        <div className="border bg-gray-300 w-full rounded-lg p-5">
          <div className="flex gap-5 justify-between">
            <div className="border bg-white h-[120px] w-full rounded-lg p-2 flex gap-2">
              <div
                className="h-full w-[120px] rounded-lg bg-gray-300"
                style={{
                  backgroundImage: `url(${photosaya.src || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="grid ml-2 w-[90%] h-[90%] justify-between">
                <div className="mb-2 flex justify-between">
                  <div className=" font-medium text-lg">Adityamms</div>
                  <div
                    className="cursor-pointer text-blue-500"
                    onClick={onOpen}
                  >
                    edit
                  </div>
                </div>
                <p className="w-[90%] h-[90%] overflow-y-scroll">
                  a full-stack developer skilled in both front-end and back-end
                  technologies. I design user interfaces, build server-side
                  logic, and manage databases to create complete, efficient web
                  applications. If you need someone who can handle all aspects
                  of development, I`m here to help!
                </p>
              </div>
            </div>
            <div className="border bg-white h-[120px] w-[400px] rounded-lg relative p-2">
              <div className="  text-end">edit</div>
              <div className="absolute top-0 bottom-0 right-0 left-0 m-auto w-20 h-20">
                <div
                  className="h-full w-full rounded-lg cursor-pointer"
                  style={{
                    backgroundImage: `url(${cvImage.src || ""})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* payment History Coming soon */}
          <div>
            <div className="mb-3 font-semibold text-lg mt-10">
              payment History Coming soon
            </div>
            <div className="bg-white h-[350px]"></div>
          </div>
        </div>

        {/*Project*/}
        <div className="border bg-white w-[600px] h-[50vw] rounded-lg  p-5">
          <div className="mb-3 font-semibold text-lg">Project</div>
          <div className="w-full h-[95%] overflow-y-scroll grid gap-3 justify-center">
            {homePageDatas.latestProject?.items?.map((item, index) => (
              <div
                key={index}
                className="bg-black w-[200px] h-[140px] rounded-lg"
                style={{
                  backgroundImage: `url(${item.image || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for editing profile */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl mb={4} isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </FormControl>

              <FormControl mb={4} isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter a description"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Upload PDF</FormLabel>
                <Input
                  type="file"
                  name="file"
                  accept=".pdf"
                  onChange={handleChange}
                />
              </FormControl>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
