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
  ProjectUsersQuery,
  ProjectUsersDocument,
  JoinTalkMutation,
  JoinTutorialMutation,
  JoinCourseMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import {
  getAuth,
  addAuthToOperation,
  willAuthError,
  didAuthError,
} from "./urqlAuthExchange";

export const createUrqlClient = (ssrExchange: any) => {
  console.log("api url:", `${process.env.NEXT_PUBLIC_API_URL}/graphql`);
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
                      query.projects.push(result.createProject.project);
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
                    query.allProjects.push(result.createProject.project);
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
                    const index = query.projects.findIndex((val) => val.id === result.editProject.project?.id);
                    if (index === -1 && result.editProject.project.display) {
                      // Display set to true, add to list.
                      query.projects.push(result.editProject.project);
                    } else if (index !== -1 && !result.editProject.project.display) {
                      // Display set to false, remove from list
                      query.projects.splice(index, 1)
                    } else if (index !== -1) {
                      // Update
                      query.projects[index] = result.editProject.project;
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
                    const index = query.allProjects.findIndex((val) => val.id === result.editProject.project?.id);
                    if (index !== -1) {
                      // Update
                      query.allProjects[index] = result.editProject.project;
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
                      query.talks.push(result.createTalk.talk);
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
                    query.allTalks.push(result.createTalk.talk);
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
                    const index = query.talks.findIndex((val) => val.id === result.editTalk.talk?.id);
                    if (index === -1 && result.editTalk.talk.display) {
                      // Display set to true, add to list.
                      query.talks.push(result.editTalk.talk);
                    } else if (index !== -1 && !result.editTalk.talk.display) {
                      // Display set to false, remove from list
                      query.talks.splice(index, 1)
                    } else if (index !== -1) {
                      // Update
                      query.talks[index] = result.editTalk.talk;
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
                    const index = query.allTalks.findIndex((val) => val.id === result.editTalk.talk?.id);
                    if (index !== -1) {
                      // Update
                      query.allTalks[index] = result.editTalk.talk;
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
                    query.me?.projects.push({ id: args.projectId as number, shortName: args.shortName as string })
                  }
                  return query;
                }
              )
            },

            joinTalk: (_result, args, cache, info) => {
              betterUpdateQuery<JoinTalkMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.joinTalk) {
                    // Successfully joined, update projects in me
                    query.me?.talks.push({ id: args.talkId as number, shortName: args.shortName as string })
                  }
                  return query;
                }
              )
            },

            joinCourse: (_result, args, cache, info) => {
              betterUpdateQuery<JoinCourseMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.joinCourse) {
                    // Successfully joined, update projects in me
                    query.me?.courses.push({ id: args.courseId as number, shortName: args.shortName as string })
                  }
                  return query;
                }
              )
            },

            joinTutorial: (_result, args, cache, info) => {
              betterUpdateQuery<JoinTutorialMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.joinTutorial) {
                    // Successfully joined, update projects in me
                    query.me?.tutorials.push({ id: args.tutorialId as number, shortName: args.shortName as string })
                  }
                  return query;
                }
              )
            },

            removeUserFromProject: (_result, args, cache, info) => {

            },

            removeUserFromTalk: (_result, args, cache, info) => {

            },

            removeUserFromCourse: (_result, args, cache, info) => {

            },

            removeUserFromTutorial: (_result, args, cache, info) => {

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
  }
};
