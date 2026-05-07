import Reveal from "./Reveal";

const Leadership = () => {
  const leaders = [
    {
      name: "Sachin Tiwari",
      role: "Director",
      bio: "Leading the company with strategic vision and operational excellence.",
      image: "/images/SachinTiwari.jpg",
    },
    {
      name: "Akash Singh",
      role: "Director",
      bio: "Driving innovation and strategic initiatives across the organization.",
      image: "/images/AkashSingh.jpg",
    },
    {
      name: "Vishnu Kant Agnihotri",
      role: "Regional Sales Manager",
      bio: "5 years of experience in pharmaceutical sales, driving regional growth and building strong client relationships.",
      image: "/images/VishnuKantAgnihotri.jpg",
    },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-32 bg-bg border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Reveal>
            <p className="section-label">Our Leadership</p>
          </Reveal>
          <Reveal delayClass="delay-100">
            <h2 className="section-title">The Visionaries Behind Kalyam</h2>
          </Reveal>
          <Reveal delayClass="delay-200">
            <div className="divider mx-auto mt-5"></div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
          {leaders.map((person, i) => (
            <Reveal key={i} delayClass={`delay-${i * 100}`}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-border group">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-ink mb-1">
                    {person.name}
                  </h3>
                  <p className="text-primary font-semibold text-sm mb-4 uppercase tracking-wider">
                    {person.role}
                  </p>
                  <p className="text-muted text-sm leading-relaxed">
                    {person.bio}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
