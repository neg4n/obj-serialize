import { describe, expect, it } from '@jest/globals'
import { isSerializableProps as nextPageIsSerializableProps } from 'next/dist/lib/is-serializable-props'

import { nextServerSideSerialize } from '../src/predefined'
import {
  createCircularReferenceUnserializableData,
  oneLevelDeepUnserializableData,
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
  it('should serialize not JSON serializable one level deep object', () => {
    const serializedData = nextServerSideSerialize(oneLevelDeepUnserializableData)

    expect(emulatedIsSerializableProps(serializedData)).toBe(true)
  })

  it('should serialize not JSON serializable ten levels deep object', () => {
    const serializedData = nextServerSideSerialize(oneLevelDeepUnserializableData)

    expect(emulatedIsSerializableProps(serializedData)).toBe(true)
  })

  it('should not serialize object with circular references', () => {
    const circularReferenceUnserializableData =
      createCircularReferenceUnserializableData()

    const serializeCircularReferences = () =>
      nextServerSideSerialize(circularReferenceUnserializableData)

    expect(serializeCircularReferences).toThrow()
  })
})
