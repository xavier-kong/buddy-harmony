import { useSettings, GuitarChordHook, ChordPosition, StringTuningType } from '../../../hooks';
import {
  Diagram,
  DotText,
  FretNumberPosition,
  FretNumberType,
  Orientation,
} from '../../../common/fretboard';
import React from 'react';
import { Typography } from '@material-tailwind/react';

const ChordContent = ({ chordModel, printRef, printStyle }: GuitarChordHook): JSX.Element => {
  const { tuningType, orientation, leftHanded } = useSettings();

  return (
    <div className="flex flex-col items-center" id="chord-content" ref={printRef}>
      <style type="text/css" media="print">
        {printStyle(orientation)}
      </style>
      {chordModel && (
        <div className="flex flex-row items-center">
          <Typography className="text-xl">{`${chordModel.key} ${chordModel.suffix}`}</Typography>
        </div>
      )}
      <div className="flex-row flex items-center">
        {chordModel && chordModel.positions ? (
          chordModel.positions.map((chord, chordPosition) => (
            <ChordDiagram
              key={`chord-${chordPosition}`}
              orientation={orientation}
              leftHanded={leftHanded}
              tuningType={tuningType}
              chord={chord}
              chordPosition={chordPosition}
              totalSiblings={chordModel?.positions?.length || 1}
            />
          ))
        ) : (
          <ChordDiagram
            orientation={orientation}
            leftHanded={leftHanded}
            tuningType={tuningType}
            totalSiblings={1}
          />
        )}
      </div>
    </div>
  );
};

export default ChordContent;

type ChordDiagramProps = {
  chord?: ChordPosition;
  orientation: Orientation;
  leftHanded: boolean;
  tuningType: StringTuningType;
  chordPosition?: number;
  totalSiblings: number;
};

const ChordDiagram = ({
  chord,
  orientation,
  leftHanded,
  tuningType,
  chordPosition,
  totalSiblings,
}: ChordDiagramProps): JSX.Element => {
  return (
    <Diagram
      key={`chord-diagram.${chordPosition || 0}`}
      className={totalSiblings === 1 ? 'flex flex-auto' : `flex basis-1/${totalSiblings}`}
      orientation={orientation}
      text={DotText.NOTE}
      leftHanded={leftHanded}
      chord={chord}
      fretNumbers={FretNumberType.ROMAN}
      fretNumbersPosition={FretNumberPosition.LEFT}
      tuning={tuningType.tuning}
    />
  );
};
