"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import ModalTemplate from "@/templates/ModalTemplate";
import { useModalStore } from "@/zustand/useModalStore";
import { Controller, useForm } from "react-hook-form";
import { otpSchema, OtpSchema } from "@/types/otp-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { resendOtp, verifyOtp } from "@/services/otp.service";
import Loader from "../Loader";

const VerifyOtp = () => {
  const { activeModal, closeModal } = useModalStore();
  const { toast } = useToast();

  const [isVerifying, setisVerifying] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);

  const { handleSubmit, control } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleVerifyOtp = async (data: OtpSchema) => {
    setisVerifying(true);

    try {
      await verifyOtp(data);

      toast({
        title: "verificacion exitosa",
        description: "Tu cuenta ha sido verificada.",
      });
      closeModal();
    } catch (error: any) {
      toast({
        title: "Error al verificar OTP",
        description: error.message || "Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setisVerifying(false);
    }
  };

  const handleResendtOtp = async () => {
    setIsResending(true);

    try {
      await resendOtp();
      toast({
        title: "OTP reenviado",
        description: "Se ha enviado un nuevo OTP a tu correo.",
      });
    } catch (error: any) {
      toast({
        title: "Error al reenviar OTP",
        description: error.message || "Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <ModalTemplate
      title="Verifica tu cuenta"
      description="Ingresa el OTP enviado a tu correo"
      className="text-center"
      isOpen={activeModal === "otp"}
      onClose={closeModal}
    >
      <form onSubmit={handleSubmit(handleVerifyOtp)} className="space-y-6">
        <Controller
          name="otp"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <div className="flex justify-center items-center">
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-2">
                  {fieldState.error.message}
                </p>
              )}

              <Button className="w-full" type="submit" disabled={isVerifying}>
                {isVerifying ? (
                  <Loader title="Verificando..." />
                ) : (
                  "Verificar OTP"
                )}
              </Button>

              <div>
                <p className="text-center">
                  No recibiste el OTP?
                  <Button
                    variant="link"
                    className="text-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-700"
                    disabled={isResending}
                  >
                    {isResending ? (
                      <Loader title="Reenviando..." />
                    ) : (
                      "Reenviar OTP"
                    )}
                  </Button>
                </p>
              </div>
            </>
          )}
        />
      </form>
    </ModalTemplate>
  );
};

export default VerifyOtp;
