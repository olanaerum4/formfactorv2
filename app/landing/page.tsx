"use client";
import { useState } from "react";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const joinWaitlist = () => {
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600&display=swap');
        .l-root { background:#080808;color:#fff;font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;min-height:100vh; }
        .l-nav { position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:18px 40px;background:rgba(8,8,8,0.9);backdrop-filter:blur(24px);border-bottom:1px solid rgba(255,255,255,0.06); }
        .l-logo { font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#FFE600;text-decoration:none;letter-spacing:-0.5px; }
        .l-nav-links { display:flex;gap:28px;align-items:center; }
        .l-nav-links a { font-size:14px;font-weight:500;color:#666;text-decoration:none;transition:color 0.2s; }
        .l-nav-links a:hover { color:#fff; }
        .l-nav-cta { background:#FFE600;color:#000;border:none;border-radius:8px;padding:9px 18px;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;text-decoration:none;transition:opacity 0.2s;white-space:nowrap; }
        .l-nav-cta:hover { opacity:0.85; }

        .l-hero { min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:120px 24px 80px;position:relative;overflow:hidden; }
        .l-hero-glow { position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:700px;height:700px;background:radial-gradient(circle,rgba(255,230,0,0.07) 0%,transparent 65%);pointer-events:none; }
        .l-badge { display:inline-flex;align-items:center;gap:8px;background:rgba(255,230,0,0.08);border:1px solid rgba(255,230,0,0.2);border-radius:20px;padding:6px 16px;font-size:11px;font-weight:700;color:#FFE600;letter-spacing:1px;text-transform:uppercase;margin-bottom:36px; }
        .l-badge-dot { width:6px;height:6px;border-radius:50%;background:#FFE600;animation:l-pulse 2s infinite; }
        @keyframes l-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .l-h1 { font-family:'Syne',sans-serif;font-size:clamp(46px,7vw,88px);font-weight:800;line-height:1.0;letter-spacing:-3px;margin-bottom:24px; }
        .l-h1 em { color:#FFE600;font-style:normal; }
        .l-hero-sub { font-size:clamp(15px,1.8vw,18px);color:#666;max-width:520px;line-height:1.7;margin-bottom:48px; }
        .l-cta-row { display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-bottom:80px; }
        .l-btn-primary { background:#FFE600;color:#000;border:none;border-radius:10px;padding:15px 30px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all 0.2s; }
        .l-btn-primary:hover { transform:translateY(-2px);box-shadow:0 8px 32px rgba(255,230,0,0.3); }
        .l-btn-ghost { background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.12);border-radius:10px;padding:15px 30px;font-size:15px;font-weight:500;font-family:inherit;cursor:pointer;text-decoration:none;transition:all 0.2s; }
        .l-btn-ghost:hover { border-color:rgba(255,255,255,0.3);background:rgba(255,255,255,0.04); }

        .l-mockup-wrap { display:flex;justify-content:center;align-items:flex-start;gap:60px;padding:80px 40px;max-width:1100px;margin:0 auto; }
        .l-phone { width:280px;flex-shrink:0;background:#111;border-radius:34px;border:1.5px solid #1f1f1f;box-shadow:0 40px 100px rgba(0,0,0,0.9),0 0 0 1px rgba(255,255,255,0.04);overflow:hidden; }
        .l-phone-screen { padding:18px 14px; }
        .l-phone-status { display:flex;justify-content:space-between;font-size:10px;font-weight:600;margin-bottom:16px; }
        .l-phone-greeting { font-size:9px;color:#444;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:3px; }
        .l-phone-title { font-family:'Syne',sans-serif;font-size:24px;font-weight:800;line-height:1.1;margin-bottom:14px; }
        .l-m-card { background:#1a1a1a;border-radius:12px;padding:12px;margin-bottom:10px; }
        .l-m-row { display:flex; }
        .l-m-col { flex:1;text-align:center;padding:0 4px; }
        .l-m-col+.l-m-col { border-left:1px solid #222; }
        .l-m-label { font-size:8px;font-weight:700;color:#444;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px; }
        .l-m-val { font-size:20px;font-weight:800;font-family:'JetBrains Mono',monospace; }
        .l-w-card { background:#FFE600;border-radius:12px;padding:12px;margin-bottom:10px;color:#000; }
        .l-w-label { font-size:8px;font-weight:800;letter-spacing:1.5px;opacity:0.6;text-transform:uppercase;margin-bottom:3px; }
        .l-w-title { font-family:'Syne',sans-serif;font-size:16px;font-weight:800;line-height:1.2;margin-bottom:3px; }
        .l-w-sub { font-size:10px;opacity:0.6; }
        .l-ai-card { background:#1a1a1a;border-radius:12px;padding:10px 12px;display:flex;gap:8px;align-items:flex-start; }
        .l-ai-dot { width:22px;height:22px;min-width:22px;border-radius:50%;background:#FFE600;display:flex;align-items:center;justify-content:center;font-size:7px;font-weight:800;color:#000; }
        .l-ai-text { font-size:10px;color:#aaa;line-height:1.5; }
        .l-ai-text strong { color:#fff; }

        .l-mockup-text { flex:1;max-width:480px;padding-top:40px; }
        .l-mockup-text h2 { font-family:'Syne',sans-serif;font-size:clamp(26px,3.5vw,42px);font-weight:800;letter-spacing:-1.5px;line-height:1.1;margin-bottom:20px; }
        .l-mockup-text h2 em { color:#FFE600;font-style:normal; }
        .l-mockup-text p { font-size:15px;color:#666;line-height:1.7;margin-bottom:32px; }
        .l-feature-list { list-style:none;display:flex;flex-direction:column;gap:14px; }
        .l-feature-list li { display:flex;align-items:flex-start;gap:12px;font-size:14px;color:#ccc;line-height:1.5; }
        .l-check { color:#FFE600;font-size:11px;font-weight:800;margin-top:2px;flex-shrink:0; }

        .l-stats { border-top:1px solid rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:center;padding:40px; }
        .l-stats-inner { display:flex;gap:80px;flex-wrap:wrap;justify-content:center; }
        .l-stat { text-align:center; }
        .l-stat-n { font-family:'JetBrains Mono',monospace;font-size:40px;font-weight:600;color:#FFE600;line-height:1;margin-bottom:6px; }
        .l-stat-l { font-size:12px;color:#444;font-weight:500;text-transform:uppercase;letter-spacing:1px; }

        .l-features { padding:100px 40px;max-width:1100px;margin:0 auto; }
        .l-eyebrow { font-size:11px;font-weight:700;color:#FFE600;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px; }
        .l-features h2 { font-family:'Syne',sans-serif;font-size:clamp(28px,4vw,48px);font-weight:800;letter-spacing:-2px;line-height:1.1;margin-bottom:60px; }
        .l-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:rgba(255,255,255,0.05);border-radius:20px;overflow:hidden; }
        .l-grid-item { background:#0e0e0e;padding:32px 28px;transition:background 0.2s; }
        .l-grid-item:hover { background:#131313; }
        .l-grid-icon { font-size:24px;margin-bottom:16px; }
        .l-grid-title { font-family:'Syne',sans-serif;font-size:17px;font-weight:700;margin-bottom:10px;letter-spacing:-0.3px; }
        .l-grid-desc { font-size:13px;color:#555;line-height:1.6; }

        .l-pricing { padding:100px 40px;max-width:900px;margin:0 auto; }
        .l-pricing h2 { font-family:'Syne',sans-serif;font-size:clamp(28px,4vw,48px);font-weight:800;letter-spacing:-2px;margin-bottom:60px; }
        .l-pricing-grid { display:grid;grid-template-columns:1fr 1fr;gap:2px;background:rgba(255,255,255,0.05);border-radius:20px;overflow:hidden; }
        .l-p-card { background:#0e0e0e;padding:40px 36px; }
        .l-p-card.featured { background:#131313; }
        .l-p-tag { display:inline-block;background:#FFE600;color:#000;font-size:10px;font-weight:800;letter-spacing:1px;text-transform:uppercase;border-radius:20px;padding:4px 12px;margin-bottom:20px; }
        .l-p-name { font-family:'Syne',sans-serif;font-size:20px;font-weight:800;margin-bottom:8px; }
        .l-p-price { font-family:'JetBrains Mono',monospace;font-size:48px;font-weight:600;letter-spacing:-2px;line-height:1;margin-bottom:6px; }
        .l-p-price span { font-size:16px;font-weight:400;color:#555;letter-spacing:0;font-family:'Inter',sans-serif; }
        .l-p-desc { font-size:13px;color:#555;margin-bottom:28px;line-height:1.6; }
        .l-p-list { list-style:none;margin-bottom:36px; }
        .l-p-list li { font-size:13px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.04);display:flex;align-items:center;gap:10px;color:#aaa; }
        .l-p-list li:last-child { border-bottom:none; }
        .l-p-list li.dim { color:#333; }
        .ck { color:#FFE600;font-weight:700;font-size:12px;flex-shrink:0; }
        .nx { color:#333;font-weight:700;font-size:12px;flex-shrink:0; }
        .l-p-btn { width:100%;padding:13px;border-radius:10px;font-size:14px;font-weight:700;font-family:inherit;cursor:pointer;border:none;transition:all 0.2s;text-decoration:none;display:block;text-align:center; }
        .l-p-btn.y { background:#FFE600;color:#000; }
        .l-p-btn.y:hover { opacity:0.88; }
        .l-p-btn.g { background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.1); }
        .l-p-btn.g:hover { border-color:rgba(255,255,255,0.25); }
        .l-beta-note { margin-top:28px;font-size:13px;color:#444;text-align:center; }

        .l-cta { padding:120px 40px;text-align:center;position:relative;overflow:hidden; }
        .l-cta::before { content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;height:400px;background:radial-gradient(ellipse,rgba(255,230,0,0.05) 0%,transparent 70%);pointer-events:none; }
        .l-cta h2 { font-family:'Syne',sans-serif;font-size:clamp(32px,5vw,60px);font-weight:800;letter-spacing:-2px;line-height:1.1;margin-bottom:16px; }
        .l-cta p { font-size:16px;color:#555;margin-bottom:40px; }
        .l-form { display:flex;gap:12px;justify-content:center;flex-wrap:wrap; }
        .l-input { background:#141414;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px 20px;font-size:14px;font-family:inherit;color:#fff;width:280px;outline:none;transition:border-color 0.2s; }
        .l-input:focus { border-color:rgba(255,230,0,0.5); }
        .l-input::placeholder { color:#333; }
        .l-success { color:#FFE600;font-size:14px;font-weight:600;margin-top:16px; }

        .l-footer { border-top:1px solid rgba(255,255,255,0.06);padding:36px 40px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px; }
        .l-footer-logo { font-family:'Syne',sans-serif;font-size:16px;font-weight:800;color:#FFE600;text-decoration:none; }
        .l-footer p { font-size:12px;color:#333; }
        .l-footer-links { display:flex;gap:20px; }
        .l-footer-links a { font-size:12px;color:#333;text-decoration:none;transition:color 0.2s; }
        .l-footer-links a:hover { color:#666; }

        @media (max-width:900px) {
          .l-nav { padding:16px 20px; }
          .l-nav-links { display:none; }
          .l-mockup-wrap { flex-direction:column;align-items:center;padding:60px 24px;gap:48px; }
          .l-mockup-text { padding-top:0; }
          .l-features { padding:80px 24px; }
          .l-grid { grid-template-columns:1fr 1fr; }
          .l-stats-inner { gap:40px; }
          .l-pricing { padding:80px 24px; }
          .l-cta { padding:80px 24px; }
          .l-footer { padding:28px 24px;flex-direction:column;text-align:center;gap:12px; }
        }
        @media (max-width:600px) {
          .l-h1 { letter-spacing:-2px; }
          .l-grid { grid-template-columns:1fr; }
          .l-pricing-grid { grid-template-columns:1fr; }
          .l-stats-inner { gap:28px; }
          .l-stat-n { font-size:32px; }
          .l-features { padding:60px 20px; }
          .l-pricing { padding:60px 20px; }
          .l-input { width:100%;max-width:340px; }
          .l-phone { width:260px; }
        }
      `}</style>

      <div className="l-root">
        <nav className="l-nav">
          <a href="/" className="l-logo">FormFactor</a>
          <div className="l-nav-links">
            <a href="#features">Funksjoner</a>
            <a href="#pricing">Priser</a>
            <a href="#waitlist">Beta</a>
          </div>
          <a href="#waitlist" className="l-nav-cta">Kom i gang gratis</a>
        </nav>

        <section className="l-hero">
          <div className="l-hero-glow" />
          <div className="l-badge"><div className="l-badge-dot" />Beta — gratis tilgang nå</div>
          <h1 className="l-h1">Din personlige<br /><em>AI-løpecoach.</em></h1>
          <p className="l-hero-sub">FormFactor analyserer treningsbelastningen din, ser når du er klar, og forteller deg nøyaktig hva du skal gjøre — basert på vitenskap, ikke magefølelse.</p>
          <div className="l-cta-row">
            <a href="#waitlist" className="l-btn-primary">Start gratis →</a>
            <a href="#features" className="l-btn-ghost">Se hvordan det fungerer</a>
          </div>
          <div style={{ display:"flex", gap:48, flexWrap:"wrap", justifyContent:"center" }}>
            {[["VDOT","Beregnet fra dine løp"],["CTL/ATL","Fitness tracker over tid"],["AI","Coach som kjenner planen"]].map(([n,l]) => (
              <div key={n} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:32, fontWeight:600, color:"#FFE600", lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:12, color:"#444", marginTop:6, fontWeight:500 }}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="l-mockup-wrap">
          <div className="l-phone">
            <div className="l-phone-screen">
              <div className="l-phone-status"><span>09:41</span><span>⚡ 100%</span></div>
              <div className="l-phone-greeting">FRE · MAI 16 · UKE 11/17</div>
              <div className="l-phone-title">God morgen,<br />Ola.</div>
              <div className="l-m-card">
                <div className="l-m-row">
                  <div className="l-m-col"><div className="l-m-label">Form</div><div className="l-m-val" style={{color:"#FFE600"}}>−16</div></div>
                  <div className="l-m-col"><div className="l-m-label">Fitness</div><div className="l-m-val">52</div></div>
                  <div className="l-m-col"><div className="l-m-label">Utmatting</div><div className="l-m-val" style={{color:"#FF6B6B"}}>68</div></div>
                </div>
              </div>
              <div className="l-w-card">
                <div className="l-w-label">VO₂MAX INTERVALLER</div>
                <div className="l-w-title">5 × 800m @ 4:00/km</div>
                <div className="l-w-sub">2 min flyt · 65 min totalt · TSS 78</div>
              </div>
              <div className="l-ai-card">
                <div className="l-ai-dot">AI</div>
                <div className="l-ai-text"><strong>Du er klar.</strong> Form er −16 — hold 4:00, ikke jag 3:55.</div>
              </div>
            </div>
          </div>
          <div className="l-mockup-text">
            <div className="l-eyebrow">Slik fungerer det</div>
            <h2>Treningsvitenskap som <em>faktisk gir mening.</em></h2>
            <p>FormFactor bruker samme metodikk som profflag — CTL, ATL og TSB fra Performance Management Chart — og gjør det tilgjengelig for alle.</p>
            <ul className="l-feature-list">
              {["Koble Strava én gang — alt synkroniseres automatisk","Skriv inn 5K-tiden din og få alle treningssoner beregnet","AI-coachen ser formen din og tilpasser råd i sanntid","Kan ikke trene torsdag? Planen omfordeles automatisk"].map(f => (
                <li key={f}><span className="l-check">✓</span>{f}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="l-stats">
          <div className="l-stats-inner">
            {[["42d","CTL-vindu"],["7d","ATL-vindu"],["VDOT","Jack Daniels"],["2 min","Svar fra AI"]].map(([n,l]) => (
              <div className="l-stat" key={n}><div className="l-stat-n">{n}</div><div className="l-stat-l">{l}</div></div>
            ))}
          </div>
        </div>

        <section className="l-features" id="features">
          <div className="l-eyebrow">Funksjoner</div>
          <h2>Trening basert på<br />vitenskap, ikke gjetning.</h2>
          <div className="l-grid">
            {[
              ["📊","CTL / ATL / TSB","Performance Management Chart — samme metode brukt av profflag. Vet når du er klar og når du trenger hvile."],
              ["🎯","VDOT-soner","Jack Daniels' system beregner alle dine løpesoner fra ett løp. Nøyaktig tempo for hver økt."],
              ["🤖","AI Coach","Kjenner planen, sone-målene og formen din. Gir konkrete råd med eksakte tall — ikke generiske tips."],
              ["🔗","Strava-synk","Koble Strava og appen oppdateres automatisk etter hver økt. Ingen manuell logging."],
              ["📅","Adaptiv plan","Kan ikke trene torsdag? AI-en omfordeler TSS-en automatisk uten å ødelegge uka."],
              ["⚡","Simple + Pro mode","Ny løper? Enkle beskjeder. Erfaren? Slå på Pro og se alle metrikker."],
            ].map(([icon,title,desc]) => (
              <div className="l-grid-item" key={title as string}>
                <div className="l-grid-icon">{icon}</div>
                <div className="l-grid-title">{title}</div>
                <div className="l-grid-desc">{desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="l-pricing" id="pricing">
          <div className="l-eyebrow">Priser</div>
          <h2>Enkelt og ærlig.</h2>
          <div className="l-pricing-grid">
            <div className="l-p-card">
              <div className="l-p-name">Gratis</div>
              <div className="l-p-price">0<span> kr/mnd</span></div>
              <div className="l-p-desc">Alt du trenger for å komme i gang.</div>
              <ul className="l-p-list">
                {[["Treningsplan basert på mål",true],["VDOT-soner fra løpetiden din",true],["CTL / ATL / TSB dashboard",true],["Øktlogging med RPE",true],["Strava-synk",true],["AI Coach (ubegrenset)",false],["Adaptiv planlegging",false]].map(([f,ok]) => (
                  <li key={f as string} className={ok ? "" : "dim"}><span className={ok ? "ck" : "nx"}>{ok ? "✓" : "×"}</span>{f}</li>
                ))}
              </ul>
              <a href="#waitlist" className="l-p-btn g">Start gratis</a>
            </div>
            <div className="l-p-card featured">
              <div className="l-p-tag">Mest populær</div>
              <div className="l-p-name">Pro</div>
              <div className="l-p-price">99<span> kr/mnd</span></div>
              <div className="l-p-desc">Full tilgang til AI-coachen og alle avanserte funksjoner.</div>
              <ul className="l-p-list">
                {["Alt i Gratis","AI Coach — ubegrenset","Adaptiv ukesplan","Detaljert øktanalyse","Løpebibliotek med mål","Prioritert support"].map(f => (
                  <li key={f}><span className="ck">✓</span>{f}</li>
                ))}
              </ul>
              <a href="#waitlist" className="l-p-btn y">Start gratis i beta →</a>
            </div>
          </div>
          <div className="l-beta-note">🎉 I beta-perioden er hele Pro-planen gratis. Ingen kredittkort nødvendig.</div>
        </section>

        <section className="l-cta" id="waitlist">
          <div className="l-eyebrow">Tidlig tilgang</div>
          <h2>Bli med i beta.</h2>
          <p>Gratis tilgang til hele appen — ingen kredittkort.</p>
          {!submitted ? (
            <div className="l-form">
              <input type="email" className="l-input" placeholder="din@epost.no" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && joinWaitlist()} />
              <button className="l-btn-primary" onClick={joinWaitlist} style={{ borderRadius:10, padding:"14px 28px" }}>Få tilgang →</button>
            </div>
          ) : (
            <div className="l-success">🎉 Du er med! Vi gir deg beskjed når appen er klar.</div>
          )}
        </section>

        <footer className="l-footer">
          <a href="/" className="l-footer-logo">FormFactor</a>
          <p>© 2026 FormFactor. Alle rettigheter forbeholdt.</p>
          <div className="l-footer-links">
            <a href="#">Personvern</a>
            <a href="#">Vilkår</a>
            <a href="mailto:hei@formfactor.space">Kontakt</a>
          </div>
        </footer>
      </div>
    </>
  );
}
