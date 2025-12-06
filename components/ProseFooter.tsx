import clsx from "clsx";

export default function ProseFooter({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={clsx(
        `
        prose mx-auto max-w-6xl 
        text-black leading-7

        prose-p:text-black
        prose-strong:text-black

        prose-li:text-black
        prose-ul:text-black
        prose-ol:text-black

        prose-a:text-black 
        prose-a:underline hover:prose-a:text-neutral-400

        prose-h1:text-black prose-h1:text-5xl
        prose-h2:text-black prose-h2:text-4xl
        prose-h3:text-black prose-h3:text-3xl
        prose-h4:text-black prose-h4:text-2xl
        prose-h5:text-black prose-h5:text-xl
        prose-h6:text-black prose-h6:text-lg
        `,
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
