export default function sortByAttribute<T extends Record<string, any>>(items: T[], attr: string = 'sort'): T[] {
  return items.sort((a, b) => {
    const aVal = typeof a[attr] === 'function' ? a[attr]() : a[attr];
    const bVal = typeof b[attr] === 'function' ? b[attr]() : b[attr];
    return aVal - bVal;
  });
}
