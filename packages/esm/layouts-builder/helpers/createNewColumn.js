import v4 from '../../node_modules/uuid/dist/esm-browser/v4.js';

var createNewColumn = function createNewColumn(itemKey) {
  return {
    id: v4(),
    order: 0,
    width: 'auto',
    className: '',
    childIds: itemKey || ['EMPTY_SECTION']
  };
};

export { createNewColumn };
