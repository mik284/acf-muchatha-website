'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Play, CalendarDays, MapPin, Clock } from 'lucide-react';

export const HeroSection = () => {
  const router = useRouter();

  // Next service information
  const nextService = {
    day: 'Sunday',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    title: 'Sunday Worship Service',
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1543525238-54e3d131f7ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundPosition: 'cover',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            objectFit: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-transparent to-blue-900/90"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-6xl mx-auto py-20 mt-8">
          {/* Welcome badge */}
          <div className="inline-flex items-center px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/20">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 mr-2.5 animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide">Now Welcoming New Members</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300">
              Experience God&apos;s
            </span>{' '}
            <span className="text-white">Love</span>
            <br className="hidden lg:block" />
            <span className="text-white">and</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400">
              Transforming Power
            </span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed font-light">
            Join our vibrant community as we worship, grow, and serve together in Christ&apos;s
            love.
            <span className="block mt-3 text-blue-200/90">All are welcome!</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-400 text-blue-900 hover:from-yellow-400 hover:to-yellow-300 px-10 py-7 text-lg font-semibold shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              onClick={() => router.push('/sermons')}
            >
              <span className="relative z-10 flex items-center">
                <Play className="mr-3 h-6 w-6" />
                Watch Latest Sermon
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group relative overflow-hidden border-2 border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 px-10 py-7 text-lg font-medium transition-all duration-300 hover:border-yellow-400/50"
              onClick={() => router.push('/about')}
            >
              <span className="relative z-10 flex items-center">
                Learn About Us
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
                  className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </div>

          {/* Next service info */}
          <div className="inline-block bg-gradient-to-br from-white/5 to-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-7 shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-yellow-400/10">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center justify-center">
              <CalendarDays className="h-6 w-6 mr-2 text-yellow-300" />
              Join Us This {nextService.day}
            </h3>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <div className="flex items-center bg-white/5 px-4 py-2.5 rounded-lg backdrop-blur-sm">
                <Clock className="h-5 w-5 text-yellow-300 mr-2.5" />
                <span className="font-medium">{nextService.time}</span>
              </div>
              <div className="flex items-center bg-white/5 px-4 py-2.5 rounded-lg backdrop-blur-sm">
                <MapPin className="h-5 w-5 text-yellow-300 mr-2.5" />
                <span className="font-medium">{nextService.location}</span>
              </div>
              <Button
                variant="link"
                className="group text-yellow-300 hover:text-yellow-200 p-0 h-auto font-medium flex items-center ml-2"
                onClick={() => router.push('/events')}
              >
                View All Services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/70 rounded-full animate-scroll"></div>
        </div>
      </div>
    </section>
  );
};

// Add these styles to your global CSS
/* 
@keyframes scroll {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(10px); opacity: 0.3; }
}
.animate-scroll {
  animation: scroll 1.5s ease-in-out infinite;
}
*/
