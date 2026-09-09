import { getAllInvestigations } from "@/lib/data";

const SITE_URL = "https://knowbase.xyz";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const cases = [...getAllInvestigations()]
    .sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1))
    .slice(0, 50);

  const items = cases
    .map((inv) => {
      const url = `${SITE_URL}/investigations/${inv.slug}`;
      const pubDate = new Date(inv.publishedDate).toUTCString();
      return `    <item>
      <title>${escapeXml(inv.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(inv.category)}</category>
      <description>${escapeXml(inv.dek)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>KNOWBASE — India's biggest frauds, ranked and sourced.</title>
    <link>${SITE_URL}</link>
    <description>A sourced record of India's largest financial frauds and governance failures.</description>
    <language>en-in</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
