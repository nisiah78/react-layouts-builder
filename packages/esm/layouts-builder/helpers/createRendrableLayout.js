var createRenderableLayout = function createRenderableLayout(data, layouts, key) {
  var dataLayout = layouts.map(function (layout) {
    var renderedLayout = {
      id: layout.id,
      order: layout.order,
      className: layout.className,
      columns: layout.columns.map(function (cols) {
        var items = cols.childIds.map(function (item) {
          return data.find(function (dt) {
            return dt[key] === item;
          }) || {};
        });
        var renderedCol = {
          id: cols.id,
          order: cols.order,
          className: cols.className,
          items: items,
          styles: cols.styles,
          width: cols.width
        };
        console.log(cols.childIds, renderedCol.items);
        return renderedCol;
      }).filter(function (col) {
        return col.items.length > 0;
      })
    };
    return renderedLayout;
  }).filter(function (section) {
    return section.columns.length > 0;
  });
  return dataLayout;
};

export { createRenderableLayout };
