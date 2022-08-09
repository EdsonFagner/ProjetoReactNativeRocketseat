import { HStack, IconButton, useTheme, StyledProps, Heading } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

type Props = StyledProps & {
    title: string;
}

export function Header({title, ...rest}: Props) {

    const {colors} = useTheme();

    const navigation = useNavigation();


    function handleGoBack () {
        //Função para voltar uma página antes
        navigation.goBack();
    }

    return (
        <HStack
            //Define a largura do container como a largura total do espaço que temos
            w="full"
            //Define o espaçamento entre os itens
            justifyContent="space-between"
            //Define que os itens sejam organizados a partir do centro
            alignItems="center"
            //Troca a cor de fundo do container
            bg="gray.600"
            //Padding Bottom
            pb={6}
            //Padding Top
            pt={12}
            {...rest}

        >   
            <IconButton
                //Passando qual será o icone adicionado
                icon={<CaretLeft
                        //Setando a cor do ícone 
                        color={colors.gray[200]}
                        //Setando o tamanho do ícone 
                        size={24}
                    />}
                //Quando apertar o icone do botão executar a função handleGoBack
                onPress={handleGoBack}
            />

            <Heading 
                //Definindo a cor
                color="gray.100" 
                //Definindo o texto como centralizado
                textAlign="center" 
                //definindo o tamanho da fonte
                fontSize="lg" 
                //Dizendo para esta tag ocupar todo o espaço disponivel com flex
                flex={1}
                //Margin Left
                ml={-6}
            >
                {title}
            </Heading>
        </HStack>
  );
}