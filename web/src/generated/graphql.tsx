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

export type Course = {
  __typename?: 'Course';
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
  users: Array<User>;
};

export type CourseInput = {
  cover: Scalars['String'];
  description: Scalars['String'];
  difficulty: Scalars['String'];
  display: Scalars['Boolean'];
  joinButton: Scalars['Boolean'];
  redirect: Scalars['String'];
  shortName: Scalars['String'];
  title: Scalars['String'];
};

export type CourseResponse = {
  __typename?: 'CourseResponse';
  course?: Maybe<Course>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCourse: CourseResponse;
  createProject: ProjectResponse;
  createTalk: TalkResponse;
  createTutorial: TutorialResponse;
  deleteAllUsers: Scalars['Boolean'];
  editCourse: CourseResponse;
  editProject: ProjectResponse;
  editTalk: TalkResponse;
  editTutorial: TutorialResponse;
  joinCourse: Scalars['Boolean'];
  joinProject: Scalars['Boolean'];
  joinTalk: Scalars['Boolean'];
  joinTutorial: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  removeUserFromCourse: Scalars['Boolean'];
  removeUserFromProject: Scalars['Boolean'];
  removeUserFromTalk: Scalars['Boolean'];
  removeUserFromTutorial: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  updateUserRole?: Maybe<User>;
  verifyLogin?: Maybe<User>;
};


export type MutationCreateCourseArgs = {
  courseInfo: CourseInput;
};


export type MutationCreateProjectArgs = {
  projectInfo: ProjectInput;
};


export type MutationCreateTalkArgs = {
  talkInfo: TalkInput;
};


export type MutationCreateTutorialArgs = {
  tutorialInfo: TutorialInput;
};


export type MutationEditCourseArgs = {
  courseInfo: CourseInput;
  id: Scalars['Float'];
};


export type MutationEditProjectArgs = {
  id: Scalars['Float'];
  projectInfo: ProjectInput;
};


export type MutationEditTalkArgs = {
  id: Scalars['Float'];
  talkInfo: TalkInput;
};


export type MutationEditTutorialArgs = {
  id: Scalars['Float'];
  tutorialInfo: TutorialInput;
};


export type MutationJoinCourseArgs = {
  courseId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
};


export type MutationJoinProjectArgs = {
  projectId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
};


export type MutationJoinTalkArgs = {
  shortName?: InputMaybe<Scalars['String']>;
  talkId?: InputMaybe<Scalars['Float']>;
};


export type MutationJoinTutorialArgs = {
  shortName?: InputMaybe<Scalars['String']>;
  tutorialId?: InputMaybe<Scalars['Float']>;
};


export type MutationRemoveUserFromCourseArgs = {
  courseId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
  userId: Scalars['Float'];
};


export type MutationRemoveUserFromProjectArgs = {
  projectId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
  userId: Scalars['Float'];
};


export type MutationRemoveUserFromTalkArgs = {
  shortName?: InputMaybe<Scalars['String']>;
  talkId?: InputMaybe<Scalars['Float']>;
  userId: Scalars['Float'];
};


export type MutationRemoveUserFromTutorialArgs = {
  shortName?: InputMaybe<Scalars['String']>;
  tutorialId?: InputMaybe<Scalars['Float']>;
  userId: Scalars['Float'];
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
  users: Array<User>;
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
  allCourses: Array<Course>;
  allProjects: Array<Project>;
  allTalks: Array<Talk>;
  allTutorials: Array<Tutorial>;
  courseByShortName?: Maybe<Course>;
  courseUsers: Array<User>;
  courses: Array<Course>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  projectByShortName?: Maybe<Project>;
  projectUsers: Array<User>;
  projects: Array<Project>;
  talkByShortName?: Maybe<Talk>;
  talkUsers: Array<User>;
  talks: Array<Talk>;
  testJWT: Scalars['String'];
  tutorialByShortName?: Maybe<Tutorial>;
  tutorialUsers: Array<User>;
  tutorials: Array<Tutorial>;
  users: Array<User>;
};


export type QueryCourseByShortNameArgs = {
  shortName: Scalars['String'];
};


export type QueryCourseUsersArgs = {
  courseId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
};


