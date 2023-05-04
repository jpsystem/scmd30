//Lista das opções dos menus
//=============================
//Retorna um Array com todas as
//descrições dos menus e seus
//respectivos links
export const opcoesMenu = [
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
                page: "/#",
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