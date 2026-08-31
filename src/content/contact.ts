/** Part 2 teal copy. Email and phone stay empty until Louis confirms them. */

export const CONTACT = {
  title: "Talk to us.",
  lead: "Tell us who you are — a club, a company, a public entity, a coach, or someone who wants their own numbers — and we route you to the right conversation.",
  location: "Dubai, UAE",
  directEyebrow: "Direct",
  directNote: "The form is the way in. We route it to the right conversation.",
  fields: {
    name: "Name",
    organisation: "Organisation",
    organisationHint: "Optional",
    email: "Email",
    phone: "Phone",
    audience: "I am contacting as",
    message: "Message",
    consent: "I agree to the privacy notice. Olynixx will use these details only to respond to this enquiry.",
    submit: "Send",
    sending: "Sending",
    sent: "Received. We will route this to the right conversation.",
    error: "Something did not send. Please try again, or write to us directly when contact details are published.",
    consentError: "Please confirm the privacy notice before sending.",
  },
} as const;
