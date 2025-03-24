"use client";

import {
  FaSearch,
  FaMoneyBillWave,
  FaShieldAlt,
  FaClock,
  FaHeadset,
  FaPlaneDeparture
} from 'react-icons/fa';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="bg-primary-100 p-4 rounded-full mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export function FeatureSection() {
  const features = [
    {
      icon: <FaSearch size={24} />,
      title: 'Easy Search',
      description: 'Compare flights from hundreds of airlines and booking sites in just one search.'
    },
    {
      icon: <FaMoneyBillWave size={24} />,
      title: 'Best Prices',
      description: 'Find the best deals and discounts on your flights with our price comparison.'
    },
    {
      icon: <FaShieldAlt size={24} />,
      title: 'Secure Booking',
      description: 'Book with confidence. Your payment and personal information are protected.'
    },
    {
      icon: <FaClock size={24} />,
      title: 'Fast Booking',
      description: 'Book your flights in minutes with our simple and intuitive booking process.'
    },
    {
      icon: <FaHeadset size={24} />,
      title: '24/7 Support',
      description: 'Our customer support team is available 24/7 to assist you with any issues.'
    },
    {
      icon: <FaPlaneDeparture size={24} />,
      title: 'Flight Updates',
      description: 'Receive real-time updates about your flight status and any changes.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Book With FlyAway?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer the best flight booking experience with unbeatable prices and premium service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
