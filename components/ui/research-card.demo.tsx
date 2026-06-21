// Demo for ResearchCard — the MoPE-LoRA paper in the Amber Dusk glass theme.

import ResearchCard from "@/components/ui/research-card";

const DemoOne = () => {
  return (
    <div style={{ maxWidth: 420, padding: 24, background: "var(--bg)" }}>
      <ResearchCard
        category="Speech"
        title="MoPE-LoRA — Mixture of Phonetic Experts for Accented ASR"
        description="A PEFT framework routing Conformer encoder frames to six manner-of-articulation LoRA experts, sharpening recognition on accented L2 speech."
        tags={["LoRA/PEFT", "Conformer", "Phonetics"]}
      />
    </div>
  );
};

export { DemoOne };
