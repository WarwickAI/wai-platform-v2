import { cacheExchange } from "@urql/exchange-graphcache";
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
                  if (!result.createProject.event) {
                    return query;
                  } else {
                    if (result.createProject.event.display) {
                      // Display set to true, add
                      query.projects.push(
                        result.createProject.event as RegularProjectFragment
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
                  if (!result.createProject.event) {
                    return query;
                  } else {
                    query.allProjects.push(
                      result.createProject.event as RegularProjectFragment
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
                  if (!result.editProject.event) {
                    return query;
                  } else {
                    const index = query.projects.findIndex(
                      (val) => val.id === result.editProject.event?.id
                    );
                    if (index === -1 && result.editProject.event.display) {
                      // Display set to true, add to list.
                      query.projects.push(
                        result.editProject.event as RegularProjectFragment
                      );
                    } else if (
                      index !== -1 &&
                      !result.editProject.event.display
                    ) {
                      // Display set to false, remove from list
                      query.projects.splice(index, 1);
                    } else if (index !== -1) {
                      // Update
                      query.projects[index] = result.editProject
                        .event as RegularProjectFragment;
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
                  if (!result.editProject.event) {
                    return query;
                  } else {
                    const index = query.allProjects.findIndex(
                      (val) => val.id === result.editProject.event?.id
                    );
                    if (index !== -1) {
                      // Update
                      query.allProjects[index] = result.editProject
                        .event as RegularProjectFragment;
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
                  if (!result.createTalk.event) {
                    return query;
                  } else {
                    if (result.createTalk.event.display) {
                      // Display set to true, add
                      query.talks.push(
                        result.createTalk.event as RegularTalkFragment
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
                  if (!result.createTalk.event) {
                    return query;
                  } else {
                    query.allTalks.push(
                      result.createTalk.event as RegularTalkFragment
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
                  if (!result.editTalk.event) {
                    return query;
                  } else {
                    const index = query.talks.findIndex(
                      (val) => val.id === result.editTalk.event?.id
                    );
                    if (index === -1 && result.editTalk.event.display) {
                      // Display set to true, add to list.
                      query.talks.push(
                        result.editTalk.event as RegularTalkFragment
                      );
                    } else if (index !== -1 && !result.editTalk.event.display) {
                      // Display set to false, remove from list
                      query.talks.splice(index, 1);
                    } else if (index !== -1) {
                      // Update
                      query.talks[index] = result.editTalk
                        .event as RegularTalkFragment;
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
                  if (!result.editTalk.event) {
                    return query;
                  } else {
                    const index = query.allTalks.findIndex(
                      (val) => val.id === result.editTalk.event?.id
                    );
                    if (index !== -1) {
                      // Update
                      query.allTalks[index] = result.editTalk
                        .event as RegularTalkFragment;
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
                  if (!result.createCourse.event) {
                    return query;
                  } else {
                    if (result.createCourse.event.display) {
                      // Display set to true, add
                      query.courses.push(
                        result.createCourse.event as RegularCourseFragment
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
                  if (!result.createCourse.event) {
                    return query;
                  } else {
                    query.allCourses.push(
                      result.createCourse.event as RegularCourseFragment
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
                  if (!result.editCourse.event) {
                    return query;
                  } else {
                    const index = query.courses.findIndex(
                      (val) => val.id === result.editCourse.event?.id
                    );
                    if (index === -1 && result.editCourse.event.display) {
                      // Display set to true, add to list.
                      query.courses.push(
                        result.editCourse.event as RegularCourseFragment
                      );
                    } else if (
                      index !== -1 &&
                      !result.editCourse.event.display
                    ) {
                      // Display set to false, remove from list
                      query.courses.splice(index, 1);
                    } else if (index !== -1) {
                      // Update
                      query.courses[index] = result.editCourse
                        .event as RegularCourseFragment;
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
                  if (!result.editCourse.event) {
                    return query;
                  } else {
                    const index = query.allCourses.findIndex(
                      (val) => val.id === result.editCourse.event?.id
                    );
                    if (index !== -1) {
                      // Update
                      query.allCourses[index] = result.editCourse
                        .event as RegularCourseFragment;
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
                  if (!result.createTutorial.event) {
                    return query;
                  } else {
                    if (result.createTutorial.event.display) {
                      // Display set to true, add
                      query.tutorials.push(
                        result.createTutorial.event as RegularTutorialFragment
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
                  if (!result.createTutorial.event) {
                    return query;
                  } else {
                    query.allTutorials.push(
                      result.createTutorial.event as RegularTutorialFragment
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
                  if (!result.editTutorial.event) {
                    return query;
                  } else {
                    const index = query.tutorials.findIndex(
                      (val) => val.id === result.editTutorial.event?.id
                    );
                    if (index === -1 && result.editTutorial.event.display) {
                      // Display set to true, add to list.
                      query.tutorials.push(
                        result.editTutorial.event as RegularTutorialFragment
                      );
                    } else if (
                      index !== -1 &&
                      !result.editTutorial.event.display
                    ) {
                      // Display set to false, remove from list
                      query.tutorials.splice(index, 1);
                    } else if (index !== -1) {
                      // Update
                      query.tutorials[index] = result.editTutorial
                        .event as RegularTutorialFragment;
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
                  if (!result.editTutorial.event) {
                    return query;
                  } else {
                    const index = query.allTutorials.findIndex(
                      (val) => val.id === result.editTutorial.event?.id
                    );
                    if (index !== -1) {
                      // Update
                      query.allTutorials[index] = result.editTutorial
                        .event as RegularTutorialFragment;
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
          },
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  };
};
