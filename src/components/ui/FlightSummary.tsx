"use client";

import React, { useState } from "react";
import { formatToUTC7 } from "../utils/dateUtils";

interface Flight {
  layover: React.ReactNode | null;
  airline?: string;
  flightNumber?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  departureTime?: string;
  arrivalTime?: string;
  price?: number;
  duration?: string; // e.g., "2h 30m"ß
  stops?: string; // e.g., "Non-stop", "1 Stop"
  image?: string; // URL to airline logo
  baggage?: string;
  cabinBaggage?: string;
  aircraft?: string;
  seatLayout?: string;
  seatPitch?: string;
}

interface FlightSummaryProps {
  outwardFlight: Flight;
  inwardFlight?: Flight;
}

const FlightSummary: React.FC<FlightSummaryProps> = ({
  outwardFlight,
  inwardFlight,
}) => {
  const [expandedOutward, setExpandedOutward] = useState(false);
  const [expandedInward, setExpandedInward] = useState(false);
  const totalPrice =
    (outwardFlight.price || 0) + (inwardFlight ? inwardFlight.price || 0 : 0);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 border border-pink-200">
      <h2 className="text-xl font-bold mb-6 border-b pb-3 text-pink-600">
        Flight Summary
      </h2>

      {/* Departure Flight Details */}
      <div className="mb-2">
        <h3 className="text-lg font-semibold mb-4 text-pink-500">
          Departure Flight
        </h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {outwardFlight.image ? (
              <img
                src={outwardFlight.image}
                alt={outwardFlight.airline || "Unknown"}
                className="h-10 w-20 mr-3 retangle"
              />
            ) : (
              <p>Image Unknown</p>
            )}
            <div>
              <p className="font-semibold text-pink-700">
                {outwardFlight.airline || "Unknown"}
              </p>
              <p className="text-sm text-gray-500">
                {outwardFlight.flightNumber || "Unknown"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-pink-600">
              {outwardFlight.duration || "Unknown"}
            </p>
            <p className="text-sm text-gray-500">
              {outwardFlight.stops || "Unknown"}
            </p>
            {outwardFlight.layover && (
              <p className="text-xs text-gray-400">{outwardFlight.layover}</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-pink-700">
              {outwardFlight.departureAirport || "Unknown"}
            </p>
            <p className="text-xs text-gray-500">
              {outwardFlight.departureTime
                ? formatToUTC7(outwardFlight.departureTime)
                : "Unknown"}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-pink-700"> {"--->"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-pink-700">
              {outwardFlight.arrivalAirport || "Unknown"}
            </p>
            <p className="text-xs text-gray-500">
              {outwardFlight.arrivalTime
                ? formatToUTC7(outwardFlight.arrivalTime)
                : "Unknown"}
            </p>
          </div>
        </div>
        {expandedOutward && (
          <div className="mt-4">
            <p className="text-sm text-gray-700">
              Baggage: {outwardFlight.baggage || "Unknown"}
            </p>
            <p className="text-sm text-gray-700">
              Cabin baggage: {outwardFlight.cabinBaggage || "Unknown"}
            </p>
            <p className="text-sm text-gray-700">
              Aircraft: {outwardFlight.aircraft || "Unknown"}
            </p>
            <p className="text-sm text-gray-700">
              Seat layout: {outwardFlight.seatLayout || "Unknown"}
            </p>
            <p className="text-sm text-gray-700">
              Seat pitch: {outwardFlight.seatPitch || "Unknown"}
            </p>
          </div>
        )}
        <button
          className="text-sm text-pink-600 hover:text-pink-800 mt-2"
          onClick={() => setExpandedOutward(!expandedOutward)}
        >
          {expandedOutward ? "Hide Details" : "Show Details"}
        </button>
        <div className="mt-4 border-t pt-4">
          <p className="text-right font-semibold text-gray-700">
            Based Price: THB {outwardFlight.price || "Unknown"}
          </p>
        </div>
      </div>

      {/* Return Flight Details (if round trip) */}
      {inwardFlight && (
        <div className="mb-2">
          <h3 className="text-lg font-semibold mb-4 text-pink-500">
            Return Flight
          </h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {inwardFlight.image ? (
                <img
                  src={inwardFlight.image}
                  alt={inwardFlight.airline || "Unknown"}
                  className="h-10 w-20 mr-3 retangle"
                />
              ) : (
                <p>Image Unknown</p>
              )}
              <div>
                <p className="font-semibold text-pink-700">
                  {inwardFlight.airline || "Unknown"}
                </p>
                <p className="text-sm text-gray-500">
                  {inwardFlight.flightNumber || "Unknown"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-pink-600">
                {inwardFlight.duration || "Unknown"}
              </p>
              <p className="text-sm text-gray-500">
                {inwardFlight.stops || "Unknown"}
              </p>
              {inwardFlight.layover && (
                <p className="text-xs text-gray-400">{inwardFlight.layover}</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-pink-700">
                {inwardFlight.departureAirport || "Unknown"}
              </p>
              <p className="text-xs text-gray-500">
                {inwardFlight.departureTime
                  ? formatToUTC7(inwardFlight.departureTime)
                  : "Unknown"}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-pink-700"> {"<---"}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-pink-700">
                {inwardFlight.arrivalAirport || "Unknown"}
              </p>
              <p className="text-xs text-gray-500">
                {inwardFlight.arrivalTime
                  ? formatToUTC7(inwardFlight.arrivalTime)
                  : "Unknown"}
              </p>
            </div>
          </div>
          {expandedInward && (
            <div className="mt-4">
              <p className="text-sm text-gray-700">
                Baggage: {inwardFlight.baggage || "Unknown"}
              </p>
              <p className="text-sm text-gray-700">
                Cabin baggage: {inwardFlight.cabinBaggage || "Unknown"}
              </p>
              <p className="text-sm text-gray-700">
                Aircraft: {inwardFlight.aircraft || "Unknown"}
              </p>
              <p className="text-sm text-gray-700">
                Seat layout: {inwardFlight.seatLayout || "Unknown"}
              </p>
              <p className="text-sm text-gray-700">
                Seat pitch: {inwardFlight.seatPitch || "Unknown"}
              </p>
            </div>
          )}
          <button
            className="text-sm text-pink-600 hover:text-pink-800 mt-2"
            onClick={() => setExpandedInward(!expandedInward)}
          >
            {expandedInward ? "Hide Details" : "Show Details"}
          </button>
          <div className="mt-4 border-t pt-4">
            <p className="text-right font-semibold text-gray-700">
              Based Price: THB {inwardFlight.price || "Unknown"}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default FlightSummary;
