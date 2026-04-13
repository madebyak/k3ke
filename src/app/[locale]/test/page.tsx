import { useTranslations } from "next-intl";

export default function TestPage() {
    const t = useTranslations("nav");

    return (
        <div>
            <h1>TRANSLATION TEST: {t("work")}</h1>
        </div>
    );
}
