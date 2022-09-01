import { Group, RegularUserFragment, User } from "../generated/graphql";

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

export const checkPermissions = (groups: Group[], user: User | undefined) => {
  for (const group of groups) {
    if (group.name === "All") {
      return true;
    }
  }
  if (!user) {
    return false;
  }
  for (const userGroup of user.groups) {
    if (userGroup.name === "Admin") {
      return true;
    }
  }
  for (const group of groups) {
    for (const userGroup of user.groups) {
      if (userGroup.id === group.id) {
        return true;
      }
    }
  }
  return false;
};
