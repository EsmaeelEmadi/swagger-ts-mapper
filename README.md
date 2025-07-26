# Swagger Type Mapper 🔄

A zero-runtime, type-only library to generate precise TypeScript types directly from your OpenAPI v2/v3 schema.

## Overview

The Swagger Type Mapper is a simple TypeScript type library that provides a robust solution for converting Swagger/OpenAPI JSON schema definitions into corresponding TypeScript types. This allows developers to gain strong type-checking for their API request and response bodies directly from their API documentation, eliminating manual type declaration and reducing potential runtime errors.

## Features

- Zero Runtime, No Build Step: Purely a `devDependency`. All type generation happens at compile time.
- $ref Resolution: Automatically resolves internal references for schemas and parameters.
- Complete Coverage: Maps `responses`, `requestBody`, and `parameters` (`query`, ` path`, ` header`, ` cookie`).
-️ Accurate Types: Correctly handles required and optional properties, ` enum`,` allOf`/`oneOf`/`anyOf` combiners, and nullable fields.
- Content-Aware: Creates types for different content types (e.g., `application/json`, `application/xml`) and maps empty responses to void.
- Strongly Typed: Leverages your OpenAPI schema `as const` to infer the most precise types possible.

## Installation 

```sh
npm install --save-dev swagger-ts-mapper
```

## Usage

Using this library is a simple, three-step process.

### Step 1: Prepare Your OpenAPI Schema

The most important step is to import your OpenAPI/Swagger JSON object and export it from a TypeScript file with an `as const` assertion. This is critical because it preserves the literal types that the mappers need to work.

1. Get your swagger JSON file.
2. Create a new file, for example src/api-spec.ts.
3. Import or paste the JSON content and export it `as const`.

```ts
// src/api-spec.ts

// IMPORTANT: Use `as const` to preserve all literal types from your schema.
export const myApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Simple Pet Store API',
    version: '1.0.0',
  },
  paths: {
    '/pets/{petId}': {
      get: {
        summary: 'Find pet by ID',
        parameters: [
          {
            name: 'petId',
            in: 'path',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Pet' },
              },
            },
          },
          '404': {
            description: 'Pet not found',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Pet: {
        type: 'object',
        required: ['id', 'name'],
        properties: {
          id: { type: 'integer', format: 'int64' },
          name: { type: 'string' },
          tag: { type: 'string' },
        },
      },
    },
  },
} as const;
```

### Step 2: Generate Your API Types

Now, use the main `SwaggerMapper` type to generate a complete type map for your entire API.

```ts
// src/api-types.ts
import type { SwaggerMapper } from 'swagger-ts-mapper';
import { myApiSpec } from './api-spec';

// This one line generates types for your entire API!
export type MyApi = SwaggerMapper<typeof myApiSpec>;
```

### Step 3: Use the Generated Types

You can now import `MyApi` anywhere in your project and access the precise types for any endpoint, response, or parameter.

```ts
import type { MyApi } from './api-types';

// Get the type for a successful response body
type Pet = MyApi['/pets/{petId}']['get']['responses']['200']['application/json'];
// => type Pet = { readonly id: number; readonly name: string; readonly tag?: string; }

// Get the type for a response with no content
type NotFoundResponse = MyApi['/pets/{petId}']['get']['responses']['404'];
// => void

// Get the type for path parameters
type PathParams = MyApi['/pets/{petId}']['get']['parameters']['path'];
// => type PathParams = { readonly petId: number; }

// Use it in your API client
async function getPetById(params: PathParams): Promise<Pet> {
  const response = await fetch(`/pets/${params.petId}`);
  if (!response.ok) {
    if (response.status === 404) {
      // The type is `void`, so we don't expect a body
      throw new Error('Pet not found');
    }
    throw new Error('An unknown error occurred');
  }
  const data: Pet = await response.json();
  return data;
}
```

## Utility Mappers

While SwaggerMapper is the main entry point, the package also exposes the underlying utility types if you need to map only a specific part of a schema.

- ResponseMapper<S, T>: Maps an OpenAPI responses object.
- RequestBodyMapper<S, T>: Maps an OpenAPI requestBody object.
- ParametersMapper<S, T>: Maps an OpenAPI parameters array.
- BodyMapper<S, T>: Maps a single OpenAPI schema object to its corresponding TypeScript type.

## How It Works

This library contains no runtime code. It leverages advanced TypeScript features like Conditional Types, the infer keyword, and Mapped Types with Key Remapping to recursively parse the structure of your schema object at the type level. The as const assertion provides the necessary literal type information for this process to be possible.

## Contributing
This project is a self-contained type utility. If you have suggestions for improvements or find edge cases, please consider sharing them.

## License

MIT