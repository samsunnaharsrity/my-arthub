const favorites = [
  {
    id: 1,
    title: "Golden Forest",
    artist: "Emma Lee",
  },
  {
    id: 2,
    title: "Night Sky",
    artist: "David Roy",
  },
];

export default function SaveDaftPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
          >
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-500">By {item.artist}</p>

            <button className="mt-3 text-sm text-red-500 hover:underline">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}