import { cacheExchange, Scalar } from "@urql/exchange-graphcache";
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
  EditElementPropsMutation,
  GetElementQuery,
  CreateElementMutation,
  GetElementDocument,
  RemoveElementMutation,
  ElementType,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import {
  getAuth,
  addAuthToOperation,
  willAuthError,
  didAuthError,
} from "./urqlAuthExchange";

export const createUrqlClient = (ssrExchange: any) => {
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
              const elementId = args.elementId;
              console.log("REMOVING:", elementId);
              betterUpdateQuery<RemoveElementMutation, GetElementQuery>(
                cache,
                { query: GetElementDocument, variables: { elementId } },
                _result,
                (result, query) => {
                  console.log("First:", result);
                  if (!result.removeElement) {
                    return query;
                  } else {
                    if (result.removeElement.parent) {
                      betterUpdateQuery<RemoveElementMutation, GetElementQuery>(
                        cache,
                        {
                          query: GetElementDocument,
                          variables: {
                            elementId: result.removeElement.parent.id as Scalar,
                          },
                        },
                        _result,
                        (_, query2) => {
                          const indexOfRemovedElement =
                            query2.getElement.content.findIndex(
                              (val) => val.id === elementId
                            );
                          console.log("INDEX:", indexOfRemovedElement);
                          console.log("OLD QUERY:", [
                            ...query2.getElement.content,
                          ]);
                          query2.getElement.content.splice(
                            indexOfRemovedElement,
                            1
                          );
                          console.log("NEW QUERY:", [
                            ...query2.getElement.content,
                          ]);
                          return query2;
                        }
                      );
                    }
                    return query;
                  }
                }
              );
            },

            createElement: (_result, args, cache, info) => {
              const res = _result as CreateElementMutation;
              if (!res.createElement) {
                return;
              }
              const newElement = res.createElement;
              const elementId = newElement.id;
              console.log("Cache Result: ", res);
              // Update element
              betterUpdateQuery<CreateElementMutation, GetElementQuery>(
                cache,
                { query: GetElementDocument, variables: { elementId } },
                _result,
                (result, query) => {
                  if (!result.createElement) {
                    return query;
                  } else {
                    // Update parent element
                    if (result.createElement.parent?.id) {
                      console.log("Parent: ", result.createElement.parent);
                      betterUpdateQuery<CreateElementMutation, GetElementQuery>(
                        cache,
                        {
                          query: GetElementDocument,
                          variables: {
                            elementId: result.createElement.parent.id as Scalar,
                          },
                        },
                        _result,
                        (_, query2) => {
                          console.log("Query 2:", query2);
                          const parentElement = query2.getElement;
                          parentElement.content.push(result.createElement!);
                          console.log("New content:", parentElement.content);
                          return query2;
                        }
                      );
                    }
                    return {
                      __typename: "Query",
                      getElement: result.createElement,
                    };
                  }
                }
              );
            },

            editElementProps: (_result, args, cache, info) => {
              const res = _result as EditElementPropsMutation;
              if (!res.editElementProps) {
                return;
              }
              const newElement = res.editElementProps;
              const elementId = newElement.id;
              betterUpdateQuery<EditElementPropsMutation, GetElementQuery>(
                cache,
                { query: GetElementDocument, variables: { elementId } },
                _result,
                (result, query) => {
                  if (!result.editElementProps) {
                    return query;
                  } else {
                    if (result.editElementProps.parent) {
                      betterUpdateQuery<CreateElementMutation, GetElementQuery>(
                        cache,
                        {
                          query: GetElementDocument,
                          variables: {
                            elementId: result.editElementProps.parent
                              .id as Scalar,
                          },
                        },
                        _result,
                        (_, query2) => {
                          query2.getElement.content[
                            query2.getElement.content.findIndex(
                              (val) => val.id === result.editElementProps.id
                            )
                          ] = result.editElementProps;
                          return query2;
                        }
                      );
                    }
                    query.getElement = result.editElementProps;
                    return query;
                  }
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
