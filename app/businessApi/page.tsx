import React from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";

const Page = () => {
  return (
    <div>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/banner2.jpg')" }}
      >
        <h1>this is api page</h1>
        <div className="container mx-auto px-6 py-16 md:py-24 text-center">
          <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-b leading-loose from-blue-600 to-red-600 md:text-6xl font-bold mb-6">
            WhatsApp Business API <br />
            <span className="bg-clip-text mt-6 text-transparent bg-gradient-to-r from-green-500 to-yellow-300">
              Made Simple
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-black mb-10 max-w-3xl mx-auto">
            Get approved fast with our managed API solution. Send unlimited
            messages with 99.9% delivery rates.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link href="/get-started">
              <Button color="success" size={"lg"} variant={"shadow"}>
                Buy Now <FaLongArrowAltRight size={23} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className={"my-28"}>
        <h1 className="text-4xl text-center font-bold mb-8 text-success uppercase">
          WhatsApp Business API Plans
        </h1>
        <div
          className={"grid md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 md:px-16"}
        >
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <Card key={index} className="pt-1 pb-4 h-[460px]">
                <CardBody className="overflow-visible py-2 flex items-center">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    height={300}
                    // isLoading={true}
                    isZoomed={true}
                    src="https://heroui.com/images/hero-card-complete.jpeg"
                    width={300}
                  />
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large my-1">Frontend Radio</h4>
                  <p className="text-tiny uppercase font-bold">$50</p>
                  <small className="text-default-500 my-1">
                    this is description of the card of the card of the card
                  </small>
                </CardHeader>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
