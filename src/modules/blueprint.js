export const CellValueEnum = Object.freeze({
  BARE_FLOOR: "BARE_FLOOR",
  PAINTED_FLOOR: "PAINTED_FLOOR",
  WALL: "WALL",
});

export const paintFloor = ({
  startCellRowIndex,
  startCellColumnIndex,
  blueprint,
}) =>
  fillFloor({
    startCellRowIndex,
    startCellColumnIndex,
    shouldPaint: true,
    blueprint,
  });

export const washFloor = ({
  startCellRowIndex,
  startCellColumnIndex,
  blueprint,
}) =>
  fillFloor({
    startCellRowIndex,
    startCellColumnIndex,
    shouldPaint: false,
    blueprint,
  });

const fillFloor = ({
  startCellRowIndex,
  startCellColumnIndex,
  shouldPaint,
  blueprint,
}) => {
  const startingCell = [startCellRowIndex, startCellColumnIndex];
  const startingCellValue = getCellValue(startingCell, blueprint);

  switch (startingCellValue) {
    case CellValueEnum.BARE_FLOOR:
    case CellValueEnum.PAINTED_FLOOR:
      break;
    case CellValueEnum.WALL:
      throw RangeError(
        "Invalid starting cell. The starting cell contains a wall."
      );
    default:
      throw RangeError(
        "Invalid starting cell. The starting cell is not within the blueprint."
      );
  }

  const desiredCellValue = shouldPaint
    ? CellValueEnum.PAINTED_FLOOR
    : CellValueEnum.BARE_FLOOR;

  const stack = [startingCell];
  while (stack.length) {
    const cell = stack.pop();

    if (!canFill(cell, desiredCellValue, blueprint)) {
      continue;
    }

    const [rowIndex, columnIndex] = cell;
    blueprint[rowIndex][columnIndex] = desiredCellValue;

    pushEligibleSurroundingCells(
      stack,
      rowIndex,
      columnIndex,
      desiredCellValue,
      blueprint
    );
  }

  return blueprint;
};

const pushEligibleSurroundingCells = (
  stack,
  rowIndex,
  columnIndex,
  desiredCellValue,
  blueprint
) => {
  var topLeft = [rowIndex - 1, columnIndex - 1];
  var topCenter = [rowIndex - 1, columnIndex];
  var topRight = [rowIndex - 1, columnIndex + 1];

  var middleLeft = [rowIndex, columnIndex - 1];
  var middleRight = [rowIndex, columnIndex + 1];

  var bottomLeft = [rowIndex + 1, columnIndex - 1];
  var bottomCenter = [rowIndex + 1, columnIndex];
  var bottomRight = [rowIndex + 1, columnIndex + 1];

  var topLeftCanPaint = canFill(topLeft, desiredCellValue, blueprint);
  var topCenterCanPaint = canFill(topCenter, desiredCellValue, blueprint);
  var topRightCanPaint = canFill(topRight, desiredCellValue, blueprint);

  var middleLeftCanPaint = canFill(middleLeft, desiredCellValue, blueprint);
  var middleRightCanPaint = canFill(middleRight, desiredCellValue, blueprint);

  var bottomLeftCanPaint = canFill(bottomLeft, desiredCellValue, blueprint);
  var bottomCenterCanPaint = canFill(bottomCenter, desiredCellValue, blueprint);
  var bottomRightCanPaint = canFill(bottomRight, desiredCellValue, blueprint);

  if (topLeftCanPaint && (topCenterCanPaint || middleLeftCanPaint)) {
    stack.push(topLeft);
  }

  if (topCenterCanPaint) {
    stack.push(topCenter);
  }

  if (topRightCanPaint && (topCenterCanPaint || middleRightCanPaint)) {
    stack.push(topRight);
  }

  if (middleLeftCanPaint) {
    stack.push(middleLeft);
  }

  if (middleRightCanPaint) {
    stack.push(middleRight);
  }

  if (bottomLeftCanPaint && (bottomCenterCanPaint || middleLeftCanPaint)) {
    stack.push(bottomLeft);
  }

  if (bottomCenterCanPaint) {
    stack.push(bottomCenter);
  }

  if (bottomRightCanPaint && (bottomCenterCanPaint || middleRightCanPaint)) {
    stack.push(bottomRight);
  }
};

const canFill = (cell, desiredCellValue, blueprint) => {
  const cellValue = getCellValue(cell, blueprint);
  return (
    cellValue &&
    cellValue !== CellValueEnum.WALL &&
    cellValue !== desiredCellValue
  );
};

const getCellValue = (cell, blueprint) => {
  const [rowIndex, columnIndex] = cell;
  if (rowIndex < 0 || columnIndex < 0 || rowIndex > blueprint.length - 1) {
    return null;
  }

  const row = blueprint[rowIndex];

  return columnIndex < row.length ? row[columnIndex] : null;
};
