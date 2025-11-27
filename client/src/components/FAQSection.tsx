import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, ShoppingBag, Lock, RefreshCw, Mail, Phone } from "lucide-react";

// FAQ data structure with proper TypeScript typing
interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  category: string;
  icon: React.ElementType;
  questions: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    category: "সাধারণ জিজ্ঞাসা",
    icon: HelpCircle,
    questions: [
      {
        q: "ASG Compressed Note আসলে কী?",
        a: "এটি মূলত এইচএসসি (HSC) এবং ভর্তি পরীক্ষার্থীদের জন্য তৈরি একটি ডিজিটাল শিক্ষা উপকরণ বা নোট সিরিজ। বিশাল সিলেবাসকে ছোট করে (Compress) পরীক্ষার শেষ মুহূর্তের প্রস্তুতির জন্য সহজভাবে এখানে উপস্থাপন করা হয়েছে।"
      },
      {
        q: "আমি কি এখান থেকে হার্ডকপি (Printed Book) অর্ডার করতে পারব?",
        a: "asgcompressednote.com মূলত ই-বুক (PDF) বা ডিজিটাল নোট প্রোভাইড করে। যদি কোনো পণ্যের বিবরণে (Description) হার্ডকপি বা প্রিন্টেড ভার্সনের কথা উল্লেখ থাকে, তবেই সেটি বই আকারে পাওয়া যাবে। সাধারণত আমাদের নোটগুলো পিডিএফ ফরম্যাটে থাকে।"
      },
      {
        q: "নোটগুলো কি সব ডিভাইসে সাপোর্ট করবে?",
        a: "হ্যাঁ, আমাদের পিডিএফ বা ই-বুকগুলো যেকোনো স্মার্টফোন, ট্যাবলেট, ল্যাপটপ বা পিসিতে ওপেন করা যাবে।"
      }
    ]
  },
  {
    category: "অর্ডার ও পেমেন্ট",
    icon: ShoppingBag,
    questions: [
      {
        q: "আমি কীভাবে নোট কিনব?",
        a: "পছন্দের নোটটি সিলেক্ট করে 'Add to Cart'-এ ক্লিক করুন। এরপর চেকআউট পেজে গিয়ে আপনার নাম, ফোন নম্বর ও ইমেইল দিয়ে পেমেন্ট সম্পন্ন করুন।"
      },
      {
        q: "পেমেন্ট করার পদ্ধতিগুলো কী কী?",
        a: "আমরা বিকাশ (bKash), নগদ (Nagad), রকেট (Rocket) এবং অন্যান্য মোবাইল ব্যাংকিং বা কার্ড পেমেন্ট গ্রহণ করে থাকি।"
      },
      {
        q: "পেমেন্ট করার পর নোটটি কীভাবে পাব?",
        a: "পেমেন্ট সফল হওয়ার সাথে সাথে আপনার দেওয়া ইমেইলে নোটের ডাউনলোড লিংক বা অ্যাক্সেস পাঠিয়ে দেওয়া হবে। এ ছাড়া ওয়েবসাইটে আপনার অ্যাকাউন্টে লগইন করেও 'My Books' বা 'My Orders' অপশন থেকে নোটটি ডাউনলোড করতে পারবেন।"
      }
    ]
  },
  {
    category: "অ্যাক্সেস ও টেকনিক্যাল সমস্যা",
    icon: Lock,
    questions: [
      {
        q: "টাকা কেটেছে কিন্তু নোট/বই পাইনি, এখন কী করব?",
        a: "চিন্তার কিছু নেই। সার্ভার সমস্যার কারণে ইমেইল আসতে দেরি হতে পারে। আপনি ওয়েবসাইটের ফুটারের 'Find/Recover My Account/Books' অপশনটি ব্যবহার করে দেখতে পারেন। এরপরও সমস্যা থাকলে আমাদের হেল্পলাইন বা ইমেইলে পেমেন্টের প্রমাণসহ যোগাযোগ করুন।"
      },
      {
        q: "আমি কি আমার কেনা নোটটি বন্ধুদের সাথে শেয়ার করতে পারব?",
        a: "না, এটি কপিরাইট আইনের লঙ্ঘন। আপনার কেনা নোটটি শুধুমাত্র আপনার ব্যক্তিগত ব্যবহারের জন্য। অননুমোদিত শেয়ার বা ডিস্ট্রিবিউশন করলে আপনার অ্যাকাউন্ট বাতিল হতে পারে।"
      },
      {
        q: "অ্যাকাউন্টের পাসওয়ার্ড ভুলে গেছি, রিকভার করব কীভাবে?",
        a: "লগইন পেজের 'Forgot Password' অপশনে ক্লিক করে আপনার ইমেইল বা ফোন নম্বর দিন। সেখানে পাসওয়ার্ড রিসেট করার নির্দেশনা পাঠানো হবে।"
      }
    ]
  },
  {
    category: "রিফান্ড ও পলিসি",
    icon: RefreshCw,
    questions: [
      {
        q: "নোট পছন্দ না হলে কি টাকা ফেরত (Refund) পাব?",
        a: "যেহেতু এটি একটি ডিজিটাল পণ্য (Digital Product), তাই একবার কেনার পর সাধারণত কোনো রিফান্ড বা টাকা ফেরত দেওয়া হয় না। কেনার আগে দয়া করে প্রিভিউ বা স্যাম্পল দেখে নিশ্চিত হয়ে নিন।"
      },
      {
        q: "ভুল করে একই নোট দুইবার কিনে ফেলেছি, এখন কী হবে?",
        a: "এমনটি হলে আমাদের সাপোর্ট টিমে যোগাযোগ করুন। আমরা বিষয়টি যাচাই করে আপনাকে সহায়তা করব।"
      }
    ]
  }
];

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div className="relative">
        {/* Glow effect on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
        
        <div className="relative bg-card/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          {/* Question Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-6 flex items-start justify-between gap-4 text-left group/button"
          >
            <span className="text-base md:text-lg font-bold text-foreground group-hover/button:text-primary transition-colors duration-300 leading-relaxed">
              {question}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-shrink-0 mt-1"
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isOpen 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-muted text-muted-foreground group-hover/button:bg-primary/10 group-hover/button:text-primary'
              }`}>
                <ChevronDown size={20} />
              </div>
            </motion.div>
          </button>

          {/* Answer Panel with smooth animation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-0">
                  <div className="border-t border-border/50 pt-4">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom accent line */}
          <div className={`h-[2px] bg-gradient-to-r from-primary via-secondary to-accent transform transition-all duration-500 origin-left ${
            isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}></div>
        </div>
      </div>
    </motion.div>
  );
};

const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden bg-background/50">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] -top-48 -left-48 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] -bottom-48 -right-48 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1000ms' }}></div>
        <div className="absolute w-96 h-96 top-1/3 right-1/4 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1500ms' }}></div>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/80 backdrop-blur-md border border-border text-primary text-xs font-bold uppercase tracking-wider shadow-xl mb-6">
            <HelpCircle size={14} className="animate-pulse" />
            <span>সাহায্য কেন্দ্র</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight">
            প্রায়শই জিজ্ঞাসিত{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              প্রশ্নাবলী
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-medium">
            আপনার সকল প্রশ্নের উত্তর এখানে পাবেন। আরও সাহায্যের জন্য আমাদের সাথে যোগাযোগ করুন।
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {faqData.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
                  activeCategory === index
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105'
                    : 'bg-card/50 backdrop-blur-xl text-muted-foreground border-border hover:border-primary/30 hover:text-foreground hover:bg-card'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} />
                <span>{category.category}</span>
              </motion.button>
            );
          })}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {faqData[activeCategory].questions.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.q}
                  answer={item.a}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-30"></div>
            <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                আরও কিছু জানার আছে?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                আমাদের সাপোর্ট টিম সবসময় আপনাকে সাহায্য করতে প্রস্তুত
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="flex items-center gap-2 bg-primary hover:bg-red-600 text-primary-foreground px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/20">
                  <Mail size={18} />
                  <span>ইমেইল করুন</span>
                </button>
                <button className="flex items-center gap-2 bg-secondary hover:bg-orange-600 text-secondary-foreground px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg">
                  <Phone size={18} />
                  <span>কল করুন</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;