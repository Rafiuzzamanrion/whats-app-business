"use client";
import React from "react";
import Image from "next/image";

const BottomBanner = () => {
  return (
    <div className={"grid lg:grid-cols-2 grid-cols-1 gap-10 p-6 mt-32"}>
      <div>
        <Image
          alt={"banner2"}
          className={"h-[500px] object-cover rounded-lg"}
          height={400}
          src={"/banner3.jpg"}
          width={800}
        />
      </div>
      <div>
        <h1
          className={
            "lg:text-4xl md:text-3xl text-3xl font-semibold mb-10" +
            " text-success"
          }
        >
          Your Trusted Solution for Secure & Smart WhatsApp Business Messaging
        </h1>
        <p className={"text-justify text-lg tracking-wide leading-9"}>
          Today, WhatsApp Business Messaging is the most effective way to build
          direct, fast and branded communication with customers. But
          unfortunately, many people are getting trapped in fake services, scams
          and false promises while taking this opportunity. With us, you can
          complete your work safely without any hassle. Take your brand one step
          ahead! We offer the most reliable and smart solution for WhatsApp
          Business Messaging service. Make messaging more automated, branded and
          user-friendly now.
        </p>
      </div>
    </div>
  );
};

export default BottomBanner;
