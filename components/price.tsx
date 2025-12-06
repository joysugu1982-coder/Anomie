export default function Price({
  amount,
  currencyCode,
  className,
}: {
  amount: string;
  currencyCode: string;
  className?: string;
}) {
  const value = Number(amount);

  return (
    <p suppressHydrationWarning className={className}>
      {new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
      }).format(value)}
    </p>
  );
}
