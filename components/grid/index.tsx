import clsx from "clsx";

export default function Grid(props: React.ComponentProps<"ul">) {
  return (
    <ul
      {...props}
      className={clsx("grid grid-flow-row gap-3 sm:gap-4", props.className)}
    >
      {props.children}
    </ul>
  );
}

function GridItem(props: React.ComponentProps<"li">) {
  return (
    <li
      {...props}
      className={clsx("aspect-[3/4] sm:aspect-square transition-opacity", props.className)}
    >
      {props.children}
    </li>
  );
}

Grid.Item = GridItem;