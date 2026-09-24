import React, { useState } from "react";
import {
    Upload,
    ArrowLeft,
    Loader2,
    AlertTriangle,
    ShieldCheck,
    Info,
    FileText,
    RotateCcw,
    CheckCircle2,
    Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function LabelScanner() {
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

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            return;
        }

        setImage(file);
        setPreview(URL.createObjectURL(file));

        setResult(null);
        setError("");
    };

    // =========================
    // ANALYZE LABEL
    // =========================

    const analyzeLabel = async () => {
        if (!image) {
            setError("Please select a food label image first.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login first.");
                navigate("/login");
                return;
            }

            const formData = new FormData();
            formData.append("file", image);

            const response = await fetch(
                "http://localhost:5001/api/ocr",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                }
            );

            const data = await response.json();

            if (response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Food label analysis failed."
                );
            }

            setResult(data);

        } catch (error) {
            console.error("OCR Scanner Error:", error);

            setError(
                error.message ||
                "Unable to analyze food label."
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
                    title: "High Risk",
                    description:
                        "A detected allergen matches your profile with a high-risk combination.",
                    icon: AlertTriangle,
                    className: "ocr-risk-high"
                };

            case "POSSIBLE_RISK":
                return {
                    title: "Possible Risk",
                    description:
                        "One or more detected allergens match your personal allergy profile.",
                    icon: AlertTriangle,
                    className: "ocr-risk-possible"
                };

            case "VERIFY":
                return {
                    title: "Verify Ingredients",
                    description:
                        "The available label information contains uncertainty and should be verified.",
                    icon: Info,
                    className: "ocr-risk-verify"
                };

            case "NO_KNOWN_MATCH":
                return {
                    title: "No Known Match",
                    description:
                        "No detected allergen matched your current allergy profile.",
                    icon: ShieldCheck,
                    className: "ocr-risk-none"
                };

            default:
                return {
                    title: "Unable to Determine",
                    description:
                        "The system could not determine a clear personalized risk status.",
                    icon: Info,
                    className: "ocr-risk-verify"
                };
        }
    };

    // =========================
    // CERTAINTY INFORMATION
    // =========================

    const getCertaintyInfo = (certainty) => {
        switch (certainty?.toLowerCase()) {

            case "confirmed":
                return {
                    label: "CONFIRMED",
                    className: "certainty-confirmed",
                    icon: CheckCircle2
                };

            case "likely":
                return {
                    label: "LIKELY",
                    className: "certainty-likely",
                    icon: Info
                };

            default:
                return {
                    label: "POSSIBLE",
                    className: "certainty-possible",
                    icon: AlertTriangle
                };
        }
    };

    // =========================
    // RISK EXPLANATION
    // =========================

    const getRiskExplanation = () => {
        if (!result?.risk) return "";

        const matches = result.risk.matches || [];

        if (matches.length === 0) {
            return "No detected allergen matched the allergies currently saved in your profile.";
        }

        const names = matches.map(
            (match) => match.allergen
        );

        return `Your profile contains an allergy matching ${names.join(
            ", "
        )}. The label analysis detected these allergens, so the result has been personalized to your profile.`;
    };

    // =========================
    // RESET
    // =========================

    const resetScanner = () => {
        setImage(null);
        setPreview(null);
        setResult(null);
        setError("");
    };

    // =========================
    // RENDER
    // =========================

    return (
        <div className="ocr-page">

            <div className="ocr-container">

                {/* =========================
                    HEADER
                ========================= */}

                <div className="ocr-header">

                    <button
                        className="back-button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        <ArrowLeft size={18} />
                        Dashboard
                    </button>

                    <div className="ocr-title">

                        <div className="ocr-title-icon">
                            <FileText size={25} />
                        </div>

                        <div>
                            <span className="ocr-eyebrow">
                                INGREDIENT INTELLIGENCE
                            </span>

                            <h1>
                                Scan Food Label
                            </h1>
                        </div>

                    </div>

                    <p>
                        Upload a packaged food label and
                        AllerGuard AI will extract ingredient
                        information and compare detected
                        allergens with your profile.
                    </p>

                </div>


                {/* =========================
                    UPLOAD CARD
                ========================= */}

                <div className="ocr-upload-card">

                    {!preview ? (

                        <label className="ocr-upload-area">

                            <div className="ocr-upload-icon">
                                <Upload size={32} />
                            </div>

                            <h2>
                                Upload Food Label
                            </h2>

                            <p>
                                Choose a clear photo of the
                                ingredients or allergen section.
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

                        <div className="ocr-preview-area">

                            <div className="ocr-preview-image">

                                <img
                                    src={preview}
                                    alt="Food label preview"
                                />

                            </div>

                            <div className="ocr-selected-file">

                                <FileText size={17} />

                                <span>
                                    {image?.name}
                                </span>

                            </div>

                            <div className="ocr-preview-actions">

                                <button
                                    type="button"
                                    onClick={resetScanner}
                                    disabled={loading}
                                >
                                    <RotateCcw size={17} />
                                    Choose Another
                                </button>

                                <button
                                    type="button"
                                    className="ocr-analyze-button"
                                    onClick={analyzeLabel}
                                    disabled={loading}
                                >

                                    {loading ? (
                                        <>
                                            <Loader2
                                                size={18}
                                                className="spin"
                                            />
                                            Reading Label...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={18} />
                                            Analyze Label
                                        </>
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

                    <div className="ocr-error">

                        <AlertTriangle size={18} />

                        <span>
                            {error}
                        </span>

                    </div>

                )}


                {/* =========================
                    RESULT
                ========================= */}

                {result && (

                    <div className="ocr-result-card">

                        {/* =========================
                            RISK HEADER
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
                                    className={`ocr-risk-box ${riskInfo.className}`}
                                >

                                    <div className="ocr-risk-icon">
                                        <RiskIcon size={28} />
                                    </div>

                                    <div>

                                        <span className="ocr-small-label">
                                            PERSONALIZED LABEL ANALYSIS
                                        </span>

                                        <h2>
                                            {riskInfo.title}
                                        </h2>

                                        <p>
                                            {riskInfo.description}
                                        </p>

                                    </div>

                                </div>

                            );

                        })()}


                        {/* =========================
                            WHY THIS RESULT?
                        ========================= */}

                        <div className="ocr-explanation-card">

                            <div className="ocr-explanation-icon">
                                <Sparkles size={19} />
                            </div>

                            <div>

                                <span className="ocr-small-label">
                                    EXPLAINABLE RISK
                                </span>

                                <h3>
                                    Why did AllerGuard flag this?
                                </h3>

                                <p>
                                    {getRiskExplanation()}
                                </p>

                            </div>

                        </div>


                        {/* =========================
                            DETECTED ALLERGENS
                        ========================= */}

                        <div className="ocr-section">

                            <div className="ocr-section-heading">

                                <span className="ocr-small-label">
                                    ALLERGEN INTELLIGENCE
                                </span>

                                <h3>
                                    Detected Allergens
                                </h3>

                            </div>

                            {result.detectedAllergens?.length > 0 ? (

                                <div className="ocr-allergen-list">

                                    {result.detectedAllergens.map(
                                        (item, index) => {

                                            const certainty =
                                                getCertaintyInfo(
                                                    item.certainty
                                                );

                                            const CertaintyIcon =
                                                certainty.icon;

                                            return (

                                                <div
                                                    className="ocr-allergen"
                                                    key={index}
                                                >

                                                    <div className="ocr-allergen-symbol">
                                                        <AlertTriangle
                                                            size={18}
                                                        />
                                                    </div>

                                                    <div className="ocr-allergen-details">

                                                        <strong>
                                                            {item.allergen}
                                                        </strong>

                                                        <div
                                                            className={`ocr-certainty ${certainty.className}`}
                                                        >
                                                            <CertaintyIcon
                                                                size={13}
                                                            />
                                                            {certainty.label}
                                                        </div>

                                                    </div>

                                                </div>

                                            );
                                        }
                                    )}

                                </div>

                            ) : (

                                <div className="ocr-no-allergen">

                                    <ShieldCheck size={20} />

                                    <span>
                                        No known allergens detected
                                        in the available label text.
                                    </span>

                                </div>

                            )}

                        </div>


                        {/* =========================
                            PERSONAL MATCH
                        ========================= */}

                        {result.risk?.matches?.length > 0 && (

                            <div className="ocr-section">

                                <div className="ocr-section-heading">

                                    <span className="ocr-small-label">
                                        YOUR PROFILE
                                    </span>

                                    <h3>
                                        Personal Allergy Matches
                                    </h3>

                                </div>

                                <div className="ocr-match-list">

                                    {result.risk.matches.map(
                                        (match, index) => (

                                            <div
                                                className="ocr-personal-match"
                                                key={index}
                                            >

                                                <div className="ocr-match-icon">
                                                    ⚠️
                                                </div>

                                                <div className="ocr-match-details">

                                                    <strong>
                                                        {match.allergen}
                                                    </strong>

                                                    <p>
                                                        Matches your{" "}
                                                        <b>
                                                            {match.severity}
                                                        </b>{" "}
                                                        allergy profile.
                                                    </p>

                                                    <span>
                                                        Evidence:{" "}
                                                        {match.certainty}
                                                        {" • "}
                                                        Risk score:{" "}
                                                        {match.score}
                                                    </span>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>

                        )}


                        {/* =========================
                            EXTRACTED TEXT
                        ========================= */}

                        <div className="ocr-section">

                            <div className="ocr-section-heading">

                                <span className="ocr-small-label">
                                    OCR EXTRACTION
                                </span>

                                <h3>
                                    Extracted Label Text
                                </h3>

                            </div>

                            <div className="ocr-text-box">

                                {result.text || (
                                    "No text could be extracted."
                                )}

                            </div>

                        </div>


                        {/* =========================
                            USER ALLERGIES
                        ========================= */}

                        {result.userAllergies?.length > 0 && (

                            <div className="ocr-profile-note">

                                <div className="ocr-profile-note-heading">

                                    <ShieldCheck size={19} />

                                    <strong>
                                        Your current allergy profile
                                    </strong>

                                </div>

                                <div className="ocr-profile-tags">

                                    {result.userAllergies.map(
                                        (allergy, index) => (

                                            <span
                                                key={index}
                                                className="ocr-profile-tag"
                                            >
                                                {allergy.name}
                                                {" • "}
                                                {allergy.severity}
                                            </span>

                                        )
                                    )}

                                </div>

                            </div>

                        )}


                        {/* =========================
                            VERIFICATION NOTE
                        ========================= */}

                        <div className="ocr-verification-note">

                            <div className="ocr-verification-heading">

                                <AlertTriangle size={19} />

                                <strong>
                                    Verify before consuming
                                </strong>

                            </div>

                            <p>
                                OCR and ingredient interpretation
                                can be incomplete or uncertain.
                                This result does not guarantee
                                that a food is safe or allergen-free.
                            </p>

                            <p>
                                Always verify the complete label,
                                ingredients, preparation details
                                and possible cross-contact when
                                allergy risk is significant.
                            </p>

                        </div>


                        {/* =========================
                            ACTIONS
                        ========================= */}

                        <div className="ocr-result-actions">

                            <button
                                type="button"
                                onClick={resetScanner}
                            >
                                <RotateCcw size={17} />
                                Scan Another Label
                            </button>

                            <button
                                type="button"
                                className="ocr-dashboard-button"
                                onClick={() =>
                                    navigate("/dashboard")
                                }
                            >
                                Back to Dashboard
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default LabelScanner;