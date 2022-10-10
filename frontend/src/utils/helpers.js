import axios from 'axios'

export async function sendAPIRequest(url, method = 'GET', data = {}, headers = {}) {
    try {
        const res = await axios.request({
            url: encodeURI(url),
            headers,
            method: method,
            data
        })
        console.log(res.data)
        return res.data
    } catch (error) {
        const err = {
            success: error.response.data.success,
            status: error.response.status,
            message: error.response.data.message
        }
        console.log(err)
        return err
    }
}