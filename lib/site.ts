// Central site content. Edit phone, email, addresses and timings here.

export const site = {
  name: "Back Neck & Joints",
  clinic: "Shrigiridhari Physiotherapy Center",
  doctor: "Dr. Asha Menon",
  doctorTitle: "Dr. Asha Menon (P.T.), Dip. MDT",
  tagline: "India's only certified McKenzie Clinic",
  // TODO: replace with the clinic's real details before going live
  phone: "+91 00000 00000",
  email: "info@backneckandjoints.in",
  linkedin: "http://in.linkedin.com/in/ashamenon/",
  locations: [
    {
      name: "Shrigiridhari Physiotherapy Center",
      area: "Mira Road East, Mumbai",
      address: "B6-001, Sector 4, Shanti Nagar",
      timings: "Mon – Sat · Timings to be added",
      mapQuery: "Shri Giridhari Physiotherapy Dr Asha Menon, Sector 4, Shanti Nagar, Mira Road East, Mumbai, Maharashtra",
    },
    {
      name: "Bhartiya Arogya Nidhi Hospital",
      area: "Juhu, Mumbai",
      address: "Juhu Scheme, N.S. Road No. 13, Mumbai",
      timings: "By appointment",
      mapQuery: "Bhartiya Arogya Nidhi Hospital, Juhu, Mumbai",
    },
  ],
};

export const video = {
  youtubeId: "8IGHtevVuag",
  // Edit the heading/description to match the video's content
  kicker: "Watch",
  title: "Dr. Asha in conversation",
  text: "Watch Dr. Asha Menon talk about her work and her approach to treating pain.",
};

export const nav = [
  { href: "#about", label: "About" },
  { href: "#treatments", label: "Treatments" },
  { href: "#contact", label: "Contact" },
];

export const stats = [
  { value: "1990", label: "In private practice since" },
  { value: "Dip. MDT", label: "Highest McKenzie qualification" },
  { value: "NZ", label: "Accredited by McKenzie Institute International" },
];

export const credentials = [
  "Dip. MDT — University of Otago & McKenzie Institute International, New Zealand",
  "Founder Director, McKenzie Institute India",
  "B.P.Th — Seth G.S. Medical College & K.E.M. Hospital",
  "Registered with IAP & Maharashtra Council for Physiotherapists",
];




export const treatments = [
  { anim: "spine" as const, title: "Back pain & sciatica", text: "Acute and chronic low back pain, disc-related pain and radiating leg pain." },
  { anim: "neck" as const, title: "Neck pain", text: "Stiffness, cervical pain, headaches of neck origin and arm symptoms." },
  { anim: "joint" as const, title: "Joints & extremities", text: "Shoulder, knee, hip, elbow and ankle problems of muscles and joints." },
  { anim: "ecg" as const, title: "Post-surgical rehabilitation", text: "Stabilisation and recovery programmes after orthopaedic surgery." },
  { anim: "neuron" as const, title: "Stroke rehabilitation", text: "Neuro-developmental techniques to rebuild movement and function." },
  { anim: "vestibular" as const, title: "Vestibular rehabilitation", text: "Treatment for dizziness, vertigo and inner-ear balance problems." },
];


