export default function isTypeOf<T>(value: unknown): value is T {
  if (value as T) {
    return true
  }
  return false
}
