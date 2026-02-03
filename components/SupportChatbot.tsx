'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface QuickQuestion {
  id: string;
  question: string;
  answer: string;
}

const defaultQuestions: QuickQuestion[] = [
  {
    id: '1',
    question: 'What are the benefits of Shilajit?',
    answer: 'Shilajit is rich in fulvic acid and minerals. It helps boost energy, improve stamina, support cognitive function, and enhance overall vitality. Our premium Himalayan Shilajit is lab-verified for purity and potency.',
  },
  {
    id: '2',
    question: 'How do I use Ashwagandha gummies?',
    answer: 'Take 1-2 gummies daily with water, preferably in the morning or as directed. Each gummy contains standardized KSM-66 Ashwagandha extract. Do not exceed recommended dosage.',
  },
  {
    id: '3',
    question: 'Are your products safe?',
    answer: 'Yes! All our products are 100% pure, lab-verified, and pharmaceutical-grade. We follow strict quality standards and provide certificates of analysis for every batch.',
  },
  {
    id: '4',
    question: 'What is the shipping time?',
    answer: 'We ship within 1-2 business days. Delivery typically takes 3-5 business days within India via Delhivery. You can track your order in real-time.',
  },
  {
    id: '5',
    question: 'Do you offer returns?',
    answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied, contact our support team for hassle-free returns.',
  },
  {
    id: '6',
    question: 'Are there any side effects?',
    answer: 'Our products are natural and generally well-tolerated. However, if you\'re pregnant, nursing, or on medications, consult your healthcare provider before use.',
  },
  {
    id: '7',
    question: 'How do I contact support?',
    answer: 'You can reach us via WhatsApp, email, or through this chat. Our support team is available to help with any questions or concerns.',
  },
  {
    id: '8',
    question: 'Do you have bulk orders?',
    answer: 'Yes! We offer wholesale pricing for bulk orders. Contact our sales team for custom quotes and special pricing.',
  },
];

export default function SupportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      type: 'bot',
      text: 'Hello! 👋 Welcome to Agnishila support. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [questions, setQuestions] = useState<QuickQuestion[]>(defaultQuestions);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuestionClick = (question: QuickQuestion) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: question.question,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Add bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: question.answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: userInput,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');

    // Try to find a matching question
    setTimeout(() => {
      const matchedQuestion = questions.find((q) =>
        q.question.toLowerCase().includes(userInput.toLowerCase()) ||
        userInput.toLowerCase().includes(q.question.toLowerCase())
      );

      let botResponse = matchedQuestion?.answer || 
        'Thanks for your question! For more detailed support, please contact us via WhatsApp or email. Our team will be happy to help!';

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: botResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  return (
    <>
      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 w-96 max-w-[calc(100vw-2rem)] bg-jet-900 border border-jet-800 rounded-lg shadow-2xl flex flex-col z-40 h-[600px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Agnishila Support</h3>
                <p className="text-xs text-primary-100">We're here to help!</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-jet-950">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary-500 text-white rounded-br-none'
                        : 'bg-jet-800 text-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="px-4 py-3 border-t border-jet-800 bg-jet-900 max-h-40 overflow-y-auto">
                <p className="text-xs text-gray-400 mb-2 font-semibold">Quick Questions:</p>
                <div className="space-y-2">
                  {questions.slice(0, 3).map((question) => (
                    <button
                      key={question.id}
                      onClick={() => handleQuestionClick(question)}
                      className="w-full text-left text-xs bg-jet-800 hover:bg-jet-700 text-gray-300 hover:text-white p-2 rounded transition-colors"
                    >
                      {question.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-jet-800 p-3 bg-jet-900 rounded-b-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your question..."
                  className="flex-1 bg-jet-800 border border-jet-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full shadow-lg z-40 transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </>
  );
}
