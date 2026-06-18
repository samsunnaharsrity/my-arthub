import {
  LayoutSideContentLeft,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  Briefcase,
} from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar() {
  const navItems = [
    { icon: House, href: "/dashboard/artist", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Create a job" },
    { icon: Briefcase, href: "/dashboard/recruiter/company", label: "Company Profile" },
    { icon: Envelope, href: "/dashboard/recruiter/messages", label: "Messages" },
    { icon: Person, href: "/dashboard/recruiter/profile", label: "Profile" },
    { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
  ];

  const navContent = (
    <nav className="flex flex-col gap-1.5 py-4 border-r border-slate-300">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-emerald-900 hover:text-white"
          href={item.href}
        >
          <Icon data={item.icon} className="h-5 w-5 text-green-900 transition-colors group-hover:text-white" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden lg:block w-[260px]  dark:bg-[#0F172A] p-6 shadow-green-500/10 mt-20">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-green-900">Menu</h2>
        <p className="mt-1 mb-2 text-sm text-slate-400">
          Manage your workspace
        </p>

        <div className="my-2 h-px bg-black/10" />

        {navContent}
      </aside>

      <Drawer>
        <Button
          className="lg:hidden bg-[#0F172A] border border-emerald-500/20 text-green-600 hover:bg-green-900 hover:text-white"
          variant="secondary"
        >
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="bg-[#0F172A] border-r border-emerald-500/20">
              <Drawer.CloseTrigger className="text-slate-400 hover:text-white" />
              <Drawer.Header>
                <Drawer.Heading className="text-white font-bold">
                  Navigation
                </Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body className="px-6">{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
