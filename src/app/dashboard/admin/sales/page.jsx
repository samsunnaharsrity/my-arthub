export default async function SalesPage() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/purchase`
  );

  const data = await res.json();

  const purchases = data.items || [];

  return (
    <section className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Orders & Sales
      </h1>

      <div className="bg-white rounded-3xl shadow p-6">

        {purchases.map((item) => (
          <div
            key={item._id}
            className="border-b py-4"
          >
            <h3 className="font-semibold">
              Buyer: {item.shipping?.name}
            </h3>

            <p>
              Artwork ID: {item.artworkId}
            </p>

            <p>
              Date:
              {new Date(
                item.createdAt
              ).toLocaleDateString()}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}