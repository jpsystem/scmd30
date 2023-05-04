import LayoutPagina from "./componentes/layoutPagina"

export const getServerSidePropos = async ({req, res}) => {
  try {
    if(1===1){
      console.log("Cheguei aqui")
    }
    return{
      props: { 
        auth: true, 
        nome: "TESTE",
      }
    }
  } catch (error) {
        return{
          redirect: {
            permanent: false,
            destination: "/login"
          },
          props: {}
    }
  }
}


export default function Home(props) {
  return (
    <LayoutPagina>
    <div>
      Página Segura -{props.nome} Perfil do Usuário (index.js)
    </div>
    </LayoutPagina>
  )
}
