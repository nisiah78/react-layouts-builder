import React, {
  FC,
  ReactNode,
  DragEvent,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType';

interface DraggableProps {
  children: ReactNode;
  dndTargetKey?: string;
  isSection?: boolean;
  disableChange?: boolean;
  onDropItem: (
    e: DragEvent<HTMLDivElement>,
    target: DropTargetPlaceEnum,
  ) => void;
}
export const DroppableColumnItem: FC<DraggableProps> = ({
  children,
  dndTargetKey,
  isSection,
  disableChange,
  onDropItem,
}) => {
  const [droppableTarget, setDroppableTarget] = useState<string>();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const targetEl = e.currentTarget;
    const targetDom = targetEl.getAttribute('target-droppable-item');

    if (targetDom && !isSection) {
      setDroppableTarget(targetDom);
    }
  };
  const isHoveredTargetClassName = (conditions: boolean) => {
    return conditions
      ? 'rlb-droppable-item-hover'
      : 'rlb-droppable-item';
  };

  const handleDragOverLeave = (e: DragEvent<HTMLDivElement>) => {
    setDroppableTarget('');
  };

  const handleDropToTop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.TOP);
    setDroppableTarget('');
  };
  const handleDropToBottom = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.BOTTOM);
    setDroppableTarget('');
  };
  return (
    <>
      {!disableChange ? (
        <div
          className={`${isHoveredTargetClassName(
            droppableTarget === `item-${dndTargetKey}-top`,
          )}`}
          target-droppable-item={`item-${dndTargetKey}-top`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragOverLeave}
          onDrop={handleDropToTop}
        >
          {droppableTarget === `item-${dndTargetKey}-top`
            ? 'Add item to column...'
            : null}
        </div>
      ) : null}

      {children}
      {!disableChange ? (
        <div
          className={`${isHoveredTargetClassName(
            droppableTarget === `item-${dndTargetKey}-bottom`,
          )}`}
          target-droppable-item={`item-${dndTargetKey}-bottom`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragOverLeave}
          onDrop={handleDropToBottom}
        >
          {droppableTarget === `item-${dndTargetKey}-bottom`
            ? 'Add item to column...'
            : null}
        </div>
      ) : null}
    </>
  );
};
