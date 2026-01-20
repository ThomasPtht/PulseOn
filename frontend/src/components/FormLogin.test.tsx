import { MockedProvider } from "@apollo/client/testing"
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import { beforeEach, describe, expect, it, vi } from "vitest"
import { LoginForm } from "./FormLogin"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router"

const loginMock = vi.fn().mockResolvedValue({ data: { login: { id: "1", email: "test@gmail.com" } } })

// Mock the login mutation
vi.mock("@/generated/graphql-types", () => ({
    useLoginMutation: () => [loginMock]
}))

describe('Login Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("should render labels correctly and button to login", () => {
        render(
            <MockedProvider mocks={[]}>
                <MemoryRouter>
                    <LoginForm />
                </MemoryRouter>
            </MockedProvider>
        )

        expect(screen.getByText("Email")).toBeDefined()
        expect(screen.getByText("Mot de passe")).toBeDefined()

        expect(screen.getByRole("button", { name: /se connecter/i })).toBeDefined()

    })

    it("click on s'enregistrer should redirect to /register", async () => {
        render(
            <MockedProvider mocks={[]}>
                <MemoryRouter initialEntries={["/login"]}>
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<h1 title="Créer un compte">Rejoignez PulseOn</h1>} />
                    </Routes>
                </MemoryRouter>
            </MockedProvider>
        )

        const user = userEvent.setup()
        await user.click(screen.getByRole('link', { name: /s'enregistrer/i }))

        expect(screen.getByTitle("Créer un compte")).toBeInTheDocument()
    })

    it("shoud login user when login button is clicked", async () => {


        render(
            < MockedProvider mocks={[]} >
                <MemoryRouter>
                    <LoginForm />
                </MemoryRouter>
            </MockedProvider >
        )

        const user = userEvent.setup()

        // Remplir les champs du formulaire
        const emailInput = screen.getByPlaceholderText("john@example.com")
        const passwordInput = screen.getByPlaceholderText("******")

        await user.type(emailInput, "test@example.com")
        await user.type(passwordInput, "password123")

        // Simulation de click sur Se connecter
        await user.click(screen.getByRole('button', { name: /se connecter/i }))

        expect(loginMock).toHaveBeenCalled()

    })

})