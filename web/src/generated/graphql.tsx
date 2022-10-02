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
  JSONObject: any;
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
  canVote?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['String'];
  description: Scalars['String'];
  display?: Maybe<Scalars['Boolean']>;
  id: Scalars['Float'];
  previewImg?: Maybe<Scalars['String']>;
  shortName: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  votes: Array<Vote>;
};

export type ElectionRoleInput = {
  applicationTemplate: Scalars['String'];
  canApply: Scalars['Boolean'];
  canVote: Scalars['Boolean'];
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

export type Element = {
  __typename?: 'Element';
  canEditGroups: Array<Group>;
  canInteractGroups: Array<Group>;
  canModifyPermsGroups?: Maybe<Array<Group>>;
  canViewGroups: Array<Group>;
  children: Array<Element>;
  createdAt: Scalars['String'];
  createdBy: User;
  data: Scalars['JSONObject'];
  id: Scalars['Float'];
  index: Scalars['Float'];
  parent?: Maybe<Element>;
  route?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  updatedAt: Scalars['String'];
  user?: Maybe<User>;
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

export type File = {
  __typename?: 'File';
  fileHash: Scalars['String'];
  fileName: Scalars['String'];
  fileSize: Scalars['Float'];
  fileType: Scalars['String'];
  imgHeight?: Maybe<Scalars['Float']>;
  imgWidth?: Maybe<Scalars['Float']>;
  isImage: Scalars['Boolean'];
  key: Scalars['String'];
  uploadedAt: Scalars['String'];
  uploadedBy: User;
};

export type GetSignedUrlResponse = {
  __typename?: 'GetSignedUrlResponse';
  key: Scalars['String'];
  signedUrl?: Maybe<Scalars['String']>;
};

export type Group = {
  __typename?: 'Group';
  canEditElements: Array<Element>;
  canInteractElements: Array<Element>;
  canModifyPermsElements: Array<Element>;
  canViewElements: Array<Element>;
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
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
  addRONApplication: Scalars['Boolean'];
  addUserToGroup: Group;
  addUsersToGroup: Group;
  assignUserPage?: Maybe<Element>;
  createCourse: CourseResponse;
  createElectionRole: ElectionRoleResponse;
  createElement?: Maybe<Element>;
  createGroup: Group;
  createMerch: MerchResponse;
  createProject: ProjectResponse;
  createRoleApplication: RoleApplicationResponse;
  createTag: TagResponse;
  createTalk: TalkResponse;
  createTutorial: TutorialResponse;
  deleteAllUsers: Scalars['Boolean'];
  deleteGroup: Group;
  editCourse: CourseResponse;
  editDatabaseAttributeName: Element;
  editElectionRole: ElectionRoleResponse;
  editElementData: Element;
  editElementIndex: Element;
  editElementRoute: Element;
  editMerch: MerchResponse;
  editProject: ProjectResponse;
  editRoleApplication: RoleApplicationResponse;
  editTalk: TalkResponse;
  editTutorial: TutorialResponse;
  getSignedUrl: GetSignedUrlResponse;
  handleAction: Element;
  inheritDatabaseAttributes: Element;
  joinCourse: Scalars['Boolean'];
  joinProject: Scalars['Boolean'];
  joinTalk: Scalars['Boolean'];
  joinTutorial: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  removeElement: Element;
  removeUserFromCourse: Scalars['Boolean'];
  removeUserFromGroup: Group;
  removeUserFromProject: Scalars['Boolean'];
  removeUserFromTalk: Scalars['Boolean'];
  removeUserFromTutorial: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  roleApply: RoleApplicationResponse;
  updateMembership: Scalars['Boolean'];
  updatePermissions: Element;
  updateUserRole?: Maybe<User>;
  verifyLogin?: Maybe<User>;
  vote: Scalars['Boolean'];
};


export type MutationAddMemberInfoArgs = {
  memberInfo: Array<MemberInfoInput>;
};


export type MutationAddRonApplicationArgs = {
  roleId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
};


export type MutationAddUserToGroupArgs = {
  groupId: Scalars['Float'];
  userId: Scalars['Float'];
};


export type MutationAddUsersToGroupArgs = {
  groupId: Scalars['Float'];
  userId: Array<Scalars['Float']>;
};


export type MutationAssignUserPageArgs = {
  pageId: Scalars['Float'];
  uniId: Scalars['Float'];
};


export type MutationCreateCourseArgs = {
  courseInfo: EventInput;
};


export type MutationCreateElectionRoleArgs = {
  roleInfo: ElectionRoleInput;
};


export type MutationCreateElementArgs = {
  data: Scalars['JSONObject'];
  index: Scalars['Float'];
  parent?: InputMaybe<Scalars['Float']>;
  route?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  groupName: Scalars['String'];
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


export type MutationDeleteGroupArgs = {
  groupId: Scalars['Float'];
};


export type MutationEditCourseArgs = {
  courseInfo: EventInput;
  id: Scalars['Float'];
};


export type MutationEditDatabaseAttributeNameArgs = {
  attributeName: Scalars['String'];
  elementId: Scalars['Float'];
  newAttributeName: Scalars['String'];
};


export type MutationEditElectionRoleArgs = {
  id: Scalars['Float'];
  roleInfo: ElectionRoleInput;
};


export type MutationEditElementDataArgs = {
  data: Scalars['JSONObject'];
  elementId: Scalars['Float'];
};


export type MutationEditElementIndexArgs = {
  elementId: Scalars['Float'];
  index: Scalars['Float'];
};


export type MutationEditElementRouteArgs = {
  elementId: Scalars['Float'];
  route: Scalars['String'];
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


export type MutationGetSignedUrlArgs = {
  fileHash: Scalars['String'];
  fileName: Scalars['String'];
  fileSize: Scalars['Float'];
  fileType: Scalars['String'];
  imgHeight?: InputMaybe<Scalars['Float']>;
  imgWidth?: InputMaybe<Scalars['Float']>;
};


export type MutationHandleActionArgs = {
  buttonId: Scalars['Float'];
};


export type MutationInheritDatabaseAttributesArgs = {
  databaseId: Scalars['Float'];
  elementId: Scalars['Float'];
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


export type MutationRemoveElementArgs = {
  elementId: Scalars['Float'];
};


export type MutationRemoveUserFromCourseArgs = {
  courseId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
  userId: Scalars['Float'];
};


export type MutationRemoveUserFromGroupArgs = {
  groupId: Scalars['Float'];
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


export type MutationUpdatePermissionsArgs = {
  canEditGroups?: InputMaybe<Array<Scalars['Float']>>;
  canInteractGroups?: InputMaybe<Array<Scalars['Float']>>;
  canModifyPermsGroups?: InputMaybe<Array<Scalars['Float']>>;
  canViewGroups?: InputMaybe<Array<Scalars['Float']>>;
  elementId: Scalars['Float'];
};


export type MutationUpdateUserRoleArgs = {
  email: Scalars['String'];
  role: Scalars['String'];
};


export type MutationVoteArgs = {
  applicationId?: InputMaybe<Scalars['Float']>;
  applicationShortName?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Float']>;
  roleShortName?: InputMaybe<Scalars['String']>;
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
  getAllVotes: Array<Vote>;
  getElectionRole?: Maybe<ElectionRole>;
  getElement: Element;
  getElements: Array<Element>;
  getElementsNoChildren: Array<Element>;
  getFile: File;
  getRoleApplication?: Maybe<RoleApplication>;
  getRoleApplicationForVote: RoleApplicationResponseForVote;
  getRoleVoteCount: Array<RoleApplicationVoteCount>;
  getUser: User;
  getUserPage?: Maybe<Element>;
  getUserRoleApplications?: Maybe<Array<ElectionRole>>;
  getUsers: Array<User>;
  getUsersGroups?: Maybe<Array<Group>>;
  groups: Array<Group>;
  groupsWithUsers: Array<Group>;
  hasUserVotedForRole: Scalars['Boolean'];
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


export type QueryGetElementArgs = {
  children?: InputMaybe<Scalars['Boolean']>;
  elementId?: InputMaybe<Scalars['Float']>;
  route?: InputMaybe<Scalars['String']>;
};


export type QueryGetElementsArgs = {
  children?: InputMaybe<Scalars['Boolean']>;
  parentId?: InputMaybe<Scalars['Float']>;
  type?: InputMaybe<Scalars['String']>;
};


export type QueryGetFileArgs = {
  key: Scalars['String'];
};


export type QueryGetRoleApplicationArgs = {
  applicationId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
};


export type QueryGetRoleApplicationForVoteArgs = {
  voteId: Scalars['Float'];
};


export type QueryGetRoleVoteCountArgs = {
  roleId?: InputMaybe<Scalars['Float']>;
  shortName?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserArgs = {
  userId: Scalars['Float'];
};


export type QueryGetUserPageArgs = {
  uniId: Scalars['Float'];
};


export type QueryHasUserVotedForRoleArgs = {
  roleId?: InputMaybe<Scalars['Float']>;
  roleShortName?: InputMaybe<Scalars['String']>;
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
  votes: Array<Vote>;
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

export type RoleApplicationResponseForVote = {
  __typename?: 'RoleApplicationResponseForVote';
  message?: Maybe<Scalars['String']>;
  role?: Maybe<RoleApplication>;
};

export type RoleApplicationVoteCount = {
  __typename?: 'RoleApplicationVoteCount';
  application: RoleApplication;
  count: Scalars['Float'];
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
  elements: Array<Element>;
  email: Scalars['String'];
  files?: Maybe<Element>;
  firstName: Scalars['String'];
  groups: Array<Group>;
  id: Scalars['Float'];
  isMember?: Maybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  memberFromDate?: Maybe<Scalars['String']>;
  page?: Maybe<Element>;
  projects: Array<Project>;
  role: Scalars['String'];
  talks: Array<Talk>;
  tokenVersion: Scalars['Float'];
  tutorials: Array<Tutorial>;
  uniId?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['String'];
  votes: Array<Vote>;
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

export type Vote = {
  __typename?: 'Vote';
  application: RoleApplication;
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  role: ElectionRole;
  updatedAt: Scalars['String'];
  user: User;
};

export type ElementNoChildrenCreatedByGroupsFragment = { __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null };

export type ElementNoChildrenCreatedByFragment = { __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null };

export type ElementNoChildrenFragment = { __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null };

export type FullElementFragment = { __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, children: Array<{ __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null }>, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null };

export type FullElementChildrenNoChildrenCreatedByGroupsFragment = { __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, children: Array<{ __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null }>, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null };

export type ElementAfterRemoveFragment = { __typename?: 'Element', type: string, index: number, data: any, route?: string | null, parent?: { __typename?: 'Element', id: number } | null, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null };

export type FileWithoutUploadedByFragment = { __typename?: 'File', key: string, fileName: string, fileType: string, fileSize: number, isImage: boolean, imgWidth?: number | null, imgHeight?: number | null };

export type FullFileFragment = { __typename?: 'File', key: string, fileName: string, fileType: string, fileSize: number, isImage: boolean, imgWidth?: number | null, imgHeight?: number | null, uploadedBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null } };

export type GroupWithoutUsersFragment = { __typename?: 'Group', id: number, name: string };

export type GroupWithUsersFragment = { __typename?: 'Group', id: number, name: string, users: Array<{ __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null, groups: Array<{ __typename?: 'Group', id: number, name: string }> }> };

export type UserNoGroupsElementsFragment = { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null };

export type UserNoElementsFragment = { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null, groups: Array<{ __typename?: 'Group', id: number, name: string }> };

export type UserNoGroupsFragment = { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null, elements: Array<{ __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null }> };

export type UserFragment = { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null, groups: Array<{ __typename?: 'Group', id: number, name: string }>, elements: Array<{ __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null }> };

export type RegularUserFragment = { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null, groups: Array<{ __typename?: 'Group', id: number, name: string }> };

export type AddMemberInfoMutationVariables = Exact<{
  memberInfo: Array<MemberInfoInput> | MemberInfoInput;
}>;


export type AddMemberInfoMutation = { __typename?: 'Mutation', addMemberInfo: boolean };

export type UpdateMembershipMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateMembershipMutation = { __typename?: 'Mutation', updateMembership: boolean };

export type EditElementDataMutationVariables = Exact<{
  data: Scalars['JSONObject'];
  elementId: Scalars['Float'];
}>;


export type EditElementDataMutation = { __typename?: 'Mutation', editElementData: { __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, children: Array<{ __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null }>, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null } };

export type EditDatabaseAttributeNameMutationVariables = Exact<{
  elementId: Scalars['Float'];
  attributeName: Scalars['String'];
  newAttributeName: Scalars['String'];
}>;


export type EditDatabaseAttributeNameMutation = { __typename?: 'Mutation', editDatabaseAttributeName: { __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, children: Array<{ __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null }>, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null } };

export type EditElementIndexMutationVariables = Exact<{
  index: Scalars['Float'];
  elementId: Scalars['Float'];
}>;


export type EditElementIndexMutation = { __typename?: 'Mutation', editElementIndex: { __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, children: Array<{ __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null }>, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null } };

export type CreateElementMutationVariables = Exact<{
  type: Scalars['String'];
  data: Scalars['JSONObject'];
  index: Scalars['Float'];
  parent?: InputMaybe<Scalars['Float']>;
  route?: InputMaybe<Scalars['String']>;
}>;


export type CreateElementMutation = { __typename?: 'Mutation', createElement?: { __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, children: Array<{ __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null }>, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null } | null };

export type RemoveElementMutationVariables = Exact<{
  elementId: Scalars['Float'];
}>;


export type RemoveElementMutation = { __typename?: 'Mutation', removeElement: { __typename?: 'Element', type: string, index: number, data: any, route?: string | null, parent?: { __typename?: 'Element', id: number } | null, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null } };

export type UpdatePermissionsMutationVariables = Exact<{
  elementId: Scalars['Float'];
  canInteractGroups?: InputMaybe<Array<Scalars['Float']> | Scalars['Float']>;
  canViewGroups?: InputMaybe<Array<Scalars['Float']> | Scalars['Float']>;
  canEditGroups?: InputMaybe<Array<Scalars['Float']> | Scalars['Float']>;
  canModifyPermsGroups?: InputMaybe<Array<Scalars['Float']> | Scalars['Float']>;
}>;


export type UpdatePermissionsMutation = { __typename?: 'Mutation', updatePermissions: { __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, children: Array<{ __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null }>, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null } };

export type InheritDatabaseAttributesMutationVariables = Exact<{
  databaseId: Scalars['Float'];
  elementId: Scalars['Float'];
}>;


export type InheritDatabaseAttributesMutation = { __typename?: 'Mutation', inheritDatabaseAttributes: { __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, children: Array<{ __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null }>, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null } };

export type AssignUserPageMutationVariables = Exact<{
  uniId: Scalars['Float'];
  pageId: Scalars['Float'];
}>;


export type AssignUserPageMutation = { __typename?: 'Mutation', assignUserPage?: { __typename?: 'Element', id: number } | null };

export type HandleActionMutationVariables = Exact<{
  buttonId: Scalars['Float'];
}>;


export type HandleActionMutation = { __typename?: 'Mutation', handleAction: { __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, children: Array<{ __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null }>, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null } };

export type EditElementRouteMutationVariables = Exact<{
  elementId: Scalars['Float'];
  route: Scalars['String'];
}>;


export type EditElementRouteMutation = { __typename?: 'Mutation', editElementRoute: { __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, children: Array<{ __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null }>, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null } };

export type GetSignedUrlMutationVariables = Exact<{
  fileType: Scalars['String'];
  fileName: Scalars['String'];
  fileSize: Scalars['Float'];
  fileHash: Scalars['String'];
  imgWidth?: InputMaybe<Scalars['Float']>;
  imgHeight?: InputMaybe<Scalars['Float']>;
}>;


export type GetSignedUrlMutation = { __typename?: 'Mutation', getSignedUrl: { __typename?: 'GetSignedUrlResponse', signedUrl?: string | null, key: string } };

export type AddUserToGroupMutationVariables = Exact<{
  groupId: Scalars['Float'];
  userId: Scalars['Float'];
}>;


export type AddUserToGroupMutation = { __typename?: 'Mutation', addUserToGroup: { __typename?: 'Group', id: number, name: string, users: Array<{ __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null, groups: Array<{ __typename?: 'Group', id: number, name: string }> }> } };

export type RemoveUserFromGroupMutationVariables = Exact<{
  groupId: Scalars['Float'];
  userId: Scalars['Float'];
}>;


export type RemoveUserFromGroupMutation = { __typename?: 'Mutation', removeUserFromGroup: { __typename?: 'Group', id: number, name: string, users: Array<{ __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null, groups: Array<{ __typename?: 'Group', id: number, name: string }> }> } };

export type CreateGroupMutationVariables = Exact<{
  groupName: Scalars['String'];
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: number, name: string, users: Array<{ __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null, groups: Array<{ __typename?: 'Group', id: number, name: string }> }> } };

export type DeleteGroupMutationVariables = Exact<{
  groupId: Scalars['Float'];
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', deleteGroup: { __typename?: 'Group', name: string } };

export type VerifyLoginMutationVariables = Exact<{ [key: string]: never; }>;


export type VerifyLoginMutation = { __typename?: 'Mutation', verifyLogin?: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null, groups: Array<{ __typename?: 'Group', id: number, name: string }> } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateUserRoleMutationVariables = Exact<{
  role: Scalars['String'];
  email: Scalars['String'];
}>;


export type UpdateUserRoleMutation = { __typename?: 'Mutation', updateUserRole?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, firstName: string, lastName: string, email: string, cognitoUsername: string, tokenVersion: number, role: string } | null };

export type GetElementsQueryVariables = Exact<{
  type?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['Float']>;
  children?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetElementsQuery = { __typename?: 'Query', getElements: Array<{ __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, children: Array<{ __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null }>, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null }> };

export type GetElementQueryVariables = Exact<{
  elementId?: InputMaybe<Scalars['Float']>;
  route?: InputMaybe<Scalars['String']>;
  children?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetElementQuery = { __typename?: 'Query', getElement: { __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, children: Array<{ __typename?: 'Element', id: number, createdAt: string, updatedAt: string, type: string, index: number, data: any, route?: string | null, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null }>, createdBy: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null }, canViewGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canInteractGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canEditGroups: Array<{ __typename?: 'Group', id: number, name: string }>, canModifyPermsGroups?: Array<{ __typename?: 'Group', id: number, name: string }> | null, parent?: { __typename?: 'Element', id: number, type: string, route?: string | null, parent?: { __typename?: 'Element', id: number } | null } | null } };

export type GetUserPageQueryVariables = Exact<{
  uniId: Scalars['Float'];
}>;


export type GetUserPageQuery = { __typename?: 'Query', getUserPage?: { __typename?: 'Element', id: number } | null };

export type GetFileQueryVariables = Exact<{
  key: Scalars['String'];
}>;


export type GetFileQuery = { __typename?: 'Query', getFile: { __typename?: 'File', key: string, fileName: string, fileType: string, fileSize: number, isImage: boolean, imgWidth?: number | null, imgHeight?: number | null } };

export type GetGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGroupsQuery = { __typename?: 'Query', groups: Array<{ __typename?: 'Group', id: number, name: string }> };

export type GetGroupsWithUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGroupsWithUsersQuery = { __typename?: 'Query', groupsWithUsers: Array<{ __typename?: 'Group', id: number, name: string, users: Array<{ __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null, groups: Array<{ __typename?: 'Group', id: number, name: string }> }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null, groups: Array<{ __typename?: 'Group', id: number, name: string }> } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null, groups: Array<{ __typename?: 'Group', id: number, name: string }> }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null, groups: Array<{ __typename?: 'Group', id: number, name: string }> }> };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: number, uniId?: number | null, firstName: string, lastName: string, email: string, role: string, memberFromDate?: string | null, isMember?: boolean | null } };

export const ElementNoChildrenCreatedByGroupsFragmentDoc = gql`
    fragment ElementNoChildrenCreatedByGroups on Element {
  id
  createdAt
  updatedAt
  parent {
    id
    type
    parent {
      id
    }
    route
  }
  type
  index
  data
  route
}
    `;
export const GroupWithoutUsersFragmentDoc = gql`
    fragment GroupWithoutUsers on Group {
  id
  name
}
    `;
export const ElementNoChildrenCreatedByFragmentDoc = gql`
    fragment ElementNoChildrenCreatedBy on Element {
  ...ElementNoChildrenCreatedByGroups
  canViewGroups {
    ...GroupWithoutUsers
  }
  canInteractGroups {
    ...GroupWithoutUsers
  }
  canEditGroups {
    ...GroupWithoutUsers
  }
  canModifyPermsGroups {
    ...GroupWithoutUsers
  }
}
    ${ElementNoChildrenCreatedByGroupsFragmentDoc}
${GroupWithoutUsersFragmentDoc}`;
export const UserNoGroupsElementsFragmentDoc = gql`
    fragment UserNoGroupsElements on User {
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
export const ElementNoChildrenFragmentDoc = gql`
    fragment ElementNoChildren on Element {
  ...ElementNoChildrenCreatedBy
  createdBy {
    ...UserNoGroupsElements
  }
}
    ${ElementNoChildrenCreatedByFragmentDoc}
${UserNoGroupsElementsFragmentDoc}`;
export const FullElementFragmentDoc = gql`
    fragment FullElement on Element {
  ...ElementNoChildren
  children {
    ...ElementNoChildren
  }
}
    ${ElementNoChildrenFragmentDoc}`;
export const FullElementChildrenNoChildrenCreatedByGroupsFragmentDoc = gql`
    fragment FullElementChildrenNoChildrenCreatedByGroups on Element {
  ...ElementNoChildren
  children {
    ...ElementNoChildrenCreatedByGroups
  }
}
    ${ElementNoChildrenFragmentDoc}
${ElementNoChildrenCreatedByGroupsFragmentDoc}`;
export const ElementAfterRemoveFragmentDoc = gql`
    fragment ElementAfterRemove on Element {
  parent {
    id
  }
  type
  index
  data
  route
  canEditGroups {
    ...GroupWithoutUsers
  }
  canViewGroups {
    ...GroupWithoutUsers
  }
  canInteractGroups {
    ...GroupWithoutUsers
  }
  canModifyPermsGroups {
    ...GroupWithoutUsers
  }
}
    ${GroupWithoutUsersFragmentDoc}`;
export const FileWithoutUploadedByFragmentDoc = gql`
    fragment FileWithoutUploadedBy on File {
  key
  fileName
  fileType
  fileSize
  isImage
  imgWidth
  imgHeight
}
    `;
export const FullFileFragmentDoc = gql`
    fragment FullFile on File {
  ...FileWithoutUploadedBy
  uploadedBy {
    ...UserNoGroupsElements
  }
}
    ${FileWithoutUploadedByFragmentDoc}
${UserNoGroupsElementsFragmentDoc}`;
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
  groups {
    ...GroupWithoutUsers
  }
}
    ${GroupWithoutUsersFragmentDoc}`;
export const GroupWithUsersFragmentDoc = gql`
    fragment GroupWithUsers on Group {
  id
  name
  users {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const UserNoElementsFragmentDoc = gql`
    fragment UserNoElements on User {
  ...UserNoGroupsElements
  groups {
    ...GroupWithoutUsers
  }
}
    ${UserNoGroupsElementsFragmentDoc}
${GroupWithoutUsersFragmentDoc}`;
export const UserNoGroupsFragmentDoc = gql`
    fragment UserNoGroups on User {
  ...UserNoGroupsElements
  elements {
    ...ElementNoChildrenCreatedByGroups
  }
}
    ${UserNoGroupsElementsFragmentDoc}
${ElementNoChildrenCreatedByGroupsFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on User {
  ...UserNoElements
  ...UserNoGroups
}
    ${UserNoElementsFragmentDoc}
${UserNoGroupsFragmentDoc}`;
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
export const EditElementDataDocument = gql`
    mutation EditElementData($data: JSONObject!, $elementId: Float!) {
  editElementData(data: $data, elementId: $elementId) {
    ...FullElement
  }
}
    ${FullElementFragmentDoc}`;

export function useEditElementDataMutation() {
  return Urql.useMutation<EditElementDataMutation, EditElementDataMutationVariables>(EditElementDataDocument);
};
export const EditDatabaseAttributeNameDocument = gql`
    mutation EditDatabaseAttributeName($elementId: Float!, $attributeName: String!, $newAttributeName: String!) {
  editDatabaseAttributeName(
    elementId: $elementId
    attributeName: $attributeName
    newAttributeName: $newAttributeName
  ) {
    ...FullElement
  }
}
    ${FullElementFragmentDoc}`;

export function useEditDatabaseAttributeNameMutation() {
  return Urql.useMutation<EditDatabaseAttributeNameMutation, EditDatabaseAttributeNameMutationVariables>(EditDatabaseAttributeNameDocument);
};
export const EditElementIndexDocument = gql`
    mutation EditElementIndex($index: Float!, $elementId: Float!) {
  editElementIndex(index: $index, elementId: $elementId) {
    ...FullElement
  }
}
    ${FullElementFragmentDoc}`;

export function useEditElementIndexMutation() {
  return Urql.useMutation<EditElementIndexMutation, EditElementIndexMutationVariables>(EditElementIndexDocument);
};
export const CreateElementDocument = gql`
    mutation CreateElement($type: String!, $data: JSONObject!, $index: Float!, $parent: Float, $route: String) {
  createElement(
    type: $type
    data: $data
    index: $index
    parent: $parent
    route: $route
  ) {
    ...FullElement
  }
}
    ${FullElementFragmentDoc}`;

export function useCreateElementMutation() {
  return Urql.useMutation<CreateElementMutation, CreateElementMutationVariables>(CreateElementDocument);
};
export const RemoveElementDocument = gql`
    mutation RemoveElement($elementId: Float!) {
  removeElement(elementId: $elementId) {
    ...ElementAfterRemove
  }
}
    ${ElementAfterRemoveFragmentDoc}`;

export function useRemoveElementMutation() {
  return Urql.useMutation<RemoveElementMutation, RemoveElementMutationVariables>(RemoveElementDocument);
};
export const UpdatePermissionsDocument = gql`
    mutation UpdatePermissions($elementId: Float!, $canInteractGroups: [Float!], $canViewGroups: [Float!], $canEditGroups: [Float!], $canModifyPermsGroups: [Float!]) {
  updatePermissions(
    elementId: $elementId
    canInteractGroups: $canInteractGroups
    canViewGroups: $canViewGroups
    canEditGroups: $canEditGroups
    canModifyPermsGroups: $canModifyPermsGroups
  ) {
    ...FullElement
  }
}
    ${FullElementFragmentDoc}`;

export function useUpdatePermissionsMutation() {
  return Urql.useMutation<UpdatePermissionsMutation, UpdatePermissionsMutationVariables>(UpdatePermissionsDocument);
};
export const InheritDatabaseAttributesDocument = gql`
    mutation InheritDatabaseAttributes($databaseId: Float!, $elementId: Float!) {
  inheritDatabaseAttributes(databaseId: $databaseId, elementId: $elementId) {
    ...FullElement
  }
}
    ${FullElementFragmentDoc}`;

export function useInheritDatabaseAttributesMutation() {
  return Urql.useMutation<InheritDatabaseAttributesMutation, InheritDatabaseAttributesMutationVariables>(InheritDatabaseAttributesDocument);
};
export const AssignUserPageDocument = gql`
    mutation AssignUserPage($uniId: Float!, $pageId: Float!) {
  assignUserPage(uniId: $uniId, pageId: $pageId) {
    id
  }
}
    `;

export function useAssignUserPageMutation() {
  return Urql.useMutation<AssignUserPageMutation, AssignUserPageMutationVariables>(AssignUserPageDocument);
};
export const HandleActionDocument = gql`
    mutation HandleAction($buttonId: Float!) {
  handleAction(buttonId: $buttonId) {
    ...FullElement
  }
}
    ${FullElementFragmentDoc}`;

export function useHandleActionMutation() {
  return Urql.useMutation<HandleActionMutation, HandleActionMutationVariables>(HandleActionDocument);
};
export const EditElementRouteDocument = gql`
    mutation EditElementRoute($elementId: Float!, $route: String!) {
  editElementRoute(elementId: $elementId, route: $route) {
    ...FullElement
  }
}
    ${FullElementFragmentDoc}`;

export function useEditElementRouteMutation() {
  return Urql.useMutation<EditElementRouteMutation, EditElementRouteMutationVariables>(EditElementRouteDocument);
};
export const GetSignedUrlDocument = gql`
    mutation GetSignedUrl($fileType: String!, $fileName: String!, $fileSize: Float!, $fileHash: String!, $imgWidth: Float, $imgHeight: Float) {
  getSignedUrl(
    fileType: $fileType
    fileName: $fileName
    fileSize: $fileSize
    fileHash: $fileHash
    imgWidth: $imgWidth
    imgHeight: $imgHeight
  ) {
    signedUrl
    key
  }
}
    `;

export function useGetSignedUrlMutation() {
  return Urql.useMutation<GetSignedUrlMutation, GetSignedUrlMutationVariables>(GetSignedUrlDocument);
};
export const AddUserToGroupDocument = gql`
    mutation AddUserToGroup($groupId: Float!, $userId: Float!) {
  addUserToGroup(groupId: $groupId, userId: $userId) {
    ...GroupWithUsers
  }
}
    ${GroupWithUsersFragmentDoc}`;

export function useAddUserToGroupMutation() {
  return Urql.useMutation<AddUserToGroupMutation, AddUserToGroupMutationVariables>(AddUserToGroupDocument);
};
export const RemoveUserFromGroupDocument = gql`
    mutation RemoveUserFromGroup($groupId: Float!, $userId: Float!) {
  removeUserFromGroup(groupId: $groupId, userId: $userId) {
    ...GroupWithUsers
  }
}
    ${GroupWithUsersFragmentDoc}`;

export function useRemoveUserFromGroupMutation() {
  return Urql.useMutation<RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables>(RemoveUserFromGroupDocument);
};
export const CreateGroupDocument = gql`
    mutation CreateGroup($groupName: String!) {
  createGroup(groupName: $groupName) {
    ...GroupWithUsers
  }
}
    ${GroupWithUsersFragmentDoc}`;

export function useCreateGroupMutation() {
  return Urql.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument);
};
export const DeleteGroupDocument = gql`
    mutation DeleteGroup($groupId: Float!) {
  deleteGroup(groupId: $groupId) {
    name
  }
}
    `;

export function useDeleteGroupMutation() {
  return Urql.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(DeleteGroupDocument);
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
export const GetElementsDocument = gql`
    query GetElements($type: String, $parentId: Float, $children: Boolean) {
  getElements(type: $type, parentId: $parentId, children: $children) {
    ...FullElement
  }
}
    ${FullElementFragmentDoc}`;

export function useGetElementsQuery(options?: Omit<Urql.UseQueryArgs<GetElementsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetElementsQuery, GetElementsQueryVariables>({ query: GetElementsDocument, ...options });
};
export const GetElementDocument = gql`
    query GetElement($elementId: Float, $route: String, $children: Boolean) {
  getElement(elementId: $elementId, route: $route, children: $children) {
    ...FullElement
  }
}
    ${FullElementFragmentDoc}`;

export function useGetElementQuery(options?: Omit<Urql.UseQueryArgs<GetElementQueryVariables>, 'query'>) {
  return Urql.useQuery<GetElementQuery, GetElementQueryVariables>({ query: GetElementDocument, ...options });
};
export const GetUserPageDocument = gql`
    query GetUserPage($uniId: Float!) {
  getUserPage(uniId: $uniId) {
    id
  }
}
    `;

export function useGetUserPageQuery(options: Omit<Urql.UseQueryArgs<GetUserPageQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserPageQuery, GetUserPageQueryVariables>({ query: GetUserPageDocument, ...options });
};
export const GetFileDocument = gql`
    query GetFile($key: String!) {
  getFile(key: $key) {
    ...FileWithoutUploadedBy
  }
}
    ${FileWithoutUploadedByFragmentDoc}`;

export function useGetFileQuery(options: Omit<Urql.UseQueryArgs<GetFileQueryVariables>, 'query'>) {
  return Urql.useQuery<GetFileQuery, GetFileQueryVariables>({ query: GetFileDocument, ...options });
};
export const GetGroupsDocument = gql`
    query GetGroups {
  groups {
    ...GroupWithoutUsers
  }
}
    ${GroupWithoutUsersFragmentDoc}`;

export function useGetGroupsQuery(options?: Omit<Urql.UseQueryArgs<GetGroupsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetGroupsQuery, GetGroupsQueryVariables>({ query: GetGroupsDocument, ...options });
};
export const GetGroupsWithUsersDocument = gql`
    query GetGroupsWithUsers {
  groupsWithUsers {
    ...GroupWithUsers
  }
}
    ${GroupWithUsersFragmentDoc}`;

export function useGetGroupsWithUsersQuery(options?: Omit<Urql.UseQueryArgs<GetGroupsWithUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetGroupsWithUsersQuery, GetGroupsWithUsersQueryVariables>({ query: GetGroupsWithUsersDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const UsersDocument = gql`
    query Users {
  users {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useUsersQuery(options?: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery, UsersQueryVariables>({ query: UsersDocument, ...options });
};
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    ...UserNoElements
  }
}
    ${UserNoElementsFragmentDoc}`;

export function useGetUsersQuery(options?: Omit<Urql.UseQueryArgs<GetUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUsersQuery, GetUsersQueryVariables>({ query: GetUsersDocument, ...options });
};
export const GetUserDocument = gql`
    query GetUser($userId: Float!) {
  getUser(userId: $userId) {
    ...UserNoGroupsElements
  }
}
    ${UserNoGroupsElementsFragmentDoc}`;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserQuery, GetUserQueryVariables>({ query: GetUserDocument, ...options });
};