export type BlogPost = {
  slug: string;
  title: string;
  /** Short readme-style category label, shown left of the title. */
  category: string;
  excerpt: string;
  /** ISO date for <time dateTime>. */
  date: string;
  /** Human label, e.g. "May 2026". */
  dateLabel: string;
  readingTime: string;
  tags: string[];
  /** Body paragraphs, rendered in order. */
  body: string[];
};

/* Newest first. Grounded in Santosh's actual research — no placeholder content. */
export const posts: BlogPost[] = [
  {
    slug: "accent-last-mile-asr",
    title: "Accent is the last mile of speech recognition",
    category: "Speech & ASR",
    excerpt:
      "Why mainstream ASR still fails accented speakers — and how a mixture of phonetic experts narrows the gap to 10.43% WER on L2 speech.",
    date: "2026-05-18",
    dateLabel: "May 2026",
    readingTime: "8 min read",
    tags: ["ASR", "LoRA/PEFT", "Phonetics"],
    body: [
      "Most speech recognition is trained on speakers who already sound like the training data. Step outside that distribution — an L2 accent, a regional dialect, a low-resource language — and word error rates climb fast. For the people most underserved by technology, accent is where ASR quietly breaks.",
      "MoPE-LoRA treats accent as a routing problem. Instead of fine-tuning one monolithic adapter, it routes Conformer encoder frames to six LoRA experts, each specialised by manner of articulation. The model learns which phonetic expert to trust frame by frame, sharpening recognition exactly where generic models smear sounds together.",
      "On L2-ARCTIC the approach reaches 10.43% WER while touching only a small fraction of parameters. The lesson generalises: when a population is underrepresented, the fix is rarely more scale — it is structure that respects how those speakers actually sound.",
    ],
  },
  {
    slug: "on-device-asr-distillation",
    title: "Distilling an ASR model small enough to live on a phone",
    category: "Speech & ASR",
    excerpt:
      "Knowledge distillation from a Fast Conformer RNN-T teacher — keeping accuracy while shrinking enough to run locally, with no server and no connectivity.",
    date: "2026-03-02",
    dateLabel: "March 2026",
    readingTime: "11 min read",
    tags: ["RNN-T", "Distillation", "On-device"],
    body: [
      "Cloud ASR assumes two things many users don't have: reliable connectivity and a willingness to send their voice to someone else's server. On-device recognition removes both assumptions — but only if the model is small and fast enough to run on commodity hardware.",
      "The recipe is knowledge distillation. A large Fast Conformer RNN-T teacher supervises a compact student, transferring not just hard labels but the teacher's soft predictions. The student inherits most of the accuracy at a fraction of the footprint.",
      "The result trims relative WER by 32.7% against a from-scratch baseline of the same size, and runs locally. Privacy and access stop being a trade-off against quality.",
    ],
  },
  {
    slug: "browser-asr-onnx",
    title: "Speech recognition with zero servers, in the browser",
    category: "Speech & ASR",
    excerpt:
      "A full ASR pipeline in JavaScript on ONNX Runtime Web — recognition with no round-trip, no infrastructure, and no cost.",
    date: "2026-02-10",
    dateLabel: "February 2026",
    readingTime: "6 min read",
    tags: ["ONNX Runtime Web", "WASM", "Edge"],
    body: [
      "The cheapest server is no server. If a model can run in the user's browser, you delete an entire class of infrastructure — along with the latency, cost, and privacy concerns that come with it.",
      "Running ASR client-side means compiling the model to ONNX and executing it on ONNX Runtime Web over WebAssembly. The audio never leaves the tab; recognition happens between keystrokes.",
      "It won't beat a datacenter GPU on the largest models, but for many real tasks the browser is enough — and “enough, everywhere, for free” beats “excellent, sometimes, for a fee.”",
    ],
  },
  {
    slug: "rag-chatbot-nepali-users",
    title: "Building a RAG chatbot for 5,000 Nepali users",
    category: "Language & NLP",
    excerpt:
      "Lessons from deploying a retrieval-augmented health chatbot for real users in a low-resource language — where evaluation matters more than the model.",
    date: "2025-12-05",
    dateLabel: "December 2025",
    readingTime: "9 min read",
    tags: ["RAG", "LLM eval", "Nepali"],
    body: [
      "Shipping an LLM to thousands of real users in Nepali is a different problem from a benchmark. The questions are sensitive — sexual and reproductive mental health — and a confident wrong answer is worse than no answer at all.",
      "Retrieval-augmented generation grounds responses in vetted material, but the hard part is evaluation: deciding, in a low-resource language, whether an answer is correct, safe, and culturally appropriate. That eval loop, not the base model, was where most of the work went.",
      "Deployed under a Gates Foundation–funded project, the system served 5,000+ users. The takeaway: for high-stakes, low-resource deployments, your evaluation harness is the product.",
    ],
  },
  {
    slug: "low-resource-nlp-data-problem",
    title: "Low-resource NLP is a data problem before a model problem",
    category: "Language & NLP",
    excerpt:
      "Reaching for a bigger model is the wrong first move when the language itself is underrepresented. Start with the data.",
    date: "2025-10-14",
    dateLabel: "October 2025",
    readingTime: "7 min read",
    tags: ["NLP", "Low-resource", "Data"],
    body: [
      "Every few months a larger model lands and the temptation is to throw it at whatever isn't working. For low-resource languages that instinct usually disappoints — the model has barely seen the language, and scale doesn't conjure data that was never there.",
      "The leverage is upstream: cleaner corpora, tokenisation that fits the script, careful transfer from related languages, and evaluation sets that reflect how people actually speak. These are unglamorous, and they move the numbers.",
      "Build for the language, not around it. The communities that need NLP most are exactly the ones a data-first approach serves best.",
    ],
  },
  {
    slug: "prototype-to-production-cto",
    title: "From research prototype to production: lessons as a CTO",
    category: "Engineering",
    excerpt:
      "Carrying AI from a notebook to a system real users depend on — what changes, what breaks, and what a small team should optimise for.",
    date: "2025-08-20",
    dateLabel: "August 2025",
    readingTime: "10 min read",
    tags: ["Leadership", "MLOps", "Production"],
    body: [
      "A prototype answers “can this work?” Production answers “will this keep working, for everyone, at 2am, when I'm asleep?” The gap between those two questions is where most AI projects stall.",
      "Leading engineering at Diyo.ai, the wins came from boring discipline: tight feedback loops, monitoring that catches drift before users do, and ruthless scoping so a team of five could ship. A human-in-the-loop transcription platform cut costs 75% — not because the model was perfect, but because the system around it was honest about when to ask a person.",
      "Optimise for the system, not the model. The model is a component; the product is everything that makes it dependable.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
