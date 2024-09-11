import React from 'react';

export type AdditionalQuestionsPropTypes = {
    additionalQuestions?: string[]
};

const AdditionalQuestions = (props: AdditionalQuestionsPropTypes) => {
    const {
        additionalQuestions,
    } = props;

    return (additionalQuestions && Array.isArray(additionalQuestions) && additionalQuestions.length > 0 ?
        <div className={"required-items flex flex-col gap-2 mb-4"}>
            <h4>Additional Questions</h4>
            <div className={"flex flex-col gap-4"}>
                {
                    additionalQuestions.map((r) => <p key={r} >{r}</p>)
                }
            </div>
        </div>
        : <></>)
}

export default AdditionalQuestions;
