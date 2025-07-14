"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import axios from "axios";

type DataItem = {
  id: string;
  title: string;
  description: string;
  price: string;
  file: string;
  updatedAt: string | Date;
  createdAt: string | Date;
};
const Page = () => {
  const [data, setData] = React.useState<any>(null);
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/businessApi");

      if (response.status === 200) {
        setData(response.data);
        console.log("Fetched data:", response.data);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          {data?.map((item: DataItem) => (
            <Card key={item.id} className="pt-1 pb-4 h-[500px]">
              <CardBody className="overflow-visible py-2 flex items-center">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  height={300}
                  // isLoading={true}
                  isZoomed={true}
                  src={item?.file}
                  width={300}
                />
              </CardBody>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large my-1">{item.title}</h4>
                <p className="text-tiny uppercase font-bold">${item.price}</p>
                <small className="text-default-500 my-1">
                  {item.description}
                </small>
              </CardHeader>
              <div className={"flex justify-end items-center px-5 py-1"}>
                <Button
                  color={"success"}
                  variant={"bordered"}
                  // onPress={() => handleDelete(item.id)}
                >
                  Buy Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
