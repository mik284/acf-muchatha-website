import { HeroSection } from "@/components/home/HeroSection";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { LatestSermon } from "@/components/home/LatestSermon";
import { EventsCarousel } from "@/components/home/EventsCarousel";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <WelcomeSection />
      <LatestSermon />
      <EventsCarousel />
      
      {/* Add more sections here as needed */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us This Week</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Experience meaningful worship, biblical teaching, and authentic community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-100">
              <h3 className="text-xl font-bold mb-3">Sunday Service</h3>
              <p className="text-muted-foreground mb-4">10:00 AM</p>
              <p className="text-sm text-muted-foreground mb-6">Join us for worship and the Word</p>
              <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                Learn More →
              </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-100">
              <h3 className="text-xl font-bold mb-3">Bible Study</h3>
              <p className="text-muted-foreground mb-4">Wednesday, 7:00 PM</p>
              <p className="text-sm text-muted-foreground mb-6">Mid-week Bible study and prayer</p>
              <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                Join Us →
              </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-100">
              <h3 className="text-xl font-bold mb-3">Youth Group</h3>
              <p className="text-muted-foreground mb-4">Friday, 6:30 PM</p>
              <p className="text-sm text-muted-foreground mb-6">For students 6th-12th grade</p>
              <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Visit?</h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
            We'd love to meet you! Join us this Sunday and experience our welcoming community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-800 hover:bg-primary-50 px-8 py-4 rounded-lg font-medium text-lg transition-colors">
              Plan Your Visit
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium text-lg transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
