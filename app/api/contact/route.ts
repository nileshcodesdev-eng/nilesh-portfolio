import { NextResponse } from "next/server";
import { Resend } from "resend";

import { CONTACT_RECAPTCHA_ACTION, validateContactForm } from "@/lib/contact";

type RecaptchaVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  recaptchaToken?: unknown;
};

const getClientIp = (request: Request): string | undefined => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim();
  }

  return request.headers.get("x-real-ip") ?? undefined;
};

const verifyRecaptcha = async (
  token: string,
  remoteIp?: string,
): Promise<{ ok: true } | { ok: false; status: number; error: string }> => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    // If reCAPTCHA is not configured on server, pass gracefully
    return { ok: true };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  let data: RecaptchaVerifyResponse;
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      },
    );
    data = (await response.json()) as RecaptchaVerifyResponse;
  } catch (error) {
    console.error("reCAPTCHA verification request failed:", error);
    return {
      ok: false,
      status: 502,
      error: "Unable to verify reCAPTCHA. Please try again.",
    };
  }

  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? "0.5");
  const score = data.score ?? 0;

  if (
    !data.success ||
    data.action !== CONTACT_RECAPTCHA_ACTION ||
    Number.isNaN(minScore) ||
    score < minScore
  ) {
    console.error("reCAPTCHA verification failed:", {
      success: data.success,
      action: data.action,
      errorCodes: data["error-codes"],
    });
    return {
      ok: false,
      status: 403,
      error: "reCAPTCHA verification failed. Please try again.",
    };
  }

  return { ok: true };
};

export async function POST(request: Request) {
  let payload: ContactRequestBody;
  try {
    payload = (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name : "";
  const email = typeof payload.email === "string" ? payload.email : "";
  const subject = typeof payload.subject === "string" ? payload.subject : "";
  const message = typeof payload.message === "string" ? payload.message : "";
  const recaptchaToken =
    typeof payload.recaptchaToken === "string" ? payload.recaptchaToken : "";

  const validationError = validateContactForm({ name, email, subject, message });
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  if (process.env.RECAPTCHA_SECRET_KEY && recaptchaToken) {
    const recaptchaResult = await verifyRecaptcha(
      recaptchaToken,
      getClientIp(request),
    );
    if (!recaptchaResult.ok) {
      return NextResponse.json(
        { error: recaptchaResult.error },
        { status: recaptchaResult.status },
      );
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.CONTACT_TO_EMAIL || "nilesh.codes.dev@gmail.com";
  const from = process.env.RESEND_FROM_EMAIL || "Nilesh Portfolio <onboarding@resend.dev>";
  const userTemplateId = process.env.RESEND_TEMPLATE_CONTACT_USER;
  const adminTemplateId = process.env.RESEND_TEMPLATE_CONTACT_ADMIN;
  const siteUrl = (process.env.CONTACT_SITE_URL || "https://nilesh-portfolio.netlify.app").replace(/\/$/, "");

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedSubject = subject.trim();
  const trimmedMessage = message.trim();

  // If RESEND_API_KEY is not configured on the hosting platform
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set in environment.");
    return NextResponse.json(
      {
        error: "RESEND_API_KEY_NOT_CONFIGURED",
        message: "Email service key not configured on server yet.",
        adminEmail,
      },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);

    // If custom Resend templates are defined in env, use batch template send
    if (userTemplateId && adminTemplateId) {
      const { error } = await resend.batch.send([
        {
          from,
          to: trimmedEmail,
          replyTo: adminEmail,
          template: {
            id: userTemplateId,
            variables: {
              USER_NAME: trimmedName,
              USER_MESSAGE: `Subject: ${trimmedSubject}\n\n${trimmedMessage}`,
              SITE_URL: siteUrl,
            },
          },
        },
        {
          from,
          to: adminEmail,
          replyTo: trimmedEmail,
          template: {
            id: adminTemplateId,
            variables: {
              USER_NAME: trimmedName,
              USER_EMAIL: trimmedEmail,
              USER_MESSAGE: `Subject: ${trimmedSubject}\n\n${trimmedMessage}`,
              SITE_URL: siteUrl,
            },
          },
        },
      ]);

      if (error) {
        throw error;
      }
    } else {
      // Standard Direct Resend HTML Delivery directly to Nilesh's inbox
      const { error } = await resend.emails.send({
        from,
        to: [adminEmail],
        replyTo: trimmedEmail,
        subject: `[Portfolio Inquiry] ${trimmedSubject} - from ${trimmedName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"></head>
          <body style="margin: 0; padding: 24px; background-color: #080a14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
            <div style="max-width: 580px; margin: 0 auto; background: #0f172a; border-radius: 14px; border: 1px solid #1e293b; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
              <div style="background: linear-gradient(135deg, #0ea5e9, #38bdf8); padding: 24px; color: #080a14;">
                <h1 style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px;">New Portfolio Inquiry</h1>
                <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">Message received from your portfolio contact form</p>
              </div>
              <div style="padding: 24px;">
                <div style="margin-bottom: 20px; padding: 14px; background: #1e293b; border-radius: 10px; border-left: 4px solid #38bdf8;">
                  <p style="margin: 0 0 6px; font-size: 13px; color: #94a3b8;"><strong>From:</strong> <span style="color: #f1f5f9;">${trimmedName}</span> (<a href="mailto:${trimmedEmail}" style="color: #38bdf8; text-decoration: none;">${trimmedEmail}</a>)</p>
                  <p style="margin: 0; font-size: 13px; color: #94a3b8;"><strong>Subject:</strong> <span style="color: #f1f5f9;">${trimmedSubject}</span></p>
                </div>
                <div style="margin-bottom: 24px;">
                  <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px;">Message Body:</p>
                  <div style="background: #020617; padding: 16px; border-radius: 8px; border: 1px solid #1e293b; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${trimmedMessage}</div>
                </div>
                <div style="text-align: center; padding-top: 12px; border-top: 1px solid #1e293b;">
                  <a href="mailto:${trimmedEmail}?subject=Re: ${encodeURIComponent(trimmedSubject)}" style="display: inline-block; background: #0284c7; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-size: 13px; font-weight: 600;">Reply Directly to ${trimmedName}</a>
                </div>
              </div>
              <div style="padding: 12px 24px; background: #020617; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #1e293b;">
                Nilesh Jayprakash Chaurasiya • Full Stack Developer Portfolio
              </div>
            </div>
          </body>
          </html>
        `,
      });

      if (error) {
        throw error;
      }
    }
  } catch (error) {
    console.error("Resend delivery failed:", error);
    return NextResponse.json(
      { error: "Failed to send message via email provider. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
