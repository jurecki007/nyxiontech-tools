// Plural forms, kept apart from index.ts so dictionaries can import them.

/**
 * Polish-style plural: picks the form for 1, for 2-4 (but not 12-14) and for the rest.
 * "1 plik", "3 pliki", "5 plików", "22 pliki".
 */
export function plural(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one;
  const tens = n % 100;
  const units = n % 10;
  return units >= 2 && units <= 4 && !(tens >= 12 && tens <= 14) ? few : many;
}

/**
 * East-Slavic plural (Ukrainian): like `plural` above, except that every number ending
 * in 1 (but not 11) takes the singular form.
 * "1 файл", "3 файли", "5 файлів", "21 файл", "22 файли".
 */
export function pluralUk(n: number, one: string, few: string, many: string): string {
  const tens = n % 100;
  const units = n % 10;
  if (units === 1 && tens !== 11) return one;
  return units >= 2 && units <= 4 && !(tens >= 12 && tens <= 14) ? few : many;
}
