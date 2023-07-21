// import OpcoesMenu  from "./opcoesMenu";
import MenuItems from "./menuItens.jsx";


const OpcoesMenu = [
	{
        title: "Principal",
        submenu: [
            {
                title: "Selecionar Encomenda",
                page: "/principal/selEncomendas",
            },
            {
                title: "Cadastros",
                submenu: [
                    {
                        title: "Encomendas",
                        page: "/principal/cadastros/encomendas",
                    },
                    {
                        title: "Usuários",
                        page: "/principal/cadastros/usuarios",
                    },
                ]
            },
            {
                title: "Logout...",
                page: "/principal/login",
            },
        ]
    },
    {
        title: "Engenharia",
        submenu: [
            {
                title: "Estrutura de Controle",
                page: "/engenharia/estruturaControle",
            },
            {
                title: "ETCs",
                page: "/#",
            },
            {
                title: "Cadastros",
                submenu: [
                    {
                        title: "TAGs",
                        page: "/engenharia/cadastros/tags",
                    },
                    {
                        title: "Familias",
                        page: "/engenharia/cadastros/familias",
                    },
                    {
                        title: "Importar Lista",
                        page: "/engenharia/estruturaControle/importar",
                    },
                ]
            },
            {
                title: "Relatórios",
                page: "/#",
            },
        ],
    },
    {
        title: "Documentos",
        page: "/#",
    },    
    {
        title: "Ajuda",
        submenu: [
			{
                title: "Manual",
                page: "/#",
            },
            {
                title: "Sobre",
                page: "/ajuda/about",
            },
        ],
    },
];



export default function Navbar() {
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