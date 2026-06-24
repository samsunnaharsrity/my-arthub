"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Menu,
  Search,
  Palette,
  PenTool,
  Image ,
  Cuboid,
  Camera,
  Shapes,
  Images,
  ImagePlus,
  Monitor,
  ArrowUpDown,
  ShoppingBag,
  SlidersHorizontal,
  User,
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Shield,
  Settings
} from "lucide-react";

import {
  Button,
  Drawer,
  TextField,
  InputGroup,
  Slider,
  Select,
  Label,
  ListBox,
} from "@heroui/react";

export function DashboardSidebar({user}) {
  const pathname = usePathname();
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortValue, setSortValue] = useState("newest");


  const artistCategories = [
    { label: "All Categories", href: "/dashboard/artist", icon: Shapes },
    {
    label: "All Art Works",
    href: "/dashboard/artist/artWorks",
    icon: Images,
    },
    {
    label: "Add New Art Works",
    href: "/dashboard/artist/artWorks/create",
    icon: ImagePlus,
    },
    {
    label: "Artist Profile",
    href: "/dashboard/artist/artistProfile",
    icon: ImagePlus,
    },
    { label: "Painting", href: "/dashboard/artist/painting", icon: Palette },
    { label: "Digital Art", href: "/dashboard/artist/digital-art", icon: Monitor },
    { label: "Sculpture", href: "/dashboard/artist/sculpture", icon: Cuboid },
    { label: "Photography", href: "/dashboard/artist/photography", icon: Camera },
    { label: "Illustration", href: "/dashboard/artist/illustration", icon: PenTool },
    {
    label: "Sales History",
    href: "/dashboard/artist/sales-history",
    icon: ShoppingBag,
    },
  ];

  const adminCategories = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Users Management",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    label: "All Artworks",
    href: "/dashboard/admin/artworks",
    icon: Images,
  },
  {
    label: "Add Artwork",
    href: "/dashboard/admin/artworks/create",
    icon: ImagePlus,
  },
  {
    label: "Orders / Sales",
    href: "/dashboard/admin/sales",
    icon: ShoppingBag,
  },
  {
    label: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "Reports",
    href: "/dashboard/admin/reports",
    icon: FileText,
  },
  {
    label: "Roles & Permissions",
    href: "/dashboard/admin/roles",
    icon: Shield,
  },
  {
    label: "Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
];

  const userCategories = [
  { label: "My Profile", href: "/dashboard/user/profile", icon: User },
  { label: "Purchased Art", href: "/dashboard/user/purchases", icon: ShoppingBag },
  { label: "Drafted Arts", href: "/dashboard/user/saveDraft", icon: Images },
];

const categoriesMap = {
  user: userCategories,
  artist : artistCategories,
  admin : adminCategories,
}

