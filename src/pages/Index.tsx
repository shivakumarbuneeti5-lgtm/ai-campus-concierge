import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chatbot } from "@/components/Chatbot";
import { InfoModule } from "@/components/InfoModule";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Utensils, 
  BookOpen, 
  FileText, 
  MessageCircle,
  GraduationCap,
  Users
} from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";

const Index = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const academicScheduleItems = [
    { title: "Mathematics 101", subtitle: "Prof. Johnson - Building A, Room 204", time: "2:00 PM", status: "Today" },
    { title: "Computer Science Lab", subtitle: "Prof. Smith - Tech Center", time: "4:00 PM", status: "Today" },
    { title: "History Seminar", subtitle: "Prof. Brown - Liberal Arts Building", time: "10:00 AM", status: "Tomorrow" }
  ];

  const facilityTimingsItems = [
    { title: "Main Library", subtitle: "Study rooms, research resources", time: "24/7", status: "Open" },
    { title: "Recreation Center", subtitle: "Gym, pool, courts", time: "6AM-11PM", status: "Open" },
    { title: "Student Center", subtitle: "Dining, events, services", time: "7AM-10PM", status: "Open" }
  ];

  const campusEventsItems = [
    { title: "Career Fair", subtitle: "Meet top employers", time: "10AM-4PM", status: "Wed" },
    { title: "Movie Night", subtitle: "Student Center Auditorium", time: "7:00 PM", status: "Fri" },
    { title: "Study Group", subtitle: "Math & Science Tutoring", time: "6:00 PM", status: "Daily" }
  ];

  const diningServicesItems = [
    { title: "Main Dining Hall", subtitle: "All-you-can-eat buffet", time: "7AM-9PM", status: "Open" },
    { title: "Campus Café", subtitle: "Coffee, pastries, light meals", time: "6AM-8PM", status: "Open" },
    { title: "Food Trucks", subtitle: "Various cuisines", time: "11AM-3PM", status: "Weekdays" }
  ];

  const libraryResourcesItems = [
    { title: "Digital Database", subtitle: "Research papers, journals", status: "24/7 Access" },
    { title: "Study Rooms", subtitle: "Group and individual spaces", status: "Available" },
    { title: "Equipment Rental", subtitle: "Laptops, tablets, cameras", time: "9AM-5PM", status: "Open" }
  ];

  const administrativeItems = [
    { title: "Registrar's Office", subtitle: "Transcripts, enrollment", time: "9AM-5PM", status: "Open" },
    { title: "Financial Aid", subtitle: "Scholarships, loans, billing", time: "8AM-4PM", status: "Open" },
    { title: "Student Support", subtitle: "Counseling, disability services", time: "8AM-6PM", status: "Open" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${campusHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <GraduationCap className="w-12 h-12" />
            <h1 className="text-5xl font-bold">Campus AI Assistant</h1>
          </div>
          <p className="text-xl mb-8 text-white/90">
            Your intelligent guide to campus life. Get instant answers about dining, facilities, schedules, and more.
          </p>
          <Button 
            onClick={() => setShowChatbot(!showChatbot)}
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {showChatbot ? 'Hide Chat Assistant' : 'Start Chat Assistant'}
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-12">
        {/* Chatbot Section */}
        {showChatbot && (
          <div className="mb-12">
            <div className="max-w-4xl mx-auto">
              <Chatbot />
            </div>
          </div>
        )}

        {/* Information Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <InfoModule
            title="Academic Schedules"
            icon={Calendar}
            description="View your classes and academic calendar"
            items={academicScheduleItems}
            primaryColor="blue"
          />
          
          <InfoModule
            title="Facility Timings"
            icon={Clock}
            description="Hours and availability of campus facilities"
            items={facilityTimingsItems}
            primaryColor="green"
          />
          
          <InfoModule
            title="Campus Events"
            icon={Users}
            description="Upcoming activities and student events"
            items={campusEventsItems}
            primaryColor="orange"
          />
          
          <InfoModule
            title="Dining Services"
            icon={Utensils}
            description="Meal plans, menus, and dining locations"
            items={diningServicesItems}
            primaryColor="blue"
          />
          
          <InfoModule
            title="Library Resources"
            icon={BookOpen}
            description="Books, databases, and study spaces"
            items={libraryResourcesItems}
            primaryColor="green"
          />
          
          <InfoModule
            title="Administrative Services"
            icon={FileText}
            description="Student services and office hours"
            items={administrativeItems}
            primaryColor="orange"
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Need Quick Help?</h2>
            <p className="text-muted-foreground mb-6">
              Access our most popular services and get instant assistance
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <MapPin className="w-4 h-4 mr-2" />
                Campus Map
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Clock className="w-4 h-4 mr-2" />
                Emergency Info
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Users className="w-4 h-4 mr-2" />
                Student Portal
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;