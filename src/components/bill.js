import React from "react";
import { useContext } from "react";
import CartContext from "../context/context"

export default function Bill(){
    const CartState = useContext(CartContext);
    return(
        <React.Fragment>
            <table  className="table">
                <thead>
                    <tr>
                        <th scope="col" onClick={()=>{CartState.setBillOption("tatca")}} 
                                    className={CartState.billOption ==="tatca"?"bg-secondary text-white text-center":"text-center"}>
                                        Tất cả</th>
                        <th scope="col" onClick={()=>{CartState.setBillOption("choxacnhan")}}
                                    className={CartState.billOption ==="choxacnhan"?"bg-secondary text-white text-center":"text-center"}>
                                        Chờ xác nhận</th>
                        <th scope="col" onClick={()=>{CartState.setBillOption("cholayhang")}}  
                                    className={CartState.billOption ==="cholayhang"?"bg-secondary text-white text-center":"text-center"}>
                                        Chờ lấy hàng</th>
                        <th scope="col" onClick={()=>{CartState.setBillOption("danggiao")}}  
                                    className={CartState.billOption ==="danggiao"?"bg-secondary text-white text-center":"text-center"}>
                                        Đang giao</th>
                        <th scope="col" onClick={()=>{CartState.setBillOption("dagiao")}}  
                                    className={CartState.billOption ==="dagiao"?"bg-secondary text-white text-center":"text-center"}>
                                        Đã giao</th>
                        <th scope="col" onClick={()=>{CartState.setBillOption("dahuy")}}  
                                    className={CartState.billOption ==="dahuy"?"bg-secondary text-white text-center":"text-center"}>
                                        Đã hủy</th>
                    </tr>
                </thead>
            </table>
        </React.Fragment>
    )
}