'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Play, Calendar, Clock as ClockIcon, User, Eye, MessageSquare } from 'lucide-react';

interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  duration: string;
  thumbnail: string;
  views: number;
  description: string;
  series?: string;
}

export const LatestSermon = () => {
  const router = useRouter();

  // Mock data - replace with actual data from your CMS or API
  const latestSermon: Sermon = {
    id: '1',
    title: 'Walking in Faith Through Difficult Times',
    preacher: 'Pastor John Smith',
    date: '2025-06-16',
    duration: '45:22',
    thumbnail:
      'https://images.unsplash.com/photo-1638173385020-6aeb3adaa983?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    views: 1245,
    series: 'Faith in Action',
    description:
      'In this powerful message, we explore how to maintain strong faith and trust in God when facing life&apos;s most challenging moments. Learn practical biblical principles for overcoming adversity.',
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-sm font-semibold text-blue-600 mb-2">LATEST SERMON</h3>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">This Week&apos;s Message</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl group">
            <Image
              src={latestSermon.thumbnail}
              alt={latestSermon.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20">
              <button
                onClick={() => router.push(`/sermons/${latestSermon.id}`)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                aria-label="Play sermon"
              >
                <Play className="h-8 w-8 ml-1" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {latestSermon.duration}
                </span>
                <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {latestSermon.views.toLocaleString()} views
                </span>
              </div>
            </div>
          </div>

          <div>
            {latestSermon.series && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full mb-4">
                {latestSermon.series} Series
              </span>
            )}
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{latestSermon.title}</h3>

            <div className="flex items-center text-muted-foreground text-sm mb-6">
              <div className="flex items-center mr-6">
                <User className="h-4 w-4 mr-1 text-blue-600" />
                {latestSermon.preacher}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                {formatDate(latestSermon.date)}
              </div>
            </div>

            <p className="text-muted-foreground mb-8">{latestSermon.description}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg flex items-center group"
                onClick={() => router.push(`/sermons/${latestSermon.id}`)}
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg group"
                onClick={() => router.push('/sermons')}
              >
                <MessageSquare className="h-5 w-5 mr-2 text-blue-600 group-hover:text-blue-700" />
                All Sermons
              </Button>
            </div>
          </div>
        </div>

        {/* Additional CTAs */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h4 className="font-semibold text-lg mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 mr-2 text-blue-600"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
              Sermon Notes
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Download notes and discussion questions to go deeper with this week&apos;s message.
            </p>
            <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">
              Download Notes →
            </Button>
          </div>

          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
            <h4 className="font-semibold text-lg mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 mr-2 text-yellow-600"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Discussion Group
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Join others to discuss this message and share insights from God&apos;s Word.
            </p>
            <Button variant="link" className="p-0 h-auto text-yellow-600 hover:text-yellow-800">
              Join Discussion →
            </Button>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <h4 className="font-semibold text-lg mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 mr-2 text-green-600"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Connect With Us
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Have questions or need prayer? We&apos;d love to connect with you.
            </p>
            <Button variant="link" className="p-0 h-auto text-green-600 hover:text-green-800">
              Get in Touch →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
