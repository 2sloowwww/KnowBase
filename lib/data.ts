import fs from "node:fs";
import path from "node:path";
import { Investigation, InvestigationSchema } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "investigations");

let cache: Investigation[] | null = null;

export function getAllInvestigations(): Investigation[] {
  if (cache) return cache;

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".json"));

  const investigations = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const json = JSON.parse(raw);
    const result = InvestigationSchema.safeParse(json);
    if (!result.success) {
      throw new Error(
        `Invalid investigation data in ${file}: ${result.error.message}`
      );
    }
    return result.data;
  });

  investigations.sort((a, b) => a.severityRank - b.severityRank);

  cache = investigations;
  return investigations;
}

export function getInvestigationBySlug(slug: string): Investigation | undefined {
  return getAllInvestigations().find((i) => i.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllInvestigations().map((i) => i.slug);
}

export function getRelatedInvestigations(
  current: Investigation,
  limit = 3
): Investigation[] {
  return getAllInvestigations()
    .filter((i) => i.slug !== current.slug && i.category === current.category)
    .slice(0, limit)
    .concat(
      getAllInvestigations()
        .filter((i) => i.slug !== current.slug && i.category !== current.category)
        .slice(0, limit)
    )
    .slice(0, limit);
}
