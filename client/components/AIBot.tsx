import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, MessageCircle, Send, Loader } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FAQ_RESPONSES: Record<string, string> = {
  'how do i create an employee': 'To create an employee: Go to Employees > Add Employee, fill in their details (name, email, department, position), and click Save.',
  'how do i run payroll': 'To run payroll: Navigate to Payroll > Process Now, select the month, review the details, and click Process Payroll.',
  'what is ai resume screening': 'AI Resume Screening automatically analyzes resumes using NLP, ranks candidates, extracts skills, and provides match scores with job descriptions.',
  'how do i view attendance': 'To view attendance: Go to Attendance Tracking, select a date or date range, and view employee check-ins and check-outs.',
  'what are the roles': 'HRMS AI supports 5 roles: Admin (full access), Manager (team oversight), HR (HR operations), Recruiter (hiring), and Employee (personal dashboard).',
  'how do i schedule an interview': 'Go to AI Tools > Voice Interview, select a candidate, customize questions, choose a date/time, and send the interview link.',
  'what is predictive analytics': 'Predictive Analytics forecasts attrition rates, hiring needs, payroll trends, and workforce changes using AI/ML models.',
  'how do i check performance scores': 'Navigate to Analytics > Performance by Department or Dashboard > AI Insights to view AI-driven performance evaluations.',
  'how do i manage benefits': 'Go to Benefits Management, select an employee, choose benefit plans, set coverage amounts, and save.',
  'what about data security': 'HRMS AI uses JWT authentication, role-based access control, data encryption, OAuth 2.0, and follows enterprise security standards.',
};

export default function AIBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm your HR Assistant. Ask me anything about HRMS AI features, how to use the platform, or HR best practices!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Check for exact matches or partial matches
    for (const [key, value] of Object.entries(FAQ_RESPONSES)) {
      if (lowerMessage.includes(key)) {
        return value;
      }
    }

    // Default responses for common questions
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return "I can help you with:\n• Creating and managing employees\n• Running payroll\n• AI resume screening\n• Attendance tracking\n• Performance evaluations\n• Interview scheduling\n• Benefits management\n• And much more! Ask me anything specific.";
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! 👋 How can I assist you with HRMS AI today?";
    }

    if (lowerMessage.includes('thank')) {
      return "You're welcome! 😊 Let me know if you need any other help.";
    }

    // If no match found
    return "I'm here to help! Try asking about specific features like 'How do I create an employee?', 'How do I run payroll?', or 'What is AI resume screening?'";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {/* Bot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center text-white"
        aria-label="Open chat bot"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Bot Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-h-[600px] bg-card border border-border rounded-2xl shadow-2xl shadow-primary/20 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-t-2xl text-white">
            <h3 className="font-bold flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              HR Assistant Bot
            </h3>
            <p className="text-xs text-white/80 mt-1">
              AI-powered help & FAQ
            </p>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[460px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-background text-foreground border border-border rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user'
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-background text-foreground border border-border px-4 py-2 rounded-lg rounded-bl-none">
                  <Loader className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 rounded-b-2xl space-y-2">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="bg-background border-border focus:border-primary"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              💡 Tip: Ask about features or how to use HRMS AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}
