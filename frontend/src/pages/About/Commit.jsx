import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { END_POINT } from "../../utils/constant"
import { MainContext } from "../../context/MainContext";

function Commit() {
    const {setMetadata} = useContext(MainContext)
    const [data, setData] = useState([])
    useEffect(() => {
        setMetadata((prev) => {
            return {
              ...prev,
              title: "Cam kết | TKTL",
            };
          });
        const fetchApi = async () => {
            try {
                const res = await axios.get(`${END_POINT}/commitment?limit=6`)
                res.status===200 && setData(res.data.data.commits)
                console.log(res)
            }
            catch (error) {
                console.log(error.message)
            }
        }
        fetchApi()
    }, [])

    return (
        <div className="pt-[80px] mb-10 container mx-auto">
            <a href="">
                <img src="https://tomochain.com/wp-content/uploads/2020/02/Consensus-1200x628-1.png" alt="banner" className='w-full h-auto object-cover' />
            </a>
            <div className="flex flex-col lg:flex-row mx-4 lg:mx-0 gap-x-4 my-10">
                <div className='flex-1'>
                    <img src="https://jtexpress.vn/themes/jtexpress/assets/images/dd-about-us.png" className='w-[76px] h-[63px] hidden lg:block' />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 gap-x-4 mt-8 mb-4 rounded-2xl">
                        {data.map((commit) => (
                            <div key={commit._id} className="p-3 bg-[#F0B90B] even:bg-opacity-40 lg:min-h-[350px] rounded-xl">
                                <img src={commit.logo} className="mb-7" />
                                <div className="uppercase text-lg font-black my-3 text-teal-600 ">{commit.heading}</div>
                                <div className="whitespace-pre-line">{commit.detail}</div>
                            </div>)
                        )}

                    </div>
                    <div className='flex justify-end'>

                        <img src="https://jtexpress.vn/themes/jtexpress/assets/images/dd-about-us.png" className='w-[76px] h-[63px] hidden lg:block rotate-180' />
                    </div>
                </div>
                <a href="#" className=" flex  items-center lg:w-[240px]">
                    <img src="https://jtexpress.vn/storage/app/uploads/public/626/a18/377/626a183772daf645215340.png" className='w-full h-auto object-cover ' />
                </a>
            </div>
        </div>

    );
}

export default Commit;