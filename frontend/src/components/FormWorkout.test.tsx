import { MockedProvider } from "@apollo/client/testing"
import { MemoryRouter } from "react-router"
import { beforeEach, describe, expect, it, vi } from "vitest"
import FormWorkout from "./FormWorkout"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { toast } from "sonner";




// Mock sonner
vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));


const createExerciseMock = vi.fn().mockResolvedValue({ data: { createExercise: { id: "1", name: "Développé couché" } } })

const newWorkoutSessionMock = vi.fn((options) => {
    if (options && typeof options.onCompleted === "function") {
        options.onCompleted({ createWorkoutSession: { id: "1" } })
    }
    return Promise.resolve({ data: { createWorkoutSession: { id: "1" } } })
})


// Mock the create exercise mutation and get exercises query
vi.mock("@/generated/graphql-types", () => ({
    useCreateExerciseMutation: () => [createExerciseMock],
    useGetExercisesQuery: () => ({ data: { getExercises: [] } }),
    useNewWorkoutSessionMutation: () => [newWorkoutSessionMock, { loading: false }]
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

    it("shoud validate the workout form when clicking on 'Enregistrer la séance' button", async () => {
        render(
            < MockedProvider mocks={[]} >
                <MemoryRouter>
                    <FormWorkout />
                </MemoryRouter>
            </MockedProvider >
        )
        const addButton = screen.getByRole("button", { name: /ajouter/i })
        const inputAddExercise = screen.getByPlaceholderText("Ex: Développé couché, Squat...")
        await userEvent.type(inputAddExercise, "Développé couché")
        await userEvent.click(addButton)
        expect(toast.success).toHaveBeenCalledWith("Exercice ajouté !")

        const serieButton = screen.getByRole("button", { name: /ajouter série/i })
        await userEvent.click(serieButton)
        expect(toast.success).toHaveBeenCalledWith("Série ajoutée !")
        const validateButton = screen.getByRole("button", { name: /enregistrer la séance/i })
        await userEvent.click(validateButton)

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("Séance enregistrée !")
        })


    })

})