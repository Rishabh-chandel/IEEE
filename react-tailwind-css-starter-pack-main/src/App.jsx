import React, { useState, useEffect , useRef} from 'react';
import { BookOpen, Calendar, Users, Mail, MapPin, Star, Building, Link as LinkIcon, Home, FileText, Info, Phone, Menu, X, Ticket, Twitter, Linkedin, Facebook } from 'lucide-react';

// --- MOCK ASSETS ---
// In a real project, you would import these from your assets folder
// e.g., import LogoAIT from './Assets/Logo-AIT.gif';
import LogoAIT from './Assets/Logo-AIT.gif';
import LogoAWES from './Assets/Logo-AWES.gif';
import BirdViewAIT from './Assets/Bird-View-AIT.jpg';
import { motion } from 'framer-motion';
import {  } from 'lucide-react';




  
// --- Data from Brochure (ICNDIA-2026) ---
const conferenceInfo = {
  title: "International Conference on Nexus of Digitalization, Intelligence and Applications",
  acronym: "ICNDIA-2026",
  longName: "ARMY INSTITUTE OF TECHNOLOGY",
  date: "18th and 19th Sept 2026",
  mode: "Hybrid Mode",
  venue: "Army Institute of Technology, Pune, India",
 // affiliation: "Permanently Affiliated to Savitribai Phule Pune University, Autonomous College from AY 2025-26, NBA Accreditation (All UG Programs), NAAC Accredited",
  organizedBy: "Department of Information Technology",
  aitLogoUrl: LogoAIT,
  headerRightLogoUrl: LogoAWES,
  heroImageUrl: BirdViewAIT,
  brochureLink: "#", // Placeholder link
  paperSubmissionLink: "https://easychair.org/cfp/ICNDIA2026"
};

const committee = {
  chiefPatron: { name: "Brig Abhay A Bhat", title: "Director" },
  patron: { name: "Col MK Prasad", title: "Joint Director" },
  conferenceCommitteeChair: { name: "Dr B P Patil", title: "Principal" },
  generalChair: { name: "Dr. Sangeeta Jadhav", title: "HOD IT" },
  generalCoChairs: [
    { name: "Dr. Vaishali Sci/Engr Ingale", title: "" },
    { name: "Dr. Dipika Rajendra Birari", title: "" }
  ],
  organizingCommittee: {
    publicationChair: "Dr. Rahul Desai",
    programChair: "Dr. G M Phade",
    publicityChair: "Prof. Yuvraj Gholap",
    financeChair: "Dr. Rupali Bagate"
  },
  internationalAdvisory: [
    "Dr. Saif M Mohammad, Principal Research Scientist, NRC Canada",
    "Dr Padmanabhan, Cameron, ME Research Engineer, Microsoft UK",
    "Dr Mohammed Fluid, Professor, Aday University, Australia",
    "Dr Sonali Bhadoria, Data Analyst, Holly Springs, US",
    "Dr Kulajeet Barman, Research Scientist, Kingston University, UK",
    "Dr Vijayakumar, Professor, IITB Pilani, Dubai",
    "Dr Prakas Pawar, Asst. Professor, BITS Pilani, Dubai",
  ],
  nationalAdvisory: [
    "Prof Anil Sahasrabudhe, Chairman, AICTE",
    "Prof Rajive Kumar, Member Secretary, AICTE",
    "Dr. Abhay Wagh, Chairman, DTE",
    "Dr. J M Bako, President, IETE",
    "Dr. Abhijit Joshi, IETE Governing Council Member",
    "Dr. B D Khandare, Chairman IETE, NIPR",
    "Mr. Pradeep Ras, Vice President, Region VI",
    "Dr. M Patil, Vice Chairman, CSI Pune Chapter",
    "Dr. Aditya Abhyankar, Chairman, BCI-IT, SPPU, Pune",
    "Dr. Parikshit N Mahalle, Member, BoS-IT, SPPU, Pune",
    "Dr. Sandip Thengade, Member, BoS-IT, SPPU, Pune",
    "Dr. Dharmashikha Shreevastav, Member, BoS-IT, SPPU, Pune",
    "Dr. Lambodaran P, Member, BoS-IT, SPPU, Pune",
    "Dr. Sudeep D. Thepade, Member, BoS-IT, SPPU, Pune",
    "Dr. Lalit Kumar Vashishtha, Member, BoS-IT, SPPU, Pune",
    "Dr. Sangeeta Joshi, Ex-PATNA",
    "Dr. Sachin Lodha, Vice President at TCS",
  ],
  technicalProgramme: [
    "Dr. Anil M. Shinde, Roanoke College, Jan 2022 Virginia, United States",
    "Dr. Sourav Sen Gupta, School of Computer Science and Engineering, Nanyang Technological University, Singapore",
    "Mr. Ambar Govekar, Director, Product Innovation, Media Private Limited",
    "Mr. Rahul Das, Pullman, Washington, United States",
    "Dr. Chetna Singhal, Indian Institute of Technology, Kharagpur, India",
    "Mr. Sameer Dalvi, Director, Head Business Advisory Services, UST",
    "Mr. Rajib Singh, Co-founder, Simbiot, India",
  ]
};


