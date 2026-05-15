"use client";

import ContactForm from "@/components/ContactForm";
import SectionHeader from "@/components/SectionHeader";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20"
      style={{ background: "rgba(237, 224, 212, 0.2)" }}
    >
      <div className="container">
        <SectionHeader
          label="Contact  "
          title="Actively Seeking Opportunities"
          labelColor="var(--color-accent-brown)"
        />
        <ContactForm />
      </div>
    </section>
  );
}
