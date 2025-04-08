"use client";

import {useState} from 'react';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {Checkbox} from '@/components/ui/checkbox';
import {FaGoogle, FaFacebook} from 'react-icons/fa';

const signupSchema = z.object({
    fullName: z.string().min(2, {message: 'Name must be at least 2 characters'}),
    email: z.string().email({message: 'Please enter a valid email address'}),
    password: z.string().min(8, {message: 'Password must be at least 8 characters'})
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        }),
    confirmPassword: z.string(),
    phoneNumber: z.string().max(10, {message: 'Phone number must be at least 10 digits'}),
    acceptTerms: z.boolean().refine(val => val === true, {
        message: 'You must accept the terms and conditions to sign up',
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
    onSuccess: () => void;
}

export function SignupForm({onSuccess}: SignupFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            acceptTerms: false,
        },
    });

    async function onSubmit(data: SignupFormValues) {
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Signup data:', data);
            setIsLoading(false);
            onSuccess();
        }, 1000);
    }

    return (
        <div className="space-y-4 py-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="your.email@example.com" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="acceptTerms"
                        render={({field}) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        I agree to the{' '}
                                        <a href="#" className="text-primary hover:underline">
                                            Terms of Service
                                        </a>{' '}
                                        and{' '}
                                        <a href="#" className="text-primary hover:underline">
                                            Privacy Policy
                                        </a>
                                    </FormLabel>
                                    <FormMessage/>
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full bg-primary" disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Sign Up'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
