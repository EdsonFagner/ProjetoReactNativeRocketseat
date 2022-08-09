export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            new: undefined;
            //Para ver os detalhes precimos passar o ID da ordem solicitada
            details: {orderId: string};
        }
    }
}