import React from "react";

const Pricing = () => {
  return (
    <div
      className={
        "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 p-6 mt-32"
      }
    >
      <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
        <div className="p-8">
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">
            Smart Reach
          </h3>
          <p className="text-gray-500 text-center mb-6">
            Perfect for growing businesses
          </p>
          <div className="flex justify-center mb-6">
            <span className="text-4xl font-extrabold text-success">$50</span>
            <span className="text-gray-400 self-end mb-1 ml-1">/month</span>
          </div>
          <ul className="mb-8 space-y-4">
            <li className="flex items-center gap-2 text-gray-700">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Daily messaging to 5K contacts
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Full campaign management
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Scheduling + branded panel
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Live reporting & support
            </li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-400 text-white font-bold shadow-lg hover:from-green-700 hover:to-green-500 transition-all">
            Get Started
          </button>
        </div>
      </div>
      <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
        <div className="p-8">
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">
            Smart Reach
          </h3>
          <p className="text-gray-500 text-center mb-6">
            Perfect for growing businesses
          </p>
          <div className="flex justify-center mb-6">
            <span className="text-4xl font-extrabold text-green-600">$50</span>
            <span className="text-gray-400 self-end mb-1 ml-1">/month</span>
          </div>
          <ul className="mb-8 space-y-4">
            <li className="flex items-center gap-2 text-gray-700">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Daily messaging to 5K contacts
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Full campaign management
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Scheduling + branded panel
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Live reporting & support
            </li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
