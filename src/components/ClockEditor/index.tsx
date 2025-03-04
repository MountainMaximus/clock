import React from "react";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";

import styles from "./ClockEditor.module.scss";
import { addClock, updateTime } from "../../redux/time/slice";
import { getClocks, getStatus } from "../../redux/time/selectors";
import { Button, Clock } from "../";
import { Skeleton } from "./Skeleton";
import { Status } from "../../types";

export const ClockEditor: React.FC = () => {
  const dispatch = useAppDispatch();
  const clocks = useSelector(getClocks);
  const { status, message } = useSelector(getStatus);

  React.useEffect(() => {
    if (status === Status.ERROR) window.alert(message);
  }, [status, message]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const onClickAddClock = () => {
    dispatch(addClock());
  };

  if (status === Status.LOADING) return <Skeleton />;
  return (
    <div className={styles.root}>
      <div className={styles.clocks}>
        {clocks.map((clock) => (
          <Clock key={clock.id} clockId={clock.id} />
        ))}
      </div>

      {clocks.length < 10 && (
        <Button onClick={onClickAddClock}>Добавить циферблат</Button>
      )}
    </div>
  );
};
