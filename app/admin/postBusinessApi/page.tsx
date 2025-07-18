"use client";
import React, { FormEvent, useEffect, useState, useTransition } from "react";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Button } from "@heroui/button";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";
import { Spinner } from "@heroui/spinner";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";

import { useCloudinaryUpload } from "@/app/hooks/useCloudinaryUpload";

type FormData = {
  title: string;
  description: string;
  price?: string;
  quantity?: number;
  file: FileList | null;
};

type DataItem = {
  id: string;
  title: string;
  description: string;
  price: string;
  file: string;
  quantity?: number;
  updatedAt: string | Date;
  createdAt: string | Date;
};
type FormAction =
  | "reset"
  | {
      type: "submit";
      data: Omit<FormData, "file"> & { file?: string };
    }
  | null;

const Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [action, setAction] = useState<FormAction>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    quantity: 1,
    file: null,
  });
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { upload, isLoading, error, result, reset } = useCloudinaryUpload();

  const handleOpen = () => {
    onOpen();
  };
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

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateAction = (field: keyof FormData, value: any) => {
    setAction((prevState) => {
      if (!prevState || prevState === "reset") {
        return {
          type: "submit",
          data: {
            title: field === "title" ? value : "",
            description: field === "description" ? value : "",
            price: field === "price" ? value : "",
            quantity: field === "quantity" ? value : 1,
            file: field === "file" ? value : undefined,
          },
        };
      }

      return {
        ...prevState,
        data: {
          ...prevState.data,
          [field]: value,
        },
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        let fileUrl: string | undefined;

        if (formData.file && formData.file.length > 0) {
          const file = formData.file[0];
          const uploadResult = await upload(file);

          fileUrl = uploadResult.url;
          console.log("Uploaded file URL:", fileUrl);
        } else {
          console.warn("No file selected");
        }

        // Create the data object directly
        const submitData = {
          type: "submit",
          data: {
            title: formData.title,
            description: formData.description,
            price: formData.price,
            quantity: formData.quantity || 1,
            file: fileUrl, // This will be the URL
          },
        };

        // Send the data object directly, not the state
        const response = await axios.post("/api/businessApi", submitData);

        if (response.status === 201) {
          fetchData();
          reset();
          onClose();
        } else {
          console.error("Failed to create Business API:", response.statusText);
        }
      } catch (error) {
        console.error("Submission failed:", error);
      }
    });
  };

  const handleReset = () => {
    setAction("reset");
    setFormData({
      title: "",
      description: "",
      price: "",
      quantity: 1,
      file: null,
    });
  };

  console.log("data:", data);

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      try {
        setDeletingId(id);
        const response = await axios.delete(`/api/businessApi`, {
          data: { id },
        });

        if (response.status === 200) {
          fetchData();
        } else {
          console.error("Failed to delete Business API:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting Business API:", error);
      }
    });
  };

  return (
    <div className={"min-h-screen"}>
      <div>
        <div className="flex justify-between gap-3 mt-5">
          <h1 className={"text-2xl text-success"}>
            Create New Business API Data
          </h1>
          <Button color={"success"} variant={"shadow"} onPress={handleOpen}>
            <CiCirclePlus size={25} /> Add Business API
          </Button>
        </div>
        <div className={"my-8"}>
          <h1 className="text-4xl text-center font-bold mb-8 text-success uppercase">
            WhatsApp Business API Plans
          </h1>
          {isPending ? (
            <div className="flex items-center justify-center h-64">
              <Spinner color={"success"} size={"lg"} variant={"default"} />
            </div>
          ) : (
            <div
              className={
                "grid md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 md:px-16"
              }
            >
              {data?.map((item: DataItem) => (
                <Card key={item?.id} className="pt-1 pb-4 h-[550px]">
                  <CardBody className="overflow-visible py-2 flex items-center">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      height={300}
                      // isLoading={}
                      isZoomed={true}
                      src={item.file}
                      width={300}
                    />
                  </CardBody>
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large my-1">{item.title}</h4>
                    <p className="text-tiny uppercase font-bold">
                      ${item.price}
                    </p>{" "}
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
                      color={"danger"}
                      variant={"bordered"}
                      onPress={() => handleDelete(item.id)}
                    >
                      {isPending && item?.id === deletingId && (
                        <Spinner color={"danger"} />
                      )}{" "}
                      {isPending && item.id === deletingId
                        ? "Deleting..."
                        : "Delete"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
        <Modal isOpen={isOpen} size="3xl" onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h2 className="text-2xl font-semibold text-success">
                    Add Business API
                  </h2>
                  <p className="text-sm text-gray-400">
                    Fill in the details below to add a new business API.
                  </p>
                </ModalHeader>
                <ModalBody>
                  <form className={"space-y-12"} onSubmit={handleSubmit}>
                    <Input
                      isRequired
                      errorMessage="Please enter a valid Title"
                      label="Title"
                      labelPlacement="outside"
                      name="title"
                      placeholder="Enter your title"
                      type="text"
                      value={formData.title}
                      onValueChange={(value) => {
                        updateFormData("title", value);
                        updateAction("title", value);
                      }}
                    />

                    <Input
                      isRequired
                      errorMessage="Please enter a valid Description"
                      label="Description"
                      labelPlacement="outside"
                      name="description"
                      placeholder="Enter your description"
                      type="text"
                      value={formData.description}
                      onValueChange={(value) => {
                        updateFormData("description", value);
                        updateAction("description", value);
                      }}
                    />
                    <Input
                      isRequired
                      errorMessage="Please enter a valid Price"
                      label="Price"
                      labelPlacement="outside"
                      name="price"
                      placeholder="Enter your price"
                      type="number"
                      value={formData.price}
                      onValueChange={(value) => {
                        updateFormData("price", value);
                        updateAction("price", value);
                      }}
                    />
                    <Input
                      isRequired
                      errorMessage="Please enter a valid Quantity"
                      label="Quantity"
                      labelPlacement="outside"
                      name="quantity"
                      placeholder="Enter a quantity"
                      type="number"
                      // value={formData.quantity?.toString() ?? "1"}
                      onValueChange={(value) => {
                        const numValue = value ? parseInt(value) : 1; // Ensure we always have a number

                        updateFormData("quantity", numValue);
                        updateAction("quantity", numValue);
                      }}
                    />

                    <Input
                      isRequired
                      errorMessage="Please choose a file"
                      label="File"
                      labelPlacement="outside"
                      name="file"
                      placeholder="Choose a file"
                      type="file"
                      onChange={(e) => {
                        const files = e.target.files;

                        updateFormData("file", files);
                        updateAction("file", files?.[0]?.name);
                      }}
                    />

                    <div className="flex gap-2 mt-6 justify-end">
                      <Button
                        color="primary"
                        disabled={isPending}
                        isLoading={isPending}
                        type="submit"
                      >
                        {isPending ? "Submitting..." : "Submit"}
                      </Button>
                      <Button
                        disabled={isPending}
                        type="button"
                        variant="flat"
                        onPress={handleReset}
                      >
                        Reset
                      </Button>
                    </div>

                    {error && (
                      <div className="text-small text-danger">
                        Error: {error}
                      </div>
                    )}
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Page;
