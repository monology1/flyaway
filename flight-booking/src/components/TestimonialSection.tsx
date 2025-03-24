"use client";

import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialProps {
  text: string;
  author: string;
  location: string;
  rating: number;
}

function Testimonial({ text, author, location, rating }: TestimonialProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex mb-4 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'} />
          ))}
        </div>
        <FaQuoteLeft className="text-primary/20 text-4xl mb-4" />
        <p className="text-gray-700 mb-6">{text}</p>
        <div>
          <p className="font-bold">{author}</p>
          <p className="text-gray-500 text-sm">{location}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialSection() {
  const testimonials = [
    {
      text: "I've been using FlyAway for all my travel needs. The booking process is so simple, and I always find the best deals. Highly recommended!",
      author: "Sarah Johnson",
      location: "Bangkok, Thailand",
      rating: 5
    },
    {
      text: "The customer service is exceptional. I had to change my flight last minute, and the team was incredibly helpful and made the process hassle-free.",
      author: "Michael Chen",
      location: "Singapore",
      rating: 5
    },
    {
      text: "FlyAway has the best prices I've found anywhere. I saved over $200 on my last international flight compared to other booking sites.",
      author: "Jessica Williams",
      location: "Hong Kong",
      rating: 4
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read why thousands of travelers trust FlyAway for their flight booking needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
