import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Grouplist = () => {
    const navigate = useNavigate();
    const [selectedGroup, setSelectedGroup] = useState(null); 
    const [arr,setArr] = useState([]);
    const p_pic = "https://th.bing.com/th/id/OIP.y8tWWY6Vh7BX50XtbsIcnwHaFe?rs=1&pid=ImgDetMain";
    
   
    useEffect(()=>{
       const funcc = async()=>{
        const response = await fetch('https://talkfow-backend-3.onrender.com/chat/myGroupChats', {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include'
          });
          const json = await response.json();
          setArr(json);
        };
        funcc();
    })

    const handleClick = (id) => {
        setSelectedGroup(id); 
        navigate(`/group/${id}`)
    };

    return (
        <>
            {
                arr.map((e) => (
                    <div 
                        key={e._id}
                        style={{
                            height: "15%",
                            width: "100%",
                            backgroundColor: selectedGroup === e._id ? "#1976d2" : "#00ccff",
                            display: "flex",
                            alignItems: 'center',
                            gap: '11px'
                        }}
                        onClick={() => handleClick(e._id)} // Call handleClick function when clicked
                    >
                        <img src={e.p_pic} alt="Group Profile" style={{ width: '75px', height: '75px', borderRadius:'40px' }} />
                        <span style={{ color: 'white' }}>{e.name}</span>
                    </div>
                ))
            }
        </>
    );
}

export default Grouplist;
