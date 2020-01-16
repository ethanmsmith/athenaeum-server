
import { gql } from "apollo-server";

const typeDefs = gql`
  # Your schema will go here
  type Query {
      collections: [Collection]
      collection(id: ID!): Collection
      me: User
  };

  type Collection {
      things: [Thing]
  }

  type Thing {
      id: ID!
      title: String
      author: Author
      description: string
      isBooked: Boolean!
  }

  type Book {
      id: ID!
      name: String
      type: String
  }

  type User {
      id: ID!
      email: String
      name: String
  }

  type Author {
      fullName: String,
      firstName: String,
      lastName: String,
  }

  type Mutation {
      addBook(book: Book): IGraphqlResponse

      login(email: String): String
  }

  interface IGraphqlResponse {
      status: Number,
      payload: Object
  }
`;

export default typeDefs;
