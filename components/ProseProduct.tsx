import clsx from "clsx";

export default function ProseProduct({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={clsx(
        `
        prose mx-auto max-w-6xl 
        text-black leading-relaxed

        prose-p:text-neutral-700
        prose-strong:text-black

        prose-li:text-neutral-700
        prose-ul:text-neutral-700
        prose-ol:text-neutral-700

        prose-a:text-black 
        prose-a:underline hover:prose-a:text-neutral-600

        prose-h1:text-black prose-h1:text-3xl
        prose-h2:text-black prose-h2:text-2xl
        prose-h3:text-black prose-h3:text-xl
        prose-h4:text-black prose-h4:text-lg
        prose-h5:text-black prose-h5:text-base
        prose-h6:text-black prose-h6:text-sm
        `,
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
