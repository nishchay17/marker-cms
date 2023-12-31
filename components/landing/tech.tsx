import { siteConfig } from "@/config/site";

export default function Tech() {
  return (
    <section className="border-y pt-20 pb-24">
      <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-5 px-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 ">
          Technologies
        </span>{" "}
        powering our platform
      </p>
      <div className="flex gap-x-3 gap-y-2 mx-auto justify-center px-6 max-w-3xl flex-wrap">
        {siteConfig.tech.map((tech) => (
          <p
            className="border text-sm md:text-base rounded-lg px-3 py-[2px] cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-100"
            key={tech}
          >
            {tech}
          </p>
        ))}
      </div>
    </section>
  );
}
