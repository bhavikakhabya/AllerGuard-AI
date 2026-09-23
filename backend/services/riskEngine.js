const calculateFoodRisk = (food, allergies) => {

    const matches = [];

    let highestRisk = "NO_KNOWN_MATCH";

    const severityScore = {
        mild: 1,
        moderate: 2,
        severe: 3
    };

    const riskLevel = {
        1: "VERIFY",
        2: "POSSIBLE_RISK",
        3: "HIGH_RISK"
    };

    food.ingredients.forEach((ingredient) => {

        if (!ingredient.allergen) {
            return;
        }

        const userAllergy = allergies.find(
            (allergy) =>
                allergy.name.toLowerCase() ===
                ingredient.allergen.toLowerCase()
        );

        if (!userAllergy) {
            return;
        }

        const severity = severityScore[userAllergy.severity] || 1;

        let score = severity;

        // Increase risk when ingredient is more certain
        if (ingredient.certainty === "confirmed") {
            score += 2;
        } else if (ingredient.certainty === "likely") {
            score += 1;
        }

        if (score >= 4) {
            highestRisk = "HIGH_RISK";
        } else if (
            highestRisk !== "HIGH_RISK" &&
            score >= 2
        ) {
            highestRisk = "POSSIBLE_RISK";
        } else if (
            highestRisk === "NO_KNOWN_MATCH"
        ) {
            highestRisk = "VERIFY";
        }

        matches.push({
            ingredient: ingredient.name,
            allergen: ingredient.allergen,
            certainty: ingredient.certainty,
            severity: userAllergy.severity,
            score
        });
    });

    return {
        riskLevel: highestRisk,
        matches
    };
};

module.exports = calculateFoodRisk;