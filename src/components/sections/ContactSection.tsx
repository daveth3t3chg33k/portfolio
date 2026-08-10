"use client";

import { useState } from "react";

/* Contact — no fake "message sent" theater. The form opens a real
   mailto draft so nothing is lost in a simulated POST. */

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:mburudave@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-7xl px-5 py-24 md:px-10 md:py-32"
    >
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="overline-label mb-5">05 / Contact</p>
          <h2 className="font-display text-5xl leading-[0.98] md:text-7xl">
            Have a project
            <br />
            with <em className="italic-signal">a signal</em>?
          </h2>
          <p className="mt-8 max-w-md text-lg text-muted">
            I reply to every real message — usually within 24 hours, always
            within 48. If you&apos;re hiring, partnering, or just want to argue
            about stack choices, this is the door.
          </p>

          <div className="mt-10 space-y-0">
            <a
              href="mailto:mburudave@gmail.com"
              className="group flex items-baseline gap-3 hairline-t py-5"
            >
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-faint">
                Email
              </span>
              <span className="font-display text-2xl text-foreground transition-colors group-hover:text-signal md:text-3xl">
                mburudave@gmail.com
              </span>
              <span className="arrow-link ml-auto opacity-0 transition-opacity group-hover:opacity-100">
                <span className="arrow">→</span>
              </span>
            </a>
            <a
              href="tel:+254713969865"
              className="group flex items-baseline gap-3 hairline-t py-5"
            >
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-faint">
                Phone
              </span>
              <span className="font-display text-2xl text-foreground transition-colors group-hover:text-signal md:text-3xl">
                +254 713 969 865
              </span>
              <span className="arrow-link ml-auto opacity-0 transition-opacity group-hover:opacity-100">
                <span className="arrow">→</span>
              </span>
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 border border-hairline p-7 md:col-span-5 md:col-start-8 md:p-9"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.2em] text-faint"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Ada Lovelace"
              className="w-full border border-hairline bg-transparent px-4 py-3 text-foreground placeholder:text-faint focus:border-signal focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.2em] text-faint"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@studio.com"
              className="w-full border border-hairline bg-transparent px-4 py-3 text-foreground placeholder:text-faint focus:border-signal focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.2em] text-faint"
            >
              The pitch
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="What are we building?"
              className="w-full resize-none border border-hairline bg-transparent px-4 py-3 text-foreground placeholder:text-faint focus:border-signal focus:outline-none"
            />
          </div>

          <button type="submit" className="btn-signal w-full justify-center">
            Open a draft →
          </button>
          <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.15em] text-faint">
            Opens your mail client — nothing gets lost
          </p>
        </form>
      </div>
    </section>
  );
}
