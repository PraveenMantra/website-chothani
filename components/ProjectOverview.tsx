import Image from "next/image";

export default function ProjectOverview() {
  return (
    // <section id="about-us" className="relative bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 mt-[200px]">
        {/* LEFT: Decorative key + skyline */}
        <div className="lg:col-span-5 flex items-start justify-center">
          <div className="relative w-full max-w-[460px]">
            <Image
              src="/Images/project_overview.png"  // big key foreground
              alt=""
              width={380}
              height={220}
              className="absolute -left-10 bottom-[-10px] w-[300px] sm:w-[360px] h-auto"
            />
          </div>
        </div>

        {/* RIGHT: Text content */}
        <div className="lg:col-span-7">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3C14]">
            PROJECT OVERVIEW
          </h2>

          <p className="mt-4 text-[15px] leading-7 text-neutral-700">
            Introducing <b>27 Palazzo</b>, a landmark residential development by
            <b> Chothani BuildCorp Pvt. Ltd.</b> Located in Chembur East, this project
            blends architectural elegance, spacious design, and premium fittings to
            redefine modern urban living.
          </p>

          <ul className="mt-6 space-y-3 text-[15px]">
            {[
              { label: "Configuration", value: "3 BHK Apartments" },
              { label: "Carpet Area", value: "1500 sq. ft. (approx.)" },
              { label: "Starting Price", value: "₹6 Cr ++" },
              { label: "Finishing", value: "With Basic Fittings" },
              { label: "RERA Registered Project", value: "(ID to be inserted if available)" },
            ].map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span className="mt-1 inline-block size-3 rounded-full bg-[#1AAE49] ring-2 ring-[#0a7a30]" />
                <span>
                  <b>{item.label}:</b> {item.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    // </section>
  );
}
