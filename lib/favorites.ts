import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export const toggleFavorite = async (favoriteId: string) => {
  console.log("favoriteId", favoriteId);

  const { userId } = auth();

  if (!userId) return;

  const userFavorites = await prismadb.userFavorites.findUnique({
    where: { userId },
    select: { favorites: true },
  });

  let favorites = userFavorites?.favorites.split(",");

  // If the user has already favorited this tool, remove it from their favorites
  if (userFavorites && favorites?.includes(favoriteId)) {
    // Filter out the favoriteId from the favorites array
    favorites = favorites?.filter((id) => id !== favoriteId);

    await prismadb.userFavorites.update({
      where: { userId },
      data: {
        favorites: { set: favorites?.join(",") },
      },
    });
  }

  // If the user has not favorited this tool, add it to their favorites
  else if (userFavorites) {
    // Add the favoriteId to the favorites array
    favorites?.push(favoriteId);

    await prismadb.userFavorites.update({
      where: { userId },
      data: { favorites: { set: favorites?.join(",") } },
    });
  }

  // If the user has not favorited any tools yet, create a new entry in the userFavorites table
  else {
    favorites = [favoriteId];

    await prismadb.userFavorites.create({
      data: { userId, favorites: favorites.join(",") },
    });
  }
};

export const getFavorites = async () => {
  const { userId } = auth();

  if (!userId) return [];

  const userFavorites = await prismadb.userFavorites.findUnique({
    where: { userId },
    select: { favorites: true },
  });

  if (!userFavorites) return [];

  const favorites = userFavorites.favorites.split(",");

  return favorites;
};
