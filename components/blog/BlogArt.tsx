import type { ReactElement } from "react";

/* Per-post article illustrations — themed blueprint SVG diagrams drawn from the
   shared .dgm-* class language in globals.css (Amber Dusk palette, no stock
   photos). Each post supplies a wide cover hero + one inline figure. All colour
   and text styling lives in the classes; only geometry is inline. Numbers are
   real (10.43% WER, −32.7% rel. WER, 5,000+ users, −75% cost); the low-resource
   post carries no published figure, so its diagrams stay qualitative. */
export type BlogArt = {
  cover: ReactElement;
  coverCaption: string;
  figure: ReactElement;
  figureCaption: string;
};

export const blogArt: Record<string, BlogArt> = {
  "accent-last-mile-asr": {
    cover: (
      <svg className="dgm" viewBox="0 0 800 460" role="img" aria-label="Accented speech routed through a phonetic router to six LoRA experts converging on a 10.43 percent word error rate result">
        <text className="dgm-label" x="40" y="70" textAnchor="start">ACCENTED SPEECH</text>
        <line className="dgm-line" x1="40" y1="200" x2="190" y2="200" />
        <rect className="dgm-ink" x="42" y="160" width="8" height="40" rx="2" />
        <rect className="dgm-ink" x="58" y="130" width="8" height="70" rx="2" />
        <rect className="dgm-ink" x="74" y="148" width="8" height="52" rx="2" />
        <rect className="dgm-ink" x="90" y="108" width="8" height="92" rx="2" />
        <rect className="dgm-ink" x="106" y="138" width="8" height="62" rx="2" />
        <rect className="dgm-ink" x="122" y="120" width="8" height="80" rx="2" />
        <rect className="dgm-ink" x="138" y="152" width="8" height="48" rx="2" />
        <rect className="dgm-ink" x="154" y="126" width="8" height="74" rx="2" />
        <rect className="dgm-ink" x="170" y="164" width="8" height="36" rx="2" />
        <line className="dgm-line" x1="200" y1="178" x2="244" y2="178" />
        <path className="dgm-ink-fill" d="M244 173 L254 178 L244 183 Z" />
        <path className="dgm-ink" d="M300 138 L344 178 L300 218 L256 178 Z" />
        <text className="dgm-tick" x="300" y="182" textAnchor="middle" dominantBaseline="middle">ROUTER</text>
        <line className="dgm-line" x1="344" y1="178" x2="382" y2="62" />
        <line className="dgm-line" x1="344" y1="178" x2="382" y2="108" />
        <line className="dgm-line" x1="344" y1="178" x2="382" y2="154" />
        <line className="dgm-line" x1="344" y1="178" x2="382" y2="200" />
        <line className="dgm-line" x1="344" y1="178" x2="382" y2="246" />
        <line className="dgm-line" x1="344" y1="178" x2="382" y2="292" />
        <rect className="dgm-ink" x="384" y="44" width="118" height="36" rx="8" />
        <text className="dgm-tick" x="443" y="62" textAnchor="middle" dominantBaseline="middle">Expert 1</text>
        <rect className="dgm-ink" x="384" y="90" width="118" height="36" rx="8" />
        <text className="dgm-tick" x="443" y="108" textAnchor="middle" dominantBaseline="middle">Expert 2</text>
        <rect className="dgm-ink" x="384" y="136" width="118" height="36" rx="8" />
        <text className="dgm-tick" x="443" y="154" textAnchor="middle" dominantBaseline="middle">Expert 3</text>
        <rect className="dgm-ink" x="384" y="182" width="118" height="36" rx="8" />
        <text className="dgm-tick" x="443" y="200" textAnchor="middle" dominantBaseline="middle">Expert 4</text>
        <rect className="dgm-ink" x="384" y="228" width="118" height="36" rx="8" />
        <text className="dgm-tick" x="443" y="246" textAnchor="middle" dominantBaseline="middle">Expert 5</text>
        <rect className="dgm-ink" x="384" y="274" width="118" height="36" rx="8" />
        <text className="dgm-tick" x="443" y="292" textAnchor="middle" dominantBaseline="middle">Expert 6</text>
        <line className="dgm-line" x1="502" y1="62" x2="560" y2="178" />
        <line className="dgm-line" x1="502" y1="108" x2="560" y2="178" />
        <line className="dgm-line" x1="502" y1="154" x2="560" y2="178" />
        <line className="dgm-line" x1="502" y1="200" x2="560" y2="178" />
        <line className="dgm-line" x1="502" y1="246" x2="560" y2="178" />
        <line className="dgm-line" x1="502" y1="292" x2="560" y2="178" />
        <line className="dgm-line" x1="560" y1="178" x2="588" y2="178" />
        <path className="dgm-ink-fill" d="M588 173 L598 178 L588 183 Z" />
        <rect className="dgm-amber-fill" x="604" y="150" width="56" height="56" rx="12" />
        <text className="dgm-num-accent" x="604" y="262" textAnchor="start" dominantBaseline="middle">10.43%</text>
        <text className="dgm-label" x="604" y="300" textAnchor="start">WER · L2-ARCTIC</text>
      </svg>
    ),
    coverCaption: "Frame-level routing across six phonetic LoRA experts handles accent as structure, not scale.",
    figure: (
      <svg className="dgm" viewBox="0 0 760 300" role="img" aria-label="Horizontal bar comparison of word error rate, generic ASR longer than MoPE-LoRA at 10.43 percent">
        <text className="dgm-label" x="40" y="44" textAnchor="start">WORD ERROR RATE</text>
        <line className="dgm-line" x1="220" y1="80" x2="220" y2="240" />
        <text className="dgm-tick" x="206" y="128" textAnchor="end" dominantBaseline="middle">Generic ASR</text>
        <rect className="dgm-soft-ink" x="220" y="104" width="440" height="48" rx="4" />
        <rect className="dgm-line" x="220" y="104" width="440" height="48" rx="4" />
        <text className="dgm-tick" x="206" y="200" textAnchor="end" dominantBaseline="middle">MoPE-LoRA</text>
        <rect className="dgm-amber-fill" x="220" y="176" width="190" height="48" rx="4" />
        <text className="dgm-tick" x="424" y="200" textAnchor="start" dominantBaseline="middle">10.43% WER</text>
      </svg>
    ),
    figureCaption: "Word error rate on L2-ARCTIC accented speech.",
  },

  "on-device-asr-distillation": {
    cover: (
      <svg className="dgm" viewBox="0 0 800 460" role="img" aria-label="A large Fast Conformer RNN-T teacher network distilling knowledge into a compact on-device student, cutting relative WER by 32.7 percent versus a same-size baseline">
        <text className="dgm-label" x="40" y="58" textAnchor="start">TEACHER · FAST CONFORMER RNN-T</text>
        <line className="dgm-line" x1="80" y1="120" x2="80" y2="200" />
        <line className="dgm-line" x1="80" y1="120" x2="160" y2="200" />
        <line className="dgm-line" x1="80" y1="120" x2="240" y2="200" />
        <line className="dgm-line" x1="160" y1="120" x2="80" y2="200" />
        <line className="dgm-line" x1="160" y1="120" x2="160" y2="200" />
        <line className="dgm-line" x1="160" y1="120" x2="240" y2="200" />
        <line className="dgm-line" x1="240" y1="120" x2="80" y2="200" />
        <line className="dgm-line" x1="240" y1="120" x2="160" y2="200" />
        <line className="dgm-line" x1="240" y1="120" x2="240" y2="200" />
        <line className="dgm-line" x1="320" y1="120" x2="160" y2="200" />
        <line className="dgm-line" x1="320" y1="120" x2="240" y2="200" />
        <line className="dgm-line" x1="320" y1="120" x2="320" y2="200" />
        <line className="dgm-line" x1="80" y1="200" x2="80" y2="280" />
        <line className="dgm-line" x1="80" y1="200" x2="160" y2="280" />
        <line className="dgm-line" x1="160" y1="200" x2="80" y2="280" />
        <line className="dgm-line" x1="160" y1="200" x2="160" y2="280" />
        <line className="dgm-line" x1="160" y1="200" x2="240" y2="280" />
        <line className="dgm-line" x1="240" y1="200" x2="160" y2="280" />
        <line className="dgm-line" x1="240" y1="200" x2="240" y2="280" />
        <line className="dgm-line" x1="240" y1="200" x2="320" y2="280" />
        <line className="dgm-line" x1="320" y1="200" x2="240" y2="280" />
        <line className="dgm-line" x1="320" y1="200" x2="320" y2="280" />
        <circle className="dgm-ink" cx="80" cy="120" r="10" />
        <circle className="dgm-ink" cx="160" cy="120" r="10" />
        <circle className="dgm-ink" cx="240" cy="120" r="10" />
        <circle className="dgm-ink" cx="320" cy="120" r="10" />
        <circle className="dgm-ink" cx="80" cy="200" r="10" />
        <circle className="dgm-ink" cx="160" cy="200" r="10" />
        <circle className="dgm-ink" cx="240" cy="200" r="10" />
        <circle className="dgm-ink" cx="320" cy="200" r="10" />
        <circle className="dgm-ink" cx="80" cy="280" r="10" />
        <circle className="dgm-ink" cx="160" cy="280" r="10" />
        <circle className="dgm-ink" cx="240" cy="280" r="10" />
        <circle className="dgm-ink" cx="320" cy="280" r="10" />
        <text className="dgm-label" x="404" y="186" textAnchor="middle">DISTILL</text>
        <line className="dgm-line" x1="372" y1="200" x2="476" y2="200" />
        <path className="dgm-ink-fill" d="M476 200 L462 192 L462 208 Z" />
        <rect className="dgm-ink" x="512" y="108" width="116" height="200" rx="18" ry="18" />
        <line className="dgm-line" x1="552" y1="124" x2="588" y2="124" />
        <circle className="dgm-ink" cx="544" cy="182" r="8" />
        <circle className="dgm-ink" cx="596" cy="182" r="8" />
        <circle className="dgm-ink" cx="544" cy="240" r="8" />
        <circle className="dgm-ink" cx="596" cy="240" r="8" />
        <line className="dgm-line" x1="544" y1="182" x2="596" y2="182" />
        <line className="dgm-line" x1="544" y1="182" x2="544" y2="240" />
        <line className="dgm-line" x1="544" y1="182" x2="596" y2="240" />
        <line className="dgm-line" x1="596" y1="182" x2="544" y2="240" />
        <line className="dgm-line" x1="596" y1="182" x2="596" y2="240" />
        <line className="dgm-line" x1="544" y1="240" x2="596" y2="240" />
        <text className="dgm-tick" x="570" y="294" textAnchor="middle">Student</text>
        <text className="dgm-num-accent" x="776" y="200" textAnchor="end">−32.7%</text>
        <text className="dgm-label" x="776" y="228" textAnchor="end">REL. WER VS</text>
        <text className="dgm-label" x="776" y="246" textAnchor="end">SAME-SIZE BASELINE</text>
      </svg>
    ),
    coverCaption: "A compact student inherits the teacher's accuracy at a fraction of the footprint, and runs locally on a phone.",
    figure: (
      <svg className="dgm" viewBox="0 0 760 300" role="img" aria-label="Horizontal two-bar comparison of relative word error rate: a longer from-scratch baseline bar above a shorter distilled student bar marked minus 32.7 percent">
        <text className="dgm-label" x="40" y="50" textAnchor="start">RELATIVE WER</text>
        <line className="dgm-line" x1="280" y1="84" x2="280" y2="244" />
        <rect className="dgm-soft-ink" x="280" y="96" width="420" height="48" />
        <rect className="dgm-line" x="280" y="96" width="420" height="48" />
        <text className="dgm-tick" x="268" y="120" textAnchor="end">From-scratch baseline</text>
        <text className="dgm-tick" x="690" y="120" textAnchor="end">0%</text>
        <rect className="dgm-amber-fill" x="280" y="184" width="283" height="48" />
        <text className="dgm-tick" x="268" y="208" textAnchor="end">Distilled student</text>
        <text className="dgm-tick" x="575" y="208" textAnchor="start">−32.7%</text>
      </svg>
    ),
    figureCaption: "Relative word error rate versus a same-size baseline trained from scratch.",
  },

  "browser-asr-onnx": {
    cover: (
      <svg className="dgm" viewBox="0 0 800 460" role="img" aria-label="A browser window running an in-page ASR pipeline from mic to waveform to ONNX to text, with a cloud struck through marked no server">
        <rect className="dgm-ink" x="48" y="70" width="500" height="320" rx="16" />
        <line className="dgm-line" x1="48" y1="112" x2="548" y2="112" />
        <circle className="dgm-ink-fill" cx="74" cy="91" r="5" />
        <circle className="dgm-ink-fill" cx="94" cy="91" r="5" />
        <circle className="dgm-ink-fill" cx="114" cy="91" r="5" />
        <rect className="dgm-soft-ink" x="78" y="150" width="440" height="180" rx="12" />
        <rect className="dgm-ink" x="96" y="206" width="22" height="44" rx="11" />
        <path className="dgm-ink" d="M88 244 a19 19 0 0 0 38 0" />
        <line className="dgm-ink" x1="107" y1="263" x2="107" y2="282" />
        <line className="dgm-ink" x1="95" y1="282" x2="119" y2="282" />
        <line className="dgm-ink" x1="162" y1="218" x2="162" y2="238" />
        <line className="dgm-ink" x1="178" y1="200" x2="178" y2="256" />
        <line className="dgm-ink" x1="194" y1="184" x2="194" y2="272" />
        <line className="dgm-ink" x1="210" y1="204" x2="210" y2="252" />
        <line className="dgm-ink" x1="226" y1="190" x2="226" y2="266" />
        <line className="dgm-ink" x1="242" y1="210" x2="242" y2="246" />
        <line className="dgm-ink" x1="258" y1="222" x2="258" y2="234" />
        <rect className="dgm-amber" x="300" y="204" width="96" height="48" rx="10" />
        <text className="dgm-label" x="348" y="234" textAnchor="middle" dominantBaseline="middle">ONNX</text>
        <line className="dgm-line" x1="430" y1="214" x2="496" y2="214" />
        <line className="dgm-line" x1="430" y1="228" x2="496" y2="228" />
        <line className="dgm-line" x1="430" y1="242" x2="472" y2="242" />
        <line className="dgm-line" x1="270" y1="228" x2="294" y2="228" />
        <path className="dgm-ink-fill" d="M294 228 l-9 -5 l0 10 z" />
        <path className="dgm-line" d="M624 196 a30 30 0 0 1 58 -10 a26 26 0 0 1 30 36 l-92 0 a24 24 0 0 1 4 -26 z" />
        <line className="dgm-ink" x1="636" y1="174" x2="704" y2="222" />
        <line className="dgm-ink" x1="704" y1="174" x2="636" y2="222" />
        <text className="dgm-label" x="668" y="262" textAnchor="middle">NO SERVER</text>
        <text className="dgm-label" x="48" y="426" textAnchor="start">ONNX RUNTIME WEB · WASM</text>
        <text className="dgm-label" x="548" y="426" textAnchor="end">STAYS IN THE TAB</text>
      </svg>
    ),
    coverCaption: "The model compiles to ONNX and runs on WebAssembly client-side — the audio never leaves the tab.",
    figure: (
      <svg className="dgm" viewBox="0 0 760 300" role="img" aria-label="A horizontal pipeline from mic to ONNX model to text, bracketed as staying in the browser">
        <rect className="dgm-ink" x="56" y="112" width="150" height="76" rx="12" />
        <text className="dgm-label" x="131" y="150" textAnchor="middle" dominantBaseline="middle">MIC</text>
        <rect className="dgm-soft" x="300" y="108" width="170" height="84" rx="12" />
        <rect className="dgm-amber" x="300" y="108" width="170" height="84" rx="12" />
        <text className="dgm-label" x="385" y="150" textAnchor="middle" dominantBaseline="middle">ONNX MODEL</text>
        <rect className="dgm-ink" x="564" y="112" width="150" height="76" rx="12" />
        <text className="dgm-label" x="639" y="150" textAnchor="middle" dominantBaseline="middle">TEXT</text>
        <line className="dgm-line" x1="214" y1="150" x2="288" y2="150" />
        <path className="dgm-ink-fill" d="M288 150 l-10 -6 l0 12 z" />
        <line className="dgm-line" x1="478" y1="150" x2="552" y2="150" />
        <path className="dgm-ink-fill" d="M552 150 l-10 -6 l0 12 z" />
        <path className="dgm-dash" d="M56 224 l0 16 l658 0 l0 -16" />
        <text className="dgm-label" x="385" y="256" textAnchor="middle">STAYS IN THE BROWSER</text>
      </svg>
    ),
    figureCaption: "The whole recognition path executes in-page; no network round-trip.",
  },

  "rag-chatbot-nepali-users": {
    cover: (
      <svg className="dgm" viewBox="0 0 800 460" role="img" aria-label="Nepali RAG health chatbot pipeline: query to retriever to vetted documents to LLM to answer, with an evaluation loop back to retrieval, serving 5,000+ users">
        <text className="dgm-label" x="56" y="58" textAnchor="start">PIPELINE</text>
        <rect className="dgm-ink" x="44" y="96" width="120" height="56" rx="28" ry="28" />
        <text className="dgm-tick" x="104" y="124" textAnchor="middle" dominantBaseline="middle">QUERY</text>
        <line className="dgm-line" x1="164" y1="124" x2="212" y2="124" />
        <path className="dgm-ink-fill" d="M214 124 L204 119 L204 129 Z" />
        <rect className="dgm-ink" x="216" y="96" width="124" height="56" rx="8" ry="8" />
        <text className="dgm-tick" x="278" y="124" textAnchor="middle" dominantBaseline="middle">RETRIEVER</text>
        <line className="dgm-line" x1="278" y1="152" x2="278" y2="204" />
        <path className="dgm-ink-fill" d="M278 206 L273 196 L283 196 Z" />
        <rect className="dgm-line" x="252" y="214" width="96" height="48" rx="4" ry="4" />
        <rect className="dgm-line" x="244" y="222" width="96" height="48" rx="4" ry="4" />
        <rect className="dgm-line" x="236" y="230" width="96" height="48" rx="4" ry="4" />
        <text className="dgm-tick" x="284" y="300" textAnchor="middle">Vetted docs</text>
        <line className="dgm-line" x1="340" y1="124" x2="388" y2="124" />
        <path className="dgm-ink-fill" d="M390 124 L380 119 L380 129 Z" />
        <rect className="dgm-ink" x="392" y="96" width="104" height="56" rx="8" ry="8" />
        <text className="dgm-tick" x="444" y="124" textAnchor="middle" dominantBaseline="middle">LLM</text>
        <line className="dgm-line" x1="496" y1="124" x2="544" y2="124" />
        <path className="dgm-ink-fill" d="M546 124 L536 119 L536 129 Z" />
        <rect className="dgm-soft" x="548" y="92" width="148" height="64" rx="10" ry="10" />
        <rect className="dgm-amber" x="548" y="92" width="148" height="64" rx="10" ry="10" />
        <text className="dgm-tick" x="622" y="124" textAnchor="middle" dominantBaseline="middle">ANSWER</text>
        <path className="dgm-dash" d="M548 124 C420 124 388 256 304 256 C300 256 296 256 292 256" />
        <path className="dgm-ink-fill" d="M278 256 L290 251 L290 261 Z" />
        <text className="dgm-label" x="430" y="232" textAnchor="middle">EVAL</text>
        <line className="dgm-line" x1="56" y1="356" x2="744" y2="356" />
        <text className="dgm-num-accent" x="744" y="410" textAnchor="end">5,000+</text>
        <text className="dgm-label" x="744" y="436" textAnchor="end">USERS SERVED</text>
      </svg>
    ),
    coverCaption: "Answers grounded in vetted material, with an evaluation loop closing back on retrieval.",
    figure: (
      <svg className="dgm" viewBox="0 0 760 300" role="img" aria-label="Evaluation loop as a gate chain: draft answer passes Correct, Safe and Appropriate gates before shipping, with failed gates revised back to the start">
        <text className="dgm-label" x="40" y="44" textAnchor="start">EVALUATION LOOP</text>
        <rect className="dgm-ink" x="32" y="118" width="120" height="64" rx="8" ry="8" />
        <text className="dgm-tick" x="92" y="143" textAnchor="middle" dominantBaseline="middle">DRAFT</text>
        <text className="dgm-tick" x="92" y="161" textAnchor="middle" dominantBaseline="middle">ANSWER</text>
        <line className="dgm-line" x1="152" y1="150" x2="188" y2="150" />
        <path className="dgm-ink-fill" d="M190 150 L180 145 L180 155 Z" />
        <path className="dgm-ink" d="M242 110 L284 150 L242 190 L200 150 Z" />
        <text className="dgm-tick" x="242" y="150" textAnchor="middle" dominantBaseline="middle">Correct</text>
        <line className="dgm-line" x1="284" y1="150" x2="320" y2="150" />
        <path className="dgm-ink-fill" d="M322 150 L312 145 L312 155 Z" />
        <path className="dgm-ink" d="M374 110 L416 150 L374 190 L332 150 Z" />
        <text className="dgm-tick" x="374" y="150" textAnchor="middle" dominantBaseline="middle">Safe</text>
        <line className="dgm-line" x1="416" y1="150" x2="452" y2="150" />
        <path className="dgm-ink-fill" d="M454 150 L444 145 L444 155 Z" />
        <path className="dgm-ink" d="M512 108 L558 150 L512 192 L466 150 Z" />
        <text className="dgm-tick" x="512" y="150" textAnchor="middle" dominantBaseline="middle">Appropriate</text>
        <line className="dgm-line" x1="558" y1="150" x2="594" y2="150" />
        <path className="dgm-ink-fill" d="M596 150 L586 145 L586 155 Z" />
        <rect className="dgm-soft" x="598" y="122" width="118" height="56" rx="8" ry="8" />
        <rect className="dgm-amber-fill" x="598" y="122" width="118" height="56" rx="8" ry="8" />
        <text className="dgm-tick" x="657" y="150" textAnchor="middle" dominantBaseline="middle">SHIP</text>
        <path className="dgm-dash" d="M512 192 C512 250 92 250 92 184" />
        <path className="dgm-ink-fill" d="M92 182 L87 192 L97 192 Z" />
        <text className="dgm-tick" x="300" y="244" textAnchor="middle">revise</text>
      </svg>
    ),
    figureCaption: "For high-stakes, low-resource deployments the evaluation harness is the product.",
  },

  "low-resource-nlp-data-problem": {
    cover: (
      <svg className="dgm" viewBox="0 0 800 460" role="img" aria-label="A stack of data layers — Corpus, Tokeniser, Transfer, Eval — feeds a tidy model that fits the language, beside one big faint empty model marked as more scale">
        <text className="dgm-label" x="400" y="40" textAnchor="middle">DATA &#8250; SCALE</text>
        <rect className="dgm-soft" x="70" y="96" width="240" height="56" rx="10" />
        <rect className="dgm-line" x="70" y="96" width="240" height="56" rx="10" />
        <text className="dgm-tick" x="190" y="124" textAnchor="middle" dominantBaseline="middle">Corpus</text>
        <rect className="dgm-soft" x="70" y="162" width="240" height="56" rx="10" />
        <rect className="dgm-line" x="70" y="162" width="240" height="56" rx="10" />
        <text className="dgm-tick" x="190" y="190" textAnchor="middle" dominantBaseline="middle">Tokeniser</text>
        <rect className="dgm-soft" x="70" y="228" width="240" height="56" rx="10" />
        <rect className="dgm-line" x="70" y="228" width="240" height="56" rx="10" />
        <text className="dgm-tick" x="190" y="256" textAnchor="middle" dominantBaseline="middle">Transfer</text>
        <rect className="dgm-soft" x="70" y="294" width="240" height="56" rx="10" />
        <rect className="dgm-line" x="70" y="294" width="240" height="56" rx="10" />
        <text className="dgm-tick" x="190" y="322" textAnchor="middle" dominantBaseline="middle">Eval</text>
        <line className="dgm-line" x1="316" y1="223" x2="392" y2="223" />
        <path className="dgm-ink-fill" d="M392 223 L382 218 L382 228 Z" />
        <rect className="dgm-amber" x="398" y="168" width="160" height="110" rx="12" />
        <rect className="dgm-amber-fill" x="416" y="190" width="124" height="10" rx="5" />
        <rect className="dgm-amber-fill" x="416" y="210" width="92" height="10" rx="5" />
        <rect className="dgm-amber-fill" x="416" y="230" width="110" height="10" rx="5" />
        <text className="dgm-tick" x="478" y="300" textAnchor="middle" dominantBaseline="middle">Fits the language</text>
        <rect className="dgm-line" x="606" y="120" width="148" height="220" rx="14" />
        <line className="dgm-line" x1="662" y1="206" x2="698" y2="254" />
        <line className="dgm-line" x1="698" y1="206" x2="662" y2="254" />
        <text className="dgm-tick" x="680" y="362" textAnchor="middle" dominantBaseline="middle">More scale</text>
      </svg>
    ),
    coverCaption: "Build for the language: cleaner corpora, fitting tokenisation, careful transfer, honest evaluation.",
    figure: (
      <svg className="dgm" viewBox="0 0 760 300" role="img" aria-label="Two bars comparing gain above a baseline: a short scale-only bar and a taller data-first bar">
        <text className="dgm-label" x="60" y="40" textAnchor="start">MOVING THE NUMBERS</text>
        <line className="dgm-line" x1="80" y1="240" x2="700" y2="240" />
        <rect className="dgm-soft-ink" x="220" y="196" width="130" height="44" />
        <rect className="dgm-line" x="220" y="196" width="130" height="44" />
        <text className="dgm-tick" x="285" y="270" textAnchor="middle" dominantBaseline="middle">Scale only</text>
        <rect className="dgm-amber-fill" x="470" y="96" width="130" height="144" />
        <text className="dgm-tick" x="535" y="270" textAnchor="middle" dominantBaseline="middle">Data-first</text>
      </svg>
    ),
    figureCaption: "Upstream data work moves the metrics where extra scale does not.",
  },

  "prototype-to-production-cto": {
    cover: (
      <svg className="dgm" viewBox="0 0 800 460" role="img" aria-label="A four-stage AI pipeline from notebook to users with a human-in-the-loop review branch and a 75 percent transcription cost cut">
        <text className="dgm-label" x="48" y="60" textAnchor="start">AI IN PRODUCTION</text>
        <rect className="dgm-ink" x="48" y="92" width="142" height="74" rx="12" />
        <text className="dgm-tick" x="119" y="129" textAnchor="middle" dominantBaseline="middle">NOTEBOOK</text>
        <line className="dgm-line" x1="190" y1="129" x2="222" y2="129" />
        <path className="dgm-ink-fill" d="M222 124 L232 129 L222 134 Z" />
        <rect className="dgm-ink" x="232" y="92" width="142" height="74" rx="12" />
        <text className="dgm-tick" x="303" y="129" textAnchor="middle" dominantBaseline="middle">PIPELINE</text>
        <line className="dgm-line" x1="374" y1="129" x2="406" y2="129" />
        <path className="dgm-ink-fill" d="M406 124 L416 129 L406 134 Z" />
        <rect className="dgm-ink" x="416" y="92" width="142" height="74" rx="12" />
        <text className="dgm-tick" x="487" y="129" textAnchor="middle" dominantBaseline="middle">MONITOR</text>
        <line className="dgm-line" x1="558" y1="129" x2="590" y2="129" />
        <path className="dgm-ink-fill" d="M590 124 L600 129 L590 134 Z" />
        <rect className="dgm-ink" x="600" y="92" width="152" height="74" rx="12" />
        <text className="dgm-tick" x="676" y="113" textAnchor="middle" dominantBaseline="middle">USERS</text>
        <circle className="dgm-ink-fill" cx="649" cy="138" r="3.5" />
        <circle className="dgm-ink-fill" cx="667" cy="138" r="3.5" />
        <circle className="dgm-ink-fill" cx="685" cy="138" r="3.5" />
        <circle className="dgm-ink-fill" cx="703" cy="138" r="3.5" />
        <circle className="dgm-ink-fill" cx="649" cy="153" r="3.5" />
        <circle className="dgm-ink-fill" cx="667" cy="153" r="3.5" />
        <circle className="dgm-ink-fill" cx="685" cy="153" r="3.5" />
        <circle className="dgm-ink-fill" cx="703" cy="153" r="3.5" />
        <line className="dgm-dash" x1="303" y1="270" x2="303" y2="166" />
        <path className="dgm-ink-fill" d="M298 176 L303 166 L308 176 Z" />
        <text className="dgm-tick" x="320" y="222" textAnchor="start">review when unsure</text>
        <rect className="dgm-soft-ink" x="232" y="270" width="166" height="70" rx="12" />
        <rect className="dgm-ink" x="232" y="270" width="166" height="70" rx="12" />
        <text className="dgm-tick" x="315" y="305" textAnchor="middle" dominantBaseline="middle">HUMAN + AI</text>
        <line className="dgm-line" x1="48" y1="392" x2="752" y2="392" />
        <text className="dgm-num-accent" x="752" y="426" textAnchor="end">−75%</text>
        <text className="dgm-label" x="752" y="446" textAnchor="end">TRANSCRIPTION COST</text>
      </svg>
    ),
    coverCaption: "The product is everything around the model that makes it dependable — including knowing when to ask a person.",
    figure: (
      <svg className="dgm" viewBox="0 0 760 300" role="img" aria-label="A human-in-the-loop transcription flow where an AI draft passes a confidence gate, sending confident cases straight to output and uncertain ones to human review">
        <text className="dgm-label" x="40" y="40" textAnchor="start">HUMAN-IN-THE-LOOP · −75% COST</text>
        <rect className="dgm-ink" x="40" y="96" width="136" height="64" rx="12" />
        <text className="dgm-tick" x="108" y="129" textAnchor="middle" dominantBaseline="middle">AI DRAFT</text>
        <line className="dgm-line" x1="176" y1="128" x2="214" y2="128" />
        <path className="dgm-ink-fill" d="M214 123 L224 128 L214 133 Z" />
        <path className="dgm-ink" d="M300 84 L356 128 L300 172 L244 128 Z" />
        <text className="dgm-tick" x="300" y="128" textAnchor="middle" dominantBaseline="middle">confident?</text>
        <line className="dgm-line" x1="356" y1="128" x2="566" y2="128" />
        <path className="dgm-ink-fill" d="M566 123 L576 128 L566 133 Z" />
        <text className="dgm-tick" x="455" y="116" textAnchor="middle">yes</text>
        <line className="dgm-line" x1="300" y1="172" x2="300" y2="232" />
        <path className="dgm-ink-fill" d="M295 222 L300 232 L305 222 Z" />
        <text className="dgm-tick" x="316" y="206" textAnchor="start">no</text>
        <rect className="dgm-ink" x="218" y="232" width="164" height="48" rx="12" />
        <text className="dgm-tick" x="300" y="257" textAnchor="middle" dominantBaseline="middle">HUMAN REVIEW</text>
        <line className="dgm-line" x1="382" y1="256" x2="620" y2="256" />
        <line className="dgm-line" x1="620" y1="256" x2="620" y2="160" />
        <path className="dgm-ink-fill" d="M615 170 L620 160 L625 170 Z" />
        <rect className="dgm-amber-fill" x="576" y="96" width="144" height="64" rx="12" />
        <text className="dgm-tick" x="648" y="129" textAnchor="middle" dominantBaseline="middle">OUTPUT</text>
      </svg>
    ),
    figureCaption: "A human + AI transcription platform cut cost 75% by escalating only the uncertain cases.",
  },
};

export function getArt(slug: string): BlogArt | undefined {
  return blogArt[slug];
}
