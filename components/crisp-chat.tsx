"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("8434dac4-d84f-43f5-8cac-22fc27be7dd3");
  }, []);
  return null;
};

export default CrispChat;
