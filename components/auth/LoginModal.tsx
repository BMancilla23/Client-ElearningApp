"use client";

import { useModalStore } from "@/zustand/useModalStore";
import ModalTemplate from "@/templates/ModalTemplate";
import { loginSchema, LoginSchema } from "@/types/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { login } from "@/store/auth/authThunks";
import { AppDispatch } from "@/store";

const LoginModal = () => {
  const { activeModal, closeModal, openModal } = useModalStore();

  const [isView, setisView] = useState<boolean>(false);

  const handleToggleView = () => {
    setisView(!isView);
  };

  const dispatch: AppDispatch = useDispatch();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await dispatch(login(data));
      closeModal();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <ModalTemplate
      title="Unirse a Elearning"
      isOpen={activeModal === "login"}
      onClose={closeModal}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      placeholder="********"
                      {...field}
                      type={isView ? "text" : "password"}
                      className="w-full bg-transparent"
                      autoComplete="off"
                    />

                    {isView ? (
                      <Eye
                        className="absolute right-4 z-10 cursor-pointer text-gray-500 hover:text-emerald-600 hover:transition-all hover:duration-200"
                        onClick={handleToggleView}
                      />
                    ) : (
                      <EyeOff
                        className="absolute right-4  z-10 cursor-pointer text-gray-500 hover:text-emerald-600 hover:transition-all hover:duration-200"
                        onClick={handleToggleView}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            <span className="text-base">Iniciar sesión</span>
          </Button>
        </form>
      </Form>

      <div className="space-y-4 mt-4 text-center flex flex-col items-center">
        <p>O unirte con:</p>
        <div className="flex space-x-4">
          <FaGoogle className="w-[1.7rem] h-[1.5rem] text-gray-500 cursor-pointer hover:text-emerald-600" />
          <FaFacebook className="w-[1.7rem] h-[1.5rem] text-gray-500 cursor-pointer hover:text-emerald-600" />
        </div>
      </div>

      <div>
        <p className="text-center">
          ¿No tienes una cuenta? {/* Register */}
          <Button
            className="text-emerald-600 hover:text-emerald-700"
            variant="link"
            onClick={() => openModal("register")}
          >
            Registrate
          </Button>
        </p>
      </div>
    </ModalTemplate>
  );
};

export default LoginModal;