const keyHighlights = [
  "Technical sessions on various topics related to computer science and informatics",
  "Keynote addresses by experts",
  "All accepted and presented papers will be submitted to IEEE for possible inclusion in the IEEE Xplore Digital Library",
  "Publishing partner will assist IEEE publication standards",
  "Pre-conference tutorials"
];

const paperTopics = [
  "AI and Machine Learning", "Intelligent Transportation Systems", "Cloud and Fog Computing", "Computational Intelligence", "Data Analytics and Data Mining", "Data Science", "Mobile Technologies", "Natural Language Processing", "Quantum Computing", "Security and Privacy", "AR and VR", "Image Processing and Computer Vision", "Software Engineering"
];

const importantDates = [
  { event: "Last Date for Receiving Full Paper", date: "13th Feb, 2026" },
  { event: "Paper Acceptance Notification", date: "15th May, 2026" },
  { event: "Last Date for Camera Ready Copy", date: "30th June, 2026" },
  { event: "Last Date of Registration", date: "30th June, 2026" },
  { event: "Conference Dates", date: "18th-19th Sept, 2026" },
];

const registrationDetails = [
    { category: "Student/Research Scholar", ieeeMember: "₹4000", nonIeeeMember: "₹5000" },
    { category: "Academicians", ieeeMember: "₹6400", nonIeeeMember: "₹8000" },
    { category: "Industry Persons", ieeeMember: "₹7200", nonIeeeMember: "₹9000" },
    { category: "Foreign Delegates", ieeeMember: "$150", nonIeeeMember: "$200" },
    { category: "Extra Page Charges per Page", ieeeMember: "₹800", nonIeeeMember: "₹1000" },
    { category: "Foreign Authors", ieeeMember: "$50", nonIeeeMember: "$100" }
];

const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
              setIsVisible(true);
          }
      }, options);

      if (ref.current) {
          observer.observe(ref.current);
      }

      return () => {
          if (ref.current) {
              observer.unobserve(ref.current);
          }
      };
  }, [ref, options]);

  return [ref, isVisible];
};


const contact = {
    name: "Prof. Yuvraj Gholap",
    phone: "9404751535",
    name1: "Prof. Kavita Arakeri",
    phone1: "8308136889",
    emails: [
        "ygholap@aitpune.edu.in",
        "kavitajadhav@aitpune.edu.in"
    ]
}

