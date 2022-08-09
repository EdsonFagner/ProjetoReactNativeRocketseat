import { NativeBaseProvider, StatusBar } from 'native-base';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { THEME } from './src/styles/theme';

//Na importação das rotas quando omitimos o nome do arquivo automaticamente é feito a busca pelo arquivo index.tsx
import { Routes } from './src/routes';

import { Loading } from './src/Components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
       {fontsLoaded ? <Routes /> : <Loading/>}
    </NativeBaseProvider>
  );
}
