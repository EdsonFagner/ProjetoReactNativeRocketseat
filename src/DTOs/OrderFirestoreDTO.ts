import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type OrderFirestoreDTO = {
    patrimony: string;
    description: string;
    status: 'open' | 'closed',
    //Dizendo que o parâmetro é opcional
    solution?: string;
    created_at: FirebaseFirestoreTypes.Timestamp;
    //Deixando parâmetro opcional
    closed_at?: FirebaseFirestoreTypes.Timestamp;
}