import '@/styles/globals.css'

import PerfilProvider from './contexts/perfilContext'
import CSVProvider from './contexts/csvContext'

import { SessionProvider } from "next-auth/react"

//Inicializa a API do react-query
import  {  
  QueryClient, 
  QueryClientProvider 
} from 'react-query'

//Criar o cliente do react query
const queryClient = new QueryClient()

//Buscar o Layout padrão das páginas
import Layout from '../pages/componentes/layout/index.jsx'

export default function App({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <SessionProvider session={session}>
      <PerfilProvider>
      <CSVProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </CSVProvider>
      </PerfilProvider>
    </SessionProvider>
  )
  
}
