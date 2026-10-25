"use client";

import { useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField =
    (field: keyof typeof emptyForm) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    setForm(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isSubmitted ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-[10px] border-l-4 border-gold bg-gold/10 px-4 py-3 text-sm font-medium leading-6 text-black"
        >
          Thank you for contacting us! Your message has been sent successfully.
        </div>
      ) : null}

      <label className="block">
        <span className="mb-2 block text-base font-medium text-black">
          Your name
        </span>
        <input
          name="name"
          required
          value={form.name}
          onChange={updateField("name")}
          placeholder="Abc"
          className="field rounded-[10px]"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-base font-medium text-black">
          Email address
        </span>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={updateField("email")}
          placeholder="Abc@def.com"
          className="field rounded-[10px]"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-base font-medium text-black">
          Subject
        </span>
        <input
          name="subject"
          value={form.subject}
          onChange={updateField("subject")}
          placeholder="This is an optional"
          className="field rounded-[10px]"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-base font-medium text-black">
          Message
        </span>
        <textarea
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={updateField("message")}
          placeholder="Hi! i'd like to ask about"
          className="field resize-none rounded-[10px]"
        />
      </label>

      <button
        type="submit"
        className="w-full max-w-[237px] rounded-[5px] bg-gold py-4 text-base text-white transition-colors hover:bg-[#a17a26]"
      >
        Submit
      </button>
    </form>
  );
}
