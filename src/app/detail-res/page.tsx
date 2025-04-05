"use client";

import React, { useState, useCallback, useEffect } from "react";
import Header from "@/components/Header";
import { PromoSection } from "@/components/PromoSection";
import { Footer } from "@/components/Footer";
import FlightSummary from "@/components/ui/FlightSummary";
import PassengerForm from "@/components/ui/PassengerForm";
import ContactDetails from "@/components/ui/ContactDetail";
import AddOnCard from "@/components/ui/AddOnCard";

// --- Types for Mock Data ---
interface FlightData {
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  duration: string;
  stops: string;
  layover: null | string;
  image: string;
}

interface MockFlightData {
  outwardFlight: FlightData;
  inwardFlight: FlightData;
  isRoundTrip: boolean;
}

interface MockUserData {
  userId: string;
  name: string;
  email: string;
  passengerCount: number;
}

interface AddOnOption {
  id: string;
  title: string;
  price: number;
  benefits: string[];
}

interface MockAddOnOptions {
  flightInsurance: AddOnOption;
  mealOption: AddOnOption;
  seatSelection: AddOnOption;
  baggageAllowance: AddOnOption;
}

// --- Mock Data for Backend Integration (within page.tsx) - Domestic Focus ---

const MOCK_FLIGHT_DATA: MockFlightData = {
  outwardFlight: {
    airline: "Nok Air",
    flightNumber: "DD8315",
    departureAirport: "DMK",
    arrivalAirport: "CNX",
    departureTime: "2024-11-15T08:30:00+07:00",
    arrivalTime: "2024-11-15T09:45:00+07:00",
    price: 1200,
    duration: "1h 15m",
    stops: "Non-stop",
    layover: null,
    image: "https://logos-world.net/wp-content/uploads/2023/06/Nok-Air-Logo.png",
  },
  inwardFlight: {
    airline: "Thai Lion Air",
    flightNumber: "SL512",
    departureAirport: "CNX",
    arrivalAirport: "DMK",
    departureTime: "2024-11-18T14:00:00+07:00",
    arrivalTime: "2024-11-18T15:15:00+07:00",
    price: 1350,
    duration: "1h 15m",
    stops: "Non-stop",
    layover: null,
    image: "https://logos-world.net/wp-content/uploads/2023/01/Lion-Air-Logo-500x281.png",
  },
  isRoundTrip: true,
};

const MOCK_USER_DATA: MockUserData = {
  userId: "user456",
  name: "Somchai Thai",
  email: "somchai.thai@example.com",
  passengerCount: 2,
};

const MOCK_ADD_ON_OPTIONS: MockAddOnOptions = {
  flightInsurance: {
    id: "insurance2",
    title: "Domestic Travel Insurance",
    price: 150,
    benefits: ["Medical assistance", "Flight delays", "Baggage protection"],
  },
  mealOption: {
    id: "meal2",
    title: "Thai Meal",
    price: 280,
    benefits: ["Choice of local Thai dishes", "Beverage included"],
  },
  seatSelection: {
    id: "seat1",
    title: "Preferred Seat",
    price: 100,
    benefits: ["Choose your seat", "Extra Legroom"],
  },
  baggageAllowance: {
    id: "baggage1",
    title: "Additional Baggage",
    price: 300,
    benefits: ["Extra 15kg baggage allowance"],
  },
};

interface PassengerDetails {
  values?: any[];
  errors?: any[];
}

interface ContactDetailsType {
  values?: any;
  errors?: any;
}

interface AddOns {
  flightInsurance: boolean;
  mealOption: boolean;
  seatSelection: boolean;
  baggageAllowance: boolean;
}

interface BaggageSelection {
  outward: number;
  inward: number;
}

