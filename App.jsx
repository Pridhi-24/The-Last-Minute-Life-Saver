import { useState, useEffect, useRef, useCallback } from "react";
import {
  Brain, Zap, Skull, CheckSquare, Calendar, BarChart2, ScrollText,
  Mic, MicOff, RefreshCw, ChevronDown, ChevronRight, Lock, Play, X,
  Bell, Settings, LogOut, Flame, Target, Clock, AlertTriangle, Check,
  Sparkles, Shield, Activity, Cpu, Terminal, GitBranch, TrendingUp,
  Eye, Sun, Moon, MessageSquare, Lightbulb, Repeat, Star, Plus,
  ChevronLeft, MapPin, Coffee, Award, Volume2, VolumeX, Filter,
  ArrowUpCircle, BookOpen, Smile, Frown, Meh, BatteryCharging,
  Inbox, Send, Layers, Radio, MoreHorizontal, Hash, Sliders, Tv
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────
//  THEME TOKENS
// ─────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg0: "#030712", bg1: "#060d1a", bg2: "#0a1628", bg3: "#0f1f3d",
    surface: "#0d1b35", surfaceHover: "#111f3e",
    border: "rgba(0,245,255,0.10)", border2: "rgba(0,245,255,0.22)",
    text1: "#e2e8f0", text2: "#94a3b8", text3: "#475569", text4: "#1e293b",
    glass: "rgba(13,27,53,0.70)", glassStrong: "rgba(10,22,40,0.88)",
    sidebar: "rgba(6,13,26,0.92)", header: "rgba(6,13,26,0.70)",
    card: "rgba(13,27,53,0.65)", cardHover: "rgba(13,27,53,0.9)",
    input: "rgba(0,245,255,0.04)", inputBorder: "rgba(0,245,255,0.15)",
    inputFocus: "rgba(0,245,255,0.45)", scrollbar: "rgba(0,245,255,0.2)",
    gridLine: "rgba(0,245,255,0.025)",
    orb1: "rgba(139,92,246,0.08)", orb2: "rgba(0,245,255,0.06)",
    logBg: "rgba(0,0,0,0.60)", modalBackdrop: "rgba(0,0,0,0.75)",
    progressBg: "rgba(255,255,255,0.05)",
    cyan: "#00f5ff", violet: "#8b5cf6", green: "#10b981",
    amber: "#f59e0b", red: "#ef4444", pink: "#ec4899",
    navActive: "rgba(0,245,255,0.09)", navActiveBorder: "rgba(0,245,255,0.22)",
    navActiveText: "#00f5ff",
    tagDeep: { bg: "rgba(0,245,255,0.10)", border: "rgba(0,245,255,0.25)", text: "#00f5ff" },
    tagCreative: { bg: "rgba(139,92,246,0.10)", border: "rgba(139,92,246,0.25)", text: "#c4b5fd" },
    tagMeeting: { bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.22)", text: "#fcd34d" },
    tagAdmin: { bg: "rgba(71,85,105,0.15)", border: "rgba(71,85,105,0.3)", text: "#64748b" },
  },
  light: {
    bg0: "#f0f4ff", bg1: "#e8edf8", bg2: "#dde4f5", bg3: "#d0daef",
    surface: "#ffffff", surfaceHover: "#f5f7ff",
    border: "rgba(99,102,241,0.13)", border2: "rgba(99,102,241,0.28)",
    text1: "#0f172a", text2: "#374151", text3: "#6b7280", text4: "#d1d5db",
    glass: "rgba(255,255,255,0.72)", glassStrong: "rgba(255,255,255,0.92)",
    sidebar: "rgba(248,249,255,0.95)", header: "rgba(248,249,255,0.82)",
    card: "rgba(255,255,255,0.80)", cardHover: "rgba(255,255,255,1.0)",
    input: "rgba(99,102,241,0.04)", inputBorder: "rgba(99,102,241,0.20)",
    inputFocus: "rgba(99,102,241,0.45)", scrollbar: "rgba(99,102,241,0.25)",
    gridLine: "rgba(99,102,241,0.04)",
    orb1: "rgba(139,92,246,0.07)", orb2: "rgba(99,102,241,0.06)",
    logBg: "rgba(248,249,255,0.95)", modalBackdrop: "rgba(15,23,42,0.55)",
    progressBg: "rgba(0,0,0,0.06)",
    cyan: "#4f46e5", violet: "#7c3aed", green: "#059669",
    amber: "#d97706", red: "#dc2626", pink: "#db2777",
    navActive: "rgba(79,70,229,0.10)", navActiveBorder: "rgba(79,70,229,0.30)",
    navActiveText: "#4f46e5",
    tagDeep: { bg: "rgba(79,70,229,0.09)", border: "rgba(79,70,229,0.25)", text: "#4f46e5" },
    tagCreative: { bg: "rgba(124,58,237,0.09)", border: "rgba(124,58,237,0.22)", text: "#7c3aed" },
    tagMeeting: { bg: "rgba(217,119,6,0.09)", border: "rgba(217,119,6,0.22)", text: "#d97706" },
    tagAdmin: { bg: "rgba(107,114,128,0.10)", border: "rgba(107,114,128,0.25)", text: "#6b7280" },
  },
};

// ─────────────────────────────────────────────────────────────────
//  STATIC DATA
// ─────────────────────────────────────────────────────────────────
const INITIAL_TASKS = [
  { id:1, title:"Client Pitch Meeting", priority:"high", deadline:"Today 3PM", tag:"Creative", brainWeight:3,
    aiScore:95, context:"High-stakes client deliverable. Impacts Q3 revenue.",
    subtasks:[{id:1,label:"Make PPT deck",done:false},{id:2,label:"Write script & talking points",done:false},{id:3,label:"Rehearse 2× run-through",done:false},{id:4,label:"Send calendar invite",done:true}],
    aiStarted:false, aiLog:null, reminder:null },
  { id:2, title:"Q3 Engineering Report", priority:"high", deadline:"Tomorrow 9AM", tag:"Deep Work", brainWeight:5,
    aiScore:88, context:"Quarterly review — exec team reads this. Block 2h focus window.",
    subtasks:[{id:1,label:"Gather metrics from dashboard",done:true},{id:2,label:"Draft executive summary",done:false},{id:3,label:"Review with team lead",done:false}],
    aiStarted:false, aiLog:null, reminder:null },
  { id:3, title:"Weekly Team Standup", priority:"low", deadline:"Thu 10AM", tag:"Meeting", brainWeight:1,
    aiScore:30, context:"Recurring sync. Can be summarised and async'd if ruthless mode active.",
    subtasks:[{id:1,label:"Prep talking points",done:false},{id:2,label:"Block calendar slot",done:true}],
    aiStarted:false, aiLog:null, reminder:null },
  { id:4, title:"Redesign Figma Prototype", priority:"medium", deadline:"Fri EOD", tag:"Creative", brainWeight:4,
    aiScore:72, context:"UX deliverable for sprint review. Start with canvas setup.",
    subtasks:[{id:1,label:"Set up Figma canvas",done:false},{id:2,label:"Map user flows",done:false},{id:3,label:"Design hi-fi screens",done:false},{id:4,label:"Share prototype link",done:false}],
    aiStarted:false, aiLog:null, reminder:null },
  { id:5, title:"Respond to vendor emails", priority:"low", deadline:"This week", tag:"Admin", brainWeight:1,
    aiScore:20, context:"Low urgency admin. Batch with other email tasks to minimise interruption.",
    subtasks:[{id:1,label:"Reply to Acme Corp invoice",done:false},{id:2,label:"Follow up on software renewal",done:false}],
    aiStarted:false, aiLog:null, reminder:null },
];

const AI_STARTS = {
  1:"Generated a 6-slide PPT skeleton in Google Slides with narrative arc. Opening hook and 3 key stats drafted.",
  2:"Pulled Q3 KPIs from the analytics API. 3-paragraph executive summary written and ready for review.",
  4:"Figma canvas created with auto-layout frames for mobile, tablet and desktop. Component library linked.",
};

const AI_RECO = [
  { id:1, icon:Brain, color:"#8b5cf6", title:"Schedule Deep Work at 9AM", body:"Your focus peaks between 9–11 AM based on your completion patterns. Block this for the Q3 Report.", action:"Block 9AM", tag:"Scheduling" },
  { id:2, icon:Coffee, color:"#f59e0b", title:"Take a 10-min break now", body:"You've been in focus mode for 87 minutes. A short break increases output by ~23% in the next session.", action:"Start timer", tag:"Wellness" },
  { id:3, icon:ArrowUpCircle, color:"#00f5ff", title:"Move Figma task earlier", body:"Friday EOD deadlines often slip. Shifting to Thursday gives a 1-day buffer.", action:"Reschedule", tag:"Prioritization" },
  { id:4, icon:Layers, color:"#ec4899", title:"Batch your admin tasks", body:"Vendor emails + invoice review = 22 min total. Do them together at 4PM to protect morning focus.", action:"Create batch", tag:"Efficiency" },
];

const REMINDERS = [
  { id:1, taskId:1, msg:"Client Pitch in 2 hours — run through your script!", time:"1:00 PM", type:"deadline", triggered:false },
  { id:2, taskId:2, msg:"Q3 Report due tomorrow — executive summary still pending.", time:"5:00 PM", type:"context", triggered:false },
  { id:3, taskId:null, msg:"Peak focus window opens in 15 min. Close Slack.", time:"8:45 AM", type:"focus", triggered:true },
];

