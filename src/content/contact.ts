/** Public contact. One central set. Interim until licence renewal. */

export const CONTACT = {
  title: "Talk to us.",
  lead: "Tell us who you are. A club, a company, a public entity, a coach, or someone who wants their own numbers. We route you to the right conversation.",
  location: "UAE",
  directEyebrow: "Direct",
  replyPromise: "We reply within one working day.",
  fields: {
    name: "Name",
    organisation: "Organisation",
    organisationHint: "optional",
    email: "Email",
    phone: "Phone (optional)",
    audience: "I am contacting as",
    message: "Message",
    consent: "I agree to the privacy notice. Olynixx will use these details only to respond to this enquiry.",
    submit: "Send my request",
    sending: "Sending",
    sent: "Received. We will route this to the right conversation.",
    error: "Something did not send. Please try again, or write to us using the details on this page.",
    consentError: "Please confirm the privacy notice before sending.",
  },
} as const;
