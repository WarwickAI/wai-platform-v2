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

export type ApplyRoleInput = {
  description: Scalars['String'];
  img: Scalars['String'];
  shortName: Scalars['String'];
  title: Scalars['String'];
};

export type Course = {
  __typename?: 'Course';
  coverImg?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  display?: Maybe<Scalars['Boolean']>;
  iconImg?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  joinable?: Maybe<Scalars['Boolean']>;
  previewImg?: Maybe<Scalars['String']>;
  redirectUrl?: Maybe<Scalars['String']>;
  shortName: Scalars['String'];
  tags: Array<Tag>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
};

export type CourseResponse = {
  __typename?: 'CourseResponse';
  course: Course;
  errors?: Maybe<Array<FieldError>>;
};

export type ElectionRole = {
  __typename?: 'ElectionRole';
  applicationTemplate?: Maybe<Scalars['String']>;
  applications: Array<RoleApplication>;
  canApply?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['String'];
  description: Scalars['String'];
  display?: Maybe<Scalars['Boolean']>;
  id: Scalars['Float'];
  previewImg?: Maybe<Scalars['String']>;
  shortName: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ElectionRoleInput = {
  applicationTemplate: Scalars['String'];
  canApply: Scalars['Boolean'];
  description: Scalars['String'];
  display: Scalars['Boolean'];
  previewImg: Scalars['String'];
  shortName: Scalars['String'];
  title: Scalars['String'];
};

export type ElectionRoleResponse = {
  __typename?: 'ElectionRoleResponse';
  errors?: Maybe<Array<FieldError>>;
  role: ElectionRole;
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
  tags: Array<Scalars['Float']>;
  title: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type MemberInfoInput = {
  dataJoined: Scalars['String'];
  name: Scalars['String'];
  uniId: Scalars['Float'];
};

export type Merch = {
  __typename?: 'Merch';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  display?: Maybe<Scalars['Boolean']>;
  id: Scalars['Float'];
  image: Scalars['String'];
  shortName: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  variants: Array<Variant>;
};

export type MerchInput = {
  description: Scalars['String'];
  display: Scalars['Boolean'];
  image: Scalars['String'];
  shortName: Scalars['String'];
  title: Scalars['String'];
  variants: Array<VariantInput>;
};

export type MerchResponse = {
  __typename?: 'MerchResponse';
  errors?: Maybe<Array<FieldError>>;
  item?: Maybe<Merch>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMemberInfo: Scalars['Boolean'];
  createCourse: CourseResponse;
  createElectionRole: ElectionRoleResponse;
  createMerch: MerchResponse;
  createProject: ProjectResponse;
  createRoleApplication: RoleApplicationResponse;
  createTag: TagResponse;
  createTalk: TalkResponse;
  createTutorial: TutorialResponse;
  deleteAllUsers: Scalars['Boolean'];
  editCourse: CourseResponse;
  editElectionRole: ElectionRoleResponse;
  editMerch: MerchResponse;
  editProject: ProjectResponse;
  editRoleApplication: RoleApplicationResponse;
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
  roleApply: RoleApplicationResponse;
  updateMembership: Scalars['Boolean'];
  updateUserRole?: Maybe<User>;
  verifyLogin?: Maybe<User>;
};


export type MutationAddMemberInfoArgs = {
  memberInfo: Array<MemberInfoInput>;
};


export type MutationCreateCourseArgs = {
  courseInfo: EventInput;
};


export type MutationCreateElectionRoleArgs = {
  roleInfo: ElectionRoleInput;
};


export type MutationCreateMerchArgs = {
  itemInfo: MerchInput;
};


export type MutationCreateProjectArgs = {
  projectInfo: EventInput;
};


export type MutationCreateRoleApplicationArgs = {
  applicationInfo: RoleApplicationInput;
  roleId?: InputMaybe<Scalars['Float']>;
  roleShortName?: InputMaybe<Scalars['String']>;
};


export type MutationCreateTagArgs = {
  tagInfo: TagInput;
};


export type MutationCreateTalkArgs = {
  talkInfo: EventInput;
};


export type MutationCreateTutorialArgs = {
  tutorialInfo: EventInput;
};


export type MutationEditCourseArgs = {
  courseInfo: EventInput;
  id: Scalars['Float'];
};


export type MutationEditElectionRoleArgs = {
  id: Scalars['Float'];
  roleInfo: ElectionRoleInput;
};


export type MutationEditMerchArgs = {
  id: Scalars['Float'];
  itemInfo: MerchInput;
};


export type MutationEditProjectArgs = {
  id: Scalars['Float'];
  projectInfo: EventInput;
};


export type MutationEditRoleApplicationArgs = {
  applicationInfo: RoleApplicationInput;
  id: Scalars['Float'];
};


export type MutationEditTalkArgs = {
  id: Scalars['Float'];
  talkInfo: EventInput;
};


export type MutationEditTutorialArgs = {
  id: Scalars['Float'];
  tutorialInfo: EventInput;
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


export type MutationRoleApplyArgs = {
  applicationInfo: ApplyRoleInput;
  roleId?: InputMaybe<Scalars['Float']>;
  roleShortName?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserRoleArgs = {
  email: Scalars['String'];
  role: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  coverImg?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  display?: Maybe<Scalars['Boolean']>;
  iconImg?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  joinable?: Maybe<Scalars['Boolean']>;
  previewImg?: Maybe<Scalars['String']>;
  redirectUrl?: Maybe<Scalars['String']>;
  shortName: Scalars['String'];
  tags: Array<Tag>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
};

export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  errors?: Maybe<Array<FieldError>>;
  project: Project;
};

export type Query = {
  __typename?: 'Query';
  allCourses: Array<Course>;
  allElectionRoles: Array<ElectionRole>;
  allMerch: Array<Merch>;
  allProjects: Array<Project>;
  allRoleApplications: Array<RoleApplication>;
  allTalks: Array<Talk>;
  allTutorials: Array<Tutorial>;
  courseByShortName?: Maybe<Course>;
  courseUsers: Array<User>;
  courses: Array<Course>;
  electionRoleAllApplications: Array<RoleApplication>;
  electionRoleApplications: Array<RoleApplication>;
  electionRoles: Array<ElectionRole>;
  getElectionRole?: Maybe<ElectionRole>;
  getRoleApplication?: Maybe<RoleApplication>;
  getUserRoleApplications?: Maybe<Array<ElectionRole>>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  merch: Array<Merch>;
  merchByShortName?: Maybe<Merch>;
  projectByShortName?: Maybe<Project>;
  projectUsers: Array<User>;
  projects: Array<Project>;
  roleApplicationElectionRole?: Maybe<ElectionRole>;
  roleApplications: Array<RoleApplication>;
  tags: Array<Tag>;
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


export type QueryElectionRoleAllApplicationsArgs = {
  roleId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
};


export type QueryElectionRoleApplicationsArgs = {
  roleId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
};


export type QueryGetElectionRoleArgs = {
  roleId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
};


export type QueryGetRoleApplicationArgs = {
  applicationId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
};


export type QueryMerchByShortNameArgs = {
  shortName: Scalars['String'];
};


export type QueryProjectByShortNameArgs = {
  shortName: Scalars['String'];
};


export type QueryProjectUsersArgs = {
  projectId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
};


export type QueryRoleApplicationElectionRoleArgs = {
  applicationId?: InputMaybe<Scalars['Float']>;
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

export type RoleApplication = {
  __typename?: 'RoleApplication';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  display?: Maybe<Scalars['Boolean']>;
  id: Scalars['Float'];
  img?: Maybe<Scalars['String']>;
  role: ElectionRole;
  shortName: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export type RoleApplicationInput = {
  description: Scalars['String'];
  display: Scalars['Boolean'];
  img: Scalars['String'];
  shortName: Scalars['String'];
  title: Scalars['String'];
};

export type RoleApplicationResponse = {
  __typename?: 'RoleApplicationResponse';
  application?: Maybe<RoleApplication>;
  errors?: Maybe<Array<FieldError>>;
};

export type Tag = {
  __typename?: 'Tag';
  color: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type TagInput = {
  color: Scalars['String'];
  title: Scalars['String'];
};

export type TagResponse = {
  __typename?: 'TagResponse';
  errors?: Maybe<Array<FieldError>>;
  tag: Tag;
};

export type Talk = {
  __typename?: 'Talk';
  coverImg?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  display?: Maybe<Scalars['Boolean']>;
  iconImg?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  joinable?: Maybe<Scalars['Boolean']>;
  previewImg?: Maybe<Scalars['String']>;
  redirectUrl?: Maybe<Scalars['String']>;
  shortName: Scalars['String'];
  tags: Array<Tag>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
};

export type TalkResponse = {
  __typename?: 'TalkResponse';
  errors?: Maybe<Array<FieldError>>;
  talk: Talk;
};

export type Tutorial = {
  __typename?: 'Tutorial';
  coverImg?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  display?: Maybe<Scalars['Boolean']>;
  iconImg?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  joinable?: Maybe<Scalars['Boolean']>;
  previewImg?: Maybe<Scalars['String']>;
  redirectUrl?: Maybe<Scalars['String']>;
  shortName: Scalars['String'];
  tags: Array<Tag>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
};

export type TutorialResponse = {
  __typename?: 'TutorialResponse';
  errors?: Maybe<Array<FieldError>>;
  tutorial: Tutorial;
};

export type User = {
  __typename?: 'User';
  applications: Array<RoleApplication>;
  cognitoUsername: Scalars['String'];
  courses: Array<Course>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Float'];
  isMember?: Maybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  memberFromDate?: Maybe<Scalars['String']>;
  projects: Array<Project>;
  role: Scalars['String'];
  talks: Array<Talk>;
  tokenVersion: Scalars['Float'];
  tutorials: Array<Tutorial>;
  uniId?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['String'];
};

export type Variant = {
  __typename?: 'Variant';
  link: Scalars['String'];
  name: Scalars['String'];
};

export type VariantInput = {
  link: Scalars['String'];
  name: Scalars['String'];
};

export type RegularUserFragment = { __typename?: 'User', id: number, uniId?: number | null | undefined, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null | undefined, isMember?: boolean | null | undefined, projects: Array<{ __typename?: 'Project', id: number, shortName: string }>, talks: Array<{ __typename?: 'Talk', id: number, shortName: string }>, courses: Array<{ __typename?: 'Course', id: number, shortName: string }>, tutorials: Array<{ __typename?: 'Tutorial', id: number, shortName: string }> };

export type RegularUserWithoutEventsFragment = { __typename?: 'User', id: number, uniId?: number | null | undefined, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null | undefined, isMember?: boolean | null | undefined };

export type RegularRoleApplicationFragment = { __typename?: 'RoleApplication', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, img?: string | null | undefined };

export type RegularRoleApplicationWithElectionRoleFragment = { __typename?: 'RoleApplication', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, img?: string | null | undefined, role: { __typename?: 'ElectionRole', id: number, shortName: string, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, description: string, previewImg?: string | null | undefined } };

export type RegularElectionRoleFragment = { __typename?: 'ElectionRole', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, applicationTemplate?: string | null | undefined, previewImg?: string | null | undefined, canApply?: boolean | null | undefined };

export type RegularElectionRoleWithApplicationsFragment = { __typename?: 'ElectionRole', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, applicationTemplate?: string | null | undefined, previewImg?: string | null | undefined, canApply?: boolean | null | undefined, applications: Array<{ __typename?: 'RoleApplication', id: number, display?: boolean | null | undefined, createdAt: string, updatedAt: string, title: string, description: string, shortName: string }> };

export type RegularCourseFragment = { __typename?: 'Course', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> };

export type RegularProjectFragment = { __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> };

export type RegularTalkFragment = { __typename?: 'Talk', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> };

export type RegularTutorialFragment = { __typename?: 'Tutorial', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> };

export type RegularTagFragment = { __typename?: 'Tag', id: number, title: string, color: string };

export type AddMemberInfoMutationVariables = Exact<{
  memberInfo: Array<MemberInfoInput> | MemberInfoInput;
}>;


export type AddMemberInfoMutation = { __typename?: 'Mutation', addMemberInfo: boolean };

export type UpdateMembershipMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateMembershipMutation = { __typename?: 'Mutation', updateMembership: boolean };

export type CreateCourseMutationVariables = Exact<{
  courseInfo: EventInput;
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse: { __typename?: 'CourseResponse', course: { __typename?: 'Course', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> }, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditCourseMutationVariables = Exact<{
  courseInfo: EventInput;
  id: Scalars['Float'];
}>;


export type EditCourseMutation = { __typename?: 'Mutation', editCourse: { __typename?: 'CourseResponse', course: { __typename?: 'Course', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> }, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

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

export type CreateElectionRoleMutationVariables = Exact<{
  roleInfo: ElectionRoleInput;
}>;


export type CreateElectionRoleMutation = { __typename?: 'Mutation', createElectionRole: { __typename?: 'ElectionRoleResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, role: { __typename?: 'ElectionRole', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, applicationTemplate?: string | null | undefined, previewImg?: string | null | undefined, canApply?: boolean | null | undefined } } };

export type EditElectionRoleMutationVariables = Exact<{
  roleInfo: ElectionRoleInput;
  editElectionRoleId: Scalars['Float'];
}>;


export type EditElectionRoleMutation = { __typename?: 'Mutation', editElectionRole: { __typename?: 'ElectionRoleResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, role: { __typename?: 'ElectionRole', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, applicationTemplate?: string | null | undefined, previewImg?: string | null | undefined, canApply?: boolean | null | undefined } } };

export type RoleApplyMutationVariables = Exact<{
  roleShortName?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Float']>;
  applicationInfo: ApplyRoleInput;
}>;


export type RoleApplyMutation = { __typename?: 'Mutation', roleApply: { __typename?: 'RoleApplicationResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null | undefined, application?: { __typename?: 'RoleApplication', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, img?: string | null | undefined } | null | undefined } };

export type CreateRoleApplicationMutationVariables = Exact<{
  applicationInfo: RoleApplicationInput;
  roleId?: InputMaybe<Scalars['Float']>;
  roleShortName?: InputMaybe<Scalars['String']>;
}>;


export type CreateRoleApplicationMutation = { __typename?: 'Mutation', createRoleApplication: { __typename?: 'RoleApplicationResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, application?: { __typename?: 'RoleApplication', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, img?: string | null | undefined } | null | undefined } };

export type EditRoleApplicationMutationVariables = Exact<{
  applicationInfo: RoleApplicationInput;
  editRoleApplicationId: Scalars['Float'];
}>;


export type EditRoleApplicationMutation = { __typename?: 'Mutation', editRoleApplication: { __typename?: 'RoleApplicationResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null | undefined, application?: { __typename?: 'RoleApplication', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, img?: string | null | undefined } | null | undefined } };

export type CreateMerchMutationVariables = Exact<{
  itemInfo: MerchInput;
}>;


export type CreateMerchMutation = { __typename?: 'Mutation', createMerch: { __typename?: 'MerchResponse', item?: { __typename?: 'Merch', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, image: string, variants: Array<{ __typename?: 'Variant', name: string, link: string }> } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditMerchMutationVariables = Exact<{
  itemInfo: MerchInput;
  id: Scalars['Float'];
}>;


export type EditMerchMutation = { __typename?: 'Mutation', editMerch: { __typename?: 'MerchResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, item?: { __typename?: 'Merch', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, image: string, variants: Array<{ __typename?: 'Variant', name: string, link: string }> } | null | undefined } };

export type CreateProjectMutationVariables = Exact<{
  projectInfo: EventInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'ProjectResponse', project: { __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> }, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditProjectMutationVariables = Exact<{
  projectInfo: EventInput;
  id: Scalars['Float'];
}>;


export type EditProjectMutation = { __typename?: 'Mutation', editProject: { __typename?: 'ProjectResponse', project: { __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> }, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

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

export type CreateTagMutationVariables = Exact<{
  tagInfo: TagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'TagResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, tag: { __typename?: 'Tag', id: number, title: string, color: string } } };

export type CreateTalkMutationVariables = Exact<{
  talkInfo: EventInput;
}>;


export type CreateTalkMutation = { __typename?: 'Mutation', createTalk: { __typename?: 'TalkResponse', talk: { __typename?: 'Talk', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> }, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditTalkMutationVariables = Exact<{
  talkInfo: EventInput;
  id: Scalars['Float'];
}>;


export type EditTalkMutation = { __typename?: 'Mutation', editTalk: { __typename?: 'TalkResponse', talk: { __typename?: 'Talk', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> }, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

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
  tutorialInfo: EventInput;
}>;


export type CreateTutorialMutation = { __typename?: 'Mutation', createTutorial: { __typename?: 'TutorialResponse', tutorial: { __typename?: 'Tutorial', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> }, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditTutorialMutationVariables = Exact<{
  tutorialInfo: EventInput;
  id: Scalars['Float'];
}>;


export type EditTutorialMutation = { __typename?: 'Mutation', editTutorial: { __typename?: 'TutorialResponse', tutorial: { __typename?: 'Tutorial', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> }, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

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


export type VerifyLoginMutation = { __typename?: 'Mutation', verifyLogin?: { __typename?: 'User', id: number, uniId?: number | null | undefined, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null | undefined, isMember?: boolean | null | undefined, projects: Array<{ __typename?: 'Project', id: number, shortName: string }>, talks: Array<{ __typename?: 'Talk', id: number, shortName: string }>, courses: Array<{ __typename?: 'Course', id: number, shortName: string }>, tutorials: Array<{ __typename?: 'Tutorial', id: number, shortName: string }> } | null | undefined };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateUserRoleMutationVariables = Exact<{
  role: Scalars['String'];
  email: Scalars['String'];
}>;


export type UpdateUserRoleMutation = { __typename?: 'Mutation', updateUserRole?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, firstName: string, lastName: string, email: string, cognitoUsername: string, tokenVersion: number, role: string } | null | undefined };

export type CoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type CoursesQuery = { __typename?: 'Query', courses: Array<{ __typename?: 'Course', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> }> };

export type AllCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCoursesQuery = { __typename?: 'Query', allCourses: Array<{ __typename?: 'Course', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> }> };

export type CourseByShortNameQueryVariables = Exact<{
  shortName: Scalars['String'];
}>;


export type CourseByShortNameQuery = { __typename?: 'Query', courseByShortName?: { __typename?: 'Course', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> } | null | undefined };

export type CourseUsersQueryVariables = Exact<{
  courseId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type CourseUsersQuery = { __typename?: 'Query', courseUsers: Array<{ __typename?: 'User', id: number, uniId?: number | null | undefined, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null | undefined, isMember?: boolean | null | undefined }> };

export type ElectionRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type ElectionRolesQuery = { __typename?: 'Query', electionRoles: Array<{ __typename?: 'ElectionRole', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, applicationTemplate?: string | null | undefined, previewImg?: string | null | undefined, canApply?: boolean | null | undefined }> };

export type AllElectionRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllElectionRolesQuery = { __typename?: 'Query', allElectionRoles: Array<{ __typename?: 'ElectionRole', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, applicationTemplate?: string | null | undefined, previewImg?: string | null | undefined, canApply?: boolean | null | undefined }> };

export type ElectionRoleApplicationsQueryVariables = Exact<{
  shortName?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Float']>;
}>;


export type ElectionRoleApplicationsQuery = { __typename?: 'Query', electionRoleApplications: Array<{ __typename?: 'RoleApplication', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, img?: string | null | undefined }> };

export type ElectionRoleAllApplicationsQueryVariables = Exact<{
  shortName?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Float']>;
}>;


export type ElectionRoleAllApplicationsQuery = { __typename?: 'Query', electionRoleAllApplications: Array<{ __typename?: 'RoleApplication', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, img?: string | null | undefined }> };

export type GetElectionRoleQueryVariables = Exact<{
  shortName?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Float']>;
}>;


export type GetElectionRoleQuery = { __typename?: 'Query', getElectionRole?: { __typename?: 'ElectionRole', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, applicationTemplate?: string | null | undefined, previewImg?: string | null | undefined, canApply?: boolean | null | undefined, applications: Array<{ __typename?: 'RoleApplication', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, img?: string | null | undefined }> } | null | undefined };

export type RoleApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type RoleApplicationsQuery = { __typename?: 'Query', roleApplications: Array<{ __typename?: 'RoleApplication', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, img?: string | null | undefined }> };

export type AllRoleApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllRoleApplicationsQuery = { __typename?: 'Query', allRoleApplications: Array<{ __typename?: 'RoleApplication', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, img?: string | null | undefined }> };

export type GetRoleApplicationQueryVariables = Exact<{
  shortName?: InputMaybe<Scalars['String']>;
  applicationId?: InputMaybe<Scalars['Float']>;
}>;


export type GetRoleApplicationQuery = { __typename?: 'Query', getRoleApplication?: { __typename?: 'RoleApplication', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, img?: string | null | undefined } | null | undefined };

export type RoleApplicationElectionRoleQueryVariables = Exact<{
  shortName?: InputMaybe<Scalars['String']>;
  applicationId?: InputMaybe<Scalars['Float']>;
}>;


export type RoleApplicationElectionRoleQuery = { __typename?: 'Query', roleApplicationElectionRole?: { __typename?: 'ElectionRole', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, applicationTemplate?: string | null | undefined, previewImg?: string | null | undefined, canApply?: boolean | null | undefined } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, uniId?: number | null | undefined, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null | undefined, isMember?: boolean | null | undefined, projects: Array<{ __typename?: 'Project', id: number, shortName: string }>, talks: Array<{ __typename?: 'Talk', id: number, shortName: string }>, courses: Array<{ __typename?: 'Course', id: number, shortName: string }>, tutorials: Array<{ __typename?: 'Tutorial', id: number, shortName: string }> } | null | undefined };

export type MerchQueryVariables = Exact<{ [key: string]: never; }>;


export type MerchQuery = { __typename?: 'Query', merch: Array<{ __typename?: 'Merch', id: number, display?: boolean | null | undefined, title: string, shortName: string, image: string }> };

export type AllMerchQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMerchQuery = { __typename?: 'Query', allMerch: Array<{ __typename?: 'Merch', id: number, display?: boolean | null | undefined, title: string, shortName: string, image: string }> };

export type MerchByShortNameQueryVariables = Exact<{
  shortName: Scalars['String'];
}>;


export type MerchByShortNameQuery = { __typename?: 'Query', merchByShortName?: { __typename?: 'Merch', id: number, display?: boolean | null | undefined, title: string, shortName: string, description: string, image: string, variants: Array<{ __typename?: 'Variant', name: string, link: string }> } | null | undefined };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> }> };

export type AllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProjectsQuery = { __typename?: 'Query', allProjects: Array<{ __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> }> };

export type ProjectByShortNameQueryVariables = Exact<{
  shortName: Scalars['String'];
}>;


export type ProjectByShortNameQuery = { __typename?: 'Query', projectByShortName?: { __typename?: 'Project', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> } | null | undefined };

export type ProjectUsersQueryVariables = Exact<{
  projectId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type ProjectUsersQuery = { __typename?: 'Query', projectUsers: Array<{ __typename?: 'User', id: number, uniId?: number | null | undefined, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null | undefined, isMember?: boolean | null | undefined }> };

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> };

export type TalksQueryVariables = Exact<{ [key: string]: never; }>;


export type TalksQuery = { __typename?: 'Query', talks: Array<{ __typename?: 'Talk', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> }> };

export type AllTalksQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTalksQuery = { __typename?: 'Query', allTalks: Array<{ __typename?: 'Talk', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> }> };

export type TalkByShortNameQueryVariables = Exact<{
  shortName: Scalars['String'];
}>;


export type TalkByShortNameQuery = { __typename?: 'Query', talkByShortName?: { __typename?: 'Talk', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> } | null | undefined };

export type TalkUsersQueryVariables = Exact<{
  talkId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type TalkUsersQuery = { __typename?: 'Query', talkUsers: Array<{ __typename?: 'User', id: number, uniId?: number | null | undefined, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null | undefined, isMember?: boolean | null | undefined }> };

export type TutorialsQueryVariables = Exact<{ [key: string]: never; }>;


export type TutorialsQuery = { __typename?: 'Query', tutorials: Array<{ __typename?: 'Tutorial', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> }> };

export type AllTutorialsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTutorialsQuery = { __typename?: 'Query', allTutorials: Array<{ __typename?: 'Tutorial', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> }> };

export type TutorialByShortNameQueryVariables = Exact<{
  shortName: Scalars['String'];
}>;


export type TutorialByShortNameQuery = { __typename?: 'Query', tutorialByShortName?: { __typename?: 'Tutorial', id: number, display?: boolean | null | undefined, title: string, shortName: string, description?: string | null | undefined, previewImg?: string | null | undefined, iconImg?: string | null | undefined, coverImg?: string | null | undefined, redirectUrl?: string | null | undefined, joinable?: boolean | null | undefined, tags: Array<{ __typename?: 'Tag', id: number, title: string, color: string }> } | null | undefined };

export type TutorialUsersQueryVariables = Exact<{
  tutorialId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
}>;


export type TutorialUsersQuery = { __typename?: 'Query', tutorialUsers: Array<{ __typename?: 'User', id: number, uniId?: number | null | undefined, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null | undefined, isMember?: boolean | null | undefined }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, uniId?: number | null | undefined, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null | undefined, isMember?: boolean | null | undefined }> };

export type GetUserRoleApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserRoleApplicationsQuery = { __typename?: 'Query', getUserRoleApplications?: Array<{ __typename?: 'ElectionRole', id: number, createdAt: string, updatedAt: string, display?: boolean | null | undefined, title: string, shortName: string, description: string, applicationTemplate?: string | null | undefined, previewImg?: string | null | undefined, canApply?: boolean | null | undefined }> | null | undefined };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  uniId
  firstName
  lastName
  email
  role
  memberFromDate
  isMember
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
    `;
export const RegularUserWithoutEventsFragmentDoc = gql`
    fragment RegularUserWithoutEvents on User {
  id
  uniId
  firstName
  lastName
  email
  role
  memberFromDate
  isMember
}
    `;
export const RegularRoleApplicationFragmentDoc = gql`
    fragment RegularRoleApplication on RoleApplication {
  id
  createdAt
  updatedAt
  display
  title
  shortName
  description
  img
}
    `;
export const RegularRoleApplicationWithElectionRoleFragmentDoc = gql`
    fragment RegularRoleApplicationWithElectionRole on RoleApplication {
  id
  createdAt
  updatedAt
  display
  title
  shortName
  description
  img
  role {
    id
    shortName
    createdAt
    updatedAt
    display
    title
    description
    previewImg
  }
}
    `;
export const RegularElectionRoleFragmentDoc = gql`
    fragment RegularElectionRole on ElectionRole {
  id
  createdAt
  updatedAt
  display
  title
  shortName
  description
  applicationTemplate
  previewImg
  canApply
}
    `;
export const RegularElectionRoleWithApplicationsFragmentDoc = gql`
    fragment RegularElectionRoleWithApplications on ElectionRole {
  id
  createdAt
  updatedAt
  display
  title
  shortName
  description
  applicationTemplate
  previewImg
  canApply
  applications {
    id
    display
    createdAt
    updatedAt
    title
    description
    shortName
  }
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
  tags {
    id
    title
    color
  }
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
  tags {
    id
    title
    color
  }
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
  tags {
    id
    title
    color
  }
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
  tags {
    id
    title
    color
  }
}
    `;
export const RegularTagFragmentDoc = gql`
    fragment RegularTag on Tag {
  id
  title
  color
}
    `;
export const AddMemberInfoDocument = gql`
    mutation AddMemberInfo($memberInfo: [MemberInfoInput!]!) {
  addMemberInfo(memberInfo: $memberInfo)
}
    `;

export function useAddMemberInfoMutation() {
  return Urql.useMutation<AddMemberInfoMutation, AddMemberInfoMutationVariables>(AddMemberInfoDocument);
};
export const UpdateMembershipDocument = gql`
    mutation UpdateMembership {
  updateMembership
}
    `;

export function useUpdateMembershipMutation() {
  return Urql.useMutation<UpdateMembershipMutation, UpdateMembershipMutationVariables>(UpdateMembershipDocument);
};
export const CreateCourseDocument = gql`
    mutation CreateCourse($courseInfo: EventInput!) {
  createCourse(courseInfo: $courseInfo) {
    course {
      ...RegularCourse
    }
    errors {
      field
      message
    }
  }
}
    ${RegularCourseFragmentDoc}`;

export function useCreateCourseMutation() {
  return Urql.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument);
};
export const EditCourseDocument = gql`
    mutation EditCourse($courseInfo: EventInput!, $id: Float!) {
  editCourse(courseInfo: $courseInfo, id: $id) {
    course {
      ...RegularCourse
    }
    errors {
      field
      message
    }
  }
}
    ${RegularCourseFragmentDoc}`;

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
export const CreateElectionRoleDocument = gql`
    mutation CreateElectionRole($roleInfo: ElectionRoleInput!) {
  createElectionRole(roleInfo: $roleInfo) {
    errors {
      field
      message
    }
    role {
      ...RegularElectionRole
    }
  }
}
    ${RegularElectionRoleFragmentDoc}`;

export function useCreateElectionRoleMutation() {
  return Urql.useMutation<CreateElectionRoleMutation, CreateElectionRoleMutationVariables>(CreateElectionRoleDocument);
};
export const EditElectionRoleDocument = gql`
    mutation EditElectionRole($roleInfo: ElectionRoleInput!, $editElectionRoleId: Float!) {
  editElectionRole(roleInfo: $roleInfo, id: $editElectionRoleId) {
    errors {
      field
      message
    }
    role {
      ...RegularElectionRole
    }
  }
}
    ${RegularElectionRoleFragmentDoc}`;

export function useEditElectionRoleMutation() {
  return Urql.useMutation<EditElectionRoleMutation, EditElectionRoleMutationVariables>(EditElectionRoleDocument);
};
export const RoleApplyDocument = gql`
    mutation RoleApply($roleShortName: String, $roleId: Float, $applicationInfo: ApplyRoleInput!) {
  roleApply(
    roleShortName: $roleShortName
    roleId: $roleId
    applicationInfo: $applicationInfo
  ) {
    errors {
      message
      field
    }
    application {
      ...RegularRoleApplication
    }
  }
}
    ${RegularRoleApplicationFragmentDoc}`;

export function useRoleApplyMutation() {
  return Urql.useMutation<RoleApplyMutation, RoleApplyMutationVariables>(RoleApplyDocument);
};
export const CreateRoleApplicationDocument = gql`
    mutation CreateRoleApplication($applicationInfo: RoleApplicationInput!, $roleId: Float, $roleShortName: String) {
  createRoleApplication(
    applicationInfo: $applicationInfo
    roleId: $roleId
    roleShortName: $roleShortName
  ) {
    errors {
      field
      message
    }
    application {
      ...RegularRoleApplication
    }
  }
}
    ${RegularRoleApplicationFragmentDoc}`;

export function useCreateRoleApplicationMutation() {
  return Urql.useMutation<CreateRoleApplicationMutation, CreateRoleApplicationMutationVariables>(CreateRoleApplicationDocument);
};
export const EditRoleApplicationDocument = gql`
    mutation EditRoleApplication($applicationInfo: RoleApplicationInput!, $editRoleApplicationId: Float!) {
  editRoleApplication(
    applicationInfo: $applicationInfo
    id: $editRoleApplicationId
  ) {
    errors {
      message
      field
    }
    application {
      ...RegularRoleApplication
    }
  }
}
    ${RegularRoleApplicationFragmentDoc}`;

export function useEditRoleApplicationMutation() {
  return Urql.useMutation<EditRoleApplicationMutation, EditRoleApplicationMutationVariables>(EditRoleApplicationDocument);
};
export const CreateMerchDocument = gql`
    mutation CreateMerch($itemInfo: MerchInput!) {
  createMerch(itemInfo: $itemInfo) {
    item {
      id
      display
      title
      shortName
      description
      image
      variants {
        name
        link
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateMerchMutation() {
  return Urql.useMutation<CreateMerchMutation, CreateMerchMutationVariables>(CreateMerchDocument);
};
export const EditMerchDocument = gql`
    mutation EditMerch($itemInfo: MerchInput!, $id: Float!) {
  editMerch(itemInfo: $itemInfo, id: $id) {
    errors {
      field
      message
    }
    item {
      id
      display
      title
      shortName
      description
      image
      variants {
        name
        link
      }
    }
  }
}
    `;

export function useEditMerchMutation() {
  return Urql.useMutation<EditMerchMutation, EditMerchMutationVariables>(EditMerchDocument);
};
export const CreateProjectDocument = gql`
    mutation CreateProject($projectInfo: EventInput!) {
  createProject(projectInfo: $projectInfo) {
    project {
      ...RegularProject
    }
    errors {
      field
      message
    }
  }
}
    ${RegularProjectFragmentDoc}`;

export function useCreateProjectMutation() {
  return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
};
export const EditProjectDocument = gql`
    mutation EditProject($projectInfo: EventInput!, $id: Float!) {
  editProject(projectInfo: $projectInfo, id: $id) {
    project {
      ...RegularProject
    }
    errors {
      field
      message
    }
  }
}
    ${RegularProjectFragmentDoc}`;

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
export const CreateTagDocument = gql`
    mutation CreateTag($tagInfo: TagInput!) {
  createTag(tagInfo: $tagInfo) {
    errors {
      field
      message
    }
    tag {
      ...RegularTag
    }
  }
}
    ${RegularTagFragmentDoc}`;

export function useCreateTagMutation() {
  return Urql.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument);
};
export const CreateTalkDocument = gql`
    mutation CreateTalk($talkInfo: EventInput!) {
  createTalk(talkInfo: $talkInfo) {
    talk {
      ...RegularTalk
    }
    errors {
      field
      message
    }
  }
}
    ${RegularTalkFragmentDoc}`;

export function useCreateTalkMutation() {
  return Urql.useMutation<CreateTalkMutation, CreateTalkMutationVariables>(CreateTalkDocument);
};
export const EditTalkDocument = gql`
    mutation EditTalk($talkInfo: EventInput!, $id: Float!) {
  editTalk(talkInfo: $talkInfo, id: $id) {
    talk {
      ...RegularTalk
    }
    errors {
      field
      message
    }
  }
}
    ${RegularTalkFragmentDoc}`;

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
    mutation CreateTutorial($tutorialInfo: EventInput!) {
  createTutorial(tutorialInfo: $tutorialInfo) {
    tutorial {
      ...RegularTutorial
    }
    errors {
      field
      message
    }
  }
}
    ${RegularTutorialFragmentDoc}`;

export function useCreateTutorialMutation() {
  return Urql.useMutation<CreateTutorialMutation, CreateTutorialMutationVariables>(CreateTutorialDocument);
};
export const EditTutorialDocument = gql`
    mutation EditTutorial($tutorialInfo: EventInput!, $id: Float!) {
  editTutorial(tutorialInfo: $tutorialInfo, id: $id) {
    tutorial {
      ...RegularTutorial
    }
    errors {
      field
      message
    }
  }
}
    ${RegularTutorialFragmentDoc}`;

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
    ...RegularUserWithoutEvents
  }
}
    ${RegularUserWithoutEventsFragmentDoc}`;

export function useCourseUsersQuery(options: Omit<Urql.UseQueryArgs<CourseUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CourseUsersQuery>({ query: CourseUsersDocument, ...options });
};
export const ElectionRolesDocument = gql`
    query ElectionRoles {
  electionRoles {
    ...RegularElectionRole
  }
}
    ${RegularElectionRoleFragmentDoc}`;

export function useElectionRolesQuery(options: Omit<Urql.UseQueryArgs<ElectionRolesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ElectionRolesQuery>({ query: ElectionRolesDocument, ...options });
};
export const AllElectionRolesDocument = gql`
    query AllElectionRoles {
  allElectionRoles {
    ...RegularElectionRole
  }
}
    ${RegularElectionRoleFragmentDoc}`;

export function useAllElectionRolesQuery(options: Omit<Urql.UseQueryArgs<AllElectionRolesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllElectionRolesQuery>({ query: AllElectionRolesDocument, ...options });
};
export const ElectionRoleApplicationsDocument = gql`
    query ElectionRoleApplications($shortName: String, $roleId: Float) {
  electionRoleApplications(shortName: $shortName, roleId: $roleId) {
    ...RegularRoleApplication
  }
}
    ${RegularRoleApplicationFragmentDoc}`;

export function useElectionRoleApplicationsQuery(options: Omit<Urql.UseQueryArgs<ElectionRoleApplicationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ElectionRoleApplicationsQuery>({ query: ElectionRoleApplicationsDocument, ...options });
};
export const ElectionRoleAllApplicationsDocument = gql`
    query ElectionRoleAllApplications($shortName: String, $roleId: Float) {
  electionRoleAllApplications(shortName: $shortName, roleId: $roleId) {
    ...RegularRoleApplication
  }
}
    ${RegularRoleApplicationFragmentDoc}`;

export function useElectionRoleAllApplicationsQuery(options: Omit<Urql.UseQueryArgs<ElectionRoleAllApplicationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ElectionRoleAllApplicationsQuery>({ query: ElectionRoleAllApplicationsDocument, ...options });
};
export const GetElectionRoleDocument = gql`
    query GetElectionRole($shortName: String, $roleId: Float) {
  getElectionRole(shortName: $shortName, roleId: $roleId) {
    ...RegularElectionRole
    applications {
      ...RegularRoleApplication
    }
  }
}
    ${RegularElectionRoleFragmentDoc}
${RegularRoleApplicationFragmentDoc}`;

export function useGetElectionRoleQuery(options: Omit<Urql.UseQueryArgs<GetElectionRoleQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetElectionRoleQuery>({ query: GetElectionRoleDocument, ...options });
};
export const RoleApplicationsDocument = gql`
    query RoleApplications {
  roleApplications {
    ...RegularRoleApplication
  }
}
    ${RegularRoleApplicationFragmentDoc}`;

export function useRoleApplicationsQuery(options: Omit<Urql.UseQueryArgs<RoleApplicationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RoleApplicationsQuery>({ query: RoleApplicationsDocument, ...options });
};
export const AllRoleApplicationsDocument = gql`
    query AllRoleApplications {
  allRoleApplications {
    ...RegularRoleApplication
  }
}
    ${RegularRoleApplicationFragmentDoc}`;

export function useAllRoleApplicationsQuery(options: Omit<Urql.UseQueryArgs<AllRoleApplicationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllRoleApplicationsQuery>({ query: AllRoleApplicationsDocument, ...options });
};
export const GetRoleApplicationDocument = gql`
    query GetRoleApplication($shortName: String, $applicationId: Float) {
  getRoleApplication(shortName: $shortName, applicationId: $applicationId) {
    ...RegularRoleApplication
  }
}
    ${RegularRoleApplicationFragmentDoc}`;

export function useGetRoleApplicationQuery(options: Omit<Urql.UseQueryArgs<GetRoleApplicationQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetRoleApplicationQuery>({ query: GetRoleApplicationDocument, ...options });
};
export const RoleApplicationElectionRoleDocument = gql`
    query RoleApplicationElectionRole($shortName: String, $applicationId: Float) {
  roleApplicationElectionRole(
    shortName: $shortName
    applicationId: $applicationId
  ) {
    ...RegularElectionRole
  }
}
    ${RegularElectionRoleFragmentDoc}`;

export function useRoleApplicationElectionRoleQuery(options: Omit<Urql.UseQueryArgs<RoleApplicationElectionRoleQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RoleApplicationElectionRoleQuery>({ query: RoleApplicationElectionRoleDocument, ...options });
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
export const MerchDocument = gql`
    query Merch {
  merch {
    id
    display
    title
    shortName
    image
  }
}
    `;

export function useMerchQuery(options: Omit<Urql.UseQueryArgs<MerchQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MerchQuery>({ query: MerchDocument, ...options });
};
export const AllMerchDocument = gql`
    query AllMerch {
  allMerch {
    id
    display
    title
    shortName
    image
  }
}
    `;

export function useAllMerchQuery(options: Omit<Urql.UseQueryArgs<AllMerchQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllMerchQuery>({ query: AllMerchDocument, ...options });
};
export const MerchByShortNameDocument = gql`
    query MerchByShortName($shortName: String!) {
  merchByShortName(shortName: $shortName) {
    id
    display
    title
    shortName
    description
    image
    variants {
      name
      link
    }
  }
}
    `;

export function useMerchByShortNameQuery(options: Omit<Urql.UseQueryArgs<MerchByShortNameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MerchByShortNameQuery>({ query: MerchByShortNameDocument, ...options });
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
    ...RegularUserWithoutEvents
  }
}
    ${RegularUserWithoutEventsFragmentDoc}`;

export function useProjectUsersQuery(options: Omit<Urql.UseQueryArgs<ProjectUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectUsersQuery>({ query: ProjectUsersDocument, ...options });
};
export const TagsDocument = gql`
    query Tags {
  tags {
    ...RegularTag
  }
}
    ${RegularTagFragmentDoc}`;

export function useTagsQuery(options: Omit<Urql.UseQueryArgs<TagsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TagsQuery>({ query: TagsDocument, ...options });
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
    ...RegularUserWithoutEvents
  }
}
    ${RegularUserWithoutEventsFragmentDoc}`;

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
    ...RegularUserWithoutEvents
  }
}
    ${RegularUserWithoutEventsFragmentDoc}`;

export function useTutorialUsersQuery(options: Omit<Urql.UseQueryArgs<TutorialUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TutorialUsersQuery>({ query: TutorialUsersDocument, ...options });
};
export const UsersDocument = gql`
    query Users {
  users {
    ...RegularUserWithoutEvents
  }
}
    ${RegularUserWithoutEventsFragmentDoc}`;

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};
export const GetUserRoleApplicationsDocument = gql`
    query GetUserRoleApplications {
  getUserRoleApplications {
    ...RegularElectionRole
  }
}
    ${RegularElectionRoleFragmentDoc}`;

export function useGetUserRoleApplicationsQuery(options: Omit<Urql.UseQueryArgs<GetUserRoleApplicationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserRoleApplicationsQuery>({ query: GetUserRoleApplicationsDocument, ...options });
};