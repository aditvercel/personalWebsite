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
import ISinput from "../components/input/ISinput";
import ImagesInput from "../components/input/ImagesInput";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Page() {
  const { data: session } = useSession(); // Get session data to check login state
  const [homePageDatas, setHomePageDatas] = useState({
    latestProject: {
      items: [],
      totalPages: 0,
      currentPage: 0,
    },
    profile: {
      name: "",
      description: "",
      image: "",
      imageName: "",
      cv: "",
      cvName: "",
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
    description: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setHomePageDatas((prev) => {
      return {
        ...prev,
        profile: { ...prev.profile, [name]: files ? files[0] : value },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        const [res, tes] = await Promise.all([
          api.get(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/latestProject?category=${latestProjectQuery.category}&page=1`
          ),
          api.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/profile`),
        ]);

        if (res.data.statusCode === 200) {
          setHomePageDatas((item) => ({
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

        if (tes.data.statusCode === 200) {
          setHomePageDatas((item) => ({
            ...item,
            profile: tes.data.result[0],
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

  // useEffect(() => {
  //   console.log(homePageDatas.profile);
  // }, [homePageDatas.profile]);

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
                  backgroundImage: `url(${
                    homePageDatas.profile?.image || photosaya.src
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="grid ml-2 w-[90%] h-[90%] justify-between">
                <div className="mb-2 flex justify-between">
                  <div className=" font-medium text-lg">
                    {homePageDatas.profile?.name || "Aditya Marzuk"}
                  </div>
                  {session && (
                    <div
                      className="cursor-pointer text-blue-500"
                      onClick={onOpen}
                    >
                      edit
                    </div>
                  )}
                </div>
                <p className="w-[90%] h-[90%] overflow-y-scroll">
                  {homePageDatas.profile?.description}
                </p>
              </div>
            </div>
            <div className="border bg-white h-[120px] w-[400px] rounded-lg relative p-2 flex justify-between">
              <div className="font-medium text-lg">CV</div>
              {session && (
                <div className="text-blue-500 cursor-pointer" onClick={onOpen}>
                  edit
                </div>
              )}

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
              <Link
                href={`/cms/latestProject/detail/${item._id}`}
                key={index}
                className=" w-[200px] h-[140px] rounded-lg shadow-md shadow-black hover:shadow-blue-300 "
                style={{
                  backgroundImage: `url(${item.image || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "10px solid #e8e8e8",
                }}
              ></Link>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for editing profile */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className=" text-black bg-gray-100">
            Edit Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="bg-gray-100">
            <div className="grid gap-5">
              <ImagesInput
                onChange={(fileName, base64) => {
                  setHomePageDatas((prev) => ({
                    ...prev,
                    profile: {
                      ...prev.profile,
                      image: base64,
                      imageName: fileName,
                    },
                  }));
                }}
                type="image"
                name="image"
                label="Image"
                value={homePageDatas?.profile}
              />
              <ImagesInput
                onChange={(fileName, base64) => {
                  setHomePageDatas((prev) => ({
                    ...prev,
                    profile: {
                      ...prev.profile,
                      cv: base64,
                      cvName: fileName,
                    },
                  }));
                }}
                type="file"
                name="cv"
                label="CV"
                value={homePageDatas?.profile}
              />
              <ISinput
                onChange={handleInputChange}
                type="text"
                name="name"
                placeholder="Write your full name"
                value={homePageDatas.profile?.name}
                required
                label="Name"
              />

              <ISinput
                onChange={handleInputChange}
                type="textarea"
                name="description"
                placeholder="Write your full name"
                value={homePageDatas.profile?.description}
                required
                label="Description"
              />

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
