"use client";
import Head from "next/head";
import styles from "@/app/styles/pages/User.module.scss";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { UserTypes, setUserManageData } from "@/redux/features/AppSlice";
import { setCurrentPage } from "@/redux/features/NavSlice";
import Pagination from "@/components/Pagination";
import {
  useDisclosure,
  Flex,
  Spacer,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Input,
  Tfoot,
  TableCaption,
  Box,
} from "@chakra-ui/react";
import { HiUsers } from "react-icons/hi2";

export default function Home() {
  const { users } = useAppSelector((state: any) => state.AppSlice);
  const [currentPostPage, setCurrentPostPage] = useState(1);
  const [postsPerPage, sePostsPerPage] = useState(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const indexOfLastPost = currentPostPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const allUsers = [...users].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB.getTime() - dateA.getTime();
  });
  const currentPosts = allUsers.slice(indexofFirstPost, indexOfLastPost);
  const handlePostsPerPage = (page: number) => {};
  const { isOpen, onOpen, onClose } = useDisclosure();

  const paginate = (number: any) => {
    // setCurrentPage(number);
  };

  return (
    <>
      <Head>
        <title>BITTFX TRADE ADMIN</title>
        <meta
          name="description"
          content="Explore the powerful bittfxtrade trading platform for seamless FX trade."
        />{" "}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <HiUsers />
            <p>User Management</p>
          </div>
          <Flex p={2}>
            <Spacer />
            <Box>
              <Input p={2} placeholder="Search ..." fontSize={12} />
            </Box>
          </Flex>
          <TableContainer gap={1}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th fontSize={14}>S/N</Th>
                  <Th fontSize={14}>Username</Th>
                  <Th fontSize={14}>Email</Th>
                  <Th fontSize={14} isNumeric>
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {users && users?.length > 0 ? (
                  [...currentPosts]
                    .sort((a, b) => {
                      const dateA = new Date(a.createdAt);
                      const dateB = new Date(b.createdAt);

                      return dateB.getTime() - dateA.getTime();
                    })
                    .map((user: UserTypes, index) => (
                      <Tr key={user.id}>
                        <Td fontSize={12}>{index + 1}</Td>
                        <Td fontSize={12}>{`${user.username}`}</Td>
                        <Td fontSize={12}>{`${user.email}`}</Td>

                        <Td fontSize={12} isNumeric>
                          <Flex direction={"column"} gap={3} align={"end"}>
                            <Button
                              fontSize={12}
                              maxW={16}
                              size={"sm"}
                              colorScheme="messenger"
                              onClick={() =>
                                router.push(`/manage-user/${user.id}`)
                              }
                            >
                              Manage
                            </Button>
                            {/* <Button
                              onClick={() => {
                                onOpen();
                                setDeleteId(user.id);
                              }}
                              fontSize={12}
                              size={"sm"}
                              maxW={16}
                              colorScheme="red"
                            >
                              Delete
                            </Button> */}
                          </Flex>
                        </Td>
                      </Tr>
                    ))
                ) : (
                  <Tr>
                    <Td>-</Td>
                    <Td fontSize={12}>No One has Signed up yet</Td>
                  </Tr>
                )}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>User ID</Th>
                  <Th>Username</Th>
                  <Th>Email</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Table>
            <TableCaption>
              {" "}
              Showing {indexofFirstPost + 1} to{" "}
              {indexofFirstPost + currentPosts.length} of {users.length} entries{" "}
            </TableCaption>
          </Table>
          <Flex p={4}>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={users.length}
              paginate={paginate}
              currentPage={currentPostPage}
              setCurrentPage={setCurrentPostPage}
            />
          </Flex>
        </div>
      </section>
    </>
  );
}
