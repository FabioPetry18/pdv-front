import Cookie from 'js-cookie';
export interface responseProps{
  status: number;
  isOk: boolean;
  response: any
  messageError: string | 'Ocorreu um erro interno'
}


export  async function RequestNoCacheNoAuthorization(method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS'
                                                            , endpoint: string, body: any){   
                                                                
        const isAuth = await fetch(`http://localhost:8081/${endpoint}`,  {
            method: method, 
            headers: {
              'Content-Type': 'application/json',              
            },
            body: JSON.stringify(body)
          });
          const response =  await isAuth.json();
          if (!isAuth.ok) {
            const errorMessage = response.body.message || 'Erro inesperado durante a requisição.';
            throw new Error(errorMessage);
        }
       return response;
    }

    

 

    export  async function RequestWithCaheWithAuthorization(method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS'
                                                            , endpoint: string, body: any){  
                                                                
        const auth = Cookie.get("Authorization");   

        if(!auth ) {
             throw new Error("Token nao definido!");
        }    

        if(method !== "GET") {
          const isAuth = await fetch(`http://localhost:8081/${endpoint}`,  {
              method: method, 
              //cache: "force-cache",
              headers: {
                'Content-Type': 'application/json',  
                'Authorization': auth!            
              },
              body: JSON.stringify(body)
            });
            const response =  await isAuth.json();
            if (!isAuth.ok) {
              const errorMessage = response.body.message || 'Erro inesperado durante a requisição.';
              throw new Error(errorMessage);
            }
         // useUserStore.setState({state: {user: response ?? null}})
         return response;
        }  else {
          const isAuth = await fetch(`http://localhost:8081/${endpoint}`, {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': auth
            },
          });
          
          if (!isAuth.ok) {
            const errorMessage = `Erro ${isAuth.status}: ${isAuth.statusText}`;
            throw new Error(errorMessage);
          }
          
          let response;
          try {
            response = await isAuth.json();
          } catch (error) {
            // Se houver um erro ao converter para JSON, trate-o adequadamente
            throw new Error('Erro ao processar a resposta do servidor.');
          }
          
          return response;
        }                                                      
    }
    export  async function RequestNoCaheWithAuthorization(method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS'
                                                            , endpoint: string, body: any){  
                                                                
        const auth = Cookie.get("Authorization");   
        if(!auth ) {
             throw new Error("Token nao definido!");
        }    

        if(method !== "GET") {
          const isAuth = await fetch(`http://localhost:8081/${endpoint}`,  {
              method: method, 
              cache: "no-cache",
              headers: {
                'Content-Type': 'application/json',  
                'Authorization': auth!            
              },
              body: JSON.stringify(body)
            });
            const response =  await isAuth.json();
            if (!isAuth.ok) {
              const errorMessage = response.body.message || 'Erro inesperado durante a requisição.';
              throw new Error(errorMessage);
            }
         return response;
        }  else {
          const isAuth = await fetch(`http://localhost:8081/${endpoint}`, {
            method: method,
            cache: "no-cache",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': auth
            },
          });
          
          if (!isAuth.ok) {
            const errorMessage = `Erro ${isAuth.status}: ${isAuth.statusText}`;
            throw new Error(errorMessage);
          }
          
          let response;
          try {
            response = await isAuth.json();
          } catch (error) {
            // Se houver um erro ao converter para JSON, trate-o adequadamente
            throw new Error('Erro ao processar a resposta do servidor.');
          }
          
          return response;
        }                                                      
    }
