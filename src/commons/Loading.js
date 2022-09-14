import { RevolvingDot } from  'react-loader-spinner';
import React from 'react';

export default function Loading() {
    return (
        <RevolvingDot
            height="100"
            width="100"
            radius="6"
            color="#4fa94d"
            secondaryColor=''
            ariaLabel="revolving-dot-loading"
            visible={true}
        />
    );
};