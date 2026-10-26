"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import { BsArrowRight, BsCheck2, BsCopy, BsEnvelope, BsGeoAlt, BsGithub, BsLinkedin, BsPhone, BsWhatsapp } from "react-icons/bs";
import Link from "next/link";

import {
  CONTACT_RECAPTCHA_ACTION,
  isValidContactEmail,
  isValidContactMessage,
  isValidContactName,
  isValidContactSubject,
  type ContactFormFields,
} from "@/lib/contact";
import { fadeIn } from "@/variants";
import TiltCard from "@/components/TiltCard";

const FIELD_VALIDATORS: Record<
  keyof ContactFormFields,
  (value: string) => boolean
> = {
  name: isValidContactName,
  email: isValidContactEmail,
  subject: isValidContactSubject,
  message: isValidContactMessage,
};

interface FormProps {
  useRecaptcha?: boolean;
}

const ContactFormInner = ({ useRecaptcha = false }: FormProps) => {
  const recaptchaHook = useGoogleReCaptcha();
  const executeRecaptcha = useRecaptcha ? recaptchaHook?.executeRecaptcha : undefined;
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const hasAttemptedSubmit = useRef(false);

  const [form, setForm] = useState<ContactFormFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    const el = messageRef.current;
    if (!el) return;

    el.style.overflowY = "hidden";
    el.style.height = "auto";

    const nextHeight = el.scrollHeight;
    const maxHeight = Number.parseFloat(getComputedStyle(el).maxHeight);

    if (Number.isFinite(maxHeight) && nextHeight >= maxHeight) {
      el.style.height = `${maxHeight}px`;
      el.style.overflowY = "auto";
      return;
    }

    el.style.height = `${nextHeight}px`;
  }, [form.message]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name as keyof ContactFormFields;
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));

    if (!hasAttemptedSubmit.current) return;

    const isInvalid = !FIELD_VALIDATORS[field](value);
    setFieldErrors((prev) =>
      prev[field] === isInvalid ? prev : { ...prev, [field]: isInvalid },
    );
  };

  const validateForm = () => {
    hasAttemptedSubmit.current = true;

    const nextErrors = {
      name: !isValidContactName(form.name),
      email: !isValidContactEmail(form.email),
      subject: !isValidContactSubject(form.subject),
      message: !isValidContactMessage(form.message),
    };

    setFieldErrors(nextErrors);

    return (
      !nextErrors.name &&
      !nextErrors.email &&
      !nextErrors.subject &&
      !nextErrors.message
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (useRecaptcha && executeRecaptcha) {
        const recaptchaToken = await executeRecaptcha(CONTACT_RECAPTCHA_ACTION);

        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
            recaptchaToken,
          }),
        });

        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;

        if (!response.ok) {
          throw new Error(data?.error ?? "Failed via API");
        }

        toast.success("Message sent! I will get back to you ASAP.");
      } else {
        // Fallback: Direct Mailto link & clipboard copy so user message is never lost!
        const mailtoUrl = `mailto:nilesh.codes.dev@gmail.com?subject=${encodeURIComponent(
          `[Portfolio Contact] ${form.subject}`
        )}&body=${encodeURIComponent(
          `Hi Nilesh,\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
        )}`;

        window.open(mailtoUrl, "_blank");
        toast.success("Opening your email client. Thank you!");
      }

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setFieldErrors({
        name: false,
        email: false,
        subject: false,
        message: false,
      });
    } catch (error) {
      console.warn("Direct send fallback triggered:", error);
      const mailtoUrl = `mailto:nilesh.codes.dev@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Contact] ${form.subject}`
      )}&body=${encodeURIComponent(
        `Hi Nilesh,\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      )}`;
      window.open(mailtoUrl, "_blank");
      toast.success("Draft prepared in your email client!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
    >
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="flex-1 min-w-0">
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            className="input"
            value={form.name}
            onChange={handleChange}
            disabled={isLoading}
            aria-disabled={isLoading}
            maxLength={200}
            aria-invalid={fieldErrors.name}
          />
          {fieldErrors.name && (
            <p className="mt-1 text-left text-xs text-accent">
              Please enter at least 3 characters.
            </p>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <input
            type="email"
            name="email"
            placeholder="Your E-mail *"
            className="input"
            value={form.email}
            onChange={handleChange}
            disabled={isLoading}
            aria-disabled={isLoading}
            maxLength={100}
            aria-invalid={fieldErrors.email}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-left text-xs text-accent">
              Please enter a valid email address.
            </p>
          )}
        </div>
      </div>

      <div>
        <input
          type="text"
          name="subject"
          placeholder="Subject / Project Inquiry *"
          className="input"
          value={form.subject}
          onChange={handleChange}
          disabled={isLoading}
          aria-disabled={isLoading}
          maxLength={200}
          aria-invalid={fieldErrors.subject}
        />
        {fieldErrors.subject && (
          <p className="mt-1 text-left text-xs text-accent">
            Please enter a subject (minimum 3 characters).
          </p>
        )}
      </div>

      <div>
        <textarea
          ref={messageRef}
          name="message"
          placeholder="Tell me about your project, ERP requirement, or role opportunity... *"
          className="textarea"
          rows={4}
          value={form.message}
          onChange={handleChange}
          disabled={isLoading}
          aria-disabled={isLoading}
          maxLength={500}
          aria-invalid={fieldErrors.message}
        />
        {fieldErrors.message && (
          <p className="mt-1 text-left text-xs text-accent">
            Please enter a message (minimum 5 characters).
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="submit"
          className="btn rounded-full bg-gradient-to-r from-accent to-purple-600 px-8 py-3 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/30 hover:scale-105 disabled:pointer-events-none disabled:opacity-60"
          disabled={isLoading}
        >
          <span>{isLoading ? "Sending..." : "Send Message"}</span>
          <BsArrowRight className="text-base" />
        </button>

        <span className="text-[11px] text-white/40">
          Direct response guaranteed
        </span>
      </div>
    </form>
  );
};

const Contact = () => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("nilesh.codes.dev@gmail.com");
    setCopiedEmail(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="h-full bg-primary/30 overflow-y-auto py-28 xl:py-32">
      <div className="container mx-auto px-4 pb-20 xl:pb-0">
        <div className="text-center max-w-xl mx-auto mb-10">
          <motion.div
            variants={fadeIn("up", 0.15)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3 text-xs uppercase tracking-widest text-accent font-semibold"
          >
            Get In Touch
          </motion.div>

          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-3xl sm:text-4xl xl:text-5xl font-extrabold mb-3"
          >
            Let&apos;s build <span className="text-accent">together.</span>
          </motion.h2>

          <motion.p
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-xs sm:text-sm text-white/70 leading-relaxed"
          >
            Have a project in mind, an ERP challenge, or an engineering role? 
            Reach out directly or send a message below.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
          {/* Left Column: Direct Contact Hub */}
          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Email Card */}
            <TiltCard tiltDegree={6} className="rounded-2xl">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-accent/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-xl shrink-0">
                    <BsEnvelope />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] uppercase tracking-wider text-white/50 font-medium">
                      Direct Email
                    </span>
                    <div className="text-sm sm:text-base font-bold text-white truncate mb-2">
                      nilesh.codes.dev@gmail.com
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-accent text-white text-xs font-medium transition-colors"
                      >
                        {copiedEmail ? <BsCheck2 className="text-emerald-400" /> : <BsCopy />}
                        <span>{copiedEmail ? "Copied!" : "Copy"}</span>
                      </button>
                      <a
                        href="mailto:nilesh.codes.dev@gmail.com"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent/20 hover:bg-accent text-accent hover:text-white text-xs font-medium transition-colors border border-accent/30"
                      >
                        <span>Send Mail</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Phone & WhatsApp Card */}
            <TiltCard tiltDegree={6} className="rounded-2xl">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-accent/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xl shrink-0">
                    <BsPhone />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] uppercase tracking-wider text-white/50 font-medium">
                      Phone &amp; WhatsApp
                    </span>
                    <div className="text-sm sm:text-base font-bold text-white mb-2">
                      +91 8766573044
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href="tel:+918766573044"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                      >
                        <span>Call</span>
                      </a>
                      <a
                        href="https://wa.me/918766573044?text=Hi%20Nilesh,%20I%20reviewed%20your%20portfolio"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white text-xs font-medium transition-colors border border-emerald-500/40"
                      >
                        <BsWhatsapp />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Location Card */}
            <TiltCard tiltDegree={6} className="rounded-2xl">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-accent/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 text-xl shrink-0">
                    <BsGeoAlt />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] uppercase tracking-wider text-white/50 font-medium">
                      Location
                    </span>
                    <div className="text-sm sm:text-base font-bold text-white mb-1">
                      Nashik, Maharashtra, India
                    </div>
                    <p className="text-xs text-white/60">
                      Open to Relocation &bull; Hybrid &bull; Remote Worldwide
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Profiles Links */}
            <div className="flex gap-3">
              <Link
                href="https://linkedin.com/in/nilesh-chaurasiya20"
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent text-white text-xs font-medium hover:bg-accent/15 transition-all"
              >
                <BsLinkedin className="text-accent text-base" />
                <span>LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/nileshcodesdev-eng"
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent text-white text-xs font-medium hover:bg-accent/15 transition-all"
              >
                <BsGithub className="text-accent text-base" />
                <span>GitHub</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="lg:col-span-7"
          >
            <TiltCard tiltDegree={4} className="rounded-2xl">
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 backdrop-blur-md shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-2">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-white/60 mb-6">
                  Fill in your details and message. Whether it&apos;s a quick question or a project proposal, I will reply promptly.
                </p>

                {siteKey ? (
                  <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
                    <ContactFormInner useRecaptcha />
                  </GoogleReCaptchaProvider>
                ) : (
                  <ContactFormInner useRecaptcha={false} />
                )}
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
