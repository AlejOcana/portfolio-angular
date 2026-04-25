export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}

export function formatNumber(num: number, suffix?: string): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M' + (suffix || '');
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K' + (suffix || '');
  }
  return num.toString() + (suffix || '');
}