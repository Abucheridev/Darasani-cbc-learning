import { useMemo, useState } from "react";
import {
  BookOpen, GraduationCap, Users, Brain, ClipboardCheck, Trophy, Menu, X,
  Search, Bell, ChevronRight, Sparkles, BookMarked, CalendarDays, Target,
  Languages, Moon, Sun
} from "lucide-react";
import { isSupabaseConfigured } from "./lib/supabase";

type Page = "home" | "learn" | "practice" | "tutor" | "progress" | "community";
const nav: { id: Page; label: string; icon: typeof BookOpen }[] = [
  { id: "home", label: "Overview", icon: BookOpen },
  { id: "learn", label: "Learning areas", icon: GraduationCap },
  { id: "practice", label: "Practice & quizzes", icon: ClipboardCheck },
  { id: "tutor", label: "AI learning tutor", icon: Brain },
  { id: "progress", label: "My progress", icon: Trophy },
  { id: "community", label: "Community", icon: Users },
];
const areas = [
  { name: "Mathematics", detail: "Numbers, measurement, geometry and data", grades: "Grades 6–9", icon: "➗" },
  { name: "English", detail: "Reading, writing, grammar and communication", grades: "Grades 6–9", icon: "📖" },
  { name: "Kiswahili", detail: "Lugha, sarufi, kusoma na kuandika", grades: "Grades 6–9", icon: "🗣️" },
  { name: "Integrated Science", detail: "Scientific skills and everyday discoveries", grades: "Grades 7–9", icon: "🔬" },
  { name: "Social Studies", detail: "People, places, citizenship and society", grades: "Grade 6", icon: "🌍" },
  { name: "Agriculture & Nutrition", detail: "Food, farming and healthy living", grades: "Grades 7–9", icon: "🌱" },
];
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [grade, setGrade] = useState("Grade 7");
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const filtered = useMemo(() => areas.filter(a => a.name.toLowerCase().includes(search.toLowerCase())), [search]);
  const title = nav.find(n => n.id === page)?.label ?? "Overview";
  return <div className={dark ? "app dark" : "app"}>
    <aside className={menu ? "sidebar open" : "sidebar"}>
      <div className="brand"><div className="brand-mark"><BookOpen size={22}/></div><div><strong>Darasani</strong><span>Your Learning Companion</span></div><button className="icon-button mobile-close" onClick={() => setMenu(false)} aria-label="Close menu"><X/></button></div>
      <div className="nav-label">LEARNING SPACE</div>
      <nav>{nav.map(({id,label,icon:Icon}) => <button key={id} className={page===id?"nav-item active":"nav-item"} onClick={() => {setPage(id);setMenu(false)}}><Icon size={19}/><span>{label}</span>{page===id&&<i/>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><Sparkles size={18}/><strong>Small steps. Big growth.</strong><p>Keep learning a little every day.</p></div><div className="profile-row"><div className="avatar">S</div><div><strong>Welcome, learner</strong><span>Guest preview</span></div></div></div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="topbar-left"><button className="icon-button menu-toggle" onClick={() => setMenu(true)} aria-label="Open menu"><Menu/></button><div><span className="eyebrow">DARASANI LEARNING SPACE</span><h1>{title}</h1></div></div>
        <div className="top-actions"><label className="grade-select"><GraduationCap size={17}/><select value={grade} onChange={e=>setGrade(e.target.value)} aria-label="Select grade">{[6,7,8,9].map(g=><option key={g}>Grade {g}</option>)}</select></label><button className="icon-button" onClick={()=>setDark(!dark)} aria-label="Toggle theme">{dark?<Sun size={19}/>:<Moon size={19}/>}</button><button className="icon-button notification" aria-label="Notifications"><Bell size={19}/></button><button className="sign-in">Sign in <ChevronRight size={16}/></button></div>
      </header>
      <div className="content">
        {page==="home"&&<><section className="welcome-panel"><div className="welcome-copy"><span className="pill"><Sparkles size={14}/> YOUR LEARNING JOURNEY</span><h2>Discover. Learn.<br/><em>Grow every day.</em></h2><p>Build your knowledge, practise what you've learned and become confident in every subject.</p><button className="primary-button" onClick={()=>setPage("learn")}>Explore learning areas <ChevronRight size={17}/></button></div><div className="welcome-art"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="book-illustration"><BookOpen size={76}/></div><span className="float-card card-one"><Target size={17}/> Keep improving</span><span className="float-card card-two"><Trophy size={17}/> Every step counts</span></div></section>
          <div className="section-heading"><div><span className="eyebrow">GET STARTED</span><h2>Your learning space</h2></div><button className="text-button" onClick={()=>setPage("learn")}>View all <ChevronRight size={16}/></button></div>
          <div className="quick-grid"><button className="quick-card" onClick={()=>setPage("learn")}><div className="quick-icon green"><BookMarked/></div><strong>Explore lessons</strong><span>Notes and examples for your grade</span><ChevronRight className="quick-arrow"/></button><button className="quick-card" onClick={()=>setPage("practice")}><div className="quick-icon orange"><ClipboardCheck/></div><strong>Test your knowledge</strong><span>Practise with subject assessments</span><ChevronRight className="quick-arrow"/></button><button className="quick-card" onClick={()=>setPage("tutor")}><div className="quick-icon purple"><Brain/></div><strong>Ask the AI tutor</strong><span>Get concepts explained simply</span><ChevronRight className="quick-arrow"/></button></div>
          <div className="section-heading"><div><span className="eyebrow">BUILT FOR CBC</span><h2>Learn at your own pace</h2></div></div><div className="feature-strip"><div><CalendarDays/><strong>Learn every day</strong><span>Build a steady study habit</span></div><div><Target/><strong>Know your progress</strong><span>See where you're improving</span></div><div><Languages/><strong>English & Kiswahili</strong><span>Learn in your preferred language</span></div></div></>}
        {page==="learn"&&<><div className="page-intro"><span className="eyebrow">EXPLORE THE CURRICULUM</span><h2>Learning areas for {grade}</h2><p>Choose a learning area to explore notes, examples and revision resources.</p></div><div className="search-box"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search learning areas..."/></div><div className="area-grid">{filtered.map(a=><button className="area-card" key={a.name}><span className="area-emoji">{a.icon}</span><span className="area-grade">{a.grades}</span><strong>{a.name}</strong><p>{a.detail}</p><span className="area-link">Explore topics <ChevronRight size={15}/></span></button>)}</div></>}
        {page!=="home"&&page!=="learn"&&<div className="empty-state"><div className="empty-icon">{page==="practice"?<ClipboardCheck size={32}/>:page==="tutor"?<Brain size={32}/>:page==="progress"?<Trophy size={32}/>:<Users size={32}/>}</div><span className="eyebrow">{page==="tutor"?"YOUR AI LEARNING COMPANION":"YOUR LEARNING JOURNEY"}</span><h2>{page==="practice"?"Ready to test what you know?":page==="tutor"?"Curious about something?":page==="progress"?"Your progress starts here":"A community that helps you grow"}</h2><p>{page==="practice"?"Subject assessments will help you practise questions across topics, get instant explanations and track your improvement.":page==="tutor"?"The Darasani AI tutor will explain difficult concepts step by step in simple English or Kiswahili. Sign in to access the tutor.":page==="progress"?"Create a learner account to save your learning activity, quiz scores, achievements and improvement over time.":"Connect with teachers and fellow learners through subject discussions and guided learning groups."}</p><button className="primary-button" onClick={()=>setPage("learn")}>Explore learning areas <ChevronRight size={17}/></button></div>}
      </div>
      <footer><span>© {new Date().getFullYear()} Darasani</span><span>Learn with purpose. Grow with confidence.</span><span className={isSupabaseConfigured?"connection online":"connection"}>{isSupabaseConfigured?"Backend configured":"Preview mode"}</span></footer>
    </main>{menu&&<button className="scrim" aria-label="Close navigation" onClick={()=>setMenu(false)}/>}
  </div>;
}