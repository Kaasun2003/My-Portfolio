import portfolioImage from './portfolio.png'

/*
 * =====================================================================
 *  EDIT YOUR CONTENT HERE
 *  Anything written like "[Like this]" is a placeholder and is shown
 *  with a dashed underline on the site so you can spot what to replace.
 *  Leave a link as '' and it will show as "Add link" until you fill it.
 * =====================================================================
 */

const base = import.meta.env.BASE_URL

export const profile = {
  name: 'Kasun Weerasinghe',
  nameLines: ['Kasun', 'Weerasinghe'],
  title: 'Networking & Cybersecurity Undergraduate',
  intro:
    "I'm an aspiring technology professional passionate about computer networking, cybersecurity, and modern web technologies. I enjoy learning new technologies, solving technical problems, and building practical projects that turn ideas into real-world solutions.",
  cv: `${base}documents/Kasun Sampath Weerasinghe CV.pdf`,
  cvFileName: 'Kasun Sampath Weerasinghe CV.pdf',
  email: 'kasunsampath057@gmail.com',
}

export const socials = {
  linkedin: 'https://www.linkedin.com/in/kasun-weerasingha-0382a234b/',
  github: 'https://github.com/Kaasun2003',
  facebook: 'https://www.facebook.com/profile.php?id=61552614392466&mibextid=wwXIfr&mibextid=wwXIfr',
  x: 'https://x.com/kasunsampath057?s=11',
  whatsapp: 'https://wa.me/94764767232',
  instagram: 'https://www.instagram.com/_____k_a_z_z_a_____?cplk=MXZyNDFwZ3M2eHUxYg%3D%3D&utm_source=qr',
}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  bio: [
    "I'm a Networking & Cybersecurity undergraduate at South Eastern University of Sri Lanka, studying towards Bachelor of Information and Communication Technology Honours (BICT Hons). I like understanding how data actually moves between devices, and how it can be protected along the way.",
    'I learn best by building: configuring networks in simulators, writing small programs, and putting what I learn into projects I can show and explain.',
  ],
  interests: [
    'Computer networking: addressing, subnetting, routing and switching',
    'Cybersecurity: protecting systems, networks and data',
    'Modern web technologies: React, Node.js and databases',
  ],
  learning: ['Cisco networking fundamentals', 'Network configuration and troubleshooting', 'Full-stack web development'],
  teamwork:
    'I enjoy working through technical problems step by step, and I value teamwork and clear communication when projects get complicated.',
  goal: 'My goal is to become a Network Engineer or Cybersecurity Professional.',
  details: [
    { label: 'University', value: 'South Eastern University of Sri Lanka' },
    { label: 'Degree', value: 'Bachelor of Information and Communication Technology Honours (BICT Hons)' },
    { label: 'Year of study', value: '2nd Year' },
    { label: 'Location', value: 'Ampara, Oluvil' },
  ],
}

export const education = [
  {
    kind: 'University',
    institution: 'South Eastern University of Sri Lanka',
    qualification: 'BICT Hons, Networking & Cybersecurity',
    years: 'Start-04.11.2024-End-31.12.2028',
    image: `${base}images/university.jpg`,
    responsibilities: ['Specializing in Network Architecture, System Security, and Network Infrastructure Management.'],
    achievements: ['Successfully designed and simulated a secure multi-VLAN enterprise network architecture as part of academic project work.'],
  },
  {
    kind: 'Secondary school',
    institution: 'Denike Secondary School',
    qualification: 'G.C.E. Advanced Level – Engineering Technology Stream',
    years: '',
    image: `${base}images/denike-secondary-school.jpg`,
    responsibilities: ['Focused on Information & Communication Technology (ICT), Engineering Technology (ET), and Science for Technology (SFT).'],
    achievements: ['Successfully passed the G.C.E. Advanced Level Examination in Technology stream and qualified for university admission.'],
  },
  {
    kind: 'School leadership',
    institution: 'Pallebowala Secondary School',
    qualification: 'Head Prefect  Prefect / Club President / Student Leader',
    years: '',
    image: `${base}images/pallebowala.jpg`,
    responsibilities: ['Managed student discipline, organized school events, and led student team activities.'],
    achievements: ['Successfully organized annual school events and received recognition for outstanding leadership skills.'],
  },
]

/*
 * Project screenshots: put images in public/images/ and set
 * image: `${base}images/your-file.jpg`
 */
