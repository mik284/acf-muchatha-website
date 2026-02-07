import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Heart, BookOpen, MapPin, Clock, Mail, Phone } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4">
      <PageHeader
        title="About Ambassadors For Christ"
        description="A vibrant community of believers dedicated to spreading the love and message of Jesus Christ."
        ctaText="Visit Us This Sunday"
        ctaHref="/contact"
        background="image"
        overlayOpacity={50}
        imageUrl="https://images.unsplash.com/photo-1638866413606-e070e7defe21?q=80&w=2699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      {/* Our Story */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1638866413606-e070e7defe21?q=80&w=2699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Our Church Building"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="mb-4">
                Founded in 1995, Ambassadors For Christ began as a small Bible study group in a
                living room. What started with just a handful of faithful believers has grown into a
                thriving community impacting thousands of lives in our city and beyond.
              </p>
              <p className="mb-4">
                Our journey has been marked by God&apos;s faithfulness as we&apos;ve seen countless
                lives transformed through the power of the Gospel. We believe in creating a
                welcoming environment where people from all walks of life can encounter Jesus and
                grow in their faith.
              </p>
              <p>
                Today, we continue to be a beacon of hope in our community, committed to making
                disciples who make disciples, and being the hands and feet of Jesus to those in
                need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To lead people into a growing relationship with Jesus Christ by creating
                environments where people are equipped to know God, find freedom, discover purpose,
                and make a difference.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To be a church where the Gospel is preached, lives are transformed, and communities
                are impacted for Christ. We envision a multi-ethnic, multi-generational church that
                reflects the diversity of heaven.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Biblical Truth',
              description:
                'We are committed to the authority and sufficiency of Scripture in all matters of faith and practice.',
            },
            {
              title: 'Authentic Worship',
              description:
                'We pursue genuine encounters with God through Spirit-led worship and prayer.',
            },
            {
              title: 'Intentional Discipleship',
              description:
                'We are committed to growing together in Christ-likeness through intentional relationships.',
            },
            {
              title: 'Radical Generosity',
              description:
                "We give freely of our time, talents, and resources to advance God's kingdom.",
            },
            {
              title: 'Genuine Community',
              description: 'We do life together, supporting and encouraging one another in love.',
            },
            {
              title: 'Outward Focus',
              description: 'We exist to serve our communities and share the hope of the Gospel.',
            },
          ].map((value, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Service Times */}
      <section className="mb-20">
        <div className="bg-muted/30 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Join Us This Week</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-background p-6 rounded-xl h-full">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Sunday Service</h3>
                  <p className="text-muted-foreground">10:00 AM - 12:00 PM</p>
                  <p className="text-sm text-muted-foreground mt-2">Main Sanctuary</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-background p-6 rounded-xl h-full">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Bible Study</h3>
                  <p className="text-muted-foreground">Wednesday, 7:00 PM</p>
                  <p className="text-sm text-muted-foreground mt-2">Fellowship Hall</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-background p-6 rounded-xl h-full">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Prayer Meeting</h3>
                  <p className="text-muted-foreground">Friday, 6:30 PM</p>
                  <p className="text-sm text-muted-foreground mt-2">Prayer Room</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-8">Our Location</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-muted/30 rounded-xl overflow-hidden h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8109999999993!2d36.82115961475393!3d-1.2925004359804718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d3b1c9ab9d%3A0xe542e2e3d4b7798f!2sNairobi%20Chapel!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Our Location on Map"
            ></iframe>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Visit Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-muted-foreground">123 Faith Avenue, Nairobi, Kenya</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Office Hours</h4>
                  <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">info@ambassadorsforchrist.org</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-muted-foreground">+254 700 123456</p>
                </div>
              </div>
            </div>
            <Button className="mt-6">Get Directions</Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center mb-20">
        <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          We&apos;d love to welcome you this Sunday! Let us know you&apos;re coming and we&apos;ll
          make sure to give you the VIP treatment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">Plan Your Visit</Button>
          <Button variant="outline" size="lg">
            Contact Us
          </Button>
        </div>
      </section>
    </main>
  );
}
