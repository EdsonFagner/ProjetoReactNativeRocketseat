import { useState } from 'react';
import { Alert } from 'react-native';
import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

import { Header } from '../Components/Header';
import { Input } from '../Components/input';
import { Button } from '../Components/Button';

export function Register() {
  //Criando estado para quando o botão for pressionado 
  //aparecer o icone de carregamento
  const [isLoading, setIsLoading] = useState(false);

  //Criando estado para armazenar o patrimonio
  const [patrimony, setPatrimony] = useState('');

  //Criando estado para armazenar a descrição
  const [description, setDescription] = useState('');

  const navigation = useNavigation();
  
  //Função para criar nova ordem
  function handleNewOrderRegister(){
    if(!patrimony || !description){
      //Utilizamos o return como se fosse o break do switch
      //para encerrar assim que fizer a ação
      return Alert.alert('Registrar', 'Preencha todos os campos');
    }

    setIsLoading(true);

    //Enviando os dados capturados para o banco de dados
    firestore()
    //Adicionamos o nome da coleção
    //Se a coleção não existir o comando cria e se existir
    //adiciona a informação dentro da mesma
    .collection('orders')
    //Dentro da coleção adicionamos um novo documento
    .add({
      patrimony,
      description,
      status: 'open',
      //Utilizando a função abaixo conseguimos capturar a hora que o proprio
      //firestore utiliza
      created_at: firestore.FieldValue.serverTimestamp()
    })
    //Caso a solicitação seja registrada
    .then(() => {
      Alert.alert('Registrado', 'Solicitação registrada com sucesso!');
      //Comando utilizado para retornar a página anterior
      navigation.goBack();
    })
    //Tratamento de erros
    .catch((error)=>{
      //Mostra o erro no console
      console.log(error);
      //Retira o icone de carreamento
      setIsLoading(false);
      //Retorna um alerta para o usuário e encerra as ações
      return Alert.alert('Solicitação', 'Não foi possível registrar o pedido.')
    });
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
        
        <Header title="Solicitação"/>

        <Input 
            placeholder="Número do patrimônio"
            mt={4}
            //Capturando o numero do patrimonio e atualizando o estado
            onChangeText={setPatrimony}
        />

        <Input 
            placeholder="Descrição do problema"
            //Margin Top
            mt={5}
            flex={1}
            //Essa propriedade serve para permitir que o usuário quebre linhas, 
            //de enter dentro do input e etc...
            multiline
            //Posiciona o texto no inicio do input
            textAlignVertical="top"
            //Capturando a descrição do problema e atualizando o estado
            onChangeText={setDescription}
        />  

        <Button 
            //Título do botão
            title="Cadastrar"
            mt={5}
            isLoading={isLoading}
            onPress={handleNewOrderRegister} 
        />
    </VStack>
  );
}