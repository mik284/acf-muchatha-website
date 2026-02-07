import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Users, BookOpen, Heart, Mic2, Music, Baby, ArrowRight, Users2, HandHeart, Church } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';

// Types
type Ministry = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  meetingTime?: string;
  meetingDay?: string;
  leader?: string;
  contactEmail?: string;
  slug: string;
};

// Mock data - replace with actual data from CMS
const ministries: Ministry[] = [
  {
    id: '1',
    title: 'Children\'s Ministry',
    description: 'A fun and engaging ministry for children ages 0-12 where they learn about Jesus through age-appropriate lessons, worship, and activities.',
    icon: <Baby className="h-8 w-8" />,
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    meetingTime: 'Sundays, 10:00 AM',
    meetingDay: 'Sunday',
    leader: 'Ruth Wambui',
    contactEmail: 'children@ambassadorsforchrist.org',
    slug: 'childrens-ministry'
  },
  {
    id: '2',
    title: 'Youth Ministry',
    description: 'A dynamic community for teenagers in grades 7-12 to grow in their faith, build authentic relationships, and discover their purpose in Christ.',
    icon: <Users className="h-8 w-8" />,
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    meetingTime: 'Fridays, 6:30 PM',
    meetingDay: 'Friday',
    leader: 'Peter Maina',
    contactEmail: 'youth@ambassadorsforchrist.org',
    slug: 'youth-ministry'
  },
  {
    id: '3',
    title: 'Worship Ministry',
    description: 'A team of musicians and vocalists who lead the congregation in worship through music and creative arts, creating an atmosphere to encounter God.',
    icon: <Music className="h-8 w-8" />,
    imageUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    meetingTime: 'Thursdays, 5:30 PM',
    meetingDay: 'Thursday',
    leader: 'Esther Achieng',
    contactEmail: 'worship@ambassadorsforchrist.org',
    slug: 'worship-ministry'
  },
  {
    id: '4',
    title: 'Men\'s Ministry',
    description: 'A brotherhood of men committed to growing in Christ, building strong families, and making an impact in their communities for the Kingdom.',
    icon: <Users className="h-8 w-8" />,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    meetingTime: '1st Saturday, 8:00 AM',
    meetingDay: 'Monthly',
    leader: 'Michael Ochieng',
    contactEmail: 'men@ambassadorsforchrist.org',
    slug: 'mens-ministry'
  },
  {
    id: '5',
    title: 'Women\'s Ministry',
    description: 'A sisterhood where women of all ages connect, grow spiritually, and encourage one another through Bible studies, events, and fellowship.',
    icon: <Heart className="h-8 w-8" />,
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    meetingTime: '2nd Saturday, 10:00 AM',
    meetingDay: 'Monthly',
    leader: 'Grace Wanjiku',
    contactEmail: 'women@ambassadorsforchrist.org',
    slug: 'womens-ministry'
  },
  {
    id: '6',
    title: 'Small Groups',
    description: 'Small groups that meet in homes throughout the week for Bible study, prayer, and authentic community. Find your people and grow together in faith.',
    icon: <Users className="h-8 w-8" />,
    imageUrl: 'https://images.unsplash.com/photo-1541178735493-479c1a27ed24?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    meetingTime: 'Various times',
    meetingDay: 'Weekly',
    contactEmail: 'smallgroups@ambassadorsforchrist.org',
    slug: 'small-groups'
  },
  {
    id: '7',
    title: 'Prayer Ministry',
    description: 'A dedicated team that intercedes for the needs of the church, community, and world. Join us as we seek God\'s heart in prayer.',
    icon: <Heart className="h-8 w-8" />,
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    meetingTime: 'Mondays, 6:00 PM',
    meetingDay: 'Monday',
    leader: 'Grace Wanjiku',
    contactEmail: 'prayer@ambassadorsforchrist.org',
    slug: 'prayer-ministry'
  },
  {
    id: '8',
    title: 'Missions & Outreach',
    description: 'Extending the love of Christ locally and globally through service projects, mission trips, and partnerships with ministries around the world.',
    icon: <Heart className="h-8 w-8" />,
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    meetingTime: '3rd Saturday, 9:00 AM',
    meetingDay: 'Monthly',
    leader: 'James Omondi',
    contactEmail: 'missions@ambassadorsforchrist.org',
    slug: 'missions-outreach'
  },
  {
    id: '9',
    title: 'Young Adults',
    description: 'A community for those in their 20s and 30s navigating life, faith, and calling. Connect with peers who are seeking to follow Jesus in every area of life.',
    icon: <Users className="h-8 w-8" />,
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    meetingTime: 'Wednesdays, 7:00 PM',
    meetingDay: 'Wednesday',
    contactEmail: 'youngadults@ambassadorsforchrist.org',
    slug: 'young-adults'
  }
];

export default function MinistriesPage() {
  return (
    <main className="container mx-auto px-4">
      <PageHeader 
        title="Our Ministries"
        description="Discover opportunities to connect, grow, and serve in our church family. Find your place and purpose in one of our life-giving ministries."
        ctaText="Get Involved"
        ctaHref="/contact"
        background='image'
        overlayOpacity={50}
        overlayColor='bg-black/50'
        imageUrl='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      >
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/70 rounded-full text-sm font-medium">
            <Users2 className="h-4 w-4 text-primary" />
            <span>All Ages</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/70 rounded-full text-sm font-medium">
            <HandHeart className="h-4 w-4 text-primary" />
            <span>Serve Opportunities</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/70 rounded-full text-sm font-medium">
            <Church className="h-4 w-4 text-primary" />
            <span>Community</span>
          </div>
        </div>
      </PageHeader>

      {/* Ministries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {ministries.map((ministry) => (
          <Card key={ministry.id} className="overflow-hidden group hover:shadow-lg transition-shadow h-full flex flex-col">
            <div className="relative h-48 bg-muted">
              <Image
                src={ministry.imageUrl}
                alt={ministry.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  {ministry.icon}
                </div>
                <CardTitle className="text-xl">{ministry.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-3 mb-4">
                {ministry.description}
              </p>
              
              {(ministry.meetingTime || ministry.leader) && (
                <div className="space-y-2 text-sm">
                  {ministry.meetingTime && (
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{ministry.meetingTime}</span>
                    </div>
                  )}
                  {ministry.leader && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Led by {ministry.leader}</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-0">
              <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Link href={`/ministries/${ministry.slug}`}>
                  Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <section className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center mb-20">
        <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          We have many other ways to get involved at Ambassadors For Christ. 
          Contact us and we'll help you find the perfect place to connect and serve.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/serve">Serve With Us</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

// Simple Calendar icon component since we can't import it directly from lucide-react
function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}
