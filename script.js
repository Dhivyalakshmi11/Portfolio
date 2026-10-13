/* ============ EDIT YOUR CONTENT HERE ============ */
const SITE = {
  email: "",            // e.g. "you@example.com"
  linkedin: "",         // e.g. "https://www.linkedin.com/in/your-id"
  github: "",           // e.g. "https://github.com/your-username"
  resume: "",           // e.g. "resume.pdf" (put the file next to index.html)
  formEndpoint: ""      // e.g. Formspree/Web3Forms URL. Leave empty until you set one up.
};

const QUALITIES = [
  "Quick learner who enjoys understanding new technologies",
  "Adaptable to different environments and challenges",
  "Interested in cybersecurity and secure software development",
  "Motivated to improve through practical implementation",
  "Open to collaborating and learning from new experiences"
];

// level: "Comfortable" or "Learning"  (change as you grow)
const SKILLS = {
  "Programming Languages": [["C","Comfortable"],["C++","Comfortable"],["Python","Comfortable"],["Java","Comfortable"]],
  "Cybersecurity Learning": [["Cybersecurity fundamentals","Learning"],["Information security concepts","Learning"],["Authentication & authorization","Learning"],["Password security & hashing","Learning"],["Basic security testing concepts","Learning"],["Networking & Linux fundamentals","Learning"]],
  "Tools & Technologies": [["Git & GitHub","Comfortable"],["Flask","Comfortable"],["SQLite","Comfortable"],["Linux command-line basics","Learning"]]
  // Add ["Arduino IDE","Comfortable"] only if you showcase a related project.
};

// status: "Completed" | "Prototype" | "In Progress"  | github: paste repo URL (empty = "Link coming soon")
const PROJECTS = [
  {
    title: "SecureLogin: Secure Login System", icon: "🔐", category: "Cybersecurity",
    status: "Completed", // EDIT: confirm status
    github: "", demo: "",
    desc: "A Flask-based login application developed to explore secure authentication and user management. The project includes user registration, login validation, password hashing, session management, logout functionality, and protection against common SQL injection risks.",
    tech: ["Python","Flask","SQLite","HTML","CSS"],
    contribution: "[EDIT: describe what you built, e.g. the full application]",
    details: {
      Problem: "[EDIT: e.g. Many beginner apps store passwords insecurely or build SQL queries unsafely.]",
      Objective: "Explore secure authentication and user management.",
      Approach: "[EDIT: describe your design, e.g. hashing, sessions, parameterized queries.]",
      Implementation: ["User registration","Login validation","Password hashing","Session management","Logout","Protection against common SQL injection risks"],
      "Lessons learned": "[EDIT: what you learned]"
    }
  },
  {
    title: "AI-Based Fake Identity and Document Screening System", icon: "🪪", category: "AI/ML",
    status: "Prototype", // EDIT: confirm status
    github: "", demo: "",
    desc: "A prototype designed to explore how document processing and AI-assisted analysis can help identify potentially suspicious identity documents. The proposed workflow includes document upload, OCR, authenticity checks, tampering analysis, and risk-based screening.",
    tech: ["Python","Streamlit","OCR"],
    contribution: "[EDIT: describe your part]",
    details: {
      Problem: "[EDIT: describe the problem of fake or tampered identity documents.]",
      Objective: "Explore how AI-assisted analysis can flag potentially suspicious documents.",
      Approach: "Proposed workflow: upload, OCR, authenticity checks, tampering analysis, risk-based screening.",
      "Implemented vs. proposed": [
        "Document upload: [EDIT: Implemented / Experimental / Planned]",
        "OCR: [EDIT: Implemented / Experimental / Planned]",
        "Authenticity checks: [EDIT: Implemented / Experimental / Planned]",
        "Tampering analysis: [EDIT: Implemented / Experimental / Planned]",
        "Risk-based screening: [EDIT: Implemented / Experimental / Planned]"
      ],
      "Lessons learned": "[EDIT: what you learned]"
    }
  }
];

