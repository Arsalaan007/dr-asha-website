import Image from "next/image";
import { Header } from "./components/Header";
import { Reveal } from "./components/Reveal";
import { TreatmentsExplorer } from "./components/TreatmentsExplorer";
import { VideoEmbed } from "./components/VideoEmbed";
import { Logo } from "./components/Logo";
import { Arrow, Check, Clock, Mail, Phone, Pin, Shield } from "./components/Icons";
import { credentials, nav, site, stats, video } from "@/lib/site";

const base = process.env.NEXT_PUBLIC_BASE_PATH;
const tel = `tel:${site.phone.replace(/\s/g, "")}`;
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Kicker({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <span className="kicker">
      <span className="kicker-num">{n}</span>
      <span className="kicker-line" aria-hidden="true" />
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <Reveal />
      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow" data-reveal><Shield /> {site.tagline}</span>
              <h1 data-reveal style={delay(80)}>
                Lasting relief from back, neck &amp; joint pain — <em>without surgery.</em>
              </h1>
              <p className="lead" data-reveal style={delay(160)}>
                A non-surgical super-specialisation centre led by {site.doctorTitle}, a Diplomated
                McKenzie Clinician with over three decades of clinical practice in Mumbai.
              </p>
              <div className="hero-actions" data-reveal style={delay(240)}>
                <a href="#contact" className="btn btn-primary">Get in touch <Arrow /></a>
                <a href={tel} className="btn btn-ghost"><Phone /> Call the clinic</a>
              </div>
              <ul className="hero-points" data-reveal style={delay(320)}>
                <li><Check /> Accredited by McKenzie Institute International, NZ</li>
                <li><Check /> Many patients respond within the first visit</li>
              </ul>
            </div>

            <ul className="hero-stats" data-reveal style={delay(200)}>
              {stats.map((st) => (
                <li key={st.label}>
                  <strong>{st.value}</strong>
                  <span>{st.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="container about-grid">
            <figure className="about-photo" data-reveal>
              <Image
                src={`${base}/dr-asha.jpg`}
                alt="Dr. Asha Menon, McKenzie physiotherapist"
                width={960}
                height={1200}
                sizes="(max-width: 1000px) 90vw, 460px"
              />
              <figcaption className="photo-badge">
                <strong>Since 1990</strong>
                <span>in private practice</span>
              </figcaption>
            </figure>
            <div className="about-copy" data-reveal style={delay(120)}>
              <Kicker n="01">About the doctor</Kicker>
              <h2>Dr. Asha Menon <span className="nowrap">(P.T.), Dip. MDT</span></h2>
              <p className="lead-sm">
                Dr. Asha Menon specialises in assessing and treating conditions of the muscles, neural
                tissues and joints of the spine and extremities using the McKenzie Method, also called
                Mechanical Diagnosis and Therapy (MDT) — a movement-based approach that finds what helps
                your pain and teaches you to manage it yourself.
              </p>
              <div className="card cred-card">
                <h3>Qualifications &amp; roles</h3>
                <ul className="check-list">
                  {credentials.map((c) => <li key={c}><Check /> <span>{c}</span></li>)}
                </ul>
              </div>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">
                View LinkedIn profile <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* VIDEO */}
        <section id="video" className="section section-video">
          <div className="container video-wrap">
            <div className="section-head center" data-reveal>
              <Kicker n="02">{video.kicker}</Kicker>
              <h2>{video.title}</h2>
              <p>{video.text}</p>
            </div>
            <div data-reveal style={delay(120)}>
              <VideoEmbed id={video.youtubeId} title={video.title} />
            </div>
          </div>
        </section>

        {/* TREATMENTS */}
        <section id="treatments" className="section section-tint">
          <div className="container">
            <div className="section-head" data-reveal>
              <Kicker n="03">What we treat</Kicker>
              <h2>Conditions &amp; rehabilitation</h2>
              <p>Non-surgical care for the spine and joints, plus specialised rehabilitation. Explore by area of the body.</p>
            </div>
            <div data-reveal style={delay(120)}>
              <TreatmentsExplorer />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section">
          <div className="container">
            <div className="contact-head" data-reveal>
              <div>
                <Kicker n="04">Contact</Kicker>
                <h2>Visit the clinic</h2>
                <p>Call or email to speak with the clinic.</p>
              </div>
              <div className="contact-list">
                <a href={tel}><Phone /> {site.phone}</a>
                <a href={`mailto:${site.email}`}><Mail /> {site.email}</a>
              </div>
            </div>
            <div className="locations">
              {site.locations.map((l, i) => {
                const q = encodeURIComponent(l.mapQuery);
                return (
                  <div key={l.name} className="location" data-reveal style={delay(i * 120)}>
                    <div className="map">
                      <iframe
                        title={`Map: ${l.name}`}
                        src={`https://maps.google.com/maps?q=${q}&z=17&output=embed`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                    <div className="location-body">
                      <h3>{l.name}</h3>
                      <p><Pin /> {l.area} — {l.address}</p>
                      <p><Clock /> {l.timings}</p>
                      <a
                        className="btn btn-ghost btn-sm"
                        href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get directions <Arrow />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-band">
          <div className="container cta-inner" data-reveal>
            <div>
              <h2>Ready to move without pain?</h2>
              <p>Start with a proper McKenzie assessment.</p>
            </div>
            <a href={tel} className="btn btn-light"><Phone /> Call the clinic</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="brand brand-light">
            <Logo />
            <span>
              <strong>Back Neck &amp; Joints</strong>
              <small>{site.clinic}</small>
            </span>
          </div>
          <nav aria-label="Footer">
            {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </nav>
          <p className="fine">
            © {new Date().getFullYear()} {site.clinic}. All rights reserved. Information on this website
            is general and not a substitute for an in-person assessment.
          </p>
        </div>
      </footer>
    </>
  );
}
