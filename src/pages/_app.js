import '@/styles/globals.css'

import PerfilProvider from './contexts/perfilContext'

import { SessionProvider } from "next-auth/react"

//Inicializa a API do react-query
import  {  
  QueryClient, 
  QueryClientProvider 
} from 'react-query'

//Criar o cliente do react query
const queryClient = new QueryClient()

//Buscar o Layout padrão das páginas
import Layout from '../pages/componentes/layout/index'

export default function App({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <SessionProvider session={session}>
      <PerfilProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </PerfilProvider>
    </SessionProvider>
  )
  
}