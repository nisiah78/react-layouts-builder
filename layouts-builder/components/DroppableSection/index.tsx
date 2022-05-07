import { useClickAway } from 'react-use';
// import { RgbaColorPicker } from 'react-colorful';
import { DefaultDragIcon } from 'layouts-builder/icons';
import React, {
  FC,
  ReactNode,
  DragEvent,
  useState,
  SyntheticEvent,
  useRef,
} from 'react';
import {
  DropTargetPlaceEnum,
  // Rgba,
} from '../../interface/internalType';
// import ColorPicker from '../colorPicker';
// import { hexToRGBA } from 'layouts-builder/helpers/colorHelper';
import { IRenderableLayout } from 'layouts-builder/interface/renderableInterface';
import classNames from 'classnames';
import { ResizableContainer } from '../ResizableContainer/ResizableContainer';

interface DraggableProps {
  section: IRenderableLayout;
  index: number;
  children: ReactNode;
  resizable?: boolean;
  width?: number;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  onClickSection: () => void;
  onResize?: (currentSize: number) => void;
}
export const DroppableSection: FC<DraggableProps> = ({
  children,
  section,
  width,
  resizable,
  onDragStart,
  onClickSection,
  onResize,
}) => {
  return (
    <ResizableContainer
      isSection
      resizable={resizable}
      noPadding
      onClick={onClickSection}
      type="container"
      onResizeEnd={onResize}
      styles={{ width }}
    >
      <div
        className={classNames('rlb-section rlb-section-container ')}
        draggable={false}
        onDragStart={onDragStart}
        style={{
          background: section.backgroundImage
            ? `url(${section.backgroundImage})`
            : section.backgroundColor,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div
          className="rlb-section-content"
          style={{ width: section.width, margin: 'auto' }}
        >
          {children}
        </div>
      </div>
    </ResizableContainer>
  );
};
