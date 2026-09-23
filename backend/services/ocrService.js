const Tesseract = require("tesseract.js");

const extractTextFromImage = async (imageBuffer) => {

    try {

        const result = await Tesseract.recognize(
            imageBuffer,
            "eng",
            {
                logger: (info) => {
                    if (info.status === "recognizing text") {
                        console.log(
                            `OCR Progress: ${Math.round(
                                info.progress * 100
                            )}%`
                        );
                    }
                }
            }
        );

        return result.data.text.trim();

    } catch (error) {

        console.error(
            "OCR Error:",
            error
        );

        throw new Error(
            "Unable to extract text from image"
        );
    }
};

module.exports = {
    extractTextFromImage
};