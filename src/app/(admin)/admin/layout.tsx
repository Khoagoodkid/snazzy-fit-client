"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Shield,
  ShoppingBag,
  Package,
  Layers,
  Menu,
  X,
  LogOut,
  Settings,
  Bell,
  Search,
  HelpCircle,
  MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LiveChatProvider } from "@/app/LiveChatProvider"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Role Permissions",
      href: "/admin/role-permission",
      icon: Shield,
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      name: "Collections",
      href: "/admin/collections",
      icon: Layers,
    },
    {
      name: "Tickets",
      href: "/admin/ticket",
      icon: MessageSquare,
    },
    {
      name: "Help Desk",
      href: "/admin/help-desk",
      icon: HelpCircle,
    }
  ]

  return (
    // <LiveChatProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/30">
        {/* Decorative Background Blobs */}
        <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-200/20 to-teal-200/20 rounded-full blur-3xl -z-10" />
        <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-200/20 to-green-200/20 rounded-full blur-3xl -z-10" />

        {/* Sidebar - Desktop */}
        <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
          <div className="flex flex-col flex-grow bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto border-r border-slate-700/50 shadow-2xl">
            {/* Logo/Brand */}
            <div className="flex items-center justify-start h-20 px-6 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                    SnazzyFit
                  </h1>
                  <p className="text-xs text-slate-400">Admin Panel</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                        group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                        ${isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/50'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }
                      `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Admin Profile */}
            <div className="p-4 border-t border-slate-700/50">
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">Admin User</p>
                  <p className="text-xs text-slate-400 truncate">admin@snazzyfit.com</p>
                </div>
                <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                  <LogOut className="w-4 h-4 text-slate-400 hover:text-red-400" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
              <div className="flex flex-col h-full">
                {/* Logo/Brand */}
                <div className="flex items-center justify-between h-20 px-6 border-b border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Layers className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                        SnazzyFit
                      </h1>
                      <p className="text-xs text-slate-400">Admin Panel</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                            group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                            ${isActive
                            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/50'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }
                          `}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </nav>

                {/* Admin Profile */}
                <div className="p-4 border-t border-slate-700/50">
                  <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      A
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">Admin User</p>
                      <p className="text-xs text-slate-400 truncate">admin@snazzyfit.com</p>
                    </div>
                    <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                      <LogOut className="w-4 h-4 text-slate-400 hover:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <div className="lg:pl-72">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6 text-slate-700" />
              </button>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl mx-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 bg-slate-50 border-slate-200 focus:border-cyan-500 focus:ring-cyan-500"
                  />
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative hover:bg-slate-100">
                  <Bell className="w-5 h-5 text-slate-700" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-slate-100">
                  <Settings className="w-5 h-5 text-slate-700" />
                </Button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    // </LiveChatProvider>
  )
}