export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="m-16 p-16 border-4 rounded-3xl border-slate-700">
      <h2 className="text-4xl font-bold">Transaction history</h2>
      {children}
    </div>
  );
}
