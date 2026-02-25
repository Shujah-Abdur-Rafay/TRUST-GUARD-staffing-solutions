import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  Menu, 
  X, 
  Lock, 
  Eye, 
  Clock, 
  Building2, 
  ShoppingBag, 
  GraduationCap, 
  Home as HomeIcon,
  Search,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Briefcase,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  subcategories: string[];
  image: string;
}

// --- Data ---
const SERVICES: Service[] = [
  {
    id: 'event-security',
    title: 'Event & Crowd Management',
    description: 'Expert crowd control and security solutions for venues of all sizes. We manage everything from sell out arenas and festivals to local community gatherings, ensuring safety and order through strategic planning and professional execution.',
    icon: <Users className="w-6 h-6" />,
    subcategories: ['Crowd Control', 'Festival Security', 'Stewarding', 'VIP Area Management'],
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'commercial-security',
    title: 'Commercial Security',
    description: 'Comprehensive protection for your business assets. Our commercial security services provide a visible deterrent and professional presence, tailored to the unique risks of your corporate environment.',
    icon: <Building2 className="w-6 h-6" />,
    subcategories: ['Manned Guarding', 'Concierge Security', 'Access Control', 'Front of House'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'mobile-response',
    title: 'Mobile & Response',
    description: 'Rapid response services designed to keep your premises secure 24/7. Our mobile units provide scheduled patrols and immediate response to alarm activations, minimising risk and damage.',
    icon: <Shield className="w-6 h-6" />,
    subcategories: ['Key Holding', 'Alarm Response', 'Mobile Patrols', 'Lock & Unlock Services'],
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'close-protection',
    title: 'Close Protection',
    description: 'Elite personal security for high net worth individuals, executives, and celebrities. Our CP teams are highly trained in threat assessment, defensive driving, and discreet protection.',
    icon: <Lock className="w-6 h-6" />,
    subcategories: ['Executive Protection', 'VIP Escort', 'Residential Security', 'Travel Security'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'hospitality-security',
    title: 'Hospitality Security',
    description: 'Premium security for hotels, restaurants, and luxury venues. We combine exceptional customer service with discreet, professional protection to ensure a safe and welcoming environment.',
    icon: <Users className="w-6 h-6" />,
    subcategories: ['Hotel Security', 'VIP Concierge', 'Nightlife Protection', 'Front of House'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'response-team',
    title: 'Response Team',
    description: 'Our dedicated Response Teams are ready for immediate deployment in high pressure situations. Trained in conflict resolution and emergency management to restore order quickly.',
    icon: <Clock className="w-6 h-6" />,
    subcategories: ['Rapid Deployment', 'Conflict Resolution', 'Emergency Support', 'Tactical Response'],
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'bdo-officer',
    title: 'BDO Officer',
    description: 'Behavioural Detection Officers (BDO) utilise advanced techniques to identify suspicious behaviour and potential threats before they escalate. Ideal for high traffic public spaces.',
    icon: <Eye className="w-6 h-6" />,
    subcategories: ['Threat Assessment', 'Surveillance', 'Profiling', 'De escalation'],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'retail-security',
    title: 'Retail Security',
    description: 'Protecting your profits and personnel in the retail sector. We provide loss prevention strategies, store detectives, and a professional uniformed presence to deter theft.',
    icon: <ShoppingBag className="w-6 h-6" />,
    subcategories: ['Loss Prevention', 'Store Detectives', 'Uniformed Guards', 'CCTV Monitoring'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'construction-industrial',
    title: 'Construction & Industrial',
    description: 'Robust security for building sites and industrial zones. We protect high value machinery, materials, and personnel through perimeter control and static guarding.',
    icon: <Building2 className="w-6 h-6" />,
    subcategories: ['Gatehouse Security', 'Asset Protection', 'Perimeter Patrols', 'Health & Safety Compliance'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'corporate-security',
    title: 'Corporate Security',
    description: 'Sophisticated security solutions for the corporate world. We blend professional hospitality with high level protection to secure your office and reputation.',
    icon: <Briefcase className="w-6 h-6" />,
    subcategories: ['Reception Security', 'Access Control', 'Mailroom Screening', 'Executive Floor Protection'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'specialised-protection',
    title: 'Specialised Protection',
    description: 'Niche security solutions for educational institutions, vacant properties, and high risk environments requiring bespoke risk management strategies.',
    icon: <Lock className="w-6 h-6" />,
    subcategories: ['Education Security', 'Vacant Property Protection', 'Risk Management', 'Bespoke Solutions'],
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'
  }
];

const SLIDES = [
  {
    title: "Trust Guard Staffing Solutions",
    subtitle: "Professional Security & Crowd Management Excellence",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1920",
    cta: "Our Services"
  },
  {
    title: "SIA Licensed Professionals",
    subtitle: "Highly trained personnel for every security challenge",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1920",
    cta: "Join Our Team"
  },
  {
    title: "24/7 National Coverage",
    subtitle: "Protecting your assets around the clock, across the UK",
    image: "https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=1920",
    cta: "Contact Us"
  }
];

const ThreatLevel = () => {
  const [level, setLevel] = useState<string>('SUBSTANTIAL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreatLevel = async () => {
      try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.mi5.gov.uk/UKThreatLevel/UKThreatLevel.xml')}`);
        const data = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");
        const description = xmlDoc.querySelector("item description")?.textContent;
        
        if (description) {
          const match = description.match(/is ([A-Z ]+)\./i);
          if (match) {
            setLevel(match[1].toUpperCase());
          } else {
            setLevel(description.split('.')[0].replace('The threat level is ', '').toUpperCase());
          }
        }
      } catch (error) {
        console.error("Error fetching threat level:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreatLevel();
  }, []);

  return (
    <div className="bg-logo-gradient p-6 rounded-2xl shadow-2xl shadow-orange-600/20 inline-block w-full">
      <div className="text-[10px] font-black text-white/70 uppercase tracking-[0.3em] mb-2">Current UK Level</div>
      <div className="text-white font-black text-2xl tracking-tighter uppercase leading-none">
        {loading ? 'Fetching...' : level}
      </div>
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-[8px] text-white/50 font-bold uppercase tracking-widest">Source: MI5 Security Service</p>
      </div>
    </div>
  );
};

const Logo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FF8C00" />
        <stop offset="100%" stopColor="#FF0000" />
      </linearGradient>
    </defs>
    {/* Left Bar */}
    <rect x="15" y="30" width="6" height="40" rx="3" fill="url(#logoGradient)" />
    {/* Right Bar */}
    <rect x="79" y="30" width="6" height="40" rx="3" fill="url(#logoGradient)" />
    {/* Shield Body */}
    <path d="M50 25L30 35V60C30 75 50 85 50 85C50 85 70 75 70 60V35L50 25Z" stroke="url(#logoGradient)" strokeWidth="4" />
    {/* Letter T */}
    <path d="M40 40H60M50 40V65" stroke="url(#logoGradient)" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on home, navigate to home with hash
      navigate(`/#${id}`);
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-black/95 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-4">
            <Logo className="w-14 h-14" />
            <div className="flex flex-col">
              <span className="text-white font-black text-2xl tracking-tight leading-none">TRUST GUARD</span>
              <span className="text-white text-[10px] font-bold tracking-[0.3em] leading-none mt-1">STAFFING SOLUTIONS</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Services', 'About', 'Recruitment', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={isHome ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item.toLowerCase())}
                className="text-gray-300 hover:text-logo-gradient transition-colors font-bold text-xs uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
            <button className="bg-logo-gradient text-white px-8 py-2.5 rounded-sm font-black hover:opacity-90 transition-all text-xs uppercase tracking-widest shadow-lg shadow-orange-600/20">
              Get a Quote
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {['Home', 'Services', 'About', 'Recruitment', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={isHome ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item.toLowerCase())}
                  className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-logo-gradient hover:bg-white/5 rounded-md"
                >
                  {item}
                </a>
              ))}
              <div className="pt-4">
                <button className="w-full bg-logo-gradient text-white px-6 py-3 rounded-sm font-black uppercase tracking-widest">
                  Get a Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SLIDES[current].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          </div>
          
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                {SLIDES[current].title.split(' ').map((word, i) => (
                  <span key={i} className={word === 'Trust' || word === 'Guard' || word === 'Staffing' ? 'text-logo-gradient' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light tracking-wide">
                {SLIDES[current].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-logo-gradient text-white px-10 py-4 rounded-sm font-black text-sm uppercase tracking-[0.2em] hover:opacity-90 transition-all flex items-center justify-center group shadow-2xl shadow-orange-600/20">
                  {SLIDES[current].cta}
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border border-white/30 text-white px-10 py-4 rounded-sm font-black text-sm uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-12 h-1 rounded-sm transition-all duration-500 ${current === i ? 'bg-logo-gradient' : 'bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-logo-gradient font-black tracking-[0.4em] uppercase text-xs"
          >
            Our Expertise
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mt-4 tracking-tight"
          >
            Security Solutions
          </motion.h2>
          <div className="w-24 h-1 bg-logo-gradient mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 hover:border-orange-600/50 transition-all duration-500 flex flex-col"
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                <div className="absolute bottom-6 left-8 bg-logo-gradient p-3 rounded-xl text-white shadow-xl">
                  {service.icon}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-black text-white mb-4 group-hover:text-logo-gradient transition-colors tracking-tight">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed font-medium text-sm">
                  {service.description}
                </p>
                
                <div className="grid grid-cols-1 gap-3 mt-auto">
                  {service.subcategories.map((sub) => (
                    <div key={sub} className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-logo-gradient" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
                
                <Link 
                  to={`/service/${service.id}`}
                  className="mt-8 flex items-center text-logo-gradient font-black text-[10px] uppercase tracking-widest hover:opacity-80 transition-colors group/btn"
                >
                  Explore Service
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-logo-gradient opacity-[0.03] skew-x-12 translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-logo-gradient font-black tracking-[0.4em] uppercase text-xs">About Trust Guard</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mt-4 mb-8 leading-tight tracking-tight">
              Setting the Standard in <span className="text-logo-gradient">Security</span>
            </h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed font-medium">
              Trust Guard Staffing Solutions is a premier security provider dedicated to delivering excellence in crowd management and asset protection. With a foundation built on integrity and professionalism, we serve clients across the UK with tailored security strategies.
            </p>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">
              Our team consists of SIA licensed professionals who undergo rigorous training to handle complex security scenarios. From large scale multi manned events to private commercial guarding, we ensure a safe environment for your staff, visitors, and assets.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-5xl font-black text-white mb-2">25+</div>
                <div className="text-logo-gradient font-black uppercase text-[10px] tracking-[0.3em]">Years Experience</div>
              </div>
              <div>
                <div className="text-5xl font-black text-white mb-2">500+</div>
                <div className="text-logo-gradient font-black uppercase text-[10px] tracking-[0.3em]">SIA Guards</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border-8 border-zinc-900 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=1000" 
                alt="Security Professional"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-logo-gradient p-10 rounded-sm shadow-2xl max-w-xs">
              <Shield className="w-12 h-12 text-white mb-4" />
              <h4 className="text-white font-black text-xl mb-2 uppercase tracking-tight">SIA APPROVED STAFF</h4>
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Meeting the highest industry standards.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const RecruitmentSection = () => {
  return (
    <section id="recruitment" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-zinc-900 to-black rounded-[3rem] p-12 md:p-20 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-logo-gradient opacity-[0.05] blur-[100px] rounded-full" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                Join the <span className="text-logo-gradient uppercase">Team</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 font-medium">
                We are always looking for dedicated, professional, and SIA licensed individuals to join our growing national team. Start your career in security with us today.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Competitive Rates of Pay',
                  'Flexible Working Patterns',
                  'Ongoing Training & Development',
                  'Career Progression Opportunities'
                ].map((item) => (
                  <li key={item} className="flex items-center text-white font-black text-xs uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-logo-gradient mr-4" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="bg-logo-gradient text-white px-12 py-5 rounded-sm font-black text-sm uppercase tracking-[0.3em] hover:opacity-90 transition-all shadow-2xl shadow-orange-600/40">
                Apply Now
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Door Supervisor', icon: <Users /> },
                { title: 'Security Guard', icon: <Shield /> },
                { title: 'Event Steward', icon: <Calendar /> },
                { title: 'CCTV Operator', icon: <Eye /> }
              ].map((job) => (
                <div key={job.title} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="text-logo-gradient mb-4 group-hover:scale-110 transition-transform">
                    {React.cloneElement(job.icon as React.ReactElement, { className: 'w-8 h-8' })}
                  </div>
                  <h4 className="text-white font-bold text-lg">{job.title}</h4>
                  <p className="text-gray-500 text-sm mt-2">Multiple Vacancies</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-logo-gradient font-black tracking-[0.4em] uppercase text-xs">Contact Us</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mt-4 mb-8 tracking-tight">
              Get in Touch for a <span className="text-logo-gradient uppercase">Quote</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 font-medium">
              Discuss your security requirements with our expert team. We offer comprehensive advice and tailored solutions for every sector.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="bg-zinc-900 p-4 rounded-xl text-logo-gradient shadow-xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-black text-lg uppercase tracking-tight">Call Us</h4>
                  <p className="text-gray-400 font-medium tracking-wide">+44 7308 663289 (24/7 Support)</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-zinc-900 p-4 rounded-xl text-logo-gradient shadow-xl">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-black text-lg uppercase tracking-tight">Email Us</h4>
                  <p className="text-gray-400 font-medium tracking-wide">info@tgssuk.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-zinc-900 p-4 rounded-xl text-logo-gradient shadow-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-black text-lg uppercase tracking-tight">Head Office</h4>
                  <p className="text-gray-400 font-medium tracking-wide">167 Great Portland street, London, England, W1W 5PF</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-900 p-8 md:p-12 rounded-[2rem] border border-white/5">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-xs font-black uppercase tracking-widest mb-3">Full Name</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-sm px-4 py-4 text-white focus:border-orange-600 outline-none transition-colors font-medium" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-black uppercase tracking-widest mb-3">Email Address</label>
                  <input type="email" className="w-full bg-black border border-white/10 rounded-sm px-4 py-4 text-white focus:border-orange-600 outline-none transition-colors font-medium" placeholder="Your Email" />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-black uppercase tracking-widest mb-3">Service Required</label>
                <select className="w-full bg-black border border-white/10 rounded-sm px-4 py-4 text-white focus:border-orange-600 outline-none transition-colors appearance-none font-medium">
                  <option>Event Security</option>
                  <option>Manned Guarding</option>
                  <option>Mobile Patrols</option>
                  <option>Key Holding</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-black uppercase tracking-widest mb-3">Message</label>
                <textarea rows={4} className="w-full bg-black border border-white/10 rounded-sm px-4 py-4 text-white focus:border-orange-600 outline-none transition-colors font-medium" placeholder="Tell us about your requirements..."></textarea>
              </div>
              <button className="w-full bg-logo-gradient text-white font-black py-5 rounded-sm uppercase tracking-[0.3em] text-sm hover:opacity-90 transition-all shadow-2xl shadow-orange-600/30">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer className="bg-zinc-950 pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-4 mb-8 h-12">
              <Logo className="w-12 h-12" />
              <div className="flex flex-col">
                <span className="text-white font-black text-xl tracking-tight leading-none">TRUST GUARD</span>
                <span className="text-white text-[8px] font-bold tracking-[0.3em] leading-none mt-1">STAFFING SOLUTIONS</span>
              </div>
            </Link>
            <p className="text-gray-500 mb-8 font-medium leading-relaxed">
              Leading the way in professional security and crowd management solutions across the United Kingdom.
            </p>
            <div className="flex space-x-4">
              {[
                { name: 'facebook', url: '#', icon: <Facebook className="w-5 h-5" /> },
                { name: 'twitter', url: '#', icon: <Twitter className="w-5 h-5" /> },
                { name: 'linkedin', url: 'https://www.linkedin.com/company/trust-guard-staffing-solutions-ltd/', icon: <Linkedin className="w-5 h-5" /> },
                { name: 'instagram', url: 'https://www.instagram.com/trustguard_staffing_solutions', icon: <Instagram className="w-5 h-5" /> }
              ].map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target={social.url !== '#' ? "_blank" : undefined}
                  rel={social.url !== '#' ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 bg-zinc-900 rounded-sm flex items-center justify-center text-gray-400 hover:bg-logo-gradient hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-orange-600/20"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px] h-12 flex items-center">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'About Us', 'Recruitment', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/#${item.toLowerCase().replace(' ', '')}`} 
                    className="text-gray-500 hover:text-logo-gradient transition-colors font-bold text-xs uppercase tracking-widest"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px] h-12 flex items-center">Services</h4>
            <ul className="space-y-4">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link 
                    to={`/service/${service.id}`} 
                    className="text-gray-500 hover:text-logo-gradient transition-colors font-bold text-xs uppercase tracking-widest"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px] h-12 flex items-center">National Threat Level</h4>
            <ThreatLevel />
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p>© 2026 Trust Guard Staffing Solutions Ltd. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-logo-gradient transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-logo-gradient transition-colors">Terms of Service</a>
            <Link to="/bsl" className="hover:text-logo-gradient transition-colors">BSL</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const IndustriesSection = () => {
  const industries = [
    { name: 'Retail & Shopping Centres', icon: <ShoppingBag /> },
    { name: 'Construction & Industrial', icon: <Building2 /> },
    { name: 'Education & Campus', icon: <GraduationCap /> },
    { name: 'Events & Festivals', icon: <Users /> },
    { name: 'Corporate & Office', icon: <Briefcase /> },
    { name: 'Residential & Vacant', icon: <HomeIcon /> }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-logo-gradient font-black tracking-[0.4em] uppercase text-xs">Sectors We Serve</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-4 tracking-tight">Tailored Solutions</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 p-8 rounded-sm border border-white/5 hover:border-orange-600/30 hover:bg-zinc-900 transition-all text-center group"
            >
              <div className="text-logo-gradient mb-6 flex justify-center group-hover:scale-110 transition-transform">
                {React.cloneElement(industry.icon as React.ReactElement, { className: 'w-10 h-10' })}
              </div>
              <h4 className="text-white font-black text-[10px] uppercase tracking-widest leading-tight">{industry.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Service Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="bg-logo-gradient text-white px-8 py-3 rounded-sm font-black uppercase tracking-widest text-xs"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          <div>
            <Link to="/" className="inline-flex items-center bg-logo-gradient text-white px-3 py-1 rounded-sm font-black text-[10px] uppercase tracking-widest mb-12 hover:opacity-80 transition-opacity">
              <ArrowRight className="mr-2 w-4 h-4 rotate-180" />
              Back to Services
            </Link>
            
            <div className="mb-8">
              <div className="bg-logo-gradient h-6 flex items-center px-4 mb-8">
                <span className="text-white font-black tracking-[0.4em] uppercase text-[10px]">Service Excellence</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-none tracking-tighter uppercase">
                {service.title}
              </h1>
            </div>

            <p className="text-gray-400 text-xl mb-12 leading-relaxed font-medium">
              {service.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {service.subcategories.map((sub, i) => (
                <motion.div 
                  key={sub}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center space-x-4 bg-zinc-900/50 p-6 rounded-xl border border-white/5 hover:border-orange-600/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-logo-gradient flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-white font-black text-xs uppercase tracking-widest leading-tight">{sub}</span>
                </motion.div>
              ))}
            </div>

            <button className="w-full sm:w-auto bg-logo-gradient text-white px-12 py-5 rounded-sm font-black text-sm uppercase tracking-[0.3em] hover:opacity-90 transition-all shadow-2xl shadow-orange-600/40">
              Request a Quote for {service.title}
            </button>
          </div>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[4/5] rounded-3xl overflow-hidden border-8 border-zinc-900 shadow-2xl relative"
            >
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </motion.div>
            
            <div className="absolute -bottom-8 -right-8 bg-zinc-900 p-8 rounded-sm border border-white/10 shadow-2xl max-w-xs">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-logo-gradient flex items-center justify-center text-white">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-tight">SIA APPROVED STAFF</h4>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Guaranteed Safety</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs font-medium leading-relaxed">
                Our personnel are fully vetted and trained to the highest industry standards, ensuring your peace of mind.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Content / Why Choose Us */}
        <div className="mt-32 pt-24 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">Why Choose Our <span className="text-logo-gradient">{service.title}</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Tailored Approach', desc: 'We customise our security protocols to match your specific operational needs.' },
              { title: 'Expert Personnel', desc: 'Our guards are selected for their professionalism, experience, and integrity.' },
              { title: 'Advanced Tech', desc: 'We utilise the latest surveillance and communication technology for real time reporting.' }
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900/30 p-10 rounded-2xl border border-white/5 hover:bg-zinc-900/50 transition-all">
                <h4 className="text-white font-black text-lg mb-4 uppercase tracking-tight">{item.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const BSLPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/" className="inline-flex items-center bg-logo-gradient text-white px-3 py-1 rounded-sm font-black text-[10px] uppercase tracking-widest mb-12 hover:opacity-80 transition-opacity">
            <ArrowRight className="mr-2 w-4 h-4 rotate-180" />
            Back to Home
          </Link>

          <div className="mb-16">
            <div className="bg-logo-gradient h-6 flex items-center px-4 mb-8 inline-block">
              <span className="text-white font-black tracking-[0.4em] uppercase text-[10px]">Regulatory Standards</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-none tracking-tighter uppercase">
              British Standard <span className="text-logo-gradient">Laws</span>
            </h1>
            <p className="text-gray-400 text-xl font-medium leading-relaxed">
              Trust the National Security Inspectorate for certified peace of mind. Our operations adhere to the highest British Standards in the security industry.
            </p>
          </div>

          <div className="space-y-16">
            <section>
              <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight border-l-4 border-orange-600 pl-6">National Security Inspectorate (NSI)</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                NSI approved companies operating in compliance with the British Standard for Close Protection Services (BS 8507) adhere to a comprehensive framework designed to ensure high standards in security, confidentiality, threat analysis, and protection.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5">
                  <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-widest text-orange-500">1. Confidentiality</h3>
                  <ul className="text-gray-500 text-sm space-y-2">
                    <li>• Data Protection (GDPR compliance)</li>
                    <li>• Non-Disclosure Agreements (NDAs)</li>
                    <li>• Secure & Encrypted Communication</li>
                  </ul>
                </div>
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5">
                  <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-widest text-orange-500">2. Threat Analysis</h3>
                  <ul className="text-gray-500 text-sm space-y-2">
                    <li>• Detailed Risk Assessments</li>
                    <li>• Intelligence Gathering</li>
                    <li>• Continuous Monitoring & Updates</li>
                  </ul>
                </div>
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5">
                  <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-widest text-orange-500">3. Protection</h3>
                  <ul className="text-gray-500 text-sm space-y-2">
                    <li>• Physical Protection (CPOs)</li>
                    <li>• Operational & Contingency Planning</li>
                    <li>• Advanced Security Technology</li>
                  </ul>
                </div>
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5">
                  <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-widest text-orange-500">4. Quality Assurance</h3>
                  <ul className="text-gray-500 text-sm space-y-2">
                    <li>• Regular Internal & External Audits</li>
                    <li>• NSI Accreditation Maintenance</li>
                    <li>• Continuous Service Improvement</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-zinc-900/30 p-12 rounded-[3rem] border border-white/5">
              <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-tight">Martyn's Law <span className="text-logo-gradient">(Protect Duty)</span></h2>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Martyn’s Law is a proposed UK legislation that seeks to improve security measures in public venues and spaces to protect against terrorist attacks. Named in memory of Martyn Hett, a victim of the 2017 Manchester Arena bombing.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Risk Assessments', desc: 'Mandatory identification of vulnerabilities.' },
                  { title: 'Security Plans', desc: 'Implementation of preventive measures.' },
                  { title: 'Staff Training', desc: 'Recognising and responding to threats.' },
                  { title: 'Venue Compliance', desc: 'Scaled obligations based on venue size.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-2 h-2 rounded-full bg-logo-gradient mt-2 shrink-0" />
                    <div>
                      <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">SIA Legal Requirements</h2>
              <div className="space-y-4 text-gray-400">
                <p>To work as a Close Protection Officer (CPO) in the UK, individuals must meet strict legal requirements set by the Security Industry Authority (SIA):</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 text-sm">• Must be at least 18 years old</li>
                  <li className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 text-sm">• Right to live and work in the UK</li>
                  <li className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 text-sm">• Enhanced Criminal Record Check</li>
                  <li className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 text-sm">• Certified in First Aid at Work (FAW)</li>
                  <li className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 text-sm">• 140+ hours of SIA Approved Training</li>
                </ul>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <section id="home">
        <HeroSlider />
      </section>
      
      <div className="bg-logo-gradient py-4 overflow-hidden shadow-2xl relative z-10">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-white font-black text-sm uppercase tracking-[0.3em] mx-12 flex items-center">
              <Shield className="w-5 h-5 mr-3" />
              SIA Licensed Professionals • 24/7 National Coverage • SIA Staffing Solutions • Professional Excellence •
            </span>
          ))}
        </div>
      </div>

      <ServicesSection />
      <AboutSection />
      <RecruitmentSection />
      
      <ContactSection />
    </>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black font-sans selection:bg-orange-600 selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/bsl" element={<BSLPage />} />
          </Routes>
        </main>
        <Footer />
        
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}} />
      </div>
    </Router>
  );
}
