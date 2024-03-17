const login = (req,res)=>{
    res.status(200).send("login api working");  
};
const signup = (req,res)=>{
    res.status(200).send("Signup api working");
};
export {login,signup};