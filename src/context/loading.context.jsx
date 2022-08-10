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
          <Spin />
        </WrapperSpin>
      )}
      {props.children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
