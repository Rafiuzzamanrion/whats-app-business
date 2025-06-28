"use client";
import React from "react";
import Image from "next/image";
import TextLoop from "react-text-loop";
import { Button } from "@heroui/button";
import { FaLongArrowAltRight } from "react-icons/fa";

const HomePage = () => {
  return (
    <div>
      <div
        className={
          "h-[800px] w-full flex flex-col items-center justify-center" +
          " bg-no-repeat" +
          " bg-cover bg-center"
        }
        style={{ backgroundImage: "url(/banner1.jpg)" }}
      >
        <h1
          className={
            "flex items-center flex-col md:flex-row justify-center md:text-3xl text-xl" +
            " font-semibold" +
            " text-center" +
            " dark:text-black gap-2 mt-[-180px]"
          }
        >
          Boost your business on
          <Image
            alt="Picture of the author"
            height={30}
            src="/whatsapp.png"
            width={30}
          />{" "}
          WhatsApp
        </h1>
        <h1
          className={
            "lg:text-7xl md:text-5xl text-4xl font-semibold text-center gap-2 my-10" +
            " text-black"
          }
        >
          Market, Sell & Support with <br/>
          <TextLoop className={"mt-5 text-success"} fade={true}>
            <span>WAPI Cloud</span>
            <span>Whatsapp Api</span>
          </TextLoop>{" "}
        </h1>
        <div className={"flex flex-col md:flex-row gap-4 mt-10"}>
          <Button color={"primary"} size={"lg"} variant={"shadow"}>
            View Reviews <FaLongArrowAltRight size={18} />
          </Button>
          <Button color={"success"} size={"lg"} variant={"shadow"}>
            View Pricing <FaLongArrowAltRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
