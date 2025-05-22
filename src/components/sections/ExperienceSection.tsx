'use client';

const experiences = [
  {
    title: "Frontend Developer",
    company: "Drift Consult",
    period: "January 2025 - Present",
    description: "Working on responsive web applications using React and modern frontend technologies. Contributing to the development of Rack, a cloud-based POS system that streamlines retail businesses by providing access to features and data from anywhere. Rack integrates physical stores with e-commerce websites, allowing seamless inventory management and payment processing.",
    link: "https://www.rack.business/"
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 overflow-hidden relative">
      <div className="absolute inset-0 z-0 bg-grid" aria-hidden="true" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="h-px w-10 bg-primary"></div>
            <span className="text-primary font-mono text-sm tracking-wider">MY JOURNEY</span>
            <div className="h-px w-10 bg-primary"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          
          <p className="text-muted max-w-2xl mx-auto">
            My professional experience where I apply my skills to create impactful solutions.
          </p>
        </div>
        
        <div className="relative mt-14">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"></div>
          
          {/* Experience items */}
          <div className="space-y-20">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="relative flex flex-col md:flex-row items-center gap-8"
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-card border-4 border-primary z-10"></div>
                
                {/* Content */}
                <div className="md:w-1/2 p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">
                    {experience.period}
                  </span>
                  <h3 className="text-xl font-bold">{experience.title}</h3>
                  <p className="text-secondary font-medium mt-1">{experience.company}</p>
                  <p className="text-muted mt-4">{experience.description}</p>
                  {experience.link && (
                    <a 
                      href={experience.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center mt-4 text-primary hover:underline"
                    >
                      Visit Project
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="ml-1"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  )}
                </div>
                
                {/* Empty space for alignment on opposite side */}
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="/resume.pdf" 
            className="btn bg-primary text-black hover:bg-primary/90 inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
} 
