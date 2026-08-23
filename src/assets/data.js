import { Coins, CreditCard, File, Files, LayoutDashboard, Receipt, RotateCcwClock, Share, Share2, Upload, Wallet } from "lucide-react";

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
        credits: 5,
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
        credits: 500,
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
        credits: 5000,
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
export const testimonials = [
    {
        id: 1,
        quote:
            "CloudNest made sharing project files incredibly simple. Uploading is fast, and public links work flawlessly.",
        author: "Sarah Johnson",
        handle: "@sarahcodes",
    },
    {
        id: 2,
        quote:
            "The interface is clean, intuitive, and feels like a lightweight version of Google Drive. Exactly what I needed.",
        author: "David Wilson",
        handle: "@davidbuilds",
    },
    {
        id: 3,
        quote:
            "I can securely upload files, organize them, and share them with just a few clicks. CloudNest has become part of my daily workflow.",
        author: "Emily Carter",
        handle: "@emilydev",
    },
];

export const FOOTER_CONSTANTS = [
    {
        url: "https://github.com/realsohel",
        logo: "https://img.icons8.com/fluent/30/000000/github.png",
    },
    {
        url: "https://www.linkedin.com/in/mohd-sohel-salmani/",
        logo: "https://img.icons8.com/fluent/30/000000/linkedin-2.png",
    },
    {
        url: "https://www.instagram.com/real_.sohel",
        logo: "https://img.icons8.com/fluent/30/000000/instagram-new.png",
    },
    {
        url: "https://x.com/real_sohel_",
        logo: "https://img.icons8.com/fluent/30/000000/twitter.png",
    },
];

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02",
        label: "Upload",
        icon: Upload,
        path: "/uploads",
    },
    {
        id: "03",
        label: "My-Files",
        icon: Files,
        path: "/my-files",
    },
    {
        id: "04",
        label: "Subscription",
        icon: CreditCard,
        path: "/subscription",
    },
    {
        id: "05",
        label: "Transactions",
        icon: Receipt,
        path: "/transactions",
    },
];