/* eslint-disable consistent-return */
import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
    try {
        const { data : { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat ,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng ,
                tr_longitude: ne.lng,
            },
            headers: {
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': '71925154c6msh7d2c13ba5a6c63ap131a47jsn1d4d258f672c'
            }
        });
        return data;
    } catch (error) {
        console.log(error)
    }
}






