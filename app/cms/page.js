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
  useDisclosure,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react"; // Chakra UI toast
import ISinput from "../components/input/ISinput";
import ImagesInput from "../components/input/ImagesInput";
import Link from "next/link";
import { useSession } from "next-auth/react";
export default function Page() {
  const { data: session } = useSession(); // Get session data to check login state
  const toast = useToast(); // Chakra UI toast hook
  const [homePageDatas, setHomePageDatas] = useState({
    latestProject: {
      items: [],
      totalPages: 0,
      currentPage: 0,
    },
    profile: {
      id: "",
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
  const [isDisabled, setISdisabled] = useState({
    save: true,
    edit: false,
    add: false,
  });
  const changeIsdisabled = (name, value) => {
    setISdisabled((prev) => {
      return { ...prev, [name]: value };
    });
  };
  useEffect(() => {
    let body = {
      id: homePageDatas.profile._id,
      name: homePageDatas.profile.name,
      description: homePageDatas.profile.description,
      imageName: homePageDatas.profile.imageName,
      cvName: homePageDatas.profile.cvName,
    };

    // Check that all required fields are non-empty
    const isFormValid = Object.values(body).every(
      (value) => value && value !== "" && value !== 0
    );
    changeIsdisabled("save", !isFormValid); // Enable the save button if the form is valid
  }, [homePageDatas.profile]);
  // useEffect(() => {
  //   console.log("session :", session?.user);
  // }, [session]);

  const handleSave = async () => {
    changeIsdisabled("save", true);
    let body = {
      ...homePageDatas?.profile,
      id: homePageDatas?.profile?._id, // Add a comma here to separate the fields
    };

    // Show loading toast
    const toastId = toast({
      title: "Updating...",
      description: "Your update is in progress.",
      status: "loading",
      duration: null, // Keep loading until action finishes
      isClosable: false,
    });

    try {
      let res = await api.put(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/profile/update`,
        body
      );
      if (res && res.data.statusCode === 200) {
        // Close the loading toast and show success toast
        changeIsdisabled("save", false);
        toast.update(toastId, {
          title: "Update Successful",
          description: "Your data has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          onCloseComplete: () => {
            onClose();
          },
        });
      } else {
        // Show error toast
        changeIsdisabled("save", false);
        toast.update(toastId, {
          title: "Update Failed",
          description: "Something went wrong during the update.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Show error toast
      changeIsdisabled("save", false);
      toast.update(toastId, {
        title: "Error",
        description: "An error occurred while updating.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = `${
      homePageDatas.profile?.cv || "/data/pdf/aditya_frontend.pdf"
    }`; // Correct path to the PDF
    link.download = "aditya_frontend.pdf"; // Filename to download
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up
  };

  const [latestProjectQuery] = useState({
    category: 0,
    page: 1,
    totalPages: 0,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    console.log(homePageDatas.profile);
    setHomePageDatas((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [name]: files ? files[0] : value, // Handle file input or regular input
      },
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onClose(); // Close the modal after submitting
  // };

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
                  {session && session.user?.isAdmin && (
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
              {session && session.user?.isAdmin && (
                <div className="text-blue-500 cursor-pointer" onClick={onOpen}>
                  edit
                </div>
              )}

              <div className="absolute top-0 bottom-0 right-0 left-0 m-auto w-20 h-20">
                <div
                  className="h-full w-full rounded-lg cursor-pointer"
                  onClick={handleDownload}
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
            {homePageDatas.latestProject?.items?.map((item) => (
              <Link
                href={`/cms/latestProject/detail/${item._id}`}
                key={crypto.randomUUID()}
                className=" w-[200px] h-[140px] rounded-lg shadow-md shadow-black hover:shadow-blue-300 "
                style={{
                  backgroundImage: `url(${item.image || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "4px solid #e8e8e8",
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
                valueName={homePageDatas?.profile?.imageName}
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
                valueName={homePageDatas?.profile?.cvName}
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
                <Button
                  colorScheme="blue"
                  mr={3}
                  type="submit"
                  onClick={handleSave}
                  isDisabled={isDisabled.save}
                >
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
