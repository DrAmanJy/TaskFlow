import { Layout, Server, Store, Folder } from "lucide-react";
export const iconOptions = [
  {
    id: "layout",
    icon: Layout,
    label: "UI / Web",
    activeClass: "border-indigo-500 bg-indigo-50 text-indigo-600",
  },
  {
    id: "server",
    icon: Server,
    label: "Backend",
    activeClass: "border-emerald-500 bg-emerald-50 text-emerald-600",
  },
  {
    id: "store",
    icon: Store,
    label: "Commerce",
    activeClass: "border-orange-500 bg-orange-50 text-orange-600",
  },
  {
    id: "folder",
    icon: Folder,
    label: "Other",
    activeClass: "border-slate-500 bg-slate-100 text-slate-700",
  },
];
