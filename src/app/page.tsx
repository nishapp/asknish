"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), question: question.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
        return;
      }
      setStatus("success");
      setQuestion("");
    } catch {
      setErrorMsg("Network error");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="relative w-full aspect-[1.1] max-w-[280px] mb-6">
          <Image
            src="/nish-hero.png"
            alt="Nish's Question"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-2xl font-semibold text-center text-[var(--text)] mb-1 tracking-tight">
          Ask Nish
        </h1>
        <p className="text-[var(--text-secondary)] text-center text-[15px] mb-8">
          Ask any question. You’ll get an answer.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full bg-[var(--surface)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow)] border border-[var(--border)]/60"
        >
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full h-11 px-3 rounded-[var(--radius)] border border-[var(--border)] bg-white text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent mb-4 text-[15px]"
          />
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
            Your question
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            required
            rows={4}
            className="w-full px-3 py-2.5 rounded-[var(--radius)] border border-[var(--border)] bg-white text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent resize-none text-[15px] mb-4"
          />
          {status === "error" && (
            <p className="text-red-600 text-sm mb-3">{errorMsg}</p>
          )}
          {status === "success" && (
            <p className="text-green-600 text-sm mb-3">Question sent. Ask another below.</p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full h-11 rounded-[var(--radius)] bg-[var(--accent)] text-white font-medium text-[15px] hover:bg-[var(--accent-hover)] active:scale-[0.98] transition disabled:opacity-60 disabled:pointer-events-none"
          >
            {status === "loading" ? "Sending…" : "Submit question"}
          </button>
        </form>

        <p className="mt-6 text-[13px] text-[var(--text-secondary)] text-center">
          Your email is only used to send your question and for replies.
        </p>
      </div>
    </main>
  );
}
