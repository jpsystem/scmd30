// import OpcoesMenu  from "./opcoesMenu";
import { useEffect, useState } from "react";
import MenuItems from "./menuItens.jsx";
import { getCookie } from "cookies-next"





export default function Navbar() {
    const pAuth = getCookie("auth")
    const pAdministrador = getCookie("useAdministrador")
    const pEncomenda = getCookie("encCodigo")

    const [tipoLink, setTipoLink] = useState(0)
    
    useEffect(()=>{
        //tipo = 0 sem autenticação
        //tipo = 1 colaborador
        //tipo = 2 administrador

        let tipo = 0;
        // let enc = 0;
        // if(pEncomenda.length > 1){
        //     enc = 1
        // }
        if(pAuth)
        {
            if(pAdministrador)
            {
                tipo = 2
            }
            else
            {
                tipo = 1
            }
        }
        else
        {
            tipo = 0
        }
        setTipoLink(tipo);
    },[pAuth, pAdministrador])

    const OpcoesMenu = [
        {
            title: "Principal",
            submenu: [
                {
                    title: "Selecionar Encomenda",
                    page: "/principal/selEncomendas",
                    disabled: ( tipoLink > 0 ? false: true ),
                },
                {
                    title: "Cadastros",
                    submenu: [
                        {
                            title: "Encomendas",
                            page: "/principal/cadastros/encomendas",
                            disabled: ( tipoLink===2 ? false: true ),
                        },
                        {
                            title: "Usuários",
                            page: "/principal/cadastros/usuarios",
                            disabled: ( tipoLink===2 ? false: true ),
                        },
                    ]
                },
                {
                    title: "Logout...",
                    page: "/principal/login",
                    disabled: false,
                },
            ]
        },
        {
            title: "Engenharia",
            submenu: [
                {
                    title: "Cadastros",
                    submenu: [
                        {
                            title: "TAGs",
                            page: "/engenharia/cadastros/tags",
                            disabled: ( tipoLink > 0 ? false: true ),
                        },
                        {
                            title: "Familias",
                            page: "/engenharia/cadastros/familias",
                            disabled: ( tipoLink > 0 ? false: true ),
                        },
                    ]
                },
                {
                    title: "Estrutura de Controle",
                    page: "/engenharia/estruturaControle",
                    disabled: ( tipoLink > 0 ? false: true ),
                },
                {
                    title: "ETCs",
                    page: "/engenharia/etcs",
                    disabled: ( tipoLink > 0  ? false: true ),
                },

                {
                    title: "Relatórios",
                    page: "/engenharia/relatorio",
                    disabled: ( tipoLink > 0  ? false: true ),
                },
            ],
        },
        {
            title: "Documentos",
            page: "/#",
            disabled: false,
        },    
        {
            title: "Ajuda",
            submenu: [
                // {
                //     title: "Manual",
                //     page: "/#",
                //     disabled: false,
                // },
                {
                    title: "Sobre",
                    page: "/ajuda/about",
                    disabled: false,
                },
            ],
        },
    ];

    return ( 
		<nav>
			<ul className="menus"> 
				{	OpcoesMenu?.map((menu, index) => {
							const depthLevel = 0; 
							return <MenuItems 
											items = {menu} 
											key = {index}  
											depthLevel = {depthLevel} 
										/>;
						}
					) 
				} 
			</ul> 
		</nav>
	);
}