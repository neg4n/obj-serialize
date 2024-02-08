import { describe, expect, it } from '@jest/globals'
import { isSerializableProps as nextPageIsSerializableProps } from 'next/dist/lib/is-serializable-props'

import { nextServerSideSerialize } from '../src/predefined'
import {
  createCircularReferenceUnserializableData,
  oneLevelDeep,
  oneLevelDeepWithArrays,
  oneLevelDeepWithMixedArrays,
  fiveLevelsDeep,
  fiveLevelsDeepWithArrays,
  fiveLevelsDeepWithMixedArrays,
} from './__stubs__/unserializable-data'

function emulatedIsSerializableProps(props: Record<string, unknown>) {
  try {
    nextPageIsSerializableProps(
      'obj-serialize',
      'Emulated Next.js Pages environment for testing',
      props,
    )
    return true
  } catch (error) {
    return false
  }
}

describe('nextServerSideSerialize', () => {
  it('should serialize not JSON serializable 1 level deep object', () => {
    const serializedData = nextServerSideSerialize(oneLevelDeep.jsonUnserializable)

    expect(emulatedIsSerializableProps(serializedData)).toBe(true)
    expect(serializedData).toStrictEqual(oneLevelDeep.serialized)
  })

  it('should serialize not JSON serializable 1 level deep object with arrays', () => {
    const serializedData = nextServerSideSerialize(
      oneLevelDeepWithArrays.jsonUnserializable,
    )

    expect(emulatedIsSerializableProps(serializedData)).toBe(true)
    expect(serializedData).toStrictEqual(oneLevelDeepWithArrays.serialized)
  })

  it('should serialize not JSON serializable 1 level deep object with arrays and objects mixed', () => {
    const serializedData = nextServerSideSerialize(
      oneLevelDeepWithMixedArrays.jsonUnserializable,
    )

    expect(emulatedIsSerializableProps(serializedData)).toBe(true)
    expect(serializedData).toStrictEqual(oneLevelDeepWithMixedArrays.serialized)
  })

  it('should serialize not JSON serializable 5 levels deep object', () => {
    const serializedData = nextServerSideSerialize(fiveLevelsDeep.jsonUnserializable)

    expect(emulatedIsSerializableProps(serializedData)).toBe(true)
    expect(serializedData).toStrictEqual(fiveLevelsDeep.serialized)
  })

  it('should serialize not JSON serializable 5 levels deep object with arrays', () => {
    const serializedData = nextServerSideSerialize(
      fiveLevelsDeepWithArrays.jsonUnserializable,
    )

    expect(emulatedIsSerializableProps(serializedData)).toBe(true)
    expect(serializedData).toStrictEqual(fiveLevelsDeepWithArrays.serialized)
  })

  it('should serialize not JSON serializable 5 levels deep object with arrays and objects mixed', () => {
    const serializedData = nextServerSideSerialize(
      fiveLevelsDeepWithMixedArrays.jsonUnserializable,
    )

    expect(emulatedIsSerializableProps(serializedData)).toBe(true)
    expect(serializedData).toStrictEqual(fiveLevelsDeepWithMixedArrays.serialized)
  })

  it('should not serialize object with circular references', () => {
    const circularReferenceUnserializableData =
      createCircularReferenceUnserializableData()

    const serializeCircularReferences = () =>
      nextServerSideSerialize(circularReferenceUnserializableData)

    expect(serializeCircularReferences).toThrow()
  })
})
