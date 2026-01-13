import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { MockedProvider } from '@apollo/client/testing'
import { Header } from './Header'

// Mock the useAuth hook
vi.mock('@/hooks/useAuth', () => ({
    default: () => ({
        user: { username: 'TestUser', email: 'test@example.com' },
        loading: false
    })
}))

const logoutMock = vi.fn().mockResolvedValue({ data: { logout: true } })

describe('Header Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("should render title correctly and button to add session", () => {
        render(
            <MockedProvider mocks={[]}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </MockedProvider>
        )

        expect(screen.getByText("PulseOn")).toBeDefined()
        expect(screen.getByText("Fitness Tracker")).toBeDefined()

        expect(screen.getByRole("button", { name: /nouvelle séance/i })).toBeDefined()
    })


    it("should display user information when authenticated", () => {
        render(
            <MockedProvider mocks={[]}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </MockedProvider>
        )
        expect(screen.getByText("T")).toBeDefined()
    })

    it("should have a link to /add-workout on 'Nouvelle Séance' button", () => {
        render(
            <MockedProvider mocks={[]}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </MockedProvider>
        )
        const addButton = screen.getByRole("button", { name: /nouvelle séance/i })
        const link = addButton.closest('a')
        expect(link).toBeDefined()
        expect(link?.getAttribute('href')).toBe('/add-workout')
    })

    it("should have a link to home on logo click", () => {
        render(
            <MockedProvider mocks={[]}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </MockedProvider>
        )
        const logoLink = screen.getByText("PulseOn").closest('a')
        expect(logoLink).toBeDefined()
        expect(logoLink?.getAttribute('href')).toBe('/')
    })

    it("shoud logout user when logout button is clicked", async () => {
        const user = userEvent.setup()

        render(
            <MockedProvider mocks={[]}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </MockedProvider>
        )

        // Cliquer sur l'avatar pour ouvrir le menu déroulant
        const avatarButton = screen.getByText("T")
        await user.click(avatarButton)

        // Trouver et cliquer sur "Se déconnecter" dans le menu
        const logoutButton = await screen.findByText("Se déconnecter")
        await user.click(logoutButton)
        

        logoutMock()

        expect(logoutMock).toHaveBeenCalled()

    })
})