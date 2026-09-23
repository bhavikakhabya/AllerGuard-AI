import React, { useEffect, useState } from "react";

import {
    ShieldCheck,
    Plus,
    Trash2,
    Save,
    QrCode,
    ArrowLeft,
    Info,
    AlertTriangle
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import API_BASE from "../services/api";


function AllergyProfile() {

    const navigate = useNavigate();

    const [allergies, setAllergies] = useState([]);

    const [allergyName, setAllergyName] = useState("");

    const [severity, setSeverity] = useState("moderate");

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    // ============================================
    // FETCH ALLERGIES
    // ============================================

    useEffect(() => {

        const fetchAllergies = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                if (!token) {

                    navigate("/login");

                    return;

                }


                const response = await fetch(
                    `${API_BASE}/api/profile/allergies`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


                if (response.status === 401) {

                    localStorage.removeItem("token");

                    navigate("/login");

                    return;

                }


                const data =
                    await response.json();


                if (data.success) {

                    setAllergies(
                        data.allergies || []
                    );

                } else {

                    setError(
                        data.message ||
                        "Failed to load allergy profile"
                    );

                }

            } catch (error) {

                console.error(
                    "Fetch allergy error:",
                    error
                );

                setError(
                    "Unable to load allergy profile"
                );

            } finally {

                setLoading(false);

            }

        };


        fetchAllergies();

    }, [navigate]);


    // ============================================
    // ADD ALLERGY
    // ============================================

    const addAllergy = () => {

        const trimmedName =
            allergyName.trim();


        if (!trimmedName) {

            setError(
                "Please enter an allergy name"
            );

            return;

        }


        const alreadyExists =
            allergies.some(
                (allergy) =>
                    allergy.name.toLowerCase() ===
                    trimmedName.toLowerCase()
            );


        if (alreadyExists) {

            setError(
                "This allergy is already added"
            );

            return;

        }


        setAllergies([
            ...allergies,
            {
                name: trimmedName,
                severity: severity
            }
        ]);


        setAllergyName("");

        setSeverity("moderate");

        setError("");

        setMessage("");

    };


    // ============================================
    // REMOVE ALLERGY
    // ============================================

    const removeAllergy = (index) => {

        const updatedAllergies =
            allergies.filter(
                (_, allergyIndex) =>
                    allergyIndex !== index
            );

        setAllergies(updatedAllergies);

        setMessage("");

    };


    // ============================================
    // SAVE PROFILE
    // ============================================

    const saveProfile = async () => {

        try {

            setSaving(true);

            setError("");

            setMessage("");


            const token =
                localStorage.getItem("token");


            if (!token) {

                navigate("/login");

                return;

            }


            const response = await fetch(
                `${API_BASE}/api/profile/allergies`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        allergies
                    })
                }
            );


            if (response.status === 401) {

                localStorage.removeItem("token");

                navigate("/login");

                return;

            }


            const data =
                await response.json();


            if (data.success) {

                setMessage(
                    "Allergy profile saved successfully!"
                );

            } else {

                setError(
                    data.message ||
                    "Failed to save allergy profile"
                );

            }

        } catch (error) {

            console.error(
                "Save allergy error:",
                error
            );

            setError(
                "Unable to save allergy profile"
            );

        } finally {

            setSaving(false);

        }

    };


    // ============================================
    // LOADING
    // ============================================

    if (loading) {

        return (

            <div className="profile-page">

                <div className="profile-loading">

                    Loading your allergy profile...

                </div>

            </div>

        );

    }


    // ============================================
    // PAGE
    // ============================================

    return (

        <div className="profile-page">

            <div className="profile-container">


                {/* ================================= */}
                {/* BACK TO DASHBOARD */}
                {/* ================================= */}

                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >

                    <ArrowLeft size={18} />

                    Dashboard

                </button>


                {/* ================================= */}
                {/* PAGE HEADER */}
                {/* ================================= */}

                <div className="profile-page-header">

                    <div className="profile-heading-icon">

                        <ShieldCheck size={30} />

                    </div>


                    <div>

                        <span className="profile-eyebrow">
                            PERSONALIZATION
                        </span>

                        <h1>
                            Allergy Profile
                        </h1>

                    </div>

                </div>


                <p className="profile-description">

                    Personalize AllerGuard AI with your
                    known allergies so every food analysis
                    is tailored to your profile.

                </p>


                {/* ================================= */}
                {/* MAIN CARD */}
                {/* ================================= */}

                <div className="profile-main-card">


                    {/* ================================= */}
                    {/* YOUR ALLERGIES */}
                    {/* ================================= */}

                    <div className="profile-section">

                        <div className="profile-section-header">

                            <div>

                                <h2>
                                    Your Allergies
                                </h2>

                                <p>
                                    Add the allergens you want
                                    AllerGuard AI to monitor.
                                </p>

                            </div>

                        </div>


                        <div className="allergy-count">

                            {allergies.length}{" "}
                            {allergies.length === 1
                                ? "allergy"
                                : "allergies"}

                        </div>


                        {/* ================================= */}
                        {/* ALLERGY LIST */}
                        {/* ================================= */}

                        {allergies.length === 0 ? (

                            <div className="empty-allergy-state">

                                <ShieldCheck
                                    size={32}
                                />

                                <h3>
                                    No allergies added yet
                                </h3>

                                <p>
                                    Add your known allergens
                                    below to personalize your
                                    food-risk analysis.
                                </p>

                            </div>

                        ) : (

                            <div className="allergy-list">

                                {allergies.map(
                                    (allergy, index) => (

                                        <div
                                            className="allergy-item"
                                            key={
                                                allergy._id ||
                                                index
                                            }
                                        >

                                            <div className="allergy-item-left">

                                                <div className="allergy-item-icon">

                                                    <ShieldCheck
                                                        size={20}
                                                    />

                                                </div>


                                                <div>

                                                    <strong>
                                                        {allergy.name}
                                                    </strong>

                                                    <span>
                                                        Severity:{" "}
                                                        {allergy.severity}
                                                    </span>

                                                </div>

                                            </div>


                                            <div className="allergy-item-right">

                                                <span
                                                    className={`severity-badge ${allergy.severity}`}
                                                >
                                                    {allergy.severity}
                                                </span>


                                                <button
                                                    type="button"
                                                    className="remove-allergy-button"
                                                    onClick={() =>
                                                        removeAllergy(
                                                            index
                                                        )
                                                    }
                                                    title="Remove allergy"
                                                >

                                                    <Trash2
                                                        size={17}
                                                    />

                                                </button>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </div>


                    {/* ================================= */}
                    {/* ADD ALLERGY */}
                    {/* ================================= */}

                    <div className="profile-divider" />


                    <div className="add-allergy-section">

                        <div className="add-allergy-heading">

                            <Plus size={20} />

                            <h2>
                                Add an allergy
                            </h2>

                        </div>


                        <p>
                            Select the severity level for
                            personalized risk analysis.
                        </p>


                        <div className="add-allergy-form">

                            <input
                                type="text"
                                value={allergyName}
                                onChange={(event) =>
                                    setAllergyName(
                                        event.target.value
                                    )
                                }
                                onKeyDown={(event) => {

                                    if (
                                        event.key ===
                                        "Enter"
                                    ) {

                                        addAllergy();

                                    }

                                }}
                                placeholder="e.g. Peanut, Milk, Wheat..."
                            />


                            <select
                                value={severity}
                                onChange={(event) =>
                                    setSeverity(
                                        event.target.value
                                    )
                                }
                            >

                                <option value="mild">
                                    Mild
                                </option>

                                <option value="moderate">
                                    Moderate
                                </option>

                                <option value="severe">
                                    Severe
                                </option>

                            </select>


                            <button
                                type="button"
                                className="add-allergy-button"
                                onClick={addAllergy}
                            >

                                <Plus size={18} />

                                Add

                            </button>

                        </div>


                        {/* ================================= */}
                        {/* ERROR */}
                        {/* ================================= */}

                        {error && (

                            <div className="profile-error">

                                <AlertTriangle
                                    size={17}
                                />

                                {error}

                            </div>

                        )}


                        {/* ================================= */}
                        {/* SUCCESS */}
                        {/* ================================= */}

                        {message && (

                            <div className="profile-success">

                                <ShieldCheck
                                    size={17}
                                />

                                {message}

                            </div>

                        )}


                        {/* ================================= */}
                        {/* SAVE */}
                        {/* ================================= */}

                        <button
                            type="button"
                            className="save-profile-button"
                            onClick={saveProfile}
                            disabled={saving}
                        >

                            <Save size={18} />

                            {saving
                                ? "Saving..."
                                : "Save Allergy Profile"}

                        </button>


                        {/* ================================= */}
                        {/* QR ALLERGY CARD */}
                        {/* ================================= */}

                        <div className="allergy-card-action-section">

                            <div className="allergy-card-action-icon">

                                <QrCode size={22} />

                            </div>


                            <div className="allergy-card-action-content">

                                <h3>
                                    Share Your Allergy Information
                                </h3>

                                <p>
                                    Create a shareable QR card
                                    with your allergy information
                                    for restaurants and food staff.
                                </p>

                            </div>


                            <button
                                type="button"
                                className="allergy-card-open-button"
                                onClick={() =>
                                    navigate(
                                        "/allergy-card"
                                    )
                                }
                            >

                                <QrCode size={18} />

                                View My Allergy Card

                            </button>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* HOW PERSONALIZATION WORKS */}
                {/* ================================= */}

                <div className="personalization-info">

                    <div className="personalization-info-heading">

                        <Info size={20} />

                        <h3>
                            How personalization works
                        </h3>

                    </div>


                    <p>
                        Your allergy profile is compared
                        against detected ingredients during
                        food and label scans to highlight
                        potential risks.
                    </p>

                </div>


                {/* ================================= */}
                {/* IMPORTANT NOTE */}
                {/* ================================= */}

                <div className="profile-warning">

                    <div className="profile-warning-title">

                        <AlertTriangle size={18} />

                        <strong>
                            Important
                        </strong>

                    </div>


                    <p>
                        AllerGuard AI is an assistive
                        food-risk information system. It
                        does not guarantee that a food is
                        safe or allergen-free. Always verify
                        ingredients and cross-contact
                        information when allergy risk is
                        significant.
                    </p>

                </div>


            </div>

        </div>

    );

}


export default AllergyProfile;