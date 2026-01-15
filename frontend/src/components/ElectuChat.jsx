import { useState } from "react"
import { useUi } from "../ui/UiContext.jsx"
import api from "../utils/api.js"

export default function ElectuChat() {
  const { chatOpen, openChat, closeChat } = useUi()
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([
    { from: "bot", text: "Hello! I’m ELECTU. Ask me about elections, voting, or how this website works." },
  ])

  const send = async () => {
    const text = msg.trim()
    if (!text || loading) return
    setMsg("")
    setLoading(true)
    setHistory((h) => [...h, { from: "user", text }])
    try {
      const res = await api.post("/chat/", { message: text })
      const reply = res?.data?.reply || "Sorry, I couldn’t generate a response right now."
      setHistory((h) => [...h, { from: "bot", text: reply }])
    } catch {
      setHistory((h) => [...h, { from: "bot", text: "AI is temporarily unavailable. Please try again." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openChat}
        className="fixed bottom-6 right-6 z-40 rounded-full px-5 py-4 bg-slate-900 text-white font-semibold shadow-lg hover:bg-slate-800 transition"
      >
        ELECTU
      </button>

      <div className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[92vw] ${chatOpen ? "" : "pointer-events-none opacity-0 translate-y-2"} transition`}>
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 flex items-center justify-between bg-slate-900 text-white">
            <div className="font-semibold">ELECTU</div>
            <button type="button" onClick={closeChat} className="w-9 h-9 rounded-md hover:bg-white/10 transition">
              ✕
            </button>
          </div>

          <div className="p-3 h-56 overflow-auto space-y-2 bg-slate-50/70">
            {history.map((m, i) => (
              <div key={i} className={`text-sm ${m.from === "user" ? "text-right" : "text-left"}`}>
                <span
                  className={`inline-block px-3 py-2 rounded-xl ${
                    m.from === "user" ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-800"
                  }`}
                >
                  {m.text}
                </span>
              </div>
            ))}
            {loading ? (
              <div className="text-sm text-slate-600">ELECTU is typing...</div>
            ) : null}
          </div>

          <div className="p-3 flex gap-2 border-t border-slate-200 bg-white/80">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send()
              }}
              className="flex-1 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Type a message..."
            />
            <button
              type="button"
              onClick={send}
              disabled={loading}
              className="px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
