import React, { useEffect, useState } from "react";
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
  Text,
  Box,
  Heading,
  useClipboard,
  Flex,
  createStandaloneToast,
  Progress,
} from "@chakra-ui/react";
import { BiInfoCircle } from "react-icons/bi";

import SpinnerPage from "./Spinner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  resetDeleteState,
  deleteUser,
  removeUser,
} from "@/redux/features/AppSlice";
type Props = {};

const ModalPage = ({ isOpen, onClose }: any) => {
  const { withdrawalCode } = useAppSelector((state) => state.AppSlice);
  const { hasCopied, onCopy } = useClipboard(withdrawalCode);
  const [buttonText, setButtonText] = useState("Copy to Clipboard");

  const handleCopy = () => {
    onCopy();
    setButtonText("Copied!");
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setButtonText("Copy to Clipboard");
        }}
      >
        <ModalOverlay />
        <ModalContent
          w={{
            base: "80vw",
            md: "30rem",
          }}
        >
          <ModalHeader>Withdrawal Code</ModalHeader>
          <ModalCloseButton color={"#fff"} fontSize={20} />
          <ModalBody>
            <Flex
              p={4}
              align={"center"}
              fontSize={18}
              color={"red"}
              gap={4}
              fontWeight={600}
            >
              <BiInfoCircle />
              <Text colorScheme="info">code lasts for 3 hours</Text>
            </Flex>
            <Box p={4}>
              <Text fontSize={16} fontWeight={600}>
                {withdrawalCode}
              </Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Flex justify={"center"} w={"100%"}>
              <Button
                onClick={handleCopy}
                colorScheme="blue"
                isLoading={hasCopied}
                fontSize={16}
                loadingText="Copying..."
                disabled={hasCopied}
              >
                {buttonText}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPage;
export const DeleteUserModal = ({ isOpen, onClose, userId }: any) => {
  const { deleteState, errorMessage } = useAppSelector(
    (state) => state.AppSlice
  );
  const [isLoading, setisLoading] = useState(false);
  const { toast } = createStandaloneToast();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (deleteState.isSuccess) {
      toast({
        title: "Success",
        description: "Delete Successful",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading(false);
      onClose();
    }
    if (deleteState.isError) {
      toast({
        title: errorMessage?.statusCode,
        description: errorMessage?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading(false);
    }
    if (deleteState.isLoading) {
      setisLoading(true);
    }

    dispatch(resetDeleteState());
  }, [
    deleteState.isSuccess,
    deleteState.isError,
    deleteState.isLoading,
    dispatch,
  ]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          w={{
            base: "80vw",
            md: "30rem",
          }}
        >
          <ModalHeader>DELETE USER!!</ModalHeader>
          <ModalCloseButton color={"#fff"} fontSize={20} />
          {isLoading && <Progress size="xs" height={8} isIndeterminate />}
          <ModalBody>
            <Box p={4}>
              <Text fontSize={16} fontWeight={600}>
                DO YOU REALLY WANT TO DELETE THIS USER? <br /> IT CANNOT BE
                UNDONE
              </Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Flex justify={"center"} w={"100%"}>
              <Button
                onClick={async () => {
                  await dispatch(deleteUser(userId));
                  dispatch(removeUser(userId));
                }}
                colorScheme="red"
              >
                DELETE
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
