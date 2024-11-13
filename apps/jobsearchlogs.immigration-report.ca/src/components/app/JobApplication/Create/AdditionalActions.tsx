import React, {useContext, useState} from 'react';
import {Button, ModalHeader, ModalsContext} from 'ui';
import CompanyCreate from '../../Company/Create/CompanyCreate';
import ModalApp from '../../../base/ModalApp';
import RemoveModal from '../../../base/RemoveModal';
import {NewJobApplicationFormContext} from '../../../../contexts/NewJobApplicationFormProvider';

export type AdditionalActionsPropTypes = {

};

const AdditionalActions = (props: AdditionalActionsPropTypes) => {
    const {} = props;

    const {
        addCompany
    } = useContext(NewJobApplicationFormContext);

    const [addNewCompany, setAddNewCompany] = useState<boolean>(false);

    const modalKey = "add-new-company-modal";

    return (
        <div className={"flex gap-4"}>
            <Button size={"sm"} onClick={() => {
                setAddNewCompany(true);
            }}  >Add New Company</Button>

            {
                addNewCompany ?
              <ModalApp
                modalKey={modalKey}
                modalZIndex={30}
                isOpen={true}
                removeModal={() => {
                    setAddNewCompany(false);
                }}
                modalBody={<div className={"company-create-box"}>
                    <CompanyCreate onCreateCompleted={(data: any) => {
                        addCompany({
                            id: data.id,
                            name: data.name
                        });
                        setAddNewCompany(false);
                    }} />
                </div>}
                modalHeader={<ModalHeader onCloseClick={() => {
                    setAddNewCompany(false);
                }} title={"Add New Company"} />}
                modalStyleClass={"add-new-company-modal"}
              /> : <RemoveModal modalKey={modalKey} />
            }

        </div>
    );
}

export default AdditionalActions;
