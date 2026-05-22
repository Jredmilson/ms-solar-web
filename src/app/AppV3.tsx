import { HeaderV3 } from './components/v3/HeaderV3';
import { HeroV3 } from './components/v3/HeroV3';
import { Benefits } from './components/v3/Benefits';
import { SimulationV3 } from './components/v3/SimulationV3';
import { HowItWorks } from './components/v3/HowItWorks';
import { Testimonials } from './components/v3/Testimonials';
import { FAQ } from './components/v3/FAQ';
import { FinalCTA } from './components/v3/FinalCTA';
import { FooterV3 } from './components/v3/FooterV3';
import { WhatsAppFloat } from './components/v3/WhatsAppFloat';

export default function AppV3() {
  return (
    <div className="min-h-screen">
      <HeaderV3 />
      <HeroV3 />
      <Benefits />
      <SimulationV3 />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <FooterV3 />
      <WhatsAppFloat />
    </div>
  );
}