const aboutConferenceText = "International Conference on Nexus of Digitalization, Intelligence, and Applications (ICNDIA-2026) serves as a premier platform for researchers and practitioners to present and discuss the transformative impact of digital technologies and artificial intelligence across various sectors. Focusing on the convergence of these fields, the conference aims to foster collaboration and knowledge sharing, addressing both the opportunities and challenges of the digital transformation. Attendees will engage in insightful discussions, attend workshops, and network with leading experts, driving forward thinking solutions that harness the power of technology for societal advancement.";
const aboutDepartmentText = "The Department of Information Technology was established in the year 2001 with an intake of 120 students. The department believes in shaping the students in such a manner that they are readily absorbed by the industry and other professional organizations. The department continues to conquer new frontiers of knowledge through quality research works, conferences, QIPs and FDPs, by promoting the Teaching Learning Process. The department is a pioneer in establishing ACM and NPTEL student branches.";
const aboutAitText = "AIT was founded in 1994, as a result of the vision, and untiring efforts of Late Gen. B.C. Joshi PVSM, AVSM, ADC for the children of all ranks of the Indian Army. The lush green campus, its resilience and architectural splendor, and state of the art infrastructure, all provide vital ingredients for a delectable academic environment for the development of total quality engineers. AIT is ranked 139 in NIRF across India. AIT runs Undergraduate courses in Comp. Engg., IT, Mech, E&TC and Post Graduate course in Machine Design. All courses are affiliated to SPPU.";

// --- Reusable Components ---
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg overflow-hidden h-full ${className}`}>
    {children}
  </div>
);

const Section = ({ id, title, children, className = '' }) => (
  <section id={id} className={`py-16 md:py-20 scroll-mt-20 ${className}`}>
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        {title}
      </h2>
      {children}
    </div>
  </section>
);

// --- Layout Components ---

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: "#home", label: "Home", icon: <Home size={16} /> },
        { href: conferenceInfo.brochureLink, label: "Brochure", icon: <FileText size={16} />, target: "_blank" },
        { href: "#about", label: "About", icon: <Info size={16} /> },
        { href: "#highlights", label: "Highlights", icon: <Star size={16} /> },
        { href: "#papers", label: "Call for Papers", icon: <BookOpen size={16} /> },
        { href: "#committee", label: "Committee", icon: <Users size={16} /> },
        { href: "#registration", label: "Registration", icon: <Ticket size={16} /> },
        { href: "#contact", label: "Contact Us", icon: <Phone size={16} /> },
    ];

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-blue-900/90 backdrop-blur-lg shadow-xl' : 'bg-blue-900'} `}>
            <div className="container mx-auto px-4 ">
                {/* Top bar with logos and affiliation */}
                <div className="flex justify-between items-center h-20 md:-mx-28 ">
                    {/* Left Logo & Title */}
                    <a href="#home" className="flex items-center space-x-3">
                        <img src={conferenceInfo.aitLogoUrl} alt="AIT Logo" className="h-14 bg-white p-1 rounded-md shadow-sm" />
                        <div className="hidden lg:flex flex-col text-white">
                           <span className="font-bold text-xl tracking-wider hidden md:block">{conferenceInfo.longName}</span>
                           <span className="text-xs">{conferenceInfo.affiliation}</span>
                        </div>
                    </a>

                    {/* Desktop Nav in the middle */}
                    <nav className="hidden md:flex items-center space-x-1  ">
                        {navLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                target={link.target}
                                rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                                className="flex items-center space-x-2 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                            >
                                {link.icon}
                                <span className="text-md font-semibold">{link.label}</span>
                            </a>
                        ))}
                    </nav>

                    {/* Right side: AWES Logo for desktop, Menu for mobile */}
                    <div className="flex items-center">
                       <img src={conferenceInfo.headerRightLogoUrl} alt="AWES Logo" className="h-14 hidden md:block" />
                       <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                                {isOpen ? <X size={30} /> : <Menu size={30} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute w-full bg-blue-900/95 backdrop-blur-lg transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
                <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
                    {navLinks.map(link => (
                        <a
                            key={link.label}
                            href={link.href}
                            target={link.target}
                            rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                            className="flex items-center space-x-4 px-3 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200 block"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.icon}
                            <span className="font-medium">{link.label}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};


const HeroSection = () => (
    <section id="home" className="scroll-mt-20">
        {/* This section contains the main title and hero image */}
        <div className="bg-white pt-12 pb-6 text-center m-auto w-[70%]">
            <p className="text-gray-600 font-bold pb-5">Department of Information Technology, AIT Pune Organises</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-gray-800 mt-2 px-4 leading-tight">
                {conferenceInfo.title}
            </h1>
            <p className="font-semibold text-2xl text-gray-700 mt-2">({conferenceInfo.acronym})</p>
            <p className="text-red-600 font-bold text-xl mt-4">{conferenceInfo.date}</p>
            <p className="text-gray-500">({conferenceInfo.mode})</p>
        </div>
        <div className="container mx-auto px-4 mt-4">
            <div 
                className="h-64 md:h-96 bg-cover bg-center rounded-lg shadow-lg"
                style={{ backgroundImage: `url(${conferenceInfo.heroImageUrl})` }}
                aria-label="Army Institute of Technology campus view"
            ></div>
        </div>
    </section>
);


// --- Page Content Sections ---

const AboutSection = () => (
  <Section id="about" title="About The Conference, Institute & Department">
  <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 text-gray-700 leading-relaxed text-left">
      <div className="bg-gray-50 p-8 rounded-lg flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><Star className="text-blue-600 mr-3"/>About The Conference</h3>
          <p className="flex-grow">{aboutConferenceText}</p>
      </div>
      <div className="bg-gray-50 p-8 rounded-lg flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><Home className="text-blue-600 mr-3"/>About AIT</h3>
          <p className="flex-grow">{aboutAitText}</p>
      </div>
      <div className="bg-gray-50 p-8 rounded-lg flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><Building className="text-blue-600 mr-3"/>About The Department</h3>
          <p className="flex-grow">{aboutDepartmentText}</p>
      </div>
  </div>
</Section>
); // Importing necessary hooks



const KeyHighlightsSection = () => (
    <Section id="highlights" title="Key Highlights" className="bg-gray-50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {keyHighlights.map((highlight, index) => (
                <div key={index} className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                    <Star className="w-5 h-5 text-yellow-500 mt-1 mr-4 flex-shrink-0" />
                    <p className="text-gray-700">{highlight}</p>
                </div>
            ))}
        </div>
    </Section>
);

