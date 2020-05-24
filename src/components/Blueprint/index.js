import React, { useState } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFillDrip, faHammer } from "@fortawesome/free-solid-svg-icons";
import { CellValueEnum, paintFloor, washFloor } from "../../modules/blueprint";
import style from "./style.module.scss";

const getCellValueStyle = (cellValue) => {
  switch (cellValue) {
    case CellValueEnum.PAINTED_FLOOR:
      return style.paintedFloor;
    case CellValueEnum.WALL:
      return style.wall;
    default:
      return style.bareFloor;
  }
};

const dragImage = new Image(0, 0);

export default ({ rowCount = 20, columCount = 20 }) => {
  const [buildModeEnabled, setBuildModeEnabled] = useState(true);
  const [blueprint, setBlueprint] = useState(
    Array(rowCount).fill(Array(columCount).fill(CellValueEnum.BARE_FLOOR))
  );

  const toggleCellWallValue = ({ rowIndex, columnIndex }) => {
    const cellValue = blueprint[rowIndex][columnIndex];
    const newCellValue =
      cellValue === CellValueEnum.BARE_FLOOR ||
      cellValue === CellValueEnum.PAINTED_FLOOR
        ? CellValueEnum.WALL
        : CellValueEnum.BARE_FLOOR;

    setCellValue({ rowIndex, columnIndex, cellValue: newCellValue });
  };

  const toggleFloorPaint = ({ rowIndex, columnIndex }) => {
    const cellValue = blueprint[rowIndex][columnIndex];
    if (cellValue === CellValueEnum.WALL) {
      return;
    }

    const newBlueprint =
      cellValue === CellValueEnum.BARE_FLOOR
        ? paintFloor({
            startCellRowIndex: rowIndex,
            startCellColumnIndex: columnIndex,
            blueprint: blueprint.map((row) => row.slice(0)),
          })
        : washFloor({
            startCellRowIndex: rowIndex,
            startCellColumnIndex: columnIndex,
            blueprint: blueprint.map((row) => row.slice(0)),
          });

    setBlueprint(newBlueprint);
  };

  const setCellValue = ({ rowIndex, columnIndex, cellValue }) => {
    if (blueprint[rowIndex][columnIndex] === cellValue) {
      return;
    }

    const newBlueprint = blueprint.map((row, i) =>
      i === rowIndex ? row.slice(0) : row
    );

    newBlueprint[rowIndex][columnIndex] = cellValue;
    setBlueprint(newBlueprint);
  };

  const clearPaint = () =>
    setBlueprint(
      blueprint.map((row) =>
        row.map((cellValue) =>
          cellValue === CellValueEnum.WALL
            ? CellValueEnum.WALL
            : CellValueEnum.BARE_FLOOR
        )
      )
    );

  const clearWalls = () =>
    setBlueprint(
      blueprint.map((row) =>
        row.map((cellValue) =>
          cellValue === CellValueEnum.WALL
            ? CellValueEnum.BARE_FLOOR
            : cellValue
        )
      )
    );

  const onDragStart = (e) =>
    buildModeEnabled && e.dataTransfer.setDragImage(dragImage, 0, 0);

  const onDragOver = ({ rowIndex, columnIndex }) => (e) => {
    if (buildModeEnabled) {
      e.preventDefault();
      setCellValue({ rowIndex, columnIndex, cellValue: CellValueEnum.WALL });
    }
  };

  const onCellClick = ({ rowIndex, columnIndex }) => () =>
    buildModeEnabled
      ? toggleCellWallValue({ rowIndex, columnIndex })
      : toggleFloorPaint({ rowIndex, columnIndex });

  return (
    <div className={style.container}>
      <div className={style.controlContainer}>
        <Button className={style.clearButton} onClick={() => clearWalls()}>
          Clear Walls
        </Button>

        <div className={style.modeGroup}>
          <ButtonGroup>
            <Button
              className={style.modeButton}
              variant="contained"
              color={buildModeEnabled ? "primary" : "default"}
              onClick={() => setBuildModeEnabled(true)}
            >
              <FontAwesomeIcon icon={faHammer} size="lg" fixedWidth={true} />
            </Button>

            <Button
              className={style.modeButton}
              variant="contained"
              color={!buildModeEnabled ? "primary" : "default"}
              onClick={() => setBuildModeEnabled(false)}
            >
              <FontAwesomeIcon icon={faFillDrip} size="lg" fixedWidth={true} />
            </Button>
          </ButtonGroup>
        </div>

        <Button className={style.clearButton} onClick={() => clearPaint()}>
          Clear Paint
        </Button>
      </div>

      <table
        className={`${style.table} ${
          buildModeEnabled ? style.buildMode : style.paintMode
        }`}
      >
        <tbody>
          {blueprint.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cellValue, columnIndex) => (
                <td
                  key={`${rowIndex},${columnIndex}`}
                  className={getCellValueStyle(cellValue)}
                  draggable={buildModeEnabled}
                  onDragStart={onDragStart}
                  onDragOver={onDragOver({ rowIndex, columnIndex })}
                  onClick={onCellClick({ rowIndex, columnIndex })}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
