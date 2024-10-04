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
import { DeleteIcon, EditIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { useRef, useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import IStoolbar from "../components/utils/IStoolbar";
import {
  convertToIndonesianDate,
  convertToIndonesianDateMonthAndYear,
} from "@/utils/formmattedValue";

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra Disclosure for AlertDialog
  const [homePageDatas, setHomePageDatas] = useState({
    journeyDatas: [],
    deletedItemId: "",
  });
  const cancelRef = useRef(); // Ref for AlertDialog cancellation

  const changeDeletedId = (id) => {
    setHomePageDatas((item) => {
      return { ...item, deletedItemId: id };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res] = await Promise.all([
          api.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/journey`),
        ]);

        if (res.data.statusCode === 200) {
          setHomePageDatas((item) => ({
            ...item,
            journeyDatas: res.data.result.map((itemChild) => {
              return {
                ...itemChild,
                createdAt: convertToIndonesianDate(itemChild.createdAt),
                updatedAt: convertToIndonesianDate(itemChild.updatedAt),
                year: convertToIndonesianDateMonthAndYear(itemChild.year),
              };
            }),
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await api.delete(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/journey`,
        {
          data: { id: homePageDatas.deletedItemId }, // Adjusted to send as data in DELETE request
        }
      );

      if (res.data.statusCode === 200) {
        alert("Success");
        // Optionally refetch or update the list after deletion
        setHomePageDatas((prev) => ({
          ...prev,
          journeyDatas: prev.journeyDatas.filter(
            (item) => item._id !== homePageDatas.deletedItemId
          ),
          deletedItemId: "", // Clear the deletedItemId
        }));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      onClose(); // Close the dialog after the delete operation
    }
  };

  return (
    <div>
      <IStoolbar title="Home Manager" add="/cms/create" />
      <div className="rounded-lg bg-white p-5">
        <TableContainer className="overflow-x-auto">
          <Table variant="striped" colorScheme="gray" border={1}>
            {homePageDatas.journeyDatas.length > 0 && (
              <Thead className="bg-gray-400 h-[60px]">
                <Tr>
                  <Th>NO.</Th>
                  {Object.keys(homePageDatas.journeyDatas[0]).map(
                    (key, index) => (
                      <Th key={index}>{key}</Th>
                    )
                  )}
                  <Th>Action</Th>
                </Tr>
              </Thead>
            )}
            <Tbody>
              {homePageDatas.journeyDatas.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  {Object.keys(item).map((key) => (
                    <Td key={key}>{item[key]}</Td>
                  ))}
                  <Td>
                    <HStack spacing="4">
                      <Link href={`cms/detail/${item._id}`}>
                        <IconButton
                          icon={<InfoOutlineIcon />}
                          colorScheme="blue"
                          size="sm"
                          aria-label="Detail"
                        />
                      </Link>
                      <Link href={`cms/update/${item._id}`}>
                        <IconButton
                          icon={<EditIcon />}
                          colorScheme="yellow"
                          size="sm"
                          aria-label="Update"
                        />
                      </Link>
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        size="sm"
                        aria-label="Delete"
                        onClick={() => {
                          changeDeletedId(item._id); // Set deletedItemId
                          onOpen(); // Open the confirmation dialog
                        }}
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
