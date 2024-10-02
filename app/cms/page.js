"use client";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  HStack,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Link,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, InfoOutlineIcon } from "@chakra-ui/icons"; // Icons from Chakra
import { useRef, useEffect, useState } from "react";
import api from "@/utils/axiosInstance";

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra Disclosure for AlertDialog
  const [homePageDatas, setHomePageDatas] = useState({
    journeyDatas: [],
  });
  const cancelRef = useRef(); // Ref for AlertDialog cancellation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res, tes, ues, ies, wry] = await Promise.all([
          api.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/journey`),
          // api.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/faq`),
          // api.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/mySkills`),
        ]);

        if (res.data.statusCode === 200) {
          setHomePageDatas((item) => ({
            ...item,
            journeyDatas: res.data.result,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Delete Confirmation Popup
  const handleDelete = () => {
    // Add logic to handle delete action
    console.log("Item deleted!");
    onClose();
  };

  return (
    <div>
      <div className="w-full bg-white h-16 flex items-center align-middle px-2 text-2xl  mb-5 justify-between font-bold">
        <h1>Home Manager</h1>
        <Button colorScheme="green" size="md">
          Create
        </Button>
      </div>
      <div className="rounded-lg bg-white p-5">
        <TableContainer className="overflow-x-auto">
          <Table>
            {homePageDatas.journeyDatas.length > 0 && (
              <Thead className="bg-gray-400">
                <Tr>
                  <Th>NO.</Th>
                  {Object.keys(homePageDatas.journeyDatas[0]).map(
                    (key, index) => (
                      <Th key={index}>{key}</Th>
                    )
                  )}
                  <Th>Action</Th> {/* Action column */}
                </Tr>
              </Thead>
            )}
            <Tbody>
              {homePageDatas.journeyDatas.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td> {/* Row numbering */}
                  {Object.keys(item).map((key) => (
                    <Td key={key}>{item[key]}</Td>
                  ))}
                  <Td>
                    <HStack spacing="4">
                      {/* Detail Button with Icon */}
                      <Link href={`cms/detail/${item._id}`}>
                        <IconButton
                          icon={<InfoOutlineIcon />}
                          colorScheme="blue"
                          size="sm"
                          aria-label="Detail"
                        />
                      </Link>

                      {/* Update Button with Icon */}
                      <Link href={`cms/update/${item._id}`}>
                        <IconButton
                          icon={<EditIcon />}
                          colorScheme="yellow"
                          size="sm"
                          aria-label="Update"
                        />
                      </Link>

                      {/* Delete Button with Icon and Confirmation Dialog */}
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        size="sm"
                        aria-label="Delete"
                        onClick={() => {
                          console.log(item);
                          onOpen();
                        }} // Open the confirmation dialog
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      {/* AlertDialog for Delete Confirmation */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color="black">
              Delete Item
            </AlertDialogHeader>

            <AlertDialogBody color="black">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}
