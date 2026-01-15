import { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCandidates, supportCandidate } from "../store/candidatesSlice.js"
import { fetchOpinion } from "../store/opinionSlice.js"
import CandidateCard from "../components/CandidateCard.jsx"
import DonutOpinion from "../components/DonutOpinion.jsx"
import AuthModal from "../components/auth/AuthModal.jsx"

export default function RankLeadersPage() {
  const dispatch = useDispatch()
  const candidates = useSelector((s) => s.candidates.items || [])
  const opinion = useSelector((s) => s.opinion)
  const authUser = useSelector((s) => s.auth.user)

  const [authOpen, setAuthOpen] = useState(false)
  const [pendingId, setPendingId] = useState(null)
  const inFlight = useRef(false)

  useEffect(() => {
    dispatch(fetchCandidates())
    dispatch(fetchOpinion())
  }, [dispatch])

async function onSupport(candidateId) {
  setPendingId(candidateId)
  const res = await dispatch(supportCandidate(candidateId))
  setPendingId(null)
  if (res.meta.requestStatus === "rejected") {
    if (res.payload === "LOGIN_REQUIRED") setAuthOpen(true)
    return
  }
  dispatch(fetchCandidates())
  dispatch(fetchOpinion())
}


  const statusPill = useMemo(() => {
    if (authUser) return { text: "Logged in", cls: "bg-green-50 text-green-700 border-green-200" }
    return { text: "Login required to vote", cls: "bg-red-50 text-red-700 border-red-200" }
  }, [authUser])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-2xl font-bold text-slate-900">Rank the Prime Minister Candidates</div>
          <div className="mt-2 text-slate-700">This is awareness + public opinion. Not official results.</div>
        </div>
        <div className={`rounded-full border px-3 py-1 text-sm font-semibold ${statusPill.cls}`}>{statusPill.text}</div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <DonutOpinion items={opinion.items} total={opinion.total} />
        <div className="rounded-2xl border border-white/40 bg-white/35 backdrop-blur-md p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">How ranking works</div>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <div>1. Log in</div>
            <div>2. Click Support</div>
            <div>3. Counts + chart update</div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {candidates.map((c) => (
          <CandidateCard
            key={c.id}
            candidate={c}
            onSupport={onSupport}
            onRequireLogin={() => setAuthOpen(true)}
            pending={pendingId === c.id}
          />
        ))}
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  )
}
