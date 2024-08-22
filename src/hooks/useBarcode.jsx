import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/Axios";

export const sendBarcode = async (barcode) => {
    try {
      console.log(barcode);
      const response = await axiosInstance.post("v2/admin/barcode", {
        code_number: barcode,
      });
      return {
        stName: response.data.studentname,
        nowPoint: response.data.point,
        message: response.data.message,
      };
    } catch (error) {
      throw error;
    }
  };
  
  


export const useBarcode = () => {
    // console.log("BArcord~")
    const [barcode,setBarcode] = useState("");

    const handleChange = (e)=> {
        // console.log(e.target.value);
        setBarcode(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Hello")
        try{
            const { message, point, student_number } = await sendBarcode(
                barcode
            )
            console.log(message, point, student_number)
            //window.location.replace("/payments")
        } catch (error) {
            console.log("바코드 인식에 실패했습니다.", error);
        }
    };

    return (
        barcode,
        handleChange,
        handleSubmit
    )
}