import { opcoesMenu } from "./opcoesMenu";
import MenuItems from "./menuItens";

export default function Navbar() {
    return ( 
		<nav>
			<ul className="menus"> 
				{	opcoesMenu.map((menu, index) => {
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