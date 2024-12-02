import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { FaSearch } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="container px-4 sm:px-0 mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8 xl:gap-x-20 items-center py-20">
        <div className=" w-96 relative h-96 lg:w-full lg:h-full lg:aspect-w-2 lg:aspect-h-2 overflow-hidden rounded-full">
          <Image
            priority={true}
            src="/images/hero.png"
            alt="hero"
            fill
            className="object-contain p-14"
          />
          <div className="absolute inset-0 bg-gradient-to-r dark:from-blue-500 dark:to-emerald-500 mix-blend-multiply" />
        </div>

        <div className="flex flex-col gap-y-6 xl:gap-y-8 xl:w-[500px]">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold lg:leading-normal xl:tracking-wide opacity-90">
            Mejore su experiencia de aprendizaje en línea al instante
          </h2>
          <p className="text-base">
            Tenemos 20k de cursos en línea y 500k estudiantes registrados en
            línea. Encuentre los cursos que desee entre ellos.
          </p>
          <div className="flex items-center gap-x-4 relative">
            <Input
              placeholder="Buscar cursos"
              className="w-full bg-transparent"
            />
            <Button className="bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emeraold-700 text-white px-4 py-2 rounded-md absolute right-0">
              <FaSearch className="mr-2 h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
