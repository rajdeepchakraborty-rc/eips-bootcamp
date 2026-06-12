import React from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Footer } from '../components/landing/Footer';
import { Search, BarChart2, GitBranch, FileText, Shield, Activity, Globe, MessageSquare, Heart, Mail, ExternalLink, ArrowRight } from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-24">
        
        {/* Header Block */}
        <div className="p-8 md:p-12 rounded-3xl bg-muted/20 border border-border">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6">
            About
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6 leading-tight">
            EIPsInsight Bootcamp makes Ethereum protocol governance accessible to everyone.
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            We build an educational platform, structured pathways, and governance movement trackers so builders, researchers, and newcomers can understand what is changing and why.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-muted/40 border border-border">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Mission</h3>
              <p className="text-sm">Make Ethereum standards and governance legible, explorable, and operationally useful for newcomers.</p>
            </div>
            <div className="p-6 rounded-2xl bg-muted/40 border border-border">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">What We Teach</h3>
              <p className="text-sm">Ethereum fundamentals, EIPs, governance workflows, protocol research, and contributor paths.</p>
            </div>
            <div className="p-6 rounded-2xl bg-muted/40 border border-border">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Built By</h3>
              <p className="text-sm">Avarch with support from the Ethereum ecosystem and partners close to standards operations.</p>
            </div>
          </div>
        </div>

        {/* Why / How Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Why We Built This</h3>
            <h2 className="text-3xl font-serif font-medium mb-6">
              Standards and governance should not require institutional memory to follow.
            </h2>
            <div className="space-y-4 text-muted-foreground text-sm">
              <p>Ethereum governance happens across repositories, pull requests, review queues, forum threads, upgrades, and informal coordination. The data is public, but the workflow is still hard to inspect as a system.</p>
              <p>EIPsInsight Bootcamp exists to reduce that gap. We curate the moving parts, normalize them into structured education, and help people answer practical questions: what changed, what is stuck, who is active, what upgrade work depends on what, and where to go next.</p>
              <p>The goal is not just more documentation. The goal is operational clarity for anyone trying to understand or participate in Ethereum standards.</p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-muted/20 border border-border space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">How People Use It</h3>
            
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-muted/40 border border-border flex gap-4">
                <Search className="text-primary w-5 h-5 shrink-0" />
                <div>
                  <h4 className="font-medium text-sm mb-1">Structured Learning</h4>
                  <p className="text-xs text-muted-foreground">Follow curated modules from fundamentals to advanced protocol research instead of manual repository digging.</p>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-muted/40 border border-border flex gap-4">
                <BarChart2 className="text-primary w-5 h-5 shrink-0" />
                <div>
                  <h4 className="font-medium text-sm mb-1">Progress Tracking</h4>
                  <p className="text-xs text-muted-foreground">Track your learning journey, earn XP, and measure your readiness to contribute.</p>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-muted/40 border border-border flex gap-4">
                <GitBranch className="text-primary w-5 h-5 shrink-0" />
                <div>
                  <h4 className="font-medium text-sm mb-1">Contributor Tooling</h4>
                  <p className="text-xs text-muted-foreground">Transition from reading governance to working with it through hands-on assignments.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="p-8 md:p-12 rounded-3xl bg-muted/20 border border-border">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Team</h3>
          <h2 className="text-3xl font-serif font-medium mb-4">
            A compact team working across strategy, operations, engineering, and product systems.
          </h2>
          <p className="text-sm text-muted-foreground mb-12">
            We are not a giant organization. The product is shaped by a small group with distinct responsibilities, which is exactly why role clarity matters here.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Placeholder 1 */}
            <div className="p-6 rounded-2xl bg-muted/40 border border-border flex gap-6">
              <div className="w-16 h-16 rounded-full bg-muted border border-border shrink-0 overflow-hidden">
                <div className="w-full h-full bg-primary/20 animate-pulse"></div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold">Team Member 1</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted border border-border">Active</span>
                </div>
                <p className="text-primary text-sm font-medium mb-3">Role / Title</p>
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Responsibility</h5>
                <p className="text-xs text-muted-foreground mb-4">Placeholder description of what this person focuses on and how they contribute to the platform.</p>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"><GithubIcon className="w-3 h-3"/> GitHub</button>
                  <button className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"><ExternalLink className="w-3 h-3"/> LinkedIn</button>
                </div>
              </div>
            </div>

            {/* Placeholder 2 */}
            <div className="p-6 rounded-2xl bg-muted/40 border border-border flex gap-6">
              <div className="w-16 h-16 rounded-full bg-muted border border-border shrink-0 overflow-hidden">
                <div className="w-full h-full bg-primary/20 animate-pulse"></div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold">Team Member 2</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted border border-border">Active</span>
                </div>
                <p className="text-primary text-sm font-medium mb-3">Role / Title</p>
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Responsibility</h5>
                <p className="text-xs text-muted-foreground mb-4">Placeholder description of what this person focuses on and how they contribute to the platform.</p>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"><GithubIcon className="w-3 h-3"/> GitHub</button>
                  <button className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"><ExternalLink className="w-3 h-3"/> LinkedIn</button>
                </div>
              </div>
            </div>
            
            {/* Placeholder 3 */}
            <div className="p-6 rounded-2xl bg-muted/40 border border-border flex gap-6">
              <div className="w-16 h-16 rounded-full bg-muted border border-border shrink-0 overflow-hidden">
                <div className="w-full h-full bg-primary/20 animate-pulse"></div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold">Team Member 3</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted border border-border">Active</span>
                </div>
                <p className="text-primary text-sm font-medium mb-3">Role / Title</p>
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Responsibility</h5>
                <p className="text-xs text-muted-foreground mb-4">Placeholder description of what this person focuses on and how they contribute to the platform.</p>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"><GithubIcon className="w-3 h-3"/> GitHub</button>
                  <button className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"><ExternalLink className="w-3 h-3"/> LinkedIn</button>
                </div>
              </div>
            </div>

            {/* Placeholder 4 */}
            <div className="p-6 rounded-2xl bg-muted/40 border border-border flex gap-6">
              <div className="w-16 h-16 rounded-full bg-muted border border-border shrink-0 overflow-hidden">
                <div className="w-full h-full bg-primary/20 animate-pulse"></div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold">Team Member 4</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted border border-border">Active</span>
                </div>
                <p className="text-primary text-sm font-medium mb-3">Role / Title</p>
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Responsibility</h5>
                <p className="text-xs text-muted-foreground mb-4">Placeholder description of what this person focuses on and how they contribute to the platform.</p>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"><GithubIcon className="w-3 h-3"/> GitHub</button>
                  <button className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"><ExternalLink className="w-3 h-3"/> LinkedIn</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-muted/20 border border-border">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Values</h3>
            <h2 className="text-3xl font-serif font-medium mb-8">The product is opinionated about clarity.</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-muted/40 border border-border">
                <Shield className="w-5 h-5 text-primary mb-3" />
                <h4 className="font-bold text-sm mb-2">Transparency</h4>
                <p className="text-xs text-muted-foreground">Data should be inspectable, explainable, and tied back to real public sources.</p>
              </div>
              <div className="p-5 rounded-2xl bg-muted/40 border border-border">
                <Activity className="w-5 h-5 text-primary mb-3" />
                <h4 className="font-bold text-sm mb-2">Operational clarity</h4>
                <p className="text-xs text-muted-foreground">Tooling should help people decide and act, not just display information.</p>
              </div>
              <div className="p-5 rounded-2xl bg-muted/40 border border-border">
                <Globe className="w-5 h-5 text-primary mb-3" />
                <h4 className="font-bold text-sm mb-2">Accessibility</h4>
                <p className="text-xs text-muted-foreground">The platform has to work for newcomers, builders, and researchers without flattening complexity.</p>
              </div>
              <div className="p-5 rounded-2xl bg-muted/40 border border-border">
                <GitBranch className="w-5 h-5 text-primary mb-3" />
                <h4 className="font-bold text-sm mb-2">Iteration</h4>
                <p className="text-xs text-muted-foreground">We ship, evaluate, and refine quickly so the product stays aligned with how governance behaves.</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-muted/20 border border-border flex flex-col justify-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">What the platform offers</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-border flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Search and proposal context</h4>
                  <p className="text-xs text-muted-foreground">Find proposals, statuses, authors without jumping across sources.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <BarChart2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Dashboards and analytics</h4>
                  <p className="text-xs text-muted-foreground">Read standards activity through structured analytics views.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Tooling for active work</h4>
                  <p className="text-xs text-muted-foreground">Use builders, boards, trackers, and graphs when moving from reading to doing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-muted/20 border border-border">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Support</h3>
            <h2 className="text-2xl font-serif font-medium mb-6">Backed by grants, community support, and ecosystem collaboration.</h2>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-muted/40 border border-border">
                <h4 className="font-bold text-sm mb-2">Ecosystem Support Program (EF ESP)</h4>
                <p className="text-xs text-muted-foreground mb-3">Funds help maintain data pipelines, improve analytics, and keep EIPsInsight open-source.</p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-primary/20 text-primary">Significant</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-border">Infrastructure</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-muted/20 border border-border">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Partners</h3>
            <h2 className="text-2xl font-serif font-medium mb-6">Working alongside ecosystem operators.</h2>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-muted/40 border border-border flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm mb-1">EtherWorld</h4>
                  <p className="text-xs text-muted-foreground">Media and ecosystem amplification.</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="p-5 rounded-2xl bg-muted/40 border border-border flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm mb-1">ECH (Ethereum Cat Herders)</h4>
                  <p className="text-xs text-muted-foreground">Operational support around standards.</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="p-8 md:p-12 rounded-3xl bg-muted/20 border border-border">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Get Involved</h3>
          <h2 className="text-2xl font-serif font-medium mb-4">Support the platform, contribute feedback, or build on top of the work.</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            EIPsInsight is a community resource. If you want to help, the best paths are straightforward: use it, critique it, contribute to it, or support the infrastructure behind it.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors"><GithubIcon className="w-4 h-4"/> GitHub</button>
            <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors"><MessageSquare className="w-4 h-4"/> Discord</button>
            <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors"><Heart className="w-4 h-4"/> Donate</button>
            <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors"><Mail className="w-4 h-4"/> Contact</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-muted/20 border border-border">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Policy</h3>
            <h2 className="text-xl font-serif font-medium mb-4">Legal and privacy</h2>
            <p className="text-xs text-muted-foreground mb-6">We keep the legal and privacy layer explicit. Use these documents when you need the operational details behind account, data, and platform usage.</p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">Privacy Policy <ArrowRight className="w-3 h-3"/></button>
              <button className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors">Terms of Service <ArrowRight className="w-3 h-3"/></button>
            </div>
          </div>
          <div className="p-8 rounded-3xl bg-muted/20 border border-border">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Contact</h3>
            <h2 className="text-xl font-serif font-medium mb-4">Reach the team</h2>
            <p className="text-xs text-muted-foreground mb-6">For collaboration, platform questions, or product feedback, contact us directly.</p>
            <div className="p-4 rounded-xl border border-border bg-muted/30">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</p>
              <a href="mailto:dev@avarch.com" className="text-sm font-medium text-primary hover:underline flex items-center gap-2">dev@avarch.com <ArrowRight className="w-3 h-3"/></a>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
