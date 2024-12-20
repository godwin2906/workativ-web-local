// imageUtils.ts
const imageModules = import.meta.glob("/app/assets/blogThumbnails/*.{png,jpg,jpeg,webp,svg}", { eager: true });

const imageList: string[] = Object.values(imageModules).map((mod: any) => mod.default);

/**
 * Get a set of unique images for a page
 * @param {number} count - Number of images to retrieve
 * @returns {string[]} - Array of unique image URLs
 */
export function getPageRandomImages(count: number): string[] {
  const shuffledImages = shuffleArray([...imageList]); // Shuffle the image pool
  return shuffledImages.slice(0, count); // Return the first 'count' images
}

/**
 * Shuffles an array using the Fisher-Yates shuffle algorithm.
 * @param {T[]} array - The array to shuffle.
 * @returns {T[]} - The shuffled array.
 */
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
