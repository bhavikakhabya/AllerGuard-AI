import React from "react";

function FoodSVG({ type }) {
    if (type === "paneer") {
        return (
            <svg className="food-svg food-paneer" viewBox="0 0 120 120" aria-hidden="true">
                <ellipse cx="60" cy="76" rx="42" ry="14" fill="#e8d7ff" opacity=".65" />
                <path d="M22 50 Q60 28 98 50 L91 78 Q60 94 29 78Z" fill="#f2a65a" />
                <path d="M29 51 Q60 34 91 51 Q60 68 29 51Z" fill="#f7b86e" />
                <g fill="#fff4d8">
                    <rect x="39" y="48" width="12" height="10" rx="2" transform="rotate(8 45 53)" />
                    <rect x="58" y="44" width="12" height="10" rx="2" transform="rotate(-8 64 49)" />
                    <rect x="73" y="53" width="12" height="10" rx="2" transform="rotate(10 79 58)" />
                    <rect x="48" y="62" width="12" height="10" rx="2" transform="rotate(-5 54 67)" />
                </g>
                <circle cx="38" cy="43" r="4" fill="#69b78f" />
                <circle cx="82" cy="44" r="4" fill="#69b78f" />
            </svg>
        );
    }

    if (type === "vada") {
        return (
            <svg className="food-svg food-vada" viewBox="0 0 120 120" aria-hidden="true">
                <ellipse cx="60" cy="84" rx="43" ry="12" fill="#e8d7ff" opacity=".6" />
                <path d="M27 62 Q30 38 60 37 Q90 38 93 62 Q90 82 60 84 Q30 82 27 62Z" fill="#b66a35" />
                <ellipse cx="60" cy="55" rx="27" ry="16" fill="#d98947" />
                <ellipse cx="60" cy="55" rx="8" ry="5" fill="#f8e6c7" />
                <circle cx="42" cy="61" r="3" fill="#f1bd73" />
                <circle cx="77" cy="65" r="3" fill="#f1bd73" />
                <circle cx="57" cy="72" r="3" fill="#f1bd73" />
                <path d="M35 35 Q60 23 85 35" fill="none" stroke="#69b78f" strokeWidth="5" strokeLinecap="round" />
            </svg>
        );
    }

    if (type === "samosa") {
        return (
            <svg className="food-svg food-samosa" viewBox="0 0 120 120" aria-hidden="true">
                <ellipse cx="60" cy="87" rx="40" ry="10" fill="#e8d7ff" opacity=".55" />
                <path d="M60 24 L94 78 Q60 92 26 78Z" fill="#e8a84e" />
                <path d="M60 24 L70 75 Q60 83 50 75Z" fill="#f2bd62" opacity=".9" />
                <path d="M60 24 L92 78 Q76 84 70 75Z" fill="#d99135" opacity=".75" />
                <path d="M45 63 Q60 53 75 63" fill="none" stroke="#f7d88d" strokeWidth="4" strokeLinecap="round" />
                <circle cx="47" cy="70" r="3" fill="#69b78f" />
                <circle cx="66" cy="66" r="3" fill="#69b78f" />
            </svg>
        );
    }

    if (type === "biryani") {
        return (
            <svg className="food-svg food-biryani" viewBox="0 0 120 120" aria-hidden="true">
                <ellipse cx="60" cy="78" rx="40" ry="15" fill="#eadcff" opacity=".65" />
                <path d="M23 54 Q60 42 97 54 L89 78 Q60 91 31 78Z" fill="#f3c86b" />
                <path d="M29 56 Q60 48 91 56" fill="none" stroke="#fff3c4" strokeWidth="5" strokeLinecap="round" />
                <g stroke="#c47a3d" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M42 52l-5-9" />
                    <path d="M53 55l-2-11" />
                    <path d="M67 54l4-10" />
                    <path d="M78 57l7-8" />
                </g>
                <g fill="#69b78f">
                    <circle cx="45" cy="63" r="4" />
                    <circle cx="74" cy="67" r="4" />
                    <circle cx="58" cy="73" r="3" />
                </g>
            </svg>
        );
    }

    return (
        <svg className="food-svg food-dosa" viewBox="0 0 120 120" aria-hidden="true">
            <ellipse cx="60" cy="82" rx="44" ry="12" fill="#e8d7ff" opacity=".6" />
            <path d="M19 58 Q60 33 101 58 Q88 84 60 86 Q32 84 19 58Z" fill="#e3b35b" />
            <path d="M25 58 Q60 43 95 58 Q79 67 60 69 Q41 67 25 58Z" fill="#f1cb78" />
            <path d="M43 61 Q60 54 77 61 Q73 74 60 77 Q47 74 43 61Z" fill="#c97836" />
            <path d="M34 42 Q60 30 86 42" fill="none" stroke="#69b78f" strokeWidth="5" strokeLinecap="round" />
        </svg>
    );
}

function FoodDecor() {
    const foods = [
        ["paneer", "food-float-1"],
        ["vada", "food-float-2"],
        ["samosa", "food-float-3"],
        ["biryani", "food-float-4"],
        ["dosa", "food-float-5"],
        ["paneer", "food-float-6"],
        ["samosa", "food-float-7"],
        ["vada", "food-float-8"],
    ];

    return (
        <div className="food-decor-layer" aria-hidden="true">
            {foods.map(([type, position], index) => (
                <div className={`food-float ${position}`} key={`${type}-${index}`}>
                    <FoodSVG type={type} />
                </div>
            ))}
        </div>
    );
}

export default FoodDecor;
