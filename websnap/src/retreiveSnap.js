import axios from "axios";

export const retreiveSnap = async (url) => {
    const response = await axios.get(url)
    console.log(response.data)
}
