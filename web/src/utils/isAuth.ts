import { RegularUserFragment } from "../generated/graphql";

export const isSuper = (user: RegularUserFragment) => {
  if (
    user.email != "Edward.Upton@warwick.ac.uk" &&
    user.email != "Oliver.Jaffe@warwick.ac.uk" &&
    user.email != "Joe.Hewett@warwick.ac.uk"
  ) {
    return false;
  }
  return true;
};
