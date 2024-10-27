import { useState, useEffect } from 'react';
import { UPDATE_MESSAGES } from '../constants/messages';


export const useAddressUpdate = () => {
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [isAddressSearched, setIsAddressSearched] = useState(false);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        script.onload = () => setIsScriptLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const openAddressSearch = () => {
        if (!isScriptLoaded) {
            alert(UPDATE_MESSAGES.INFO.ADDRESS_LOADING);
            return;
        }

        new window.daum.Postcode({
            oncomplete: (data: any) => {
                setAddress(data.roadAddress);
                setAddressDetail('');
                setIsAddressSearched(true);
            }
        }).open();
    };

    const handleAddressDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressDetail(e.target.value);
    };

    return {
        address,
        addressDetail,
        isAddressSearched,
        isScriptLoaded,
        openAddressSearch,
        handleAddressDetailChange
    };
};