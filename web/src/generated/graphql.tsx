import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: ProjectResponse;
  createTalk: TalkResponse;
  deleteAllUsers: Scalars['Boolean'];
  editProject: ProjectResponse;
  editTalk: TalkResponse;
  logout: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  updateUserRole?: Maybe<User>;
  verifyLogin?: Maybe<User>;
};


export type MutationCreateProjectArgs = {
  projectInfo: ProjectInput;
};


export type MutationCreateTalkArgs = {
  talkInfo: TalkInput;
};


export type MutationEditProjectArgs = {
  id: Scalars['Float'];
  projectInfo: ProjectInput;
};


export type MutationEditTalkArgs = {
  id: Scalars['Float'];
  talkInfo: TalkInput;
};


export type MutationRevokeRefreshTokensForUserArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateUserRoleArgs = {
  email: Scalars['String'];
  role: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  cover: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  difficulty: Scalars['String'];
  display?: Maybe<Scalars['Boolean']>;
  id: Scalars['Float'];
  joinButton?: Maybe<Scalars['Boolean']>;
  redirect: Scalars['String'];
  shortName: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ProjectInput = {
  cover: Scalars['String'];
  description: Scalars['String'];
  difficulty: Scalars['String'];
  display: Scalars['Boolean'];
  joinButton: Scalars['Boolean'];
  redirect: Scalars['String'];
  shortName: Scalars['String'];
  title: Scalars['String'];
};

export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  errors?: Maybe<Array<FieldError>>;
  project?: Maybe<Project>;
};

export type Query = {
  __typename?: 'Query';
  allProjects: Array<Project>;
  allTalks: Array<Talk>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  projectByShortName?: Maybe<Project>;
  projects: Array<Project>;
  talkByShortName?: Maybe<Talk>;
  talks: Array<Talk>;
  testJWT: Scalars['String'];
  users: Array<User>;
};


export type QueryProjectByShortNameArgs = {
  shortName: Scalars['String'];
};


export type QueryTalkByShortNameArgs = {
  shortName: Scalars['String'];
};

