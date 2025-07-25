/**
 * Truncate a string in the middle, keeping up to `maxCount` units at each end.
 * If the string is short enough, returns it unchanged.
 *
 * @param {string} str           – the full string
 * @param {number} maxCount      – maximum characters or words to keep at each end
 * @param {'char'|'word'} mode   – whether to split by characters or words
 * @returns {string}
 */
export function ellipsizeMiddle(
  str: string,
  maxCount = 7,
  mode: 'char' | 'word' = 'char'
): string {
  if (mode === 'word') {
    // Split on whitespace, filter out any empty tokens
    const words = str.split(/\s+/).filter(Boolean)
    // If there aren’t more words than we need to truncate, return original
    if (words.length <= maxCount * 2) {
      return str
    }
    const start = words.slice(0, maxCount).join(' ')
    const end   = words.slice(words.length - maxCount).join(' ')
    return `${start}…${end}`
  } else {
    // Character-based truncation
    if (str.length <= maxCount * 2) {
      return str
    }
    const start = str.slice(0, maxCount)
    const end   = str.slice(str.length - maxCount)
    return `${start}…${end}`
  }
}
