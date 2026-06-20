"use client";

import { getArtWorks } from "@/lib/api/artWorks";
import { Button } from "@heroui/react";


export default async function ManageArtworks() {

  const artWorksId = 'artWorks_112233'
  const artworks = await getArtWorks(artWorksId)

  return (
    <div className="mt-30">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Manage Artworks
        </h1>

        <Button color="primary">
          Add Artwork
        </Button>
      </div>

      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {artworks.map((art) => (
              <tr key={art.id} className="border-b">
                <td className="p-4">{art.title}</td>
                <td className="p-4">{art.category}</td>
                <td className="p-4">${art.price}</td>

                <td className="p-4 flex gap-2">
                  <Button size="sm">
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    color="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}