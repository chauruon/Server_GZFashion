import moment from "moment";


export const UploadBannerNotify = async (req,res) => {
    const image = req.file;
    const CurrentDate = moment().unix();
    
    console.log('image: ', image);
    try {
        const objImage = {
            image : "",
            createAt: CurrentDate,

        }
        // const uploadBanner = 
    } catch (e) {
        console.log('e: ', e);
        res.status(409).json({message: e.message})
        res.status(400).json({
            status: false,
            message:"Vui lòng liêm hệ admin",
        });
    }
}