import { MockedProvider } from "@apollo/client/testing"
import { MemoryRouter } from "react-router"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { toast } from "sonner";
import FormRunning from "./FormRunning"




// Mock sonner
vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));


const createRunningSessionMock = vi.fn((options) => {
    options?.onCompleted?.({ createRunSession: { id: "1" } })
    return Promise.resolve({ data: { createRunSession: { id: "1" } } })
})


// Mock the create exercise mutation and get exercises query
vi.mock("@/generated/graphql-types", () => ({
    useCreateRunSessionMutation: () => [createRunningSessionMock]


}))

describe('FormRunning Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })


    it("should render title and labels form correctly", () => {
        render(
            <MockedProvider mocks={[]}>
                <MemoryRouter>
                    <FormRunning />
                </MemoryRouter>
            </MockedProvider>
        )

        expect(screen.getByText("Date")).toBeDefined()
        expect(screen.getByText("Titre")).toBeDefined()
        expect(screen.getByText("Distance (km)")).toBeDefined()
        expect(screen.getByText("Durée (minutes)")).toBeDefined()
        expect(screen.getByText("Allure (min/km)")).toBeDefined()
        expect(screen.getByText("Dénivelé (mètres)")).toBeDefined()


        expect(screen.getByRole("button", { name: /enregistrer la séance/i })).toBeDefined()

    })

    it("shoud validate the running form when clicking on 'Enregistrer la séance' button", async () => {
        render(
            < MockedProvider mocks={[]} >
                <MemoryRouter>
                    <FormRunning />
                </MemoryRouter>
            </MockedProvider >
        )
        const user = userEvent.setup()

        const dateInput = screen.getByLabelText("Date")
        await user.type(dateInput, "2024-06-15")
        const titleInput = screen.getByLabelText("Titre")
        await user.type(titleInput, "Evening Run")
        const distanceInput = screen.getByLabelText("Distance (km)")
        await user.type(distanceInput, "10.5")
        const durationInput = screen.getByLabelText("Durée (minutes)")
        await user.type(durationInput, "55")
        const avgPaceInput = screen.getByLabelText("Allure (min/km)")
        await user.type(avgPaceInput, "5:15")
        const elevationInput = screen.getByLabelText("Dénivelé (mètres)")
        await user.type(elevationInput, "120")
        const validateButton = screen.getByRole("button", { name: /enregistrer la séance/i })
        await user.click(validateButton)
        await waitFor(() => {
            expect(createRunningSessionMock).toHaveBeenCalled()
            expect(toast.success).toHaveBeenCalledWith("Session de course ajoutée avec succès !")
        })


    })

    it("should show error toast if mutation fails", async () => {
        // Modify the mock to simulate an error
        createRunningSessionMock.mockImplementationOnce((options) => {
            options?.onError?.(new Error("Network error"))
            return Promise.reject(new Error("Network error"))
        })
        render(
            < MockedProvider mocks={[]} >
                <MemoryRouter>
                    <FormRunning />
                </MemoryRouter>
            </MockedProvider >
        )
        const user = userEvent.setup()
        const dateInput = screen.getByLabelText("Date")
        await user.type(dateInput, "2024-06-15")
        const titleInput = screen.getByLabelText("Titre")
        await user.type(titleInput, "Evening Run")
        const distanceInput = screen.getByLabelText("Distance (km)")
        await user.type(distanceInput, "10.5")
        const durationInput = screen.getByLabelText("Durée (minutes)")
        await user.type(durationInput, "55")
        const avgPaceInput = screen.getByLabelText("Allure (min/km)")
        await user.type(avgPaceInput, "5:15")
        const elevationInput = screen.getByLabelText("Dénivelé (mètres)")
        await user.type(elevationInput, "120")
        const validateButton = screen.getByRole("button", { name: /enregistrer la séance/i })
        await user.click(validateButton)

        await waitFor(() => {
            expect(createRunningSessionMock).toHaveBeenCalled()
            expect(toast.error).toHaveBeenCalledWith("Échec de l'ajout de la session de course. Veuillez réessayer.")
        })


    })
})