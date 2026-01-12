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
mutation CreateExercise($name: String!) {
  createExercise(name: $name) {
    id
    name
  }
}
`;

export const NEW_WORKOUT_SESSION = gql`
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

export const DELETE_RUN_SESSION = gql`
mutation DeleteRunSession($id: Float!) {
  deleteRunSession(id: $id)
}
`;

export const DELETE_WORKOUT_SESSION = gql`
mutation DeleteWorkoutSession($id: Float!) {
  deleteWorkoutSession(id: $id)
}
`;