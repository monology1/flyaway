"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaTags } from 'react-icons/fa';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface PromoCardProps {
  destination: string;
  image: string;
  price: string;
  description: string;
}

function PromoCard({ destination, image, price, description }: PromoCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={image}
          alt={destination}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{destination}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <span className="text-primary font-bold">{price}</span>
        </div>
      </CardHeader>
      <CardFooter className="border-t bg-gray-50 p-2">
        <Link
          href="#"
          className="text-primary hover:underline text-sm font-medium flex items-center"
        >
          View Deals <FaArrowRight className="ml-2 text-xs" />
        </Link>
      </CardFooter>
    </Card>
  );
}

export function PromoSection() {
  const promos = [
    {
      destination: 'Bangkok to Tokyo',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
      price: '$299',
      description: 'Explore the vibrant streets and culture of Tokyo with our special rates'
    },
    {
      destination: 'Bangkok to Singapore',
      image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170',
      price: '$149',
      description: 'Enjoy the modern cityscape and amazing food of Singapore'
    },
    {
      destination: 'Bangkok to Bali',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      price: '$199',
      description: 'Relax on beautiful beaches and experience Balinese culture'
    },
    {
      destination: 'Bangkok to Seoul',
      image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451',
      price: '$259',
      description: 'Discover the perfect blend of tradition and modernity in Seoul'
    }
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">Special Flight Offers</h2>
            <p className="text-gray-600 text-sm">Explore our best deals and special offers</p>
          </div>
          <Link
            href="#"
            className="text-primary hover:underline flex items-center font-medium text-sm"
          >
            <FaTags className="mr-1" />
            View All Promotions
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promos.map((promo, index) => (
            <PromoCard key={index} {...promo} />
          ))}
        </div>
      </div>
    </section>
  );
}
