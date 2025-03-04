import React from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../redux/store";
import styles from "./CityList.module.scss";
import { City } from "../../types";
import { getAvailableCities } from "../../redux/time/selectors";
import { setCity } from "../../redux/time/slice";
import { truncateString } from "../../utils/truncateString";

interface CityListProps {
  activeCity: City;
  clockId: number
}
export const CityList: React.FC<CityListProps> = React.memo(
  ({ activeCity,clockId }) => {
    const dispatch = useAppDispatch();
    const availableCity = useSelector(getAvailableCities(activeCity.id));
    const [visibleList, setVisibleList] = React.useState(false);
    const listRef = React.useRef<HTMLDivElement>(null);

    const toggleVisible = () => {
      setVisibleList((prev) => !prev);
    };

    React.useEffect(() => {
      const handleOutsideClick = (event: any) => {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(listRef.current)) {
          setVisibleList(false);
        }
      };
      document.body.addEventListener("click", handleOutsideClick);
      return () => {
        document.body.addEventListener("click", handleOutsideClick);
      };
    }, []);

    const onClickCity = (city: City) => {
      dispatch(setCity({ city, clockId: clockId }));
    };
    return (
      <div ref={listRef} onClick={toggleVisible} className={`${styles.root} ${visibleList?styles.active:""}`}>
        {truncateString(activeCity.city)}
        {visibleList && (
          <div className={styles.list}>
            <ul>
              {availableCity.map((city) => (
                <li
                  key={city.id}
                  onClick={() => onClickCity(city)}
                  className={city.id === activeCity.id ? styles.active : ""}
                >
                  {city.city}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);
