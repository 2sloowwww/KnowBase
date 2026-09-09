"use client";

import { useRouter } from "next/navigation";

export function RandomCaseButton({ slugs }: { slugs: string[] }) {
  const router = useRouter();

  function goRandom() {
    const slug = slugs[Math.floor(Math.random() * slugs.length)];
    router.push(`/investigations/${slug}`);
  }

  return (
    <button
      type="button"
      onClick={goRandom}
      className="rounded-full border border-canvas-line px-6 py-3 font-medium text-ink-dim hover:border-accent hover:text-accent transition-colors"
    >
      🎲 Surprise me
    </button>
  );
}
