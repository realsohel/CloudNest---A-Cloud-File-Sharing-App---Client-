import { Coins, File, RotateCcwClock, Share, Share2, Upload, Wallet } from "lucide-react";

export const features = [
    {
        title: "Easy File Upload",
        icon: Upload,
        iconColor: 'red',
        description: "Quickly upload your files with our intuitive drag-and-drop interface."
    },
    {
        title: "Secure Storage",
        icon: Wallet,
        iconColor: 'green',
        description: "Your files are encrypted and stored securely in our cloud infrastructure."
    },
    {
        title: "Simple Sharing",
        icon: Share2,
        iconColor: 'purple',
        description: "Share files with anyone using secure links that you control."
    },
    {
        title: "Flexible Credits",
        icon: Coins,
        iconColor: 'blue',
        description: "Pay only for what you use with our credit-based system."
    },
    {
        title: "File Management",
        icon: File,
        iconColor: 'red',
        description: "Organize, preview, and manage your files from any device."
    },
    {
        title: "Transaction History",
        icon: RotateCcwClock,
        iconColor: 'orange',
        description: "Keep track of all your credit purchases and usage."
    }
]


export const pricingPlans = [
    {
        id: "Free",
        name: "Free",
        price: 0,
        description: "Perfect for getting started",
        popular: false,
        features: [
            "5 file uploads",
            "Basic file sharing",
            "7-day file retention",
            "Email support"
        ]
    },
    {
        id: "Premium",
        name: "Premium",
        price: 500,
        description: "For individuals with larger needs",
        popular: true,
        features: [
            "500 file uploads",
            "Advanced file sharing",
            "30-day file retention",
            "Priority email support",
            "File analytics"
        ]
    },
    {
        id: "Ultimate",
        name: "Ultimate",
        price: 2500,
        description: "For teams and businesses",
        popular: false,
        features: [
            "5000 file uploads",
            "Team sharing capabilities",
            "Unlimited file retention",
            "24/7 priority support",
            "Advanced analytics",
            "API access"
        ]
    }
];