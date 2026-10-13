export type ManagementProfile = {
  slug: string;
  name: string;
  role: string;
  initials: string;
  image?: string;
  /** Shown as the large founder spread above the rest of the team. */
  featured?: boolean;
  bio: string[];
  /** Qualifications and experience — restate facts from the bio, never new claims. */
  credentials?: string[];
};

export const managementTeam: ManagementProfile[] = [
  {
    slug: "theophilus-ayitey-adjin",
    name: "Theophilus Ayitey-Adjin",
    role: "Chief Executive Officer and Founder",
    initials: "TA",
    image: "/management/theo-ayitey-adjin.jpg",
    featured: true,
    bio: [
      "Theophilus Ayitey-Adjin is the Chief Executive Officer and Founder of Niiplants Logistics Limited, a privately owned company focused on trucking and haulage, vehicle rentals, and courier services.",
      "He founded Nii Plants Car Rentals in 2009 with a single 4×4 pickup while working as Works Manager at Dredging International. At Dredging International, he also served as Project Manager, planning site works and overseeing the movement of heavy-duty equipment and the haulage of civil engineering materials, before resigning in 2010 to focus on the business full time.",
      "A civil engineer and lecturer, Theo taught Transportation Engineering and Engineering Survey at the Department of Civil Engineering, Koforidua Technical University, for over eight years. His expertise continues to inform how the Group plans routes, loads, and fleet operations.",
      "Theo also serves through Rotary. He was President of the Rotary Club of Accra — the first Rotary Club in Ghana — for the 2021–2022 Rotary year.",
    ],
    credentials: [
      "MSc, Coastal Geoscience and Engineering — Kiel University, Germany",
      "BSc, Geodetic Engineering — KNUST, Ghana",
      "Lecturer, Department of Civil Engineering — Koforidua Technical University, 8+ years",
      "Project Manager — Dredging International, until 2010",
      "President, Rotary Club of Accra — 2021–2022",
    ],
  },
  {
    slug: "frank-adjei",
    name: "Frank Adjei",
    role: "Fleet Manager",
    initials: "FA",
    bio: [
      "Frank Adjei is an experienced Fleet and Transport Management professional with over a decade of expertise in fleet operations, logistics coordination, and transport administration.",
      "As Fleet Manager at Nii Plants Group, he provides strategic leadership in managing the Group's fleet operations, ensuring maximum vehicle availability, operational efficiency, regulatory compliance, and cost-effective transport solutions.",
      "Drawing on his background in mechanical and automotive engineering, Frank oversees fleet policies, vehicle maintenance, driver performance, fuel management, and safety compliance. He also implements data-driven strategies that strengthen fleet utilisation and operational reliability, supporting the Group's commitment to reliable and sustainable mobility solutions.",
    ],
    credentials: [
      "10+ years in fleet operations, logistics coordination, and transport administration",
      "Background in mechanical and automotive engineering",
      "Leads fleet policy, maintenance, driver performance, fuel management, and safety compliance",
    ],
  },
  {
    slug: "kingdom-kededor-avisseh",
    name: "Kingdom Kededor Avisseh",
    role: "General Manager, Trivoxo and Executive Assistant",
    initials: "KA",
    image: "/management/kingdom-kededor-avisseh.jpg",
    bio: [
      "Kingdom Kededor Avisseh is a logistics and supply chain professional with experience spanning transportation, travel, events management, and youth leadership.",
      "At Nii Plants Group, he contributes to business growth, client engagement, strategic partnerships, and operational excellence within Ghana's transport and travel industry. He also serves as General Manager for Trivoxo, the Group's travel, tour, and ticketing company.",
      "Kingdom holds a Master of Science in Logistics and Supply Chain Management from Kwame Nkrumah University of Science and Technology and is an affiliate member of the Chartered Institute of Procurement and Supply Chain.",
    ],
    credentials: [
      "MSc, Logistics and Supply Chain Management — KNUST, Ghana",
      "Affiliate Member — Chartered Institute of Procurement and Supply Chain",
      "General Manager — Trivoxo",
    ],
  },
  {
    slug: "wilhemina-adoma-opoku",
    name: "Wilhemina Adoma Opoku",
    role: "Human Resource and Admin Manager",
    initials: "WA",
    bio: [
      "Wilhemina Adoma Opoku is a Chartered Professional Member of the Chartered Institute of Human Resource Management, Ghana, with over ten years of experience in human resource management, administration, and organisational development.",
      "As Human Resource and Admin Manager for Nii Plants Group, she provides strategic leadership across the Group's human resource and administrative functions, overseeing talent acquisition, performance management, employee relations, policy development, learning and development, organisational effectiveness, and regulatory compliance.",
      "Wilhemina partners with executive management to align human capital strategies with the Group's business objectives, develop high-performing teams, and foster a culture of excellence, accountability, and continuous improvement.",
    ],
    credentials: [
      "Chartered Professional Member — Chartered Institute of Human Resource Management, Ghana",
      "10+ years in human resource management, administration, and organisational development",
    ],
  },
  {
    slug: "daniel-awotwe-pratt",
    name: "Daniel Awotwe-Pratt",
    role: "General Manager, Nii Plants and Car Rentals",
    initials: "DA",
    image: "/management/daniel-awotwe-pratt.jpg",
    bio: [
      "Daniel Awotwe-Pratt holds an EMBA in Finance from the University of Ghana Business School and a BSc in Accounting and Information Systems from Regent University College. He has over 20 years of experience in accounting, finance, business development, and operations.",
      "He has worked with organisations including Spektra Global Ltd, Lindador Enterprise, and Eprocess International SA, an affiliate of Ecobank Transnational Incorporated.",
      "Daniel joined Nii Plants and Car Rentals in 2021 as Finance Manager, contributing to the company's financial growth, customer account management, and strategic development. He currently serves as General Manager of Nii Plants and Car Rentals.",
    ],
    credentials: [
      "EMBA, Finance — University of Ghana Business School",
      "BSc, Accounting and Information Systems — Regent University College",
      "20+ years in accounting, finance, business development, and operations",
      "Finance Manager, Nii Plants and Car Rentals — from 2021",
    ],
  },
];
