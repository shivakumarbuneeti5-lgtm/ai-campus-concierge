import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageCircle, Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const complexResponses = {
  dining: {
    basic: "The main dining hall is open from 7 AM to 9 PM. Today's menu includes grilled chicken, vegetarian pasta, and a fresh salad bar.",
    detailed: "🍽️ **Dining Services - Current Status**\n\n**Main Dining Hall** (7 AM - 9 PM)\n- Today's Special: Mediterranean Bowl ($8.50)\n- Allergen-free station available\n- Current wait time: ~5 minutes\n\n**Quick Grab** (24/7)\n- Library Café: Sandwiches, coffee, snacks\n- Engineering Building: Vending machines restocked\n\n**Meal Plans**: Swipe cards accepted. Guest meals: $12/person\n\nWould you like specific dietary information or nutrition facts?",
    followUp: "Are you looking for vegetarian options, allergen information, or meal plan details?"
  },
  library: {
    basic: "The library is open 24/7 during exam periods. You can reserve study rooms online.",
    detailed: "📚 **Library Services - Live Update**\n\n**Current Status**: Open (24/7 exam period)\n**Available Study Rooms**: 3 of 12\n**Computer Lab**: 15 PCs available\n**Silent Floor**: 85% capacity\n\n**Services**:\n- Book reservations: 2-day hold\n- Inter-library loans: 5-day processing\n- Research assistance: Available until 8 PM\n- Printing: $0.10/page (B&W), $0.25/page (Color)\n\n**Digital Resources**: 50,000+ e-books, 200+ databases\n\nNeed help finding specific resources or booking group study spaces?",
    followUp: "Do you need help with research databases, study room booking, or finding specific materials?"
  },
  schedule: {
    basic: "Your next class is Mathematics 101 at 2:00 PM in Building A, Room 204.",
    detailed: "📅 **Your Academic Schedule - Today**\n\n**Next Class**: Mathematics 101\n- Time: 2:00 PM - 3:30 PM\n- Location: Building A, Room 204\n- Professor: Dr. Johnson\n- Assignment due: Problem Set #7\n\n**Upcoming This Week**:\n- Computer Science Project (Due: Tomorrow 11:59 PM)\n- Physics Lab Report (Due: Friday)\n- Literature Essay Draft (Due: Monday)\n\n**Office Hours**: Math - Tue/Thu 10-11 AM, CS - Wed 2-4 PM\n\nWould you like directions to your classroom or assignment details?",
    followUp: "Do you need directions, assignment reminders, or professor contact information?"
  },
  events: {
    basic: "Upcoming events this week: Career Fair (Wednesday), Movie Night (Friday), and Student Council Meeting (Thursday).",
    detailed: "🎉 **Campus Events - This Week**\n\n**Tomorrow - Career Fair** (Wednesday 10 AM-4 PM)\n- Location: Student Union Ballroom\n- 50+ companies attending\n- Professional attire recommended\n- Resume review booth available\n\n**Friday - Movie Night** (7 PM)\n- Screening: \"The Matrix\" (Sci-Fi classics series)\n- Location: Outdoor amphitheater\n- Free popcorn and drinks\n- Bring blankets/chairs\n\n**Thursday - Student Council** (3 PM)\n- Budget discussions for spring events\n- Open to all students\n- Location: Conference Room B\n\nInterested in RSVPing or getting more details about any event?",
    followUp: "Would you like to register for the career fair, get movie night details, or learn about other upcoming events?"
  },
  admin: {
    basic: "For transcript requests, visit the Registrar's Office in Building B, 2nd floor. Office hours are 9 AM-5 PM.",
    detailed: "🏢 **Administrative Services**\n\n**Registrar's Office** (Building B, 2nd Floor)\n- Current wait time: ~10 minutes\n- Hours: 9 AM-5 PM (Mon-Fri)\n- Online services available 24/7\n\n**Common Services**:\n- Transcript requests: $5 fee, 3-5 business days\n- Grade appeals: Submit within 30 days\n- Schedule changes: Until add/drop deadline\n- Graduation applications: Due 2 semesters prior\n\n**Financial Aid**: Building C, 1st Floor\n**Student Accounts**: Online portal or Building B, 1st Floor\n\n**Emergency Contacts**: Campus Safety (24/7): ext. 911\n\nWhat specific administrative help do you need?",
    followUp: "Do you need help with transcripts, financial aid, grade appeals, or other administrative procedures?"
  }
};

