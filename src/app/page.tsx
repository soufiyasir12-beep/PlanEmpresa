import Hero from "@/components/Hero";
import PhilosophyValues from "@/components/PhilosophyValues";
import BentoGrid from "@/components/BentoGrid";
import MarketCompetition from "@/components/MarketCompetition";
import DafoMatrix from "@/components/DafoMatrix";
import MarketingStrategy from "@/components/MarketingStrategy";
import Organigram from "@/components/Organigram";
import OperationsLegal from "@/components/OperationsLegal";
import FinancialPlan from "@/components/FinancialPlan";
import Timeline from "@/components/Timeline";
import ChatbotDemo from "@/components/ChatbotDemo";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F19]">
      <Hero />
      <PhilosophyValues />
      <BentoGrid />
      <MarketCompetition />
      <DafoMatrix />
      <MarketingStrategy />
      <Organigram />
      <OperationsLegal />
      <FinancialPlan />
      <Timeline />
      <ChatbotDemo />
    </main>
  );
}
