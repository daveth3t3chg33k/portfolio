import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { projects, type ProjectStatus } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The full archive — LoyalMini, Rack cloud POS, Peer-Play, Conduit, KagoRoute, VektorFleet, Flotilla, Chat Server, this portfolio and the earlier product builds: the problem, the trade-off, the build.",
};

const count = (status: ProjectStatus) =>
  String(projects.filter((p) => p.status === status).length).padStart(2, "0");

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
          { k: "Projects", v: String(projects.length).padStart(2, "0") },
          { k: "Open source", v: count("repo") },
          { k: "In production", v: count("live") },
          { k: "Startups", v: count("startup") },
        ]}
        action={{ label: "Get in touch", href: "/contact" }}
      />
      <ProjectsSection />
    </>
  );
}
