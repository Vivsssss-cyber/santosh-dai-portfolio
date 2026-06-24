import { IconCTO, IconYears, IconDegree } from "@/components/Icons";
import { Button } from "@/components/Button";
import { InfoCard } from "@/components/InfoCard";
import { RevealGroup, RevealLine } from "@/components/RevealText";
import { Reveal, RevealItem, RevealMedia, RevealImg } from "@/components/Reveal";
import { SectionHead, TagList } from "@/components/Section";
import { Nav } from "@/components/Nav";
import { Person } from "@/components/Person";
import { TechStack } from "@/components/TechStack";
import ShaderBackground from "@/components/ui/shader-background";
import ResearchExplorer from "@/components/ui/research-explorer";

export default function Home() {
  return (
    <>
      {/* corner light glows — fixed to viewport corners */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="light light-left" src="/assets/Left-light.webp" alt="" aria-hidden="true" decoding="async" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="light light-right" src="/assets/right-light.webp" alt="" aria-hidden="true" decoding="async" />

      <div className="shell">
        {/* inset frame + plus markers */}
        <div className="frame" aria-hidden="true">
          <span className="plus tl" />
          <span className="plus tr" />
          <span className="plus bl" />
          <span className="plus br" />
          <span className="plus ml" />
          <span className="plus mr" />
          <span className="plus ml2" />
        </div>

        {/* faint waveform */}
        <div className="waveform" aria-hidden="true" />

        {/* NAV — shared component; scrollspy active on this page */}
        <Nav />

        {/* HERO */}
        <section className="hero">
          <RevealGroup className="hero-copy">
            {/* Title: aria-label = whole sentence read as one unit;
                the split spans are decorative, so hide them from SR. */}
            <h1 className="h-title" aria-label="Speech AI Research Engineer">
              <span aria-hidden="true">
                <RevealLine className="speech">Speech AI</RevealLine>
                <RevealLine className="role">Research Engineer</RevealLine>
              </span>
            </h1>
            <RevealLine as="p" className="h-body">
              I work across the full arc of speech and language AI — from research
              and model development to production at scale.
            </RevealLine>
            <RevealLine as="div" className="h-actions" display="flex">
              <Button href="#research" variant="primary">View Research</Button>
              <Button href="#contact" variant="white">Get in Touch</Button>
            </RevealLine>
          </RevealGroup>

          {/* PERSON — spinning alpha video on Blink/Gecko; transparent still on
              WebKit (no alpha-video support). See components/Person.tsx. */}
          <Person />

          {/* RIGHT INFO CARDS */}
          <RevealGroup as="aside" className="info">
            <RevealLine>
              <InfoCard
                icon={<IconCTO />}
                title="Former CTO · Diyo.ai"
                sub="2022–2025 — led AI product & engineering"
              />
            </RevealLine>
            <RevealLine>
              <InfoCard
                icon={<IconYears />}
                title="5+ Years in AI & NLP"
                sub="Speech, LLMs & on-device ML"
              />
            </RevealLine>
            <RevealLine>
              <InfoCard
                icon={<IconDegree />}
                title="M.Sc Informatics & Intelligence Systems"
                sub="NLP, machine learning"
              />
            </RevealLine>
          </RevealGroup>
        </section>

        {/* ABOUT (01 / 04) */}
        <section id="about" className="section">
          <div className="wrap about-grid">
            <Reveal>
              <RevealItem>
                <SectionHead num="01" label="About" />
              </RevealItem>
              <RevealItem>
                <div className="about-loc eyebrow">Kathmandu, Nepal</div>
              </RevealItem>
              <RevealItem className="about-tags">
                <span className="eyebrow">Focus</span>
                <TagList
                  items={[
                    "Speech recognition",
                    "LLMs & RAG",
                    "Conversational AI",
                    "On-device ML",
                    "Low-resource NLP",
                  ]}
                />
              </RevealItem>
            </Reveal>
            <Reveal className="about-body">
              <RevealItem as="p">
                I work where speech recognition, large language models, and real
                deployment meet — systems that hold up outside the lab and serve
                speakers mainstream AI ignores.
              </RevealItem>
              <RevealItem as="p">
                Most of my research makes ASR efficient enough to run on-device and
                robust enough for accented and low-resource speech, especially Nepali.
                Alongside that I’ve led production teams shipping conversational AI for
                healthcare and public services — RAG chatbots used by thousands of real
                users.
              </RevealItem>
              <RevealItem as="p">
                I’m completing an M.Sc in Informatics & Intelligence Systems
                Engineering, after five years building and leading AI in industry —
                most recently as a CTO.
              </RevealItem>
            </Reveal>
          </div>
        </section>

        {/* RESEARCH (02 / 04) */}
        <section id="research" className="section">
          <div className="wrap">
            <Reveal>
              <RevealItem>
                <SectionHead
                  num="02"
                  label="Research"
                  lead={
                    <>
                      Selected work in speech & language. Code on{" "}
                      <a
                        className="clink"
                        href="https://github.com/santoshdahal2016"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                      .
                    </>
                  }
                />
              </RevealItem>
            </Reveal>

            <RevealMedia>
              <ResearchExplorer />
            </RevealMedia>
          </div>
        </section>

        {/* BUILDING (03 / 04) */}
        <section id="building" className="section">
          <div className="wrap building-grid">
            <div className="building-main">
            <Reveal>
              <RevealItem>
                <SectionHead
                  num="03"
                  label="Professional"
                  lead="Carrying AI from prototype to production — leading teams and shipping systems real users depend on."
                />
              </RevealItem>
              <RevealItem>
                <p className="building-lead">
                  <strong>As CTO at Diyo.ai (2022–2025),</strong> I led a team of 5+
                  engineers building Nepali speech-recognition APIs, and designed a
                  human + AI transcription platform that cut transcription costs by 75%.
                </p>
              </RevealItem>
            </Reveal>
            <Reveal className="timeline">
              <RevealItem className="tl-item">
                <div className="tl-role">Chief Technology Officer</div>
                <div className="tl-org">Diyo.ai Technologies · Kathmandu</div>
                <div className="tl-period">2022–2025</div>
                <p className="tl-desc">
                  Led Nepali ASR APIs and a human + AI transcription platform (−75%
                  cost); managed 5+ engineers.
                </p>
              </RevealItem>
              <RevealItem className="tl-item">
                <div className="tl-role">Research & Development Engineer</div>
                <div className="tl-org">Diyo.ai Technologies · Kathmandu</div>
                <div className="tl-period">2020–2022</div>
                <p className="tl-desc">
                  Built SLAM-based localization APIs for persistent AR on mobile.
                </p>
              </RevealItem>
              <RevealItem className="tl-item">
                <div className="tl-role">Research Intern</div>
                <div className="tl-org">
                  NAAMII, Nepal Applied Mathematics & Informatics Institute
                </div>
                <div className="tl-period">2019–2020</div>
                <p className="tl-desc">
                  Literature reviews and experiment design for SLAM algorithms.
                </p>
              </RevealItem>
              <RevealItem className="tl-item">
                <div className="tl-role">Full-Stack Developer</div>
                <div className="tl-org">Dreamsys IT Solution</div>
                <div className="tl-period">2016–2019</div>
                <p className="tl-desc">
                  Designed databases and RESTful APIs for SurveyChan; improved
                  data-retrieval speed by 50%.
                </p>
              </RevealItem>
            </Reveal>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Reveal as="figure" className="building-figure">
              <RevealItem>
                <img
                  className="builder-img"
                  src="/assets/builder.webp"
                  alt=""
                  aria-hidden="true"
                  width={328}
                  height={697}
                  loading="lazy"
                  decoding="async"
                />
              </RevealItem>
            </Reveal>
          </div>
        </section>

        {/* EDUCATION (04 / 04) */}
        <section id="education" className="section">
          <div className="wrap edu-grid">
            <div className="edu-main">
              <Reveal>
                <RevealItem>
                  <SectionHead num="04" label="Education" />
                </RevealItem>
              </Reveal>
              <Reveal className="edu">
                <RevealItem className="edu-item">
                  <div className="edu-deg">
                    M.Sc — Informatics & Intelligence Systems Engineering
                  </div>
                  <div className="edu-org">
                    Institute of Engineering, Tribhuvan University · Kathmandu
                  </div>
                  <div className="edu-meta">
                    2024–2026 · Modern NLP · Applied Machine Learning · Computer Vision
                  </div>
                </RevealItem>
                <RevealItem className="edu-item">
                  <div className="edu-deg">
                    B.E. — Electronics & Communication Engineering
                  </div>
                  <div className="edu-org">
                    Institute of Engineering, Tribhuvan University · Pokhara
                  </div>
                  <div className="edu-meta">
                    2015–2019 · Signals & systems · Embedded systems · Communications
                  </div>
                </RevealItem>
              </Reveal>
              <Reveal>
                <RevealItem className="collab">
                  <span className="eyebrow">Research collaborators & supervisors</span>
                  Dr. Luis Fernando D’Haro · Dr. Bishesh Khanal · Dr. Danda Pani Paudel ·
                  Dr. Suman Raj Bista · Dr. Ajad Chhatkuli
                </RevealItem>
              </Reveal>
            </div>

            {/* big degree glyph — vertically centered against the text block */}
            <Reveal as="figure" className="edu-figure">
              <RevealItem>
                {/* amber→peach gradient (mirrors --grad-text); glyph paths
                    reference it via CSS fill: url(#eduGrad) */}
                <svg
                  width="0"
                  height="0"
                  focusable="false"
                  aria-hidden="true"
                  style={{ position: "absolute" }}
                >
                  <defs>
                    <linearGradient id="eduGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c35108" />
                      <stop offset="100%" stopColor="#fbc27d" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="edu-glyph" aria-hidden="true">
                  <IconDegree />
                </span>
              </RevealItem>
            </Reveal>
          </div>
        </section>

        {/* TECH STACK */}
        <section id="stack" className="section">
          <div className="wrap techstack-grid">
            <div className="ts-copy">
              <Reveal>
                <RevealItem>
                  <SectionHead
                    num=""
                    label="Tech Stack"
                    lead="The tools I reach for across research and production — languages and ML models at the core, with web, data, and robotics orbiting out."
                  />
                </RevealItem>
                <RevealItem>
                  <ul className="ts-legend" aria-hidden="true">
                    {[
                      "Languages",
                      "ML & AI",
                      "Web & API",
                      "Data & Infra",
                      "Conversational & Robotics",
                    ].map((c) => (
                      <li key={c} className="ts-legend-item">
                        {c}
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              </Reveal>
            </div>
            <RevealMedia amount={0.15}>
              <TechStack />
            </RevealMedia>
          </div>
        </section>

        {/* MISSION → CTA (shader panel) — full-bleed to the frame margin lines */}
        <section className="cta" aria-label="Mission">
          <div className="cta-panel">
              {/* animated amber-plasma field — fills the panel, sits behind text */}
              <ShaderBackground className="cta-shader" />
              {/* warm scrim keeps the cream quote legible over the plasma */}
              <div className="cta-veil" aria-hidden="true" />

              <Reveal className="cta-inner">
                <RevealItem as="blockquote" className="cta-quote">
                  <span className="cta-mark" aria-hidden="true">&ldquo;</span>
                  Most speech AI is built for English and well-resourced speakers.
                  I build for{" "}
                  <span className="cta-nowrap">
                    <span className="em">the rest</span> &mdash; Nepali,
                  </span>{" "}
                  accented, low-bandwidth, on-device.
                  <span className="cta-mark" aria-hidden="true">&rdquo;</span>
                </RevealItem>
                <RevealItem as="div" className="cta-actions">
                  <Button href="#research" variant="primary">
                    Read the research
                  </Button>
                  <Button href="#contact" variant="white">
                    Get in touch
                  </Button>
                </RevealItem>
              </Reveal>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact-sec">
          {/* Centring lives on the CSS `translate` property, so the reveal can
              own `transform` — full fade + rise + scale, still vertically centred. */}
          <RevealImg
            className="contact-monk"
            src="/assets/person-monk.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <Reveal className="wrap">
            <RevealItem>
              <h2 className="contact-head">Let’s talk speech AI.</h2>
            </RevealItem>
            <RevealItem>
              <p className="contact-body">
                Working on speech recognition, low-resource NLP, or accessibility —
                or just want to compare notes? Always glad to talk research and
                collaboration.
              </p>
            </RevealItem>
            <RevealItem className="contact-actions">
              <Button href="mailto:santosh@suntos.com.np" variant="primary">
                Email me
              </Button>
            </RevealItem>
            <RevealItem className="contact-links">
              <a
                className="clink"
                href="https://www.linkedin.com/in/endahalsantosh/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="clink"
                href="https://github.com/santoshdahal2016"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a className="clink" href="mailto:santosh@suntos.com.np">
                santosh@suntos.com.np
              </a>
            </RevealItem>
          </Reveal>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="wrap">
            <div className="foot-copy">© 2026 Santosh Dahal — All rights reserved.</div>
            <nav className="foot-links">
              <a href="https://github.com/santoshdahal2016" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/endahalsantosh/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
