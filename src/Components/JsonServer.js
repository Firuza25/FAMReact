import React, { useEffect, useState } from "react";
import axios from "axios";

function JsonServer() {
    const [data, setData] = useState([])
    useEffect(()=> {
        
        axios.get('http://localhost:3031/users')
        .then( res => setData(res.data))
        .catch(err => console.log(err))
        
    }, [])

    return (
        <div className="container mt-5" >
            <table className="table" >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => {
                        return (
                            <tr key={i}>
                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>{d.email}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}
export default JsonServer
