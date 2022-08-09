import {useState} from 'react';

//Importando a função de alerta da biblioteca react native
import { Alert } from 'react-native';

//Importando a biblioteca do fire base para fazer a autenticação
import auth from '@react-native-firebase/auth';

import { VStack, Heading, Icon, useTheme } from 'native-base';

import {Envelope, Key} from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';

import { Input } from '../Components/input';
import { Button } from '../Components/Button';
import { isLoading } from 'expo-font';



export function SignIn(){
    //Criando variaveis constantes para serem utilizadas como estados 
    //e atualizarem na aplicação em tempo real

    //Criando variaveis para utilizar como estado e fazer com que o botão
    //de login tenha a animação de carregamento após clicar e tentar 
    //efetuar o login
    const [isLoading, setIsLoading] = useState(false);

    //Criando variaveis para utilizar como estado e capturar o email 
    //digitado pelo usuario no input
    const [email, setEmail] = useState('');

    //Criando variaveis para utilizar como estado e capturar a 
    //senha utilizada pelo usuário no input
    const [password, setPassword] = useState('');


    const { colors } = useTheme();

    function handleSignIn (){
        //Fazendo teste se as variáveis são nulas
        if (!email || !password){
            //O return funciona para pausar a função quando a condição é atendida
            //A função de alerta tem dois parametros, o titulo do alerta e a descrição
            return Alert.alert('Entrar', 'Informe e-mail e senha');
        }

        //Ativando a variável booleana para executar o status de carregamento
        //do botão pressionado
        setIsLoading(true);

        auth()
        //Função que faz a autenticação com login e senha
        .signInWithEmailAndPassword(email, password)
        //Metodo criado para retornar um debug ao efetuar login
        /*
        .then(response => {
            console.log(response);
        })
        */
        //Tratamento para caso houver erro
        .catch((error) => {
            console.log(error.code);
            setIsLoading(false);
            
            //Fazendo tratamentos para os tipos de erros

            //Erro de email invalido
            if(error.code === 'auth/invalid-email') {
                return Alert.alert('Entrar', 'E-mail inválido.');
            }

            //Erro de senha invalido
            if(error.code === 'auth/wrong-password') {
                return Alert.alert('Entrar', 'E-mail ou senha inválida.');
            }

            //Erro de email não existente
            if(error.code === 'auth/user-not-found'){
                return Alert.alert('Entrar', 'E-mail ou senha inválida.');
            }

            //Exceção geral, caso dê erro mas não entre em nenhum
            //dos erros acima
            return Alert.alert('Entrar','Não foi possível acessar.');
        });
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>

            <Logo />
            
            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Acesse sua conta
            </Heading>

            <Input 
                placeholder="E-mail"
                mb={4}
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]}/>} ml={4}/>}
                onChangeText={setEmail}
            />

            <Input 
                placeholder="Senha"
                mb={8}
                //
                InputLeftElement={<Icon as={<Key color={colors.gray[300]}/>} ml={4}/>}
                secureTextEntry
                onChangeText={setPassword}
            />
            
            <Button 
                title="Entrar" 

                w="full"

                //Propriedade utilizada para quando o usuário pressionar o 
                //botão executar a função "handleSignIn"
                onPress={handleSignIn}

                //Propriedade do native-base que faz com que o botão entre em
                //modo de carregamento
                //Quando o botão entra em modo de carregamento o usuário é
                //impedido de fazer uma nova requisição ao servidor até que
                //a primeira seja validada
                isLoading={isLoading}
            />


        </VStack>
    )
}