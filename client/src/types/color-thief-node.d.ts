declare module 'color-thief-node' {
  /**
   * Get the dominant color from an image URL
   * @param imageUrl URL of the image to analyze
   * @returns Promise resolving to an RGB array [r, g, b]
   */
  export function getColorFromURL(imageUrl: string): Promise<number[]>;

  /**
   * Get a color palette from an image URL
   * @param imageUrl URL of the image to analyze
   * @param colorCount Number of colors to return
   * @returns Promise resolving to an array of RGB arrays [[r, g, b], [r, g, b], ...]
   */
  export function getPaletteFromURL(imageUrl: string, colorCount?: number): Promise<number[][]>;
}