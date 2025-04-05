'use client';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 overflow-hidden bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 space-y-6">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-px w-10 bg-primary"></div>
              <span className="text-primary font-mono text-sm tracking-wider">ABOUT ME</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              My Journey as <span className="text-gradient">CodeSavant</span>
            </h2>
            
            <div className="space-y-4 text-muted">
              <p>
                I&apos;m Dave Kamirah, a passionate full stack developer with expertise in the MERN (MongoDB, Express, React, Node.js) stack. 
                My journey in software development began when I discovered my fascination with building digital products that solve real-world problems.
              </p>
              
              <p>
                With a strong foundation in web development, I&apos;ve expanded my skills into Machine Learning and Web3 technologies, always staying at the forefront of technological advancements.
              </p>
              
              <p>
                I believe in writing clean, maintainable code and creating intuitive user experiences. My approach combines technical expertise with creative problem-solving to deliver exceptional digital solutions.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="space-y-1">
                <h4 className="font-bold text-foreground">Location</h4>
                <p className="text-muted">Nairobi, Kenya</p>
              </div>
              
              <div className="space-y-1">
                <h4 className="font-bold text-foreground">Experience</h4>
                <p className="text-muted">1+ Year</p>
              </div>
              
              <div className="space-y-1">
                <h4 className="font-bold text-foreground">Education</h4>
                <p className="text-muted">Computer Science</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-2xl border-4 border-primary/20">
              <Image 
                src="/ChatGPT Image Apr 5, 2025, 09_29_46 PM.png" 
                alt="Dave Kamirah - MERN Stack Developer"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 