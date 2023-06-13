// import OpcoesMenu  from "./opcoesMenu";
import MenuItems from "./menuItens";


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
                        title: "Familias",
                        page: "/principal/cadastros/familias",
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
                title: "Cadastro de Tags",
                page: "/#",
            },
            {
                title: "Estrutura de Controle",
                page: "/engenharia/estruturaControle",
            },
            {
                title: "Importar Lista",
                page: "/engenharia/estruturaControle/importar",
            },
            {
                title: "ETCs",
                page: "/#",
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