// status: "Learning" | "Planned" | "Completed"
const ROADMAP = [
  ["Networking fundamentals: IP addresses, DNS, ports, TCP/UDP, firewalls","Learning"],
  ["Linux fundamentals and command-line operations","Learning"],
  ["Authentication, authorization, permissions, and access control","Learning"],
  ["Password security and secure authentication","Learning"],
  ["Static binary analysis and reverse engineering concepts","Planned"],
  ["Cloud security fundamentals","Planned"]
];
const EXPLORING = ["Networking basics","Linux command line","Secure authentication"]; // add courses, labs, milestones

const CERTS = [
  { name: "Business Fundamentals for Entrepreneurs", issuer: "NPTEL", date: "[EDIT: completion date]", link: "" }
  // Add more: { name, issuer, date, link }
];
const EVENTS = []; // Add verified hackathons, workshops, internships: { name, issuer, date, link }

const TRAITS = [
  ["Quick Learner","I enjoy exploring unfamiliar concepts and learning new technical skills."],
  ["Adaptable","I can adjust to new environments, tools, and challenges."],
  ["Curious Mind","I like understanding how technology works and how it can be improved."],
  ["Growth Mindset","I am committed to consistent learning, practice, and improvement."]
];
/* ============ END OF EDITABLE CONTENT ============ */

const $ = (s) => document.querySelector(s);
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h !== undefined) e.innerHTML = h; return e; };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ph = (s) => esc(s).replace(/\[EDIT[^\]]*\]/g, (m) => `<span class="ph">${m}</span>`);
const link = (label, url, cls = "btn") => url
  ? `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`
  : `<a class="${cls}" aria-disabled="true" title="Link coming soon">${label} (soon)</a>`;

/* qualities, skills, traits */
$("#qualities").innerHTML = QUALITIES.map((q) => `<li><i>✦</i><span>${esc(q)}</span></li>`).join("");
$("#skillGrid").innerHTML = Object.entries(SKILLS).map(([cat, list]) =>
  `<div class="glass card hov reveal"><h3>${esc(cat)}</h3><ul class="tags">${list.map(([n, l]) =>
    `<li class="tag ${l.toLowerCase()}">${esc(n)}<small>${l}</small></li>`).join("")}</ul></div>`).join("");
$("#traits").innerHTML = TRAITS.map(([t, d]) => `<div class="glass card hov reveal"><h3>${t}</h3><p class="muted">${d}</p></div>`).join("");

/* projects */
const grid = $("#projectGrid"), filters = $("#filters");
const cats = ["All", ...new Set(PROJECTS.map((p) => p.category)), ...["Hardware"].filter((c) => !PROJECTS.some((p) => p.category === c))];
function renderProjects(cat = "All") {
  filters.innerHTML = cats.map((c) => `<button aria-pressed="${c === cat}" data-c="${c}">${c}</button>`).join("");
  const list = PROJECTS.filter((p) => cat === "All" || p.category === cat);
  grid.innerHTML = list.length ? "" : `<p class="empty">No projects in this category yet.</p>`;
  list.forEach((p) => {
    const c = el("article", "glass card hov pcard", `
      <div class="thumb" aria-hidden="true">${p.icon}</div>
      <span class="status">${esc(p.status)}</span><h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      <ul class="tags">${p.tech.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>
      <p style="margin-top:12px"><b>My contribution:</b> ${ph(p.contribution)}</p>
      <div class="btns"><button class="btn primary" type="button">View Project</button>${link("GitHub", p.github)}${p.demo ? link("Live Demo", p.demo) : ""}</div>`);
    c.querySelector("button").onclick = (e) => openModal(p, e.target);
    grid.append(c);
  });
}
filters.onclick = (e) => { if (e.target.dataset.c) renderProjects(e.target.dataset.c); };
renderProjects();

