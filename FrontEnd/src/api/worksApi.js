const API_BASE_URL = "http://localhost:5000/api";

// Get all works
export const getWorks = async () => {
  const response = await fetch(`${API_BASE_URL}/works`);

  if (!response.ok) {
    throw new Error("Failed to fetch works");
  }

  const data = await response.json();

  return data;
};

// Get single work details
export const getWorkDetails = async (workId) => {
  const response = await fetch(`${API_BASE_URL}/works/${workId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch work details");
  }

  const data = await response.json();

  return data;
};

// Get all categories
export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();

  return data;
};

// Get work images
export const getWorkImages = async (workId) => {
  const response = await fetch(
    `${API_BASE_URL}/work-images/${workId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch work images");
  }

  const data = await response.json();

  return data;
};

// Get work videos
export const getWorkVideos = async (workId) => {
  const response = await fetch(
    `${API_BASE_URL}/work-videos/${workId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch work videos");
  }

  const data = await response.json();

  return data;
};