import { gql } from "@apollo/client";


export const GET_RECENT_SESSIONS = gql`
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

export const GET_EXERCISES = gql`
query GetExercises {
  getExercises {
    id
    name
  }
}
`;

export const GET_CURRENT_USER = gql`
query GetCurrentUser {
  getCurrentUser {
    id
    username
    email
  }
}
`;

export const LOGOUT = gql`
mutation Logout {
  logout
}
`;