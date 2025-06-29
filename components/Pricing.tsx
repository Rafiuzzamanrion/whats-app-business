import React from "react";
import {
  Check,
  Zap,
  Users,
  BarChart3,
  MessageSquare,
  Clock,
  Shield,
  Rocket,
} from "lucide-react";

const Pricing = () => {
  const packages = [
    {
      name: "Basic Blast",
      subtitle: "Up to 1,000 Customers",
      icon: <MessageSquare className="w-8 h-8" />,
      gradient: "from-green-400 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      features: [
        "Send messages to 1K customers",
        "We provide API & messaging panel",
        "We upload numbers & manage the broadcast",
        "Delivery report + support",
      ],
      pricing: {
        setup: "$50",
        messaging: "$10 per 1K messages",
        note: "Meta Conversation Fee: Separate (based on Meta's official rate)",
      },
      badge: "Perfect for small businesses or testing campaigns",
      popular: false,
    },
    {
      name: "Smart Reach",
      subtitle: "Up to 5,000 Customers",
      icon: <BarChart3 className="w-8 h-8" />,
      gradient: "from-blue-400 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      features: [
        "Daily messaging to 5K contacts",
        "Full campaign management",
        "Scheduling + branded panel",
        "Live reporting & support",
        "24/7 Support",
      ],
      pricing: {
        setup: "$50",
        messaging: "$50 for 5K messages",
        note: "Meta Conversation Fee: Separate (Meta billing directly)",
      },
      badge: "Ideal for eCommerce, coaching, local service providers",
      popular: true,
    },
    {
      name: "Power Campaign",
      subtitle: "Up to 10,000 Customers",
      icon: <Rocket className="w-8 h-8" />,
      gradient: "from-red-400 to-rose-600",
      bgGradient: "from-red-50 to-rose-50",
      borderColor: "border-red-200",
      features: [
        "High-speed messaging to 10K customers",
        "Auto-reply & lead capture integration",
        "Advanced campaign tracking",
        "24/7 Support",
      ],
      pricing: {
        setup: "$50",
        messaging: "$100 for 10K messages",
        note: "Meta Conversation Fee: Separate (charged by Meta)",
      },
      badge: "Best for agencies, large brands, or high-volume marketing",
      popular: false,
    },
    {
      name: "Instant Package",
      subtitle: "Ready Within 1–2 Hours",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-purple-400 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
      borderColor: "border-purple-200",
      features: [
        "WhatsApp API + Messaging Setup instantly",
        "No paperwork needed",
        "Use your brand name or generic name",
        "You provide message & numbers — we activate everything",
      ],
      pricing: {
        setup: "$75",
        messaging: "$10 per 1K customers",
        note: "Meta Fee: Separate (paid by client)",
      },
      badge: "Same-day activation | Full test before payment",
      popular: false,
      instant: true,
    },
  ];

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
          {packages.map((pkg, index) => (
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
                      {pkg.icon}
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
                          {pkg.pricing.setup}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">
                          {pkg.pricing.messaging}
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
        <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Scale Your WhatsApp Marketing?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            All packages include professional setup, dedicated support, and full
            campaign management. Contact us for custom enterprise solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Contact Sales
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-gray-400 transition-all duration-300">
              View Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
