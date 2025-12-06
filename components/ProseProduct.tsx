import clsx from "clsx";

export default function ProseProduct({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={clsx(
        `
        prose mx-auto max-w-6xl 
        text-black leading-7

        prose-p:text-white
        prose-strong:text-white

        prose-li:text-white
        prose-ul:text-white
        prose-ol:text-white

        prose-a:text-white 
        prose-a:underline hover:prose-a:text-neutral-300

        prose-h1:text-white prose-h1:text-5xl
        prose-h2:text-white prose-h2:text-4xl
        prose-h3:text-white prose-h3:text-3xl
        prose-h4:text-white prose-h4:text-2xl
        prose-h5:text-white prose-h5:text-xl
        prose-h6:text-white prose-h6:text-lg
        `,
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
