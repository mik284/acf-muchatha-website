"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { Play, ArrowRight } from 'lucide-react';

type ValueCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const ValueCard = ({ icon, title, description }: ValueCardProps) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
    <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export const WelcomeSection = () => {
  const router = useRouter();

  const values = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
          <path d="M12 12v6"/>
          <path d="M9 15h6"/>
        </svg>
      ),
      title: "Bible-Based Teaching",
      description: "We are committed to the faithful teaching of God's Word as our foundation for life and ministry."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: "Authentic Community",
      description: "We grow better together in Christ-centered relationships that encourage and challenge us."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M12 2v4"/>
          <path d="m16 6 3 3"/>
          <path d="M18 9h3"/>
          <path d="M6 6 3 9"/>
          <path d="M3 9h3"/>
          <path d="M3 15h18"/>
          <path d="M18 15v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4"/>
          <path d="M10 10h4"/>
        </svg>
      ),
      title: "Spiritual Growth",
      description: "We provide opportunities for every believer to grow in their faith and discover their purpose."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M7 20h10"/>
          <path d="M12 20a5 5 0 0 0 5-5c0-2-2-3-2-3H9s-2 1-2 3a5 5 0 0 0 5 5z"/>
          <path d="M12 20v-4"/>
          <path d="M12 4v3"/>
          <path d="M10 2h4"/>
          <path d="M9 12v-2"/>
          <path d="M15 12v-2"/>
        </svg>
      ),
      title: "Outreach & Missions",
      description: "We're passionate about sharing the love of Christ both locally and around the world."
    }
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1617745214185-994e9fc7aa85?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Church Service" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-blue-900/20"></div>
              <button 
                onClick={() => router.push('/sermons')}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                aria-label="Play welcome video"
              >
                <Play className="h-8 w-8 ml-1" />
              </button>
            </div>
          </div>
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
              Welcome to Ambassadors for Christ
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              A Place to <span className="text-blue-500">Belong</span>, <span className="text-yellow-400">Believe</span>, and <span className="text-green-400">Become</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              At Ambassadors for Christ, we&apos;re more than just a church - we&apos;re a family. Whether you&apos;re exploring faith for the first time or looking to deepen your relationship with God, you&apos;ll find a welcoming community ready to walk alongside you on your spiritual journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg"
                onClick={() => router.push('/about')}
              >
                Our Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-lg"
                onClick={() => router.push('/ministries')}
              >
                Explore Ministries
              </Button>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-16">
          <h3 className="text-sm font-semibold text-blue-400 mb-2">OUR CORE VALUES</h3>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What We Believe In</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ValueCard 
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};