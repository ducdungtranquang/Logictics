import opencage from "opencage-api-client"
const OPENCAGE_API_KEY='7f8d6f65dfd846748331d3c5e0a52070'

export const locateAddress = async (address) => {
    try {
        const data = await opencage.geocode({q: `${address}`, key: OPENCAGE_API_KEY})            
        if (data.status.code == 200 && data.results.length > 0) {
            if (! data.results[0].geometry) {
                return null
            }    
            else {
                return data.results[0].geometry // { lat: "value", lng: "value"}                
            }                   
        }
    } catch (error) {
        console.log(error)
        return null
    }   
}