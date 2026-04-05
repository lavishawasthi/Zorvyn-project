export default function AuditLog({ logs }) {
  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div key={log.id} className="p-4 bg-gray-900/30 border border-gray-800 rounded-xl">
          <div className="flex justify-between items-start mb-1">
            <p className="text-sm font-medium text-white">{log.action}</p>
            <span className="text-[10px] font-mono text-gray-500">{log.date}</span>
          </div>
          <p className="text-xs text-gray-500">Performed by: <span className="text-primary/80">{log.user}</span></p>
        </div>
      ))}
    </div>
  );
}