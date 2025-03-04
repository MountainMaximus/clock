import React from "react";
import { useSelector } from "react-redux";

import styles from "./Clock.module.scss";
import { Time } from "../../types";
import { getClock, getClocks, getTime } from "../../redux/time/selectors";
import { CityList } from "../CityList";
import { useAppDispatch } from "../../redux/store";
import { deleteClock } from "../../redux/time/slice";

export const Clock: React.FC<{ clockId: number }> = ({ clockId }) => {
  const [time, setTime] = React.useState<Time>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const globalTime = useSelector(getTime);
  const clock = useSelector(getClock(clockId));
  const countClock = useSelector(getClocks).length;
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (clock) {
      const time = new Date(globalTime);
      time.setUTCMinutes(time.getUTCMinutes() - clock.city.timeZone);
      setTime({
        hours: time.getUTCHours(),
        minutes: time.getUTCMinutes(),
        seconds: time.getUTCSeconds(),
      });
    }
  }, [globalTime, clock]);
  const onClickDeleteClock = () => {
    dispatch(deleteClock({ clockId: clock?.id }));
  };
  if (!clock) return <div>Ошибка получения циферблата</div>;
  return (
    <div className={`${styles.root} ${countClock === 1 ? styles.last : ""}`}>
      <CityList activeCity={clock?.city} clockId={clock.id} />
      <div className={styles.clockFace}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={styles.mark}
            style={{
              transform: `translate(-50%, -50%) rotate(${
                i * 30
              }deg) translateY(-90px)`,
            }}
          ></div>
        ))}
        <div
          className={`${styles.hand} ${styles.hour}`}
          style={{
            transform: `translate(-50%, -100%) rotate(${
              (time.hours % 12) * 30
            }deg)`,
            transition: time.hours ? "transform 0.2s ease-in-out" : "none",
          }}
        ></div>
        <div
          className={`${styles.hand} ${styles.minute}`}
          style={{
            transform: `translate(-50%, -100%) rotate(${time.minutes * 6}deg)`,
            transition: time.minutes ? "transform 0.2s ease-in-out" : "none",
          }}
        ></div>
        <div
          className={`${styles.hand} ${styles.second}`}
          style={{
            transform: `translate(-50%, -85%) rotate(${time.seconds * 6}deg)`,
            transition: time.seconds ? "transform 0.2s ease-in-out" : "none",
          }}
        ></div>
      </div>
      <div className={styles.clockDigital}>
        {`${time.hours > 9 ? time.hours : "0" + time.hours}:${
          time.minutes > 9 ? time.minutes : "0" + time.minutes
        }:${time.seconds > 9 ? time.seconds : "0" + time.seconds}`}
      </div>
      {countClock > 1 && (
        <button
          className={styles.deleteBtn}
          type="button"
          onClick={onClickDeleteClock}
        />
      )}
    </div>
  );
};
