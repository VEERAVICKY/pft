import React, { useState } from 'react';

// Get your free Web3Forms Access Key from: https://web3forms.com/
const WEB3FORMS_ACCESS_KEY = "e90f7407-b4a4-4642-a956-cd6e95eb5c0b";

export default function Resume() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'project',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let subjectText = 'New Feature Inquiry';
    if (formData.subject === 'hire') subjectText = 'Hiring / Full-time Role';
    if (formData.subject === 'consult') subjectText = 'UI/UX Implementation';
    if (formData.subject === 'other') subjectText = 'Other Inquiry';

    // Submit via Web3Forms API
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        email: formData.email,
        subject: `Portfolio Contact: ${subjectText} from ${formData.name}`,
        message: formData.message,
      })
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        console.log('Message sent successfully via Web3Forms:', data);
      })
      .catch(error => {
        console.error('Failed to send message via Web3Forms:', error);
      });

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData((prev) => ({ ...prev, message: '' }));
  };

  return (
    <div className="w-full bg-background min-h-screen pt-24">
      <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <div className="flex flex-col gap-16">

          {/* Professional Summary */}
          <div className="space-y-10 text-center max-w-3xl mx-auto">
            <header>
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="inline-flex items-center px-3 py-1 bg-primary/5 border border-primary/10 rounded-full">
                  <span className="font-label-md text-label-md text-primary dot-status uppercase">
                    Open for Hire
                  </span>
                </div>
                <span className="font-label-lg text-label-lg text-primary-container bg-primary-container/10 px-4 py-1.5 rounded-full inline-block uppercase tracking-wider">
                  Availability: Immediate
                </span>
              </div>

              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6 leading-tight">
                Let's build the <span className="text-primary">next digital</span> experience.
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Specializing in building robust features with .NET Core and crafting intuitive UI components with React. I focus on seamless data handling and responsive front-end development to deliver exceptional user experiences.
              </p>
            </header>

            {/* Resume High-level Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-xl aura-shadow border border-outline-variant/30 text-left">
                <span className="font-label-md text-label-md text-primary mb-3 block uppercase tracking-wider">
                  Technical Depth
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-surface-container px-2.5 py-1 rounded text-xs font-medium border border-outline-variant/20 text-on-surface-variant">
                    .NET Core 8
                  </span>
                  <span className="bg-surface-container px-2.5 py-1 rounded text-xs font-medium border border-outline-variant/20 text-on-surface-variant">
                    React
                  </span>
                  <span className="bg-surface-container px-2.5 py-1 rounded text-xs font-medium border border-outline-variant/20 text-on-surface-variant">
                    TypeScript
                  </span>
                  <span className="bg-surface-container px-2.5 py-1 rounded text-xs font-medium border border-outline-variant/20 text-on-surface-variant">
                    SQL Server
                  </span>
                  <span className="bg-surface-container px-2.5 py-1 rounded text-xs font-medium border border-outline-variant/20 text-on-surface-variant">
                    Tailwind CSS
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl aura-shadow border border-outline-variant/30 text-left">
                <span className="font-label-md text-label-md text-primary mb-3 block uppercase tracking-wider">
                  Experience
                </span>
                <p className="font-headline-sm text-headline-sm text-on-surface font-bold">3+ Years</p>
                <p className="text-xs text-on-surface-variant mt-1 font-medium">Professional Practice</p>
              </div>
            </div>

            {/* Social Connect buttons */}
            <div className="space-y-4">
              <h3 className="font-label-lg text-label-lg uppercase text-on-surface-variant tracking-widest">
                Connect with me
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://github.com/VEERAVICKY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface-container-lowest flex items-center justify-between p-5 rounded-xl hover:border-primary/30 border border-outline-variant/30 transition-all group aura-shadow"
                >
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary">terminal</span>
                    <span className="font-medium text-on-surface text-sm md:text-base">GitHub Repository</span>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                    arrow_forward
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/veera-brahmam-chepuri-435015247"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface-container-lowest flex items-center justify-between p-5 rounded-xl hover:border-primary/30 border border-outline-variant/30 transition-all group aura-shadow"
                >
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary-container">group</span>
                    <span className="font-medium text-on-surface text-sm md:text-base">LinkedIn Professional</span>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-3xl mx-auto w-full">
            <div className="bg-surface-container-lowest p-8 md:p-12 rounded-2xl border border-outline-variant/30 aura-shadow relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="font-headline-md text-headline-md text-on-surface mb-8 text-center">
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6" id="contactForm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wide" htmlFor="name">
                        Full Name
                      </label>
                      <div className="border border-outline-variant rounded-lg bg-surface px-4 input-focus transition-all">
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-0 focus:ring-0 py-3 text-on-surface placeholder-outline text-sm md:text-base outline-none"
                          placeholder="Veera"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wide" htmlFor="email">
                        Email Address
                      </label>
                      <div className="border border-outline-variant rounded-lg bg-surface px-4 input-focus transition-all">
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-0 focus:ring-0 py-3 text-on-surface placeholder-outline text-sm md:text-base outline-none"
                          placeholder="veeravicky17@gmail.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wide" htmlFor="subject">
                      Subject
                    </label>
                    <div className="border border-outline-variant rounded-lg bg-surface px-4 input-focus transition-all">
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-0 focus:ring-0 py-3 text-on-surface appearance-none text-sm md:text-base outline-none"
                      >
                        <option value="project" className="bg-surface-container text-on-surface">New Feature Inquiry</option>
                        <option value="hire" className="bg-surface-container text-on-surface">Hiring / Full-time Role</option>
                        <option value="consult" className="bg-surface-container text-on-surface">UI/UX Implementation</option>
                        <option value="other" className="bg-surface-container text-on-surface">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wide" htmlFor="message">
                      Feature Brief / Message
                    </label>
                    <div className="border border-outline-variant rounded-lg bg-surface px-4 input-focus transition-all">
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-0 focus:ring-0 py-3 text-on-surface resize-none placeholder-outline text-sm md:text-base outline-none"
                        placeholder="Describe the features or UI components you need built..."
                        required
                        rows={5}
                      />
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <button
                      type="submit"
                      className="w-full md:w-auto bg-primary text-on-primary px-10 py-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-primary-container transition-all active:scale-95 aura-shadow mx-auto text-sm md:text-base"
                    >
                      <span>Initiate Connection</span>
                      <span className="material-symbols-outlined text-[20px]">send</span>
                    </button>
                  </div>
                </form>

                {/* Success Message */}
                {isSubmitted && (
                  <div className="absolute inset-0 bg-surface/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 z-20 animate-in fade-in duration-300">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-primary text-[40px]">check_circle</span>
                    </div>
                    <h3 className="text-headline-sm text-on-surface mb-2 font-bold">Transmission Received</h3>
                    <p className="text-on-surface-variant font-body-md text-sm">
                      Your message has been logged. I'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-8 text-primary text-label-lg uppercase tracking-widest border-b-2 border-primary font-bold"
                    >
                      Send another
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Location Context */}
          <div className="mt-8 bg-surface-container-low/50 border border-outline-variant/20 rounded-2xl p-6 flex items-center justify-center gap-6">
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-outline-variant bg-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[32px]">map</span>
            </div>
            <div>
              <p className="font-label-md text-label-md text-primary uppercase tracking-wider">
                Remote / Hybrid
              </p>
              <p className="font-body-md text-body-md text-on-surface">
                Currently based in <span className="font-bold">Vijayawada (AP), India</span>
              </p>
              <p className="text-on-surface-variant text-xs mt-0.5">Available for global time-zones.</p>
            </div>
          </div>

          {/* Resume Detailed Section */}
          <section className="pt-16 border-t border-outline-variant/30">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-16">
              <div className="">
                <span className="font-label-lg text-label-lg text-primary uppercase mb-4 block tracking-[0.2em]">
                  01 // CURRICULUM VITAE
                </span>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                  Professional <span className="text-primary">Ledger</span>
                </h2>
                <p className="mt-4 text-on-surface-variant font-body-md text-body-md">
                  A chronological log of feature development and professional growth for <span className="font-bold text-on-surface">Veera</span>.
                </p>
              </div>
              {/* <button
                onClick={() => window.print()}
                className="bg-surface border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold flex items-center gap-3 hover:bg-primary/5 transition-all aura-shadow text-sm"
              >
                <span className="material-symbols-outlined">picture_as_pdf</span>
                DOWNLOAD FULL RESUME (PDF)
              </button> */}
            </div>

            {/* Experience Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-center">

              {/* Job 1 */}
              {/* <div className="bg-surface-container-lowest p-8 rounded-2xl flex flex-col border-t-4 border-t-primary aura-shadow">
                <span className="font-label-md text-label-md text-primary mb-4 font-bold">
                  2023 — PRESENT
                </span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">Senior Full-Stack</h4>
                <p className="font-label-lg text-label-lg text-on-surface-variant mb-6 uppercase tracking-wider">
                  TechNexus Systems
                </p>
                <ul className="text-sm space-y-4 text-on-surface-variant font-body-md text-body-md flex-1">
                  <li className="flex gap-3">
                    <span className="text-primary">▹</span>
                    <span>Developed core platform features for 1M+ users</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">▹</span>
                    <span>Built reusable React component libraries</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">▹</span>
                    <span>Optimized frontend data-fetching and state management</span>
                  </li>
                </ul>
              </div> */}

              {/* Job 2 */}
              <div className="bg-surface-container-lowest p-8 rounded-2xl flex flex-col border border-outline-variant/30 aura-shadow">
                <span className="font-label-md text-label-md text-primary mb-4 font-bold">
                  2023 — Present
                </span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">Full-Stack Engineer</h4>
                <p className="font-label-lg text-label-lg text-on-surface-variant mb-6 uppercase tracking-wider">
                  Data Analytics
                </p>
                <ul className="text-sm space-y-4 text-on-surface-variant font-body-md text-body-md flex-1">
                  <li className="flex gap-3">
                    <span className="text-primary">▹</span>
                    <span>Built data-driven dashboards with React</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">▹</span>
                    <span>Developed efficient .NET Core backend logic</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">▹</span>
                    <span>Handled complex SQL to PostgreSQL data migrations</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">▹</span>
                    <span>Built data dashboards · 20M+ records</span>
                  </li>
                </ul>
              </div>

              {/* Education & Skills */}
              <div className="bg-white p-8 rounded-2xl flex flex-col border border-primary/20 aura-shadow">
                <h4 className="font-headline-sm text-headline-sm text-primary mb-3">Education</h4>
                <p className="font-body-md text-body-md text-on-surface mb-6">
                  MCA
                  <br />
                  <span className="text-on-surface-variant text-sm font-semibold">JNTUK</span>
                </p>

                <h4 className="font-headline-sm text-headline-sm text-primary mb-3">Core Skills</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] bg-surface-container-lowest px-2.5 py-1 border border-outline-variant/30 rounded font-bold text-on-surface-variant">
                    REACT
                  </span>
                  <span className="text-[10px] bg-surface-container-lowest px-2.5 py-1 border border-outline-variant/30 rounded font-bold text-on-surface-variant">
                    .NET CORE
                  </span>
                  <span className="text-[10px] bg-surface-container-lowest px-2.5 py-1 border border-outline-variant/30 rounded font-bold text-on-surface-variant">
                    TYPESCRIPT
                  </span>
                  <span className="text-[10px] bg-surface-container-lowest px-2.5 py-1 border border-outline-variant/30 rounded font-bold text-on-surface-variant">
                    Tailwind CSS
                  </span>
                  <span className="text-[10px] bg-surface-container-lowest px-2.5 py-1 border border-outline-variant/30 rounded font-bold text-on-surface-variant">
                    SQL Server
                  </span>
                  <span className="text-[10px] bg-surface-container-lowest px-2.5 py-1 border border-outline-variant/30 rounded font-bold text-on-surface-variant">
                    Stored Procedures
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
