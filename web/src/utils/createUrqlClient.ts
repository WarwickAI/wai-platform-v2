import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import { authExchange } from "@urql/exchange-auth";
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  VerifyLoginMutation,
  GetElementQuery,
  CreateElementMutation,
  GetElementDocument,
  RemoveElementMutation,
  EditElementDataMutation,
  UpdatePermissionsMutation,
  InheritDatabaseAttributesMutation,
  AddUserToGroupMutation,
  GetGroupsWithUsersQuery,
  GetGroupsWithUsersDocument,
  RemoveUserFromGroupMutation,
  CreateGroupMutation,
  DeleteGroupMutation,
  GetElementsQuery,
  GetElementsDocument,
  EditElementRouteMutation,
  HandleActionMutation,
  CreateTagMutation,
  GetTagsQuery,
  GetTagsDocument,
  CreateBadgeMutation,
  GetBadgesQuery,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import {
  getAuth,
  addAuthToOperation,
  willAuthError,
  didAuthError,
} from "./urqlAuthExchange";
import { NextUrqlClientConfig } from "next-urql";
import { Element } from "./config";

export const createUrqlClient: NextUrqlClientConfig = (ssrExchange: any) => {
  return {
    url: `${process.env.NEXT_PUBLIC_API_URL as string}/graphql`,
    fetchOptions: { credentials: "include" as const },
    exchanges: [
      dedupExchange,
      authExchange({
        getAuth,
        addAuthToOperation,
        willAuthError,
        didAuthError,
      }),
      cacheExchange({
        updates: {
          Mutation: {
            verifyLogin: (_result, args, cache, info) => {
              // me query make return null
              betterUpdateQuery<VerifyLoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (!result.verifyLogin) {
                    return query;
                  } else {
                    return {
                      me: result.verifyLogin,
                    };
                  }
                }
              );
            },

            logout: (_result, args, cache, info) => {
              // me query make return null
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },

            removeElement: (_result, args, cache, info) => {
              const res = _result as RemoveElementMutation;
              if (!res.removeElement) {
                return;
              }
              const removedElement = res.removeElement;
              const elementId = args.elementId as number;

              removeElement(cache, removedElement as Element<any>, elementId);
            },

            // Need to add database updates as well
            createElement: (_result, args, cache, info) => {
              const res = _result as CreateElementMutation;
              if (!res.createElement) {
                return;
              }
              const newElement = res.createElement;

              addElement(cache, newElement as Element<any>);
            },

            editElementData: (_result, args, cache, info) => {
              const res = _result as EditElementDataMutation;
              if (!res.editElementData) {
                return;
              }
              const newElement = res.editElementData;
              const elementId = newElement.id;

              // Update element
              updateElement(cache, elementId, newElement as Element<any>);
            },
            updatePermissions: (_result, args, cache, info) => {
              const res = _result as UpdatePermissionsMutation;
              if (!res.updatePermissions) {
                return;
              }
              const newElement = res.updatePermissions;
              const elementId = newElement.id;

              // Update element
              updateElement(cache, elementId, newElement as Element<any>);
            },
            editElementRoute: (_result, args, cache, info) => {
              const res = _result as EditElementRouteMutation;
              if (!res.editElementRoute) {
                return;
              }
              const newElement = res.editElementRoute;
              const elementId = newElement.id;

              // Update element
              updateElement(cache, elementId, newElement as Element<any>);
            },
            handleAction: (_result, args, cache, info) => {
              const res = _result as HandleActionMutation;
              if (!res.handleAction) {
                return;
              }
              const newElement = res.handleAction;
              const elementId = newElement.id;

              // Update element
              addElement(cache, newElement as Element<any>);
            },
            inheritDatabaseAttributes: (_result, args, cache, info) => {
              const res = _result as InheritDatabaseAttributesMutation;
              if (!res.inheritDatabaseAttributes) {
                return;
              }
              const newElement = res.inheritDatabaseAttributes;
              const elementId = newElement.id;

              // Update element
              updateElement(cache, elementId, newElement as Element<any>);
            },
            addUserToGroup: (_result, args, cache, info) => {
              const res = _result as AddUserToGroupMutation;
              const groupId = res.addUserToGroup.id;
              const users = res.addUserToGroup.users;
              betterUpdateQuery<
                AddUserToGroupMutation,
                GetGroupsWithUsersQuery
              >(
                cache,
                { query: GetGroupsWithUsersDocument },
                _result,
                (result, query) => {
                  const groupIndex = query.groupsWithUsers.findIndex(
                    (val) => val.id === groupId
                  );
                  if (groupIndex === -1) {
                    return query;
                  }
                  query.groupsWithUsers[groupIndex].users = users;
                  return query;
                }
              );
            },
            removeUserFromGroup: (_result, args, cache, info) => {
              const res = _result as RemoveUserFromGroupMutation;
              const groupId = res.removeUserFromGroup.id;
              const users = res.removeUserFromGroup.users;
              betterUpdateQuery<
                RemoveUserFromGroupMutation,
                GetGroupsWithUsersQuery
              >(
                cache,
                { query: GetGroupsWithUsersDocument },
                _result,
                (result, query) => {
                  const groupIndex = query.groupsWithUsers.findIndex(
                    (val) => val.id === groupId
                  );
                  if (groupIndex === -1) {
                    return query;
                  }
                  query.groupsWithUsers[groupIndex].users = users;
                  return query;
                }
              );
            },
            createGroup: (_result, args, cache, info) => {
              const res = _result as CreateGroupMutation;
              const newGroup = res.createGroup;
              betterUpdateQuery<CreateGroupMutation, GetGroupsWithUsersQuery>(
                cache,
                { query: GetGroupsWithUsersDocument },
                _result,
                (result, query) => {
                  query.groupsWithUsers.push(newGroup);
                  return query;
                }
              );
            },
            deleteGroup: (_result, args, cache, info) => {
              const res = _result as DeleteGroupMutation;
              const deletedGroup = res.deleteGroup;
              betterUpdateQuery<DeleteGroupMutation, GetGroupsWithUsersQuery>(
                cache,
                { query: GetGroupsWithUsersDocument },
                _result,
                (result, query) => {
                  const groupIndex = query.groupsWithUsers.findIndex(
                    (val) => val.name === deletedGroup.name
                  );
                  if (groupIndex !== -1) {
                    query.groupsWithUsers.splice(groupIndex, 1);
                  }
                  return query;
                }
              );
            },
            createTag: (_result, args, cache, info) => {
              const res = _result as CreateTagMutation;

              betterUpdateQuery<CreateTagMutation, GetTagsQuery>(
                cache,
                { query: GetTagsDocument },
                _result,
                (result, query) => {
                  query.getTags.push(result.createTag);
                  return query;
                }
              );
            },
            createBadge: (_result, args, cache, info) => {
              const res = _result as CreateBadgeMutation;

              betterUpdateQuery<CreateBadgeMutation, GetBadgesQuery>(
                cache,
                { query: GetTagsDocument },
                _result,
                (result, query) => {
                  query.getBadges.push(result.createBadge);
                  return query;
                }
              );
            },
          },
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  };
};

const updateElement = (
  cache: Cache,
  elementId: number,
  elementData: Partial<Element<any>>
) => {
  // Ensure we don't update the children, createdBy, createdAt, parent
  const fieldsToRemove = ["children", "createdBy", "createdAt", "parent"];
  const filteredElementData = Object.keys(elementData).reduce((acc, key) => {
    if (!fieldsToRemove.includes(key)) {
      acc[key as keyof Element<any>] = elementData[key as keyof Element<any>];
    }
    return acc;
  }, {} as Partial<Element<any>>);

  // Get any queries that use `getElements`
  const fields = cache
    .inspectFields("Query")
    .filter((field) => field.fieldName === "getElements");

  // If these queries contain the element we are updating, update them
  fields.forEach((field) => {
    const args = field.arguments ? field.arguments : undefined;
    betterUpdateQuery<Partial<Element<any>>, GetElementsQuery>(
      cache,
      { query: GetElementsDocument, variables: args },
      filteredElementData,
      (result, query) => {
        // Find the element in the query, and update it
        const elementIndex = query.getElements.findIndex(
          (val) => val.id === elementId
        );

        if (elementIndex !== -1) {
          // Don't update children, or the ID
          query.getElements[elementIndex] = {
            ...query.getElements[elementIndex],
            ...result,
          };
        }

        // Find any children in any of the elements, and update them
        // if they match the element we are updating
        query.getElements.forEach((element, index) => {
          const childIndex = element.children.findIndex(
            (val) => val.id === elementId
          );

          if (childIndex !== -1) {
            query.getElements[index].children[childIndex] = {
              ...query.getElements[index].children[childIndex],
              ...result,
            };
          }
        });

        return query;
      }
    );
  });

  // Do the same for any queries that use `getElement`
  const fields2 = cache
    .inspectFields("Query")
    .filter((field) => field.fieldName === "getElement");

  fields2.forEach((field) => {
    const args = field.arguments ? field.arguments : undefined;
    betterUpdateQuery<Partial<Element<any>>, GetElementQuery>(
      cache,
      { query: GetElementDocument, variables: args },
      filteredElementData,
      (result, query) => {
        // If this `getElement` query is for the one we are updating, update it
        if (query.getElement.id === elementId) {
          // Don't update children, or the ID
          query.getElement = { ...query.getElement, ...result };
        }

        // Find any children and update them if they match the element we are updating
        const childIndex = query.getElement.children.findIndex(
          (val) => val.id === elementId
        );

        if (childIndex !== -1) {
          query.getElement.children[childIndex] = {
            ...query.getElement.children[childIndex],
            ...result,
          };
        }

        return query;
      }
    );
  });
};

const addElement = (cache: Cache, newElement: Element<any>) => {
  // Get any queries that use `getElements`
  const fields = cache
    .inspectFields("Query")
    .filter((field) => field.fieldName === "getElements");

  // If these queries contain the element we are updating, update them
  fields.forEach((field) => {
    const args = field.arguments ? field.arguments : undefined;
    betterUpdateQuery<Element<any>, GetElementsQuery>(
      cache,
      { query: GetElementsDocument, variables: args },
      newElement,
      (result, query) => {
        // If we aren't filtering by type, or the type filter matches the new element
        // continue...
        if (!args?.type || args.type === result.type) {
          // If we aren't filtering by parentId, or the parentId filter matches the new element
          // continue...
          if (!args?.parentId || args.parentId === result.parent?.id) {
            // Check that its not already there
            const elementIndex = query.getElements.findIndex(
              (val) => val.id === result.id
            );

            if (elementIndex === -1) {
              // Add the new element to the query
              query.getElements.push(result);
            }
          }
        }

        // If the new element has a parent, and the parent is in the query, add the new element
        // to the parent's children, and the query is getting children
        if (result.parent && args?.children) {
          const parentIndex = query.getElements.findIndex(
            (val) => val.id === result.parent?.id
          );
          if (parentIndex !== -1) {
            // If we aren't filtering by type, or the type filter matches the new element
            // continue...
            if (!args?.type) {
              // To-Do: should also check that the type filter match here, but is too complex
              // Add the new element to the parent
              if (!args.parent || args.parent === result.parent?.id) {
                // Check that its not already there
                const elementIndex = query.getElements[
                  parentIndex
                ].children.findIndex((val) => val.id === result.id);

                if (elementIndex === -1) {
                  query.getElements[parentIndex].children.push(result);
                }
              }
            }
          }
        }

        return query;
      }
    );
  });

  // Do the same for any queries that use `getElement`
  const fields2 = cache
    .inspectFields("Query")
    .filter((field) => field.fieldName === "getElement");

  fields2.forEach((field) => {
    const args = field.arguments ? field.arguments : undefined;
    betterUpdateQuery<Element<any>, GetElementQuery>(
      cache,
      { query: GetElementDocument, variables: args },
      newElement,
      (result, query) => {
        // If the query element ID argument matches the new element, add the new element
        if (args?.elementId === result.id || args?.route === result.route) {
          query.getElement = result;
        }

        // If the query element ID argument matches the new element's parent, add the new element
        // to the parent's children
        if (
          (args?.elementId === result.parent?.id && result.parent) ||
          (args?.route === result.parent?.route && result.parent?.route)
        ) {
          // Check that it isn't already in the children
          const childIndex = query.getElement.children.findIndex(
            (val) => val.id === result.id
          );
          if (childIndex === -1) {
            query.getElement.children.push(result);
          }
        }

        return query;
      }
    );
  });
};

const removeElement = (
  cache: Cache,
  elementData: Partial<Element<any>>,
  elementId: number
) => {
  // Important to note here, that `elementData` will not contain the ID of the element
  // since it has been removed, use the argument instead
  // Get any queries that use `getElements`
  const fields = cache
    .inspectFields("Query")
    .filter((field) => field.fieldName === "getElements");

  // If these queries contain the element we are updating, update them
  fields.forEach((field) => {
    const args = field.arguments ? field.arguments : undefined;
    betterUpdateQuery<Partial<Element<any>>, GetElementsQuery>(
      cache,
      { query: GetElementsDocument, variables: args },
      elementData,
      (result, query) => {
        // If we aren't filtering by type, or the type filter matches the removed element
        // continue...
        if (!args?.type || args.type === result.type) {
          // If we aren't filtering by parentId, or the parentId filter matches the removed element
          // continue...
          if (!args?.parentId || args.parentId === result.parent?.id) {
            // Remove the element from the query
            const index = query.getElements.findIndex(
              (element) => element.id === elementId
            );

            if (index !== -1) {
              query.getElements.splice(index, 1);
            }
          }
        }

        // If the removed element has a parent, and the parent is in the query, remove the new element
        // from the parent's children, and the query is getting children
        if (result.parent && args?.children) {
          const parentIndex = query.getElements.findIndex(
            (val) => val.id === result.parent?.id
          );
          if (parentIndex !== -1) {
            // If we aren't filtering by type, or the type filter matches the new element
            // continue...
            if (!args?.type) {
              // To-Do: should also check that the type filter match here, but is too complex
              // Remove the element from the parent's children
              if (!args.parent || args.parent === result.parent?.id) {
                const index = query.getElements[parentIndex].children.findIndex(
                  (child) => child.id === elementId
                );

                if (index !== -1) {
                  query.getElements[parentIndex].children.splice(index, 1);
                }
              }
            }
          }
        }

        return query;
      }
    );
  });

  // Do the same for any queries that use `getElement`
  const fields2 = cache
    .inspectFields("Query")
    .filter((field) => field.fieldName === "getElement");

  fields2.forEach((field) => {
    const args = field.arguments ? field.arguments : undefined;
    betterUpdateQuery<Element<any>, GetElementQuery>(
      cache,
      { query: GetElementDocument, variables: args },
      elementData,
      (result, query) => {
        // If the query element ID argument matches the new element, invalidate the cache for the element
        if (args?.elementId === elementId) {
          cache.invalidate("Query", "getElement", args);
        }

        // If the query element ID argument matches the removed element's parent, remove the element
        // from the parent's children
        if (args?.elementId === result.parent?.id) {
          const index = query.getElement.children.findIndex(
            (child) => child.id === elementId
          );

          if (index !== -1) {
            query.getElement.children.splice(index, 1);
          }
        }

        return query;
      }
    );
  });
};
