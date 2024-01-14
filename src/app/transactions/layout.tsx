export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 md:m-16 md:p-16 md:border-4 md:rounded-3xl border-slate-700">
      <h2 className="text-4xl font-bold">Transaction history</h2>
      {children}
    </div>
  );
}
