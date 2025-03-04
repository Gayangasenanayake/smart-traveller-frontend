"use client"
import ReactDOM from "react-dom";
import {useEffect, useState} from "react";
import axios from "axios";

interface LocationViewProps {
    onClose: () => void;
    travelLocationId:string;
}

interface Hotel {
    name: string;
    // Other properties...
}

const LocationView: React.FC<LocationViewProps> = ({ onClose,travelLocationId }) => {

    const [travelLocation, setTravelLocation] = useState<any>([])

    const fetchHotel = async () => {
        try {
            const response = await axios(`http://localhost:8000/api/hotel/${travelLocationId}`);
            if (!response) {
                throw new Error('Network response was not ok');
            } else {
                console.log("hotel",response.data.data);
                setTravelLocation(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchHotel();
    }, []);

    const modalContent = (
        <div className="absolute top-28 left-96 w-9/12 h-full flex">
            <div className="bg-white p-4  w-full">
                <button onClick={onClose} className="bg-blue-300 max-w-8 text-white py-[-0.1] px-1 rounded-md flex items-center justify-center ml-auto mt-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="blue" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-6">
                        <line x1="20" y1="8" x2="8" y2="20"></line>
                        <line x1="8" y1="8" x2="20" y2="20"></line>
                    </svg>
                </button>
                <div className="grid grid-cols-2 gap-4 justify-center items-center bg-white p-8">


                    <div className="col-span-1 ml-20">
                        <h1 className="text-5xl font-bold text-black mb-4 max-w-lg mx-auto">{travelLocation.name}</h1>
                        <img
                            src={travelLocation.img}
                            className="h-auto max-w-l shadow-none transition-shadow duration-300 w-full mx-auto mb-4"
                            alt=""
                        />



                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mt-8">{travelLocation.name}</h2>
                                <p className="text-gray-600">Location ID : {travelLocation.id}</p>
                                <p className="text-gray-600">Location type : {travelLocation.type ? travelLocation.type.name:''}</p>
                                <p className="text-gray-600">{travelLocation.district ? travelLocation.district.name : ''}{travelLocation.district ? ',':''} {travelLocation.province ? travelLocation.province.name:''}</p>
                            </div>
                            <div>
                                <p className="text-green-600 text-lg mt-24">
                                    <span className="text-xs text-black">starting from </span>
                                    <span className="text-xl text-black font-bold">{travelLocation.price_per_person?'LKR':''} {travelLocation.price_per_person}</span>
                                </p>
                            </div>
                        </div>
                    </div>




                    <div className="col-span-1 max-w-xl px-12">

                        <p className="text-l mb-4 text-black">{travelLocation.description}</p>
                        {/*<p className="text-l mb-4 text-black">Aparthotel Stare Miasto is situated in the very centre of Kraków’s Old Town, just 120 metres from the Main Market Square. It features spacious modern apartments with free WiFi.</p>*/}
                        {/*<p className="text-l mb-4 text-black">Located in a historic building, Aparthotel Stare Miasto features a unique interior design in the warm color of bricks with wooden elements.</p>*/}
                        {/*<p className="text-l mb-4 text-black">All apartments at Aparthotel Stare Miasto are air-conditioned, fitted with an LCD TV and a fully-equipped kitchenette, including a refrigerator and an electric kettle. The 24-hour front desk offers ticket and tour services.</p>*/}

                        <div className="flex justify-between items-center">
                            <button
                                type="submit"
                                className="flex justify-center rounded-l bg-blue-500 px-8 py-1 font-semibold leading-6 text-white text-m shadow-sm hover:bg-blue-400"
                                onClick={() => window.open(`${travelLocation.location_links?travelLocation.location_links.name:''}`, '_blank')}
                            >
                                View Location
                            </button>

                            <div className="ml-4 flex flex-col mr-20">
                                <p className="text-l text-green-600 ">Open : {travelLocation.open_time ? travelLocation.open_time:''}</p>
                                <p className="text-l text-green-600 my-0">Close :{travelLocation.close_time ? travelLocation.close_time:''}</p>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>

    );
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root')!);
};
export default LocationView;