export type Talk = {
  __typename?: 'Talk';
  cover: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  display?: Maybe<Scalars['Boolean']>;
  id: Scalars['Float'];
  redirect: Scalars['String'];
  shortName: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type TalkInput = {
  cover: Scalars['String'];
  description: Scalars['String'];
  display: Scalars['Boolean'];
  redirect: Scalars['String'];
  shortName: Scalars['String'];
  title: Scalars['String'];
};

export type TalkResponse = {
  __typename?: 'TalkResponse';
  errors?: Maybe<Array<FieldError>>;
  talk?: Maybe<Talk>;
};

export type User = {
  __typename?: 'User';
  cognitoUsername: Scalars['String'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Float'];
  lastName: Scalars['String'];
  role: Scalars['String'];
  tokenVersion: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type RegularUserFragment = { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string };

export type CreateProjectMutationVariables = Exact<{
  projectInfo: ProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'ProjectResponse', project?: { __typename?: 'Project', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, cover: string, difficulty: string, redirect: string, joinButton?: boolean | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditProjectMutationVariables = Exact<{
  projectInfo: ProjectInput;
  id: Scalars['Float'];
}>;


export type EditProjectMutation = { __typename?: 'Mutation', editProject: { __typename?: 'ProjectResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, project?: { __typename?: 'Project', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, shortName: string, difficulty: string, cover: string, description: string, title: string, redirect: string, joinButton?: boolean | null | undefined } | null | undefined } };

export type CreateTalkMutationVariables = Exact<{
  talkInfo: TalkInput;
}>;


export type CreateTalkMutation = { __typename?: 'Mutation', createTalk: { __typename?: 'TalkResponse', talk?: { __typename?: 'Talk', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, cover: string, redirect: string } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditTalkMutationVariables = Exact<{
  talkInfo: TalkInput;
  id: Scalars['Float'];
}>;


export type EditTalkMutation = { __typename?: 'Mutation', editTalk: { __typename?: 'TalkResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, talk?: { __typename?: 'Talk', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, shortName: string, cover: string, description: string, title: string, redirect: string } | null | undefined } };

export type VerifyLoginMutationVariables = Exact<{ [key: string]: never; }>;


export type VerifyLoginMutation = { __typename?: 'Mutation', verifyLogin?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string } | null | undefined };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateUserRoleMutationVariables = Exact<{
  role: Scalars['String'];
  email: Scalars['String'];
}>;


export type UpdateUserRoleMutation = { __typename?: 'Mutation', updateUserRole?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, firstName: string, lastName: string, email: string, cognitoUsername: string, tokenVersion: number, role: string } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string } | null | undefined };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, difficulty: string, cover: string, redirect: string, joinButton?: boolean | null | undefined }> };

export type AllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProjectsQuery = { __typename?: 'Query', allProjects: Array<{ __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, difficulty: string, cover: string, redirect: string, joinButton?: boolean | null | undefined }> };

export type ProjectByShortNameQueryVariables = Exact<{
  shortName: Scalars['String'];
}>;


export type ProjectByShortNameQuery = { __typename?: 'Query', projectByShortName?: { __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, difficulty: string, description: string, cover: string, redirect: string, joinButton?: boolean | null | undefined } | null | undefined };

export type TalksQueryVariables = Exact<{ [key: string]: never; }>;


export type TalksQuery = { __typename?: 'Query', talks: Array<{ __typename?: 'Talk', id: number, display?: boolean | null | undefined, title: string, shortName: string, cover: string, redirect: string }> };

export type AllTalksQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTalksQuery = { __typename?: 'Query', allTalks: Array<{ __typename?: 'Talk', id: number, display?: boolean | null | undefined, title: string, shortName: string, cover: string, redirect: string }> };

export type TalkByShortNameQueryVariables = Exact<{
  shortName: Scalars['String'];
}>;


export type TalkByShortNameQuery = { __typename?: 'Query', talkByShortName?: { __typename?: 'Talk', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, cover: string, redirect: string } | null | undefined };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, createdAt: string, updatedAt: string, firstName: string, lastName: string, email: string, cognitoUsername: string, tokenVersion: number, role: string }> };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  firstName
  lastName
  email
  role
}
    `;
export const CreateProjectDocument = gql`
    mutation CreateProject($projectInfo: ProjectInput!) {
  createProject(projectInfo: $projectInfo) {
    project {
      id
      createdAt
      updatedAt
      display
      title
      shortName
      description
      cover
      difficulty
      redirect
      joinButton
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateProjectMutation() {
  return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
};
export const EditProjectDocument = gql`
    mutation EditProject($projectInfo: ProjectInput!, $id: Float!) {
  editProject(projectInfo: $projectInfo, id: $id) {
    errors {
      field
      message
    }
    project {
      id
      createdAt
      updatedAt
      display
      shortName
      difficulty
      cover
      description
      title
      redirect
      joinButton
    }
  }
}
    `;

export function useEditProjectMutation() {
  return Urql.useMutation<EditProjectMutation, EditProjectMutationVariables>(EditProjectDocument);
};
export const CreateTalkDocument = gql`
    mutation CreateTalk($talkInfo: TalkInput!) {
  createTalk(talkInfo: $talkInfo) {
    talk {
      id
      createdAt
      updatedAt
      display
      title
      shortName
      description
      cover
      redirect
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateTalkMutation() {
  return Urql.useMutation<CreateTalkMutation, CreateTalkMutationVariables>(CreateTalkDocument);
};
export const EditTalkDocument = gql`
    mutation EditTalk($talkInfo: TalkInput!, $id: Float!) {
  editTalk(talkInfo: $talkInfo, id: $id) {
    errors {
      field
      message
    }
    talk {
      id
      createdAt
      updatedAt
      display
      shortName
      cover
      description
      title
      redirect
    }
  }
}
    `;

export function useEditTalkMutation() {
  return Urql.useMutation<EditTalkMutation, EditTalkMutationVariables>(EditTalkDocument);
};
export const VerifyLoginDocument = gql`
    mutation VerifyLogin {
  verifyLogin {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useVerifyLoginMutation() {
  return Urql.useMutation<VerifyLoginMutation, VerifyLoginMutationVariables>(VerifyLoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const UpdateUserRoleDocument = gql`
    mutation UpdateUserRole($role: String!, $email: String!) {
  updateUserRole(role: $role, email: $email) {
    id
    createdAt
    updatedAt
    firstName
    lastName
    email
    cognitoUsername
    tokenVersion
    role
  }
}
    `;

export function useUpdateUserRoleMutation() {
  return Urql.useMutation<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>(UpdateUserRoleDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const ProjectsDocument = gql`
    query Projects {
  projects {
    id
    display
    title
    shortName
    difficulty
    cover
    redirect
    joinButton
  }
}
    `;

export function useProjectsQuery(options: Omit<Urql.UseQueryArgs<ProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectsQuery>({ query: ProjectsDocument, ...options });
};
export const AllProjectsDocument = gql`
    query AllProjects {
  allProjects {
    id
    display
    title
    shortName
    difficulty
    cover
    redirect
    joinButton
  }
}
    `;

export function useAllProjectsQuery(options: Omit<Urql.UseQueryArgs<AllProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllProjectsQuery>({ query: AllProjectsDocument, ...options });
};
export const ProjectByShortNameDocument = gql`
    query ProjectByShortName($shortName: String!) {
  projectByShortName(shortName: $shortName) {
    id
    display
    title
    shortName
    difficulty
    description
    cover
    redirect
    joinButton
  }
}
    `;

export function useProjectByShortNameQuery(options: Omit<Urql.UseQueryArgs<ProjectByShortNameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectByShortNameQuery>({ query: ProjectByShortNameDocument, ...options });
};
export const TalksDocument = gql`
    query Talks {
  talks {
    id
    display
    title
    shortName
    cover
    redirect
  }
}
    `;

export function useTalksQuery(options: Omit<Urql.UseQueryArgs<TalksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TalksQuery>({ query: TalksDocument, ...options });
};
export const AllTalksDocument = gql`
    query AllTalks {
  allTalks {
    id
    display
    title
    shortName
    cover
    redirect
  }
}
    `;

export function useAllTalksQuery(options: Omit<Urql.UseQueryArgs<AllTalksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllTalksQuery>({ query: AllTalksDocument, ...options });
};
export const TalkByShortNameDocument = gql`
    query TalkByShortName($shortName: String!) {
  talkByShortName(shortName: $shortName) {
    id
    display
    title
    shortName
    description
    cover
    redirect
  }
}
    `;

export function useTalkByShortNameQuery(options: Omit<Urql.UseQueryArgs<TalkByShortNameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TalkByShortNameQuery>({ query: TalkByShortNameDocument, ...options });
};
export const UsersDocument = gql`
    query Users {
  users {
    id
    createdAt
    updatedAt
    firstName
    lastName
    email
    cognitoUsername
    tokenVersion
    role
  }
}
    `;

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};