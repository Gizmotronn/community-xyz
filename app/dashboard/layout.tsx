import { DashboardSidebar } from "./sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 ml-64 p-8 bg-background">
        {children}
      </main>
    </div>
  )
}
