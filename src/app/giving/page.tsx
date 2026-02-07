'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { HeartHandshake } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  amount: z.string().min(1, 'Amount is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  paymentMethod: z.enum(['credit-card', 'bank-transfer'] as const),
  isRecurring: z.boolean().optional().default(false),
});

type FormData = {
  amount: string;
  firstName: string;
  lastName: string;
  email: string;
  paymentMethod: 'credit-card' | 'bank-transfer';
  isRecurring?: boolean;
};

export default function GivingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string | number>('');
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: 'credit-card',
      isRecurring: false,
      amount: '',
      firstName: '',
      lastName: '',
      email: ''
    },
  });
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = form;
  const paymentMethod = watch('paymentMethod');

  const handleAmountSelect = (amount: string | number) => {
    setSelectedAmount(amount);
    setValue('amount', amount === 'Other' ? '' : amount.toString());
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);
      console.log('Form submitted:', data);
      // TODO: Integrate with payment processor
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: 'Donation received! Thank you for your generous gift.',
      });
      
      // Reset form
      setSelectedAmount('');
      setValue('amount', '');
      setValue('firstName', '');
      setValue('lastName', '');
      setValue('email', '');
      setValue('isRecurring', false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error: There was an error processing your donation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4">
      <PageHeader 
        title="Online Giving"
        description="Your generous giving helps us fulfill our mission and vision. Every gift makes a difference in advancing God's kingdom."
        overlayColor='bg-black/50'
        overlayOpacity={50}
        background="image"
        imageUrl='https://images.unsplash.com/photo-1664356888755-ffa5e2f09bdd?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      >
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/70 rounded-full text-sm font-medium">
            <HeartHandshake className="h-4 w-4 text-primary" />
            <span>Secure & Encrypted</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/70 rounded-full text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="12" x2="12.01" y1="10" y2="10" />
            </svg>
            <span>Recurring Options</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/70 rounded-full text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
              <path d="M12 2v4" />
              <path d="m16 6 3 3" />
              <path d="M18 9h3" />
              <path d="M6 6l-3 3" />
              <path d="M3 9h3" />
              <path d="M3 15h18" />
              <path d="M18 15v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4" />
              <path d="M10 10h4" />
            </svg>
            <span>Tax-Deductible</span>
          </div>
        </div>
      </PageHeader>
      
      {/* Donation Form */}
      <Card className="max-w-2xl mx-auto mb-20">
        <CardHeader>
          <CardTitle>Make a Donation</CardTitle>
          <CardDescription>
            Fill in the details below to make a secure donation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Donation Amount */}
            <div className="space-y-4">
              <h3 className="font-medium">Donation Amount</h3>
              <div className="grid grid-cols-3 gap-4">
                {[10, 25, 50, 100, 250, 'Other'].map((amount) => {
                  const amountStr = amount.toString();
                  const isSelected = selectedAmount === amount || 
                    (selectedAmount === 'Other' && amount === 'Other');
                  
                  return (
                    <Button
                      key={amountStr}
                      type="button"
                      variant={isSelected ? 'default' : 'outline'}
                      className={`h-16 text-lg ${isSelected ? 'bg-primary' : ''}`}
                      onClick={() => handleAmountSelect(amount)}
                    >
                      {amount === 'Other' ? amount : `$${amount}`}
                    </Button>
                  );
                })}
              </div>
              <div className="pt-2">
                <Label htmlFor="custom-amount">Or enter a custom amount</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <Input
                    id="custom-amount"
                    type="number"
                    className={`pl-8 h-12 text-lg ${errors.amount ? 'border-red-500' : ''}`}
                    placeholder="0.00"
                    {...register('amount')}
                    value={selectedAmount === 'Other' ? '' : selectedAmount}
                    onChange={(e) => setSelectedAmount(e.target.value)}
                  />
                  {errors.amount && (
                    <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-4">
              <h3 className="font-medium">Your Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input 
                    id="first-name" 
                    className={errors.firstName ? 'border-red-500' : ''}
                    {...register('firstName')} 
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input 
                    id="last-name" 
                    className={errors.lastName ? 'border-red-500' : ''}
                    {...register('lastName')} 
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  className={errors.email ? 'border-red-500' : ''}
                  {...register('email')} 
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="font-medium">Payment Method</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={() => setValue('paymentMethod', 'credit-card')}
                    className="h-4 w-4 text-primary"
                  />
                  <Label htmlFor="credit-card">Credit/Debit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="bank-transfer"
                    checked={paymentMethod === 'bank-transfer'}
                    onChange={() => setValue('paymentMethod', 'bank-transfer')}
                    className="h-4 w-4 text-primary"
                  />
                  <Label htmlFor="bank-transfer">Bank Transfer</Label>
                </div>
              </div>
            </div>

            {/* Recurring Donation */}
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="recurring"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                {...register('isRecurring')}
              />
              <Label htmlFor="recurring" className="text-sm font-medium leading-none">
                Make this a recurring donation
              </Label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full py-6 text-lg" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Donate Now'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
