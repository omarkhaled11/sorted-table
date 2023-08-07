export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function compare(a: any, b: any, key: keyof any, order: 'asc' | 'desc') {
  if (a[key] < b[key]) {
    return order === 'asc' ? -1 : 1;
  }
  if (a[key] > b[key]) {
    return order === 'asc' ? 1 : -1;
  }
  return 0;
}
