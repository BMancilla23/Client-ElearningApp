"use client";

import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "@/components/auth/RegisterModal";
import VerifyOtp from "@/components/auth/VerifyOtp";

export default function ModalProvider() {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <VerifyOtp />
    </>
  );
}