const ImportantDatesTimeline = () => (
  <div>
      <h3 className="text-2xl font-bold text-gray-700 mb-8 text-center lg:text-left">Important Dates</h3>
      <div className="relative border-l-2 border-blue-200 ml-3">
          {importantDates.map((item, index) => (
              <div key={index} className="mb-8 pl-10 relative">
                  <div className="absolute w-6 h-6 bg-blue-600 rounded-full -left-[14px] top-1 border-4 border-white flex items-center justify-center">
                     <Calendar size={12} className="text-white" />
                  </div>
                  <div className="p-1">
                      <p className="text-md font-bold text-blue-800">{item.date}</p>
                      <p className="text-gray-700 text-sm">{item.event}</p>
                  </div>
              </div>
          ))}
      </div>
  </div>
);
  
const CallForPapersSection = () => (
<Section id="papers" title="Call for Papers & Important Dates">
  <div className="grid lg:grid-cols-2 gap-64 items-start w-[80%] mx-auto">
    <ImportantDatesTimeline />
    <div>
      <h3 className="text-2xl font-bold text-gray-700 mb-6 text-center lg:text-left">Paper Topics</h3>
      <div className="columns-1 sm:columns-2 space-y-3">
        {paperTopics.map((track, index) => (
          <div key={index} className="flex items-center break-inside-avoid p-2">
            <BookOpen className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
            <p className="text-gray-700">{track}</p>
          </div>
        ))}
      </div>
      
    </div>
    
  </div>
  <div className="mt-8 text-center">
        <a href={conferenceInfo.paperSubmissionLink} target="_blank" rel="noopener noreferrer" className="inline-flex  items-center bg-blue-600
         text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-transform duration-300 shadow-md hover:scale-105">
          <LinkIcon className="mr-2"/> Submit Your Paper
        </a>
      </div>
</Section>
);

