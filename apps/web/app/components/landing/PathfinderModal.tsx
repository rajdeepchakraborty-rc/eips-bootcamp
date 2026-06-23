'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, ChevronRight, ArrowRight, Sparkles, BookOpen, Cpu, Shield, Brain, Code, Globe, RotateCcw } from 'lucide-react';

interface PathfinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (level: string) => void;
}

const questions = [
  {
    id: 1,
    title: "What best describes your current Ethereum knowledge?",
    options: [
      { text: "Absolute Beginner - I'm just getting started", score: 0, icon: BookOpen },
      { text: "Intermediate - I know the basics & understand the ecosystem", score: 1, icon: Cpu },
      { text: "Advanced - I understand the EVM and protocol architecture", score: 2, icon: Brain },
    ]
  },
  {
    id: 2,
    title: "Have you ever written or deployed a smart contract?",
    options: [
      { text: "No, I haven't coded in Web3 yet", score: 0, icon: BookOpen },
      { text: "Yes, I've deployed basic contracts following tutorials", score: 1, icon: Code },
      { text: "Yes, I've built complex dApps or audited contracts", score: 2, icon: Shield },
    ]
  },
  {
    id: 3,
    title: "Which programming languages are you most comfortable with?",
    options: [
      { text: "None / Just HTML, CSS, or basic scripting", score: 0, icon: Globe },
      { text: "JavaScript, TypeScript, Python, etc.", score: 1, icon: Code },
      { text: "Solidity, Rust, Go, or C++", score: 2, icon: Cpu },
    ]
  },
  {
    id: 4,
    title: "What are you most interested in doing in the Ethereum ecosystem?",
    options: [
      { text: "Learning how the blockchain works under the hood", score: 0, icon: BookOpen },
      { text: "Writing, optimizing, and deploying smart contracts", score: 1, icon: Code },
      { text: "Contributing to protocol upgrades & core research", score: 2, icon: Brain },
    ]
  },
  {
    id: 5,
    title: "How familiar are you with Ethereum Improvement Proposals (EIPs)?",
    options: [
      { text: "I'm not sure what they are", score: 0, icon: BookOpen },
      { text: "I know about popular token standards like ERC-20", score: 1, icon: Globe },
      { text: "I actively read, discuss, or contribute to EIPs", score: 2, icon: Brain },
    ]
  },
  {
    id: 6,
    title: "Which of these sounds like your ideal next step?",
    options: [
      { text: "Understanding Wallets, Transactions, & Gas", score: 0, icon: BookOpen },
      { text: "Deep diving into ERC standards & Security", score: 1, icon: Shield },
      { text: "Understanding consensus mechanisms and Governance", score: 2, icon: Brain },
    ]
  }
];

