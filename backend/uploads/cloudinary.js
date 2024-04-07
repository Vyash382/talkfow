import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
cloudinary.config({ 
  cloud_name: "dkyfwmy2w", 
  api_key: 887828846911144, 
  api_secret: "GbGwO1bjOzopu9IXHb2rvpBd62Y"
});
const uploadOnCloudinary = async (localpath)=>{
    // console.log(localpath+"gvbhj");
    try {
        if(!localpath){
            // console.log("here22");
            return null;
        } 
        else{
            const response = await cloudinary.uploader.upload(localpath,{resource_type: 'auto'});
            console.log('file uploaded successfully',response.url);
            // fs.unlinkSync(localpath);
            return response;
        }
    } catch (error) {
        console.log(error);
        fs.unlinkSync(localpath);
    }
   
}

export {uploadOnCloudinary};