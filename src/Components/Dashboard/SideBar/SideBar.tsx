import * as React from "react";

const SideBar:React.FC = () => {

    return (
       <>
           <div className={" h-full flex flex-col items-center" }>
               <div className={"flex flex-col items-center justify-center h-full border bg-yimin-blue p-3 text-antiflash-white gap-6 rounded-2xl border-cyan-950"}>
                   <button>
                       Button 1
                   </button>

                   <button>
                       Button 2
                   </button>

                   <button>
                       Button 3
                   </button>
               </div>
           </div>

       </>
)
}

export default SideBar