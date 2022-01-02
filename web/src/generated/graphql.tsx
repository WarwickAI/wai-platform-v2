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
  createPost: Post;
  createProject: ProjectResponse;
  deleteAllUsers: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  editProject: ProjectResponse;
  logout: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  updatePost?: Maybe<Post>;
  updateUserRole?: Maybe<User>;
  verifyLogin?: Maybe<User>;
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  projectInfo: ProjectInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationEditProjectArgs = {
  id: Scalars['Float'];
  projectInfo: ProjectInput;
};


export type MutationRevokeRefreshTokensForUserArgs = {
  id: Scalars['Float'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['Float'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserRoleArgs = {
  email: Scalars['String'];
  role: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  cover: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  difficulty: Scalars['String'];
  display?: Maybe<Scalars['Boolean']>;
  id: Scalars['Float'];
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
  hello: Scalars['String'];
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  projectByShortName?: Maybe<Project>;
  projects: Array<Project>;
  testJWT: Scalars['String'];
  users: Array<User>;
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};


export type QueryProjectByShortNameArgs = {
  shortName: Scalars['String'];
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


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'ProjectResponse', project?: { __typename?: 'Project', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, cover: string, difficulty: string, redirect: string } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditProjectMutationVariables = Exact<{
  projectInfo: ProjectInput;
  id: Scalars['Float'];
}>;


export type EditProjectMutation = { __typename?: 'Mutation', editProject: { __typename?: 'ProjectResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, project?: { __typename?: 'Project', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, shortName: string, difficulty: string, cover: string, description: string, title: string, redirect: string } | null | undefined } };

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


export type ProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, difficulty: string, cover: string, redirect: string }> };

export type AllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProjectsQuery = { __typename?: 'Query', allProjects: Array<{ __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, difficulty: string, cover: string, redirect: string }> };

export type ProjectByShortNameQueryVariables = Exact<{
  shortName: Scalars['String'];
}>;


export type ProjectByShortNameQuery = { __typename?: 'Query', projectByShortName?: { __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, difficulty: string, description: string, cover: string, redirect: string } | null | undefined };

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
    }
  }
}
    `;

export function useEditProjectMutation() {
  return Urql.useMutation<EditProjectMutation, EditProjectMutationVariables>(EditProjectDocument);
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
  }
}
    `;

export function useProjectByShortNameQuery(options: Omit<Urql.UseQueryArgs<ProjectByShortNameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectByShortNameQuery>({ query: ProjectByShortNameDocument, ...options });
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