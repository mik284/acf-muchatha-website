import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

// Types
type StaffMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  email?: string;
  phone?: string;
  social?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
};

type LeadershipTeam = {
  title: string;
  description: string;
  members: StaffMember[];
};

// Mock data - replace with actual data from CMS
const leadershipTeams: LeadershipTeam[] = [
  {
    title: 'Senior Pastors',
    description: 'Our spiritual leaders who provide vision and direction for our church family.',
    members: [
      {
        id: '1',
        name: 'Dr. John Mwangi',
        role: 'Senior Pastor',
        bio: "With over 20 years of ministry experience, Pastor John has a passion for teaching God's Word and equipping believers for works of service. He holds a Doctorate in Ministry from Trinity Evangelical Divinity School.",
        imageUrl:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        email: 'john@ambassadorsforchrist.org',
        phone: '+254 700 123457',
        social: {
          twitter: 'pastorjohn',
          facebook: 'pastorjohnmwangi',
        },
      },
      {
        id: '2',
        name: 'Sarah Mwangi',
        role: 'Associate Pastor',
        bio: "Pastor Sarah oversees our women's ministry and children's programs. She has a heart for discipleship and seeing women grow in their relationship with Christ.",
        imageUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        email: 'sarah@ambassadorsforchrist.org',
        phone: '+254 700 123458',
        social: {
          instagram: 'pastorsarah',
        },
      },
    ],
  },
  {
    title: 'Elders',
    description: 'Spiritual leaders who provide oversight and shepherding for our congregation.',
    members: [
      {
        id: '3',
        name: 'Michael Ochieng',
        role: 'Elder',
        bio: "Michael has been serving as an elder for 10 years. He leads our men's ministry and is passionate about biblical manhood and discipleship.",
        imageUrl:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        email: 'michael@ambassadorsforchrist.org',
      },
      {
        id: '4',
        name: 'Grace Wanjiku',
        role: 'Elder',
        bio: 'Grace oversees our prayer ministry and small groups. She has a gift of discernment and a heart for intercession.',
        imageUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        phone: '+254 700 123459',
      },
      {
        id: '5',
        name: 'David Kamau',
        role: 'Elder',
        bio: 'David leads our missions team and oversees our community outreach programs. He has a passion for evangelism and church planting.',
        imageUrl:
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        email: 'david@ambassadorsforchrist.org',
      },
    ],
  },
  {
    title: 'Ministry Leaders',
    description: 'Dedicated individuals leading various ministries in our church.',
    members: [
      {
        id: '6',
        name: 'Esther Achieng',
        role: 'Worship Director',
        bio: "Esther leads our worship ministry with excellence and a heart for ushering people into God's presence through music and praise.",
        imageUrl:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: '7',
        name: 'Peter Maina',
        role: 'Youth Pastor',
        bio: 'Peter is passionate about reaching the next generation with the Gospel and equipping young people to live out their faith.',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: '8',
        name: 'Ruth Wambui',
        role: "Children's Ministry Director",
        bio: 'Ruth creates engaging and biblical programs for children to learn about Jesus in a fun and safe environment.',
        imageUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: '9',
        name: 'James Omondi',
        role: 'Missions Director',
        bio: 'James coordinates our local and international mission efforts, mobilizing the church to be the hands and feet of Jesus.',
        imageUrl:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
];

export default function LeadershipPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Leadership</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Meet the team of dedicated leaders who serve our church family
        </p>
      </section>

      {/* Leadership Teams */}
      <div className="space-y-20">
        {leadershipTeams.map((team, index) => (
          <section key={index} className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{team.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{team.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {team.members.map((member) => (
                <Card
                  key={member.id}
                  className="overflow-hidden group hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-64 bg-muted">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <p className="text-primary font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-4">{member.bio}</p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-2 pt-0">
                    {(member.email || member.phone) && (
                      <div className="w-full pt-4 border-t">
                        <h4 className="text-sm font-medium mb-2 text-muted-foreground">Contact</h4>
                        <div className="space-y-1">
                          {member.email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <a href={`mailto:${member.email}`} className="hover:underline">
                                {member.email}
                              </a>
                            </div>
                          )}
                          {member.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={`tel:${member.phone.replace(/\D/g, '')}`}
                                className="hover:underline"
                              >
                                {member.phone}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {member.social && (
                      <div className="flex gap-3 mt-4">
                        {member.social.twitter && (
                          <a
                            href={`https://twitter.com/${member.social.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label={`${member.name}'s Twitter`}
                          >
                            <Twitter className="h-5 w-5" />
                          </a>
                        )}
                        {member.social.facebook && (
                          <a
                            href={`https://facebook.com/${member.social.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label={`${member.name}'s Facebook`}
                          >
                            <Facebook className="h-5 w-5" />
                          </a>
                        )}
                        {member.social.instagram && (
                          <a
                            href={`https://instagram.com/${member.social.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label={`${member.name}'s Instagram`}
                          >
                            <Instagram className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Call to Action */}
      <section className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center mt-20">
        <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Interested in serving at Ambassadors For Christ? We&apos;d love to help you find a place
          to use your gifts and talents.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">Serve With Us</Button>
          <Button variant="outline" size="lg">
            Contact Us
          </Button>
        </div>
      </section>
    </main>
  );
}
