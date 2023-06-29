import { useState } from 'react';

  const initialRequestInfo = {
    error: null,
    data: null,
    loading: false,
  };

  export default function useApiListas(config) {
    const [requestInfo, setRequestInfo] = useState(initialRequestInfo)
  
    async function call(localConfig) {
      setRequestInfo({
        ...initialRequestInfo,
        loading: true,
      });
      let json = null;
      try {
        const response = await fetch(config.url)
        json = await response.json()
        setRequestInfo({
          ...initialRequestInfo,
          data: json,
        });
        
      } catch (error) {
        setRequestInfo({
          ...initialRequestInfo,
          error,
        });
      }
      if (config.onCompleted) {
        config.onCompleted(json);
      }
    }
    return [
      call,
      requestInfo
    ]
  }