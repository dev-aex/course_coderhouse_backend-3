# Adopme

## Description

AdoptMe is a Node.js and Express-powered platform designed to streamline pet adoptions through a robust REST API.
It provides comprehensive tools for managing adoptable pets, user profiles, and adoption procedures.

# Getting Started

```
# Install dependencies
$ npm install

# Run the application
$ npm run start
```

# Docker image link

https://hub.docker.com/r/aaex/coderhouse_final_back-3

# Endpoints

```
# Docs
/api/docs

# Mocked Data
  - Users
  GET = /api/mocks/mockingusers/:users

  - Pets
  GET = /api/mocks/mockingpets/:pets

  - Users, pets and save it to DB
  POST = /api/mocks/generatemockingdata/:users/:pets

# Users
  - Get all users
  GET = /api/users/

  - Get one user by ID
  GET = /api/users/:uid

  - Update one user by ID
  PUT = /api/users/:uid

  - Delete one user by ID
  DELETE = /api/users/:uid

# Pets
  - Get all pets
  GET = /api/pets/

  - Get one pet by ID
  GET = /api/pets/:pid

  - Update one pet by ID
  PUT = /api/pets/:pid

  - Delete one pet by ID
  DELETE = /api/pets/:pid

# Adoptions
  - Get all adoptions
  GET = /api/adoptions/

  - Get one adoption by ID
  GET = /api/adoptions/:aid

  - Update one adoption by ID
  POST = /api/adoptions/:aid

```

# Course information

- Class: **70375**
- Instructor: **Alejandro Huertas**
- Tutor: **Marcos Peirone**
