export const SkipSerialization = Symbol(
  'ba1894562a5b3e00de68679b5e01fed0de0a0aac6da459729c2f4d665d928ccc',
)

type SerializationRules = <T>(
  unserializedValue: T,
) => string | number | boolean | null | undefined | typeof SkipSerialization

function detectCircularReferences(
  object: unknown,
  seenObjects = new Set<unknown>(),
): boolean {
  if (object !== null && typeof object === 'object') {
    if (seenObjects.has(object)) return true

    seenObjects.add(object)
    for (const key of Object.keys(object as object)) {
      if (
        detectCircularReferences((object as { [key: string]: unknown })[key], seenObjects)
      )
        return true
    }

    seenObjects.delete(object)
  }
  return false
}

function hasCircularReferences(object: unknown): boolean {
  return detectCircularReferences(object)
}

function isPlainObject(obj: unknown): obj is Record<string, unknown> {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

function processValue(value: unknown, rules: SerializationRules): unknown {
  if (Array.isArray(value)) {
    return value
      .map((item) => processValue(item, rules))
      .filter((item) => item !== SkipSerialization)
  } else if (typeof value === 'object' && value !== null && isPlainObject(value)) {
    const processedObject = Object.fromEntries(
      Object.entries(value)
        .map(([key, val]) => [key, processValue(val, rules)])
        .filter(([, val]) => val !== SkipSerialization),
    )

    if (Object.keys(processedObject).length === 0 && !rules(value))
      return SkipSerialization

    return processedObject
  } else {
    const serialized = rules(value)
    if (serialized === SkipSerialization) return value

    return serialized
  }
}

export function serialize<V>(data: unknown, rules: SerializationRules) {
  if (hasCircularReferences(data)) {
    throw new Error('Neither Next.js nor obj-serialize supports circular references.')
  }

  const result = processValue(data, rules)
  return result === SkipSerialization
    ? ({} as Record<string, V>)
    : (result as Record<string, V>)
}
