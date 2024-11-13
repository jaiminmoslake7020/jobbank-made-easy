import React, {useCallback} from 'react';
import {Modal, ModalBodyWrapper, ModalHeader} from 'ui';
import {useRouter} from 'next/router';

export const LoginRequiredModal = () => {
    const p = <div className={"p-6"}><p>Please login.</p></div>;
    const router = useRouter();
    const { query } = router;
    const { login_required } = query || {};
    const removeModal = useCallback(() => {
        router.replace({
            pathname: '/',
        }).then(r => console.log("replace_state", r)).catch(e => {
            console.log(e);
        });
    },[router]);
    return (
        login_required === 'true' ? <Modal modalKey={"login-modal"} modalZIndex={30} isOpen={true} removeModal={removeModal}
               modalHeader={<ModalHeader title={"Login Required"} onCloseClick={removeModal}></ModalHeader>}
                modalBody={<ModalBodyWrapper>{p}</ModalBodyWrapper>}
        >
        </Modal> : null
    );
}
