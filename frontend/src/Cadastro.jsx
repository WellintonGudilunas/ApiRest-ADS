import axios from "axios";
import { useEffect, useState } from "react";

function Cadastros(){
    const [data, setData] = useState([]);

    useEffect(()=>{
        pegarDados();
    }, [])
    async function pegarDados(){
        const res = await axios.get("http://localhost:3005/clientes")
        setData(res.data.msg)
    }


    
    return (
        <div>
            { data ? ( 
                <div>{data}</div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Cadastros;