# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

type User {
  id: ID!
  email: String!
  password: String!
  firstName: String!
}

type UserCreateOutput {
  user: User!
}

type UserUpdateOutput {
  user: User!
}

type UserDeleteOutput {
  userId: ID!
}

type Query {
  sayHello: String!
}

type Mutation {
  createUser(input: UserCreateInput!): UserCreateOutput!
  updateUser(userId: ID!, input: UserUpdateInput!): UserUpdateOutput!
  deleteUser(userId: ID!): UserDeleteOutput!
}

input UserCreateInput {
  email: String!
  password: String!
  firstName: String!
}

input UserUpdateInput {
  email: String!
  password: String!
  firstName: String!
}