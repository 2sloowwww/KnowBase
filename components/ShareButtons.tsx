"use client";

import { useState } from "react";

export function ShareButtons({
  url,
  title,
  stat,
}: {
  url: string;
  title: string;
  stat: string;
}) {
  const [copied, setCopied] = useState(false);

  const shareText = `${title} — ${stat}`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(url)}`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${url}`)}`;

  async function handleCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — silently no-op
    }
  }

  const buttonClass =
    "inline-flex items-center gap-2 rounded-full border border-canvas-line px-4 py-2 text-sm text-ink-dim hover:border-accent hover:text-accent transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={xUrl} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        Share on X
      </a>
      <a href={waUrl} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        Share on WhatsApp
      </a>
      <button
        type="button"
        onClick={() => handleCopy(`${shareText}\n${url}`)}
        className={buttonClass}
      >
        Copy caption for Instagram
      </button>
      <button type="button" onClick={() => handleCopy(url)} className={buttonClass}>
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
