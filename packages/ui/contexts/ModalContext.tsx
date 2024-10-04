import React, {createContext, useEffect} from 'react';
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

    const modalsLength = modals.length;
    useEffect(() => {
        if  (modalsLength > 0) {
            if (!document.body.classList.contains('modal-open')) {
                document.body.classList.add('modal-open');
            }
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [modalsLength]);

    const findHighestZIndexModal = [...modals].sort((x, y) => y.modalZIndex-x.modalZIndex);
    const modalOnTopKey = findHighestZIndexModal.length > 0 ? findHighestZIndexModal[0].modalKey : null;
    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.key === "Escape") {
                console.log("Escape key pressed!");
                if (modalOnTopKey) {
                    removeModal(modalOnTopKey);
                }
                // Perform the desired action, like closing a modal
            }
        };

        // Attach the event listener when the component mounts
        window.addEventListener("keydown", handleEsc);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [modalOnTopKey])

    return (
        <ModalsContext.Provider value={{ addModal, removeModal, modals }}>
            {children}
        </ModalsContext.Provider>
    );
};

