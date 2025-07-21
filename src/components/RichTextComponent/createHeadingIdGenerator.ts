export const createHeadingIdGenerator = () => {
  const usedIds: Record<string, number> = {}

  return (raw: string) => {
    const base = raw
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/^-+|-+$/g, '')

    if (usedIds[base]) {
      usedIds[base] += 1
      return `${base}-${usedIds[base]}`
    } else {
      usedIds[base] = 1
      return base
    }
  }
}
