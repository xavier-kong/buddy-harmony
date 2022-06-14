import React from 'react';
import { GuitarScaleHook, useSettings } from '../../../hooks';
import {
  DEFAULT_STYLE,
  Diagram,
  DotText,
  FretNumberPosition,
  FretNumberType,
} from '../../../components/fretboard';

const ScaleContent = ({ scaleModel }: GuitarScaleHook): JSX.Element => {
  const { tuningType, orientation, leftHanded } = useSettings();

  return (
    <div className="flex justify-center" id="scale-content">
      <Diagram
        className={'max-w-screen-2xl max-h-screen'}
        diagramStyle={DEFAULT_STYLE}
        orientation={orientation}
        text={DotText.NOTE}
        leftHanded={leftHanded}
        scale={scaleModel}
        frets={12}
        fretNumbers={FretNumberType.LATIN}
        fretNumbersPosition={FretNumberPosition.LEFT}
        tuning={tuningType.tuning}
        debug={false}
      />
    </div>
  );
};

export default ScaleContent;
