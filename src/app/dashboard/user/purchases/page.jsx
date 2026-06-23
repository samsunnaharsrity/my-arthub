const purchases = [
  {
    id: 1,
    title: "Sunset Dream",
    artist: "Ava Smith",
    price: "$120",
    date: "2026-06-20",
  },
  {
    id: 2,
    title: "Blue Horizon",
    artist: "John Artist",
    price: "$80",
    date: "2026-06-18",
  },
];

export default function PurchasesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Purchased Art</h1>

      <div className="grid gap-4">
        {purchases.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-lg p-4 flex justify-between"
          >
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500">By {item.artist}</p>
              <p className="text-xs text-gray-400">{item.date}</p>
            </div>

            <div className="font-bold text-green-600">{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}