import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
  // Add functions here, can be queries or mutatations

  @Query(() => String)  // Defining query type
  hello() {
    return "bye";
  }
}
