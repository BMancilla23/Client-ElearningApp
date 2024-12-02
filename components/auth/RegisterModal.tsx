import { registerSchema, RegisterSchema } from "@/types/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/services/register.service";
import ModalTemplate from "@/templates/ModalTemplate";
import { useModalStore } from "@/zustand/useModalStore";
import { userRegisterStore } from "@/zustand/useRegisterStore";
import { Input } from "../ui/input";
import Loader from "../Loader";
import { useState } from "react";

const RegisterModal = () => {
  const { activeModal, closeModal, openModal } = useModalStore();
  const { setUserData } = userRegisterStore();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  /* const [isView, setisView] = useState<boolean>(false); */

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    setIsLoading(true);
    try {
      // Llamada a la API o servidor
      const response = await registerUser(data);
      // Guardar datos localmente si es necesario
      setUserData(data);
      toast({
        title: "Registro exitoso",
        description: "Bienvenido a Elearning",
      });
      console.log(data);
      form.reset();
      openModal("otp");
    } catch (error: any) {
      console.error("Error en el registro", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalTemplate
      title="Unirse a Elearning"
      isOpen={activeModal === "register"}
      onClose={closeModal}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Nombre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    placeholder="Nombre"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Correo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Correo"
                    autoComplete="off"
                  />
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
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="********"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? <Loader /> : "Registrarme"}
          </Button>
        </form>
      </Form>

      <p className="text-sm text-center">
        ¿Ya tienes una cuenta?
        <Button
          className="text-emerald-600 hover:text-emerald-700"
          variant="link"
          onClick={() => openModal("login")}
        >
          Iniciar sesión
        </Button>
      </p>
    </ModalTemplate>
  );
};

export default RegisterModal;
