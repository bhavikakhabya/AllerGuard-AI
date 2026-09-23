const allergenKeywords = {
    peanut: [
        "peanut",
        "peanuts",
        "groundnut",
        "groundnuts"
    ],

    milk: [
        "milk",
        "whey",
        "casein",
        "butter",
        "cheese",
        "dairy"
    ],

    wheat: [
        "wheat",
        "wheat flour",
        "gluten"
    ],

    soy: [
        "soy",
        "soya",
        "soybean",
        "soybeans",
        "soy lecithin"
    ],

    tree_nut: [
        "tree nut",
        "tree nuts",
        "almond",
        "almonds",
        "cashew",
        "cashews",
        "walnut",
        "walnuts",
        "pistachio",
        "pistachios",
        "hazelnut",
        "hazelnuts"
    ],

    egg: [
        "egg",
        "eggs"
    ],

    fish: [
        "fish"
    ],

    shellfish: [
        "shellfish",
        "shrimp",
        "prawn",
        "prawns",
        "crab",
        "lobster"
    ]
};


// ============================================
// NORMALIZE ALLERGEN NAME
// ============================================

const normalizeAllergen = (name) => {

    if (!name) {
        return "";
    }

    const value = name
        .toLowerCase()
        .trim()
        .replace(/[_-]/g, " ")
        .replace(/\s+/g, " ");

    const aliases = {
        peanut: "peanut",
        peanuts: "peanut",
        groundnut: "peanut",
        groundnuts: "peanut",

        milk: "milk",
        dairy: "milk",
        whey: "milk",
        casein: "milk",
        butter: "milk",
        cheese: "milk",

        wheat: "wheat",
        "wheat flour": "wheat",
        gluten: "wheat",

        soy: "soy",
        soya: "soy",
        soybean: "soy",
        soybeans: "soy",
        "soy lecithin": "soy",

        "tree nut": "tree_nut",
        "tree nuts": "tree_nut",
        almond: "tree_nut",
        almonds: "tree_nut",
        cashew: "tree_nut",
        cashews: "tree_nut",
        walnut: "tree_nut",
        walnuts: "tree_nut",
        pistachio: "tree_nut",
        pistachios: "tree_nut",
        hazelnut: "tree_nut",
        hazelnuts: "tree_nut",

        egg: "egg",
        eggs: "egg",

        fish: "fish",

        shellfish: "shellfish",
        shrimp: "shellfish",
        prawn: "shellfish",
        prawns: "shellfish",
        crab: "shellfish",
        lobster: "shellfish"
    };

    return aliases[value] || value;
};


// ============================================
// DETECT ALLERGENS FROM OCR TEXT
// ============================================

const detectAllergens = (text) => {

    const lowerText =
        (text || "").toLowerCase();

    const detected = [];

    Object.entries(allergenKeywords).forEach(
        ([allergen, keywords]) => {

            const found = keywords.some(
                (keyword) =>
                    lowerText.includes(
                        keyword.toLowerCase()
                    )
            );

            if (!found) {
                return;
            }

            let certainty = "possible";

            const mayContain =
                lowerText.includes("may contain") ||
                lowerText.includes("traces of") ||
                lowerText.includes("trace of");

            if (!mayContain) {

                const ingredientSection =
                    lowerText.includes("ingredients:");

                if (ingredientSection) {
                    certainty = "likely";
                }
            }

            detected.push({
                allergen,
                certainty
            });
        }
    );

    return detected;
};


// ============================================
// CALCULATE PERSONALIZED OCR RISK
// ============================================

const calculateOCRRisk = (
    detectedAllergens,
    allergies
) => {

    const matches = [];

    let highestRisk =
        "NO_KNOWN_MATCH";

    const severityScore = {
        mild: 1,
        moderate: 2,
        severe: 3
    };


    detectedAllergens.forEach(
        (detected) => {

            const detectedAllergen =
                normalizeAllergen(
                    detected.allergen
                );


            const userAllergy =
                allergies.find(
                    (allergy) => {

                        const userAllergen =
                            normalizeAllergen(
                                allergy.name
                            );

                        return (
                            userAllergen ===
                            detectedAllergen
                        );
                    }
                );


            // No personal allergy match
            if (!userAllergy) {
                return;
            }


            const severity =
                severityScore[
                    userAllergy.severity
                ] || 1;


            let score = severity;


            if (
                detected.certainty ===
                "likely"
            ) {
                score += 1;
            }


            if (
                detected.certainty ===
                "confirmed"
            ) {
                score += 2;
            }


            // Possible does not add extra score
            if (
                detected.certainty ===
                "possible"
            ) {
                score += 0;
            }


            // Determine highest risk
            if (score >= 4) {

                highestRisk =
                    "HIGH_RISK";

            } else if (
                highestRisk !==
                    "HIGH_RISK" &&
                score >= 2
            ) {

                highestRisk =
                    "POSSIBLE_RISK";

            } else if (
                highestRisk ===
                "NO_KNOWN_MATCH"
            ) {

                highestRisk =
                    "VERIFY";
            }


            matches.push({

                allergen:
                    detectedAllergen,

                certainty:
                    detected.certainty,

                severity:
                    userAllergy.severity,

                score

            });
        }
    );


    return {
        riskLevel: highestRisk,
        matches
    };
};


module.exports = {
    detectAllergens,
    calculateOCRRisk
};