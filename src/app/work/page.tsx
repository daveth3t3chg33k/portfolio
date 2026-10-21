import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ProjectsSection from "@/components/sections/ProjectsSection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The full archive: LoyalMini, Rack cloud POS, AI task manager, NFT marketplace, e-commerce, predictive analytics and this portfolio — the problem, the trade-off, the build.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        index="01"
        label="Work"
        title={
          <>
            Every project, <em className="italic-signal">earned</em>
          </>
        }
        lede="The real story of each build — the problem, the decision, what shipped, and a plate captured from the product itself."
        meta={[
          { k: "Projects", v: "07" },
          { k: "In production", v: "02" },
          { k: "Startups", v: "01" },
          { k: "Since", v: "2025" },
        ]}
        action={{ label: "Get in touch", href: "/contact" }}
      />
      <ProjectsSection />
    </>
  );
}
