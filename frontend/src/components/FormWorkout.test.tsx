import { MockedProvider } from "@apollo/client/testing"
import { MemoryRouter } from "react-router"
import { beforeEach, describe, expect, it, vi } from "vitest"
import FormWorkout from "./FormWorkout"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"


const createExerciseMock = vi.fn().mockResolvedValue({ data: { createExercise: { id: "1", name: "Développé couché" } } })


// Mock the create exercise mutation and get exercises query
vi.mock("@/generated/graphql-types", () => ({
    useCreateExerciseMutation: () => [createExerciseMock],
    useGetExercisesQuery: () => ({ data: { getExercises: [] } }),
    useNewWorkoutSessionMutation: () => [vi.fn(), { loading: false }]
}))

describe('Form Workout Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })


    it("should render title and labels exercise form correctly", () => {
        render(
            <MockedProvider mocks={[]}>
                <MemoryRouter>
                    <FormWorkout />
                </MemoryRouter>
            </MockedProvider>
        )

        expect(screen.getByText("Nouvelle séance de musculation")).toBeDefined()
        expect(screen.getByText("Date de la séance")).toBeDefined()
        expect(screen.getByText("Ajouter un exercice")).toBeDefined()

        expect(screen.getByRole("button", { name: /ajouter/i })).toBeDefined()

    })

    it("should add an exercise when clicking on 'Ajouter un exercice' button and display form série ", async () => {
        render(
            <MockedProvider mocks={[]}>
                <MemoryRouter>
                    <FormWorkout />
                </MemoryRouter>
            </MockedProvider >
        )

        const addButton = screen.getByRole("button", { name: /ajouter/i })
        const inputAddExercise = screen.getByPlaceholderText("Ex: Développé couché, Squat...")
        await userEvent.type(inputAddExercise, "Développé couché")
        await userEvent.click(addButton)

        expect(createExerciseMock).toHaveBeenCalled()

        expect(screen.getByText("Développé couché")).toBeDefined()
        expect(screen.getByText("Répétitions")).toBeDefined()
        expect(screen.getByText("Poids (kg)")).toBeDefined()
        expect(screen.getByText("Ajouter série")).toBeDefined()

    })


})