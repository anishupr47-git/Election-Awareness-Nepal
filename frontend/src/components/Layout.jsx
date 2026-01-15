import Navbar from "./Navbar.jsx"
import Sidebar from "./Sidebar.jsx"
import ElectuChat from "./ElectuChat.jsx"
import { useUi } from "../ui/UiContext.jsx"
import { Outlet } from "react-router-dom"

export default function Layout() {
  const { sidebarOpen, closeSidebar } = useUi()

  return (
    <div className="min-h-screen text-slate-900 bg-gradient-to-br from-rose-200 via-white to-sky-200">
      <Navbar />
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 pb-24">
        <Outlet />
      </main>
      <ElectuChat />
    </div>
  )
}
