import { describe, expect, it } from "vitest";
import { PROJECTS } from "@/data/projects";

describe("projects data integrity", () => {
  it("has at least the four featured projects", () => {
    expect(PROJECTS.length).toBeGreaterThanOrEqual(4);
  });

  it("features Valunds ServiceBok and SkogsKvitto first", () => {
    expect(PROJECTS[0]?.title).toContain("SERVICEBOK");
    expect(PROJECTS[1]?.title).toBe("SKOGSKVITTO");
  });

  it("every live link is https and every project has real copy", () => {
    for (const p of PROJECTS) {
      expect(p.title.length).toBeGreaterThan(2);
      expect(p.description.length).toBeGreaterThan(40);
      expect(p.tech.length).toBeGreaterThan(0);
      if (p.links.demo) {
        expect(p.links.demo.startsWith("https://")).toBe(true);
      }
    }
  });

  it("has unique ids", () => {
    const ids = PROJECTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
