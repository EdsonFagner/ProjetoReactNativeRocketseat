//useState serve para armazenar estados, useEffect para que alguma ação seja
//feita ao renderizar a tela
import { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";

//Importando uma autenticação do firebase que já tem uma tipagem
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { SignIn } from "../screens/SignIn";

import { AppRouts } from "./app.routes";
import { Loading } from "../Components/Loading";


export function Routes(){   
    //Criando estados
    //estado para armazenar a informação de que está carregando
    const [loading, setIsLoading] = useState(true);
    //Estado com a tipagem de user do Firebase para saber se o 
    //usuario esta logado
    const [user, setUser] = useState<FirebaseAuthTypes.User>();


    //Estrutura do useEffect
    /** useEffect(() => {
        corpo da função
    }, [
        array para colocar as dependencias do useEffect
    ]) 
    Quando colocamos algo como dependencia do useEffect quando a variavel
    muda a função é chamada novamente, quando deixamos sem nada a função
    é executado uma vez só após a rederização do componente
     * */

    useEffect(() => {
        const subscriber = auth()
        //Observamos através desse método se o usuário está autenticado ou não
        .onAuthStateChanged(response =>{
            //Armazenando a informação dentro do estado
            setUser(response);
            //Desabilitando o Loading
            setIsLoading(false); 
        });
        
        //Fazendo a limpeza da memória
        return subscriber;
    }, []);

    //Se a tela estiver carregando chame o component loading
    if(loading) {
        <Loading />
    }

    //Se não estiver carregando retorna o conteudo
    return (
        <NavigationContainer
            //Dentro do navigationcontainer passamos as routas que queremos acessar
        >
            
            {
                //Usando o if ternário para saber se o usuário está logado
                //e fazer a troca de rotas
                user ? <AppRouts /> : <SignIn />
            }
        </NavigationContainer>
    )
}