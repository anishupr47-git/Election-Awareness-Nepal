export default function CandidateCard({ candidate, onSupport, onRequireLogin, pending }) {
  const imgSrc = candidate?.image_path ? `/assets/${candidate.image_path}` : "";

  function clickSupport() {
    if (pending) return;
    if (typeof onSupport === "function") onSupport(candidate.id);
    else if (typeof onRequireLogin === "function") onRequireLogin();
  }

  return (
    <div className="rounded-2xl border border-white/40 bg-white/20 backdrop-blur p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 overflow-hidden rounded-full bg-white/30 border border-white/40">
          {imgSrc ? (
            <img src={imgSrc} alt={candidate.display_name} className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div>
          <div className="font-semibold text-slate-900">{candidate.display_name}</div>
          <div className="text-sm text-slate-700">Supports: {candidate.support_count ?? 0}</div>
        </div>
      </div>

      <button
        type="button"
        onClick={clickSupport}
        disabled={pending}
        className="mt-4 w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
      >
        {pending ? "Submitting..." : "Support"}
      </button>
    </div>
  );
}
