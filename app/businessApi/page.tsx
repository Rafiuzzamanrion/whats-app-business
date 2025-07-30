"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { FaExpand, FaWhatsapp, FaRocket, FaStar } from "react-icons/fa";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import axios from "axios";
import { Spinner } from "@heroui/spinner";
import { Modal, ModalContent, useDisclosure } from "@heroui/modal";
import {
  X,
  MessageCircle,
  Zap,
  Shield,
  HeadphonesIcon,
  TrendingUp,
  Users,
} from "lucide-react";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/hooks/use-auth";
import { useCheckoutNavigation } from "@/app/hooks/useDynamicRoute";

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

const BusinessApi = () => {
  const [data, setData] = React.useState<any>(null);
  const [isPending, startTransition] = React.useTransition();
  const [selectedImage, setSelectedImage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { navigateToCheckout } = useCheckoutNavigation();

  const fetchData = async () => {
    startTransition(async () => {
      try {
        const response = await axios.get("/api/businessApi");

        if (response.status === 200) {
          setData(response.data);
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

  const handleCheck = (): boolean => {
    if (!user) {
      addToast({
        title: "Unauthorized",
        description: "You must be logged in to place an order.",
        color: "danger",
        timeout: 3000,
      });
      router.push("/auth/signin");

      return false;
    }

    return true;
  };

  const features = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Advanced Messaging",
      description:
        "Send rich messages with media, buttons, and interactive elements",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description:
        "Deliver messages instantly to millions of customers worldwide",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description:
        "Bank-grade encryption and security for all your business communications",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Analytics & Insights",
      description:
        "Track performance with detailed analytics and reporting tools",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "E-commerce Plus",
      rating: 5,
      comment:
        "WhatsApp Business API increased our customer engagement by 300%!",
    },
    {
      name: "Mike Chen",
      company: "TechStart Inc",
      rating: 5,
      comment:
        "The best investment we made for customer communication. Highly recommended!",
    },
    {
      name: "Emma Rodriguez",
      company: "Retail Pro",
      rating: 5,
      comment:
        "Seamless integration and amazing support. Our sales team loves it!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-emerald-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <FaWhatsapp className="h-20 w-20 text-white animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transform Your Business with
            <span className="block text-green-200">WhatsApp Business API</span>
          </h1>
          <p className="text-xl md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Connect with your customers like never before. Send messages,
            automate responses, and grow your business with the world&apos;s
            most popular messaging platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-white text-green-600 hover:bg-green-50 font-bold px-8 py-3"
              size="lg"
              startContent={<FaRocket />}
            >
              Get Started Today
            </Button>
            <Link href={"#1"}>
              <Button
                className="border-white text-white hover:bg-white hover:text-green-600 font-bold px-8 py-3"
                size="lg"
                variant="bordered"
              >
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose WhatsApp Business API?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to help your business communicate
              better and grow faster
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" id={"1"}>
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600"
              >
                <CardBody className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-500 text-white rounded-full">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className={"my-16"}>
        <h1 className="text-4xl text-center font-bold mb-12 text-success uppercase">
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
                  <Button
                    color={"success"}
                    variant={"bordered"}
                    onPress={() => {
                      if (handleCheck()) {
                        navigateToCheckout(item.id, {
                          source: "businessApi",
                        });
                      }
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gradient-to-r from-emerald-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of satisfied businesses already using our WhatsApp
              Business API
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20"
              >
                <CardBody className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-green-200 text-sm">
                      {testimonial.company}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Users className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join over 10,000+ businesses already using WhatsApp Business API to
            connect with their customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3"
              size="lg"
              startContent={<HeadphonesIcon className="h-5 w-5" />}
            >
              Talk to Sales
            </Button>
            <Button
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold px-8 py-3"
              size="lg"
              variant="bordered"
            >
              Back to home
            </Button>
          </div>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      <Modal isOpen={isOpen} size="full" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <div className="flex items-center justify-center h-screen w-full bg-black/90">
              <Image
                alt="Full screen preview"
                className="object-contain max-h-screen max-w-screen"
                src={selectedImage}
              />
              <Button
                isIconOnly
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600"
                color="danger"
                size="lg"
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

export default BusinessApi;
