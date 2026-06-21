// Demos for ShaderBackground.
// The component is container-scoped (fills its nearest positioned parent),
// so each demo provides a sized, relatively-positioned wrapper.

import ShaderBackground from "@/components/ui/shader-background";

// Drop-in band, the way the CTA section uses it.
const DemoOne = () => {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 420,
        borderRadius: 12,
      }}
    >
      <ShaderBackground />
    </div>
  );
};

export { DemoOne };
