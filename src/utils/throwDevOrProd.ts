export default function throwDevOrProd(devError: unknown, prodError: unknown) {
  if (process.env.NODE_ENV === 'development') throw devError;
  else throw prodError;
}
