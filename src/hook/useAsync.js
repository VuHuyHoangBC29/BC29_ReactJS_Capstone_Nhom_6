import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../context/loading.context";

export const useAsync = ({ dependecies = [], service, condition = true }) => {
  const [_, setLoadingState] = useContext(LoadingContext);

  const [state, setState] = useState();

  useEffect(() => {
    if (condition) {
      fetchData();
    }
  }, dependecies);

  const fetchData = async () => {
    setLoadingState({ isLoading: true });

    const result = await service();

    console.log(result);

    setLoadingState({ isLoading: false });

    setState(result.data.content);
  };

  return { state };
};
