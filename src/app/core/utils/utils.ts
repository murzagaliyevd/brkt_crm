export function orderByDesc<T>(items: Array<T>, expr: (item: T) => number) {
  return items.sort((x1, x2) => expr(x1) > expr(x2) ? -1 : 1)
}
