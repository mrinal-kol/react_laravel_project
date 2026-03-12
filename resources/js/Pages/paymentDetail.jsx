import React, { useEffect } from "react";



export default function Details({payment})
{
    useEffect(()=>{
        //console.log(payment);
    },[]);

    return (
        <div>
            <table border="1" style={{ width: "auto" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
            {payment.map(item => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.amount}</td>
                    <td>{item.status}</td>
                    <td>{item.created_at}</td>
                </tr>
            ))}
             </tbody>

            </table>
        </div>
    );
}