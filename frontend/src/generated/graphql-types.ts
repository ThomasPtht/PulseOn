import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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

export type ExerciseInput = {
  exerciseId: Scalars['Float']['input'];
  sets: Array<SetInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createExercise: Exercise;
  createRunSession: RunSession;
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  newWorkoutSession: WorkoutSession;
  register: Scalars['String']['output'];
};


export type MutationCreateExerciseArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateRunSessionArgs = {
  data: RunSessionInput;
};


export type MutationLoginArgs = {
  data: UserLoginInput;
};


export type MutationNewWorkoutSessionArgs = {
  data: WorkoutSessionInput;
};


export type MutationRegisterArgs = {
  data: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getCurrentUser?: Maybe<User>;
  getExercises: Array<Exercise>;
  getMyRunSessions: Array<RunSession>;
  getMyWorkoutSessions: Array<WorkoutSession>;
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
  title: Scalars['String']['input'];
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

export type SetInput = {
  isWarmup?: InputMaybe<Scalars['Boolean']['input']>;
  repetitions: Scalars['Float']['input'];
  restSeconds?: InputMaybe<Scalars['Float']['input']>;
  weight: Scalars['Float']['input'];
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
  id: Scalars['ID']['output'];
  sets: Array<SetEntity>;
  user: User;
};

export type WorkoutSessionInput = {
  date: Scalars['DateTimeISO']['input'];
  exercises: Array<ExerciseInput>;
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

export type CreateExerciseMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateExerciseMutation = { __typename?: 'Mutation', createExercise: { __typename?: 'Exercise', id: string, name: string } };

export type NewWorkoutSessionMutationVariables = Exact<{
  data: WorkoutSessionInput;
}>;


export type NewWorkoutSessionMutation = { __typename?: 'Mutation', newWorkoutSession: { __typename?: 'WorkoutSession', id: string, date: any, sets: Array<{ __typename?: 'SetEntity', id: string, repetitions: number, weight: number, restSeconds: number, isWarmup: boolean, exercise: { __typename?: 'Exercise', id: string, name: string } }>, user: { __typename?: 'User', id: string, username: string } } };

export type GetMyRunSessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyRunSessionsQuery = { __typename?: 'Query', getMyRunSessions: Array<{ __typename?: 'RunSession', id: string, title?: string | null, date: any, distance: number, duration: number, avgPace: string, elevation: number, user: { __typename?: 'User', id: string } }> };

export type GetMyWorkoutSessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyWorkoutSessionsQuery = { __typename?: 'Query', getMyWorkoutSessions: Array<{ __typename?: 'WorkoutSession', id: string, date: any, sets: Array<{ __typename?: 'SetEntity', id: string, repetitions: number, weight: number, restSeconds: number, isWarmup: boolean, exercise: { __typename?: 'Exercise', id: string, name: string } }>, user: { __typename?: 'User', id: string, username: string } }> };

export type GetExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExercisesQuery = { __typename?: 'Query', getExercises: Array<{ __typename?: 'Exercise', id: string, name: string }> };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: string, username: string, email: string } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };


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
        const options = {...defaultOptions, ...baseOptions}
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
        const options = {...defaultOptions, ...baseOptions}
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRunSessionMutation, CreateRunSessionMutationVariables>(CreateRunSessionDocument, options);
      }
export type CreateRunSessionMutationHookResult = ReturnType<typeof useCreateRunSessionMutation>;
export type CreateRunSessionMutationResult = Apollo.MutationResult<CreateRunSessionMutation>;
export type CreateRunSessionMutationOptions = Apollo.BaseMutationOptions<CreateRunSessionMutation, CreateRunSessionMutationVariables>;
export const CreateExerciseDocument = gql`
    mutation CreateExercise($name: String!) {
  createExercise(name: $name) {
    id
    name
  }
}
    `;
export type CreateExerciseMutationFn = Apollo.MutationFunction<CreateExerciseMutation, CreateExerciseMutationVariables>;

