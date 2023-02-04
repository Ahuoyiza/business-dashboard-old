export const delayFunctionCall = (func: Function, delay: number): void => {
  setTimeout(() => func(), delay);
};

/**
 * Gets the query parameters in a URL and returns them in a URLSearchParams object.
 * @param path URL containing query parameters
 * @returns URLSearchParams containing the query parameters
 */
export const getSearchParams = (path: string) => {
  const queryIdx = path.indexOf('?');
  const queryString = path.substring(queryIdx + 1);
  return new URLSearchParams(queryString);
};
