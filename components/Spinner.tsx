import { Spinner } from "@chakra-ui/react";
import React from "react";

type Props = {};

const SpinnerPage = (props: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="rgba(99, 255, 251, 1)"
        size="xl"
      />
    </div>
  );
};

export default SpinnerPage;
