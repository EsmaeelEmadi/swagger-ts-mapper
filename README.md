# Swagger Type Mapper 🔄

This project is a TypeScript type utility designed to dynamically generate TypeScript types from Swagger/OpenAPI JSON schemas. It's a compile-time solution that enhances type safety and developer experience when working with API definitions.

## ✨ Overview

The Swagger Type Mapper is a simple TypeScript type library that provides a robust solution for converting Swagger/OpenAPI JSON schema definitions into corresponding TypeScript types. This allows developers to gain strong type-checking for their API request and response bodies directly from their API documentation, eliminating manual type declaration and reducing potential runtime errors.

## 🚀 Features

- Schema-to-Type Conversion: Automatically infers TypeScript types from complex Swagger/OpenAPI JSON schema structures.
- Handles Various Schema Types: Supports object, string, number, integer, boolean, array, null, oneOf, allOf, and anyOf schema definitions.
- Required Property Handling: Correctly distinguishes between required and optional properties based on the required array in the schema.
- additionalProperties Support: Manages additionalProperties definitions, allowing for flexible object structures.
- Enum Type Generation: Creates literal union types for string and number enums defined in the schema.
- File/Binary Type Mapping: Maps format: "binary" to the TypeScript File type, useful for file uploads.
- Nullable Type Support: Integrates null into types where nullable: true is specified.

## 📦 Installation 

> [!NOTE]  
> The npm package will be released soon.

## 💡 Usage

The core of this project is the TBodyMapper type. You can use it by importing it and applying it to your Swagger/OpenAPI schema objects.

Example: Mapping a Simple Object Schema
Suppose you have a Swagger schema like this for a user object:

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string",
      "nullable": true
    },
    "status": {
      "type": "string",
      "enum": ["active", "inactive", "pending"]
    }
  },
  "required": ["id", "name"]
}
```

You can define a TypeScript type for it using TBodyMapper:

```ts
import { TBodyMapper } from './path/to/swagger-type-mapper'; // Assuming you saved the code there

type UserSchema = {
  type: "object";
  properties: {
    id: { type: "integer"; format: "int64" };
    name: { type: "string" };
    email: { type: "string"; nullable: true };
    status: { type: "string"; enum: ["active", "inactive", "pending"] };
  };
  required: ["id", "name"];
};

type User = TBodyMapper<UserSchema>;

/*
// User type will resolve to:
type User = {
  id: number;
  name: string;
  email?: string | null;
  status?: "active" | "inactive" | "pending";
}
*/
```

Example: Handling oneOf and allOf
The mapper also correctly handles complex schema compositions:

```ts
type PetSchema = {
  oneOf: [
    { type: "object"; properties: { dogName: { type: "string" } } },
    { type: "object"; properties: { catName: { type: "string" } } }
  ]
};

type Pet = TBodyMapper<PetSchema>; // Pet will be { dogName?: string } | { catName?: string }

type AddressSchema = {
  allOf: [
    { type: "object"; properties: { street: { type: "string" } } },
    { type: "object"; properties: { city: { type: "string" } } }
  ]
};

type Address = TBodyMapper<AddressSchema>; // Address will be { street?: string } & { city?: string }
```

## 🛠️ How it Works (Technical Details)

The TBodyMapper type recursively traverses the TSchema definition, applying conditional types to map Swagger/OpenAPI schema properties to their corresponding TypeScript equivalents:

**TProperties**: A utility type for object properties.

**TFlatten**: Flattens intersection types for better readability.

**TMutable**: Makes all properties of an object mutable (removes readonly).

**TSchema**: Defines the expected structure of a Swagger/OpenAPI schema object.

**UnionToIntersection**: A standard TypeScript utility to convert a union of types into an intersection of types, used for allOf schemas.

**Conditional Type Logic**: The TBodyMapper itself uses a series of extends clauses to check the type, format, properties, items, enum, oneOf, allOf, and anyOf fields within the TSchema to determine the correct TypeScript type.

## 🤝 Contributing
This project is a self-contained type utility. If you have suggestions for improvements or find edge cases, please consider sharing them.

