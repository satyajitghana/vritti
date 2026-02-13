import { Hero } from '@/components/marketing/hero';
import { Features } from '@/components/marketing/features';
import { Stats } from '@/components/marketing/stats';
import { Showcase } from '@/components/marketing/showcase';
import { CTA } from '@/components/marketing/cta';

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Features />
      <Showcase />
      <CTA />
    </main>
  );
}
