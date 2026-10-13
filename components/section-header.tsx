import React from "react";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string;
  center?: boolean;
};

export default function SectionHeader({ eyebrow, title, accent, center = true }: Props) {
  return (
    <div className={`mb-14 ${center ? "text-center" : ""}`}>
      <span className="inline-block rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
        {accent && (
          <>
            <br className="hidden sm:block" />{" "}
            <span className="text-grad">{accent}</span>
          </>
        )}
      </h2>
    </div>
  );
}
