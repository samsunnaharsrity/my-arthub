import {
  Users,
  Images,
  ShoppingBag,
  DollarSign,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: 120,
    icon: Users,
  },
  {
    title: "Total Artworks",
    value: 85,
    icon: Images,
  },
  {
    title: "Total Orders",
    value: 42,
    icon: ShoppingBag,
  },
  {
    title: "Revenue",
    value: "$5,200",
    icon: DollarSign,
  },
];

export default function AdminDashboard() {
  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white p-6 rounded-3xl shadow"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <Icon className="text-green-600" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}