import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import DafoMatrix from "@/components/DafoMatrix";
import Organigram from "@/components/Organigram";
import FinancialPlan from "@/components/FinancialPlan";
import Timeline from "@/components/Timeline";
import ChatbotDemo from "@/components/ChatbotDemo";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F19]">
      <Hero />
      <BentoGrid />
      <DafoMatrix />
      <Organigram />
      <FinancialPlan />
      <Timeline />
      <ChatbotDemo />
    </main>
  );
}
