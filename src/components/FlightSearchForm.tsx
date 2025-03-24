"use client";

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { FaPlane, FaExchangeAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  tripType: z.enum(['roundtrip', 'oneway']),
  departure: z.string().min(1, { message: "Departure is required" }),
  arrival: z.string().min(1, { message: "Arrival is required" }),
  departureDate: z.string().min(1, { message: "Departure date is required" }),
  returnDate: z.string().optional(),
  passengers: z.string().min(1, { message: "Passengers is required" }),
  cabinClass: z.string().min(1, { message: "Cabin class is required" }),
});

export function FlightSearchForm() {
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripType: 'roundtrip',
      departure: '',
      arrival: '',
      departureDate: format(new Date(), 'yyyy-MM-dd'),
      returnDate: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
      passengers: '1',
      cabinClass: 'economy',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const handleTripTypeChange = (value: string) => {
    setTripType(value as 'roundtrip' | 'oneway');
    form.setValue('tripType', value as 'roundtrip' | 'oneway');
  };

  const swapLocations = () => {
    const departure = form.getValues('departure');
    const arrival = form.getValues('arrival');
    form.setValue('departure', arrival);
    form.setValue('arrival', departure);
  };

  return (
    <div className="flight-search-container pt-6 pb-10">
      <div className="container mx-auto px-4">
        <Card className="booking-card bg-white p-6">
          <Tabs defaultValue="flights" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="flights" className="text-lg">
                <FaPlane className="mr-2" />
                Flights
              </TabsTrigger>
            </TabsList>
            <TabsContent value="flights">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant={tripType === 'roundtrip' ? 'default' : 'outline'}
                      className={`flex-1 ${tripType === 'roundtrip' ? 'bg-primary' : ''}`}
                      onClick={() => handleTripTypeChange('roundtrip')}
                    >
                      Round Trip
                    </Button>
                    <Button
                      type="button"
                      variant={tripType === 'oneway' ? 'default' : 'outline'}
                      className={`flex-1 ${tripType === 'oneway' ? 'bg-primary' : ''}`}
                      onClick={() => handleTripTypeChange('oneway')}
                    >
                      One Way
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="relative">
                      <FormField
                        control={form.control}
                        name="departure"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter city or airport" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="relative">
                      <FormField
                        control={form.control}
                        name="departureDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Departure Date</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input
                                  type="date"
                                  {...field}
                                  className="flex-1"
                                />
                                <div className="absolute right-3 pointer-events-none">
                                  <FaCalendarAlt className="text-gray-400" />
                                </div>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="relative">
                      <FormField
                        control={form.control}
                        name="arrival"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>To</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter city or airport" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {/* Swap button positioned between From and To fields */}
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="absolute right-[-18px] top-[38px] z-10 bg-white rounded-full shadow-md border border-gray-200"
                        onClick={swapLocations}
                      >
                        <FaExchangeAlt className="rotate-90" />
                      </Button>
                    </div>

                    {tripType === 'roundtrip' && (
                      <div className="relative">
                        <FormField
                          control={form.control}
                          name="returnDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Return Date</FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <Input
                                    type="date"
                                    {...field}
                                    className="flex-1"
                                  />
                                  <div className="absolute right-3 pointer-events-none">
                                    <FaCalendarAlt className="text-gray-400" />
                                  </div>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    <div className="relative">
                      <FormField
                        control={form.control}
                        name="passengers"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Passengers</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                    <SelectItem key={num} value={String(num)}>
                                      {num} {num === 1 ? 'passenger' : 'passengers'}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="relative">
                      <FormField
                        control={form.control}
                        name="cabinClass"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cabin Class</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select class" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="economy">Economy</SelectItem>
                                  <SelectItem value="premium_economy">Premium Economy</SelectItem>
                                  <SelectItem value="business">Business</SelectItem>
                                  <SelectItem value="first">First Class</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button type="submit" size="lg" className="w-full md:w-auto px-12 bg-primary">
                      Search Flights
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
