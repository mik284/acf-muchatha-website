'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';

// Form validation schema
const prayerFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }).optional(),
  phone: z.string().optional(),
  request: z
    .string()
    .min(10, { message: 'Please share your prayer request (at least 10 characters).' }),
  sharePublicly: z.boolean().optional().default(false),
  contactMe: z.boolean().optional().default(false),
});

type PrayerFormValues = {
  name: string;
  request: string;
  email?: string;
  phone?: string;
  sharePublicly?: boolean;
  contactMe?: boolean;
};

export default function PrayerRequestPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<PrayerFormValues>({
    resolver: zodResolver(prayerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      request: '',
      sharePublicly: false,
      contactMe: false,
    },
  });

  // Form submission handler
  const onSubmit = async (data: PrayerFormValues) => {
    try {
      setIsSubmitting(true);

      console.log(data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      toast.success('Prayer request received!', {
        description: 'Our prayer team is lifting your request to the Lord.',
      });

      // Reset form and show thank you message
      form.reset();
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit prayer request', {
        description: 'Please try again later or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="container mx-auto py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto bg-green-50 p-8 rounded-2xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-4">Thank You for Sharing</h1>
          <p className="text-lg text-green-700 mb-8">
            Your prayer request has been received. Our prayer team is honored to bring your needs
            before the Lord.
          </p>
          <div className="space-y-4 text-left max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-green-800">
                <span className="font-medium">Be encouraged</span> - &quot;Do not be anxious about
                anything, but in every situation, by prayer and petition, with thanksgiving, present
                your requests to God.&quot; - Philippians 4:6
              </p>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-amber-800">
                <span className="font-medium">Need immediate prayer?</span> Call our prayer line at
                &quot;+254 700 123 456&quot;
              </p>
            </div>
          </div>
          <Button className="mt-8" variant="outline" onClick={() => setIsSubmitted(false)}>
            Submit Another Request
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Heart className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Prayer Requests</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Share your prayer needs with our prayer team. We&apos;re here to pray with you.
        </p>
      </section>

      <div className="max-w-3xl mx-auto">
        <div className="bg-card p-6 md:p-8 rounded-xl shadow-sm mb-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+254 700 000000" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-end">
                  <p className="text-sm text-muted-foreground pb-2">
                    At least one contact method is recommended if you&apos;d like us to follow up.
                  </p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="request"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Prayer Request *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your prayer need..."
                        className="min-h-[180px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="sharePublicly"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-1"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-medium">
                          Share this request with the church
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Your request (without personal details) may be shared with our prayer team
                          and church family.
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactMe"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-1"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-medium">
                          I&apos;d like someone to contact me
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          A pastor or prayer team member will reach out to you soon.
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Note:</span> All prayer requests are kept
                  confidential within our prayer team unless you choose to share them with the
                  church family. We respect your privacy and will not share your contact
                  information.
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Heart className="mr-2 h-4 w-4" />
                    Submit Prayer Request
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">24/7 Prayer Support</h2>
          <p className="text-muted-foreground mb-6">
            For urgent prayer needs, our prayer team is available around the clock.
          </p>
          <div className="space-y-2">
            <p className="text-lg font-medium">
              Call:{' '}
              <a href="tel:+254700123456" className="text-primary hover:underline">
                +254 700 123 456
              </a>
            </p>
            <p className="text-muted-foreground text-sm">Available 24 hours a day, 7 days a week</p>
          </div>
        </div>
      </div>
    </main>
  );
}
