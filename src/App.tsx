import React from "react";
import { useAppDispatch } from "./redux/store";

import { ClockEditor } from "./components";
import fetchCity from "./redux/time/asyncAction";

export const App = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchCity());
  }, [dispatch]);
  return (
    <>
      <ClockEditor />
    </>
  );
};
