import { flattie } from 'flattie'
import { nestie } from 'nestie'

export const SkipSerialization = Symbol(
  'ba1894562a5b3e00de68679b5e01fed0de0a0aac6da459729c2f4d665d928ccc',
)

type SerializationRules = <T>(
  unserializedValue: T,
) => string | number | boolean | null | undefined | typeof SkipSerialization

export function serialize<R>(data: Record<string, unknown>, rules: SerializationRules) {
  if (hasCircularReferences(data)) {
    throw new Error('Neither Next.js nor obj-serialize supports circular references.')
  }

  return nestie(
    Object.entries(flattie(data) as Record<string, unknown>).reduce(
      (newData, [key, value]) => {
        let oldValue = value
        const serialized = rules(value)

        if (typeof serialized === typeof SkipSerialization) {
          newData[key] = oldValue
        } else if (serialized !== oldValue) {
          newData[key] = serialized
        }

        return newData
      },
      {} as Record<string, unknown>,
    ),
  ) as Record<string, R>
}

function hasCircularReferences(object: unknown): boolean {
  const seenObjects = new Set<unknown>()

  const detect = (object: unknown): boolean => {
    if (object !== null && typeof object === 'object') {
      if (seenObjects.has(object)) return true

      seenObjects.add(object)

      for (const key of Object.keys(object as object))
        if (detect((object as { [key: string]: unknown })[key])) return true

      seenObjects.delete(object)
    }

    return false
  }

  return detect(object)
}
