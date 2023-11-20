"use client";

import ProModal from "@/components/pro-modal";
import { useState, useEffect } from "react";

import React from "react";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <ProModal />
    </>
  );
};

export default ModalProvider;
