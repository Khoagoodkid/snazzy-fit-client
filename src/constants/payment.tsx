import { CreditCard, Building2, Wallet } from "lucide-react";

export const paymentMethods = [
        {
            id: "credit-card",
            name: "Credit/Debit Card",
            description: "Pay securely with Visa, Mastercard, or American Express",
            icon: CreditCard,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            logos: [
                { text: "V", bg: "bg-blue-600" },
                { text: "MC", bg: "bg-red-600" },
                { text: "AE", bg: "bg-green-600" }
            ],
            isDefault: true
        },
        {
            id: "sepay",
            name: "SEPAY",
            description: "Single Euro Payments Area - Direct bank transfer for EU customers",
            icon: Building2,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            logos: [
                { text: "SEPA", bg: "bg-blue-600" }
            ],
            isDefault: false
        },
        {
            id: "google-pay",
            name: "Google Pay",
            description: "Pay quickly and securely with your Google account",
            icon: Wallet,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-600",
            logos: [
                { text: "G", bg: "bg-blue-600" },
                { text: "Pay", bg: "bg-green-600" }
            ],
            isDefault: false
        }
    ];