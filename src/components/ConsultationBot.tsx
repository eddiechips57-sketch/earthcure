import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Leaf, Sparkles, HelpCircle, ShieldAlert, Truck, ChevronRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  suggestions?: string[];
  trackingTimeline?: {
    stage: string;
    status: 'done' | 'current' | 'pending';
    desc: string;
  }[];
}

const KNOWLEDGE_BASE: Record<string, { reply: string; suggestions?: string[] }> = {
  'legal': {
    reply: 'Earthcure products are 100% legal under the South African Department of Health regulations. Because our full-spectrum products contain 0.0% THC (the psychoactive compound), you can consume them, pass labor drug screens, and order with zero legal difficulties.',
    suggestions: ['How is it 0.0% THC?', 'Do you ship to Gauteng?']
  },
  'dosage': {
    reply: 'If you are starting out with Earthcure Broad Spectrum Drops, we recommend drawing 5–10 drops (Approx. 10mg - 20mg) sublingually under your tongue, holding it for 60 seconds before swallowing. Use it once daily after your morning wellness or before bedtime.',
    suggestions: ['Which blend for sleep?', 'Open Dosage Simulator']
  },
  'shipping': {
    reply: 'We ship throughout South Africa via carbon-neutral express door-to-door couriers. Delivery is flat-rate R85 under R500, and ENTIRELY FREE for orders of R500 or more! Transit takes 2–3 working days to major metros (JHB, CPT, DBN) and 4 days for outlaying areas.',
    suggestions: ['Track my orders', 'Can I change my address?']
  },
  'malawi': {
    reply: 'Malawi possesses perfect high-altitude organic tropical sunlit soils that allow our industrial hemp agricultural partner cultivators to avoid any synthetic pesticides or chemical solvents entirely. This naturally leads to some of the highest concentrations of beneficial botanical lipoids on Earth!',
    suggestions: ['Are you woman-led?', 'View catalog']
  },
  'anxiety': {
    reply: 'For calming daily work stress or standard mental overstimulation, our Broad Spectrum CBD Drops (600mg or 300mg) are highly recommended. Alternatively, sipping our Relaxing CBD Herbal Tea in the afternoons offers immediate holistic ease.',
    suggestions: ['View Wellness Drops', 'How to steep tea?']
  },
  'sleep': {
    reply: 'If insomnia is your focus, our Relaxing CBD Herbal Tea (steeped 5-7 minutes) combined with 8-10 drops of the Broad Spectrum CBD Oils before lights-out creates the ultimate natural bedtime protocol to optimize deep cellular rest.',
    suggestions: ['Combine tea & drops', 'Is it safe daily?']
  }
};