export const projects = [
  {
    title: 'Personal Portfolio Website',
    description: 'Built a high-performance personal portfolio using React, Vite, and GSAP to showcase my work while mastering component architecture, fast build setups, and smooth UI animations.',
    tech: ['React', 'GSAP', 'Vite','HTML', 'CSS', 'JavaScript'],
    image: portfolioImage,
    github: '',
    demo: '',
    linkedinPost: 'https://lnkd.in/p/gwhxaSxQ',
  },
  {
    title: 'Cisco Packet Tracer Network Design',
    description: 'Structured enterprise network design in Cisco Packet Tracer featuring custom IP addressing, VLSM subnetting, VLAN segmentation, and inter-VLAN routing across dynamic subnets.',
    tech: ['Cisco Packet Tracer', 'IP Addressing', 'Subnetting'],
    image: `${base}images/cisco-packet-tracer-network.png`,
    github: '',
    demo: '',
  },
  {
    title: 'Smart Garbage Management System',
    description: 'Solved inefficient waste collection by building an IoT smart dashboard for real-time bin tracking, leading system architecture, hardware integration, and UI design.',
    tech: ['Arduino Uno','Ultrasonic Sensors','C/C++ (Arduino IDE)','IoT','Circuit Design'],
    image: `${base}images/smart-garbage-management.jpg`,
    github: '',
    demo: '',
  },
  {
    title: 'Password Generator & Strength Analyzer',
    description: "A CLI-based tool developed in C that generates secure, customizable passwords and evaluates password strength using key security criteria.",
    tech: ['C', 'Password Generation', 'Password Strength Analysis'],
    image: `${base}images/password-generator.jpg`,
    github: 'https://github.com/sanojan14/C_Mini_Project_Group_03/blob/main/group3.c',
    demo: '',
    linkedinPost: 'https://www.linkedin.com/in/kasun-weerasingha-0382a234b/details/projects/',
  },
  {
    title: 'CreatorGear – Content Creators Hub',
    tag: 'Academic Group Project (Group 05)',
    role: 'Search & Filtering Module Lead',
    description: 'A multi-vendor e-commerce marketplace for content creator gear with multi-condition tiers, featuring dynamic search and filtering, Supabase backend integration, and multi-gateway payments.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase (PostgreSQL)', 'PayHere', 'ethers.js', 'Vercel'],
    image: `${base}images/creatorgear.jpg`,
    github: '',
    demo: '',
  },
  {
    title: 'Bot Bash 2026',
    description: "Served on the organizing committee for Bot Bash 2026 at Sugathadasa Indoor Stadium—Sri Lanka's first international robot battle competition. Contributed to event planning, logistics, and execution to drive Sri Lanka's robotics ecosystem forward.",
    tech: ['Robotics', 'Event Organization', 'Team Collaboration'],
    image: `${base}images/bot-bash-event.jpg`,
    github: '',
    demo: '',
    linkedinPost: 'https://lnkd.in/p/gq5iwEBx',
    hideUnavailableLinks: true,
  },
]

export const skills = [
  { category: 'Networking & Cybersecurity', items: ['Cisco Packet Tracer', 'IP Addressing', 'Subnetting', 'Network Configuration'] },
  { category: 'Programming', items: ['Java', 'JavaScript', 'Python'] },
  { category: 'Frontend Development', items: ['HTML', 'CSS', 'React'] },
  { category: 'Backend Development', items: ['Node.js'] },
  { category: 'Databases', items: ['MySQL', 'MongoDB'] },
  { category: 'Tools', items: ['VS Code', 'Git', 'GitHub'] },
]

/*
 * Add only what you have actually earned. Delete entries you don't need.
 * `verify` is an optional link to the credential.
 */
export const certifications = [
  {
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    date: '05 Oct 2026',
    image: `${base}images/ccna-introduction-to-networks.png`,
    verify: '',
    note: '',
  },
  {
    title: 'Cyber Threat Management',
    issuer: 'Cisco Networking Academy',
    date: '07 May 2026',
    image: `${base}images/cisco-cyber-threat-management.png`,
    verify: '',
    note: '',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: '03 May 2026',
    image: `${base}images/cisco-introduction-to-cybersecurity.png`,
    verify: '',
    note: '',
  },
  {
    title: 'AWS Student Builder Kickoff: Cloud Concepts & Career Paths',
    issuer: 'AWS Student Builder Group, South Eastern University of Sri Lanka',
    date: '2026',
    image: `${base}images/aws-student-builder-kickoff.jpg`,
    verify: '',
    note: '',
  },
  {
    title: 'AWS Launchpad — Official Participant',
    issuer: 'AWS Student Builder Group, South Eastern University of Sri Lanka',
    date: '2026',
    image: `${base}images/aws-launchpad-participant.jpg`,
    verify: '',
    note: '',
  },
  {
    title: 'Critical Thinking in the AI Era',
    issuer: 'HP LIFE Foundation',
    date: '08 May 2026',
    image: `${base}images/hp-life-critical-thinking-ai.png`,
    verify: '',
    note: '',
  },
  {
    title: 'Professional Networking for Career Growth',
    issuer: 'HP LIFE Foundation',
    date: '08 May 2026',
    image: `${base}images/hp-life-professional-networking.png`,
    verify: '',
    note: '',
  },
]

export const softSkills = [
  { icon: 'Crown', label: 'Leadership' },
  { icon: 'Users', label: 'Teamwork' },
  { icon: 'MessageSquare', label: 'Communication' },
  { icon: 'Clock', label: 'Time management' },
  { icon: 'CalendarCheck', label: 'Event coordination' },
  { icon: 'Puzzle', label: 'Problem-solving' },
  { icon: 'ShieldCheck', label: 'Responsibility and discipline' },
  { icon: 'Mic', label: 'Public Speaking' },
]
