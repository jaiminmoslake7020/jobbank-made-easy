import React from 'react';
import './additional-questions.scss'

export type AdditionalQuestionsPropTypes = {
    additionalQuestions?: string[]
};

export const AdditionalQuestions = (props: AdditionalQuestionsPropTypes) => {
    const {
        additionalQuestions,
    } = props;

    return (additionalQuestions && Array.isArray(additionalQuestions) && additionalQuestions.length > 0 ?
        <div className={" additional-questions-wrapper "}>
            <h4>Additional Questions</h4>
            <div className={" additional-questions-container "}>
                {
                    additionalQuestions.map((r) => <p key={r} >{r}</p>)
                }
            </div>
        </div>
        : <></>)
}

