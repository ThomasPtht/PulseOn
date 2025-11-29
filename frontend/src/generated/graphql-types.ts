import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Exercise = {
  __typename?: 'Exercise';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  sets: Array<SetEntity>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createRunSession: RunSession;
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  register: Scalars['String']['output'];
};


export type MutationCreateRunSessionArgs = {
  data: RunSessionInput;
};


export type MutationLoginArgs = {
  data: UserLoginInput;
};


export type MutationRegisterArgs = {
  data: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getMyRunSessions: Array<RunSession>;
  hello: Scalars['String']['output'];
};

export type RunSession = {
  __typename?: 'RunSession';
  avgPace: Scalars['String']['output'];
  date: Scalars['DateTimeISO']['output'];
  distance: Scalars['Float']['output'];
  duration: Scalars['Int']['output'];
  elevation: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type RunSessionInput = {
  avgPace: Scalars['String']['input'];
  date: Scalars['DateTimeISO']['input'];
  distance: Scalars['Float']['input'];
  duration: Scalars['Float']['input'];
  elevation: Scalars['Float']['input'];
};

export type SetEntity = {
  __typename?: 'SetEntity';
  exercise: Exercise;
  id: Scalars['ID']['output'];
  isWarmup: Scalars['Boolean']['output'];
  repetitions: Scalars['Int']['output'];
  restSeconds: Scalars['Int']['output'];
  weight: Scalars['Float']['output'];
  workoutSession: WorkoutSession;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  runSessions: Array<RunSession>;
  username: Scalars['String']['output'];
  workoutSession: Array<WorkoutSession>;
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type WorkoutSession = {
  __typename?: 'WorkoutSession';
  date: Scalars['DateTimeISO']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  sets: Array<SetEntity>;
  user: User;
};

export type RegisterMutationVariables = Exact<{
  data: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };

export type LoginMutationVariables = Exact<{
  data: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type CreateRunSessionMutationVariables = Exact<{
  data: RunSessionInput;
}>;


export type CreateRunSessionMutation = { __typename?: 'Mutation', createRunSession: { __typename?: 'RunSession', id: string, title?: string | null, date: any, distance: number, duration: number, avgPace: string, elevation: number, user: { __typename?: 'User', id: string } } };

export type GetMyRunSessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyRunSessionsQuery = { __typename?: 'Query', getMyRunSessions: Array<{ __typename?: 'RunSession', id: string, title?: string | null, date: any, distance: number, duration: number, avgPace: string, elevation: number, user: { __typename?: 'User', id: string } }> };


export const RegisterDocument = gql`
    mutation Register($data: UserInput!) {
  register(data: $data)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: UserLoginInput!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateRunSessionDocument = gql`
    mutation CreateRunSession($data: RunSessionInput!) {
  createRunSession(data: $data) {
    id
    title
    date
    distance
    duration
    avgPace
    elevation
    user {
      id
    }
  }
}
    `;
export type CreateRunSessionMutationFn = Apollo.MutationFunction<CreateRunSessionMutation, CreateRunSessionMutationVariables>;

/**
 * __useCreateRunSessionMutation__
 *
 * To run a mutation, you first call `useCreateRunSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRunSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRunSessionMutation, { data, loading, error }] = useCreateRunSessionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateRunSessionMutation(baseOptions?: Apollo.MutationHookOptions<CreateRunSessionMutation, CreateRunSessionMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateRunSessionMutation, CreateRunSessionMutationVariables>(CreateRunSessionDocument, options);
}
export type CreateRunSessionMutationHookResult = ReturnType<typeof useCreateRunSessionMutation>;
export type CreateRunSessionMutationResult = Apollo.MutationResult<CreateRunSessionMutation>;
export type CreateRunSessionMutationOptions = Apollo.BaseMutationOptions<CreateRunSessionMutation, CreateRunSessionMutationVariables>;
export const GetMyRunSessionsDocument = gql`
    query GetMyRunSessions {
  getMyRunSessions {
    id
    title
    date
    distance
    duration
    avgPace
    elevation
    user {
      id
    }
  }
}
    `;

/**
 * __useGetMyRunSessionsQuery__
 *
 * To run a query within a React component, call `useGetMyRunSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyRunSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyRunSessionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyRunSessionsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyRunSessionsQuery, GetMyRunSessionsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMyRunSessionsQuery, GetMyRunSessionsQueryVariables>(GetMyRunSessionsDocument, options);
}
export function useGetMyRunSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyRunSessionsQuery, GetMyRunSessionsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMyRunSessionsQuery, GetMyRunSessionsQueryVariables>(GetMyRunSessionsDocument, options);
}
export function useGetMyRunSessionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyRunSessionsQuery, GetMyRunSessionsQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetMyRunSessionsQuery, GetMyRunSessionsQueryVariables>(GetMyRunSessionsDocument, options);
}
export type GetMyRunSessionsQueryHookResult = ReturnType<typeof useGetMyRunSessionsQuery>;
export type GetMyRunSessionsLazyQueryHookResult = ReturnType<typeof useGetMyRunSessionsLazyQuery>;
export type GetMyRunSessionsSuspenseQueryHookResult = ReturnType<typeof useGetMyRunSessionsSuspenseQuery>;
export type GetMyRunSessionsQueryResult = Apollo.QueryResult<GetMyRunSessionsQuery, GetMyRunSessionsQueryVariables>;