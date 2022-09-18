import { Triangle } from "react-loader-spinner";
import React from "react";

export default function Loading() {
  return (
    <Triangle
      height="40"
      width="40"
      color="#11296B"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
}
