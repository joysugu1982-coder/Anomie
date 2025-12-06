import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
  textOnly = false,
}: {
  className?: string;
  quantity?: number;
  textOnly?: boolean;
}) {
  // DESKTOP TEXT MODE
  if (textOnly) {
    return (
      <div className="relative flex items-center justify-center">
        <span className="text-sm">Cart</span>

        {quantity ? (
          <span className="ml-1 text-xs bg-blue-600 text-white rounded-full px-1.5">
            {quantity}
          </span>
        ) : null}
      </div>
    );
  }

  // MOBILE ICON MODE
  return (
    <div className="relative flex h-11 w-11 items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={clsx("h-6 w-6", className)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l3 12h10l3-8H7"
        />
      </svg>

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-1 -mt-1 h-4 w-4 rounded-full bg-blue-600 text-[10px] text-white flex items-center justify-center">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
