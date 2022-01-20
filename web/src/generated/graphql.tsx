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
  coverImg: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  display?: Maybe<Scalars['Boolean']>;
  iconImg: Scalars['String'];
  id: Scalars['Float'];
  joinable?: Maybe<Scalars['Boolean']>;
  previewImg: Scalars['String'];
  redirectUrl?: Maybe<Scalars['String']>;
  shortName: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
};

export type Event = {
  __typename?: 'Event';
  coverImg: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  display?: Maybe<Scalars['Boolean']>;
  iconImg: Scalars['String'];
  id: Scalars['Float'];
  joinable?: Maybe<Scalars['Boolean']>;
  previewImg: Scalars['String'];
  redirectUrl?: Maybe<Scalars['String']>;
  shortName: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
};

export type EventInput = {
  coverImg: Scalars['String'];
  description: Scalars['String'];
  display: Scalars['Boolean'];
  iconImg: Scalars['String'];
  joinable: Scalars['Boolean'];
  previewImg: Scalars['String'];
  redirectUrl: Scalars['String'];
  shortName: Scalars['String'];
  title: Scalars['String'];
};

export type EventResponse = {
  __typename?: 'EventResponse';
  errors?: Maybe<Array<FieldError>>;
  event?: Maybe<Event>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCourse: EventResponse;
  createProject: EventResponse;
  createTalk: EventResponse;
  createTutorial: EventResponse;
  deleteAllUsers: Scalars['Boolean'];
  editCourse: EventResponse;
  editProject: EventResponse;
  editTalk: EventResponse;
  editTutorial: EventResponse;
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
  eventInfo: EventInput;
};


export type MutationCreateProjectArgs = {
  eventInfo: EventInput;
};


export type MutationCreateTalkArgs = {
  eventInfo: EventInput;
};


export type MutationCreateTutorialArgs = {
  eventInfo: EventInput;
};


export type MutationEditCourseArgs = {
  eventInfo: EventInput;
  id: Scalars['Float'];
};


export type MutationEditProjectArgs = {
  eventInfo: EventInput;
  id: Scalars['Float'];
};


export type MutationEditTalkArgs = {
  eventInfo: EventInput;
  id: Scalars['Float'];
};


export type MutationEditTutorialArgs = {
  eventInfo: EventInput;
  id: Scalars['Float'];
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
  coverImg: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  display?: Maybe<Scalars['Boolean']>;
  iconImg: Scalars['String'];
  id: Scalars['Float'];
  joinable?: Maybe<Scalars['Boolean']>;
  previewImg: Scalars['String'];
  redirectUrl?: Maybe<Scalars['String']>;
  shortName: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
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
  coverImg: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  display?: Maybe<Scalars['Boolean']>;
  iconImg: Scalars['String'];
  id: Scalars['Float'];
  joinable?: Maybe<Scalars['Boolean']>;
  previewImg: Scalars['String'];
  redirectUrl?: Maybe<Scalars['String']>;
  shortName: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
};

