const imageModules = import.meta.glob("/app/assets/blogThumbnails/*.{png,jpg,jpeg,webp,svg}", { eager: true });

const imageList: string[] = Object.values(imageModules).map((mod: any) => mod.default);

/**
 * Get a set of unique random images for a specific page.
 * @param {number} page - The current page number.
 * @param {number} imagesPerPage - Number of images per page (default is 6).
 * @returns {string[]} - Array of random image URLs for the current page.
 */
export function getRandomImagesForPage(page: number, imagesPerPage: number = 6): string[] {
  const shuffledImages = shuffleArray([...imageList]); // Shuffle a copy of imageList
  const startIndex = (page - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;

  // Extract unique images for the page
  let imagesOnPage: string[] = shuffledImages.slice(startIndex, endIndex);

  // If we don't have enough images for the page, repeat from the start
  if (imagesOnPage.length < imagesPerPage) {
    const remainingImages = imagesPerPage - imagesOnPage.length;
    imagesOnPage = imagesOnPage.concat(shuffledImages.slice(0, remainingImages));
  }

  return imagesOnPage;
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
