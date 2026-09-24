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

    const response = await axios.post(
        "http://127.0.0.1:8000/predict",
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