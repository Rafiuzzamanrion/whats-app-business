"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { FaExpand } from "react-icons/fa";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import axios from "axios";
import { Spinner } from "@heroui/spinner";
import { Modal, ModalContent, useDisclosure } from "@heroui/modal";
import { X } from "lucide-react";
import { addToast } from "@heroui/react";
import { router } from "next/client";

import { useAuth } from "@/app/hooks/use-auth";

type DataItem = {
  id: string;
  title: string;
  description: string;
  price: string;
  file: string;
  quantity: number;
  updatedAt: string | Date;
  createdAt: string | Date;
};

const Page = () => {
  const [data, setData] = React.useState<any>(null);
  const [isPending, startTransition] = React.useTransition();
  const [selectedImage, setSelectedImage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchData = async () => {
    startTransition(async () => {
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
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    onOpen();
  };
  const { user } = useAuth();
  const handleCheck = () => {
    if (!user) {
      addToast({
        title: "Unauthorized",
        description: "You must be logged in to place an order.",
        color: "danger",
        timeout: 3000,
      });
      router.push("/auth/signin");

      return;
    }
  };

  return (
    <div>
      {/* ... (keep all your existing header code exactly the same) ... */}

      <div className={"my-28"}>
        <h1 className="text-4xl text-center font-bold mb-8 text-success uppercase">
          WhatsApp Business API Plans
        </h1>
        {isPending ? (
          <div className="flex items-center justify-center h-64">
            <Spinner color={"success"} size={"lg"} variant={"default"} />
          </div>
        ) : (
          <div
            className={"grid md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 md:px-16"}
          >
            {data?.map((item: DataItem) => (
              <Card key={item.id} className="pt-1 pb-4 h-auto ">
                <CardBody className="overflow-visible py-2 flex items-center relative group">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    height={300}
                    isZoomed={true}
                    src={item?.file}
                    width={300}
                  />
                  <Button
                    isIconOnly
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                    color="success"
                    size={"lg"}
                    variant="flat"
                    onClick={() => handleImageClick(item.file)}
                  >
                    <FaExpand size={20} />
                  </Button>
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large my-1">{item.title}</h4>
                  <p className="text-tiny uppercase font-bold">${item.price}</p>
                  <p className="text-tiny font-bold my-1">
                    Quantity: {item.quantity}
                  </p>
                  <small className="text-default-500 my-1">
                    {item.description.length > 100
                      ? `${item.description.slice(0, 100)}...`
                      : item.description}
                  </small>
                </CardHeader>
                <div className={"flex justify-end items-center px-5 py-1"}>
                  <Link href={"/checkout/" + item.id}>
                    <Button
                      color={"success"}
                      variant={"bordered"}
                      onPress={handleCheck}
                    >
                      Buy Now
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Image Modal */}
      <Modal isOpen={isOpen} size="full" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <div className="flex items-center justify-center h-screen w-full">
              <Image
                alt="Full screen preview"
                className="object-contain max-h-screen max-w-screen"
                src={selectedImage}
              />
              <Button
                isIconOnly
                className="absolute top-2 right-4"
                color="danger"
                size={"lg"}
                variant="shadow"
                onClick={onClose}
              >
                <X />
              </Button>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Page;
