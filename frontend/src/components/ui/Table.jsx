export default function Table({ headers, children }) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-800 bg-surface">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-800 bg-gray-900/50">
            {headers.map((header, i) => (
              <th key={i} className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {children}
        </tbody>
      </table>
    </div>
  );
}