import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { END_POINT } from "../../utils/constant";

export default function HangCamGui() {
    const [data,setData] = useState([]);

    const getDataFromApi = async () => {
        try {
          const res = await axios.get(`${END_POINT}/prohibited-product`)
          setData(res.data.data.listCar);
        }
        catch (e) {
          console.log(e);
        }
      }

      useEffect(()=>{
        getDataFromApi()
      },[])
    const Line = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: "1px",
                width: "100%"
            }}
        />
    );

    
    return (
        <>
       {data&&(
        <>
        {data.map((e,index)=>(
            <div className='p-7' style={{ 
                maxWidth: "1200px",
                margin:"auto"
             }} >
                <div className='flex flex-row justify-center mb-10 mt-5' key={e.id}>
                    <img style={{height:"94px"}} className='mr-6' src={`http://localhost:8000/api/public/${e.images}`} alt="hinh chat cam" />
                    <div >
                        <h1 className='text-[#ffbb0f] text-2xl font-bold'>{index+1}. {e.name}</h1>
                        <span>{e.detail}</span>
                    </div>
                </div>
                <Line color="#f4f4f4" />
            </div>
        ))}
        </>
       )}
       </>
    )
}