type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export function PathfinderModal({ isOpen, onClose, onComplete }: PathfinderModalProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setAnswers([]);
      setShowResult(false);
      setIsAnimating(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOptionSelect = (score: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      } else {
        const finalScore = newAnswers.reduce((a, b) => a + b, 0);
        let finalLevel = 'Beginner';
        if (finalScore >= 5 && finalScore <= 8) finalLevel = 'Intermediate';
        if (finalScore >= 9) finalLevel = 'Advanced';

        setShowResult(true);
        setIsAnimating(false);
        if (onComplete) {
          onComplete(finalLevel);
        }
      }
    }, 600); // Wait for exit animation
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  
  let resultLevel: Level = 'Beginner';
  if (totalScore >= 5 && totalScore <= 8) resultLevel = 'Intermediate';
  if (totalScore >= 9) resultLevel = 'Advanced';

  const flowchartData = {
    Beginner: {
      track: "Ethereum Fundamentals",
      description: "Start your journey by understanding the core concepts of the blockchain.",
      steps: ["Cryptography Basics", "Wallets & Transactions", "Intro to Smart Contracts"]
    },
    Intermediate: {
      track: "EIPs & Smart Contracts",
      description: "Level up by diving deep into Ethereum standards and contract development.",
      steps: ["Solidity Deep Dive", "ERC Standards (20, 721, 1155)", "Smart Contract Security"]
    },
    Advanced: {
      track: "Governance & Research",
      description: "Join the frontier. Understand protocol-level decisions and core architecture.",
      steps: ["Ethereum Architecture", "Consensus & Rollups", "Participating in Governance"]
    }
  };

  const result = flowchartData[resultLevel];

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleStartJourney = () => {
    setIsAnimating(true);
    setTimeout(() => {
      router.push(`/dashboard/marketplace?level=${resultLevel}`);
      onClose();
    }, 300);
  };

  const handleRetakeQuiz = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(0);
      setAnswers([]);
      setShowResult(false);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div 
        className="relative w-full max-w-3xl bg-card border border-emerald-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh] max-h-[700px] min-h-[500px]"
        style={{
          boxShadow: '0 0 40px rgba(16, 185, 129, 0.1), inset 0 1px 0 rgba(16, 185, 129, 0.1)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="text-emerald-400" size={20} />
            <h2 className="text-lg font-bold text-foreground">Pathfinder</h2>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto relative p-4 sm:p-8">
          
          {!showResult ? (
            // Questions Phase
            <div className="min-h-full flex flex-col max-w-2xl mx-auto w-full pb-8">
              {/* Progress */}
              <div className="mb-6 sm:mb-8 flex-shrink-0">
                <div className="flex justify-between text-xs font-semibold text-emerald-500 mb-2 tracking-wider uppercase">
                  <span>Question {currentStep + 1} of {questions.length}</span>
                  <span>{Math.round(((currentStep) / questions.length) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div 
                key={currentStep}
                className={`flex-1 flex flex-col justify-start transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground mb-6 sm:mb-8 leading-tight">
                  {questions[currentStep].title}
                </h3>
                
                <div className="space-y-3 sm:space-y-4 w-full">
                  {questions[currentStep].options.map((option, idx) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(option.score)}
                        disabled={isAnimating}
                        className="w-full text-left p-4 sm:p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 group flex items-center gap-3 sm:gap-4"
                      >
                        <div className="p-2 sm:p-3 rounded-lg bg-white/5 group-hover:bg-emerald-500/20 text-gray-400 group-hover:text-emerald-400 transition-colors flex-shrink-0">
                          <Icon size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="flex-1 text-sm sm:text-base md:text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
                          {option.text}
                        </span>
                        <ChevronRight className="text-emerald-500 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            // Result Phase
            <div className={`min-h-full flex flex-col items-center justify-center text-center py-10 transition-all duration-700 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-6 relative">
                <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20" />
                <Sparkles className="text-emerald-400 relative z-10 w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              
              <p className="text-emerald-400 font-bold tracking-wider uppercase text-xs sm:text-sm mb-2">
                Level: {resultLevel}
              </p>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
                {result.track}
              </h3>
              <p className="text-gray-400 max-w-md mx-auto mb-10 text-base sm:text-lg">
                {result.description}
              </p>

              {/* CSS Flowchart */}
              <div className="w-full max-w-lg mx-auto relative flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-0 mb-10">
                {/* Connecting Line (Desktop) */}
                <div className="hidden sm:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-white/10 -translate-y-1/2" />
                <div className="hidden sm:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-emerald-500 -translate-y-1/2 origin-left animate-[scale-x_1.5s_ease-out_forwards]" />
                
                {/* Connecting Line (Mobile) */}
                <div className="sm:hidden absolute top-[10%] bottom-[10%] left-1/2 w-0.5 bg-white/10 -translate-x-1/2" />
                <div className="sm:hidden absolute top-[10%] bottom-[10%] left-1/2 w-0.5 bg-emerald-500 -translate-x-1/2 origin-top animate-[scale-y_1.5s_ease-out_forwards]" />

                {result.steps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className="relative z-10 flex flex-col items-center gap-2 sm:gap-3 bg-card p-2 animate-[fade-in-up_0.5s_ease-out_forwards]"
                    style={{ animationDelay: `${idx * 400}ms`, opacity: 0 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-background border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                      <span className="text-emerald-400 font-bold text-sm">{idx + 1}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-300 max-w-[100px] text-center leading-tight">
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-center gap-4">
                <button 
                  onClick={handleRetakeQuiz}
                  className="px-6 sm:px-8 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 font-bold hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                >
                  <RotateCcw size={18} />
                  Retake Quiz
                </button>
                
                <button 
                  onClick={handleStartJourney}
                  className="px-6 sm:px-8 py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors flex items-center gap-2 group shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  Start Journey
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
