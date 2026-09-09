import { getAllInvestigations } from "./data";
import { Status } from "./types";

export interface PersonAppearance {
  caseSlug: string;
  caseTitle: string;
  role: string;
  outcome: string;
  caseStatus: Status;
}

export interface Person {
  slug: string;
  name: string;
  appearances: PersonAppearance[];
  totalCases: number;
  convictedCount: number;
}

export function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

let cache: Person[] | null = null;

/** Groups every named `legalStatus.keyIndividuals` entry across all cases by exact name match. */
export function getAllPeople(): Person[] {
  if (cache) return cache;

  const all = getAllInvestigations();
  const map = new Map<string, Person>();

  for (const inv of all) {
    const individuals = inv.legalStatus?.keyIndividuals ?? [];
    for (const person of individuals) {
      const slug = slugifyName(person.name);
      if (!slug) continue;
      if (!map.has(slug)) {
        map.set(slug, { slug, name: person.name, appearances: [], totalCases: 0, convictedCount: 0 });
      }
      map.get(slug)!.appearances.push({
        caseSlug: inv.slug,
        caseTitle: inv.title,
        role: person.role,
        outcome: person.outcome,
        caseStatus: inv.status,
      });
    }
  }

  const people = Array.from(map.values());
  for (const person of people) {
    person.totalCases = person.appearances.length;
    person.convictedCount = person.appearances.filter((a) => a.caseStatus === "convicted").length;
  }
  people.sort((a, b) => b.totalCases - a.totalCases || a.name.localeCompare(b.name));

  cache = people;
  return people;
}

/** People named in 2 or more distinct cases — the "repeat offenders" set. */
export function getRepeatOffenders(): Person[] {
  return getAllPeople().filter((p) => p.totalCases >= 2);
}

export function getPersonBySlug(slug: string): Person | undefined {
  return getAllPeople().find((p) => p.slug === slug);
}
