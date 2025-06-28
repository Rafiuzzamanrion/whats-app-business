import React from "react";
import Image from "next/image";

const HomePage = () => {
  return (
    <div>
      <div>
        <h1
          className={
            "flex items-center justify-center text-2xl font-semibold text-center gap-2"
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
        <h1>Market, Sell & Support with</h1>
      </div>
    </div>
  );
};

export default HomePage;
