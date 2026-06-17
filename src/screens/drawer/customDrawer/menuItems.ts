import {
    ComplainForm,
    ContactUs,
    Faq,
    LogOut,
    Notification,
    PrivcacyPlicy,
    TandC,
} from "../../../assets/images";

export const MenuItems = [
    { label: "Notification", icon: Notification, type: "screen", route: "NotificationScreen" },
    { label: "Privacy Policy", icon: PrivcacyPlicy, type: "web", url: "https://www.instantmudra.com/privacy_policy.html" },
    { label: "Terms & Condition", icon: TandC, type: "web", url: "https://www.instantmudra.com/terms_and_conditions.php" },
    { label: "FAQ", icon: Faq, type: "screen", route: "Faq" },
    { label: "Contact Us", icon: ContactUs, type: "screen", route: "ContactUsScreen" },
    { label: "Complain Form", icon: ComplainForm, type: "web", url: "https://www.instantmudra.com/complaint-form.php" },
    { label: "Logout", icon: LogOut, type: "action" },
];