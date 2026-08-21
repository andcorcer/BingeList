const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

// Fetches trending media for the HomePage based on the media type (in order to separate them in different containers) and time window (day or week)
export const fetchTrending = async (mediaType, timeWindow = "day") => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/${mediaType}/${timeWindow}`,
      options,
    );
    if (!response.ok) {
      throw new Error(
        `HTTP error "${response.status}": Failed to fetch trending "${mediaType}"`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error in the fetchTrending function:", error.message);
    throw error;
  }
};

// Fetches a single piece of media (movie or tv) by its ID, including its details, credits, and videos
export const fetchMediaDetailsById = async (id, type) => {
  try {
    const response = await fetch(`${BASE_URL}/${type}/${id}`, options);
    if (!response.ok) {
      throw new Error(
        `HTTP error "${response.status}": Failed to fetch "${type}" with id "${id}" details`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error(
      "Error in the fetchMediaDetailsById function:",
      error.message,
    );
    throw error;
  }
};

// Fetches search results using a query and with the option to switch pages (default is page 1). The search is performed across multiple media types
export const fetchSearchMedia = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&page=${page}`,
      options,
    );
    if (!response.ok) {
      throw new Error(`HTTP error "${response.status}": Search failed`);
    }
    const data = await response.json();
    return {
      ...data,
      results: data.results.filter((result) => result.media_type !== "person"), // Filter out 'person' media type
    };
  } catch (error) {
    console.error("Error in the fetchSearchMedia function:", error.message);
    throw error;
  }
};

// Fetches different media categories (popular, top_rated, upcoming, now_playing, on_the_air, airing_today) for a given media type (movie or tv) and page number (default is page 1) for the CategoryPage component
export const fetchCategoryMedia = async (
  type,
  category = "popular",
  page = 1,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${type}/${category}?page=${page}`,
      options,
    );
    if (!response.ok) {
      throw new Error(
        `HTTP error "${response.status}": Failed to fetch "${category}" category for "${type}"`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error in the fetchCategoryMedia function:", error.message);
    throw error;
  }
};
