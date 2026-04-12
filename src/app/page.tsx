import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ContentTabs } from "@/components/ContentTabs";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
        <Hero />
        <About />
        <ContentTabs />
        <Contact />
    </main>
  );
}
