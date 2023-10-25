import FormExample from "@/components/formExample";
import {
  LandingNav,
  Hero,
  Features,
  Tech,
  CallForAction,
} from "@/components/landing";

export default function Home() {
  return (
    <>
      <LandingNav />
      <Hero />
      <Features />
      <Tech />
      <CallForAction />
    </>
  );
}