const challengingQueries = [
  "What happens if I miss my final exam due to illness?",
  "Can I get a refund for my meal plan if I'm studying abroad next semester?",
  "My professor hasn't responded to emails for a week. What should I do?",
  "I think there's an error in my tuition billing. Who handles financial disputes?",
  "Can international students work on campus? What are the restrictions?",
  "How do I report a maintenance issue in my dorm room?",
  "What's the process for changing my major mid-semester?",
  "Can I get academic credit for internship work?",
  "How do I access mental health services on campus?",
  "What should I do if I lose my student ID card?",
  "I'm absent today, can you email me the important topics?",
  "How do I report my absence and get class materials?",
  "I missed class due to illness, how do I get the lecture notes?"
];

const complexQueryResponses = {
  exam: "🚨 **Missed Final Exam Protocol**\n\nIf you miss a final due to documented illness:\n1. Contact your professor immediately\n2. Visit Health Services for documentation\n3. Submit makeup exam request to Registrar within 48 hours\n4. Provide medical documentation\n\n**Important**: Undocumented absences may result in course failure. Contact Academic Affairs (ext. 1234) for emergency situations.",
  
  refund: "💰 **Meal Plan Refund Policy**\n\nStudy abroad students may be eligible for partial refunds:\n- Must withdraw before 4th week of semester\n- Refund calculated on prorated basis\n- Processing takes 2-3 weeks\n- Contact Dining Services (dining@campus.edu) with:\n  - Student ID\n  - Study abroad confirmation\n  - Bank details for refund\n\n**Note**: Meal plan changes affect housing contracts.",
  
  professor: "📧 **Unresponsive Professor Protocol**\n\n1. **Check**: Syllabus for communication policy\n2. **Wait**: 48-72 hours for response\n3. **Escalate**: Contact Department Chair\n4. **Document**: Keep copies of all emails\n5. **Support**: Academic Affairs can mediate\n\n**Emergency**: For urgent matters, contact Department office directly. Student Ombudsman available for serious communication issues.",
  
  billing: "🧾 **Tuition Dispute Resolution**\n\n**Step 1**: Review detailed bill online\n**Step 2**: Contact Student Accounts (accounts@campus.edu)\n**Step 3**: Gather supporting documentation\n**Step 4**: Submit formal dispute within 30 days\n\n**Common Issues**: Payment processing delays, financial aid adjustments, fee waivers\n\n**Urgent**: Payment deadline extensions available while disputes are resolved.",
  
  work: "💼 **International Student Employment**\n\n**On-Campus Work**: Permitted up to 20 hours/week\n**Requirements**: Valid F-1 status, full-time enrollment\n**Process**: Get approval from International Student Services\n**Jobs**: Work-study, RA positions, tutoring, campus dining\n\n**Off-Campus**: Requires CPT/OPT authorization\n**Important**: Unauthorized work can affect visa status",
  
  maintenance: "🔧 **Dorm Maintenance Requests**\n\n**Online**: Submit via Housing Portal (24/7)\n**Phone**: Facilities Management (ext. 4567)\n**Emergency**: Water leaks, electrical issues, heating/cooling failures\n\n**Response Times**:\n- Emergency: Within 2 hours\n- Urgent: Within 24 hours\n- Routine: 3-5 business days\n\n**Document**: Photos help speed up repairs",
  
  major: "🎓 **Mid-Semester Major Change**\n\n**Deadline**: Usually by 6th week of semester\n**Process**:\n1. Meet with current academic advisor\n2. Meet with new department advisor\n3. Submit change form to Registrar\n4. Update course schedule if needed\n\n**Consider**: Impact on graduation timeline, financial aid, course prerequisites\n\n**Support**: Academic Success Center offers guidance",
  
  credit: "📋 **Internship Academic Credit**\n\n**Requirements**:\n- Pre-approval from academic department\n- Minimum 40 hours per credit hour\n- Learning objectives and reflection assignments\n- Supervisor evaluations\n\n**Process**: Submit internship proposal 4 weeks before start date\n**Cost**: Regular tuition rates apply\n**Note**: Not all internships qualify for credit",
  
  mental: "🧠 **Mental Health Services**\n\n**Counseling Center**: Building D, 3rd Floor\n**Hours**: Mon-Fri 8 AM-5 PM\n**Crisis Line**: 24/7 at ext. 2000\n**Services**: Individual counseling, group therapy, crisis intervention\n\n**Appointment**: Online scheduling or walk-in during crisis\n**Confidential**: HIPAA protected\n**Cost**: Covered by student health fee",
  
  id: "🆔 **Lost Student ID Replacement**\n\n**Immediate**: Report lost card to Campus Card Office\n**Cost**: $25 replacement fee\n**Process**: Bring photo ID to Card Office (Student Union, 1st Floor)\n**Hours**: Mon-Fri 9 AM-4 PM\n**Time**: New card printed while you wait\n\n**Tip**: Temporarily access buildings through Campus Safety with photo ID",
  
  absence: "📧 **Absence Reporting & Class Materials**\n\n**Report Absence**: Email absence@campus.edu with:\n- Student ID and full name\n- Course names and section numbers\n- Reason for absence (illness, emergency, etc.)\n- Expected return date\n\n**Automatic Email Service**: \n✅ Important topics and announcements sent within 2 hours\n✅ Lecture summaries and key points\n✅ Assignment deadlines and updates\n✅ Reading materials and resources\n\n**Professor Notification**: Your instructors are automatically notified\n**Make-up Work**: Contact professors within 48 hours for missed assignments\n\n**Emergency Absence**: Call Campus Support (ext. 1111) for same-day reporting",
  
  classNotes: "📚 **Missed Class Materials Recovery**\n\n**Immediate Access** (within 30 minutes):\n- Today's lecture recordings available on Student Portal\n- Slide presentations automatically uploaded\n- Reading assignments and homework posted\n\n**Email Summary Service**:\n📨 **Sent to your student email**:\n- Key concepts covered in class\n- Important announcements\n- Upcoming deadlines\n- Study group information\n- Professor's additional notes\n\n**Peer Study Network**: Connect with assigned study buddies\n**Office Hours**: Professors available for catch-up sessions\n\n**Next Steps**: Check email within 1 hour for complete materials package"
};

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your campus AI assistant. I can help you with dining services, library resources, class schedules, campus events, and administrative procedures. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const [conversationMode, setConversationMode] = useState<'basic' | 'detailed'>('basic');
  const [lastQueryType, setLastQueryType] = useState<string>('');

  const getResponse = (message: string): { content: string; hasFollowUp: boolean } => {
    const lowercaseMessage = message.toLowerCase();
    
    // Check for complex queries first
    if (lowercaseMessage.includes('exam') && (lowercaseMessage.includes('miss') || lowercaseMessage.includes('illness'))) {
      return { content: complexQueryResponses.exam, hasFollowUp: false };
    } else if (lowercaseMessage.includes('refund') && lowercaseMessage.includes('meal')) {
      return { content: complexQueryResponses.refund, hasFollowUp: false };
    } else if (lowercaseMessage.includes('professor') && (lowercaseMessage.includes('respond') || lowercaseMessage.includes('email'))) {
      return { content: complexQueryResponses.professor, hasFollowUp: false };
    } else if (lowercaseMessage.includes('billing') || lowercaseMessage.includes('tuition')) {
      return { content: complexQueryResponses.billing, hasFollowUp: false };
    } else if (lowercaseMessage.includes('work') && lowercaseMessage.includes('international')) {
      return { content: complexQueryResponses.work, hasFollowUp: false };
    } else if (lowercaseMessage.includes('maintenance') || lowercaseMessage.includes('dorm')) {
      return { content: complexQueryResponses.maintenance, hasFollowUp: false };
    } else if (lowercaseMessage.includes('major') && lowercaseMessage.includes('change')) {
      return { content: complexQueryResponses.major, hasFollowUp: false };
    } else if (lowercaseMessage.includes('credit') && lowercaseMessage.includes('internship')) {
      return { content: complexQueryResponses.credit, hasFollowUp: false };
    } else if (lowercaseMessage.includes('mental') || lowercaseMessage.includes('counseling')) {
      return { content: complexQueryResponses.mental, hasFollowUp: false };
    } else if (lowercaseMessage.includes('lost') && lowercaseMessage.includes('id')) {
      return { content: complexQueryResponses.id, hasFollowUp: false };
    } else if ((lowercaseMessage.includes('absent') || lowercaseMessage.includes('absence')) && (lowercaseMessage.includes('email') || lowercaseMessage.includes('topics'))) {
      return { content: complexQueryResponses.absence, hasFollowUp: false };
    } else if (lowercaseMessage.includes('miss') && (lowercaseMessage.includes('class') || lowercaseMessage.includes('lecture') || lowercaseMessage.includes('notes'))) {
      return { content: complexQueryResponses.classNotes, hasFollowUp: false };
    }
    
    // Standard category responses with complexity modes
    let responseData;
    let queryType = '';
    
    if (lowercaseMessage.includes('dining') || lowercaseMessage.includes('food') || lowercaseMessage.includes('cafeteria')) {
      responseData = complexResponses.dining;
      queryType = 'dining';
    } else if (lowercaseMessage.includes('library') || lowercaseMessage.includes('book') || lowercaseMessage.includes('study')) {
      responseData = complexResponses.library;
      queryType = 'library';
    } else if (lowercaseMessage.includes('schedule') || lowercaseMessage.includes('class') || lowercaseMessage.includes('timetable')) {
      responseData = complexResponses.schedule;
      queryType = 'schedule';
    } else if (lowercaseMessage.includes('event') || lowercaseMessage.includes('activity') || lowercaseMessage.includes('club')) {
      responseData = complexResponses.events;
      queryType = 'events';
    } else if (lowercaseMessage.includes('admin') || lowercaseMessage.includes('transcript') || lowercaseMessage.includes('registrar')) {
      responseData = complexResponses.admin;
      queryType = 'admin';
    } else if (lowercaseMessage.includes('more') || lowercaseMessage.includes('detail') || lowercaseMessage.includes('help')) {
      // If asking for more details on last query
      if (lastQueryType && complexResponses[lastQueryType as keyof typeof complexResponses]) {
        const lastResponse = complexResponses[lastQueryType as keyof typeof complexResponses];
        return { content: lastResponse.detailed, hasFollowUp: true };
      }
    }
    
    if (responseData) {
      setLastQueryType(queryType);
      const content = conversationMode === 'detailed' ? responseData.detailed : responseData.basic;
      return { content, hasFollowUp: true };
    }
    
    // Default response with suggestions for difficult queries
    const randomQuery = challengingQueries[Math.floor(Math.random() * challengingQueries.length)];
    return { 
      content: `I'm here to help with campus information! You can ask me about dining services, library resources, class schedules, campus events, or administrative procedures.\n\n💡 **Try asking something more specific like:**\n"${randomQuery}"\n\nOr type "detailed help" for comprehensive information on any topic.`,
      hasFollowUp: false 
    };
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response with enhanced complexity
    setTimeout(() => {
      const response = getResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Add follow-up suggestion if available
      if (response.hasFollowUp && lastQueryType) {
        const followUpData = complexResponses[lastQueryType as keyof typeof complexResponses];
        if (followUpData && followUpData.followUp) {
          setTimeout(() => {
            const followUpMessage: Message = {
              id: (Date.now() + 2).toString(),
              content: `💭 **Quick Follow-up**: ${followUpData.followUp}\n\nType "detailed help" for comprehensive information, or ask me anything else!`,
              isBot: true,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, followUpMessage]);
          }, 1500);
        }
      }
    }, 1000);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col shadow-lg">
      <div className="p-4 border-b bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <h3 className="font-semibold">Campus AI Assistant</h3>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              {message.isBot && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-3 rounded-lg transition-all ${
                  message.isBot
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              {!message.isBot && (
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about dining, library, schedules, events, or admin..."
            className="flex-1"
          />
          <Button onClick={sendMessage} size="icon" className="bg-primary hover:bg-primary-dark">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}