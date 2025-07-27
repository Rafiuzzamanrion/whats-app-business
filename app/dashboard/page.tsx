"use client";
import React from "react";

interface UserItem {
  userId: string;
  id: string;
  name: string;
  email: string;
  activeWhatsappNumber: string;
  paymentMethod: string;
  file: string;
  productId: string;
  status: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

const Page = () => {
  const [data, setData] = React.useState<any>(null);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/dashboard");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      setData(data);
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Joined
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.map((userItem: UserItem) => (
            <tr key={userItem.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {userItem.name || "No name"}
                  </div>
                  <div className="text-sm text-gray-500">{userItem.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap" />
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(userItem.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
