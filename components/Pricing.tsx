"use client";
import React, { useEffect } from "react";
import {
  Check,
  Zap,
  Users,
  Clock,
  Shield,
  ShieldCheck,
  CheckCircle,
  MessageSquare,
  BarChart3,
  Rocket,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { FaLongArrowAltRight, FaShoppingCart } from "react-icons/fa";
import { Button } from "@heroui/button";
import Link from "next/link";

interface Pricing {
  setup: string;
  messaging: string;
  note: string;
}

type GradientOption =
  | "from-green-400 to-emerald-600"
  | "from-blue-400 to-indigo-600"
  | "from-red-400 to-rose-600"
  | "from-purple-400 to-violet-600";

type IconOption = "MessageSquare" | "BarChart3" | "Rocket" | "Zap";

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

const Pricing = () => {
  const [packages, setPackages] = React.useState([]);
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

  // Create an icon map
  const iconComponents = {
    MessageSquare,
    BarChart3,
    Rocket,
    Zap,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-24 my-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-success uppercase mb-7">
            WhatsApp Messaging Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect package for your business needs. Professional
            WhatsApp API integration with full campaign management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {packages?.map((pkg: Package, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 ${pkg.borderColor} overflow-hidden group flex flex-col`}
              style={{ minHeight: "780px" }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-bl-xl font-semibold text-sm z-10">
                  Most Popular
                </div>
              )}

              {/* Instant Badge */}
              {pkg.instant && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-bl-xl font-semibold text-sm z-10 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Instant
                </div>
              )}

              {/* Header with gradient background */}
              <div
                className={`bg-gradient-to-r ${pkg.gradient} p-6 text-white relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                      {pkg.icon && iconComponents[pkg.icon] ? (
                        React.createElement(iconComponents[pkg.icon])
                      ) : (
                        <span>No Icon</span>
                      )}
                    </div>
                    <Users className="w-6 h-6 opacity-80" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-white/90 font-medium">{pkg.subtitle}</p>
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
                      {pkg.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
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
                          ${pkg.pricing.setup}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">
                          ${pkg.pricing.messaging}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-xs text-yellow-800">
                        ⚠️ {pkg.pricing.note}
                      </p>
                    </div>
                  </div>

                  {/* Badge */}
                  <div>
                    <div
                      className={`bg-gradient-to-r ${pkg.bgGradient} p-3 rounded-lg border ${pkg.borderColor}`}
                    >
                      <p className="text-sm font-medium text-gray-800">
                        🎯 {pkg.badge}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button - Always at bottom */}
                <div className="mt-6">
                  <button
                    className={`w-full bg-gradient-to-r ${pkg.gradient} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 group-hover:shadow-xl`}
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

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Need WhatsApp Business API Instantly?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Our verified WhatsApp Business API solutions include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mr-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Official Approval
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Guaranteed WhatsApp approval
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Secure Messaging
                  </h4>
                  <p className="text-gray-600 text-sm">End-to-end encrypted</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg mr-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Fast Setup</h4>
                  <p className="text-gray-600 text-sm">Ready in 24-48 hours</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={"/businessApi"}>
                <Button color={"primary"} variant={"shadow"}>
                  <FaShoppingCart className="h-5 w-5" />
                  Buy Now <FaLongArrowAltRight size={20} />
                </Button>
              </Link>
              <Button
                color={"success"}
                variant={"shadow"}
                onClick={() =>
                  window.open("https://wa.me/1234567890", "_blank")
                }
              >
                <BsWhatsapp className="h-5 w-5" />
                Message Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
