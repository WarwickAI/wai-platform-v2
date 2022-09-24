import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import { authExchange } from "@urql/exchange-auth";
import {
  CreateProjectMutation,
  ProjectsQuery,
  ProjectsDocument,
  LogoutMutation,
  MeQuery,
  MeDocument,
  VerifyLoginMutation,
  AllProjectsQuery,
  AllProjectsDocument,
  EditProjectMutation,
  TalksDocument,
  TalksQuery,
  EditTalkMutation,
  AllTalksQuery,
  AllTalksDocument,
  CreateTalkMutation,
  JoinProjectMutation,
  RemoveUserFromProjectMutation,
  JoinTalkMutation,
  JoinTutorialMutation,
  JoinCourseMutation,
  CreateCourseMutation,
  CoursesQuery,
  CoursesDocument,
  AllCoursesQuery,
  AllCoursesDocument,
  EditCourseMutation,
  AllTutorialsDocument,
  AllTutorialsQuery,
  CreateTutorialMutation,
  EditTutorialMutation,
  TutorialsDocument,
  TutorialsQuery,
  RemoveUserFromTalkMutation,
  RemoveUserFromCourseMutation,
  RemoveUserFromTutorialMutation,
  RegularProjectFragment,
  RegularTalkFragment,
  RegularCourseFragment,
  RegularTutorialFragment,
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
            createProject: (_result, args, cache, info) => {
              betterUpdateQuery<CreateProjectMutation, ProjectsQuery>(
                cache,
                { query: ProjectsDocument },
                _result,
                (result, query) => {
                  if (!result.createProject.project) {
                    return query;
                  } else {
                    if (result.createProject.project.display) {
                      // Display set to true, add
                      query.projects.push(
                        result.createProject.project as RegularProjectFragment
                      );
                    }
                    return query;
                  }
                }
              );
              betterUpdateQuery<CreateProjectMutation, AllProjectsQuery>(
                cache,
                { query: AllProjectsDocument },
                _result,
                (result, query) => {
                  if (!result.createProject.project) {
                    return query;
                  } else {
                    query.allProjects.push(
                      result.createProject.project as RegularProjectFragment
                    );
                    return query;
                  }
                }
              );
            },

            editProject: (_result, args, cache, info) => {
              betterUpdateQuery<EditProjectMutation, ProjectsQuery>(
                cache,
                { query: ProjectsDocument },
                _result,
                (result, query) => {
                  if (!result.editProject.project) {
                    return query;
                  } else {
                    const index = query.projects.findIndex(
                      (val) => val.id === result.editProject.project?.id
                    );
                    if (index === -1 && result.editProject.project.display) {
                      // Display set to true, add to list.
                      query.projects.push(
                        result.editProject.project as RegularProjectFragment
                      );
                    } else if (
                      index !== -1 &&
                      !result.editProject.project.display
                    ) {
                      // Display set to false, remove from list
                      query.projects.splice(index, 1);
                    } else if (index !== -1) {
                      // Update
                      query.projects[index] = result.editProject
                        .project as RegularProjectFragment;
                    }
                    return query;
                  }
                }
              );
              betterUpdateQuery<EditProjectMutation, AllProjectsQuery>(
                cache,
                { query: AllProjectsDocument },
                _result,
                (result, query) => {
                  if (!result.editProject.project) {
                    return query;
                  } else {
                    const index = query.allProjects.findIndex(
                      (val) => val.id === result.editProject.project?.id
                    );
                    if (index !== -1) {
                      // Update
                      query.allProjects[index] = result.editProject
                        .project as RegularProjectFragment;
                    }
                    return query;
                  }
                }
              );
            },

            createTalk: (_result, args, cache, info) => {
              betterUpdateQuery<CreateTalkMutation, TalksQuery>(
                cache,
                { query: TalksDocument },
                _result,
                (result, query) => {
                  if (!result.createTalk.talk) {
                    return query;
                  } else {
                    if (result.createTalk.talk.display) {
                      // Display set to true, add
                      query.talks.push(
                        result.createTalk.talk as RegularTalkFragment
                      );
                    }
                    return query;
                  }
                }
              );
              betterUpdateQuery<CreateTalkMutation, AllTalksQuery>(
                cache,
                { query: AllTalksDocument },
                _result,
                (result, query) => {
                  if (!result.createTalk.talk) {
                    return query;
                  } else {
                    query.allTalks.push(
                      result.createTalk.talk as RegularTalkFragment
                    );
                    return query;
                  }
                }
              );
            },

            editTalk: (_result, args, cache, info) => {
              betterUpdateQuery<EditTalkMutation, TalksQuery>(
                cache,
                { query: TalksDocument },
                _result,
                (result, query) => {
                  if (!result.editTalk.talk) {
                    return query;
                  } else {
                    const index = query.talks.findIndex(
                      (val) => val.id === result.editTalk.talk?.id
                    );
                    if (index === -1 && result.editTalk.talk.display) {
                      // Display set to true, add to list.
                      query.talks.push(
                        result.editTalk.talk as RegularTalkFragment
                      );
                    } else if (index !== -1 && !result.editTalk.talk.display) {
                      // Display set to false, remove from list
                      query.talks.splice(index, 1);
                    } else if (index !== -1) {
                      // Update
                      query.talks[index] = result.editTalk
                        .talk as RegularTalkFragment;
                    }
                    return query;
                  }
                }
              );
              betterUpdateQuery<EditTalkMutation, AllTalksQuery>(
                cache,
                { query: AllTalksDocument },
                _result,
                (result, query) => {
                  if (!result.editTalk.talk) {
                    return query;
                  } else {
                    const index = query.allTalks.findIndex(
                      (val) => val.id === result.editTalk.talk?.id
                    );
                    if (index !== -1) {
                      // Update
                      query.allTalks[index] = result.editTalk
                        .talk as RegularTalkFragment;
                    }
                    return query;
                  }
                }
              );
            },

            createCourse: (_result, args, cache, info) => {
              betterUpdateQuery<CreateCourseMutation, CoursesQuery>(
                cache,
                { query: CoursesDocument },
                _result,
                (result, query) => {
                  if (!result.createCourse.course) {
                    return query;
                  } else {
                    if (result.createCourse.course.display) {
                      // Display set to true, add
                      query.courses.push(
                        result.createCourse.course as RegularCourseFragment
                      );
                    }
                    return query;
                  }
                }
              );
              betterUpdateQuery<CreateCourseMutation, AllCoursesQuery>(
                cache,
                { query: AllCoursesDocument },
                _result,
                (result, query) => {
                  if (!result.createCourse.course) {
                    return query;
                  } else {
                    query.allCourses.push(
                      result.createCourse.course as RegularCourseFragment
                    );
                    return query;
                  }
                }
              );
            },

            editCourse: (_result, args, cache, info) => {
              betterUpdateQuery<EditCourseMutation, CoursesQuery>(
                cache,
                { query: CoursesDocument },
                _result,
                (result, query) => {
                  if (!result.editCourse.course) {
                    return query;
                  } else {
                    const index = query.courses.findIndex(
                      (val) => val.id === result.editCourse.course?.id
                    );
                    if (index === -1 && result.editCourse.course.display) {
                      // Display set to true, add to list.
                      query.courses.push(
                        result.editCourse.course as RegularCourseFragment
                      );
                    } else if (
                      index !== -1 &&
                      !result.editCourse.course.display
                    ) {
                      // Display set to false, remove from list
                      query.courses.splice(index, 1);
                    } else if (index !== -1) {
                      // Update
                      query.courses[index] = result.editCourse
                        .course as RegularCourseFragment;
                    }
                    return query;
                  }
                }
              );
              betterUpdateQuery<EditCourseMutation, AllCoursesQuery>(
                cache,
                { query: AllCoursesDocument },
                _result,
                (result, query) => {
                  if (!result.editCourse.course) {
                    return query;
                  } else {
                    const index = query.allCourses.findIndex(
                      (val) => val.id === result.editCourse.course?.id
                    );
                    if (index !== -1) {
                      // Update
                      query.allCourses[index] = result.editCourse
                        .course as RegularCourseFragment;
                    }
                    return query;
                  }
                }
              );
            },

            createTutorial: (_result, args, cache, info) => {
              betterUpdateQuery<CreateTutorialMutation, TutorialsQuery>(
                cache,
                { query: TutorialsDocument },
                _result,
                (result, query) => {
                  if (!result.createTutorial.tutorial) {
                    return query;
                  } else {
                    if (result.createTutorial.tutorial.display) {
                      // Display set to true, add
                      query.tutorials.push(
                        result.createTutorial
                          .tutorial as RegularTutorialFragment
                      );
                    }
                    return query;
                  }
                }
              );
              betterUpdateQuery<CreateTutorialMutation, AllTutorialsQuery>(
                cache,
                { query: AllTutorialsDocument },
                _result,
                (result, query) => {
                  if (!result.createTutorial.tutorial) {
                    return query;
                  } else {
                    query.allTutorials.push(
                      result.createTutorial.tutorial as RegularTutorialFragment
                    );
                    return query;
                  }
                }
              );
            },

            editTutorial: (_result, args, cache, info) => {
              betterUpdateQuery<EditTutorialMutation, TutorialsQuery>(
                cache,
                { query: TutorialsDocument },
                _result,
                (result, query) => {
                  if (!result.editTutorial.tutorial) {
                    return query;
                  } else {
                    const index = query.tutorials.findIndex(
                      (val) => val.id === result.editTutorial.tutorial?.id
                    );
                    if (index === -1 && result.editTutorial.tutorial.display) {
                      // Display set to true, add to list.
                      query.tutorials.push(
                        result.editTutorial.tutorial as RegularTutorialFragment
                      );
                    } else if (
                      index !== -1 &&
                      !result.editTutorial.tutorial.display
                    ) {
                      // Display set to false, remove from list
                      query.tutorials.splice(index, 1);
                    } else if (index !== -1) {
                      // Update
                      query.tutorials[index] = result.editTutorial
                        .tutorial as RegularTutorialFragment;
                    }
                    return query;
                  }
                }
              );
              betterUpdateQuery<EditTutorialMutation, AllTutorialsQuery>(
                cache,
                { query: AllTutorialsDocument },
                _result,
                (result, query) => {
                  if (!result.editTutorial.tutorial) {
                    return query;
                  } else {
                    const index = query.allTutorials.findIndex(
                      (val) => val.id === result.editTutorial.tutorial?.id
                    );
                    if (index !== -1) {
                      // Update
                      query.allTutorials[index] = result.editTutorial
                        .tutorial as RegularTutorialFragment;
                    }
                    return query;
                  }
                }
              );
            },

            joinProject: (_result, args, cache, info) => {
              betterUpdateQuery<JoinProjectMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.joinProject) {
                    // Successfully joined, update projects in me
                    query.me?.projects.push({
                      id: args.projectId as number,
                      shortName: args.shortName as string,
                    });
                  }
                  return query;
                }
              );
            },

            joinTalk: (_result, args, cache, info) => {
              betterUpdateQuery<JoinTalkMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.joinTalk) {
                    // Successfully joined, update projects in me
                    query.me?.talks.push({
                      id: args.talkId as number,
                      shortName: args.shortName as string,
                    });
                  }
                  return query;
                }
              );
            },

            joinCourse: (_result, args, cache, info) => {
              betterUpdateQuery<JoinCourseMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.joinCourse) {
                    // Successfully joined, update projects in me
                    query.me?.courses.push({
                      id: args.courseId as number,
                      shortName: args.shortName as string,
                    });
                  }
                  return query;
                }
              );
            },

            joinTutorial: (_result, args, cache, info) => {
              betterUpdateQuery<JoinTutorialMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.joinTutorial) {
                    // Successfully joined, update projects in me
                    query.me?.tutorials.push({
                      id: args.tutorialId as number,
                      shortName: args.shortName as string,
                    });
                  }
                  return query;
                }
              );
            },

            removeUserFromProject: (_result, args, cache, info) => {
              betterUpdateQuery<RemoveUserFromProjectMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.removeUserFromProject) {
                    // Successfully removed, update projects in me
                    query.me?.projects.splice(
                      query.me.projects.findIndex(
                        (proj) => proj.shortName === (args.shortName as string)
                      ),
                      1
                    );
                  }
                  return query;
                }
              );
            },

            removeUserFromTalk: (_result, args, cache, info) => {
              betterUpdateQuery<RemoveUserFromTalkMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.removeUserFromTalk) {
                    // Successfully removed, update projects in me
                    query.me?.talks.splice(
                      query.me.talks.findIndex(
                        (talk) => talk.shortName === (args.shortName as string)
                      ),
                      1
                    );
                  }
                  return query;
                }
              );
            },

            removeUserFromCourse: (_result, args, cache, info) => {
              betterUpdateQuery<RemoveUserFromCourseMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.removeUserFromCourse) {
                    // Successfully removed, update projects in me
                    query.me?.courses.splice(
                      query.me.courses.findIndex(
                        (course) =>
                          course.shortName === (args.shortName as string)
                      ),
                      1
                    );
                  }
                  return query;
                }
              );
            },

            removeUserFromTutorial: (_result, args, cache, info) => {
              betterUpdateQuery<RemoveUserFromTutorialMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.removeUserFromTutorial) {
                    // Successfully removed, update projects in me
                    query.me?.tutorials.splice(
                      query.me.tutorials.findIndex(
                        (tutorial) =>
                          tutorial.shortName === (args.shortName as string)
                      ),
                      1
                    );
                  }
                  return query;
                }
              );
            },

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
