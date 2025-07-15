"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { LuCopyCheck } from "react-icons/lu";

type FormData = {
  name: string;
  email: string;
  activeWhatsappNumber: string;
  paymentMethod: string;
  file: File | null;
  orderId: string;
};
type SelectOption = {
  label: string;
  value: string;
};

// Binance addresses data
const BINANCE_ADDRESSES = {
  trc20: "TNPZJ8DZQvVjXk1h1J7x5W3ZnkqX2YnYnJ",
  bnb: "bnb1qxy2kgdygjrsqtzq2n0yrf2493p83kkfj5x4lh",
  uid: "123456789",
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
    orderId: "",
  });
  const [isPending, startTransition] = React.useTransition();
  const [selectedBinanceType, setSelectedBinanceType] = React.useState<
    "trc20" | "bnb" | "uid"
  >("trc20");
  const [isCopied, setIsCopied] = React.useState(false);

  const updateFormData = (key: keyof typeof formData, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      activeWhatsappNumber: "",
      paymentMethod: "",
      file: null,
      orderId: "",
    });
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

  return (
    <div className={"flex flex-col justify-center items-center "}>
      <h1 className="text-2xl text-center font-bold my-5 uppercase text-success">
        Checkout Page
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
                <SelectItem key="bnb">BNB</SelectItem>
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
            color={"danger"}
            disabled={isPending}
            type="button"
            variant="flat"
            onPress={handleReset}
          >
            Reset
          </Button>
          <Button
            color="primary"
            disabled={isPending}
            isLoading={isPending}
            type="submit"
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
