// Central site content. Edit phone, email, addresses and timings here.

export const site = {
  name: "Back Neck & Joints",
  clinic: "Shrigiridhari Physiotherapy Center",
  doctor: "Dr. Asha Menon",
  doctorTitle: "Dr. Asha Menon (P.T.), Dip. MDT",
  tagline: "Certified McKenzie Clinic · Mira Road & Juhu",
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
  kicker: "Watch",
  title: "Dr. Asha on the McKenzie Method",
  text: "Talks and guidance from Dr. Asha Menon on treating and self-managing back pain.",
  items: [
    {
      youtubeId: "8IGHtevVuag",
      title: "Role of the McKenzie Method in chronic low back pain",
      source: "Physio TV · Ortho TV",
    },
    {
      youtubeId: "fQCZhJSJV34",
      title: "McKenzie Method to self-manage your back pain",
      source: "Back Neck and Joints",
    },
  ],
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
  {
    id: "back", anim: "spine" as const, area: "Lower back", spot: { x: 100, y: 184 },
    title: "Back pain & sciatica",
    text: "Acute and chronic low back pain, disc-related pain and pain radiating into the leg.",
    tags: ["Low back pain", "Sciatica", "Disc-related pain", "Stiffness"],
  },
  {
    id: "neck", anim: "neck" as const, area: "Neck", spot: { x: 100, y: 76 },
    title: "Neck pain",
    text: "Stiffness, cervical pain, headaches that start in the neck, and arm symptoms.",
    tags: ["Stiff neck", "Cervical pain", "Neck-related headaches", "Arm symptoms"],
  },
  {
    id: "joints", anim: "joint" as const, area: "Shoulder", spot: { x: 60, y: 108 },
    title: "Joints & extremities",
    text: "Problems of the muscles and joints of the shoulder, elbow, hip, knee and ankle.",
    tags: ["Shoulder", "Elbow", "Hip", "Knee", "Ankle"],
  },
  {
    id: "surgery", anim: "ecg" as const, area: "Knee", spot: { x: 78, y: 318 },
    title: "Post-surgical rehabilitation",
    text: "Stabilisation and structured recovery programmes after orthopaedic surgery.",
    tags: ["After joint surgery", "After spine surgery", "Strength & stability"],
  },
  {
    id: "stroke", anim: "neuron" as const, area: "Brain", spot: { x: 100, y: 31 },
    title: "Stroke rehabilitation",
    text: "Neuro-developmental techniques to help rebuild movement, balance and everyday function.",
    tags: ["Movement", "Balance", "Everyday function"],
  },
  {
    id: "vestibular", anim: "vestibular" as const, area: "Inner ear", spot: { x: 118, y: 44 },
    title: "Vestibular rehabilitation",
    text: "Treatment for dizziness, vertigo and balance problems linked to the inner ear.",
    tags: ["Dizziness", "Vertigo", "Balance problems"],
  },
];

