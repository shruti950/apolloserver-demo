const { ApolloServer, gql } = require('apollo-server');

module.exports = gql `
type Book {
  id : ID!
  title : String!
  author : String!
}
enum postType{
  FOOD
  ANIMAL
  CRIME
  SURGERY
}
type Post {
  id : ID!
  title : String!
  userId : Int!
  body : String!
  type : postType
}

type Author {
  name : String!
  book : [Book]
}

type Pagination{
  pageCount : Int
  post : [Post]
}
type Payment {
  currency : String
  amount : Int
  token : String
  email : String
  name : String
}

type Query {
  books : [Book]
  posts(offset : Int) : Pagination
  author : Author
  book(id : ID!) : Book
  post(id : ID!) : Post
  payment : [Payment]
}

input BookInput {
  title : String!
  author : String!
}

input PostInput {
  userId : Int
  title : String
  body : String
  type : postType
}

input payment {
  currency : String
  amount : Int
  token : String
  email : String
  name : String
}
type Mutation {
  addBook(bookInput : BookInput) : Book
  addPost(postInput : PostInput) : Post
  updatePost(id : ID!,postInput : PostInput):Post
  deletePost(id : ID!) : Post
  addPayment(paymentInput : payment) : Payment
}
`