export type QueryProjectByShortNameArgs = {
  shortName: Scalars['String'];
};


export type QueryProjectUsersArgs = {
  projectId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
};


export type QueryTalkByShortNameArgs = {
  shortName: Scalars['String'];
};


export type QueryTalkUsersArgs = {
  shortName?: InputMaybe<Scalars['String']>;
  talkId?: InputMaybe<Scalars['Float']>;
};


export type QueryTutorialByShortNameArgs = {
  shortName: Scalars['String'];
};


export type QueryTutorialUsersArgs = {
  shortName?: InputMaybe<Scalars['String']>;
  tutorialId?: InputMaybe<Scalars['Float']>;
};

export type Talk = {
  __typename?: 'Talk';
  cover: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  display?: Maybe<Scalars['Boolean']>;
  id: Scalars['Float'];
  joinButton?: Maybe<Scalars['Boolean']>;
  redirect: Scalars['String'];
  shortName: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
};

export type TalkInput = {
  cover: Scalars['String'];
  description: Scalars['String'];
  display: Scalars['Boolean'];
  joinButton: Scalars['Boolean'];
  redirect: Scalars['String'];
  shortName: Scalars['String'];
  title: Scalars['String'];
};

export type TalkResponse = {
  __typename?: 'TalkResponse';
  errors?: Maybe<Array<FieldError>>;
  talk?: Maybe<Talk>;
};

export type Tutorial = {
  __typename?: 'Tutorial';
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
  users: Array<User>;
};

export type TutorialInput = {
  cover: Scalars['String'];
  description: Scalars['String'];
  difficulty: Scalars['String'];
  display: Scalars['Boolean'];
  joinButton: Scalars['Boolean'];
  redirect: Scalars['String'];
  shortName: Scalars['String'];
  title: Scalars['String'];
};

export type TutorialResponse = {
  __typename?: 'TutorialResponse';
  errors?: Maybe<Array<FieldError>>;
  tutorial?: Maybe<Tutorial>;
};

export type User = {
  __typename?: 'User';
  cognitoUsername: Scalars['String'];
  courses: Array<Course>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Float'];
  lastName: Scalars['String'];
  projects: Array<Project>;
  role: Scalars['String'];
  talks: Array<Talk>;
  tokenVersion: Scalars['Float'];
  tutorials: Array<Tutorial>;
  updatedAt: Scalars['String'];
};

export type RegularUserFragment = { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string };

