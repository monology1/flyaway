import React from "react";

interface CardProps {
  title: string;
  price: number;
  benefits: string[];
  isAdded: boolean;
  onToggle: () => void;
}

const AddOnCard: React.FC<CardProps> = ({
  title,
  price,
  benefits,
  isAdded,
  onToggle,
}) => {
  return (
    <div
      className={`rounded-lg p-6 shadow-md flex flex-col space-y-4 ${
        isAdded
          ? "bg-white border-pink-500"
          : "bg-gray-100 border-gray-300"
      } border`}
    >
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3
          className={`text-lg font-semibold ${
            isAdded ? "text-pink-600" : "text-gray-600"
          }`}
        >
          {title}
        </h3>
        <button
          onClick={onToggle}
          className={`${
            isAdded
              ? "text-red-500 hover:text-red-700"
              : "text-green-500 hover:text-green-700"
          } text-sm font-medium py-1 px-3 rounded-md shadow-md transition-all`}
        >
          {isAdded ? "✕ Remove" : "+ Add"}
        </button>
      </div>

      {/* Benefits */}
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start space-x-2">
            <span
              className={`${
                isAdded ? "text-green-500" : "text-red-500"
              }`}
            >
              {isAdded ? "✔" : "✕"}
            </span>
            <p
              className={`text-sm ${
                isAdded ? "text-gray-700" : "text-gray-500"
              }`}
            >
              {benefit}
            </p>
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="flex items-center justify-between">
        <p
          className={`text-lg font-semibold ${
            isAdded ? "text-gray-800" : "text-gray-500"
          }`}
        >
          THB {price.toFixed(2)} / person
        </p>
      </div>
    </div>
  );
};

export default AddOnCard;