/* modal with focus handling */
const modal = $("#modal"), box = modal.querySelector(".modal-box");
let lastFocus;
function openModal(p, from) {
  lastFocus = from;
  $("#mBody").innerHTML = `<span class="status" style="margin-right:44px">${esc(p.status)}</span><h3 id="mTitle">${esc(p.title)}</h3>
    <p style="margin-top:8px">${esc(p.desc)}</p>
    <h4>Technologies</h4><p>${p.tech.map(esc).join(", ")}</p>` +
    Object.entries(p.details).map(([k, v]) => `<h4>${esc(k)}</h4>` +
      (Array.isArray(v) ? `<ul>${v.map((i) => `<li>${ph(i)}</li>`).join("")}</ul>` : `<p>${ph(v)}</p>`)).join("") +
    `<div class="btns">${link("GitHub", p.github)}</div>`;
  modal.hidden = false; document.body.style.overflow = "hidden"; box.focus();
}
function closeModal() { modal.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus(); }
$("#mClose").onclick = closeModal;
modal.onclick = (e) => { if (e.target === modal) closeModal(); };
document.addEventListener("keydown", (e) => {
  if (modal.hidden) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "Tab") { // simple focus trap
    const f = [...box.querySelectorAll("button,a[href]")]; if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* learning, certs */
$("#roadmap").innerHTML = ROADMAP.map(([t, s]) => `<li class="glass card reveal" data-s="${s}"><span>${s}</span>${esc(t)}</li>`).join("");
$("#exploring").innerHTML = EXPLORING.map((t) => `<li class="tag">${esc(t)}</li>`).join("");
const certCard = (c) => `<div class="glass card hov reveal"><h3>${esc(c.name)}</h3><p class="muted">${esc(c.issuer)}</p>
  <p class="muted">${ph(c.date)}</p><p style="margin-top:12px">${c.link ? link("View certificate", c.link, "link-sm") : '<span class="ph">[EDIT: add certificate link]</span>'}</p></div>`;
$("#certGrid").innerHTML = CERTS.map(certCard).join("") || `<p class="empty">Certificates will be added here.</p>`;
$("#eventGrid").innerHTML = EVENTS.map(certCard).join("") || `<p class="empty">Details will be added as I participate.</p>`;

/* contact links + footer + resume */
const cl = [];
if (SITE.email) cl.push(`<a class="btn primary" href="mailto:${esc(SITE.email)}">Email me</a>`);
if (SITE.linkedin) cl.push(link("LinkedIn", SITE.linkedin));
if (SITE.github) cl.push(link("GitHub", SITE.github));
$("#contactLinks").innerHTML = cl.join("") || `<p class="empty">Add your email, LinkedIn and GitHub in script.js (SITE).</p>`;
$("#footNav").innerHTML = ["Home","About","Skills","Projects","Certifications","Education","Contact"].map((n) => `<a href="#${n.toLowerCase()}">${n}</a>`).join("")
  + (SITE.github ? link("GitHub", SITE.github, "") : "") + (SITE.linkedin ? link("LinkedIn", SITE.linkedin, "") : "");
$("#year").textContent = new Date().getFullYear();
const rs = $("#resume");
if (SITE.resume) { rs.href = SITE.resume; rs.setAttribute("download", ""); }
else { rs.removeAttribute("href"); rs.textContent = "Resume coming soon"; rs.style.opacity = ".6"; }

/* contact form: real submission only */
const form = $("#form"), msg = $("#formMsg");
if (!SITE.formEndpoint) { form.querySelector("button").disabled = true; msg.textContent = "Contact form not configured yet. Please use the email or social links."; }
form.onsubmit = async (e) => {
  e.preventDefault(); let ok = true;
  form.querySelectorAll("input,textarea").forEach((i) => { const bad = !i.value.trim() || (i.type === "email" && !/^\S+@\S+\.\S+$/.test(i.value)); i.classList.toggle("err", bad); if (bad) ok = false; });
  if (!ok) { msg.textContent = "Please fill in every field with a valid email address."; return; }
  msg.textContent = "Sending...";
  try {
    const r = await fetch(SITE.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
    if (!r.ok) throw 0;
    msg.textContent = "Message sent. Thank you!"; form.reset();
  } catch { msg.textContent = "Could not send the message. Please try again or email me directly."; }
};

/* nav: burger, theme, active link */
const menu = $("#menu"), burger = $("#burger");
burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
menu.onclick = (e) => { if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); } };
const tb = $("#theme");
const saved = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
const setTheme = (t) => { document.documentElement.dataset.theme = t; tb.setAttribute("aria-label", `Switch to ${t === "dark" ? "light" : "dark"} theme`); try { localStorage.setItem("theme", t); } catch {} };
if (saved) setTheme(saved);
tb.onclick = () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
const links = [...menu.querySelectorAll("a")];
const spy = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + x.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
links.forEach((l) => { const s = document.querySelector(l.getAttribute("href")); s && spy.observe(s); });

/* scroll reveal */
const rv = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); rv.unobserve(x.target); } }), { threshold: .1 });
document.querySelectorAll(".reveal").forEach((n) => reduced ? n.classList.add("in") : rv.observe(n));

