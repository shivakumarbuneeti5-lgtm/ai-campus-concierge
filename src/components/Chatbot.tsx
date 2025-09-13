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

const sampleResponses = {
  dining: "The main dining hall is open from 7 AM to 9 PM. Today's menu includes grilled chicken, vegetarian pasta, and a fresh salad bar. The coffee shop in the library is open 24/7!",
  library: "The library is open 24/7 during exam periods. Regular hours are 6 AM to midnight. You can reserve study rooms online through the student portal. All digital resources are accessible remotely.",
  schedule: "Your next class is Mathematics 101 at 2:00 PM in Building A, Room 204. You have a project deadline for Computer Science tomorrow at 11:59 PM.",
  events: "Upcoming events this week: Career Fair (Wednesday 10 AM-4 PM), Movie Night (Friday 7 PM), and Student Council Meeting (Thursday 3 PM).",
  admin: "For transcript requests, visit the Registrar's Office in Building B, 2nd floor. Office hours are 9 AM-5 PM. You can also submit requests online through the student portal."
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

  const getResponse = (message: string): string => {
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes('dining') || lowercaseMessage.includes('food') || lowercaseMessage.includes('cafeteria')) {
      return sampleResponses.dining;
    } else if (lowercaseMessage.includes('library') || lowercaseMessage.includes('book') || lowercaseMessage.includes('study')) {
      return sampleResponses.library;
    } else if (lowercaseMessage.includes('schedule') || lowercaseMessage.includes('class') || lowercaseMessage.includes('timetable')) {
      return sampleResponses.schedule;
    } else if (lowercaseMessage.includes('event') || lowercaseMessage.includes('activity') || lowercaseMessage.includes('club')) {
      return sampleResponses.events;
    } else if (lowercaseMessage.includes('admin') || lowercaseMessage.includes('transcript') || lowercaseMessage.includes('registrar')) {
      return sampleResponses.admin;
    } else {
      return "I'm here to help with campus information! You can ask me about dining services, library resources, class schedules, campus events, or administrative procedures. What specific information do you need?";
    }
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

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
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