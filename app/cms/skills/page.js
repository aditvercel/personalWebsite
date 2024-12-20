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
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
  useToast, // Import Toast for notifications
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import {
  DeleteIcon,
  EditIcon,
  InfoOutlineIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { useRef, useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import IStoolbar from "@/app/components/utils/IStoolbar";
import { convertToIndonesianDate } from "@/utils/formmattedValue";
import { Pagination } from "@mui/material";

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra Disclosure for AlertDialog
  const { data: session } = useSession(); // Get session data to check login state
  const loginTooltip = "You need to log in as ADMIN to perform this action.";
  const [homePageDatas, setHomePageDatas] = useState({
    mySkillsDatas: [],
    deletedItemId: "",
    totalPage: 1,
  });
  const [loadingDelete, setLoadingDelete] = useState(false); // Loading state for delete action
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const toast = useToast(); // Toast for notifications

  const cancelRef = useRef(); // Ref for AlertDialog cancellation
  const searchTimeoutRef = useRef(null); // Ref to store the timeout ID

  const changeDeletedId = (id) => {
    setHomePageDatas((item) => {
      return { ...item, deletedItemId: id };
    });
  };

  const fetchData = async (page = 1, query = "") => {
    try {
      const res = await api.get(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/mySkills/all-list?page=${page}&search=${query}`
      );

      if (res.data.statusCode === 200) {
        setHomePageDatas((item) => ({
          ...item,
          totalPage: res.data.result.totalPages,
          mySkillsDatas: res.data.result.items.map((itemChild) => {
            return {
              ...itemChild,
              createdAt: convertToIndonesianDate(itemChild.createdAt),
              updatedAt: convertToIndonesianDate(itemChild.updatedAt),
            };
          }),
        }));
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, searchQuery); // Fetch data on mount and when search or page changes
  }, []);

  const handleDelete = async () => {
    setLoadingDelete(true); // Set loading to true during deletion process
    try {
      const res = await api.delete(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/mySkills/delete`,
        {
          data: { id: homePageDatas.deletedItemId },
        }
      );

      if (res.data.statusCode === 200) {
        setHomePageDatas((prev) => ({
          ...prev,
          mySkillsDatas: prev.mySkillsDatas.filter(
            (item) => item._id !== homePageDatas.deletedItemId
          ),
          deletedItemId: "", // Clear the deletedItemId
        }));
        toast({
          title: "Success",
          description: "Item deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the item.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error deleting item:", error);
    } finally {
      setLoadingDelete(false); // Stop loading state after deletion or failure
      onClose(); // Close the dialog after the delete operation
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value); // Update search term
    setCurrentPage(1); // Reset to page 1 when searching

    // Clear the previous timeout to avoid multiple API calls
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set a new timeout to wait for 1 second before triggering the API call
    searchTimeoutRef.current = setTimeout(() => {
      // Trigger the fetchData function with the current page and query
      fetchData(currentPage, value);
    }, 800); // 1 second delay
  };

  // Handler for pagination change
  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update page
    fetchData(value, searchQuery); // Fetch data with the updated page and current search query
  };

  return (
    <div>
      <IStoolbar title="Skills Manager" add="/cms/skills/create" />
      <div className="rounded-lg bg-white p-5">
        <div className="my-5">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              variant="filled"
              placeholder="Search..."
              className="border border-black"
              value={searchQuery} // Controlled input for search
              onChange={handleSearchChange} // Update search term on change
            />
          </InputGroup>
        </div>
        <TableContainer className="overflow-x-auto">
          <Table variant="striped" colorScheme="gray" border={1}>
            {homePageDatas.mySkillsDatas.length > 0 && (
              <Thead className="bg-gray-400 h-[60px]">
                <Tr>
                  <Th>NO.</Th>
                  {Object.keys(homePageDatas.mySkillsDatas[0]).map((key) => (
                    <Th key={crypto.randomUUID()}>{key}</Th>
                  ))}
                  <Th>Action</Th>
                </Tr>
              </Thead>
            )}
            <Tbody>
              {homePageDatas.mySkillsDatas.map((item, index) => (
                <Tr key={crypto.randomUUID()}>
                  <Td>{index + 1}</Td>

                  {Object.keys(item).map((key) => (
                    <Td key={key}>
                      {key === "image" ? (
                        <div
                          className="bg-gray-500 shadow-sm shadow-black rounded-lg h-[70px] w-[100px] bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${item[key]})`,
                            border: "2px solid #e8e8e8",
                          }}
                        ></div>
                      ) : key === "description_1" || key === "description_2" ? (
                        <div className="w-[300px] overflow-hidden text-ellipsis">
                          {item[key]}
                        </div>
                      ) : (
                        item[key]
                      )}
                    </Td>
                  ))}
                  {/* actions button */}
                  <Td>
                    <HStack spacing="4">
                      <Link href={`/cms/skills/detail/${item._id}`}>
                        <IconButton
                          icon={<InfoOutlineIcon />}
                          colorScheme="blue"
                          size="sm"
                          aria-label="Detail"
                        />
                      </Link>
                      <Link href={`/cms/skills/update/${item._id}`}>
                        <IconButton
                          icon={<EditIcon />}
                          colorScheme="yellow"
                          size="sm"
                          aria-label="Update"
                        />
                      </Link>
                      <Tooltip
                        label={!session ? loginTooltip : ""}
                        isDisabled={!!session} // Show tooltip only if not logged in
                      >
                        <span>
                          {" "}
                          {/* This span wrapper is needed for tooltips on disabled buttons */}
                          <IconButton
                            icon={<DeleteIcon />}
                            colorScheme="red"
                            size="sm"
                            aria-label="Delete"
                            isDisabled={!session || !session.user.isAdmin} // Disable button if not logged in
                            onClick={() => {
                              changeDeletedId(item._id); // Set deletedItemId
                              onOpen(); // Open the confirmation dialog
                            }}
                          />
                        </span>
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <div className="flex items-center justify-center align-middle mt-10">
          <Pagination
            count={homePageDatas.totalPage}
            page={currentPage} // Controlled pagination
            onChange={handlePageChange} // Update page on change
            color="primary"
            size="large"
            shape="rounded"
            className="bg-gray-400 rounded-lg"
          />
        </div>
      </div>

      {/* AlertDialog for Delete Confirmation */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Confirmation
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this item? You can&apos;t undo
              this action.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                isDisabled={loadingDelete}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                isLoading={loadingDelete} // Show loading state
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}
