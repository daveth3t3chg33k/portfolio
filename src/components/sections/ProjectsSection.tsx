'use client';

import ProjectImageFallback from '@/components/ui/ProjectImageFallback';

const projects = [
  {
    title: "AI-Powered Task Manager",
    description: "A MERN stack application with AI capabilities to intelligently prioritize tasks, suggest deadlines, and provide productivity insights.",
    image: "https://images.unsplash.com/photo-1596079890744-c1a0462d0975?auto=format&w=800",
    bgColor: "from-purple-500/40 to-blue-500/40",
    tags: ["React", "Node.js", "MongoDB", "Express", "Machine Learning"],
    liveUrl: "https://ai-taskmanager.example.com",
    githubUrl: "https://github.com/daveth3t3chg33k/ai-taskmanager"
  },
  {
    title: "NFT Marketplace",
    description: "A decentralized marketplace for NFTs built on Ethereum using React and Solidity, featuring wallet integration, minting, and trading capabilities.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&w=800",
    bgColor: "from-emerald-500/40 to-teal-500/40",
    tags: ["React", "Solidity", "Ethereum", "Web3.js", "Smart Contracts"],
    liveUrl: "https://nft-marketplace.example.com",
    githubUrl: "https://github.com/daveth3t3chg33k/nft-marketplace"
  },
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with advanced product filtering, payment processing, and user authentication built with Next.js.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&w=800",
    bgColor: "from-pink-500/40 to-red-500/40",
    tags: ["Next.js", "MongoDB", "Stripe", "Redux", "Tailwind CSS"],
    liveUrl: "https://ecommerce-platform.example.com",
    githubUrl: "https://github.com/daveth3t3chg33k/ecommerce-platform"
  },
  {
    title: "Predictive Analytics Dashboard",
    description: "An ML-powered dashboard that visualizes data patterns and predicts future trends for businesses, built using React and TensorFlow.js.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&w=800",
    bgColor: "from-blue-500/40 to-indigo-500/40",
    tags: ["React", "TensorFlow.js", "D3.js", "Node.js", "Python"],
    liveUrl: "https://analytics-dashboard.example.com",
    githubUrl: "https://github.com/daveth3t3chg33k/analytics-dashboard"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-card overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="h-px w-10 bg-primary"></div>
            <span className="text-primary font-mono text-sm tracking-wider">MY WORK</span>
            <div className="h-px w-10 bg-primary"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          
          <p className="text-muted max-w-2xl mx-auto">
            A showcase of my best work across various technologies including MERN stack, Machine Learning, and Web3.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group bg-card-hover rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <div className="w-full h-full relative">
                  <ProjectImageFallback
                    src={project.image}
                    alt={project.title}
                    title={project.title}
                    bgClass={project.bgColor}
                    width={600}
                    height={340}
                  />
                </div>
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all">
                  {project.title}
                </h3>
                
                <p className="text-muted mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-1 text-xs font-medium bg-card border border-border rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-primary text-black hover:bg-primary/90 text-sm px-4 py-2"
                  >
                    Live Demo
                  </a>
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn border border-primary text-primary hover:bg-primary/10 text-sm px-4 py-2"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://github.com/daveth3t3chg33k"
            target="_blank"
            rel="noopener noreferrer"
            className="btn border border-primary text-primary hover:bg-primary/10 inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            View More Projects
          </a>
        </div>
      </div>
    </section>
  );
} 