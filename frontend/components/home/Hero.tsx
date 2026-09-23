import Container from "../common/Container";
import HeroBadge from "./HeroBadge";
import HeroHeading from "./HeroHeading";
import HeroDescription from "./HeroDescription";
import HeroButtons from "./HeroButtons";
import HeroFeatures from "./HeroFeatures";
import HeroStats from "./HeroStats";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-24 transition-colors duration-300 dark:bg-slate-900">
      <Container>
        <div className="grid min-h-[90vh] items-center gap-10 lg:grid-cols-2">

          <div>
            <HeroBadge />
            <HeroHeading />
            <HeroDescription />
            <HeroButtons />
            <HeroFeatures />
            <HeroStats />
          </div>

          <HeroImage />
        </div>
      </Container>
    </section>
  );
}