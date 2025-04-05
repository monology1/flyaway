import React, { useState } from "react";

interface BaggageOption {
  label: string;
  weight: number;
  price: number;
}

interface BaggageSelectionProps {
  passengerName: string;
  outwardOptions: BaggageOption[];
  inwardOptions: BaggageOption[];
  preSelectedOutward?: number; // Pre-selected outward baggage weight
  preSelectedInward?: number; // Pre-selected inward baggage weight
  onSelectionChange: (outward: number, inward: number) => void;
}

const BaggageSelection: React.FC<BaggageSelectionProps> = ({
  passengerName,
  outwardOptions,
  inwardOptions,
  preSelectedOutward,
  preSelectedInward,
  onSelectionChange,
}) => {
  const [selectedOutward, setSelectedOutward] = useState<number>(
    preSelectedOutward || 0
  );
  const [selectedInward, setSelectedInward] = useState<number>(
    preSelectedInward || 0
  );

  const handleOutwardChange = (weight: number) => {
    setSelectedOutward(weight);
    onSelectionChange(weight, selectedInward);
  };

  const handleInwardChange = (weight: number) => {
    setSelectedInward(weight);
    onSelectionChange(selectedOutward, weight);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-blue-600">
        {passengerName}'s Baggage Selection
      </h2>

      {/* Outward Flight Baggage */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-2">
          Outward Flight
        </h3>
        <ul className="space-y-2">
          {outwardOptions.map((option) => (
            <li
              key={option.weight}
              className={`flex items-center justify-between p-2 border rounded-md ${
                selectedOutward === option.weight
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="outward-baggage"
                  value={option.weight}
                  checked={selectedOutward === option.weight}
                  onChange={() => handleOutwardChange(option.weight)}
                  className="form-radio text-blue-500"
                />
                <span>{option.label}</span>
              </label>
              <span className="text-orange-500 font-semibold">
                THB {option.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Inward Flight Baggage */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-2">
          Inward Flight
        </h3>
        <ul className="space-y-2">
          {inwardOptions.map((option) => (
            <li
              key={option.weight}
              className={`flex items-center justify-between p-2 border rounded-md ${
                selectedInward === option.weight
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="inward-baggage"
                  value={option.weight}
                  checked={selectedInward === option.weight}
                  onChange={() => handleInwardChange(option.weight)}
                  className="form-radio text-blue-500"
                />
                <span>{option.label}</span>
              </label>
              <span className="text-orange-500 font-semibold">
                THB {option.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BaggageSelection;