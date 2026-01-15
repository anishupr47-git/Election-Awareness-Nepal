export default function Modal({ open, title, children, onClose, actions }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="font-semibold">{title}</div>
          <button onClick={onClose} className="w-9 h-9 rounded-md hover:bg-slate-100 transition">✕</button>
        </div>
        <div className="p-4">{children}</div>
        <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-end gap-2">
          {actions}
        </div>
      </div>
    </div>
  );
}
