import { useGetMyRunSessionsQuery, useGetMyWorkoutSessionsQuery } from "@/generated/graphql-types";

const calculateCurrentStreak = () => {
    const { data: runData } = useGetMyRunSessionsQuery();
    const { data: workoutData } = useGetMyWorkoutSessionsQuery();

    let currentStreak = 0;
    if (!runData && !workoutData) {
        return currentStreak;
    }

    // Combine run and workout sessions
    const allSessions = [
        ...(runData ? runData.getMyRunSessions : []),
        ...(workoutData ? workoutData.getMyWorkoutSessions : [])
    ];

    if (allSessions.length === 0) {
        return currentStreak;
    }

    // Sort sessions by date in descending order
    allSessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if the most recent session was today or yesterday
    const mostRecentSession = new Date(allSessions[0].date);
    mostRecentSession.setHours(0, 0, 0, 0);

    const daysSinceLastSession = Math.floor((today.getTime() - mostRecentSession.getTime()) / (1000 * 3600 * 24));

    // If the last session was more than 1 day ago, streak is broken
    if (daysSinceLastSession > 1) {
        return 0;
    }

    // Calculate streak
    currentStreak = 1; // Start with the most recent session
    let lastSessionDate = mostRecentSession;

    for (let i = 1; i < allSessions.length; i++) {
        const sessionDate = new Date(allSessions[i].date);
        sessionDate.setHours(0, 0, 0, 0);

        const diffDays = Math.floor((lastSessionDate.getTime() - sessionDate.getTime()) / (1000 * 3600 * 24));

        if (diffDays === 1) {
            currentStreak++;
            lastSessionDate = sessionDate;
        } else if (diffDays > 1) {
            break;
        }
        // If diffDays === 0, it's the same day, don't count twice but update lastSessionDate
        else if (diffDays === 0) {
            lastSessionDate = sessionDate;
        }
    }

    return currentStreak;
}

export default calculateCurrentStreak
