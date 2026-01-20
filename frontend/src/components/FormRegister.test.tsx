import '@testing-library/jest-dom'
import { MockedProvider } from "@apollo/client/testing"
import { render, screen } from "@testing-library/react"

import { beforeEach, describe, expect, it, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { RegisterForm } from "./FormRegister"
import { MemoryRouter, Route, Routes } from "react-router"



const registerMock = vi.fn().mockResolvedValue({ data: { register: { id: "1", email: "test@gmail.com" } } })

// Mock the register mutation
vi.mock("@/generated/graphql-types", () => ({
    useRegisterMutation: () => [registerMock]
}))

describe('Register Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("should render labels correctly and button to register", () => {
        render(
            <MockedProvider mocks={[]}>
                <MemoryRouter>
                    <RegisterForm />
                </MemoryRouter>
            </MockedProvider>
        )

        expect(screen.getByText("Nom d'utilisateur")).toBeDefined()
        expect(screen.getByText("Email")).toBeDefined()
        expect(screen.getByText("Mot de passe")).toBeDefined()

        expect(screen.getByRole("button", { name: /créer un compte/i })).toBeDefined()

    })

    it("click on Se connecter should redirect to /login", async () => {
        render(
            <MockedProvider mocks={[]}>
                <MemoryRouter initialEntries={["/register"]}>
                    <Routes>
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<h1 className="highlight highlight-indigo-600 text-4xl font-bold tracking-tight" title="Bon retour sur PulseOn !">Bon retour sur PulseOn !</h1>} />
                    </Routes>
                </MemoryRouter>
            </MockedProvider>
        )

        const user = userEvent.setup()
        await user.click(screen.getByRole('link', { name: /se connecter/i }))
        expect(screen.getByTitle("Bon retour sur PulseOn !")).toBeInTheDocument()
    })

    it("should register user when register button is clicked", async () => {


        render(
            < MockedProvider mocks={[]} >
                <MemoryRouter>
                    <RegisterForm />
                </MemoryRouter>
            </MockedProvider >
        )

        const user = userEvent.setup()

        // Remplir les champs du formulaire
        const userName = screen.getByPlaceholderText("johndoe")
        const emailInput = screen.getByPlaceholderText("john@example.com")
        const passwordInput = screen.getByPlaceholderText("******")

        await user.type(userName, "johndoe")
        await user.type(emailInput, "test@example.com")
        await user.type(passwordInput, "password123")

        // Simulation de click sur Se connecter
        await user.click(screen.getByRole('button', { name: /créer un compte/i }))

        expect(registerMock).toHaveBeenCalled()

    })

})