import React, { useEffect, useState } from "react";
import {
    ArrowLeft,
    History as HistoryIcon,
    ShieldCheck,
    AlertTriangle,
    Info,
    FileText,
    Camera,
    Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function History() {

    const navigate = useNavigate();

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =========================
    // FETCH HISTORY
    // =========================

    useEffect(() => {

        const fetchHistory = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const headers = {
                    Authorization: `Bearer ${token}`
                };

                // FOOD SCANS
                const foodResponse = await fetch(
                    "http://localhost:5001/api/history",
                    {
                        headers
                    }
                );

                // OCR SCANS
                const ocrResponse = await fetch(
                    "http://localhost:5001/api/ocr/history",
                    {
                        headers
                    }
                );

                if (
                    foodResponse.status === 401 ||
                    ocrResponse.status === 401
                ) {
                    localStorage.removeItem("token");
                    navigate("/login");
                    return;
                }

                const foodData =
                    await foodResponse.json();

                const ocrData =
                    await ocrResponse.json();

                const foodHistory =
                    foodData.success
                        ? (foodData.history || []).map(
                            (scan) => ({
                                ...scan,
                                scanType: "food"
                            })
                        )
                        : [];

                const ocrHistory =
                    ocrData.success
                        ? (ocrData.history || []).map(
                            (scan) => ({
                                ...scan,
                                scanType: "ocr",
                                foodName: "Food Label"
                            })
                        )
                        : [];

                const combinedHistory = [
                    ...foodHistory,
                    ...ocrHistory
                ];

                combinedHistory.sort(
                    (a, b) =>
                        new Date(b.createdAt) -
                        new Date(a.createdAt)
                );

                setHistory(combinedHistory);

            } catch (error) {

                console.error(
                    "History error:",
                    error
                );

                setError(
                    "Unable to load your scan history."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchHistory();

    }, [navigate]);


    // =========================
    // RISK INFO
    // =========================

    const getRiskInfo = (risk) => {

        switch (risk) {

            case "HIGH_RISK":
                return {
                    text: "High Risk",
                    className: "high-risk",
                    icon: AlertTriangle
                };

            case "POSSIBLE_RISK":
                return {
                    text: "Possible Risk",
                    className: "possible-risk",
                    icon: AlertTriangle
                };

            case "VERIFY":
                return {
                    text: "Verify",
                    className: "verify",
                    icon: Info
                };

            case "NO_KNOWN_MATCH":
                return {
                    text: "No Known Match",
                    className: "no-known-match",
                    icon: ShieldCheck
                };

            default:
                return {
                    text: "Unknown",
                    className: "verify",
                    icon: Info
                };
        }
    };


    // =========================
    // DATE FORMAT
    // =========================

    const formatDate = (date) => {

        if (!date) return "Unknown date";

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    };


    // =========================
    // RENDER
    // =========================

    return (

        <div className="history-page">

            <div className="history-container">

                {/* BACK */}

                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    <ArrowLeft size={18} />
                    Dashboard
                </button>


                {/* HEADER */}

                <div className="history-heading">

                    <div className="history-heading-icon">
                        <HistoryIcon size={27} />
                    </div>

                    <div>

                        <span className="small-label">
                            YOUR ACTIVITY
                        </span>

                        <h1>
                            Scan History
                        </h1>

                    </div>

                </div>


                <p className="history-description">

                    Review your previous food analyses
                    and label scans, including detected
                    allergens and personalized risk results.

                </p>


                {/* ERROR */}

                {error && (

                    <div className="history-error">

                        <AlertTriangle size={18} />

                        {error}

                    </div>

                )}


                {/* LOADING */}

                {loading ? (

                    <div className="empty-history loading-history">

                        <div className="history-loading-icon">
                            <HistoryIcon size={28} />
                        </div>

                        <h2>
                            Loading scan history...
                        </h2>

                        <p>
                            Fetching your previous analyses.
                        </p>

                    </div>

                ) : history.length === 0 ? (

                    /* EMPTY STATE */

                    <div className="empty-history">

                        <div className="empty-icon">
                            🔍
                        </div>

                        <h2>
                            No scans yet
                        </h2>

                        <p>
                            Your analyzed foods and labels
                            will appear here.
                        </p>

                        <div className="empty-history-actions">

                            <button
                                onClick={() =>
                                    navigate("/scan")
                                }
                            >
                                <Camera size={17} />
                                Scan Food
                            </button>

                            <button
                                className="label-history-button"
                                onClick={() =>
                                    navigate("/ocr")
                                }
                            >
                                <FileText size={17} />
                                Scan Label
                            </button>

                        </div>

                    </div>

                ) : (

                    <>
                        {/* HISTORY SUMMARY */}

                        <div className="history-summary">

                            <div>

                                <span>
                                    TOTAL SCANS
                                </span>

                                <strong>
                                    {history.length}
                                </strong>

                            </div>

                            <div>

                                <span>
                                    FOOD SCANS
                                </span>

                                <strong>
                                    {
                                        history.filter(
                                            (scan) =>
                                                scan.scanType ===
                                                "food"
                                        ).length
                                    }
                                </strong>

                            </div>

                            <div>

                                <span>
                                    LABEL SCANS
                                </span>

                                <strong>
                                    {
                                        history.filter(
                                            (scan) =>
                                                scan.scanType ===
                                                "ocr"
                                        ).length
                                    }
                                </strong>

                            </div>

                        </div>


                        {/* HISTORY LIST */}

                        <div className="history-list">

                            {history.map((scan) => {

                                const riskInfo =
                                    getRiskInfo(
                                        scan.riskLevel
                                    );

                                const RiskIcon =
                                    riskInfo.icon;

                                const isOCR =
                                    scan.scanType === "ocr";

                                return (

                                    <div
                                        className="history-card"
                                        key={`${scan.scanType}-${scan._id}`}
                                    >

                                        {/* ICON */}

                                        <div
                                            className={`history-food-icon ${isOCR
                                                    ? "label-history-icon"
                                                    : "food-history-icon"
                                                }`}
                                        >

                                            {isOCR ? (
                                                <FileText size={25} />
                                            ) : (
                                                <span>
                                                    🍛
                                                </span>
                                            )}

                                        </div>


                                        {/* MAIN CONTENT */}

                                        <div className="history-main">

                                            <div className="history-title-row">

                                                <h3>
                                                    {scan.foodName}
                                                </h3>

                                                <span
                                                    className={`scan-type ${isOCR
                                                            ? "label-type"
                                                            : "food-type"
                                                        }`}
                                                >

                                                    {isOCR ? (
                                                        <>
                                                            <FileText
                                                                size={11}
                                                            />
                                                            LABEL SCAN
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Camera
                                                                size={11}
                                                            />
                                                            FOOD SCAN
                                                        </>
                                                    )}

                                                </span>

                                            </div>


                                            {/* DATE */}

                                            <p className="history-date">

                                                <Clock size={12} />

                                                {formatDate(
                                                    scan.createdAt
                                                )}

                                            </p>


                                            {/* MATCHES */}

                                            {scan.matches?.length > 0 && (

                                                <div className="history-matches">

                                                    {scan.matches.map(
                                                        (
                                                            match,
                                                            index
                                                        ) => (

                                                            <span
                                                                key={index}
                                                            >

                                                                {isOCR
                                                                    ? match.allergen
                                                                    : match.ingredient}

                                                                {" • "}

                                                                {isOCR
                                                                    ? match.certainty
                                                                    : match.allergen}

                                                            </span>

                                                        )
                                                    )}

                                                </div>

                                            )}

                                        </div>


                                        {/* RISK */}

                                        <div
                                            className={`history-risk ${riskInfo.className}`}
                                        >

                                            <RiskIcon size={14} />

                                            <span>
                                                {riskInfo.text}
                                            </span>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>


                        {/* SAFETY NOTE */}

                        <div className="history-safety-note">

                            <ShieldCheck size={19} />

                            <div>

                                <strong>
                                    Your history is for reference
                                </strong>

                                <p>
                                    AllerGuard AI results are
                                    assistive and may contain
                                    uncertainty. Always verify
                                    ingredients and cross-contact
                                    information when allergy risk
                                    is significant.
                                </p>

                            </div>

                        </div>

                    </>
                )}

            </div>

        </div>
    );
}

export default History;