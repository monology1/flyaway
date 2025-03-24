import Header from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { FlightSearchForm } from '@/components/FlightSearchForm';
import { PromoSection } from '@/components/PromoSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <HeroBanner />
      <FlightSearchForm />
      <PromoSection />
      <Footer />
    </main>
  );
}
