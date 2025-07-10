"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Checkbox,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Plus, Save, X, Clock, Users, Shield, Check } from "lucide-react";
import axios from "axios";
import { MessageSquare, BarChart3, Rocket, Zap } from "lucide-react";

// Type declarations
type GradientOption =
  | "from-green-400 to-emerald-600"
  | "from-blue-400 to-indigo-600"
  | "from-red-400 to-rose-600"
  | "from-purple-400 to-violet-600";

type IconOption = "MessageSquare" | "BarChart3" | "Rocket" | "Zap";

interface Pricing {
  setup: string;
  messaging: string;
  note: string;
}

interface Package {
  _id?: string;
  name: string;
  subtitle: string;
  icon: IconOption;
  gradient: GradientOption;
  bgGradient: string;
  borderColor: string;
  features: string[];
  pricing: Pricing;
  badge: string;
  popular: boolean;
  instant: boolean;
}

interface SelectOption {
  label: string;
  value: string;
}
interface PackageFormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  subtitle: HTMLInputElement;
  icon: HTMLSelectElement;
  gradient: HTMLSelectElement;
  badge: HTMLTextAreaElement;
  // Add other form elements as needed
}

interface PackageFormElement extends HTMLFormElement {
  readonly elements: PackageFormElements;
}
const PackageManager: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPackage, setCurrentPackage] = useState<Package>({
    name: "",
    subtitle: "",
    icon: "MessageSquare",
    gradient: "from-green-400 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    features: [""],
    pricing: {
      setup: "",
      messaging: "",
      note: "",
    },
    badge: "",
    popular: false,
    instant: false,
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const gradientOptions: SelectOption[] = [
    { label: "Green", value: "from-green-400 to-emerald-600" },
    { label: "Blue", value: "from-blue-400 to-indigo-600" },
    { label: "Red", value: "from-red-400 to-rose-600" },
    { label: "Purple", value: "from-purple-400 to-violet-600" },
  ];

  const iconOptions: SelectOption[] = [
    { label: "Message", value: "MessageSquare" },
    { label: "Analytics", value: "BarChart3" },
    { label: "Rocket", value: "Rocket" },
    { label: "Zap", value: "Zap" },
  ];
  // Create an icon map
  const iconComponents = {
    MessageSquare,
    BarChart3,
    Rocket,
    Zap,
  };
  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/packages");

      if (response.ok) {
        const data = await response.json();

        setPackages(data);
      } else {
        console.error("Failed to fetch packages");
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCurrentPackage((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setCurrentPackage((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange =
    (name: keyof Package) => (selectedItem: { value: string }) => {
      setCurrentPackage((prev) => ({
        ...prev,
        [name]: selectedItem.value,
      }));
    };

  const handlePricingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setCurrentPackage((prev) => ({
      ...prev,
      pricing: { ...prev.pricing, [name]: value },
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...currentPackage.features];

    newFeatures[index] = value;
    setCurrentPackage((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setCurrentPackage((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...currentPackage.features];

    newFeatures.splice(index, 1);
    setCurrentPackage((prev) => ({ ...prev, features: newFeatures }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setCurrentPackage((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create a clean, serializable copy of the data
      const packageData = {
        name: String(currentPackage.name),
        subtitle: String(currentPackage.subtitle),
        icon: String(currentPackage.icon),
        gradient: String(currentPackage.gradient),
        bgGradient: String(currentPackage.bgGradient),
        borderColor: String(currentPackage.borderColor),
        features: [...currentPackage.features].map(String),
        pricing: {
          setup: String(currentPackage.pricing.setup),
          messaging: String(currentPackage.pricing.messaging),
          note: String(currentPackage.pricing.note),
        },
        badge: String(currentPackage.badge),
        popular: Boolean(currentPackage.popular),
        instant: Boolean(currentPackage.instant),
      };

      // Axios request with proper typing
      const response = await axios.post<Package>("/api/packages", packageData);

      // Handle successful response
      const newPackage = response.data;

      console.log("newPackage", newPackage);

      if (editingIndex !== null) {
        setPackages((prev) =>
          prev.map((pkg, idx) => (idx === editingIndex ? newPackage : pkg)),
        );
      } else {
        setPackages((prev) => [...prev, newPackage]);
      }

      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving package:", error);

      // Enhanced error handling
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", {
          status: error.response?.status,
          data: error.response?.data,
        });
      }
    }
  };

  const editPackage = (index: number) => {
    setCurrentPackage(packages[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const deletePackage = async (index: number) => {
    try {
      const response = await fetch(`/api/packages/${packages[index]._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedPackages = [...packages];

        updatedPackages.splice(index, 1);
        setPackages(updatedPackages);
      }
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  const resetForm = () => {
    setCurrentPackage({
      name: "",
      subtitle: "",
      icon: "MessageSquare",
      gradient: "from-green-400 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      features: [""],
      pricing: {
        setup: "",
        messaging: "",
        note: "",
      },
      badge: "",
      popular: false,
      instant: false,
    });
    setEditingIndex(null);
  };

  console.log("packages", packages);

  // @ts-ignore
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Package Manager</h1>
        <Button
          color="primary"
          startContent={<Plus size={18} />}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Package
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {packages?.map((pkg, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 ${pkg.borderColor} overflow-hidden group flex flex-col`}
            style={{ minHeight: "780px" }}
          >
            {/* Popular Badge */}
            {pkg?.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-bl-xl font-semibold text-sm z-10">
                Most Popular
              </div>
            )}

            {/* Instant Badge */}
            {pkg?.instant && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-bl-xl font-semibold text-sm z-10 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Instant
              </div>
            )}

            {/* Header with gradient background */}
            <div
              className={`bg-gradient-to-r ${pkg?.gradient} p-6 text-white relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    {currentPackage.icon &&
                    iconComponents[currentPackage.icon] ? (
                      React.createElement(iconComponents[currentPackage.icon])
                    ) : (
                      <span>No Icon</span>
                    )}
                  </div>
                  <Users className="w-6 h-6 opacity-80" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{pkg?.name}</h3>
                <p className="text-white/90 font-medium">{pkg?.subtitle}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div className="space-y-6">
                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    Features Included
                  </h4>
                  <ul className="space-y-3">
                    {pkg?.features?.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="bg-green-100 p-1 rounded-full mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    💲 Pricing:
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">
                        🔧 API Setup:
                      </span>
                      <span className="font-bold text-gray-900">
                        ${pkg?.pricing?.setup}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">
                        ${pkg?.pricing?.messaging}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-xs text-yellow-800">
                      ⚠️ {pkg?.pricing?.note}
                    </p>
                  </div>
                </div>

                {/* Badge */}
                <div>
                  <div
                    className={`bg-gradient-to-r ${pkg?.bgGradient} p-3 rounded-lg border ${pkg?.borderColor}`}
                  >
                    <p className="text-sm font-medium text-gray-800">
                      🎯 {pkg?.badge}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button - Always at bottom */}
              <div className="mt-6">
                <button
                  className={`w-full bg-gradient-to-r ${pkg?.gradient} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 group-hover:shadow-xl`}
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
        ))}
      </div>

      <Modal
        className={"overflow-y-scroll h-[600px]"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>
            {editingIndex !== null ? "Edit Package" : "Create New Package"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Package Name"
                name="name"
                value={currentPackage.name}
                onChange={handleInputChange}
              />

              <Input
                label="Subtitle"
                name="subtitle"
                value={currentPackage.subtitle}
                onChange={handleInputChange}
              />

              <Select
                label="Icon"
                name="icon"
                selectedKeys={[currentPackage.icon]}
                onChange={(value: String) => handleSelectChange(value, "icon")}
              >
                {iconOptions.map((icon) => (
                  <SelectItem key={icon.value} value={icon.value}>
                    {icon.label}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label="Gradient Color"
                name="gradient"
                selectedKeys={[currentPackage.gradient]}
                onChange={(value) => handleSelectChange(value, "gradient")}
              >
                {gradientOptions.map((gradient) => (
                  <SelectItem key={gradient.value} value={gradient.value}>
                    {gradient.label}
                  </SelectItem>
                ))}
              </Select>

              <div className="space-y-2">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="block text-sm font-medium">Features</label>
                {currentPackage.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                    />
                    <Button size="sm" onClick={() => removeFeature(index)}>
                      <X size={16} />
                    </Button>
                  </div>
                ))}
                <Button size="sm" onClick={addFeature}>
                  Add Feature
                </Button>
              </div>

              <Divider />

              <h3 className="font-medium">Pricing</h3>
              <Input
                label="Setup Fee"
                name="setup"
                value={currentPackage.pricing.setup}
                onChange={handlePricingChange}
              />

              <Input
                label="Messaging Cost"
                name="messaging"
                value={currentPackage.pricing.messaging}
                onChange={handlePricingChange}
              />

              <Textarea
                label="Pricing Note"
                name="note"
                value={currentPackage.pricing.note}
                onChange={handlePricingChange}
              />

              <Divider />

              <Textarea
                label="Badge Text"
                name="badge"
                value={currentPackage.badge}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleTextareaChange(e)
                }
              />

              <div className="flex gap-4">
                <Checkbox
                  isSelected={currentPackage.popular}
                  label="Popular Package"
                  name="popular"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  isSelected={currentPackage.instant}
                  label="Instant Activation"
                  name="instant"
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              color="primary"
              startContent={<Save size={18} />}
              onClick={handleSubmit}
            >
              {editingIndex !== null ? "Update" : "Save"} Package
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PackageManager;
