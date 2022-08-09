//Importando a função createNativeStackNavigator da biblioteca react navigation native-satck
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Importando as telas que temos no nosso projeto
import { Home } from "../screens/Home";
import { Details } from "../screens/Details";
import { Register } from "../screens/Register";

//Desconstruindo a função para utilizar os parametros "Navigator" e "Screen"
//No Navigator consiguimos passar as configurações e as screens
const {Navigator, Screen} = createNativeStackNavigator ();

//Criando função AppRoutes
export function AppRouts (){
    return(
        <Navigator
            //Usamos esta propriedade para desabilitar o cabeçalho padrão do navigator
            screenOptions={{headerShown: false}}
        >
            
            <Screen
                //Damos um nome para a rota 
                name="home" 
                //E passamos qual componente deve ser renderizado na tela
                component={Home}
            />
            <Screen name="new" component={Register} />
            <Screen name="details" component={Details} />
        </Navigator>

    )
}