/* terminal greeting */
const line = "whoami → Dhivyalakshmi A", tEl = $("#typed");
if (reduced) tEl.textContent = line; else { let i = 0; const t = setInterval(() => { tEl.textContent = line.slice(0, ++i); if (i >= line.length) clearInterval(t); }, 70); }

/* dotted globe (canvas) */
(function () {
  const cv = $("#globe"), ctx = cv.getContext("2d"), W = cv.width, R = W * .36, C = W / 2;
  const pts = [], N = 700;
  for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963; pts.push([Math.cos(th) * r, y, Math.sin(th) * r]); }
  const nodes = [[.6,.3,.74,0],[-.7,-.2,.68,1],[.2,-.7,.69,0],[-.3,.75,.59,0],[.85,-.1,-.5,1]];
  const rot = (p, a, t) => [p[0] * Math.cos(a) + p[2] * Math.sin(a), p[1] * Math.cos(t) - (p[2] * Math.cos(a) - p[0] * Math.sin(a)) * Math.sin(t), p[1] * Math.sin(t) + (p[2] * Math.cos(a) - p[0] * Math.sin(a)) * Math.cos(t)];
  let a = 0, visible = true;
  new IntersectionObserver((e) => visible = e[0].isIntersecting).observe(cv);
  function draw() {
    ctx.clearRect(0, 0, W, W);
    const g = ctx.createRadialGradient(C, C, R * .2, C, C, R * 1.5); g.addColorStop(0, "rgba(47,107,255,.35)"); g.addColorStop(1, "transparent");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, W);
    ctx.strokeStyle = "rgba(61,165,255,.35)"; ctx.lineWidth = 1.5;
    [[1.18, .5], [1.32, -.6]].forEach(([s, tilt]) => { ctx.beginPath(); ctx.ellipse(C, C, R * s, R * s * .35, tilt, 0, 6.3); ctx.stroke(); });
    pts.forEach((p) => { const q = rot(p, a, .35); if (q[2] < -.05) return; ctx.fillStyle = `rgba(${90 + 60 * q[2] | 0},${160 + 60 * q[2] | 0},255,${.25 + .6 * q[2]})`; ctx.fillRect(C + q[0] * R, C + q[1] * R, 2.2, 2.2); });
    nodes.forEach(([x, y, z, amber]) => { const q = rot([x, y, z], a, .35); if (q[2] < 0) return; const pulse = reduced ? 1 : 1 + .4 * Math.sin(a * 6 + x * 9); ctx.fillStyle = amber ? "#ffb23d" : "#3da5ff"; ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 14; ctx.beginPath(); ctx.arc(C + q[0] * R, C + q[1] * R, 4 * pulse, 0, 6.3); ctx.fill(); ctx.shadowBlur = 0; });
    if (!reduced) { if (visible) a += .004; requestAnimationFrame(draw); }
  }
  draw();
})();
