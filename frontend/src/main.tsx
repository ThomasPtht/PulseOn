import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./context/AuthContext.tsx";



const httpLink = new HttpLink({
  uri: "/graphql", // ✅ Utilise le proxy Vite
  credentials: 'include', // ✅ Envoie les cookies
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </StrictMode >
  </ApolloProvider >
)