export type CreateCourseMutationVariables = Exact<{
  courseInfo: CourseInput;
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse: { __typename?: 'CourseResponse', course?: { __typename?: 'Course', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, cover: string, difficulty: string, redirect: string, joinButton?: boolean | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditCourseMutationVariables = Exact<{
  courseInfo: CourseInput;
  id: Scalars['Float'];
}>;


export type EditCourseMutation = { __typename?: 'Mutation', editCourse: { __typename?: 'CourseResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, course?: { __typename?: 'Course', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, shortName: string, difficulty: string, cover: string, description: string, title: string, redirect: string, joinButton?: boolean | null | undefined } | null | undefined } };

export type JoinCourseMutationVariables = Exact<{
  courseId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type JoinCourseMutation = { __typename?: 'Mutation', joinCourse: boolean };

export type RemoveUserFromCourseMutationVariables = Exact<{
  userId: Scalars['Float'];
  courseId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type RemoveUserFromCourseMutation = { __typename?: 'Mutation', removeUserFromCourse: boolean };

export type CreateProjectMutationVariables = Exact<{
  projectInfo: ProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'ProjectResponse', project?: { __typename?: 'Project', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, cover: string, difficulty: string, redirect: string, joinButton?: boolean | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditProjectMutationVariables = Exact<{
  projectInfo: ProjectInput;
  id: Scalars['Float'];
}>;


export type EditProjectMutation = { __typename?: 'Mutation', editProject: { __typename?: 'ProjectResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, project?: { __typename?: 'Project', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, shortName: string, difficulty: string, cover: string, description: string, title: string, redirect: string, joinButton?: boolean | null | undefined } | null | undefined } };

export type JoinProjectMutationVariables = Exact<{
  projectId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type JoinProjectMutation = { __typename?: 'Mutation', joinProject: boolean };

export type RemoveUserFromProjectMutationVariables = Exact<{
  userId: Scalars['Float'];
  projectId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type RemoveUserFromProjectMutation = { __typename?: 'Mutation', removeUserFromProject: boolean };

export type CreateTalkMutationVariables = Exact<{
  talkInfo: TalkInput;
}>;


export type CreateTalkMutation = { __typename?: 'Mutation', createTalk: { __typename?: 'TalkResponse', talk?: { __typename?: 'Talk', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, cover: string, redirect: string, joinButton?: boolean | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditTalkMutationVariables = Exact<{
  talkInfo: TalkInput;
  id: Scalars['Float'];
}>;


export type EditTalkMutation = { __typename?: 'Mutation', editTalk: { __typename?: 'TalkResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, talk?: { __typename?: 'Talk', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, shortName: string, cover: string, description: string, title: string, redirect: string, joinButton?: boolean | null | undefined } | null | undefined } };

export type JoinTalkMutationVariables = Exact<{
  talkId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type JoinTalkMutation = { __typename?: 'Mutation', joinTalk: boolean };

export type RemoveUserFromTalkMutationVariables = Exact<{
  userId: Scalars['Float'];
  talkId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type RemoveUserFromTalkMutation = { __typename?: 'Mutation', removeUserFromTalk: boolean };

export type CreateTutorialMutationVariables = Exact<{
  tutorialInfo: TutorialInput;
}>;


export type CreateTutorialMutation = { __typename?: 'Mutation', createTutorial: { __typename?: 'TutorialResponse', tutorial?: { __typename?: 'Tutorial', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, cover: string, difficulty: string, redirect: string, joinButton?: boolean | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditTutorialMutationVariables = Exact<{
  tutorialInfo: TutorialInput;
  id: Scalars['Float'];
}>;


export type EditTutorialMutation = { __typename?: 'Mutation', editTutorial: { __typename?: 'TutorialResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, tutorial?: { __typename?: 'Tutorial', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, shortName: string, difficulty: string, cover: string, description: string, title: string, redirect: string, joinButton?: boolean | null | undefined } | null | undefined } };

export type JoinTutorialMutationVariables = Exact<{
  tutorialId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type JoinTutorialMutation = { __typename?: 'Mutation', joinTutorial: boolean };

export type RemoveUserFromTutorialMutationVariables = Exact<{
  userId: Scalars['Float'];
  tutorialId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type RemoveUserFromTutorialMutation = { __typename?: 'Mutation', removeUserFromTutorial: boolean };

export type VerifyLoginMutationVariables = Exact<{ [key: string]: never; }>;


export type VerifyLoginMutation = { __typename?: 'Mutation', verifyLogin?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string, projects: Array<{ __typename?: 'Project', id: number, shortName: string }>, talks: Array<{ __typename?: 'Talk', id: number, shortName: string }>, courses: Array<{ __typename?: 'Course', id: number, shortName: string }>, tutorials: Array<{ __typename?: 'Tutorial', id: number, shortName: string }> } | null | undefined };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateUserRoleMutationVariables = Exact<{
  role: Scalars['String'];
  email: Scalars['String'];
}>;


export type UpdateUserRoleMutation = { __typename?: 'Mutation', updateUserRole?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, firstName: string, lastName: string, email: string, cognitoUsername: string, tokenVersion: number, role: string } | null | undefined };

export type CoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type CoursesQuery = { __typename?: 'Query', courses: Array<{ __typename?: 'Course', id: number, display?: boolean | null | undefined, title: string, shortName: string, difficulty: string, cover: string, redirect: string, joinButton?: boolean | null | undefined }> };

export type AllCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCoursesQuery = { __typename?: 'Query', allCourses: Array<{ __typename?: 'Course', id: number, display?: boolean | null | undefined, title: string, shortName: string, difficulty: string, cover: string, redirect: string, joinButton?: boolean | null | undefined }> };

export type CourseByShortNameQueryVariables = Exact<{
  shortName: Scalars['String'];
}>;


export type CourseByShortNameQuery = { __typename?: 'Query', courseByShortName?: { __typename?: 'Course', id: number, display?: boolean | null | undefined, title: string, shortName: string, difficulty: string, description: string, cover: string, redirect: string, joinButton?: boolean | null | undefined } | null | undefined };

export type CourseUsersQueryVariables = Exact<{
  courseId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type CourseUsersQuery = { __typename?: 'Query', courseUsers: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string, projects: Array<{ __typename?: 'Project', id: number, shortName: string }>, talks: Array<{ __typename?: 'Talk', id: number, shortName: string }>, courses: Array<{ __typename?: 'Course', id: number, shortName: string }>, tutorials: Array<{ __typename?: 'Tutorial', id: number, shortName: string }> } | null | undefined };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, difficulty: string, cover: string, redirect: string, joinButton?: boolean | null | undefined }> };

export type AllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProjectsQuery = { __typename?: 'Query', allProjects: Array<{ __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, difficulty: string, cover: string, redirect: string, joinButton?: boolean | null | undefined }> };

export type ProjectByShortNameQueryVariables = Exact<{
  shortName: Scalars['String'];
}>;


export type ProjectByShortNameQuery = { __typename?: 'Query', projectByShortName?: { __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, difficulty: string, description: string, cover: string, redirect: string, joinButton?: boolean | null | undefined } | null | undefined };

export type ProjectUsersQueryVariables = Exact<{
  projectId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type ProjectUsersQuery = { __typename?: 'Query', projectUsers: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string }> };

export type TalksQueryVariables = Exact<{ [key: string]: never; }>;


export type TalksQuery = { __typename?: 'Query', talks: Array<{ __typename?: 'Talk', id: number, display?: boolean | null | undefined, title: string, shortName: string, cover: string, redirect: string, joinButton?: boolean | null | undefined }> };

export type AllTalksQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTalksQuery = { __typename?: 'Query', allTalks: Array<{ __typename?: 'Talk', id: number, display?: boolean | null | undefined, title: string, shortName: string, cover: string, redirect: string, joinButton?: boolean | null | undefined }> };

export type TalkByShortNameQueryVariables = Exact<{
  shortName: Scalars['String'];
}>;


export type TalkByShortNameQuery = { __typename?: 'Query', talkByShortName?: { __typename?: 'Talk', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, cover: string, redirect: string, joinButton?: boolean | null | undefined } | null | undefined };

export type TalkUsersQueryVariables = Exact<{
  talkId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type TalkUsersQuery = { __typename?: 'Query', talkUsers: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string }> };

export type TutorialsQueryVariables = Exact<{ [key: string]: never; }>;


export type TutorialsQuery = { __typename?: 'Query', tutorials: Array<{ __typename?: 'Tutorial', id: number, display?: boolean | null | undefined, title: string, shortName: string, difficulty: string, cover: string, redirect: string, joinButton?: boolean | null | undefined }> };

export type AllTutorialsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTutorialsQuery = { __typename?: 'Query', allTutorials: Array<{ __typename?: 'Tutorial', id: number, display?: boolean | null | undefined, title: string, shortName: string, difficulty: string, cover: string, redirect: string, joinButton?: boolean | null | undefined }> };

export type TutorialByShortNameQueryVariables = Exact<{
  shortName: Scalars['String'];
}>;


export type TutorialByShortNameQuery = { __typename?: 'Query', tutorialByShortName?: { __typename?: 'Tutorial', id: number, display?: boolean | null | undefined, title: string, shortName: string, difficulty: string, description: string, cover: string, redirect: string, joinButton?: boolean | null | undefined } | null | undefined };

export type TutorialUsersQueryVariables = Exact<{
  tutorialId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type TutorialUsersQuery = { __typename?: 'Query', tutorialUsers: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string }> };

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
export const CreateCourseDocument = gql`
    mutation CreateCourse($courseInfo: CourseInput!) {
  createCourse(courseInfo: $courseInfo) {
    course {
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

export function useCreateCourseMutation() {
  return Urql.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument);
};
export const EditCourseDocument = gql`
    mutation EditCourse($courseInfo: CourseInput!, $id: Float!) {
  editCourse(courseInfo: $courseInfo, id: $id) {
    errors {
      field
      message
    }
    course {
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

export function useEditCourseMutation() {
  return Urql.useMutation<EditCourseMutation, EditCourseMutationVariables>(EditCourseDocument);
};
export const JoinCourseDocument = gql`
    mutation JoinCourse($courseId: Float, $shortName: String) {
  joinCourse(courseId: $courseId, shortName: $shortName)
}
    `;

export function useJoinCourseMutation() {
  return Urql.useMutation<JoinCourseMutation, JoinCourseMutationVariables>(JoinCourseDocument);
};
export const RemoveUserFromCourseDocument = gql`
    mutation RemoveUserFromCourse($userId: Float!, $courseId: Float, $shortName: String) {
  removeUserFromCourse(
    userId: $userId
    courseId: $courseId
    shortName: $shortName
  )
}
    `;

export function useRemoveUserFromCourseMutation() {
  return Urql.useMutation<RemoveUserFromCourseMutation, RemoveUserFromCourseMutationVariables>(RemoveUserFromCourseDocument);
};
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
export const JoinProjectDocument = gql`
    mutation JoinProject($projectId: Float, $shortName: String) {
  joinProject(projectId: $projectId, shortName: $shortName)
}
    `;

export function useJoinProjectMutation() {
  return Urql.useMutation<JoinProjectMutation, JoinProjectMutationVariables>(JoinProjectDocument);
};
export const RemoveUserFromProjectDocument = gql`
    mutation RemoveUserFromProject($userId: Float!, $projectId: Float, $shortName: String) {
  removeUserFromProject(
    userId: $userId
    projectId: $projectId
    shortName: $shortName
  )
}
    `;

export function useRemoveUserFromProjectMutation() {
  return Urql.useMutation<RemoveUserFromProjectMutation, RemoveUserFromProjectMutationVariables>(RemoveUserFromProjectDocument);
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
      joinButton
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
      joinButton
    }
  }
}
    `;

export function useEditTalkMutation() {
  return Urql.useMutation<EditTalkMutation, EditTalkMutationVariables>(EditTalkDocument);
};
export const JoinTalkDocument = gql`
    mutation JoinTalk($talkId: Float, $shortName: String) {
  joinTalk(talkId: $talkId, shortName: $shortName)
}
    `;

export function useJoinTalkMutation() {
  return Urql.useMutation<JoinTalkMutation, JoinTalkMutationVariables>(JoinTalkDocument);
};
export const RemoveUserFromTalkDocument = gql`
    mutation RemoveUserFromTalk($userId: Float!, $talkId: Float, $shortName: String) {
  removeUserFromTalk(userId: $userId, talkId: $talkId, shortName: $shortName)
}
    `;

export function useRemoveUserFromTalkMutation() {
  return Urql.useMutation<RemoveUserFromTalkMutation, RemoveUserFromTalkMutationVariables>(RemoveUserFromTalkDocument);
};
export const CreateTutorialDocument = gql`
    mutation CreateTutorial($tutorialInfo: TutorialInput!) {
  createTutorial(tutorialInfo: $tutorialInfo) {
    tutorial {
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

export function useCreateTutorialMutation() {
  return Urql.useMutation<CreateTutorialMutation, CreateTutorialMutationVariables>(CreateTutorialDocument);
};
export const EditTutorialDocument = gql`
    mutation EditTutorial($tutorialInfo: TutorialInput!, $id: Float!) {
  editTutorial(tutorialInfo: $tutorialInfo, id: $id) {
    errors {
      field
      message
    }
    tutorial {
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

export function useEditTutorialMutation() {
  return Urql.useMutation<EditTutorialMutation, EditTutorialMutationVariables>(EditTutorialDocument);
};
export const JoinTutorialDocument = gql`
    mutation JoinTutorial($tutorialId: Float, $shortName: String) {
  joinTutorial(tutorialId: $tutorialId, shortName: $shortName)
}
    `;

export function useJoinTutorialMutation() {
  return Urql.useMutation<JoinTutorialMutation, JoinTutorialMutationVariables>(JoinTutorialDocument);
};
export const RemoveUserFromTutorialDocument = gql`
    mutation RemoveUserFromTutorial($userId: Float!, $tutorialId: Float, $shortName: String) {
  removeUserFromTutorial(
    userId: $userId
    tutorialId: $tutorialId
    shortName: $shortName
  )
}
    `;

export function useRemoveUserFromTutorialMutation() {
  return Urql.useMutation<RemoveUserFromTutorialMutation, RemoveUserFromTutorialMutationVariables>(RemoveUserFromTutorialDocument);
};
export const VerifyLoginDocument = gql`
    mutation VerifyLogin {
  verifyLogin {
    ...RegularUser
    projects {
      id
      shortName
    }
    talks {
      id
      shortName
    }
    courses {
      id
      shortName
    }
    tutorials {
      id
      shortName
    }
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
export const CoursesDocument = gql`
    query Courses {
  courses {
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

export function useCoursesQuery(options: Omit<Urql.UseQueryArgs<CoursesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CoursesQuery>({ query: CoursesDocument, ...options });
};
export const AllCoursesDocument = gql`
    query AllCourses {
  allCourses {
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

export function useAllCoursesQuery(options: Omit<Urql.UseQueryArgs<AllCoursesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllCoursesQuery>({ query: AllCoursesDocument, ...options });
};
export const CourseByShortNameDocument = gql`
    query CourseByShortName($shortName: String!) {
  courseByShortName(shortName: $shortName) {
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

export function useCourseByShortNameQuery(options: Omit<Urql.UseQueryArgs<CourseByShortNameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CourseByShortNameQuery>({ query: CourseByShortNameDocument, ...options });
};
export const CourseUsersDocument = gql`
    query CourseUsers($courseId: Float, $shortName: String) {
  courseUsers(courseId: $courseId, shortName: $shortName) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useCourseUsersQuery(options: Omit<Urql.UseQueryArgs<CourseUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CourseUsersQuery>({ query: CourseUsersDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
    projects {
      id
      shortName
    }
    talks {
      id
      shortName
    }
    courses {
      id
      shortName
    }
    tutorials {
      id
      shortName
    }
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
export const ProjectUsersDocument = gql`
    query ProjectUsers($projectId: Float, $shortName: String) {
  projectUsers(projectId: $projectId, shortName: $shortName) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useProjectUsersQuery(options: Omit<Urql.UseQueryArgs<ProjectUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectUsersQuery>({ query: ProjectUsersDocument, ...options });
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
    joinButton
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
    joinButton
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
    joinButton
  }
}
    `;

export function useTalkByShortNameQuery(options: Omit<Urql.UseQueryArgs<TalkByShortNameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TalkByShortNameQuery>({ query: TalkByShortNameDocument, ...options });
};
export const TalkUsersDocument = gql`
    query TalkUsers($talkId: Float, $shortName: String) {
  talkUsers(talkId: $talkId, shortName: $shortName) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useTalkUsersQuery(options: Omit<Urql.UseQueryArgs<TalkUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TalkUsersQuery>({ query: TalkUsersDocument, ...options });
};
export const TutorialsDocument = gql`
    query Tutorials {
  tutorials {
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

export function useTutorialsQuery(options: Omit<Urql.UseQueryArgs<TutorialsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TutorialsQuery>({ query: TutorialsDocument, ...options });
};
export const AllTutorialsDocument = gql`
    query AllTutorials {
  allTutorials {
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

export function useAllTutorialsQuery(options: Omit<Urql.UseQueryArgs<AllTutorialsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllTutorialsQuery>({ query: AllTutorialsDocument, ...options });
};
export const TutorialByShortNameDocument = gql`
    query TutorialByShortName($shortName: String!) {
  tutorialByShortName(shortName: $shortName) {
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

export function useTutorialByShortNameQuery(options: Omit<Urql.UseQueryArgs<TutorialByShortNameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TutorialByShortNameQuery>({ query: TutorialByShortNameDocument, ...options });
};
export const TutorialUsersDocument = gql`
    query TutorialUsers($tutorialId: Float, $shortName: String) {
  tutorialUsers(tutorialId: $tutorialId, shortName: $shortName) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useTutorialUsersQuery(options: Omit<Urql.UseQueryArgs<TutorialUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TutorialUsersQuery>({ query: TutorialUsersDocument, ...options });
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