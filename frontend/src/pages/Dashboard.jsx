import React, { useEffect, useState } from "react";
import FoodDecor from "../components/FoodDecor";

import {
    Camera,
    FileText,
    History as HistoryIcon,
    UserRound,
    LogOut,
    ShieldCheck,
    ShieldAlert,
    AlertTriangle,
    Info,
    Clock,
    ChevronDown,
    Settings,
    Sun,
    Moon,
    QrCode
} from "lucide-react";

import { useNavigate } from "react-router-dom";


function Dashboard() {

    const navigate = useNavigate();

    const [latestScan, setLatestScan] = useState(null);
    const [allergies, setAllergies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("allerguard-theme") === "dark"
    );

    useEffect(() => {
        const savedTheme = localStorage.getItem("allerguard-theme");

        if (savedTheme === "dark") {
            document.body.classList.add("allerguard-dark");
            setDarkMode(true);
        } else {
            document.body.classList.remove("allerguard-dark");
            setDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        const next = !darkMode;
        setDarkMode(next);
        localStorage.setItem("allerguard-theme", next ? "dark" : "light");
        document.body.classList.toggle("allerguard-dark", next);
    };


    // =========================
    // LOAD DASHBOARD DATA
    // =========================

    useEffect(() => {

        const fetchDashboardData = async () => {

            try {

                const token =
                    localStorage.getItem("token");


                if (!token) {

                    navigate("/login");

                    return;

                }


                // =========================
                // GET PROFILE
                // =========================

                const profileResponse = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/profile`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


                if (profileResponse.status === 401) {

                    localStorage.removeItem("token");

                    navigate("/login");

                    return;

                }


                const profileData =
                    await profileResponse.json();


                if (profileResponse.ok) {

                    setAllergies(
                        profileData.user?.allergies || []
                    );

                }


                // =========================
                // GET FOOD + OCR HISTORY
                // =========================

                const headers = {
                    Authorization:
                        `Bearer ${token}`
                };


                // Food history
                const historyResponse =
                    await fetch(
                        `${import.meta.env.VITE_API_URL}/api/history`,
                        {
                            headers
                        }
                    );


                // OCR history
                const ocrHistoryResponse =
                    await fetch(
                        `${import.meta.env.VITE_API_URL}/api/ocr/history`,
                        {
                            headers
                        }
                    );


                // =========================
                // CHECK AUTH
                // =========================

                if (
                    historyResponse.status === 401 ||
                    ocrHistoryResponse.status === 401
                ) {

                    localStorage.removeItem("token");

                    navigate("/login");

                    return;

                }


                // =========================
                // PARSE RESPONSES
                // =========================

                const historyData =
                    await historyResponse.json();


                const ocrHistoryData =
                    await ocrHistoryResponse.json();


                // =========================
                // FOOD HISTORY
                // =========================

                const foodHistory =
                    historyData.success
                        ? (
                            historyData.history || []
                        ).map(
                            (scan) => ({
                                ...scan,
                                scanType: "food"
                            })
                        )
                        : [];


                // =========================
                // OCR HISTORY
                // =========================

                const ocrHistory =
                    ocrHistoryData.success
                        ? (
                            ocrHistoryData.history || []
                        ).map(
                            (scan) => ({
                                ...scan,
                                foodName:
                                    "Food Label",
                                scanType:
                                    "ocr"
                            })
                        )
                        : [];


                // =========================
                // COMBINE BOTH HISTORIES
                // =========================

                const combinedHistory = [
                    ...foodHistory,
                    ...ocrHistory
                ];


                // =========================
                // SORT LATEST FIRST
                // =========================

                combinedHistory.sort(
                    (a, b) =>
                        new Date(
                            b.createdAt
                        ) -
                        new Date(
                            a.createdAt
                        )
                );


                // =========================
                // SET LATEST SCAN
                // =========================

                if (
                    combinedHistory.length > 0
                ) {

                    setLatestScan(
                        combinedHistory[0]
                    );

                } else {

                    setLatestScan(null);

                }


            } catch (error) {

                console.error(
                    "Dashboard Error:",
                    error
                );


                setError(
                    "Unable to load dashboard data."
                );


            } finally {

                setLoading(false);

            }

        };


        fetchDashboardData();


    }, [navigate]);


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };


    // =========================
    // RISK INFORMATION
    // =========================

    const getRiskInfo = (riskLevel) => {

        switch (riskLevel) {

            case "HIGH_RISK":

                return {
                    label: "High Risk",
                    className: "high",
                    icon: ShieldAlert
                };


            case "POSSIBLE_RISK":

                return {
                    label: "Possible Risk",
                    className: "possible",
                    icon: AlertTriangle
                };


            case "VERIFY":

                return {
                    label: "Verify",
                    className: "verify",
                    icon: Info
                };


            case "NO_KNOWN_MATCH":

                return {
                    label: "No Known Match",
                    className: "no-match",
                    icon: ShieldCheck
                };


            default:

                return {
                    label: "Unknown",
                    className: "verify",
                    icon: Info
                };

        }

    };


    // =========================
    // FORMAT DATE
    // =========================

    const formatDate = (date) => {

        if (!date) {
            return "";
        }


        try {

            return new Date(
                date
            ).toLocaleString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

        } catch {

            return "";

        }

    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <div className="dashboard-page">

                <FoodDecor />

                <div
                    style={{
                        minHeight: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#777"
                    }}
                >
                    Loading dashboard...
                </div>

            </div>

        );

    }


    // =========================
    // DASHBOARD
    // =========================

    return (

        <div className="dashboard-page">

            <FoodDecor />

            {/* =========================
                HEADER
            ========================= */}

            <div className="dashboard-header">

                <div>

                    <span className="dashboard-eyebrow">
                        ALLERGUARD AI
                    </span>


                    <h1>
                        Welcome back 👋
                    </h1>


                    <p>
                        Your personalized food allergy
                        intelligence dashboard.
                    </p>

                </div>


                <div className="profile-menu-wrapper">

                    <button
                        className="profile-menu-trigger"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <div className="profile-avatar">
                            <UserRound size={19} />
                        </div>
                        <span>My Profile</span>
                        <ChevronDown
                            size={16}
                            className={menuOpen ? "menu-chevron open" : "menu-chevron"}
                        />
                    </button>

                    {menuOpen && (
                        <div className="profile-dropdown">
                            <button
                                className="profile-menu-item"
                                onClick={() => { setMenuOpen(false); navigate("/profile"); }}
                            >
                                <UserRound size={18} />
                                <div>
                                    <strong>My Profile</strong>
                                    <span>Manage allergies</span>
                                </div>
                            </button>

                            <button
                                className="profile-menu-item"
                                onClick={() => { setMenuOpen(false); navigate("/allergy-card"); }}
                            >
                                <QrCode size={18} />
                                <div>
                                    <strong>Allergy Card</strong>
                                    <span>View your QR card</span>
                                </div>
                            </button>

                            <button
                                className="profile-menu-item"
                                onClick={() => { setMenuOpen(false); navigate("/history"); }}
                            >
                                <HistoryIcon size={18} />
                                <div>
                                    <strong>Scan History</strong>
                                    <span>View previous scans</span>
                                </div>
                            </button>

                            <div className="profile-menu-divider" />

                            <button
                                className="profile-menu-item"
                                onClick={toggleTheme}
                            >
                                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                                <div>
                                    <strong>{darkMode ? "Light Mode" : "Dark Mode"}</strong>
                                    <span>Change appearance</span>
                                </div>
                                <div className={darkMode ? "theme-switch active" : "theme-switch"}>
                                    <div />
                                </div>
                            </button>

                            <button
                                className="profile-menu-item"
                                onClick={() => { setMenuOpen(false); navigate("/profile"); }}
                            >
                                <Settings size={18} />
                                <div>
                                    <strong>Settings</strong>
                                    <span>Account preferences</span>
                                </div>
                            </button>

                            <div className="profile-menu-divider" />

                            <button
                                className="profile-menu-item logout-item"
                                onClick={handleLogout}
                            >
                                <LogOut size={18} />
                                <div>
                                    <strong>Logout</strong>
                                    <span>Sign out of AllerGuard</span>
                                </div>
                            </button>
                        </div>
                    )}
                </div>

            </div>


            {/* =========================
                ERROR
            ========================= */}

            {error && (

                <div className="dashboard-error">

                    ⚠️ {error}

                </div>

            )}


            {/* =========================
                ALLERGY PROFILE
            ========================= */}

            <div className="dashboard-profile-card">


                <div className="profile-card-left">

                    <div className="profile-icon">

                        <UserRound size={22} />

                    </div>


                    <div>

                        <span className="dashboard-card-label">
                            YOUR ALLERGY PROFILE
                        </span>


                        <h3>
                            Personalized protection
                        </h3>

                    </div>

                </div>


                <div className="dashboard-allergy-list">

                    {allergies.length > 0 ? (

                        allergies.map(
                            (allergy, index) => (

                                <div
                                    className="dashboard-allergy-tag"
                                    key={
                                        allergy._id ||
                                        index
                                    }
                                >

                                    <span>
                                        {allergy.name}
                                    </span>


                                    <small>
                                        {allergy.severity}
                                    </small>

                                </div>

                            )

                        )

                    ) : (

                        <span className="no-allergy-text">
                            No allergies added yet
                        </span>

                    )}

                </div>


                <button
                    className="profile-edit-button"
                    onClick={() =>
                        navigate("/profile")
                    }
                >
                    Manage Profile
                </button>

            </div>


            {/* =========================
                SCAN OPTIONS
            ========================= */}

            <div className="dashboard-scan-section">


                <div className="dashboard-section-heading">

                    <span>
                        ALLERGUARD AI
                    </span>


                    <h2>
                        What would you like to scan?
                    </h2>


                    <p>
                        Analyze food images or packaged
                        food labels for personalized
                        allergen insights.
                    </p>

                </div>


                <div className="dashboard-scan-options">


                    {/* =========================
                        FOOD IMAGE
                    ========================= */}

                    <div
                        className="dashboard-scan-card food-scan-card"
                        onClick={() =>
                            navigate("/scan")
                        }
                    >

                        <div className="dashboard-scan-icon">

                            <Camera size={25} />

                        </div>


                        <div className="dashboard-scan-content">

                            <span className="dashboard-scan-label">
                                AI FOOD RECOGNITION
                            </span>


                            <h3>
                                Scan Food
                            </h3>


                            <p>
                                Upload a photo of a prepared
                                food item to identify the food
                                and check your personalized
                                allergen risk.
                            </p>


                            <button
                                className="dashboard-scan-button"
                                onClick={(event) => {

                                    event.stopPropagation();

                                    navigate("/scan");

                                }}
                            >
                                Scan Food →
                            </button>

                        </div>

                    </div>


                    {/* =========================
                        FOOD LABEL / OCR
                    ========================= */}

                    <div
                        className="dashboard-scan-card label-scan-card"
                        onClick={() =>
                            navigate("/ocr")
                        }
                    >

                        <div className="dashboard-scan-icon">

                            <FileText size={25} />

                        </div>


                        <div className="dashboard-scan-content">

                            <span className="dashboard-scan-label">
                                OCR + ALLERGEN INTELLIGENCE
                            </span>


                            <h3>
                                Scan Food Label
                            </h3>


                            <p>
                                Upload a packaged food label
                                to extract ingredients and
                                detect possible allergens
                                against your profile.
                            </p>


                            <button
                                className="dashboard-scan-button"
                                onClick={(event) => {

                                    event.stopPropagation();

                                    navigate("/ocr");

                                }}
                            >
                                Scan Label →
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* =========================
                LATEST SCAN
            ========================= */}

            <div className="dashboard-latest-section">


                <div className="dashboard-latest-header">

                    <div>

                        <span className="dashboard-card-label">
                            RECENT ACTIVITY
                        </span>


                        <h2>
                            Latest Scan
                        </h2>

                    </div>


                    <button
                        className="view-history-button"
                        onClick={() =>
                            navigate("/history")
                        }
                    >

                        <HistoryIcon size={15} />

                        View History

                    </button>

                </div>


                {latestScan ? (

                    <div className="latest-scan-card">


                        <div className="latest-scan-main">


                            <div className="latest-scan-food-icon">

                                {latestScan.scanType ===
                                    "ocr"
                                    ? "🏷️"
                                    : "🍛"}

                            </div>


                            <div>

                                <h3>
                                    {latestScan.foodName}
                                </h3>


                                <div className="latest-time">

                                    <Clock size={13} />

                                    <span>
                                        {formatDate(
                                            latestScan.createdAt
                                        )}
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* =========================
                            RISK ICON
                        ========================= */}

                        {(() => {

                            const riskInfo =
                                getRiskInfo(
                                    latestScan.riskLevel
                                );


                            const RiskIcon =
                                riskInfo.icon;


                            return (

                                <div
                                    className={`dashboard-risk ${riskInfo.className}`}
                                    title={riskInfo.label}
                                >

                                    <RiskIcon size={17} />

                                </div>

                            );

                        })()}


                        {/* =========================
                            MATCHES
                        ========================= */}

                        {latestScan.matches?.length > 0 && (

                            <div className="latest-match-preview">

                                <span>
                                    Potential allergen match:
                                </span>


                                <strong>

                                    {latestScan.matches
                                        .map(
                                            (match) =>
                                                match.allergen
                                        )
                                        .join(", ")}

                                </strong>

                            </div>

                        )}

                    </div>

                ) : (

                    <div className="empty-latest-card">


                        <div className="empty-latest-icon">
                            🔍
                        </div>


                        <h3>
                            No scans yet
                        </h3>


                        <p>
                            Scan your first food or food
                            label to see personalized
                            analysis here.
                        </p>


                        <button
                            onClick={() =>
                                navigate("/scan")
                            }
                        >
                            Start Your First Scan
                        </button>

                    </div>

                )}

            </div>


            {/* =========================
                SAFETY NOTE
            ========================= */}

            <div className="dashboard-safety-note">

                <ShieldCheck size={19} />

                <div>
                    <strong>
                        AllerGuard AI is an assistive tool
                    </strong>

                    <p>
                        Results can be uncertain and do not
                        guarantee that a food is allergen-free.
                        Always verify ingredients and possible
                        cross-contact when allergy risk is
                        significant.
                    </p>
                </div>

            </div>

            <footer className="allerguard-footer">

                <div className="footer-brand">
                    <div className="footer-logo">
                        <ShieldCheck size={19} />
                    </div>
                    <div>
                        <strong>AllerGuard AI</strong>
                        <span>Personalized Food Allergy Intelligence</span>
                    </div>
                </div>

                <div className="footer-links">
                    <button onClick={() => navigate("/profile")}>Profile</button>
                    <button onClick={() => navigate("/history")}>History</button>
                    <button onClick={() => navigate("/allergy-card")}>Allergy Card</button>
                    <button onClick={() => navigate("/ocr")}>Label Scanner</button>
                </div>

                <div className="footer-note">
                    <span>Assistive information only</span>
                    <span>© 2026 AllerGuard AI</span>
                </div>

            </footer>

        </div>

    );

}


export default Dashboard;