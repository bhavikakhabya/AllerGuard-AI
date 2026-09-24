import React, { useState } from "react";
import {
    Camera,
    Upload,
    ArrowLeft,
    Loader2,
    ShieldAlert,
    ShieldCheck,
    AlertTriangle,
    Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function ScanFood() {

    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");


    // =========================
    // IMAGE SELECT
    // =========================

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImage(file);

        setPreview(
            URL.createObjectURL(file)
        );

        setResult(null);
        setError("");
    };


    // =========================
    // ANALYZE FOOD
    // =========================

    const analyzeFood = async () => {

        if (!image) {

            setError(
                "Please select a food image first."
            );

            return;
        }

        setLoading(true);
        setError("");
        setResult(null);


        try {

            const token =
                localStorage.getItem("token");


            if (!token) {

                setError(
                    "Please login first."
                );

                navigate("/login");

                return;
            }


            const formData =
                new FormData();

            formData.append(
                "file",
                image
            );


            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/scan`,
                {
                    method: "POST",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    },

                    body: formData
                }
            );


            const data =
                await response.json();


            console.log(
                "Scan result:",
                data
            );


            if (response.status === 401) {

                localStorage.removeItem(
                    "token"
                );

                navigate("/login");

                return;
            }


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Food analysis failed"
                );

            }


            setResult(data);


        } catch (error) {

            console.error(
                "Scan error:",
                error
            );

            setError(
                error.message ||
                "Unable to analyze food."
            );


        } finally {

            setLoading(false);

        }

    };


    // =========================
    // RISK INFORMATION
    // =========================

    const getRiskInfo = (riskLevel) => {

        switch (riskLevel) {

            case "HIGH_RISK":

                return {
                    title: "High risk",
                    description:
                        "A known allergen match was identified with a high-risk profile.",
                    icon: ShieldAlert,
                    className: "risk-high",
                    action:
                        "Avoid relying on this result alone. Verify the ingredients and preparation details."
                };


            case "POSSIBLE_RISK":

                return {
                    title: "Possible risk",
                    description:
                        "One or more ingredients may match an allergen in your personal profile.",
                    icon: AlertTriangle,
                    className: "risk-possible",
                    action:
                        "Verify the ingredients and preparation details before consuming."
                };


            case "VERIFY":

                return {
                    title: "Verify ingredients",
                    description:
                        "There is some uncertainty around a potential allergen match.",
                    icon: Info,
                    className: "risk-verify",
                    action:
                        "Ask for the exact ingredients and check for possible cross-contact."
                };


            case "NO_KNOWN_MATCH":

                return {
                    title: "No known allergen match",
                    description:
                        "No stored ingredient in this analysis matched an allergen in your current profile.",
                    icon: ShieldCheck,
                    className: "risk-none",
                    action:
                        "This does not guarantee that the food is allergen-free. Verify ingredients when necessary."
                };


            default:

                return {
                    title: "Unable to determine risk",
                    description:
                        "The system could not determine a clear risk status.",
                    icon: Info,
                    className: "risk-verify",
                    action:
                        "Verify the food ingredients before making a decision."
                };

        }

    };


    // =========================
    // CERTAINTY TEXT
    // =========================

    const getCertaintyText = (certainty) => {

        switch (certainty) {

            case "confirmed":
                return "Confirmed";

            case "likely":
                return "Likely";

            case "possible":
                return "Possible";

            default:
                return certainty;

        }

    };


    return (

        <div className="scan-page">


            {/* =========================
                HEADER
            ========================= */}

            <div className="scan-header">


                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >

                    <ArrowLeft size={18} />

                    Dashboard

                </button>


                <div className="scan-title">

                    <Camera size={25} />

                    <h1>
                        Scan Your Food
                    </h1>

                </div>


                <p>

                    Upload a clear photo of your food
                    to analyze potential allergen risks.

                </p>

            </div>


            {/* =========================
                UPLOAD CARD
            ========================= */}

            <div className="upload-card">


                {!preview ? (

                    <label className="upload-area">


                        <div className="upload-icon">

                            <Upload size={32} />

                        </div>


                        <h2>

                            Upload food image

                        </h2>


                        <p>

                            Click here to choose an image

                        </p>


                        <span>

                            JPG, JPEG or PNG

                        </span>


                        <input
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={handleImageChange}
                            hidden
                        />

                    </label>


                ) : (

                    <div className="preview-area">


                        <img
                            src={preview}
                            alt="Selected food"
                        />


                        <div className="preview-actions">


                            <button
                                onClick={() => {

                                    setImage(null);
                                    setPreview(null);
                                    setResult(null);
                                    setError("");

                                }}
                            >

                                Choose another

                            </button>


                            <button
                                className="analyze-button"
                                onClick={analyzeFood}
                                disabled={loading}
                            >


                                {loading ? (

                                    <>

                                        <Loader2
                                            size={18}
                                            className="spin"
                                        />

                                        Analyzing...

                                    </>

                                ) : (

                                    "Analyze Food"

                                )}

                            </button>


                        </div>

                    </div>

                )}

            </div>


            {/* =========================
                ERROR
            ========================= */}

            {error && (

                <div className="scan-error">

                    ❌ {error}

                </div>

            )}


            {/* =========================
                RESULT
            ========================= */}

            {result && (

                <div className="result-card">


                    {/* =========================
                        AI DETECTION
                    ========================= */}

                    <div className="result-header">


                        <div>

                            <span className="small-label">

                                AI DETECTION

                            </span>


                            <h2>

                                {result.food?.name ||
                                    result.prediction?.food}

                            </h2>

                        </div>


                        <div className="confidence">

                            {result.prediction?.confidence}%

                            <span>

                                model confidence

                            </span>

                        </div>

                    </div>


                    {/* =========================
                        RISK EXPLANATION
                    ========================= */}

                    {(() => {

                        const riskInfo =
                            getRiskInfo(
                                result.risk?.riskLevel
                            );

                        const RiskIcon =
                            riskInfo.icon;


                        return (

                            <div
                                className={`risk-explanation ${riskInfo.className}`}
                            >


                                <div className="risk-icon">

                                    <RiskIcon
                                        size={25}
                                    />

                                </div>


                                <div className="risk-content">

                                    <span className="risk-label">

                                        PERSONALIZED RISK ASSESSMENT

                                    </span>


                                    <h2>

                                        {riskInfo.title}

                                    </h2>


                                    <p>

                                        {riskInfo.description}

                                    </p>


                                    <div className="risk-action">

                                        <strong>
                                            What to do:
                                        </strong>

                                        <span>
                                            {riskInfo.action}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        );

                    })()}


                    {/* =========================
                        PERSONAL MATCHES
                    ========================= */}

                    {result.risk?.matches?.length > 0 && (

                        <div className="personal-match-section">


                            <div className="subsection-heading">

                                <div>

                                    <span className="small-label">

                                        YOUR PROFILE

                                    </span>

                                    <h3>

                                        Potential Allergen Matches

                                    </h3>

                                </div>

                            </div>


                            {result.risk.matches.map(
                                (match, index) => (

                                    <div
                                        className="personal-match"
                                        key={index}
                                    >


                                        <div className="match-icon">

                                            ⚠️

                                        </div>


                                        <div className="match-details">

                                            <strong>

                                                {match.ingredient}

                                            </strong>


                                            <p>

                                                Matches your{" "}

                                                <b>
                                                    {match.allergen}
                                                </b>

                                                {" "}allergy

                                            </p>


                                            <span>

                                                {match.severity}
                                                {" severity"} •{" "}

                                                {getCertaintyText(
                                                    match.certainty
                                                )}

                                            </span>

                                        </div>


                                        <div className="match-score">

                                            Score

                                            <strong>

                                                {match.score}

                                            </strong>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}


                    {/* =========================
                        INGREDIENT ANALYSIS
                    ========================= */}

                    <div className="ingredient-section">


                        <div className="subsection-heading">

                            <div>

                                <span className="small-label">

                                    FOOD INTELLIGENCE

                                </span>

                                <h3>

                                    Ingredient Analysis

                                </h3>

                            </div>

                        </div>


                        <div className="ingredients">


                            {result.food?.ingredients?.map(
                                (ingredient, index) => (

                                    <div
                                        className="ingredient"
                                        key={index}
                                    >


                                        <div>

                                            <strong>

                                                {ingredient.name}

                                            </strong>


                                            {ingredient.allergen && (

                                                <span>

                                                    {" "}
                                                    •{" "}

                                                    {ingredient.allergen}

                                                </span>

                                            )}

                                        </div>


                                        <small>

                                            {getCertaintyText(
                                                ingredient.certainty
                                            )}

                                        </small>

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* =========================
                        NO MATCH EXPLANATION
                    ========================= */}

                    {result.risk?.riskLevel ===
                        "NO_KNOWN_MATCH" && (

                            <div className="no-match-note">

                                <ShieldCheck size={20} />

                                <div>

                                    <strong>
                                        No known match found
                                    </strong>

                                    <p>

                                        None of the currently
                                        stored allergen matches
                                        were identified in the
                                        available ingredient data.

                                    </p>

                                </div>

                            </div>

                        )}


                    {/* =========================
                        VERIFICATION
                    ========================= */}

                    <div className="verification-note">

                        <strong>

                            ⚠️ Important

                        </strong>


                        <p>

                            AllerGuard AI provides
                            assistive food-risk information.
                            Image recognition and ingredient
                            data can be uncertain and cannot
                            guarantee that a food is safe or
                            allergen-free.

                        </p>


                        <p>

                            Always verify ingredients,
                            preparation details, and possible
                            cross-contact when allergy risk
                            is significant.

                        </p>

                    </div>


                    {/* =========================
                        ACTIONS
                    ========================= */}

                    <div className="result-actions">


                        <button
                            onClick={() => {

                                setImage(null);
                                setPreview(null);
                                setResult(null);
                                setError("");

                            }}
                        >

                            Scan Another Food

                        </button>


                        <button
                            className="history-result-button"
                            onClick={() =>
                                navigate("/history")
                            }
                        >

                            View Scan History

                        </button>

                    </div>

                </div>

            )}

        </div>

    );

}

export default ScanFood;