export default function ConsultationBot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typedInput, setTypedInput] = useState<string>('');
  const [hasNewAlert, setHasNewAlert] = useState<boolean>(true);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  // Keep chat scrolled to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: 'Moni! (Greetings!) I am Nyasa, your Earthcure Botanical Consultation assistant. How can I help you find natural cellular relief today?',
        timestamp: new Date(),
        suggestions: [
          'Is this 100% legal in SA?',
          'What is the standard dosage?',
          'How long does shipping take?',
          'Track existing order "EC-92813-SA"'
        ]
      }
    ]);
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    // Append user query
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setTypedInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!response.ok) {
        throw new Error('API request failing, using fallback');
      }

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: data.text,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.warn('API error, falling back to local rule engine:', error);
      
      // Simulate rule-based response with delay for natural user feel
      await new Promise((resolve) => setTimeout(resolve, 800));

      const lowerText = text.toLowerCase();
      let botText = "I want to make sure I guide you correctly. I can answer inquiries about SA legal compliance, standard dosages, express courier delivery fees, or help you track current parcels! Feel free to reach out to us at 07493208683 on WhatsApp.";
      let suggestions = ['Is this 100% legal in SA?', 'How long does shipping take?', 'What is the standard dosage?'];
      let trackingTimeline: ChatMessage['trackingTimeline'] = undefined;

      // Match logic
      if (lowerText.includes('legal') || lowerText.includes('thc') || lowerText.includes('safe')) {
        botText = KNOWLEDGE_BASE.legal.reply;
        suggestions = KNOWLEDGE_BASE.legal.suggestions!;
      } else if (lowerText.includes('dose') || lowerText.includes('dosage') || lowerText.includes('how many drops')) {
        botText = KNOWLEDGE_BASE.dosage.reply;
        suggestions = KNOWLEDGE_BASE.dosage.suggestions!;
      } else if (lowerText.includes('shipping') || lowerText.includes('delivery') || lowerText.includes('postage') || lowerText.includes('fee')) {
        botText = KNOWLEDGE_BASE.shipping.reply;
        suggestions = KNOWLEDGE_BASE.shipping.suggestions!;
      } else if (lowerText.includes('malawi') || lowerText.includes('grow') || lowerText.includes('source')) {
        botText = KNOWLEDGE_BASE.malawi.reply;
        suggestions = KNOWLEDGE_BASE.malawi.suggestions!;
      } else if (lowerText.includes('anxiety') || lowerText.includes('stress') || lowerText.includes('calm')) {
        botText = KNOWLEDGE_BASE.anxiety.reply;
        suggestions = KNOWLEDGE_BASE.anxiety.suggestions!;
      } else if (lowerText.includes('sleep') || lowerText.includes('insomnia') || lowerText.includes('night')) {
        botText = KNOWLEDGE_BASE.sleep.reply;
        suggestions = KNOWLEDGE_BASE.sleep.suggestions!;
      } else if (lowerText.includes('track') || lowerText.includes('ec-92813-sa') || lowerText.includes('order')) {
        botText = 'Parcels are tracked live. Let me query our South African Speedpost dispatch ledger for package reference: "EC-92813-SA".';
        suggestions = ['Can I change physical address?', 'How is shipping calculated?'];
        trackingTimeline = [
          { stage: 'Order Processing', status: 'done', desc: 'Secure payment cleared. Sourcing active legal Industrial Hemp permit numbers.' },
          { stage: 'Cape Town Labs', status: 'done', desc: 'Sachet certification check complete. Sealed carefully in custom botanical carbon cases.' },
          { stage: 'Courier In Transit', status: 'current', desc: 'Dispatched with Carbon-Neutral Express Speedpost Cargo. Currently traversing Karoo corridor.' },
          { stage: 'Estimated Doorstep Drop', status: 'pending', desc: 'Expected delivery inside 24-48 hours.' }
        ];
      }

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: botText,
        timestamp: new Date(),
        suggestions,
        trackingTimeline
      };

      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOpenBot = () => {
    setIsOpen(true);
    setHasNewAlert(false);
  };

  return (
    <>
      {/* Floating launcher bubble */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden font-sans">
        <button
          onClick={handleOpenBot}
          className="relative group p-4 bg-[#D4AF37] hover:bg-[#E9E4D9] text-[#1B2D2A] rounded-full shadow-2xl transition duration-300 hover:scale-105 active:scale-95 border-2 border-[#1B2D2A] flex items-center justify-center cursor-pointer"
        >
          <MessageSquare className="w-6 h-6 shrink-0" />
          
          {/* Active notification indicator */}
          {hasNewAlert && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border border-[#1B2D2A] text-[8px] font-bold text-white items-center justify-center">1</span>
            </span>
          )}

          {/* Gentle expert label tooltip */}
          <span className="absolute right-14 bg-[#1B2D2A] text-white text-[9px] font-mono tracking-widest uppercase px-3 py-1.5 border border-[#2D4540] rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-xl">
            ✓ Interactive Helpdesk
          </span>
        </button>
      </div>

      {/* Slide consultation panel drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[360px] max-w-[calc(100vw-32px)] h-[500px] bg-[#1B2D2A] border border-[#2A423D] shadow-2xl z-50 flex flex-col justify-between overflow-hidden text-[#E9E4D9] rounded-2xl font-sans"
          >
            {/* Header portion */}
            <div className="p-4 bg-[#253A36] border-b border-[#2D4540]/60 flex items-center justify-between text-left">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#1B2D2A] rounded-lg border border-[#2D4540] flex items-center justify-center text-[#D4AF37]">
                  <Leaf className="w-4.5 h-4.5 fill-[#D4AF37]/15" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#E9E4D9] flex items-center gap-1.5 leading-none">
                    Nyasa Guide <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                  </h4>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold block pt-1 uppercase tracking-wider">
                    ● Naturalist Botanical Support Live
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[#1B2D2A]/60 rounded text-[#E9E4D9]/60 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat list context */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-left scrollbar-thin">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-2">
                  <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#D4AF37] text-[#1B2D2A] rounded-tr-none font-medium'
                          : 'bg-[#253A36]/80 text-[#E9E4D9] rounded-tl-none border border-[#2D4540]/60'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span
                        className={`text-[8px] font-mono block mt-1.5 text-right ${
                          msg.sender === 'user' ? 'text-[#1B2D2A]/60' : 'text-[#E9E4D9]/40'
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  {/* Render tracking timeline if parsed */}
                  {msg.trackingTimeline && (
                    <div className="pl-3 py-2 border-l-2 border-[#2D4540] space-y-3 font-sans">
                      {msg.trackingTimeline.map((track, i) => (
                        <div key={i} className="space-y-0.5 relative">
                          <div className="flex items-center gap-1.5 text-[10px]">
                            {track.status === 'done' ? (
                              <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            ) : track.status === 'current' ? (
                              <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping shrink-0" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-gray-600" />
                            )}
                            <span
                              className={`font-mono uppercase font-bold tracking-wide ${
                                track.status === 'current' ? 'text-[#D4AF37]' : 'text-[#E9E4D9]'
                              }`}
                            >
                              {track.stage}
                            </span>
                          </div>
                          <p className="text-[9px] text-[#E9E4D9]/60 leading-normal pl-4">
                            {track.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Dynamic user suggestions */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(sug)}
                          className="bg-[#1B2D2A] hover:bg-[#253A36] border border-[#2D4540] px-2.5 py-1.5 text-[10px] rounded-full text-left font-sans text-[#D4AF37] hover:text-[#E9E4D9] transition duration-150 leading-tight cursor-pointer"
                        >
                          {sug} <ChevronRight className="w-2.5 h-2.5 inline text-[10px]/60" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#253A36]/50 text-[#E9E4D9]/75 rounded-2xl rounded-tl-none border border-[#2D4540]/40 p-3 text-xs flex items-center gap-2">
                    <span className="flex gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#D4AF37]">Nyasa is consulting...</span>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Bottom input area form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(typedInput);
              }}
              className="p-3 bg-[#253A36] border-t border-[#2D4540]/60 flex gap-2 font-sans"
            >
              <input
                type="text"
                placeholder="Ask e.g. shipping fees, sleep dosage..."
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#1B2D2A] border border-[#2D4540] text-xs text-[#E9E4D9] placeholder-[#E9E4D9]/30 rounded-none focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="p-2.5 bg-[#D4AF37] hover:bg-[#E9E4D9] text-[#1B2D2A] transition rounded-none flex items-center justify-center cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