export type Tutorial = {
  __typename?: 'Tutorial';
  coverImg: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  display?: Maybe<Scalars['Boolean']>;
  iconImg: Scalars['String'];
  id: Scalars['Float'];
  joinable?: Maybe<Scalars['Boolean']>;
  previewImg: Scalars['String'];
  redirectUrl?: Maybe<Scalars['String']>;
  shortName: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
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

export type RegularEventFragment = { __typename?: 'Event', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined };

export type RegularCourseFragment = { __typename?: 'Course', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined };

export type RegularProjectFragment = { __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined };

export type RegularTalkFragment = { __typename?: 'Talk', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined };

export type RegularTutorialFragment = { __typename?: 'Tutorial', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined };

export type CreateCourseMutationVariables = Exact<{
  eventInfo: EventInput;
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse: { __typename?: 'EventResponse', event?: { __typename?: 'Event', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditCourseMutationVariables = Exact<{
  eventInfo: EventInput;
  id: Scalars['Float'];
}>;


export type EditCourseMutation = { __typename?: 'Mutation', editCourse: { __typename?: 'EventResponse', event?: { __typename?: 'Event', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

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
  eventInfo: EventInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'EventResponse', event?: { __typename?: 'Event', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditProjectMutationVariables = Exact<{
  eventInfo: EventInput;
  id: Scalars['Float'];
}>;


export type EditProjectMutation = { __typename?: 'Mutation', editProject: { __typename?: 'EventResponse', event?: { __typename?: 'Event', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

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
  eventInfo: EventInput;
}>;


export type CreateTalkMutation = { __typename?: 'Mutation', createTalk: { __typename?: 'EventResponse', event?: { __typename?: 'Event', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditTalkMutationVariables = Exact<{
  eventInfo: EventInput;
  id: Scalars['Float'];
}>;


export type EditTalkMutation = { __typename?: 'Mutation', editTalk: { __typename?: 'EventResponse', event?: { __typename?: 'Event', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

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
  eventInfo: EventInput;
}>;


export type CreateTutorialMutation = { __typename?: 'Mutation', createTutorial: { __typename?: 'EventResponse', event?: { __typename?: 'Event', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditTutorialMutationVariables = Exact<{
  eventInfo: EventInput;
  id: Scalars['Float'];
}>;


export type EditTutorialMutation = { __typename?: 'Mutation', editTutorial: { __typename?: 'EventResponse', event?: { __typename?: 'Event', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

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


export type CoursesQuery = { __typename?: 'Query', courses: Array<{ __typename?: 'Course', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined }> };

export type AllCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCoursesQuery = { __typename?: 'Query', allCourses: Array<{ __typename?: 'Course', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined }> };

export type CourseByShortNameQueryVariables = Exact<{
  shortName: Scalars['String'];
}>;


export type CourseByShortNameQuery = { __typename?: 'Query', courseByShortName?: { __typename?: 'Course', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined } | null | undefined };

export type CourseUsersQueryVariables = Exact<{
  courseId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type CourseUsersQuery = { __typename?: 'Query', courseUsers: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string, projects: Array<{ __typename?: 'Project', id: number, shortName: string }>, talks: Array<{ __typename?: 'Talk', id: number, shortName: string }>, courses: Array<{ __typename?: 'Course', id: number, shortName: string }>, tutorials: Array<{ __typename?: 'Tutorial', id: number, shortName: string }> } | null | undefined };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined }> };

export type AllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProjectsQuery = { __typename?: 'Query', allProjects: Array<{ __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined }> };

export type ProjectByShortNameQueryVariables = Exact<{
  shortName: Scalars['String'];
}>;


export type ProjectByShortNameQuery = { __typename?: 'Query', projectByShortName?: { __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined } | null | undefined };

export type ProjectUsersQueryVariables = Exact<{
  projectId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type ProjectUsersQuery = { __typename?: 'Query', projectUsers: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string }> };

export type TalksQueryVariables = Exact<{ [key: string]: never; }>;


export type TalksQuery = { __typename?: 'Query', talks: Array<{ __typename?: 'Talk', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined }> };

export type AllTalksQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTalksQuery = { __typename?: 'Query', allTalks: Array<{ __typename?: 'Talk', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined }> };

export type TalkByShortNameQueryVariables = Exact<{
  shortName: Scalars['String'];
}>;


export type TalkByShortNameQuery = { __typename?: 'Query', talkByShortName?: { __typename?: 'Talk', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined } | null | undefined };

export type TalkUsersQueryVariables = Exact<{
  talkId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type TalkUsersQuery = { __typename?: 'Query', talkUsers: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string }> };

export type TutorialsQueryVariables = Exact<{ [key: string]: never; }>;


export type TutorialsQuery = { __typename?: 'Query', tutorials: Array<{ __typename?: 'Tutorial', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined }> };

export type AllTutorialsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTutorialsQuery = { __typename?: 'Query', allTutorials: Array<{ __typename?: 'Tutorial', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined }> };

export type TutorialByShortNameQueryVariables = Exact<{
  shortName: Scalars['String'];
}>;


export type TutorialByShortNameQuery = { __typename?: 'Query', tutorialByShortName?: { __typename?: 'Tutorial', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, previewImg: string, iconImg: string, coverImg: string, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined } | null | undefined };

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
export const RegularEventFragmentDoc = gql`
    fragment RegularEvent on Event {
  id
  display
  title
  shortName
  description
  previewImg
  iconImg
  coverImg
  redirectUrl
  joinable
}
    `;
export const RegularCourseFragmentDoc = gql`
    fragment RegularCourse on Course {
  id
  display
  title
  shortName
  description
  previewImg
  iconImg
  coverImg
  redirectUrl
  joinable
}
    `;
export const RegularProjectFragmentDoc = gql`
    fragment RegularProject on Project {
  id
  display
  title
  shortName
  description
  previewImg
  iconImg
  coverImg
  redirectUrl
  joinable
}
    `;
export const RegularTalkFragmentDoc = gql`
    fragment RegularTalk on Talk {
  id
  display
  title
  shortName
  description
  previewImg
  iconImg
  coverImg
  redirectUrl
  joinable
}
    `;
export const RegularTutorialFragmentDoc = gql`
    fragment RegularTutorial on Tutorial {
  id
  display
  title
  shortName
  description
  previewImg
  iconImg
  coverImg
  redirectUrl
  joinable
}
    `;
export const CreateCourseDocument = gql`
    mutation CreateCourse($eventInfo: EventInput!) {
  createCourse(eventInfo: $eventInfo) {
    event {
      ...RegularEvent
    }
    errors {
      field
      message
    }
  }
}
    ${RegularEventFragmentDoc}`;

export function useCreateCourseMutation() {
  return Urql.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument);
};
export const EditCourseDocument = gql`
    mutation EditCourse($eventInfo: EventInput!, $id: Float!) {
  editCourse(eventInfo: $eventInfo, id: $id) {
    event {
      ...RegularEvent
    }
    errors {
      field
      message
    }
  }
}
    ${RegularEventFragmentDoc}`;

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
    mutation CreateProject($eventInfo: EventInput!) {
  createProject(eventInfo: $eventInfo) {
    event {
      ...RegularEvent
    }
    errors {
      field
      message
    }
  }
}
    ${RegularEventFragmentDoc}`;

export function useCreateProjectMutation() {
  return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
};
export const EditProjectDocument = gql`
    mutation EditProject($eventInfo: EventInput!, $id: Float!) {
  editProject(eventInfo: $eventInfo, id: $id) {
    event {
      ...RegularEvent
    }
    errors {
      field
      message
    }
  }
}
    ${RegularEventFragmentDoc}`;

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
    mutation CreateTalk($eventInfo: EventInput!) {
  createTalk(eventInfo: $eventInfo) {
    event {
      ...RegularEvent
    }
    errors {
      field
      message
    }
  }
}
    ${RegularEventFragmentDoc}`;

export function useCreateTalkMutation() {
  return Urql.useMutation<CreateTalkMutation, CreateTalkMutationVariables>(CreateTalkDocument);
};
export const EditTalkDocument = gql`
    mutation EditTalk($eventInfo: EventInput!, $id: Float!) {
  editTalk(eventInfo: $eventInfo, id: $id) {
    event {
      ...RegularEvent
    }
    errors {
      field
      message
    }
  }
}
    ${RegularEventFragmentDoc}`;

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
    mutation CreateTutorial($eventInfo: EventInput!) {
  createTutorial(eventInfo: $eventInfo) {
    event {
      ...RegularEvent
    }
    errors {
      field
      message
    }
  }
}
    ${RegularEventFragmentDoc}`;

export function useCreateTutorialMutation() {
  return Urql.useMutation<CreateTutorialMutation, CreateTutorialMutationVariables>(CreateTutorialDocument);
};
export const EditTutorialDocument = gql`
    mutation EditTutorial($eventInfo: EventInput!, $id: Float!) {
  editTutorial(eventInfo: $eventInfo, id: $id) {
    event {
      ...RegularEvent
    }
    errors {
      field
      message
    }
  }
}
    ${RegularEventFragmentDoc}`;

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
    ...RegularCourse
  }
}
    ${RegularCourseFragmentDoc}`;

export function useCoursesQuery(options: Omit<Urql.UseQueryArgs<CoursesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CoursesQuery>({ query: CoursesDocument, ...options });
};
export const AllCoursesDocument = gql`
    query AllCourses {
  allCourses {
    ...RegularCourse
  }
}
    ${RegularCourseFragmentDoc}`;

export function useAllCoursesQuery(options: Omit<Urql.UseQueryArgs<AllCoursesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllCoursesQuery>({ query: AllCoursesDocument, ...options });
};
export const CourseByShortNameDocument = gql`
    query CourseByShortName($shortName: String!) {
  courseByShortName(shortName: $shortName) {
    ...RegularCourse
  }
}
    ${RegularCourseFragmentDoc}`;

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
    ...RegularProject
  }
}
    ${RegularProjectFragmentDoc}`;

export function useProjectsQuery(options: Omit<Urql.UseQueryArgs<ProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectsQuery>({ query: ProjectsDocument, ...options });
};
export const AllProjectsDocument = gql`
    query AllProjects {
  allProjects {
    ...RegularProject
  }
}
    ${RegularProjectFragmentDoc}`;

export function useAllProjectsQuery(options: Omit<Urql.UseQueryArgs<AllProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllProjectsQuery>({ query: AllProjectsDocument, ...options });
};
export const ProjectByShortNameDocument = gql`
    query ProjectByShortName($shortName: String!) {
  projectByShortName(shortName: $shortName) {
    ...RegularProject
  }
}
    ${RegularProjectFragmentDoc}`;

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
    ...RegularTalk
  }
}
    ${RegularTalkFragmentDoc}`;

export function useTalksQuery(options: Omit<Urql.UseQueryArgs<TalksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TalksQuery>({ query: TalksDocument, ...options });
};
export const AllTalksDocument = gql`
    query AllTalks {
  allTalks {
    ...RegularTalk
  }
}
    ${RegularTalkFragmentDoc}`;

export function useAllTalksQuery(options: Omit<Urql.UseQueryArgs<AllTalksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllTalksQuery>({ query: AllTalksDocument, ...options });
};
export const TalkByShortNameDocument = gql`
    query TalkByShortName($shortName: String!) {
  talkByShortName(shortName: $shortName) {
    ...RegularTalk
  }
}
    ${RegularTalkFragmentDoc}`;

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
    ...RegularTutorial
  }
}
    ${RegularTutorialFragmentDoc}`;

export function useTutorialsQuery(options: Omit<Urql.UseQueryArgs<TutorialsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TutorialsQuery>({ query: TutorialsDocument, ...options });
};
export const AllTutorialsDocument = gql`
    query AllTutorials {
  allTutorials {
    ...RegularTutorial
  }
}
    ${RegularTutorialFragmentDoc}`;

export function useAllTutorialsQuery(options: Omit<Urql.UseQueryArgs<AllTutorialsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllTutorialsQuery>({ query: AllTutorialsDocument, ...options });
};
export const TutorialByShortNameDocument = gql`
    query TutorialByShortName($shortName: String!) {
  tutorialByShortName(shortName: $shortName) {
    ...RegularTutorial
  }
}
    ${RegularTutorialFragmentDoc}`;

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