import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import {useInitial} from "./useInitial";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/useInitial">
                <useInitial/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;