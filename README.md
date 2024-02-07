# obj-serialize

`obj-serialize` is a library containing utility functions and building blocks in to serialize objects to be passed around to another context, between applications or between APIs.

## Explanation and example

_but what does the library description mean...?_

### Example situation

Let's take a [Next.js][next] for an example and let's assume you have some kind of service that queries your database and returns some data about dogs.

```js
// services/get-dogs.js
const dogs = [
  {
    name: 'fafik',
    size: 'small',
    birth: new Date('1995-12-17T03:24:00'),
  },
  {
    name: 'pimpek',
    size: 'big',
    birth: new Date('1995-12-17T03:24:00'),
  },
]

export function getDogs(size) {
  // In real world scenario, this probably will be a call to the database
  return dogs.filter(({ size: dogSize }) => dogSize === size)
}
```

Then you want to execute this service and pass the data to your frontend application via [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)

```js
// pages/index.js
import { getDogs } from 'services/get-dogs'

export async function getServerSideProps() {
  const smallDogs = getDogs('small')
  return {
    props: {
      smallDogs,
    },
  }
}

export default function Home({ smallDogs }) {
  return <div>hello {smallDogs[0].name}</div>
}
```

### The problem

[Next.js][next] won’t serialize `Date` object that is present in the `smallDogs` variable. **It can only serialize JSON serializable data types**.

The error when opening the home page would look like this:

> [!CAUTION]
> Error: Error serializing `.smallDogs[0].birth` returned from `getServerSideProps` in “/“.  
> Reason: `object` (“[object Date]”) cannot be serialized as JSON. Please only return JSON serializable data types.

### The solution

Here comes the `obj-serialize` library. You can just do

```js
import { nextServerSideSerialize } from 'obj-serialize'
```

and use it somewhere in your code in order to make any object viable for [Next.js][next] to pass around!

#### Full code snippet

```js
// pages/index.js
import { nextServerSideSerialize } from 'obj-serialize'
import { getDogs } from '../services/get-dogs'

export async function getServerSideProps() {
  const smallDogs = getDogs('small')

  return {
    props: {
      smallDogs: smallDogs.map((dog) => nextServerSideSerialize(dog)),
    },
  }
}

export default function Home({ smallDogs }) {
  return <div>siema {smallDogs[0].name}</div>
}
```

This will work flawlessly ✅

## Customising the serialization

Apart from providing out-of-the-box working utility for serialisation that takes place in [Next.js][next] applications, the `obj-serialize` also provides option to create **your own serializers**.

### Building your function

All you have to do is to import base building block of the library (`serialize` function) and use it as you want.

```js
import { serialize } from 'obj-serialize'
```

The function accepts data to be serialized as a first parameter and serialization rules as the second parameter. The rules parameter is nothing else but function that is used to _“walk”_ through the object, be executed for each occurrence and eventually convert unserialized data into proper one by returning it.

> [!NOTE]
> ℹ️ There is a special value called `SkipSerialization`. It is a unique token that is intended to be used when serialisation traverse does not meet any condition in your serialisation rules and you just need to skip the process for particular case. It has to be this token and not `null` or `undefined` since these two can also have impact on desired data after the serialization.

### Example custom serializer

Let’s assume that you want to convert all `Date` objects not `toISOString()` _(as nextServerSideSerialize does)_ but rather `toLocaleString()`.

```js
import { serialize, SkipSerialization } from 'obj-serialize'

export function customSerialize(data) {
  return serialize(data, (unserializedData) => {
    if (unserializedData instanceof Date) {
      return unserializedData.toLocaleString()
    } else {
      return SkipSerialization
    }
  })
}
```

and thats all! Now you can use your own serializer in the same way as presented [here](#full-code-snippet)

# Acknowledgements and license

The project is licensed under the MIT License. All contributions are welcome

[next]: https://nextjs.org/
