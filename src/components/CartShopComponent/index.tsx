import React, { useState } from "react";
import { CardProductInterface } from "../../constants/Interfaces";

import {AiOutlineShoppingCart} from 'react-icons/ai'

import './index.css'

export function CartShopComponent(){

    //const [open, setOpen] = useState(false)

    // if(!open){
    //     return (<>
    //         <div className="cartshop-div">
    //             <div className="content-div">
    //                 <div className="cart-div" onClick={() => setOpen(!open)}>
                        
    //                     <AiOutlineShoppingCart size={48}/>
    //                 </div>
    //             </div>
                
    //         </div>
    //     </>)
    // }



    return (<>
    <div className="drawner">
        <div className="drawner__overlay">
            <div className="drawer__content">
                
            </div>
        </div>
    </div>
    </>)

}
