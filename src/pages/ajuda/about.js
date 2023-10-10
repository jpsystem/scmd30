import FechaForm from "@/componentes/fechaForm";
import LayoutPagina from "../componentes/layoutPagina";
import Style from "./about.module.css"
import Image from "next/image";
import Subtitulo from "@/componentes/artigos/subtitulo";
import Opcao from "@/componentes/artigos/opcao";
import Conteudo from "@/componentes/artigos/conteudo";
import { FaCircle, FaSquare } from 'react-icons/fa'
import { IoMailUnreadOutline,  IoLogoWhatsapp, IoCallOutline} from "react-icons/io5";
import Logo from "@/componentes/artigos/logo";

export default function About() {
    return (
      <LayoutPagina largura="75%">
        {/* Linha superior para o botão fechar */}
        <div className={Style.fechar}>
          <FechaForm/>
        </div>
        {/* Linha do cabecalho da página */}
        <div className={Style.logoPage}>
          <div className={Style.ladoE}>
            <Image src="/images/Logo_SCMD.png" priority={false} width="200" height="80" alt="Logo SCMD"/>
          </div>
          <div className={Style.ladoD}>
            <h1 className={Style.title}>Sobre o SCMD 3.0</h1>
          </div>
        </div>
        {/* Aria do corpo da página About */}
        <div className={Style.corpoAbout}>
          {/* Area do Index Lateral Esquerdo */}
          <div className={Style.sideBar}>
            <div className={Style.logos}>
              <Image src="/images/informationIcon.jpg" priority={false} width="150" height="150" alt="Icone de Informação"/>
              <h1 className={Style.title2}>Indice</h1>
            </div>
            <br/>
            <br/>
            <p><Opcao nomeAncora="apresentacao">Apresentação</Opcao></p>
            <p><Opcao nomeAncora="principais">Principais Recursos</Opcao></p>
            <p><Opcao nomeAncora="especificacoes">Especificações técnicas</Opcao></p>
            <p><Opcao nomeAncora="equipe">Equipe de Desenvolvimento</Opcao></p>
            <p><Opcao nomeAncora="contato">Contato e Suporte</Opcao></p>
            <p><Opcao nomeAncora="historico">Histórico das versões</Opcao></p>
            <p><Opcao nomeAncora="felipe">Dados do Felipe</Opcao></p>
          </div>
          <div className={Style.contexto}>
            <Subtitulo nomeAncora="apresentacao">Apresentação</Subtitulo>
            <Conteudo espaco="50px"> 
              O Sistema SCMD 3.0 Sistemas Controle de Materiais e Documentos, 
              foi desenvolvido para a TMSA Tecnologia em movimentação, em substituição 
              do antigo sistema SCD 2.0, e tem como característica principal o 
              controle dos materiais aplicados na fabricação de equipamentos para 
              terminais e movimentação de granéis sólidos bem como o controle dos 
              documentos: Desenhos, Especificações técnicas, etc.            
            </Conteudo>
            <Subtitulo nomeAncora="principais">Principais Recursos</Subtitulo>
            <Conteudo >
              <FaSquare/> Controle administrativo dos cadastros (Inclusão, Alteração, Exclusão e Consulta), utilizados em seus projetos:
            </Conteudo>
            <Conteudo recuo="50px">
              <FaCircle/> Usuários
            </Conteudo>
            <Conteudo recuo="50px">
              <FaCircle/> Encomendas
            </Conteudo>
            <Conteudo recuo="50px">
              <FaCircle/> Tags
            </Conteudo>
            <Conteudo recuo="50px">
              <FaCircle/> Fanilias
            </Conteudo>
            <Conteudo>
              <FaSquare/> Estrutura de Controle
            </Conteudo>
            <Conteudo>
              <FaSquare/> ETC
            </Conteudo>
            <Conteudo espaco="50px">
              <FaSquare/> Relatórios
            </Conteudo>
            <Subtitulo nomeAncora="especificacoes">Especificações técnicas</Subtitulo>
            <Conteudo > 
              O Sistema SCMD 3.0 foi desenvolvido na plataforma Node.JS utilizando as 
              seguintes tecnologias:
            </Conteudo>
            <div className={Style.logos}>
            <Logo icone="nodejs.png">
                Node JS
              </Logo>
              <Logo icone="nextjs.png">
                NextJS 13.3
              </Logo>
              <Logo icone="reactjs.jpg">
                ReactJS 18.2
              </Logo>
              <Logo icone="html_css.jpg">
                HTML e CSS
              </Logo>
              <Logo icone="JavaScript3.jpg">
                JavaScript
              </Logo>
              <Logo icone="mySql.png">
                MySql 8.0
              </Logo>
              <Logo icone="cloud-computing.jpg">
                Cloud Hosting
              </Logo>
              <Logo icone="vercel.jpg">
                Vercel
              </Logo>
              <Logo icone="PlanetScale.jpg">
                Planet Scale
              </Logo>
            </div>
            <Subtitulo nomeAncora="equipe">Equipe de Desenvolvimento</Subtitulo>
            <Conteudo espaco="50px"> 
              Este sistema foi desenvolvido por JP System Ltda.<br/>Analista responsável João Pedro Abreu Magalhães
              <Logo icone="logoJPsystem.png">
                JPSystem Ltda. &copy; 2023
              </Logo> 
            </Conteudo>
            <Subtitulo nomeAncora="contato">Contato e Suporte</Subtitulo>
            <Conteudo espaco="50px"> 
              Fale com a JPSystem!<br/>
              Nós da JPSystem trabalhamos sempre ouvindo nossos clientes e parceiros pois acreditamos que assim, podemos evoluir e entregar sempre o melhor serviço.<br/><br/>
              Formas de contato<br/>
              <div className={Style.formas}>
                <IoCallOutline className={Style.icone}/> Por WhatsApp<br/>
                <Conteudo recuo="50px">(55) 11 99999-9999</Conteudo>
              </div>
              <div className={Style.formas}>
                <IoLogoWhatsapp className={Style.icone}/> Por Telefone<br/>
                <Conteudo recuo="50px">(55) 11 99999-9999</Conteudo>
              </div>
              <div className={Style.formas}>
                <IoMailUnreadOutline className={Style.icone}/> Por Email
                <Conteudo recuo="50px">jp.magalhaes@jpsystem.com.br</Conteudo>
              </div>
            </Conteudo>
            <Subtitulo nomeAncora="historico">Histórico das versões</Subtitulo>
            <Conteudo espaco="50px"> 
              Versão atual
              <Conteudo recuo="50px">3.0 rev.0.1.0</Conteudo>
              Detalhe das revisões.<br/>
              <Conteudo recuo="50px">Rev. 0.1.0 Data 06/10/2023 18:30h</Conteudo>
              
            </Conteudo>
            <Subtitulo nomeAncora="felipe">Dados do Felipe</Subtitulo>
            <Conteudo>Felipe é um cara legal gentes boa!</Conteudo>
          </div>
        </div>
      </LayoutPagina>
    )
  }