const AnimatedCard = ({ children, delay, className }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  return (
      <div
          ref={ref}
          className={`transition-all duration-700 ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: `${delay}ms` }}
      >
          {children}
      </div>
  );
};

const CommitteeList = ({ title, members }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  return(
      <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h3>
          <div ref={ref} className="flex flex-wrap justify-center gap-3 text-left">
              {members.map((member, index) => (
                  <div
                      key={index}
                      className={`transition-all duration-500 bg-white shadow-md border border-gray-200 text-gray-700 px-4 py-2 rounded-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                  >
                      {member}
                  </div>
              ))}
          </div>
      </div>
  );
};

const CommitteeSection = () => (
  <Section id="committee" className="bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Meet the Committee</h2>
          <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">Guiding the conference with expertise and dedication, our committee comprises leaders and innovators from academia and industry.</p>
          
          {/* Main Organizing Committee */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatedCard delay={0} className="md:col-span-2 lg:col-span-3">
                  <Card className="bg-blue-100 border border-blue-200 p-5 hover:shadow-xl transition-shadow">
                      <h3 className="text-xl font-bold text-blue-800 mb-1">{committee.chiefPatron.title}</h3>
                      <p className="text-gray-800 text-lg">{committee.chiefPatron.name}</p>
                  </Card>
              </AnimatedCard>
              <AnimatedCard delay={100}>
                   <Card className="bg-indigo-100 border border-indigo-200 p-5 hover:shadow-xl transition-shadow">
                      <h3 className="text-xl font-bold text-indigo-800 mb-1">{committee.patron.title}</h3>
                      <p className="text-gray-800 text-lg">{committee.patron.name}</p>
                  </Card>
              </AnimatedCard>
              <AnimatedCard delay={200}>
                   <Card className="bg-indigo-100 border border-indigo-200 p-5 hover:shadow-xl transition-shadow">
                      <h3 className="text-xl font-bold text-indigo-800 mb-1">Conference Chair</h3>
                      <p className="text-gray-800 text-lg">{committee.conferenceCommitteeChair.name}, {committee.conferenceCommitteeChair.title}</p>
                  </Card>
              </AnimatedCard>
              <AnimatedCard delay={300}>
                   <Card className="bg-indigo-100 border border-indigo-200 p-5 hover:shadow-xl transition-shadow">
                      <h3 className="text-xl font-bold text-indigo-800 mb-1">General Chair</h3>
                      <p className="text-gray-800 text-lg">{committee.generalChair.name}, {committee.generalChair.title}</p>
                  </Card>
              </AnimatedCard>
              <AnimatedCard delay={150} className="md:col-span-2 lg:col-span-3">
                  <Card className="bg-teal-100 border border-teal-200 p-5 hover:shadow-xl transition-shadow">
                      <h3 className="text-xl font-bold text-teal-800 mb-1">General Co-Chairs</h3>
                      <p className="text-gray-800 text-lg">{committee.generalCoChairs.map(c => c.name).join(' & ')}</p>
                  </Card>
              </AnimatedCard>
              {Object.entries(committee.organizingCommittee).map(([role, person], index) => (
                  <AnimatedCard key={role} delay={250 + index * 100}>
                      <Card className="p-5 hover:shadow-xl transition-shadow h-full">
                          <h3 className="text-lg font-bold text-gray-800 mb-1 capitalize">{role.replace(/([A-Z])/g, ' $1')}</h3>
                          <p className="text-gray-600">{person}</p>
                      </Card>
                  </AnimatedCard>
              ))}
          </div>

          {/* Other Committees */}
          <CommitteeList title="International Advisory Committee" members={committee.internationalAdvisory} />
          <CommitteeList title="National Advisory Committee" members={committee.nationalAdvisory} />
          <CommitteeList title="Technical Programme Committee" members={committee.technicalProgramme} />
      </div>
  </Section>
);



const RegistrationSection = () => (
    <Section id="registration" title="Registration Details">
        <div className="max-w-4xl mx-auto overflow-x-auto">
            <div className="shadow-lg rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-white uppercase bg-blue-800">
                        <tr>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3 text-center">IEEE Member</th>
                            <th scope="col" className="px-6 py-3 text-center">Non-IEEE Member</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrationDetails.map((item, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.category}</th>
                                <td className="px-6 py-4 text-center">{item.ieeeMember}</td>
                                <td className="px-6 py-4 text-center">{item.nonIeeeMember}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </Section>
);

const ContactSection = () => (
  <Section id="contact" title="Venue & Contact" className="bg-gray-50">
    <div className="grid md:grid-cols-2 gap-10 w-[90%] mx-auto items-center">
      <div>
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Get In Touch</h3>
        <div className="space-y-4 text-gray-700 text-lg">
          <div className="flex items-start">
            <MapPin className="w-7 h-7 text-blue-600 mt-1 mr-4 flex-shrink-0" />
            <span>{conferenceInfo.venue}</span>
          </div>
          <div className="flex items-start">
            <Users className="w-7 h-7 text-blue-600 mt-1 mr-4 flex-shrink-0" />
            <div className='flex flex-col flex-wrap-reverse'>
            <span>{contact.name}, {contact.phone}</span>
            
            <span>{contact.name1}, {contact.phone1}</span>
            </div>
          </div>
          <div className="flex items-start">
            <Mail className="w-7 h-7 text-blue-600 mt-1 mr-4 flex-shrink-0" />
            <div>
                {contact.emails.map(email => (
                    <a key={email} href={`mailto:${email}`} className="block hover:text-blue-700">{email}</a>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden shadow-xl h-[350px] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.3375975017303!2d73.8728977145294!3d18.606926387366906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c70090000001%3A0x160a20f3d0273495!2sArmy%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1721390012345!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps Location of the venue"
        ></iframe>
      </div>
    </div>
  </Section>
);

const Footer = () => (
    <footer className="bg-gray-800 text-gray-300">
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* About */}
                <div className="md:col-span-2">
                    <h3 className="text-lg font-bold text-white mb-4">{conferenceInfo.acronym}</h3>
                    <p className="text-sm leading-relaxed">
                        The International Conference on Nexus of Digitalization, Intelligence, and Applications serves as a premier platform for researchers and practitioners to share innovations and advancements in the field.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#about" className="hover:text-white">About</a></li>
                        <li><a href="#papers" className="hover:text-white">Call for Papers</a></li>
                        <li><a href="#registration" className="hover:text-white">Registration</a></li>
                        <li><a href="#committee" className="hover:text-white">Committee</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
                    <address className="not-italic text-sm space-y-2">
                        <p>{conferenceInfo.venue}</p>
                        <p>
                            <a href={`mailto:${contact.emails[0]}`} className="hover:text-white">{contact.emails[0]}</a>
                        </p>
                        <p>Phone: {contact.phone}</p>
                    </address>
                </div>
            </div>

            <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                <p>&copy; {new Date().getFullYear()} {conferenceInfo.organizedBy}. All Rights Reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white" aria-label="Twitter"><Twitter size={20} /></a>
                    <a href="#" className="hover:text-white" aria-label="LinkedIn"><Linkedin size={20} /></a>
                    <a href="#" className="hover:text-white" aria-label="Facebook"><Facebook size={20} /></a>
                </div>
            </div>
        </div>
    </footer>
  );

// --- Main App Component ---
export default function App() {
  return (
    <div className="bg-white font-sans">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <KeyHighlightsSection />
        <CallForPapersSection />
        <CommitteeSection />
        <RegistrationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
