import React from 'react';

export type LoadingPropTypes = {
    loadingWraporClass?: string,
    loadingIconClass?: string
};

const Loading = (props: LoadingPropTypes) => {
    const {
        loadingWraporClass,
        loadingIconClass
    } = props;
    return (
        <div className={"loading-wrapper "+(loadingWraporClass || '')}>
            <i className={'fa-solid fa-gear fa-spin loading-icon '+(loadingIconClass || '')}  />
        </div>
    );
}

export default Loading;
