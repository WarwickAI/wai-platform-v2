import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import { authExchange } from "@urql/exchange-auth";
import {
  // LoginMutation,
  // LogoutMutation,
  // MeDocument,
  // MeQuery,
  // RegisterMutation,
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
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import {
  getAuth,
  addAuthToOperation,
  willAuthError,
  didAuthError,
} from "./urqlAuthExchange";
import projects from "../pages/projects";

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
            // Updates cache when login or register run, specifically
            // updating the cache for the Me query to the result just got
            // login: (_result, args, cache, info) => {
            //   betterUpdateQuery<LoginMutation, MeQuery>(
            //     cache,
            //     {
            //       query: MeDocument,
            //     },
            //     _result,
            //     (result, query) => {
            //       if (result.login.errors) {
            //         return query;
            //       } else {
            //         return {
            //           me: result.login.user,
            //         };
            //       }
            //     }
            //   );
            // },

            createProject: (_result, args, cache, info) => {
              betterUpdateQuery<CreateProjectMutation, ProjectsQuery>(
                cache,
                { query: ProjectsDocument },
                _result,
                (result, query) => {
                  if (!result.createProject.project) {
                    return query;
                  } else {
                    query.projects.push(result.createProject.project);
                    return {
                      projects: query.projects
                    };
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
                    return {
                      allProjects: query.allProjects
                    };
                  }
                }
              );
            },

            edit: (_result, args, cache, info) => {
              betterUpdateQuery<EditProjectMutation, ProjectsQuery>(
                cache,
                { query: ProjectsDocument },
                _result,
                (result, query) => {
                  if (!result.editProject.project) {
                    return query;
                  } else {
                    const index = query.projects.findIndex((val) => val.id === result.editProject.project?.id);
                    query.projects[index] = result.editProject.project;
                    return {
                      projects: query.projects
                    };
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
                    query.allProjects[index] = result.editProject.project;
                    return {
                      allProjects: query.allProjects
                    };
                  }
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
  }
};