/**
 * __useCreateExerciseMutation__
 *
 * To run a mutation, you first call `useCreateExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseMutation, { data, loading, error }] = useCreateExerciseMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateExerciseMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciseMutation, CreateExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciseMutation, CreateExerciseMutationVariables>(CreateExerciseDocument, options);
      }
export type CreateExerciseMutationHookResult = ReturnType<typeof useCreateExerciseMutation>;
export type CreateExerciseMutationResult = Apollo.MutationResult<CreateExerciseMutation>;
export type CreateExerciseMutationOptions = Apollo.BaseMutationOptions<CreateExerciseMutation, CreateExerciseMutationVariables>;
export const NewWorkoutSessionDocument = gql`
    mutation NewWorkoutSession($data: WorkoutSessionInput!) {
  newWorkoutSession(data: $data) {
    id
    date
    sets {
      id
      repetitions
      weight
      restSeconds
      isWarmup
      exercise {
        id
        name
      }
    }
    user {
      id
      username
    }
  }
}
    `;
export type NewWorkoutSessionMutationFn = Apollo.MutationFunction<NewWorkoutSessionMutation, NewWorkoutSessionMutationVariables>;

/**
 * __useNewWorkoutSessionMutation__
 *
 * To run a mutation, you first call `useNewWorkoutSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewWorkoutSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newWorkoutSessionMutation, { data, loading, error }] = useNewWorkoutSessionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useNewWorkoutSessionMutation(baseOptions?: Apollo.MutationHookOptions<NewWorkoutSessionMutation, NewWorkoutSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewWorkoutSessionMutation, NewWorkoutSessionMutationVariables>(NewWorkoutSessionDocument, options);
      }
export type NewWorkoutSessionMutationHookResult = ReturnType<typeof useNewWorkoutSessionMutation>;
export type NewWorkoutSessionMutationResult = Apollo.MutationResult<NewWorkoutSessionMutation>;
export type NewWorkoutSessionMutationOptions = Apollo.BaseMutationOptions<NewWorkoutSessionMutation, NewWorkoutSessionMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyRunSessionsQuery, GetMyRunSessionsQueryVariables>(GetMyRunSessionsDocument, options);
      }
export function useGetMyRunSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyRunSessionsQuery, GetMyRunSessionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyRunSessionsQuery, GetMyRunSessionsQueryVariables>(GetMyRunSessionsDocument, options);
        }
// @ts-ignore
export function useGetMyRunSessionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyRunSessionsQuery, GetMyRunSessionsQueryVariables>): Apollo.UseSuspenseQueryResult<GetMyRunSessionsQuery, GetMyRunSessionsQueryVariables>;
export function useGetMyRunSessionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyRunSessionsQuery, GetMyRunSessionsQueryVariables>): Apollo.UseSuspenseQueryResult<GetMyRunSessionsQuery | undefined, GetMyRunSessionsQueryVariables>;
export function useGetMyRunSessionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyRunSessionsQuery, GetMyRunSessionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyRunSessionsQuery, GetMyRunSessionsQueryVariables>(GetMyRunSessionsDocument, options);
        }
export type GetMyRunSessionsQueryHookResult = ReturnType<typeof useGetMyRunSessionsQuery>;
export type GetMyRunSessionsLazyQueryHookResult = ReturnType<typeof useGetMyRunSessionsLazyQuery>;
export type GetMyRunSessionsSuspenseQueryHookResult = ReturnType<typeof useGetMyRunSessionsSuspenseQuery>;
export type GetMyRunSessionsQueryResult = Apollo.QueryResult<GetMyRunSessionsQuery, GetMyRunSessionsQueryVariables>;
export const GetMyWorkoutSessionsDocument = gql`
    query GetMyWorkoutSessions {
  getMyWorkoutSessions {
    id
    date
    sets {
      id
      repetitions
      weight
      restSeconds
      isWarmup
      exercise {
        id
        name
      }
    }
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useGetMyWorkoutSessionsQuery__
 *
 * To run a query within a React component, call `useGetMyWorkoutSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyWorkoutSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyWorkoutSessionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyWorkoutSessionsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyWorkoutSessionsQuery, GetMyWorkoutSessionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyWorkoutSessionsQuery, GetMyWorkoutSessionsQueryVariables>(GetMyWorkoutSessionsDocument, options);
      }
export function useGetMyWorkoutSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyWorkoutSessionsQuery, GetMyWorkoutSessionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyWorkoutSessionsQuery, GetMyWorkoutSessionsQueryVariables>(GetMyWorkoutSessionsDocument, options);
        }
// @ts-ignore
export function useGetMyWorkoutSessionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyWorkoutSessionsQuery, GetMyWorkoutSessionsQueryVariables>): Apollo.UseSuspenseQueryResult<GetMyWorkoutSessionsQuery, GetMyWorkoutSessionsQueryVariables>;
export function useGetMyWorkoutSessionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyWorkoutSessionsQuery, GetMyWorkoutSessionsQueryVariables>): Apollo.UseSuspenseQueryResult<GetMyWorkoutSessionsQuery | undefined, GetMyWorkoutSessionsQueryVariables>;
export function useGetMyWorkoutSessionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyWorkoutSessionsQuery, GetMyWorkoutSessionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyWorkoutSessionsQuery, GetMyWorkoutSessionsQueryVariables>(GetMyWorkoutSessionsDocument, options);
        }
export type GetMyWorkoutSessionsQueryHookResult = ReturnType<typeof useGetMyWorkoutSessionsQuery>;
export type GetMyWorkoutSessionsLazyQueryHookResult = ReturnType<typeof useGetMyWorkoutSessionsLazyQuery>;
export type GetMyWorkoutSessionsSuspenseQueryHookResult = ReturnType<typeof useGetMyWorkoutSessionsSuspenseQuery>;
export type GetMyWorkoutSessionsQueryResult = Apollo.QueryResult<GetMyWorkoutSessionsQuery, GetMyWorkoutSessionsQueryVariables>;
export const GetExercisesDocument = gql`
    query GetExercises {
  getExercises {
    id
    name
  }
}
    `;

/**
 * __useGetExercisesQuery__
 *
 * To run a query within a React component, call `useGetExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExercisesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExercisesQuery(baseOptions?: Apollo.QueryHookOptions<GetExercisesQuery, GetExercisesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExercisesQuery, GetExercisesQueryVariables>(GetExercisesDocument, options);
      }
export function useGetExercisesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExercisesQuery, GetExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExercisesQuery, GetExercisesQueryVariables>(GetExercisesDocument, options);
        }
// @ts-ignore
export function useGetExercisesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExercisesQuery, GetExercisesQueryVariables>): Apollo.UseSuspenseQueryResult<GetExercisesQuery, GetExercisesQueryVariables>;
export function useGetExercisesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetExercisesQuery, GetExercisesQueryVariables>): Apollo.UseSuspenseQueryResult<GetExercisesQuery | undefined, GetExercisesQueryVariables>;
export function useGetExercisesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetExercisesQuery, GetExercisesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExercisesQuery, GetExercisesQueryVariables>(GetExercisesDocument, options);
        }
export type GetExercisesQueryHookResult = ReturnType<typeof useGetExercisesQuery>;
export type GetExercisesLazyQueryHookResult = ReturnType<typeof useGetExercisesLazyQuery>;
export type GetExercisesSuspenseQueryHookResult = ReturnType<typeof useGetExercisesSuspenseQuery>;
export type GetExercisesQueryResult = Apollo.QueryResult<GetExercisesQuery, GetExercisesQueryVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    id
    username
    email
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
// @ts-ignore
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>): Apollo.UseSuspenseQueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>): Apollo.UseSuspenseQueryResult<GetCurrentUserQuery | undefined, GetCurrentUserQueryVariables>;
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;