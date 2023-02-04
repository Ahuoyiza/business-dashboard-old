export default function snakeCaseToCapitalized(input = ''): string {
  const words = input.split('_').map(word => {
    if (word.length === 1) {
      return word.toUpperCase();
    } else {
      return word.at(0)?.toUpperCase() + word.slice(1);
    }
  });

  return words.join(' ');
}