export default function Price({
  amount,
  currencyCode,
  className,
  currencyCodeClassName,
}: {
  amount: string;
  currencyCode: string;
  className?: string;
  currencyCodeClassName?: string;
}) {
  const value = Number(amount);

  const formatted = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
  }).format(value);

  return (
    <p suppressHydrationWarning className={className}>
      {formatted}
    </p>
  );
}
