import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    jwt: { 
        secret: process.env.JWT_SIGIN_PRIVATE_KEY,
        maxAge: 2592000, //60*60*24
    },
    providers: [
        CredentialsProvider(
            {
                name: "Credentials",           
                credentials: {
                login: { },
                senha: { },
                },
                async authorize(credentials, req) {
                    try {
                        if(!credentials?.login && !credentials?.senha){
                            throw new Error("Login e senha requeridos");
                        }
                        const url = `${process.env.BASEURL}/api/user/login`
                        const response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                        login: credentials.login,
                                        senha: credentials.senha,
                                    }),
                            })
                        const retToken = await response.json();
                        console.log(retToken);
                        if(response.status !== 200){
                            throw new Error(retToken);
                        }

                        const autorization = { id: retToken};
                        if (autorization.id){
                            return autorization
                        }else{
                            throw new Error("Usuário não encontrado");
                        }
                    } catch (e) {
                        throw new Error(e.message);
                    }
                }
            }
        )
    ] ,
    callbacks: {
        async jwt({ token, account }) {        
          if (token.sub) {
            return token
          }
          else{
            throw new Error("Usuário invalido.")
          }
        },
        async session({ session, token, user }) {
          if(!token.sub){
            throw new Error("Sessão invalida.")
          }
          return {...session, accessToken: token.sub };      
        }
      }
     }
)

