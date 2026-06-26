"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import {
  Menu,
  Search,
  Palette,
  PenTool,
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
  Settings,
  MessageSquare,
} from "lucide-react";

import {
  Button,
  TextField,
  InputGroup,
  Slider,
  Select,
  Label,
  ListBox,
} from "@heroui/react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const DEFAULT_PRICE_RANGE = [0, 5000];
const DEFAULT_SORT = "newest";

export function DashboardSidebar({ user }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice")) || DEFAULT_PRICE_RANGE[0],
    Number(searchParams.get("maxPrice")) || DEFAULT_PRICE_RANGE[1],
  ]);
  const [sortValue, setSortValue] = useState(
    searchParams.get("sort") || DEFAULT_SORT
  );


const [showMobileSidebar, setShowMobileSidebar] = useState(false);


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
      href: "/dashboard/admin/user-management",
      icon: Users,
    },
    {
      label: "All Artworks",
      href: "/dashboard/admin/all-artworks",
      icon: Images,
    },
    {
      label: "Orders / Sales",
      href: "/dashboard/admin/salesChart",
      icon: ShoppingBag,
    },
    {
      label: "Analytics",
      href: "/dashboard/admin/analytics",
      icon: BarChart3,
    },
    {
      label: "View All Transactions",
      href: "/dashboard/admin/transactions",
      icon: FileText,
    },
    {
      label: "Roles & Permissions",
      href: "/dashboard/admin/rolesAndPermission",
      icon: Shield,
    },
    {
      label: "Comments Moderation",
      href: "/dashboard/admin/comments",
      icon: MessageSquare,
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
    { label: "Transaction History", href: "/dashboard/user/transactions", icon: Images },
  
  ];

  const categoriesMap = {
    user: userCategories,
    artist: artistCategories,
    admin: adminCategories,
  };


  const categories = categoriesMap[user?.role] || userCategories;

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


  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (searchTerm.trim()) params.set("q", searchTerm.trim());
    params.set("minPrice", String(priceRange[0]));
    params.set("maxPrice", String(priceRange[1]));
    params.set("sort", sortValue);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setPriceRange(DEFAULT_PRICE_RANGE);
    setSortValue(DEFAULT_SORT);
    router.push(pathname);
  };

  const SidebarContent = () => (
    <div className="space-y-7 ">
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        <Button
          slot="close"
          onClick={handleApplyFilters}
          className="h-11 w-full rounded-xl bg-green-900 font-semibold text-white shadow-sm transition-colors hover:bg-green-800"
        >
          Apply Filters
        </Button>
        <button
          type="button"
          onClick={handleResetFilters}
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

  {/* Mobile Filter Button */}
  <Button
    onPress={() => setShowMobileSidebar(true)}
    className="fixed bottom-5 right-5 z-50 flex h-12 items-center gap-2 rounded-full bg-green-900 px-5 text-sm font-semibold text-white shadow-lg lg:hidden"
  >
    <Menu size={17} />
    Filters
  </Button>

  {/* Mobile Sidebar */}
  <AnimatePresence>
    {showMobileSidebar && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowMobileSidebar(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />

        {/* Sidebar */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 top-0 z-50 h-screen w-[88vw] max-w-sm overflow-y-auto bg-white shadow-2xl lg:hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 p-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Artwork Filters
              </h2>
              <p className="text-xs text-slate-500">
                Find your perfect artwork
              </p>
            </div>

            <button
              onClick={() => setShowMobileSidebar(false)}
              className="rounded-full p-2 hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-5">
            <SidebarContent />
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
</>
  );
}