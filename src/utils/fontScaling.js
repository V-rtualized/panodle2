export const getScaledFontSize = (text, baseSize = 18) => {
  const length = text?.length || 0
  if (length <= 6) return `${baseSize}px`
  if (length <= 10) return `${baseSize - 2}px`
  if (length <= 15) return `${baseSize - 4}px`
  return `${baseSize - 6}px`
}
