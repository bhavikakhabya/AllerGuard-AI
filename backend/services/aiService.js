const axios = require("axios");
const FormData = require("form-data");

const predictFood = async (imageBuffer, filename) => {

    const form = new FormData();

    form.append(
        "file",
        imageBuffer,
        {
            filename: filename,
            contentType: "image/jpeg"
        }
    );

    const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://127.0.0.1:8000";

    const response = await axios.post(
        `${ML_SERVICE_URL}/predict`,
        form,
        {
            headers: {
                ...form.getHeaders()
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        }
    );

    return response.data;
};

module.exports = {
    predictFood
};