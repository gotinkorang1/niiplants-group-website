export type ManagementProfile = {
  name: string;
  role: string;
  initials: string;
  image?: string;
  bio: string[];
};

export const managementTeam: ManagementProfile[] = [
  {
    name: "Frank Adjei",
    role: "Fleet Manager",
    initials: "FA",
    bio: [
      "Frank Adjei is an experienced Fleet and Transport Management professional with over a decade of expertise in fleet operations, logistics coordination, and transport administration.",
      "As Fleet Manager at Nii Plants Group, he provides strategic leadership in managing the Group's fleet operations, ensuring maximum vehicle availability, operational efficiency, regulatory compliance, and cost-effective transport solutions.",
      "Drawing on his background in mechanical and automotive engineering, Frank oversees fleet policies, vehicle maintenance, driver performance, fuel management, and safety compliance. He also implements data-driven strategies that strengthen fleet utilisation and operational reliability, supporting the Group's commitment to reliable and sustainable mobility solutions.",
    ],
  },
  {
    name: "Kingdom Kededor Avisseh",
    role: "Executive Assistant / General Manager, Trivoxo",
    initials: "KA",
    image: "/management/kingdom-kededor-avisseh.jpg",
    bio: [
      "Kingdom Kededor Avisseh is a logistics and supply chain professional with experience spanning transportation, supply chain, travel, events management, logistics, and youth leadership.",
      "At Nii Plants Group, he contributes to business growth, client engagement, strategic partnerships, and operational excellence within Ghana's transport and travel industry. He also serves as General Manager for Trivoxo, the Group's travel, tour, and ticketing company.",
      "Kingdom holds a Master of Science in Logistics and Supply Chain Management from Kwame Nkrumah University of Science and Technology and is an affiliate member of the Chartered Institute of Procurement and Supply Chain.",
    ],
  },
  {
    name: "Wilhemina Adoma Opoku",
    role: "Human Resource and Admin Manager",
    initials: "WA",
    bio: [
      "Wilhemina Adoma Opoku is a Chartered Professional Member of the Chartered Institute of Human Resource Management, Ghana, with over ten years of experience in human resource management, administration, and organisational development.",
      "As Human Resource and Admin Manager for Nii Plants Group, she provides strategic leadership across the Group's human resource and administrative functions, overseeing talent acquisition, performance management, employee relations, policy development, learning and development, organisational effectiveness, and regulatory compliance.",
      "Wilhemina partners with executive management to align human capital strategies with the Group's business objectives, develop high-performing teams, and foster a culture of excellence, accountability, and continuous improvement.",
    ],
  },
  {
    name: "Daniel Awotwe-Pratt",
    role: "General Manager, Nii Plants and Car Rentals",
    initials: "DA",
    image: "/management/daniel-awotwe-pratt.jpg",
    bio: [
      "Daniel Awotwe-Pratt holds an EMBA in Finance from the University of Ghana Business School and a BSc in Accounting and Information Systems from Regent University College. He has over 20 years of experience in accounting, finance, business development, and operations.",
      "He has worked with organisations including Spektra Global Ltd, Lindador Enterprise, and Eprocess International SA, an affiliate of Ecobank Transnational Incorporated.",
      "Daniel joined Nii Plants and Car Rentals in 2021 as Finance Manager, contributing to the company's financial growth, customer account management, and strategic development. He currently serves as General Manager of Nii Plants and Car Rentals.",
    ],
  },
];
