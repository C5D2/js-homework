import { useEffect, useState } from "react";

const API_SERVER = "https://todo-api.frontendschool.shop/api";

function useFetch(fetchParams) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("api 서버 호출", fetchParams);
    request(fetchParams);
  }, []); // 마운트 때 한번만 호출됨

  // 무한 루프로 setData가 돌아감 useEffect를 꼭!! 사용해주기
  const request = async (params) => {
    try {
      setIsLoading(true);
      const res = await fetch(API_SERVER + params.url);
      console.log(res);
      const jsonData = await res.json();
      console.log("jsonData", jsonData);
      if (jsonData.ok) {
        setError(null);
        setIsLoading(false);
        setData(jsonData);
      } else {
        throw new Error(jsonData.error.message);
      }
    } catch (err) {
      // 에러 처리
      console.error(err.message);
      setData(null);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, error };
}

export default useFetch;
