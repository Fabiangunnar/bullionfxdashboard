"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/app/styles/pages/User.module.scss";
import { AiTwotoneEdit } from "react-icons/ai";
import { HiUser } from "react-icons/hi2";
import { MdAccountBalance, MdArrowDropDown } from "react-icons/md";
import { RiLuggageDepositFill, RiProfileLine } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  TableContainer,
  TableCaption,
  Table,
  Tbody,
  Td,
  Tr,
  Th,
  Thead,
  Tfoot,
  Flex,
  Stack,
  WrapItem,
  Avatar,
  Spacer,
  Divider,
  CardBody,
  Card,
  createStandaloneToast,
  Select,
} from "@chakra-ui/react";
import SpinnerPage from "@/components/Spinner";
import Pagination from "@/components/Pagination";
import {
  getUser,
  resetUsersState,
  resetUpdateState,
  resetSendState,
  resetUpdateDepositState,
  updateUser,
  updateUserCurrencyBalance,
  TransactionType,
  getTransactions,
  resetTransactionState,
  deleteTransaction,
  createTransaction,
} from "@/redux/features/AppSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useParams } from "next/navigation";

type Props = {};

const ManageUser = (props: Props) => {
  const currencies = ["btc", "eth", "usdt", "xrp"];
  const params = useParams();

  const {
    userManageData,
    transactions,
    transactionState,
    createTransactionState,
    updateState,
    errorMessage,
  } = useAppSelector((state) => state.AppSlice);

  const stateBoxRef: any = useRef();
  const [accountBox, setAccountBox] = useState(false);
  const [formData, setFormData] = useState({
    amount: 0,
  });
  const [isLoading, setisLoading] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [balanceFormData, setBalanceFormData] = useState({
    balance: 0,
  });
  const [transactionsFormData, setTransactionsFormData] = useState({
    message: "",
  });
  const [currencyBalanceFormData, setCurrencyBalanceFormData] = useState({
    balance: 0,
    comment: "",
  });
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentTransactions = transactions.slice(
    indexofFirstPost,
    indexOfLastPost
  );

  const [currencyState, setCurrencyState] = useState("");

  const { toast } = createStandaloneToast();
  const dispatch = useAppDispatch();
  const date = new Date(`${userManageData.createdAt}`);
  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  const formattedDate = `${date.toLocaleDateString("en-US", options)}`;
  const handleChangeAccountState = () => {
    setAccountBox((prev) => !prev);
  };
  const handleInputChange = (e: any) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));

    setBalanceFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setTransactionsFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleInputChange2 = (e: any) => {
    setCurrencyBalanceFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCurrencyStateChange = (e: any) => {
    if (e.target.value === "") return;
    setCurrencyState(e.target.value);
  };

  const handleClickOutside = (event: any) => {
    if (stateBoxRef.current && !stateBoxRef.current.contains(event.target)) {
      setAccountBox(false);
    }
  };

  useEffect(() => {
    dispatch(getUser(params.id));
    dispatch(getTransactions(params.id));
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (updateState.isSuccess) {
      toast({
        title: "Success",
        description: "account state changed successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading2(false);
      dispatch(getUser(params.id));
      dispatch(getTransactions(params.id));
    }
    if (updateState.isError) {
      toast({
        title: errorMessage?.statusCode,
        description: errorMessage?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading2(false);
    }

    if (updateState.isLoading) {
      setisLoading2(true);
    }

    dispatch(resetUsersState());
  }, [updateState.isSuccess, updateState.isError, updateState.isLoading]);
  useEffect(() => {
    if (createTransactionState.isSuccess) {
      toast({
        title: "Success",
        description: "transaction message created successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading2(false);
      dispatch(getUser(params.id));
      dispatch(getTransactions(params.id));
    }
    if (createTransactionState.isError) {
      toast({
        title: errorMessage?.statusCode,
        description: errorMessage?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading2(false);
    }

    if (createTransactionState.isLoading) {
      setisLoading2(true);
    }

    dispatch(resetUsersState());
  }, [
    createTransactionState.isSuccess,
    createTransactionState.isError,
    createTransactionState.isLoading,
  ]);

  useEffect(() => {
    if (transactionState.isSuccess) {
      toast({
        title: "Success",
        description: "Transaction updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading2(false);
      dispatch(getUser(params.id));
      dispatch(getTransactions(params.id));
    }
    if (transactionState.isError) {
      toast({
        title: errorMessage?.statusCode,
        description: errorMessage?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading2(false);
    }

    if (transactionState.isLoading) {
      setisLoading2(true);
    }

    // dispatch(resetTransactionState());
  }, [
    transactionState.isLoading,
    transactionState.isError,
    transactionState.isLoading,
  ]);

  const [btcEq, setBtcEq] = useState(0);
  useEffect(() => {
    convertDollarToBTC(Number(userManageData?.balance));
  });

  async function convertDollarToBTC(amountInUSD: number) {
    try {
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
      );
      const data = await response.json();
      const exchangeRate = data.bpi.USD.rate_float;
      const btcValue = amountInUSD / exchangeRate;
      setBtcEq(btcValue);
      return btcValue;
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      return null;
    }
  }

  const handleUpdateCurrencyBalance = async (e: any) => {
    e.preventDefault();
    if (!currencyState)
      return toast({
        title: "Currency not passed",
        description: 400,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    if (!currencyBalanceFormData)
      return toast({
        title: "Add value to amount input",
        description: 400,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    await dispatch(
      updateUserCurrencyBalance([
        params.id,
        currencyState,
        currencyBalanceFormData,
      ])
    );
    return;
  };

  const handleUpdateBalance = async (e: any) => {
    e.preventDefault();
    await dispatch(updateUser([params.id, balanceFormData]));
    return;
  };
  const handleTransactionsMessage = async (e: any) => {
    e.preventDefault();
    await dispatch(createTransaction([params.id, transactionsFormData]));
    return;
  };

  return (
    <div className={`${styles.manage_user_block}`}>
      {isLoading && <SpinnerPage />}
      {isLoading2 && <SpinnerPage />}
      <section className={`${styles.manage_user_head}`}>
        <h1>Manage User</h1>
        <small>Dashboard</small>
      </section>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <HiUser />
            <p>{`${userManageData.fullname}`}'s Information</p>
          </div>
          <Flex p={4} gap={8} justify={"between"} align={"center"}>
            <WrapItem>
              <Avatar
                // onClick={() => {
                //   setOverlay(<OverlayOne />);
                //   modal1.onOpen();
                // }}
                cursor={"pointer"}
                size="2xl"
                name={userManageData.fullname}
                src={"/images.png"}
              />
            </WrapItem>

            <Stack spacing={3} w={"100%"}>
              <Text fontSize="sm">
                BTC Balance: ${userManageData.btc_balance}
              </Text>
              <Text fontSize="sm">
                ETH Balance: ${userManageData.eth_balance}
              </Text>
              <Text fontSize="sm">
                USDT Balance: ${userManageData.usdt_balance}
              </Text>
              <Text fontSize="sm">
                XRP Balance: ${userManageData.xrp_balance}
              </Text>
              <Text fontSize="sm">
                Available Balance: ${userManageData.balance}
              </Text>
              <Text fontSize="sm">BTC Equivalent: {btcEq} BTC</Text>

              {/* <Button
                fontSize={14}
                type="submit"
                w="100%"
                colorScheme="messenger">
                Login Account
              </Button> */}
            </Stack>
          </Flex>
        </div>
      </section>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <MdAccountBalance />
            <p>
              Update {`${userManageData.fullname}`}
              's Currency Balance
            </p>
          </div>
          <Box p={2}>
            <form action="" onSubmit={handleUpdateCurrencyBalance}>
              <FormControl p={2}>
                <FormLabel fontSize={11}>Currency</FormLabel>
                <Select
                  cursor={"pointer"}
                  fontSize={11}
                  onClick={handleCurrencyStateChange}
                  px={0}
                  placeholder={"select currency"}
                  size="sm"
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency.toUpperCase()}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl p={2}>
                <FormLabel fontSize={11}>currency Balance</FormLabel>
                <Input
                  type="text"
                  fontSize={12}
                  name="balance"
                  value={currencyBalanceFormData.balance}
                  onChange={handleInputChange2}
                />
              </FormControl>

              <FormControl p={2}>
                <Button
                  fontSize={14}
                  type="submit"
                  w="100%"
                  colorScheme="messenger"
                >
                  Update
                </Button>
              </FormControl>
            </form>
          </Box>
        </div>
      </section>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <MdAccountBalance />
            <p>
              Update {`${userManageData.fullname}`}
              's Total Balance
            </p>
          </div>
          <Box p={2}>
            <form action="" onSubmit={handleUpdateBalance}>
              <FormControl p={2}>
                <FormLabel fontSize={11}>Total Balance</FormLabel>
                <Input
                  type="text"
                  fontSize={12}
                  name="balance"
                  value={balanceFormData.balance}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl p={2}>
                <Button
                  fontSize={14}
                  type="submit"
                  w="100%"
                  colorScheme="messenger"
                >
                  Update
                </Button>
              </FormControl>
            </form>
          </Box>
        </div>
      </section>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <MdAccountBalance />
            <p>Set {`${userManageData.fullname}`} Transactions Message</p>
          </div>
          <Box p={2}>
            <form action="" onSubmit={handleTransactionsMessage}>
              <FormControl p={2}>
                <FormLabel fontSize={11}>transaction message</FormLabel>
                <Textarea
                  fontSize={12}
                  name="message"
                  placeholder="transaction message"
                  value={transactionsFormData.message}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl p={2}>
                <Button
                  fontSize={14}
                  type="submit"
                  w="100%"
                  colorScheme="messenger"
                >
                  Create
                </Button>
              </FormControl>
            </form>
          </Box>
        </div>
      </section>

      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <RiProfileLine />
            <p> {`${userManageData.fullname}`}'s Profile</p>
          </div>
          <Flex p={4} gap={1} direction={"column"}>
            <Box>
              <Text fontSize="sm">Name:</Text>
              <Text fontSize={12}> {`${userManageData.fullname}`}</Text>
            </Box>
            <Divider />
            <Box>
              <Text fontSize="sm">Email:</Text>
              <Text fontSize={12}>{userManageData.email}</Text>
            </Box>
            <Divider colorScheme={"red"} variant={"solid"} />
            <Box>
              <Text fontSize="sm">Registered on:</Text>
              <Text fontSize={12}>{formattedDate}</Text>
            </Box>
            <Divider />
            <Box>
              <Text fontSize="sm">Referral link:</Text>
              {/* <Text fontSize={12}>been</Text> */}
              <Button size={"sm"} fontSize={11} colorScheme="messenger">
                VIEW REFERRALS
              </Button>
            </Box>
            <Divider colorScheme={"red"} variant={"solid"} />
          </Flex>
        </div>
      </section>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <RiLuggageDepositFill />
            <p>Transactions</p>
          </div>
          <TableContainer gap={1}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {/* <Th fontSize={11}>S/N</Th> */}
                  <Th fontSize={11}>Username</Th>
                  <Th fontSize={11}>Message</Th>
                  <Th fontSize={11}>Time</Th>

                  <Th fontSize={11} isNumeric>
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {[...currentTransactions].map(
                  (transaction: TransactionType, index) => {
                    const date = new Date(`${transaction.createdAt}`);
                    const options: any = {
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    };

                    const formattedDate = `${date.toLocaleDateString(
                      "en-US",
                      options
                    )}`;
                    return (
                      <Tr key={transaction.id}>
                        {/* <Td fontSize={11}>{index + 1}</Td> */}
                        <Td fontSize={11}>{transaction.user.username}</Td>
                        <Td
                          fontSize={11}
                          className="flex flex-wrap w-full max-w-[10rem] whitespace-normal"
                        >
                          {transaction.message}
                        </Td>
                        <Td fontSize={11}>{formattedDate}</Td>
                        <Td fontSize={11}>
                          {" "}
                          <Flex
                            direction={"row"}
                            gap={1}
                            justify={"end"}
                            align={"center"}
                            minW={"6rem"}
                          >
                            <Button
                              fontSize={11}
                              maxW={24}
                              size={"sm"}
                              w="100%"
                              type="button"
                              onClick={() =>
                                dispatch(deleteTransaction(transaction.id))
                              }
                              colorScheme="red"
                            >
                              Delete
                            </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  }
                )}
              </Tbody>
              <Tfoot>
                <Tr>
                  {/* <Th fontSize={11} isNumeric>
                    S/N
                  </Th> */}
                  <Th fontSize={11}>Username</Th>
                  <Th fontSize={11}>Message</Th>
                  <Th fontSize={11}>Time</Th>

                  <Th fontSize={11} isNumeric>
                    Action
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Table>
            <TableCaption>
              {" "}
              Showing {indexofFirstPost + 1} to{" "}
              {indexofFirstPost + currentTransactions.length} of{" "}
              {transactions.length} entries{" "}
            </TableCaption>
          </Table>
          <Flex p={4}>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={transactions.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Flex>
        </div>
      </section>
    </div>
  );
};

export default ManageUser;
