//Fazemos a importação do useState para trabalharmos com estados os estados toda vez 
//que é preciso fazer uma alteração na página a mesma atualiza automaticamente
import { useState, useEffect } from 'react';
//Importando o alerta da biblioteca react native
import { Alert } from 'react-native';
//Importando a função de autenticação da biblioteca react native firebase
import auth  from '@react-native-firebase/auth';
//Importando a biblioteca firestore do firebase
import firestore from '@react-native-firebase/firestore';
//Para podermos navegar entre as páginas usamos essa importação
import { useNavigation } from '@react-navigation/native';
//Fazendo a importação de tags da biblioteca native base para estruturar a pagina
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
//Fazendo a inportação de icones da biblioteca phosphor
import { SignOut } from 'phosphor-react-native';
import { ChatTeardropText } from 'phosphor-react-native';

import { dateFormat } from '../utils/firestoreDateFormat';

//Fazendo a importação da logo da página
import Logo from '../assets/logo_secondary.svg';

//Importando o componente Filter
import { Filter } from '../Components/Filter';
//Importando o componente de botão
import { Button } from '../Components/Button';
//Importando o componente Order junto com suas propriedades
import { Order, OrderProps } from '../Components/Order';
import { Loading } from '../Components/Loading';

export function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');

    const navigation = useNavigation ();

    const {colors} = useTheme ();

    const [orders, setOrders] = useState<OrderProps[]>([]);

    //Função feita para executar comandos ao clicar no butão
    function handleNewOrder (){
        //Utilizamos esta função para dizer qual a interface que queremos renderizar
        navigation.navigate('new')
    }

    //Função para quando clicar no cartão redirecionar para os detalhes
    function handleOpenDetails (orderId: string) {
        navigation.navigate('details', {orderId});
        
    }

    //Função para deslogar da aplicação
    function handleLogout () {
        auth()
        //Método para deslogar o usuário
        .signOut()
        //Fazendo um catch para tratamento de erro
        .catch(error=>{
            console.log(error);
            return Alert.alert('Sair', 'Não foi possível sair.');
        });

    }

    useEffect(() => {
        setIsLoading(true)
        //Criando variavel para armazenar requisição do banco de dados
        const subscriber = firestore()
        //Buscando pela coleção 'orders'
        .collection('orders')
        //Criando um padrão de filtro para buscar os dados solicitados
        //Nesses dados temos uma variavel que armazena o estado
        //a comparação e qual o valor a se comparar.
        .where('status', '==', statusSelected)
        //Esse metodo é utilizado para atualizar os dados em tempo real
        .onSnapshot(snapshot => {
            //Utizando variavel para armazenar valor específico após
            //percorrer o array baseado no documento retornado na filtragem
            const data = snapshot.docs.map(doc => {
                
                //Desconstruindo as informações para poder acessar os
                //parametros dos documentos retornados
                const {patrimony,description, status, created_at} = doc.data();
                
                //Formatando os documentos acessados para exibir os dados
                return {
                    id: doc.id,
                    patrimony,
                    description,
                    status,
                    when: dateFormat(created_at)

                }
            });
            
            setOrders(data);
            setIsLoading(false);

        });

        //Fazendo um retorno do método de limpeza, remove da memória o listern
        //do firebase
        return subscriber;

    }, 
    //Colocamos o estado como dependencia do useEffect para que quando
    //o estado for atualizado realizar a busca novamente no firebase
    [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
        <HStack
            w="full"
            justifyContent="space-between"
            alignItems="center"
            bg="gray.600"
            pt={12}
            pb={5}
            px={6}
        >
            <Logo />

            <IconButton 
                icon={<SignOut size={26} color={colors.gray[300]}/>}
                //Quando o ícone for pressionado executar a função
                onPress={handleLogout}
            />
        </HStack>
        
        <VStack flex={1} px={6}>
            <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                <Heading color="gray.100">
                    Solicitações
                </Heading>
                
                <Text color="gray.200">
                    {orders.length}
                </Text>
            </HStack>

            <HStack space={3} mb={8}>
                <Filter 
                    type="open"
                    title="em andamento"
                    onPress={() => setStatusSelected ('open')}
                    isActive={statusSelected === 'open'}
                />

                <Filter 
                    type="closed"
                    title="finalizados"
                    onPress={() => setStatusSelected ('closed')}
                    isActive={statusSelected === 'closed'}
                />
            </HStack>

            {
                //Se estiver carregando exibe o icone de loading
                //se não exiba a flatlist
                isLoading ? <Loading /> :
                <FlatList 
                    data={orders} 
                    keyExtractor={item => item.id}
                    renderItem={({item})=><Order data={item} onPress={()=> handleOpenDetails(item.id)}  />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 100}}
                    ListEmptyComponent={() => (
                        <Center>
                            <ChatTeardropText color={colors.gray[300]} size={40} />
                            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                                Você ainda não possui {'\n'}
                                solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                            </Text>
                        </Center>
                    )}
                />
            }

            <Button 
                title="Nova solicitação"
                //Quando clicar no botão executar a função
                onPress={handleNewOrder}
            />
        </VStack>

    </VStack>
  );
}