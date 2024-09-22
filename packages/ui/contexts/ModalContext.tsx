import React, { createContext } from 'react';
import {useModals} from '../hooks';
import {ModalPropTypes} from '../components/Base';

export interface ModalsContextType {
    addModal: (modal:ModalPropTypes) => void; // Function to update the user
    removeModal: (modalKey:string) => void; // Function to update the user
    modals: ModalPropTypes[]
}

// Create the context
export const ModalsContext: React.Context<ModalsContextType> = createContext({
    modals: [] as ModalPropTypes[],
    addModal: (modal:ModalPropTypes) => {},
    removeModal: (modalKey:string) => {},
});

// Create a provider component
export const ModalsProvider = ({ children }: { children:React.ReactNode }) => {
    const { addModal, removeModal, modals } = useModals();
    return (
        <ModalsContext.Provider value={{ addModal, removeModal, modals }}>
            {children}
        </ModalsContext.Provider>
    );
};

