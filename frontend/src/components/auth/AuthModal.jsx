import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, register, fetchMe } from "../../store/authSlice.js"

export default function AuthModal({ open, onClose }) {
  const dispatch = useDispatch()
  const auth = useSelector((s) => s.auth)

  const [mode, setMode] = useState("login")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [localError, setLocalError] = useState(null)

  const title = useMemo(() => (mode === "login" ? "Login" : "Sign Up"), [mode])

  useEffect(() => {
    if (!open) return
    setLocalError(null)
    setPassword("")
  }, [open, mode])

  if (!open) return null

  async function submit(e) {
    e.preventDefault()
    e.stopPropagation()
    setLocalError(null)

    const u = username.trim()
    const p = password.trim()
    const em = email.trim()

    if (!u || !p) {
      setLocalError("Username and password are required")
      return
    }

    try {
      if (mode === "login") {
        await dispatch(login({ username: u, password: p })).unwrap()
      } else {
        await dispatch(register({ username: u, password: p, email: em || "" })).unwrap()
        await dispatch(login({ username: u, password: p })).unwrap()
      }

      await dispatch(fetchMe()).unwrap().catch(() => {})
      if (onClose) onClose()
    } catch (err) {
      setLocalError(typeof err === "string" ? err : "Auth failed")
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={() => onClose && onClose()}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-slate-900">{title}</div>
          <button
            type="button"
            className="rounded-md px-2 py-1 text-slate-700 hover:bg-slate-100"
            onClick={() => onClose && onClose()}
          >
            ✕
          </button>
        </div>

        <form className="mt-4 space-y-3" onSubmit={submit}>
          <div>
            <div className="text-sm font-semibold text-slate-800">Username</div>
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          {mode === "register" ? (
            <div>
              <div className="text-sm font-semibold text-slate-800">Email (optional)</div>
              <input
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          ) : null}

          <div>
            <div className="text-sm font-semibold text-slate-800">Password</div>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>

          {(localError || auth.error) ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {localError || auth.error}
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            disabled={auth.loading}
          >
            {auth.loading ? "Please wait..." : title}
          </button>

          <div className="flex items-center justify-between pt-1 text-sm">
            {mode === "login" ? (
              <>
                <button
                  type="button"
                  className="font-semibold text-slate-700 hover:underline"
                  onClick={() => setMode("register")}
                >
                  Sign Up
                </button>
                <span className="text-slate-500">I don’t have an account</span>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="font-semibold text-slate-700 hover:underline"
                  onClick={() => setMode("login")}
                >
                  I have an account
                </button>
                <span className="text-slate-500">Back to login</span>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