const DetailResPage = ({ user = MOCK_USER_DATA, isRoundTrip = MOCK_FLIGHT_DATA.isRoundTrip }) => {
  // --- State Management ---
  const [contactDetails, setContactDetails] = useState<ContactDetailsType>({});
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails>([]);
  const [addOns, setAddOns] = useState<AddOns>({
    flightInsurance: false,
    mealOption: false,
    seatSelection: false,
    baggageAllowance: false,
  });
  const [baggageSelections, setBaggageSelections] = useState<BaggageSelection[]>(
    Array.from({ length: user.passengerCount }, () => ({ outward: 0, inward: 0 }))
  );
  const [validateForms, setValidateForms] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<any>({}); // State to hold form data

  // --- Event Handlers ---
  const handleToggleInsurance = useCallback(() => {
    setAddOns((prev) => ({ ...prev, flightInsurance: !prev.flightInsurance }));
  }, []);

  const handleToggleMeal = useCallback(() => {
    setAddOns((prev) => ({ ...prev, mealOption: !prev.mealOption }));
  }, []);

  const handleToggleSeat = useCallback(() => {
    setAddOns((prev) => ({ ...prev, seatSelection: !prev.seatSelection }));
  }, []);

  const handleToggleBaggage = useCallback(() => {
    setAddOns((prev) => ({ ...prev, baggageAllowance: !prev.baggageAllowance }));
  }, []);

  const handlePassengerDetailsChange = useCallback((values: any, errors: any) => {
    setPassengerDetails({ values, errors });
  }, []);

  const handleContactDetailsChange = useCallback((values: any, errors: any) => {
    setContactDetails({ values, errors });
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setValidateForms(true);

    const contactErrors = Object.keys(contactDetails.errors || {});
    const passengerErrors = passengerDetails.errors?.flatMap((error) => Object.keys(error)) || [];

    if (contactErrors.length > 0 || passengerErrors.length > 0) {
      const allErrors = [
        ...contactErrors.map((err) => `Contact: ${err}`),
        ...passengerErrors.map((err) => `Passenger: ${err}`),
      ];

      setFormErrors(allErrors);
      console.log("Validation failed. Fix errors before submitting.");
      return;
    }

    setFormErrors([]); // Clear any previous errors
    const payload = {
      contactDetails: contactDetails.values,
      passengerDetails: passengerDetails.values,
      addOns,
      baggageSelections,
    };

    console.log("Submitting data:", payload);
  }, [contactDetails, passengerDetails, addOns, baggageSelections, validateForms]);

  // --- Effect to Collect Form Data ---
  useEffect(() => {
    setFormData({
      contactDetails: contactDetails.values,
      passengerDetails: passengerDetails.values,
      addOns,
      baggageSelections,
    });
  }, [contactDetails, passengerDetails, addOns, baggageSelections]);

  // --- Render ---
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-4 text-pink-600">Flight Booking</h1>
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-3">
          <div className="bg-pink-50 p-4 rounded-md shadow-md self-start sticky top-4">
            <FlightSummary
              outwardFlight={MOCK_FLIGHT_DATA.outwardFlight}
              inwardFlight={isRoundTrip ? MOCK_FLIGHT_DATA.inwardFlight : undefined}
            />
          </div>
          <div className="bg-pink-50 p-4 rounded-md shadow-md">
            <div className="space-y-6">
              {formErrors.length > 0 && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Please correct the following errors:</strong>
                  <ul className="list-disc list-inside">
                    {formErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="bg-white p-4 mb-8 rounded-md shadow-md">
                <ContactDetails
                  onChange={handleContactDetailsChange} // Use the new handler
                  validateOnSubmit={validateForms}
                />
              </div>
              <div className="bg-white p-4 rounded-md shadow-md">
                <PassengerForm
                  passengerCount={user.passengerCount}
                  onChange={handlePassengerDetailsChange}
                  validateOnSubmit={validateForms}
                  isRoundTrip={isRoundTrip}
                />
              </div>
              <div className="bg-white p-4 rounded-md shadow-md space-y-6">
                <h2 className="text-xl font-semibold text-pink-600 mb-1">Flight Add-ons</h2>
                <AddOnCard
                  title={MOCK_ADD_ON_OPTIONS.flightInsurance.title}
                  price={MOCK_ADD_ON_OPTIONS.flightInsurance.price}
                  benefits={MOCK_ADD_ON_OPTIONS.flightInsurance.benefits}
                  isAdded={addOns.flightInsurance}
                  onToggle={handleToggleInsurance}
                />
                <AddOnCard
                  title={MOCK_ADD_ON_OPTIONS.mealOption.title}
                  price={MOCK_ADD_ON_OPTIONS.mealOption.price}
                  benefits={MOCK_ADD_ON_OPTIONS.mealOption.benefits}
                  isAdded={addOns.mealOption}
                  onToggle={handleToggleMeal}
                />
                <AddOnCard
                  title={MOCK_ADD_ON_OPTIONS.seatSelection.title}
                  price={MOCK_ADD_ON_OPTIONS.seatSelection.price}
                  benefits={MOCK_ADD_ON_OPTIONS.seatSelection.benefits}
                  isAdded={addOns.seatSelection}
                  onToggle={handleToggleSeat}
                />
                <AddOnCard
                  title={MOCK_ADD_ON_OPTIONS.baggageAllowance.title}
                  price={MOCK_ADD_ON_OPTIONS.baggageAllowance.price}
                  benefits={MOCK_ADD_ON_OPTIONS.baggageAllowance.benefits}
                  isAdded={addOns.baggageAllowance}
                  onToggle={handleToggleBaggage}
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-pink-600 text-white py-2 px-4 rounded-md shadow hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                Submit Reservation
              </button>
              {/* Display Form Data for Testing */}
              <div className="mt-8 bg-gray-100 p-4 rounded-md">
                <h2 className="text-xl font-semibold mb-4">Form Data (Testing)</h2>
                <pre>{JSON.stringify(formData, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PromoSection />
      <Footer />
    </main>
  );
};

export default DetailResPage;