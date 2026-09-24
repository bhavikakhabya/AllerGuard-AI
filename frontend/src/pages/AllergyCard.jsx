import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
    ShieldCheck,
    ArrowLeft,
    Copy,
    Printer,
    CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FoodDecor from "../components/FoodDecor";

export default function AllergyCard() {
    const navigate = useNavigate();

    const [allergies, setAllergies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                console.log("PROFILE RESPONSE:", data);

                /*
                 * Supports different backend response structures
                 */
                const profileAllergies =
                    data?.allergies ||
                    data?.user?.allergies ||
                    data?.profile?.allergies ||
                    [];

                console.log("ALLERGIES FOUND:", profileAllergies);

                setAllergies(profileAllergies);
            } catch (error) {
                console.error("Profile loading error:", error);
                setAllergies([]);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const allergyText =
        allergies.length > 0
            ? allergies
                .map(
                    (allergy) =>
                        `${allergy.name} — ${allergy.severity}`
                )
                .join("\n")
            : "No allergies listed";

    const qrText = `ALLERGUARD AI

FOOD ALLERGY PROFILE

Known Allergies:
${allergyText}

Please verify ingredients, preparation method, and possible cross-contact.

Assistive information only.
Does not guarantee allergen-free food.`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(qrText);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Copy failed:", error);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="allergy-card-page">
                <FoodDecor />

                <div className="allergy-card-loading">
                    Loading allergy profile...
                </div>
            </div>
        );
    }

    return (
        <div className="allergy-card-page">

            {/* Floating food SVGs */}
            <FoodDecor />

            {/* Back button */}
            <button
                className="allergy-card-back"
                onClick={() => navigate("/profile")}
            >
                <ArrowLeft size={18} />
                Back to Profile
            </button>

            <div className="allergy-card-container">

                {/* Header */}
                <div className="allergy-card-header">

                    <div className="allergy-card-brand">
                        <ShieldCheck size={28} />
                    </div>

                    <div>
                        <span>ALLERGUARD AI</span>

                        <h1>
                            FOOD ALLERGY PROFILE
                        </h1>
                    </div>

                </div>

                {/* QR */}
                <div className="allergy-card-qr">

                    <QRCodeCanvas
                        value={qrText}
                        size={240}
                        bgColor="#ffffff"
                        fgColor="#292535"
                        level="H"
                    />

                </div>

                {/* Known Allergies */}
                <div className="allergy-card-section">

                    <div className="allergy-card-section-title">

                        <ShieldCheck size={19} />

                        <span>
                            Known Allergies
                        </span>

                    </div>

                    {allergies.length > 0 ? (

                        <div className="allergy-card-allergies">

                            {allergies.map((allergy, index) => (

                                <div
                                    className="allergy-card-allergy"
                                    key={`${allergy.name}-${index}`}
                                >

                                    <div>
                                        <strong>
                                            {allergy.name}
                                        </strong>

                                        <span>
                                            Severity:{" "}
                                            {allergy.severity}
                                        </span>
                                    </div>

                                    <span
                                        className={`allergy-severity ${allergy.severity}`}
                                    >
                                        {allergy.severity}
                                    </span>

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="allergy-card-empty">
                            No allergies added to your profile.
                        </div>

                    )}

                </div>

                {/* Warning */}
                <div className="allergy-card-warning">

                    <CheckCircle2 size={20} />

                    <p>
                        Please verify ingredients, preparation
                        method, and possible cross-contact.
                    </p>

                </div>

                {/* Disclaimer */}
                <p className="allergy-card-disclaimer">
                    Assistive information only. Does not guarantee
                    allergen-free food.
                </p>

                {/* Buttons */}
                <div className="allergy-card-actions">

                    <button
                        className="allergy-card-action"
                        onClick={handleCopy}
                    >
                        {copied ? (
                            <>
                                <CheckCircle2 size={17} />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy size={17} />
                                Copy Details
                            </>
                        )}
                    </button>

                    <button
                        className="allergy-card-action primary"
                        onClick={handlePrint}
                    >
                        <Printer size={17} />
                        Print Card
                    </button>

                </div>

            </div>

        </div>
    );
}