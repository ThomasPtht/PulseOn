import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($data: UserInput!) {
    register(data: $data)
  }
`;

export const LOGIN = gql`
  mutation Login($data: UserLoginInput!) {
    login(data: $data)
  }
`;

export const CREATE_RUN_SESSION = gql`
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

export const CREATE_EXERCISE = gql`
mutation CreateExercise($data: ExerciseInput!) {
  createExercise(data: $data) {
    id
    name
  }
}
`;

export const CREATE_WORKOUT_SESSION = gql`
mutation CreateWorkoutSession($data: WorkoutSessionInput!) {
  createWorkoutSession(data: $data) {
    id
    date
    exercises {
      id
      name
      sets {
        id
        reps
        weight
      }
    }
  }
}
`;