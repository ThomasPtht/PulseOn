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