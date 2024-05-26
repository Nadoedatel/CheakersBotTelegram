import axios from "axios";
import { config } from "./config.js";

export const getCat = async () => {
    const response = await axios.get(config.catUrl, {
        headers: {
            'x-api-key': config.catApiKey
        }
    });

    const file = response.data[0];
    const url = file.url;
    const mimeType = url.endsWith('.gif') ? 'image/gif' : 'image/jpeg'; // Простая проверка по расширению
    console.log(response);
    return { url, mimeType };
};