const HABITS = [
  { id:1, label:"Deep Focus Block (2h)", done:true, streak:5, goal:5 },
  { id:2, label:"Review Goals", done:true, streak:12, goal:7 },
  { id:3, label:"No-meeting morning", done:false, streak:3, goal:5 },
  { id:4, label:"End-of-day wrap-up", done:false, streak:7, goal:7 },
  { id:5, label:"Read 20 min", done:false, streak:2, goal:7 },
];

const WEEKLY_GOALS = [
  { label:"Tasks Done", value:11, total:18, color:"cyan" },
  { label:"Deep Work hrs", value:6, total:10, color:"violet" },
  { label:"Habits", value:4, total:5, color:"green" },
];

const SCHEDULE_SLOTS = [
  { time:"09:00", label:"Deep Work — Q3 Engineering Report", type:"deep", dur:"2h", icon:Brain, synced:true },
  { time:"11:00", label:"Client Pitch Deck Prep", type:"creative", dur:"1h", icon:Layers, synced:true },
  { time:"12:00", label:"Lunch · Recharge", type:"break", dur:"1h", icon:Coffee, synced:false },
  { time:"13:00", label:"Figma Prototype Redesign", type:"creative", dur:"1.5h", icon:GitBranch, synced:true },
  { time:"14:30", label:"Team Standup (AI-optional)", type:"meeting", dur:"15m", icon:Radio, synced:true },
  { time:"15:00", label:"★ Client Pitch Meeting — CRITICAL", type:"deadline", dur:"1h", icon:AlertTriangle, synced:true },
  { time:"16:00", label:"Vendor Email Batch", type:"admin", dur:"30m", icon:ScrollText, synced:false },
  { time:"16:30", label:"End-of-Day AI Debrief", type:"admin", dur:"30m", icon:Check, synced:false },
];

const LOGS_INIT = [
  { id:1, time:"09:12:04", msg:"System bootstrap complete. 5 tasks loaded into triage queue.", type:"info" },
  { id:2, time:"09:12:08", msg:"Brain Battery index calculated: 78% — peak cognitive window detected.", type:"success" },
  { id:3, time:"09:30:22", msg:"Context-switch detected: deep-work → creative. Reorder recommended.", type:"warn" },
  { id:4, time:"09:45:01", msg:"Idle threshold crossed (8 min). Nudge protocol armed.", type:"warn" },
];

const WEEKS_DATA = [
  { day:"M", tasks:4, focus:3 }, { day:"T", tasks:6, focus:5 }, { day:"W", tasks:3, focus:4 },
  { day:"T", tasks:5, focus:2 }, { day:"F", tasks:7, focus:6 }, { day:"S", tasks:2, focus:1 }, { day:"S", tasks:1, focus:0 },
];

const VOICE_PHRASES = [
  "Opening task triage view…",
  "Brain Battery is at 78%. Your peak focus window is now.",
  "Scheduling deep work block for 9AM tomorrow…",
  "Ruthless Mode armed. Locking low-priority tasks.",
  "Reminder set: Client pitch in 2 hours.",
  "Adding new task to the queue…",
  "Optimizing your schedule based on deadlines…",
];

const MOOD_OPTIONS = [
  { icon:Smile, label:"Focused", color:"#10b981", value:"focused" },
  { icon:Meh,   label:"Neutral", color:"#f59e0b", value:"neutral" },
  { icon:Frown, label:"Drained", color:"#ef4444", value:"drained" },
];

const NAV_ITEMS = [
  { id:"tasks",    label:"Task Triage",    icon:CheckSquare },
  { id:"schedule", label:"AI Schedule",    icon:Calendar },
  { id:"reco",     label:"AI Coach",       icon:Lightbulb },
  { id:"reminders",label:"Reminders",      icon:Bell },
  { id:"goals",    label:"Goals & Habits", icon:Target },
  { id:"logs",     label:"Agent Logs",     icon:Terminal },
  { id:"analytics",label:"Analytics",      icon:BarChart2 },
];

// ─────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────
function useTheme() {
  const [mode, setMode] = useState("dark");
  const t = THEMES[mode];
  return { t, mode, toggle: () => setMode(m => m === "dark" ? "light" : "dark") };
}

function px(val) { return typeof val === "number" ? `${val}px` : val; }

function getTagStyle(tag, t) {
  const map = { "Deep Work": t.tagDeep, "Creative": t.tagCreative, "Meeting": t.tagMeeting, "Admin": t.tagAdmin };
  return map[tag] || t.tagAdmin;
}

function getScheduleStyle(type, t) {
  const isDark = t === THEMES.dark;
  const map = {
    deep:     { bg: isDark ? "rgba(0,245,255,0.06)"   : "rgba(79,70,229,0.06)",   border: isDark ? "rgba(0,245,255,0.18)"   : "rgba(79,70,229,0.20)",   text: t.cyan },
    creative: { bg: isDark ? "rgba(139,92,246,0.06)"  : "rgba(124,58,237,0.06)",  border: isDark ? "rgba(139,92,246,0.18)"  : "rgba(124,58,237,0.20)",  text: t.violet },
    meeting:  { bg: isDark ? "rgba(245,158,11,0.06)"  : "rgba(217,119,6,0.06)",   border: isDark ? "rgba(245,158,11,0.18)"  : "rgba(217,119,6,0.20)",   text: t.amber },
    break:    { bg: isDark ? "rgba(16,185,129,0.06)"  : "rgba(5,150,105,0.06)",   border: isDark ? "rgba(16,185,129,0.18)"  : "rgba(5,150,105,0.20)",   text: t.green },
    deadline: { bg: isDark ? "rgba(239,68,68,0.09)"   : "rgba(220,38,38,0.07)",   border: isDark ? "rgba(239,68,68,0.38)"   : "rgba(220,38,38,0.35)",   text: t.red },
    admin:    { bg: isDark ? "rgba(71,85,105,0.09)"   : "rgba(107,114,128,0.07)", border: isDark ? "rgba(71,85,105,0.20)"   : "rgba(107,114,128,0.20)", text: t.text3 },
  };
  return map[type] || map.admin;
}

