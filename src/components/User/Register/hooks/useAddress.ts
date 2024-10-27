import { useState, useEffect } from 'react';

declare global {
  interface Window {
    daum: {
      Postcode: new (config: {
        oncomplete: (data: {
          roadAddress: string;
          jibunAddress: string;
          zonecode: string;
          // 필요한 다른 속성들도 추가할 수 있습니다
        }) => void;
      }) => {
        open: () => void;
      };
    };
  }
}

export const useAddress = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [addressDetail, setAddressDetail] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`;
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openAddressSearch = (setFormData: Function) => {
    if (!isScriptLoaded) {
      alert("주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.");
      return;
    }
    
    new window.daum.Postcode({
      oncomplete: function(data) {
        setFormData(prev => ({
          ...prev,
          userAddress: data.roadAddress
        }));
        setAddressDetail("");
      }
    }).open();
  };

  return {
    isScriptLoaded,
    addressDetail,
    setAddressDetail,
    openAddressSearch
  };
};
