import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Grouplist = () => {
    const navigate = useNavigate();
    const [selectedGroup, setSelectedGroup] = useState(null); 
    const arr = [];
    const p_pic = "https://th.bing.com/th/id/OIP.y8tWWY6Vh7BX50XtbsIcnwHaFe?rs=1&pid=ImgDetMain";
    
   
    for (let i = 1; i <= 50; i++) {
        const randomId = i;
        const randomName = "Group " + i;
        
        arr.push({
            p_pic: p_pic,
            _id: randomId,
            name: randomName
        });
    }

    const handleClick = (id) => {
        setSelectedGroup(id); // Set the selected group ID
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
