import { Spin } from "antd";
import { createContext, useEffect, useState } from "react";
import "./spinner.scss";
import { WrapperSpin } from "./style";

const DEFAULT_VALUES = {
  isLoading: false,
};

const LoadingContext = createContext(DEFAULT_VALUES);

const LoadingProvider = (props) => {
  const [state, setState] = useState(DEFAULT_VALUES);

  // const style = {
  //   width: "100%",
  //   height: "100vh",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   position: "absolute",
  //   zIndex: "1",
  //   backgroundColor: "#ffffffcc",
  // };

  useEffect(() => {
    if (state.isLoading) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  }, [state.isLoading]);

  return (
    <LoadingContext.Provider value={[state, setState]}>
      {state.isLoading && (
        <WrapperSpin viewHeight="100vh">
          <div className="loader loader-2">
            <svg
              className="loader-star"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
            >
              <polygon
                points="29.8 0.3 22.8 21.8 0 21.8 18.5 35.2 11.5 56.7 29.8 43.4 48.2 56.7 41.2 35.1 59.6 21.8 36.8 21.8 "
                fill="#b61883"
              />
            </svg>
            <div className="loader-circles" />
          </div>
        </WrapperSpin>
      )}
      {props.children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
