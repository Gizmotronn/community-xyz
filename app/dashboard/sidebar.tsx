import Link from "next/link"

const links = [
  { name: "Overview", href: "/dashboard" },
  { name: "Communities", href: "/dashboard/communities" },
  { name: "Reserve & Investments", href: "/dashboard/reserve" },
  { name: "Smart Contract", href: "/dashboard/contract" },
  { name: "Distribution Countdown", href: "/dashboard/distribution" },
  { name: "Transactions", href: "/dashboard/transactions" },
  { name: "Fee Split", href: "/dashboard/feesplit" },
]

export function DashboardSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground shadow-lg flex flex-col z-20">
      <div className="px-6 py-8 font-heading text-2xl font-bold tracking-tight border-b border-sidebar-border">
        Health Protocol
      </div>
      <nav className="flex-1 px-6 py-4 space-y-2">
        {links.map(link => (
          <Link key={link.href} href={link.href} passHref legacyBehavior>
            <a className="block py-2 px-4 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition font-semibold">
              {link.name}
            </a>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
