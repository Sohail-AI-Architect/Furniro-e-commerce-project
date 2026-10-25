"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const toastTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (toastTimer.current !== null) {
        window.clearTimeout(toastTimer.current);
      }
    },
    [],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();

    if (!value) {
      setError("Please enter your email address.");
      setSubscribed(false);
      return;
    }

    if (!EMAIL_PATTERN.test(value)) {
      setError("Please enter a valid email address.");
      setSubscribed(false);
      return;
    }

    if (toastTimer.current !== null) {
      window.clearTimeout(toastTimer.current);
    }

    setError("");
    setEmail("");
    setSubscribed(true);
    toastTimer.current = window.setTimeout(() => {
      setSubscribed(false);
      toastTimer.current = null;
    }, 4000);
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="mt-6 flex flex-wrap items-end gap-3"
      >
        <label className="min-w-0 flex-1">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError("");
            }}
            placeholder="Enter Your Email Address"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "newsletter-error" : undefined}
            className={`w-full border-b pb-1 text-sm outline-none placeholder:text-muted-light ${
              error
                ? "border-sale focus:border-sale"
                : "border-black focus:border-gold"
            }`}
          />
        </label>
        <button
          type="submit"
          className="border-b border-black pb-1 text-sm font-medium text-black transition-colors hover:border-gold hover:text-gold"
        >
          SUBSCRIBE
        </button>
      </form>

      {error ? (
        <p id="newsletter-error" role="alert" className="mt-2 text-sm text-sale">
          {error}
        </p>
      ) : null}

      {subscribed ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-5 right-5 z-[80] mx-auto max-w-sm animate-fade-up rounded-[10px] bg-new px-5 py-3 text-center text-sm font-medium text-white shadow-2xl"
        >
          Thank you for subscribing!
        </div>
      ) : null}
    </>
  );
}
