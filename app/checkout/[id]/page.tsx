"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { addToast, Button, Input, Select, SelectItem } from "@heroui/react";
import { LuCopyCheck } from "react-icons/lu";
import axios from "axios";

import { useCloudinaryUpload } from "@/app/hooks/useCloudinaryUpload";

type FormData = {
  name: string;
  email: string;
  activeWhatsappNumber: string;
  paymentMethod: string;
  file: File | null;
  productId: string;
  quantity: string;
};
type SelectOption = {
  label: string;
  value: string;
};

// Binance addresses data
const BINANCE_ADDRESSES = {
  trc20: "TKJHoSiYdCnSZnXJSGnM7zRANg6JVtZJMR",
  bnb: "0xd112c81003add7d6925e2c0f944d192c4d0f3a0f",
  uid: "998237852",
};

const Page = () => {
  const params = useParams();
  const { id } = params;
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    activeWhatsappNumber: "",
    paymentMethod: "",
    file: null as File | null,
    quantity: "1",
    productId: id as string,
  });
  const [isPending, startTransition] = React.useTransition();
  const [selectedBinanceType, setSelectedBinanceType] = React.useState<
    "trc20" | "bnb" | "uid"
  >("trc20");
  const [isCopied, setIsCopied] = React.useState(false);
  const { upload, isLoading, error, result, reset } = useCloudinaryUpload();
  const [data, setData] = React.useState<any>(null);
  const [totalAmount, setTotalAmount] = React.useState(0);
  // const [quanity, setQuanity] = React.useState(10);
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/businessApi/${id}`);

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

  const updateFormData = (key: keyof typeof formData, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      if (
        !formData.name ||
        !formData.email ||
        !formData.activeWhatsappNumber ||
        !formData.paymentMethod ||
        !formData.file ||
        !formData.quantity ||
        !formData.productId
      ) {
        console.error("Please fill all required fields");

        return;
      }
      if (formData.file && formData.file.size > 10 * 1024 * 1024) {
        console.error("File size exceeds 5MB limit");

        return;
      }
      try {
        let fileUrl: string;

        if (formData?.file) {
          const { url } = await upload(formData.file);

          fileUrl = url;
        } else {
          console.error("No file selected for upload");

          return;
        }
        const updatedData = {
          ...formData,
          file: fileUrl || "",
          quantity: parseInt(data?.quantity) || 1,
          totalPrice: parseFloat(formData?.quantity) * parseFloat(data?.price),
        };
        const response = await axios.post("/api/order", updatedData);

        if (response.status === 201) {
          addToast({
            title: "Order Placed",
            description: "Your order has been placed successfully.",
            color: "success",
            timeout: 3000,
          });
          reset();
        } else {
          console.error("Failed to create order:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading file:", error);

        return;
      }
    });
    console.log("Form submitted with data:", formData);
  };

  const selectOptions: SelectOption[] = [
    { label: "Binance", value: "binance" },
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  switch (formData?.paymentMethod) {
    case "binance":
      console.log("Binance selected");
      break;
    default:
      console.log("No option selected");
      break;
  }

  const handleSelectChange = (selectedKey: string) => {
    setFormData((prevState) => ({
      ...prevState,
      paymentMethod: selectedKey,
    }));
  };
  const handleQuantityChange = (selectedQuantity: string) => {
    setFormData((prev) => ({
      ...prev,
      quantity: selectedQuantity,
    }));
  };

  const generateQuantityOptions = (maxQuantity: number) => {
    if (!maxQuantity || maxQuantity <= 0) return [];

    return Array.from({ length: maxQuantity }, (_, index) => ({
      value: (index + 1).toString(),
      label: `${index + 1}`,
    }));
  };
  const quantityOptions = generateQuantityOptions(data?.quantity || 1);

  // @ts-ignore
  return (
    <div className={"flex flex-col justify-center items-center "}>
      <h1 className="text-2xl text-center font-bold my-5 uppercase text-success">
        Checkout Page
      </h1>

      <h1 className={"text-2xl font-semibold my-4 "}>
        Payable Amount: $
        {0 || parseFloat(formData?.quantity) * parseFloat(data?.price)}
      </h1>

      <form
        className={
          "space-y-12 w-max dark:bg-gray-900 bg-gray-50 p-10 shadow-xl rounded-2xl"
        }
        onSubmit={handleSubmit}
      >
        {/* Show Binance address when selected */}

        <Input
          isRequired
          color={"success"}
          errorMessage="Please enter your name"
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your name"
          type="text"
          value={formData.name}
          onValueChange={(value) => {
            updateFormData("name", value);
          }}
        />

        {/* Rest of your form inputs remain the same */}
        <Input
          isRequired
          color={"success"}
          errorMessage="Please enter your email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="text"
          value={formData.email}
          onValueChange={(value) => {
            updateFormData("email", value);
          }}
        />

        <Input
          isRequired
          color={"success"}
          errorMessage="Please enter a valid number"
          label="Whatsapp Number"
          labelPlacement="outside"
          name={"activeWhatsappNumber"}
          placeholder="Enter your active whatsapp number"
          type="number"
          value={formData.activeWhatsappNumber}
          onValueChange={(value) => {
            updateFormData("activeWhatsappNumber", value);
          }}
        />
        {formData.paymentMethod === "binance" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Select
                color={"success"}
                label="Binance Address Type"
                selectedKeys={[selectedBinanceType]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as
                    | "trc20"
                    | "bnb"
                    | "uid";

                  setSelectedBinanceType(selected);
                }}
              >
                <SelectItem key="trc20">TRC20</SelectItem>
                <SelectItem key="bnb">BNB(BEP29)</SelectItem>
                <SelectItem key="uid">UID</SelectItem>
              </Select>
            </div>

            <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded justify-between">
              <span className="font-mono">
                {BINANCE_ADDRESSES[selectedBinanceType]}
              </span>
              <Button
                size="sm"
                onPress={() =>
                  copyToClipboard(BINANCE_ADDRESSES[selectedBinanceType])
                }
              >
                {isCopied ? (
                  <span className={"flex items-center gap-1"}>
                    <LuCopyCheck color={"green"} size={16} /> Copied
                  </span>
                ) : (
                  "Copy"
                )}
              </Button>
            </div>
          </div>
        )}
        <Select
          isRequired
          color={"success"}
          label="Quantity"
          name="quantity"
          selectedKeys={formData.quantity ? [formData.quantity] : []}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0] as string;

            // Handle quantity selection
            handleQuantityChange(selectedKey);
          }}
        >
          {quantityOptions.map((option) => (
            <SelectItem key={option.value}>{option.label}</SelectItem>
          ))}
        </Select>
        <Select
          isRequired
          color={"success"}
          label="Payment Method"
          name="paymentMethod"
          selectedKeys={formData.paymentMethod ? [formData.paymentMethod] : []}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0] as string;

            handleSelectChange(selectedKey);
          }}
        >
          {selectOptions.map((gradient) => (
            <SelectItem key={gradient.value}>{gradient.label}</SelectItem>
          ))}
        </Select>

        <Input
          isRequired
          color={"success"}
          errorMessage="Please choose a file"
          label="Payment Proof (screenshot of payment)"
          labelPlacement="outside"
          name="file"
          placeholder="Choose a file"
          type="file"
          onChange={(e) => {
            const files = e.target.files;

            updateFormData("file", files ? files[0] : null);
          }}
        />

        <div className="flex gap-2 mt-6 justify-end">
          <Button
            color={"success"}
            disabled={isPending}
            isLoading={isPending}
            type="submit"
          >
            {isPending ? "Placing Order..." : "Place Order"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