const categories = categoriesMap[user?.role || userCategories]

  const sortOptions = [
    { id: "newest", label: "Newest First" },
    { id: "oldest", label: "Oldest First" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
  ];

  const handleMinChange = (e) => {
    const val = Math.min(Number(e.target.value) || 0, priceRange[1]);
    setPriceRange([val, priceRange[1]]);
  };

  const handleMaxChange = (e) => {
    const val = Math.max(Number(e.target.value) || 0, priceRange[0]);
    setPriceRange([priceRange[0], val]);
  };

  const SidebarContent = () => (
    <div className="space-y-7 mt-20">
      {/* Heading */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-900/10">
          <SlidersHorizontal size={17} className="text-green-900" />
        </div>
        <div>
          <h2 className="text-lg font-bold leading-tight text-slate-900">
            Filters
          </h2>
          <p className="text-xs text-slate-500">Find your perfect artwork</p>
        </div>
      </div>

      {/* Search */}
      <TextField>
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Search
        </Label>
        <InputGroup>
          <InputGroup.Prefix>
            <Search size={16} className="text-slate-400" />
          </InputGroup.Prefix>
          <InputGroup.Input
            placeholder="Search artwork..."
            className="h-10 rounded-xl"
          />
        </InputGroup>
      </TextField>

      {/* Categories */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Category
        </h3>
        <div className="space-y-1">
          {categories.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-green-900/8 text-green-900"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span
                  className={`absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-green-900 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                <Icon
                  size={17}
                  className={isActive ? "text-green-900" : "text-slate-400 group-hover:text-slate-600"}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Price Range
        </h3>

        <Slider
          aria-label="Artwork price range"
          value={priceRange}
          onChange={setPriceRange}
          minValue={0}
          maxValue={10000}
          step={50}
          className="max-w-full"
        >
          <Slider.Track className="h-1.5 rounded-full bg-slate-200">
            <Slider.Fill className="rounded-full bg-green-900" />
            {priceRange.map((_, i) => (
              <Slider.Thumb
                key={i}
                index={i}
                className="h-4 w-4 rounded-full border-2 border-white bg-green-900 shadow-sm ring-1 ring-green-900/30"
              />
            ))}
          </Slider.Track>
        </Slider>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1">
            <label className="mb-1 block text-[11px] font-medium text-slate-400">Min</label>
            <div className="flex items-center rounded-lg border border-slate-200 px-2.5 py-1.5">
              <span className="mr-1 text-xs text-slate-400">$</span>
              <input
                type="number"
                value={priceRange[0]}
                onChange={handleMinChange}
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
              />
            </div>
          </div>
          <span className="mt-4 text-slate-300">—</span>
          <div className="flex-1">
            <label className="mb-1 block text-[11px] font-medium text-slate-400">Max</label>
            <div className="flex items-center rounded-lg border border-slate-200 px-2.5 py-1.5">
              <span className="mr-1 text-xs text-slate-400">$</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={handleMaxChange}
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sort */}
      <div>
        <Select value={sortValue} onChange={setSortValue}>
          <Label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <ArrowUpDown size={13} />
            Sort By
          </Label>
          <Select.Trigger className="flex h-10 w-full items-center justify-between rounded-xl border border-slate-200 px-3 text-sm text-slate-700 transition-colors hover:border-slate-300 focus:border-green-900">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="rounded-xl border border-slate-200 bg-white shadow-lg">
            <ListBox>
              {sortOptions.map((option) => (
                <ListBox.Item
                  key={option.id}
                  id={option.id}
                  textValue={option.label}
                  className="cursor-pointer rounded-lg px-3 py-2 text-sm text-slate-600 data-[hovered]:bg-green-900/8 data-[hovered]:text-green-900 data-[selected]:font-medium data-[selected]:text-green-900"
                >
                  {option.label}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* Apply Button */}
      <div className="space-y-2 pt-1">
        <Button className="h-11 w-full rounded-xl bg-green-900 font-semibold text-white shadow-sm transition-colors hover:bg-green-800">
          Apply Filters
        </Button>
        <button
          type="button"
          onClick={() => {
            setPriceRange([0, 5000]);
            setSortValue("newest");
          }}
          className="w-full text-center text-xs font-medium text-slate-400 transition-colors hover:text-slate-600"
        >
          Reset all filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:sticky lg:top-21 lg:block lg:h-[calc(100vh-5.5rem)] lg:w-[260px] lg:shrink-0 xl:w-[300px]">
        <div className="h-full overflow-y-auto border border-slate-200 bg-white p-5 shadow-sm pt-6">
          <SidebarContent />
        </div>
      </aside>

{/* Mobile / Tablet Trigger + Drawer */}
<Drawer>
  <Button className="fixed bottom-5 right-5 z-40 flex h-12 items-center gap-2 rounded-full bg-green-900 px-5 text-sm font-semibold text-white shadow-lg shadow-green-900/30 lg:hidden">
    <Menu size={17} />
    Filters
  </Button>

  <Drawer.Backdrop className="lg:hidden">
    <Drawer.Content
      placement="left"
      className="w-[88vw] max-w-sm sm:w-[380px]"
    >
      <Drawer.Dialog className="flex h-full flex-col bg-white">
        <Drawer.CloseTrigger />

        <Drawer.Header className="border-b border-slate-100">
          <Drawer.Heading className="text-base font-bold text-slate-900">
            Artwork Filters
          </Drawer.Heading>
        </Drawer.Header>

        <Drawer.Body className="flex-1 overflow-y-auto px-5 py-5">
          <SidebarContent />
        </Drawer.Body>
      </Drawer.Dialog>
    </Drawer.Content>
  </Drawer.Backdrop>
</Drawer>
    </>
  );
}
