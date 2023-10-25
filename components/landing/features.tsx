import { siteConfig } from "@/config/site";
import Image from "next/image";

import img from "../../public/img/landing.png";
import FeatureCard, { FeatureType } from "./feature-card";

export default function Features() {
  return (
    <section className="container">
      <div className="md:w-4/5 mx-auto">
        <Image
          alt="Task page"
          src={img}
          quality={100}
          draggable={false}
          className="border rounded-xl md:rounded-2xl shadow-md -mt-20 select-none"
        />
        <div className="flex overflow-auto scroll-smooth md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-20">
          {siteConfig.features.map((feature: FeatureType) => (
            <FeatureCard {...feature} key={feature.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
