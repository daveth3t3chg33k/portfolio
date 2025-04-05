'use client';

const skills = [
  { 
    category: "Frontend", 
    skills: [
      { name: "React", proficiency: 95 },
      { name: "Next.js", proficiency: 90 },
      { name: "TypeScript", proficiency: 85 },
      { name: "CSS/Tailwind", proficiency: 90 },
      { name: "Redux", proficiency: 80 }
    ] 
  },
  { 
    category: "Backend", 
    skills: [
      { name: "Node.js", proficiency: 90 },
      { name: "Express", proficiency: 90 },
      { name: "MongoDB", proficiency: 85 },
      { name: "RESTful APIs", proficiency: 90 },
      { name: "GraphQL", proficiency: 75 }
    ] 
  },
  { 
    category: "ML & Data", 
    skills: [
      { name: "Python", proficiency: 85 },
      { name: "TensorFlow", proficiency: 70 },
      { name: "Data Analysis", proficiency: 75 },
      { name: "Pandas", proficiency: 80 },
      { name: "SQL", proficiency: 85 }
    ] 
  },
  { 
    category: "Web3", 
    skills: [
      { name: "Solidity", proficiency: 75 },
      { name: "Ethereum", proficiency: 80 },
      { name: "Smart Contracts", proficiency: 75 },
      { name: "Web3.js", proficiency: 70 },
      { name: "DApps", proficiency: 70 }
    ] 
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 overflow-hidden relative">
      <div className="absolute inset-0 z-0 bg-grid" aria-hidden="true" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="h-px w-10 bg-primary"></div>
            <span className="text-primary font-mono text-sm tracking-wider">MY SKILLS</span>
            <div className="h-px w-10 bg-primary"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          
          <p className="text-muted max-w-2xl mx-auto">
            My technical toolkit includes a wide range of technologies across full stack development, machine learning, and Web3.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillCategory, index) => (
            <div 
              key={index} 
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] hover:border-primary/50"
            >
              <h3 className="text-xl font-bold mb-4 text-gradient">
                {skillCategory.category}
              </h3>
              
              <div className="space-y-4">
                {skillCategory.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-xs text-muted">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-border/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card-hover border border-border rounded-xl p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Always Learning</h3>
            <p className="text-muted">Continuously expanding my knowledge in new technologies and methodologies.</p>
          </div>
          
          <div className="bg-card-hover border border-border rounded-xl p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Efficient Project Management</h3>
            <p className="text-muted">Well-versed in Agile methodologies, ensuring timely delivery of high-quality solutions.</p>
          </div>
          
          <div className="bg-card-hover border border-border rounded-xl p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
            <p className="text-muted">Strong focus on testing and quality assurance throughout the development process.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 