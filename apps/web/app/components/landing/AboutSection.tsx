import React from 'react';

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
            About Us
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Demystifying the Protocol
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed text-left md:text-center">
            EthShala is an initiative dedicated to opening the doors of Ethereum protocol development and governance. We believe that understanding Ethereum Improvement Proposals (EIPs) shouldn't be restricted to a select few.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed text-left md:text-center">
            Our mission is to empower the next generation of researchers, developers, and governance participants by providing structured education, actionable insights, and a clear path from learner to active contributor. Whether you're tracking the latest execution layer upgrades or diving into governance calls, we're here to make the process transparent and accessible.
          </p>

          <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-muted/50 border border-border backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Education</h3>
              <p className="text-sm text-muted-foreground">Structured pathways to learn protocol fundamentals.</p>
            </div>
            <div className="p-6 rounded-2xl bg-muted/50 border border-border backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Participation</h3>
              <p className="text-sm text-muted-foreground">Resources and mentorship to join discussions.</p>
            </div>
            <div className="p-6 rounded-2xl bg-muted/50 border border-border backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Impact</h3>
              <p className="text-sm text-muted-foreground">Shape the future of the Ethereum network.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
