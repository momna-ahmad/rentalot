'use client'

import { useState } from 'react' ;
export default function DisplayImg({imgs} : {imgs:string[]}){
    const [displayAll , setDisplayAll] = useState(false) ;
    const [close , setClose] = useState(false) ;
    const [activeIndex, setActiveIndex] = useState<number>(0) ;

    return (
    <>
    {
        displayAll? (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center flex-col">

                <button onClick={()=>{
                    if(activeIndex+1 === imgs.length)
                        setActiveIndex(0) ;
                    else
                        setActiveIndex(activeIndex+1) ;
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </button>
                

            {

            <img
              key={activeIndex}
              src={imgs[activeIndex]}
              alt={`Listing Image ${activeIndex + 1}`}
              className="w-32 h-32 object-cover rounded-md border"
            />

            }
            <button onClick={()=>{
                    if(activeIndex-1 < 0)
                        setActiveIndex(imgs.length-1) ;
                    else
                        setActiveIndex(activeIndex-1) ;
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </button>
            

        </div>
        )
         :
        
        (
            
                <div>
            <button onClick={()=>{
                setDisplayAll(true) ;
            }}>
                <img
              key={0}
              src={imgs[0]}
              alt={`Listing Image 1`}
              className="w-32 h-32 object-cover rounded-md border"
            />
            </button>
            
        </div>
            
        )
    }
    </>
    );

}