import React, { useContext, useEffect } from "react";
import { Context as GridContext } from "../../../context/grid/GridContext";

const ImageGrid = () => {
  const {
    state: { grid, gridProcessing },
    getGrid,
  } = useContext(GridContext);

  useEffect(() => {
    getGrid();
  }, []);

  return (
    <>
      <img alt="Combined grid" srcSet={grid} />
    </>
  );
};

export default ImageGrid;