// ─────────────────────────────────────────────────────────────────
//  STYLE INJECTOR
// ─────────────────────────────────────────────────────────────────
function StyleInjector({ t, mode }) {
  const isDark = mode === "dark";
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; overflow: hidden; }
    body { background: ${t.bg0}; font-family: 'Space Grotesk', sans-serif; color: ${t.text1}; transition: background 0.35s, color 0.35s; }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${t.scrollbar}; border-radius: 2px; }
    .grid-bg {
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background-image: linear-gradient(${t.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px);
      background-size: 40px 40px;
    }
    .orb1 { position:fixed; width:600px; height:600px; border-radius:50%; background:radial-gradient(circle,${t.orb1} 0%,transparent 70%); top:-200px; left:-200px; pointer-events:none; z-index:0; }
    .orb2 { position:fixed; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,${t.orb2} 0%,transparent 70%); bottom:-150px; right:-100px; pointer-events:none; z-index:0; }
    .glass { background:${t.glass}; border:1px solid ${t.border}; backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); }
    .glass-strong { background:${t.glassStrong}; border:1px solid ${t.border2}; backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); }
    .card { background:${t.card}; border:1px solid ${t.border}; transition:border-color 0.2s, background 0.2s; }
    .card:hover { background:${t.cardHover}; border-color:${t.border2}; }
    .nav-item { display:flex; align-items:center; gap:10px; padding:9px 13px; border-radius:9px; font-size:13px; font-weight:500; cursor:pointer; transition:all 0.18s; color:${t.text2}; border:1px solid transparent; background:none; font-family:'Space Grotesk',sans-serif; width:100%; text-align:left; }
    .nav-item:hover { color:${t.text1}; background:${isDark ? "rgba(0,245,255,0.04)" : "rgba(79,70,229,0.05)"}; }
    .nav-item.active { color:${t.navActiveText}; background:${t.navActive}; border-color:${t.navActiveBorder}; }
    .btn-ghost { display:inline-flex; align-items:center; gap:6px; padding:7px 14px; border-radius:8px; font-size:11px; font-weight:600; letter-spacing:0.05em; cursor:pointer; border:1px solid ${t.border2}; color:${t.cyan}; background:${isDark?"rgba(0,245,255,0.05)":"rgba(79,70,229,0.06)"}; transition:all 0.18s; text-transform:uppercase; font-family:'Space Grotesk',sans-serif; }
    .btn-ghost:hover { background:${isDark?"rgba(0,245,255,0.12)":"rgba(79,70,229,0.12)"}; box-shadow:0 0 16px ${isDark?"rgba(0,245,255,0.18)":"rgba(79,70,229,0.18)"}; }
    .btn-ghost:active { transform:scale(0.97); }
    .btn-solid { display:inline-flex; align-items:center; gap:6px; padding:9px 20px; border-radius:9px; font-size:12px; font-weight:700; cursor:pointer; border:none; background:linear-gradient(135deg,${t.cyan},${t.violet}); color:${isDark?"#000":"#fff"}; transition:all 0.2s; letter-spacing:0.04em; text-transform:uppercase; font-family:'Space Grotesk',sans-serif; }
    .btn-solid:hover { opacity:0.86; box-shadow:0 0 28px ${isDark?"rgba(0,245,255,0.28)":"rgba(79,70,229,0.28)"}; }
    .btn-solid:active { transform:scale(0.97); }
    .btn-ruthless { display:inline-flex; align-items:center; gap:8px; padding:9px 18px; border-radius:8px; font-family:'Space Grotesk',sans-serif; font-size:12px; font-weight:700; cursor:pointer; text-transform:uppercase; letter-spacing:0.07em; transition:all 0.25s; }
    .btn-ruthless.off { border:1px solid ${t.red}55; color:${t.red}aa; background:${isDark?"rgba(239,68,68,0.05)":"rgba(220,38,38,0.05)"}; }
    .btn-ruthless.off:hover { border-color:${t.red}; color:${t.red}; box-shadow:0 0 16px ${t.red}33; }
    .btn-ruthless.on { border:1px solid ${t.red}; color:#fff; background:linear-gradient(135deg,#7f1d1d,#991b1b); box-shadow:0 0 28px rgba(239,68,68,0.38); animation:pulseRed 2s infinite; }
    .cb { width:16px; height:16px; border-radius:4px; border:1px solid ${t.border2}; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; transition:all 0.15s; background:transparent; }
    .cb.checked { background:${t.cyan}; border-color:${t.cyan}; }
    .cb:hover { border-color:${t.cyan}; box-shadow:0 0 8px ${t.cyan}33; }
    .prog-bar { height:4px; border-radius:2px; background:${t.progressBg}; overflow:hidden; }
    .prog-fill { height:100%; border-radius:2px; transition:width 0.9s ease; }
    .tag-pill { display:inline-flex; align-items:center; font-size:10px; font-weight:700; padding:3px 9px; border-radius:20px; letter-spacing:0.06em; text-transform:uppercase; }
    .badge { display:inline-flex; align-items:center; font-size:10px; font-weight:600; padding:2px 8px; border-radius:20px; }
    .modal-bd { position:fixed; inset:0; background:${t.modalBackdrop}; backdrop-filter:blur(6px); z-index:100; display:flex; align-items:center; justify-content:center; padding:20px; }
    .toast { position:fixed; bottom:28px; right:28px; z-index:200; max-width:390px; border-radius:14px; padding:14px 18px; display:flex; align-items:flex-start; gap:12px; background:${isDark?"rgba(10,22,40,0.97)":"rgba(255,255,255,0.97)"}; border:1px solid ${t.border2}; box-shadow:0 8px 40px ${isDark?"rgba(0,245,255,0.15)":"rgba(79,70,229,0.18)"}; animation:slideUp 0.3s ease; }
    .ai-badge { display:flex; align-items:flex-start; gap:10px; background:${t.green}11; border:1px solid ${t.green}33; border-radius:10px; padding:12px 14px; }
    .voice-pulse { animation:voicePulse 0.8s ease-in-out infinite alternate; }
    .blink { animation:blink 1s step-end infinite; }
    .fade-in { animation:fadeIn 0.35s ease; }
    .slide-in { animation:slideIn 0.3s ease; }
    .ruthless-banner { background:linear-gradient(90deg,rgba(127,29,29,0.85),rgba(153,27,27,0.55)); border-bottom:1px solid rgba(239,68,68,0.4); padding:7px 24px; display:flex; align-items:center; gap:8px; font-size:11px; font-weight:700; letter-spacing:0.08em; color:#fca5a5; text-transform:uppercase; }
    .score-ring { transition:stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1); }
    @keyframes pulseRed { 0%,100%{box-shadow:0 0 20px rgba(239,68,68,0.38);}50%{box-shadow:0 0 40px rgba(239,68,68,0.65);} }
    @keyframes slideUp { from{transform:translateY(16px);opacity:0;}to{transform:translateY(0);opacity:1;} }
    @keyframes fadeIn { from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);} }
    @keyframes slideIn { from{opacity:0;transform:translateX(-10px);}to{opacity:1;transform:translateX(0);} }
    @keyframes voicePulse { from{transform:scale(1);}to{transform:scale(1.18);} }
    @keyframes blink { 50%{opacity:0;} }
    @keyframes spin { to{transform:rotate(360deg);} }
    @keyframes pulseDot { 0%,100%{opacity:1;}50%{opacity:0.35;} }
    .pulse-dot { width:7px; height:7px; border-radius:50%; background:${t.green}; box-shadow:0 0 6px ${t.green}; animation:pulseDot 2s infinite; }
    .scanlines::after { content:''; position:fixed; inset:0; pointer-events:none; z-index:1; background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(239,68,68,0.018) 2px,rgba(239,68,68,0.018) 4px); }
    .section-label { font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:${t.text3}; margin-bottom:8px; }
    .cyber-divider { height:1px; background:linear-gradient(90deg,transparent,${t.border2},transparent); margin:8px 0; }
  `;
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
    return () => el.remove();
  }, [mode]);
  return null;
}

// ─────────────────────────────────────────────────────────────────
//  TINY SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────────
function Toast({ msg, icon, onClose, t }) {
  useEffect(() => { const id = setTimeout(onClose, 4800); return () => clearTimeout(id); }, []);
  return (
    <div className="toast">
      <span style={{ color: t.cyan, flexShrink: 0, marginTop: 2 }}>{icon || <Sparkles size={15} />}</span>
      <p style={{ fontSize: 13, color: t.text1, lineHeight: 1.55, flex: 1 }}>{msg}</p>
      <button onClick={onClose} style={{ color: t.text3, cursor: "pointer", background: "none", border: "none", padding: 2 }}><X size={13} /></button>
    </div>
  );
}

function Modal({ title, children, onClose, t, width = 460 }) {
  return (
    <div className="modal-bd" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="glass-strong" style={{ borderRadius: 18, width: "100%", maxWidth: width, boxShadow: `0 0 50px ${t.cyan}18` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "17px 24px", borderBottom: `1px solid ${t.border}` }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: t.text1 }}>{title}</span>
          <button onClick={onClose} style={{ color: t.text3, cursor: "pointer", background: "none", border: "none" }}><X size={16} /></button>
        </div>
        <div style={{ padding: "22px 24px" }}>{children}</div>
      </div>
    </div>
  );
}

function Pill({ children, color, bg, border }) {
  return <span className="tag-pill" style={{ color, background: bg, border: `1px solid ${border}` }}>{children}</span>;
}

function SectionLabel({ children, t }) {
  return <p className="section-label" style={{ color: t.text3 }}>{children}</p>;
}

function ProgBar({ pct, color, height = 4 }) {
  return (
    <div className="prog-bar" style={{ height }}>
      <div className="prog-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  BRAIN BATTERY
// ─────────────────────────────────────────────────────────────────
function BrainBattery({ level, animate, t }) {
  const R = 38; const circ = 2 * Math.PI * R;
  const offset = circ - (level / 100) * circ;
  const color = level > 65 ? t.cyan : level > 35 ? t.amber : t.red;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ position: "relative", width: 96, height: 96 }}>
        <svg width="96" height="96" style={{ transform: "rotate(-90deg)" }} viewBox="0 0 96 96">
          <defs><filter id="bb-glow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          <circle cx="48" cy="48" r={R} stroke={`${color}18`} strokeWidth="7" fill="none" />
          <circle cx="48" cy="48" r={R} stroke={color} strokeWidth="7" fill="none"
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
            filter="url(#bb-glow)" className="score-ring"
            style={{ transition: animate ? "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)" : "none" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Brain size={14} style={{ color }} />
          <span style={{ fontSize: 16, fontWeight: 700, color, fontFamily: "JetBrains Mono,monospace", marginTop: 2 }}>{level}%</span>
        </div>
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, color: t.text3, letterSpacing: "0.08em", textTransform: "uppercase" }}>Brain Battery</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  VOICE ASSISTANT MODAL
// ─────────────────────────────────────────────────────────────────
function VoiceModal({ onClose, t, onCommand }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [step, setStep] = useState(0);
  const phrases = VOICE_PHRASES;

  const startListen = () => {
    setListening(true); setTranscript(""); setResponse("");
    setTimeout(() => {
      setTranscript("Schedule deep work block for tomorrow morning");
      setTimeout(() => {
        setListening(false);
        setResponse(phrases[Math.floor(Math.random() * phrases.length)]);
        onCommand && onCommand("voice_cmd");
      }, 1200);
    }, 1800);
  };

  return (
    <Modal title="🎙 Voice Assistant" onClose={onClose} t={t} width={440}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ width: "100%", minHeight: 56, background: `${t.cyan}08`, border: `1px solid ${t.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <Mic size={14} style={{ color: t.text3, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: transcript ? t.text1 : t.text3, fontStyle: transcript ? "normal" : "italic", fontFamily: transcript ? "inherit" : "inherit" }}>
            {transcript || "Click the mic and speak a command…"}
          </span>
        </div>

        <button onClick={startListen} disabled={listening}
          style={{ width: 72, height: 72, borderRadius: "50%", border: `2px solid ${listening ? t.cyan : t.border2}`, background: listening ? `${t.cyan}18` : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", boxShadow: listening ? `0 0 28px ${t.cyan}44` : "none" }}>
          <Mic size={28} className={listening ? "voice-pulse" : ""} style={{ color: listening ? t.cyan : t.text2 }} />
        </button>
        {listening && <p style={{ fontSize: 12, color: t.cyan, fontFamily: "JetBrains Mono,monospace" }}>Listening<span className="blink">…</span></p>}

        {response && (
          <div style={{ width: "100%", background: `${t.green}10`, border: `1px solid ${t.green}30`, borderRadius: 10, padding: "12px 16px", display: "flex", gap: 10 }}>
            <Volume2 size={14} style={{ color: t.green, flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: t.green, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>AI Response</p>
              <p style={{ fontSize: 13, color: t.text2, lineHeight: 1.55 }}>{response}</p>
            </div>
          </div>
        )}

        <div style={{ width: "100%", borderTop: `1px solid ${t.border}`, paddingTop: 14 }}>
          <SectionLabel t={t}>Sample commands</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
            {["Schedule deep work", "What's my priority?", "Activate Ruthless Mode", "Show reminders", "Add new task"].map(c => (
              <span key={c} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: `${t.cyan}09`, border: `1px solid ${t.border}`, color: t.text2, cursor: "pointer" }}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────
//  ADD TASK MODAL
// ─────────────────────────────────────────────────────────────────
function AddTaskModal({ onClose, onAdd, t }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [deadline, setDeadline] = useState("");
  const [tag, setTag] = useState("Deep Work");

  const submit = () => {
    if (!title.trim()) return;
    onAdd({ id: Date.now(), title: title.trim(), priority, deadline: deadline || "TBD", tag, brainWeight: 3, aiScore: 50, context: "User-added task.", subtasks: [], aiStarted: false, aiLog: null, reminder: null });
    onClose();
  };

  const inp = { width: "100%", background: t.input, border: `1px solid ${t.inputBorder}`, color: t.text1, borderRadius: 10, padding: "10px 14px", fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, outline: "none" };
  const lbl = { fontSize: 11, fontWeight: 600, color: t.text3, letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 6 };

  return (
    <Modal title="＋ New Task" onClose={onClose} t={t}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div><label style={lbl}>Task title</label><input style={inp} value={title} onChange={e => setTitle(e.target.value)} placeholder="What needs to get done?" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={lbl}>Priority</label>
            <select style={{ ...inp, cursor: "pointer" }} value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="high">🔴 High</option><option value="medium">🟡 Medium</option><option value="low">⚫ Low</option>
            </select>
          </div>
          <div>
            <label style={lbl}>Tag</label>
            <select style={{ ...inp, cursor: "pointer" }} value={tag} onChange={e => setTag(e.target.value)}>
              <option>Deep Work</option><option>Creative</option><option>Meeting</option><option>Admin</option>
            </select>
          </div>
        </div>
        <div><label style={lbl}>Deadline</label><input style={inp} value={deadline} onChange={e => setDeadline(e.target.value)} placeholder="e.g. Tomorrow 5PM" /></div>
        <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px", borderRadius: 9, border: `1px solid ${t.border2}`, background: "transparent", color: t.text2, fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif", cursor: "pointer" }}>Cancel</button>
          <button onClick={submit} className="btn-solid" style={{ flex: 1, justifyContent: "center", padding: "11px", borderRadius: 9, fontSize: 13 }}><Plus size={13} /> Add Task</button>
        </div>
      </div>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────
//  LOGIN
// ─────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin, t, mode, toggleTheme }) {
  const [email, setEmail] = useState("alex@nexus.ai");
  const [pass, setPass] = useState("nexus_2024");
  const [loading, setLoading] = useState(false);
  const go = () => { setLoading(true); setTimeout(() => { setLoading(false); onLogin(); }, 1200); };
  const inp = { width: "100%", background: t.input, border: `1px solid ${t.inputBorder}`, color: t.text1, borderRadius: 10, padding: "12px 16px", fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, outline: "none" };

  return (
    <div style={{ minHeight: "100vh", background: t.bg0, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", overflow: "hidden", transition: "background 0.35s" }}>
      <div className="grid-bg" /><div className="orb1" /><div className="orb2" />
      <button onClick={toggleTheme} style={{ position: "absolute", top: 20, right: 20, background: "none", border: `1px solid ${t.border2}`, borderRadius: 8, padding: "7px 10px", cursor: "pointer", color: t.text2, display: "flex", alignItems: "center", gap: 6, fontSize: 12, zIndex: 10 }}>
        {mode === "dark" ? <Sun size={14} /> : <Moon size={14} />} {mode === "dark" ? "Light" : "Dark"}
      </button>

      <div style={{ width: "100%", maxWidth: 430, position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: `linear-gradient(135deg,${t.cyan},${t.violet})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px ${t.cyan}44` }}>
              <Zap size={22} style={{ color: "#000" }} />
            </div>
            <span style={{ fontSize: 28, fontWeight: 700, color: t.text1, letterSpacing: "-0.02em" }}>Nexus<span style={{ color: t.cyan, textShadow: `0 0 16px ${t.cyan}77` }}>AI</span></span>
          </div>
          <p style={{ fontSize: 12, color: t.text3, letterSpacing: "0.1em", textTransform: "uppercase" }}>Productivity · Command Center · v2.5</p>
        </div>

        <div className="glass-strong" style={{ borderRadius: 22, padding: 38, boxShadow: `0 0 50px ${t.cyan}12` }}>
          <h1 style={{ fontSize: 23, fontWeight: 700, color: t.text1, marginBottom: 6 }}>Welcome back</h1>
          <p style={{ fontSize: 13, color: t.text3, marginBottom: 28 }}>Sign in to your AI command center</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
            <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: t.text3, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 7 }}>Email</label>
              <input style={inp} value={email} onChange={e => setEmail(e.target.value)} /></div>
            <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: t.text3, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 7 }}>Password</label>
              <input style={inp} type="password" value={pass} onChange={e => setPass(e.target.value)} /></div>
          </div>
          <button className="btn-solid" onClick={go} disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "13px 20px", fontSize: 13, borderRadius: 11 }}>
            {loading ? <><RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> Authenticating…</> : <><Zap size={14} /> Access System</>}
          </button>
          <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 22 }}>
            {[[Shield, t.green, "SOC 2"], [Cpu, t.cyan, "AI-Native"], [Activity, t.violet, "Real-time"]].map(([Icon, c, lbl]) => (
              <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: t.text3 }}>
                <Icon size={11} style={{ color: c }} /> {lbl}
              </div>
            ))}
          </div>
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: t.text4, marginTop: 18 }}>Demo — click "Access System"</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  SIDEBAR
// ─────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, ruthless, onLogout, t, mode, toggleTheme }) {
  return (
    <aside style={{ width: 218, flexShrink: 0, display: "flex", flexDirection: "column", background: t.sidebar, borderRight: `1px solid ${t.border}`, backdropFilter: "blur(20px)", zIndex: 10, transition: "background 0.35s" }}>
      <div style={{ padding: "20px 16px 16px", borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: ruthless ? "linear-gradient(135deg,#7f1d1d,#ef4444)" : `linear-gradient(135deg,${t.cyan},${t.violet})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: ruthless ? "0 0 16px rgba(239,68,68,0.45)" : `0 0 16px ${t.cyan}44`, transition: "all 0.4s", flexShrink: 0 }}>
            <Zap size={16} style={{ color: "#000" }} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.text1 }}>Nexus<span style={{ color: ruthless ? t.red : t.cyan }}>{ruthless ? "💀" : "AI"}</span></div>
            <div style={{ fontSize: 10, color: t.text3, fontFamily: "JetBrains Mono,monospace" }}>v2.5.0-stable</div>
          </div>
        </div>
        {ruthless && <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, color: t.red, letterSpacing: "0.08em", textTransform: "uppercase" }}><div style={{ width: 5, height: 5, borderRadius: "50%", background: t.red, animation: "pulseDot 1s infinite" }} />RUTHLESS ACTIVE</div>}
      </div>

      <div style={{ padding: "10px 14px", borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: t.text3 }}>
          <div className="pulse-dot" /><span>5 active · 3 deadlines today</span>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button key={id} className={`nav-item${active === id ? " active" : ""}`} onClick={() => setActive(id)}>
            <Icon size={15} style={{ flexShrink: 0 }} />{label}
          </button>
        ))}
      </nav>

      <div style={{ padding: "12px 14px", borderTop: `1px solid ${t.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${t.violet},${t.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#000", flexShrink: 0 }}>A</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.text1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Alex Chen</div>
            <div style={{ fontSize: 11, color: t.text3 }}>Pro Plan</div>
          </div>
          <button onClick={onLogout} style={{ color: t.text3, cursor: "pointer", background: "none", border: "none" }}><LogOut size={13} /></button>
        </div>
        <button onClick={toggleTheme} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "7px", borderRadius: 8, background: "transparent", border: `1px solid ${t.border}`, cursor: "pointer", color: t.text2, fontSize: 12, fontFamily: "'Space Grotesk',sans-serif", transition: "all 0.2s" }}>
          {mode === "dark" ? <Sun size={13} /> : <Moon size={13} />} {mode === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────
//  TASK CARD
// ─────────────────────────────────────────────────────────────────
function TaskCard({ task, ruthless, onToggleSub, onAIStart, t }) {
  const [open, setOpen] = useState(false);
  const locked = ruthless && task.priority === "low";
  const urgentRed = ruthless && task.priority === "high";
  const done = task.subtasks.filter(s => s.done).length;
  const total = task.subtasks.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const ts = getTagStyle(task.tag, t);
  const scoreColor = task.aiScore >= 80 ? t.red : task.aiScore >= 50 ? t.amber : t.green;

  return (
    <div className="card" style={{ borderRadius: 13, overflow: "hidden", borderColor: urgentRed ? `${t.red}44` : locked ? t.border : t.border, opacity: locked ? 0.38 : 1, pointerEvents: locked ? "none" : "auto", boxShadow: urgentRed ? `0 0 18px ${t.red}18` : "none" }}>
      <div onClick={() => setOpen(o => !o)} style={{ padding: "13px 16px", display: "flex", alignItems: "center", gap: 11, cursor: "pointer" }}>
        {locked ? <Lock size={13} style={{ color: t.text4, flexShrink: 0 }} /> : <div style={{ color: open ? t.cyan : t.text3, flexShrink: 0, transition: "color 0.2s" }}>{open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</div>}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: locked ? t.text3 : t.text1 }}>{task.title}</span>
            {urgentRed && <Flame size={12} style={{ color: t.red }} />}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 5 }}>
            <Pill color={ts.text} bg={ts.bg} border={ts.border}>{task.tag}</Pill>
            <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: t.text3 }}><Clock size={10} />{task.deadline}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10, color: scoreColor, fontFamily: "JetBrains Mono,monospace", fontWeight: 700 }}>AI:{task.aiScore}</span>
            <span style={{ fontSize: 11, color: t.text3, fontFamily: "JetBrains Mono,monospace" }}>{done}/{total}</span>
          </div>
          <div className="prog-bar" style={{ width: 60 }}><div className="prog-fill" style={{ width: `${pct}%`, background: urgentRed ? t.red : `linear-gradient(90deg,${t.cyan},${t.violet})` }} /></div>
        </div>
      </div>

      {open && (
        <div style={{ padding: "0 16px 14px", borderTop: `1px solid ${t.border}` }}>
          {task.context && <div style={{ margin: "10px 0", padding: "8px 12px", borderRadius: 8, background: `${t.violet}0d`, border: `1px solid ${t.violet}22`, fontSize: 12, color: t.text2, fontStyle: "italic" }}>💡 {task.context}</div>}
          <div style={{ paddingTop: 4, display: "flex", flexDirection: "column", gap: 8 }}>
            {task.subtasks.map(sub => (
              <div key={sub.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className={`cb${sub.done ? " checked" : ""}`} onClick={() => onToggleSub(task.id, sub.id)}>
                  {sub.done && <Check size={9} style={{ color: "#000" }} />}
                </div>
                <span style={{ fontSize: 13, color: sub.done ? t.text3 : t.text2, textDecoration: sub.done ? "line-through" : "none" }}>{sub.label}</span>
              </div>
            ))}
          </div>
          {AI_STARTS[task.id] && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.border}` }}>
              {task.aiStarted
                ? <div className="ai-badge"><Sparkles size={13} style={{ color: t.green, flexShrink: 0, marginTop: 2 }} /><div><p style={{ fontSize: 10, fontWeight: 700, color: t.green, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>AI Auto-Start ✓</p><p style={{ fontSize: 12, color: t.text2, lineHeight: 1.55 }}>{task.aiLog}</p></div></div>
                : <button onClick={() => onAIStart(task)} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 8, border: `1px solid ${t.violet}44`, cursor: "pointer", background: `${t.violet}12`, color: "#c4b5fd", fontSize: 12, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", letterSpacing: "0.05em", textTransform: "uppercase", transition: "all 0.2s" }}><Play size={11} /> AI Start 10%</button>
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  TASKS VIEW
// ─────────────────────────────────────────────────────────────────
function TasksView({ tasks, setTasks, ruthless, showToast, t }) {
  const [aiModal, setAIModal] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [optimized, setOptimized] = useState(false);
  const [battery, setBattery] = useState(78);
  const [filter, setFilter] = useState("all");

  const handleOptimize = () => {
    const order = { "Deep Work": 0, "Creative": 1, "Meeting": 2, "Admin": 3 };
    setTasks(p => [...p].sort((a, b) => (b.aiScore - a.aiScore) || (order[a.tag] ?? 9) - (order[b.tag] ?? 9)));
    setOptimized(true); setBattery(100);
    showToast("🧠 AI Prioritization complete — tasks sorted by AI score & cognitive load. Brain Battery: 100%");
  };

  const confirmAI = () => {
    setTasks(p => p.map(t => t.id === aiModal.id ? { ...t, aiStarted: true, aiLog: AI_STARTS[aiModal.id] } : t));
    showToast("⚡ AI Auto-Starter fired! First 10% done — you can take it from here.");
    setAIModal(null);
  };

  const filtered = filter === "all" ? tasks : filter === "high" ? tasks.filter(t => t.priority === "high") : tasks.filter(t => t.tag === filter);

  return (
    <div style={{ display: "flex", gap: 22, height: "100%", minHeight: 0 }}>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto", paddingRight: 2 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div><h2 style={{ fontSize: 20, fontWeight: 700, color: t.text1 }}>Task Triage</h2>
            <p style={{ fontSize: 12, color: t.text3, marginTop: 3, fontFamily: "JetBrains Mono,monospace" }}>{tasks.length} tasks · AI scores active</p></div>
          <div style={{ display: "flex", gap: 7 }}>
            <button className="btn-ghost" onClick={() => setAddOpen(true)}><Plus size={11} /> New Task</button>
            <button className="btn-ghost"><Mic size={11} /> Voice</button>
          </div>
        </div>

        {/* Filter chips */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["all", "high", "Deep Work", "Creative", "Meeting", "Admin"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20, border: `1px solid ${filter === f ? t.border2 : t.border}`, background: filter === f ? `${t.cyan}12` : "transparent", color: filter === f ? t.cyan : t.text3, cursor: "pointer", textTransform: "capitalize", transition: "all 0.15s", fontFamily: "'Space Grotesk',sans-serif" }}>
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>

        {/* USP 1 — Intelligent Prioritization */}
        <div style={{ borderRadius: 13, padding: "15px 18px", background: optimized ? `${t.cyan}07` : `${t.cyan}03`, border: `${optimized ? "1px solid " + t.border2 : "1px dashed " + t.border}`, transition: "all 0.4s", boxShadow: optimized ? `0 0 24px ${t.cyan}10` : "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 42, height: 42, borderRadius: 11, flexShrink: 0, background: optimized ? `linear-gradient(135deg,${t.cyan},${t.violet})` : `${t.cyan}0d`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.4s", boxShadow: optimized ? `0 0 20px ${t.cyan}44` : "none" }}>
              <Brain size={18} style={{ color: optimized ? "#000" : t.cyan }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13.5, fontWeight: 700, color: t.text1 }}>Intelligent Task Prioritization</p>
              <p style={{ fontSize: 12, color: t.text3, marginTop: 2 }}>AI scores each task by urgency, deadline proximity and cognitive cost — sorts for maximum throughput</p>
            </div>
            <button onClick={handleOptimize} className={optimized ? "" : "btn-solid"}
              style={optimized ? { display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: `1px solid ${t.border2}`, background: `${t.cyan}0d`, color: t.cyan, fontSize: 12, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", cursor: "default", textTransform: "uppercase" } : { fontSize: 12, padding: "9px 16px", borderRadius: 9 }}>
              {optimized ? <><Check size={11} /> Optimized</> : <><Sparkles size={11} /> Run AI Sort</>}
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(task => (
            <TaskCard key={task.id} task={task} ruthless={ruthless} t={t}
              onToggleSub={(tId, sId) => setTasks(p => p.map(t => t.id === tId ? { ...t, subtasks: t.subtasks.map(s => s.id === sId ? { ...s, done: !s.done } : s) } : t))}
              onAIStart={setAIModal} />
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ width: 198, flexShrink: 0, display: "flex", flexDirection: "column", gap: 14 }}>
        <div className="glass" style={{ borderRadius: 14, padding: "18px 14px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <BrainBattery level={battery} animate={optimized} t={t} />
          <div style={{ width: "100%", marginTop: 14 }}>
            <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${t.border2},transparent)`, marginBottom: 12 }} />
            {[["Focus", "92%", t.cyan], ["Flow State", "71%", t.violet], ["Cognitive Load", "34%", t.amber]].map(([l, v, c]) => (
              <div key={l} style={{ marginBottom: 9 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: t.text3, textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</span>
                  <span style={{ fontSize: 10, color: c, fontFamily: "JetBrains Mono,monospace", fontWeight: 700 }}>{v}</span>
                </div>
                <ProgBar pct={parseInt(v)} color={c} />
              </div>
            ))}
          </div>
        </div>

        <div className="glass" style={{ borderRadius: 14, padding: "14px" }}>
          <SectionLabel t={t}>Today's Habits</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {HABITS.map(h => (
              <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 15, height: 15, borderRadius: "50%", flexShrink: 0, background: h.done ? t.green : "transparent", border: h.done ? "none" : `1px solid ${t.border2}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {h.done && <Check size={9} style={{ color: "#000" }} />}
                </div>
                <span style={{ fontSize: 11, color: h.done ? t.text3 : t.text2, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textDecoration: h.done ? "line-through" : "none" }}>{h.label}</span>
                <span style={{ fontSize: 10, color: t.amber, display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}><Flame size={9} />{h.streak}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass" style={{ borderRadius: 14, padding: "14px" }}>
          <SectionLabel t={t}>Weekly Goals</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {WEEKLY_GOALS.map(g => (
              <div key={g.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: t.text3 }}>{g.label}</span>
                  <span style={{ fontSize: 11, color: t[g.color], fontFamily: "JetBrains Mono,monospace", fontWeight: 700 }}>{g.value}/{g.total}</span>
                </div>
                <ProgBar pct={Math.round((g.value / g.total) * 100)} color={t[g.color]} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {aiModal && (
        <Modal title="⚡ AI Auto-Starter" onClose={() => setAIModal(null)} t={t}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: `${t.cyan}08`, border: `1px solid ${t.border}`, borderRadius: 10, padding: "11px 14px" }}>
              <p style={{ fontSize: 11, color: t.text3, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Target</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: t.text1 }}>{aiModal.title}</p>
            </div>
            <div style={{ display: "flex", gap: 11, background: `${t.violet}0d`, border: `1px solid ${t.violet}25`, borderRadius: 10, padding: "13px 15px" }}>
              <Sparkles size={15} style={{ color: t.violet, flexShrink: 0, marginTop: 2 }} />
              <div><p style={{ fontSize: 13, fontWeight: 600, color: t.text1, marginBottom: 4 }}>AI handles the first 10%</p>
                <p style={{ fontSize: 12, color: t.text2, lineHeight: 1.6 }}>Breaks the activation barrier — you resume from momentum, not a blank page.</p></div>
            </div>
            <div style={{ background: `${t.bg0}`, borderRadius: 9, padding: "11px 14px" }}>
              <p style={{ fontSize: 11, color: t.text3, marginBottom: 4, fontFamily: "JetBrains Mono,monospace", textTransform: "uppercase" }}>// preview</p>
              <p style={{ fontSize: 12, color: t.violet, fontFamily: "JetBrains Mono,monospace", lineHeight: 1.6 }}>&gt; {AI_STARTS[aiModal.id]}</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setAIModal(null)} style={{ flex: 1, padding: "11px", borderRadius: 9, border: `1px solid ${t.border2}`, background: "transparent", color: t.text2, fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif", cursor: "pointer" }}>Cancel</button>
              <button onClick={confirmAI} className="btn-solid" style={{ flex: 1, justifyContent: "center", padding: "11px", borderRadius: 9, fontSize: 13 }}><Zap size={13} /> Launch AI</button>
            </div>
          </div>
        </Modal>
      )}
      {addOpen && <AddTaskModal onClose={() => setAddOpen(false)} onAdd={task => { setTasks(p => [...p, task]); showToast("✅ Task added to queue."); }} t={t} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  SCHEDULE VIEW — AI-powered scheduling assistance
// ─────────────────────────────────────────────────────────────────
function ScheduleView({ t }) {
  const [synced, setSynced] = useState(false);
  const [suggested, setSuggested] = useState(false);
  const [slots, setSlots] = useState(SCHEDULE_SLOTS);

  const handleSync = () => { setSynced(true); };
  const handleAISuggest = () => {
    setSlots(p => p.map((s, i) => i === 4 ? { ...s, label: "Team Standup → ASYNC (AI-suggested)", type: "admin" } : s));
    setSuggested(true);
  };

  return (
    <div className="fade-in">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div><h2 style={{ fontSize: 20, fontWeight: 700, color: t.text1 }}>AI Schedule</h2>
          <p style={{ fontSize: 12, color: t.text3, marginTop: 3, fontFamily: "JetBrains Mono,monospace" }}>Thursday · June 26 · AI-optimized blocks</p></div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-ghost" onClick={handleSync}>{synced ? <><Check size={11} /> Synced</> : <><Calendar size={11} /> Sync Calendar</>}</button>
          <button className="btn-ghost" onClick={handleAISuggest}><Sparkles size={11} /> AI Suggest</button>
        </div>
      </div>

      {suggested && (
        <div style={{ marginBottom: 14, padding: "11px 16px", borderRadius: 11, background: `${t.green}0d`, border: `1px solid ${t.green}30`, fontSize: 13, color: t.text2, display: "flex", gap: 9, alignItems: "flex-start" }}>
          <Sparkles size={14} style={{ color: t.green, flexShrink: 0, marginTop: 2 }} />
          <span><strong style={{ color: t.green }}>AI Scheduling: </strong>Detected Team Standup overlaps with your pitch prep window. Converted to async summary — saved 15 min of context switching.</span>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {slots.map((s, i) => {
          const st = getScheduleStyle(s.type, t);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 17px", borderRadius: 12, background: st.bg, border: `1px solid ${st.border}`, transition: "all 0.2s" }}>
              <s.icon size={14} style={{ color: st.text, flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontFamily: "JetBrains Mono,monospace", color: t.text3, width: 44, flexShrink: 0 }}>{s.time}</span>
              <span style={{ fontSize: 13.5, fontWeight: 500, color: s.type === "deadline" ? t.red : t.text1, flex: 1 }}>{s.label}</span>
              {s.synced && synced && <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, background: `${t.green}15`, border: `1px solid ${t.green}30`, color: t.green, fontWeight: 600, flexShrink: 0 }}>GCal ✓</span>}
              <span style={{ fontSize: 11, color: st.text, fontFamily: "JetBrains Mono,monospace", flexShrink: 0 }}>{s.dur}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  AI COACH VIEW — Personalized recommendations
// ─────────────────────────────────────────────────────────────────
function RecoView({ t, showToast }) {
  const [dismissed, setDismissed] = useState([]);
  const [mood, setMood] = useState(null);
  const [applied, setApplied] = useState([]);

  const active = AI_RECO.filter(r => !dismissed.includes(r.id));

  const applyReco = (id) => {
    setApplied(p => [...p, id]);
    showToast("✅ AI recommendation applied to your schedule.");
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: t.text1 }}>AI Coach</h2>
        <p style={{ fontSize: 12, color: t.text3, marginTop: 3, fontFamily: "JetBrains Mono,monospace" }}>Personalized productivity recommendations</p>
      </div>

      {/* Mood check-in */}
      <div className="card" style={{ borderRadius: 14, padding: "16px 20px", marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: t.text1, marginBottom: 12 }}>How are you feeling right now?</p>
        <div style={{ display: "flex", gap: 10 }}>
          {MOOD_OPTIONS.map(m => (
            <button key={m.value} onClick={() => { setMood(m.value); showToast(`Mood logged: ${m.label}. Adjusting recommendations…`); }}
              style={{ flex: 1, padding: "11px 8px", borderRadius: 10, border: `1px solid ${mood === m.value ? m.color : t.border}`, background: mood === m.value ? `${m.color}14` : "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, transition: "all 0.2s" }}>
              <m.icon size={20} style={{ color: m.color }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: mood === m.value ? m.color : t.text2 }}>{m.label}</span>
            </button>
          ))}
        </div>
        {mood === "drained" && <div style={{ marginTop: 10, fontSize: 12, color: t.amber, background: `${t.amber}0d`, border: `1px solid ${t.amber}25`, borderRadius: 8, padding: "8px 12px" }}>⚡ Energy low detected. AI is reducing your task queue and suggesting a 20-min recharge break.</div>}
      </div>

      {/* Recommendations */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {active.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: t.text3, fontSize: 14 }}>
            <Award size={32} style={{ color: t.green, marginBottom: 10 }} />
            <p style={{ fontWeight: 600, color: t.text1 }}>All caught up!</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>No more recommendations for now. Great work.</p>
          </div>
        ) : active.map(r => {
          const isApplied = applied.includes(r.id);
          return (
            <div key={r.id} className="card" style={{ borderRadius: 13, padding: "16px 18px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `${r.color}14`, border: `1px solid ${r.color}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <r.icon size={17} style={{ color: r.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <p style={{ fontSize: 13.5, fontWeight: 700, color: t.text1 }}>{r.title}</p>
                    <span className="badge" style={{ background: `${r.color}14`, color: r.color, border: `1px solid ${r.color}25` }}>{r.tag}</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: t.text2, lineHeight: 1.6, marginBottom: 10 }}>{r.body}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => applyReco(r.id)} disabled={isApplied}
                      style={{ padding: "6px 14px", borderRadius: 7, border: `1px solid ${isApplied ? t.green : r.color}44`, background: isApplied ? `${t.green}12` : `${r.color}0d`, color: isApplied ? t.green : r.color, fontSize: 11, fontWeight: 700, cursor: isApplied ? "default" : "pointer", fontFamily: "'Space Grotesk',sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {isApplied ? "✓ Applied" : r.action}
                    </button>
                    <button onClick={() => setDismissed(p => [...p, r.id])} style={{ padding: "6px 10px", borderRadius: 7, border: `1px solid ${t.border}`, background: "transparent", color: t.text3, fontSize: 11, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif" }}>Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  REMINDERS VIEW — Context-aware reminders
// ─────────────────────────────────────────────────────────────────
function RemindersView({ t, showToast }) {
  const [items, setItems] = useState(REMINDERS);
  const [newMsg, setNewMsg] = useState("");
  const [newTime, setNewTime] = useState("");

  const addReminder = () => {
    if (!newMsg.trim()) return;
    setItems(p => [...p, { id: Date.now(), taskId: null, msg: newMsg, time: newTime || "Custom", type: "focus", triggered: false }]);
    setNewMsg(""); setNewTime("");
    showToast("🔔 Reminder set. AI will surface it with context when the time comes.");
  };

  const typeStyle = (type) => ({
    deadline: { bg: `${t.red}0d`, border: `${t.red}28`, icon: AlertTriangle, color: t.red },
    context:  { bg: `${t.violet}0d`, border: `${t.violet}28`, icon: Brain, color: t.violet },
    focus:    { bg: `${t.cyan}0d`, border: `${t.cyan}25`, icon: Target, color: t.cyan },
  })[type] || { bg: `${t.amber}0d`, border: `${t.amber}25`, icon: Bell, color: t.amber };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: t.text1 }}>Context-Aware Reminders</h2>
        <p style={{ fontSize: 12, color: t.text3, marginTop: 3, fontFamily: "JetBrains Mono,monospace" }}>AI surfaces reminders at the right moment — not just the right time</p>
      </div>

      {/* Add reminder */}
      <div className="glass" style={{ borderRadius: 14, padding: "16px 18px", marginBottom: 16 }}>
        <SectionLabel t={t}>New Reminder</SectionLabel>
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <input value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Reminder message…"
            style={{ flex: 1, background: t.input, border: `1px solid ${t.inputBorder}`, color: t.text1, borderRadius: 9, padding: "9px 14px", fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, outline: "none" }} />
          <input value={newTime} onChange={e => setNewTime(e.target.value)} placeholder="Time (e.g. 2PM)"
            style={{ width: 120, background: t.input, border: `1px solid ${t.inputBorder}`, color: t.text1, borderRadius: 9, padding: "9px 12px", fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, outline: "none" }} />
          <button onClick={addReminder} className="btn-solid" style={{ padding: "9px 14px", borderRadius: 9, fontSize: 12, whiteSpace: "nowrap" }}><Plus size={12} /> Set</button>
        </div>
      </div>

      {/* Reminder list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {items.map(r => {
          const s = typeStyle(r.type);
          return (
            <div key={r.id} className="card" style={{ borderRadius: 12, padding: "13px 16px", borderColor: r.triggered ? s.border : t.border, background: r.triggered ? s.bg : t.card }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <s.icon size={15} style={{ color: s.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13.5, fontWeight: 600, color: t.text1 }}>{r.msg}</p>
                  <p style={{ fontSize: 11, color: t.text3, marginTop: 2 }}>
                    {r.time} · {r.triggered ? "✓ Triggered" : "Pending"} · {r.type === "context" ? "Context-triggered" : r.type === "deadline" ? "Deadline-based" : "Time-based"}
                  </p>
                </div>
                {r.triggered && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: `${t.green}15`, color: t.green, border: `1px solid ${t.green}28`, fontWeight: 700, flexShrink: 0 }}>SENT</span>}
                <button onClick={() => setItems(p => p.filter(i => i.id !== r.id))} style={{ background: "none", border: "none", color: t.text3, cursor: "pointer" }}><X size={13} /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  GOALS & HABITS VIEW
// ─────────────────────────────────────────────────────────────────
function GoalsView({ t, showToast }) {
  const [habits, setHabits] = useState(HABITS);
  const [newHabit, setNewHabit] = useState("");

  const toggleHabit = (id) => setHabits(p => p.map(h => h.id === id ? { ...h, done: !h.done } : h));
  const addHabit = () => {
    if (!newHabit.trim()) return;
    setHabits(p => [...p, { id: Date.now(), label: newHabit, done: false, streak: 0, goal: 7 }]);
    setNewHabit(""); showToast("🎯 New habit added. AI will track your streak.");
  };

  const doneCount = habits.filter(h => h.done).length;

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: t.text1 }}>Goals & Habits</h2>
        <p style={{ fontSize: 12, color: t.text3, marginTop: 3, fontFamily: "JetBrains Mono,monospace" }}>AI-tracked streaks · visual progress · weekly targets</p>
      </div>

      {/* Goal overview */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 18 }}>
        {WEEKLY_GOALS.map(g => (
          <div key={g.label} className="card" style={{ borderRadius: 13, padding: "16px 18px" }}>
            <p style={{ fontSize: 11, color: t.text3, textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600, marginBottom: 8 }}>{g.label}</p>
            <p style={{ fontSize: 26, fontWeight: 700, color: t[g.color], fontFamily: "JetBrains Mono,monospace" }}>{g.value}<span style={{ fontSize: 14, color: t.text3 }}>/{g.total}</span></p>
            <ProgBar pct={Math.round((g.value / g.total) * 100)} color={t[g.color]} height={5} />
            <p style={{ fontSize: 11, color: t.text3, marginTop: 6 }}>{Math.round((g.value / g.total) * 100)}% complete</p>
          </div>
        ))}
      </div>

      {/* Habit tracker */}
      <div className="glass" style={{ borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div><p style={{ fontSize: 14, fontWeight: 700, color: t.text1 }}>Daily Habits</p>
            <p style={{ fontSize: 12, color: t.text3 }}>{doneCount}/{habits.length} completed today</p></div>
          <div style={{ background: `${t.green}14`, border: `1px solid ${t.green}28`, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700, color: t.green }}>{Math.round((doneCount / habits.length) * 100)}%</div>
        </div>
        <ProgBar pct={Math.round((doneCount / habits.length) * 100)} color={t.green} height={6} />
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          {habits.map(h => (
            <div key={h.id} onClick={() => toggleHabit(h.id)} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", borderRadius: 10, border: `1px solid ${h.done ? t.green + "33" : t.border}`, background: h.done ? `${t.green}08` : "transparent", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: h.done ? t.green : "transparent", border: h.done ? "none" : `1px solid ${t.border2}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {h.done && <Check size={11} style={{ color: "#000" }} />}
              </div>
              <span style={{ fontSize: 13, color: h.done ? t.text2 : t.text1, flex: 1, textDecoration: h.done ? "line-through" : "none" }}>{h.label}</span>
              <div style={{ display: "flex", align: "center", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  {Array.from({ length: Math.min(h.goal, 7) }).map((_, i) => (
                    <div key={i} style={{ width: 8, height: 8, borderRadius: 2, background: i < h.streak ? t.amber : t.border2 }} />
                  ))}
                </div>
                <span style={{ fontSize: 11, color: t.amber, display: "flex", alignItems: "center", gap: 3, fontFamily: "JetBrains Mono,monospace", fontWeight: 700 }}><Flame size={11} />{h.streak}d</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 12, borderTop: `1px solid ${t.border}`, paddingTop: 12 }}>
          <input value={newHabit} onChange={e => setNewHabit(e.target.value)} placeholder="Add a new habit…"
            style={{ flex: 1, background: t.input, border: `1px solid ${t.inputBorder}`, color: t.text1, borderRadius: 8, padding: "8px 12px", fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, outline: "none" }} />
          <button onClick={addHabit} className="btn-ghost" style={{ padding: "8px 12px" }}><Plus size={13} /></button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  LOGS VIEW
// ─────────────────────────────────────────────────────────────────
function LogsView({ logs, t }) {
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);
  const tc = { info: t.text3, success: t.green, warn: t.amber, error: t.red, ruthless: t.red };
  const prefix = { info: "INFO", success: "OK  ", warn: "WARN", error: "ERR ", ruthless: "KILL" };

  return (
    <div className="fade-in">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div><h2 style={{ fontSize: 20, fontWeight: 700, color: t.text1 }}>Agent Logs</h2>
          <p style={{ fontSize: 12, color: t.text3, marginTop: 3, fontFamily: "JetBrains Mono,monospace" }}>NexusAI execution stream</p></div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="pulse-dot" />
          <span style={{ fontSize: 11, color: t.green, fontFamily: "JetBrains Mono,monospace" }}>LIVE</span>
        </div>
      </div>
      <div style={{ background: t.logBg, border: `1px solid ${t.border}`, borderRadius: 14, padding: "18px 20px", height: 420, overflowY: "auto", fontFamily: "JetBrains Mono,monospace" }}>
        <div style={{ marginBottom: 10, fontSize: 11, color: t.text4 }}>── NexusAI v2.5 ── session start ────────────────────────────</div>
        {logs.map(log => (
          <div key={log.id} style={{ display: "flex", gap: 12, fontSize: 11.5, lineHeight: 1.55, marginBottom: 7 }}>
            <span style={{ color: t.text4, flexShrink: 0 }}>{log.time}</span>
            <span style={{ color: tc[log.type], fontWeight: log.type === "ruthless" ? 700 : 400, flexShrink: 0 }}>[{prefix[log.type]}]</span>
            <span style={{ color: log.type === "ruthless" ? "#fca5a5" : t.text2 }}>{log.msg}</span>
          </div>
        ))}
        <div style={{ display: "flex", gap: 12, fontSize: 11.5 }} ref={bottomRef}>
          <span style={{ color: t.text4 }}>{new Date().toTimeString().slice(0, 8)}</span>
          <span style={{ color: t.green }}>[IDLE]</span>
          <span style={{ color: t.text4 }}>Awaiting next event<span className="blink">_</span></span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  ANALYTICS VIEW
// ─────────────────────────────────────────────────────────────────
function AnalyticsView({ t }) {
  const maxV = 8;
  const metrics = [
    { label: "Tasks Done", v: "28", delta: "+12% vs last week", icon: CheckSquare, color: t.cyan },
    { label: "Focus Hours", v: "21h", delta: "+8% vs last week", icon: Target, color: t.violet },
    { label: "Streak", v: "12d", delta: "Personal best", icon: Flame, color: t.amber },
    { label: "AI Actions", v: "9", delta: "This week", icon: Zap, color: t.green },
  ];

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: t.text1 }}>Analytics</h2>
        <p style={{ fontSize: 12, color: t.text3, marginTop: 3, fontFamily: "JetBrains Mono,monospace" }}>Jun 17–26 · AI-generated insights</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 11, marginBottom: 20 }}>
        {metrics.map(m => (
          <div key={m.label} className="card" style={{ borderRadius: 12, padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: t.text3, textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.label}</span>
              <m.icon size={13} style={{ color: m.color }} />
            </div>
            <p style={{ fontSize: 26, fontWeight: 700, color: m.color, fontFamily: "JetBrains Mono,monospace" }}>{m.v}</p>
            <p style={{ fontSize: 11, color: t.text3, marginTop: 5 }}>{m.delta}</p>
          </div>
        ))}
      </div>
      <div className="glass" style={{ borderRadius: 14, padding: "20px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: t.text1 }}>Tasks vs Focus Hours — This Week</p>
          <div style={{ display: "flex", gap: 14 }}>
            {[[t.cyan, "Tasks"], [t.violet, "Focus"]].map(([c, lbl]) => (
              <span key={lbl} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: t.text3 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: c, display: "inline-block" }} />{lbl}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {WEEKS_DATA.map(w => (
            <div key={w.day} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
              <div style={{ width: "100%", display: "flex", gap: 3, alignItems: "flex-end", height: 80 }}>
                <div style={{ flex: 1, borderRadius: "3px 3px 0 0", background: `linear-gradient(180deg,${t.cyan},${t.cyan}55)`, height: `${(w.tasks / maxV) * 100}%`, minHeight: 3, transition: "height 0.6s ease" }} />
                <div style={{ flex: 1, borderRadius: "3px 3px 0 0", background: `linear-gradient(180deg,${t.violet},${t.violet}55)`, height: `${(w.focus / maxV) * 100}%`, minHeight: 3, transition: "height 0.6s ease" }} />
              </div>
              <span style={{ fontSize: 11, color: t.text3, fontFamily: "JetBrains Mono,monospace" }}>{w.day}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          { icon: TrendingUp, color: t.green, title: "Peak day — Friday", body: "7 tasks, 6h deep focus. AI recommendation: schedule critical work Friday mornings." },
          { icon: AlertTriangle, color: t.amber, title: "Watch — Wednesday", body: "Lowest focus day. 4× context switches detected. AI suggests blocking all meetings." },
        ].map(ins => (
          <div key={ins.title} className="card" style={{ borderRadius: 12, padding: "16px 18px", display: "flex", gap: 12 }}>
            <ins.icon size={16} style={{ color: ins.color, flexShrink: 0, marginTop: 2 }} />
            <div><p style={{ fontSize: 12, fontWeight: 700, color: ins.color, marginBottom: 4 }}>{ins.title}</p>
              <p style={{ fontSize: 12, color: t.text2, lineHeight: 1.55 }}>{ins.body}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  DASHBOARD
// ─────────────────────────────────────────────────────────────────
function Dashboard({ onLogout, t, mode, toggleTheme }) {
  const [view, setView] = useState("tasks");
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [ruthless, setRuthless] = useState(false);
  const [logs, setLogs] = useState(LOGS_INIT);
  const [toast, setToast] = useState(null);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const logId = useRef(5);
  const isDark = mode === "dark";

  const addLog = useCallback((msg, type = "info") => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`;
    setLogs(p => [...p, { id: logId.current++, time, msg, type }]);
  }, []);

  const showToast = useCallback((msg, icon) => setToast({ msg, icon }), []);

  const handleRuthless = () => {
    const next = !ruthless;
    setRuthless(next);
    if (next) {
      addLog("RUTHLESS MODE ENGAGED. Scanning all queues and calendar.", "ruthless");
      setTimeout(() => addLog("Imminent deadline: Client Pitch @ 15:00. Threat level CRITICAL.", "ruthless"), 700);
      setTimeout(() => addLog("Auto-declining non-essential meetings. Standup → async.", "ruthless"), 1500);
      setTimeout(() => addLog("Vendor emails DEFERRED. Focus window locked.", "ruthless"), 2200);
      setTimeout(() => addLog("Ruthless prioritization complete. 2 tasks locked.", "success"), 3100);
      setView("logs");
      showToast("💀 Ruthless Mode ON — Low-priority tasks locked. Agent auto-declining distractions.");
    } else {
      addLog("Ruthless Mode OFF. All tasks unlocked.", "info");
      showToast("Ruthless Mode disengaged. Full task list restored.");
    }
  };

  return (
    <div className={ruthless ? "scanlines" : ""} style={{ height: "100vh", display: "flex", flexDirection: "column", background: ruthless ? (isDark ? "radial-gradient(ellipse at center,#1a0505,#030712)" : "radial-gradient(ellipse at center,#fff0f0,#f0f4ff)") : t.bg0, transition: "background 0.6s", position: "relative" }}>
      <div className="grid-bg" /><div className="orb1" /><div className="orb2" />

      <div style={{ display: "flex", flex: 1, minHeight: 0, position: "relative", zIndex: 2 }}>
        <Sidebar active={view} setActive={setView} ruthless={ruthless} onLogout={onLogout} t={t} mode={mode} toggleTheme={toggleTheme} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Topbar */}
          <header style={{ height: 54, display: "flex", alignItems: "center", paddingInline: 22, gap: 10, borderBottom: `1px solid ${t.border}`, background: t.header, backdropFilter: "blur(14px)", flexShrink: 0, transition: "background 0.35s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
              <span style={{ fontSize: 11, color: t.text4, fontFamily: "JetBrains Mono,monospace" }}>nexus://</span>
              <span style={{ fontSize: 11, color: ruthless ? t.red : t.cyan, fontFamily: "JetBrains Mono,monospace", fontWeight: 600 }}>
                {NAV_ITEMS.find(n => n.id === view)?.label.toLowerCase().replace(/ /g, "_")}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 11, color: t.text3, fontFamily: "JetBrains Mono,monospace" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Eye size={11} /> 3 watchers</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Cpu size={11} /> 12% cpu</span>
            </div>

            {/* Voice button */}
            <button onClick={() => setVoiceOpen(true)} className="btn-ghost" style={{ padding: "7px 12px" }}>
              <Mic size={12} /> Voice
            </button>

            {/* Theme toggle */}
            <button onClick={toggleTheme} style={{ background: "none", border: `1px solid ${t.border2}`, borderRadius: 8, padding: "7px 10px", cursor: "pointer", color: t.text2, display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontFamily: "'Space Grotesk',sans-serif" }}>
              {mode === "dark" ? <Sun size={13} /> : <Moon size={13} />}
            </button>

            {/* Ruthless toggle */}
            <button className={`btn-ruthless ${ruthless ? "on" : "off"}`} onClick={handleRuthless}>
              <Skull size={13} />{ruthless ? "Ruthless ON" : "Ruthless Mode"}
            </button>

            <button style={{ background: "none", border: "none", color: t.text3, cursor: "pointer", padding: 5 }}><Bell size={16} /></button>
            <button style={{ background: "none", border: "none", color: t.text3, cursor: "pointer", padding: 5 }}><Settings size={16} /></button>
          </header>

          {ruthless && (
            <div className="ruthless-banner">
              <AlertTriangle size={12} />
              RUTHLESS MODE ACTIVE — Low-priority tasks suspended · Auto-declining distractions · Focus window protected
            </div>
          )}

          {/* Content */}
          <main style={{ flex: 1, overflowY: "auto", padding: 22 }}>
            {view === "tasks"     && <TasksView tasks={tasks} setTasks={setTasks} ruthless={ruthless} showToast={showToast} t={t} />}
            {view === "schedule"  && <ScheduleView t={t} />}
            {view === "reco"      && <RecoView t={t} showToast={showToast} />}
            {view === "reminders" && <RemindersView t={t} showToast={showToast} />}
            {view === "goals"     && <GoalsView t={t} showToast={showToast} />}
            {view === "logs"      && <LogsView logs={logs} t={t} />}
            {view === "analytics" && <AnalyticsView t={t} />}
          </main>
        </div>
      </div>

      {voiceOpen && <VoiceModal onClose={() => setVoiceOpen(false)} t={t} onCommand={(cmd) => { addLog(`Voice command received: "${cmd}". Executing...`, "info"); showToast("🎙 Voice command recognized and executed."); }} />}
      {toast && <Toast msg={toast.msg} icon={toast.icon} onClose={() => setToast(null)} t={t} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  ROOT
// ─────────────────────────────────────────────────────────────────
export default function App() {
  const { t, mode, toggle } = useTheme();
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <StyleInjector t={t} mode={mode} />
      {loggedIn
        ? <Dashboard onLogout={() => setLoggedIn(false)} t={t} mode={mode} toggleTheme={toggle} />
        : <LoginScreen onLogin={() => setLoggedIn(true)} t={t} mode={mode} toggleTheme={toggle} />
      }
    </>
  );
}