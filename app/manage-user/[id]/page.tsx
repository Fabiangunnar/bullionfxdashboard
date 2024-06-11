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
} from "@/redux/features/AppSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useParams } from "next/navigation";

type Props = {};

const ManageUser = (props: Props) => {
  const params = useParams();
  const { userManageData, sendState, updateState, errorMessage } =
    useAppSelector((state) => state.AppSlice);
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

  const [depositFormData, setDepositFormData] = useState({
    amount: 0,
  });
  const [postsPerPage, sePostsPerPage] = useState(4);

  const [transactionState, setTransactionState] = useState("PENDING");

  const [notifFormData, setNotifFormData] = useState({
    message: "",
  });
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
  };
  const handleTransactionStateChange = (e: any) => {
    if (e.target.value === "") return;
    console.log(132, e.target.value);
    setTransactionState(e.target.value);
  };

  const handleClickOutside = (event: any) => {
    if (stateBoxRef.current && !stateBoxRef.current.contains(event.target)) {
      setAccountBox(false);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;

  useEffect(() => {
    dispatch(getUser(params.id));
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
  }, [
    updateState.isSuccess,
    updateState.isError,
    updateState.isLoading,
    dispatch,
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

  const handleUpdateBalance = async (e: any) => {
    e.preventDefault();
    await dispatch(updateUser([params.id, balanceFormData]));
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
              's Balance
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
    </div>
  );
};

export default ManageUser;
