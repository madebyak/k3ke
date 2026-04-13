"use client";

import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import RevealText from "@/components/animations/RevealText";

export default function ContactPage() {
    const t = useTranslations();
    const locale = useLocale();
    const pathname = usePathname();

    const getTargetUrl = (targetLocale: string) => {
        if (!pathname) return `/${targetLocale}`;
        return pathname.replace(/^\/(en|ar)/, `/${targetLocale}`);
    };

    return (
        <div className="bg-white min-h-screen text-black font-mono selection:bg-black selection:text-white">
            <main className="min-h-screen p-6 md:p-12 flex flex-col">
                <header className="grid grid-cols-12 mb-12 md:mb-20 text-[10px] sm:text-xs md:text-base gap-x-2 md:gap-x-4">
                    <div className={`col-start-1 ${locale === "ar" ? "col-span-2" : "col-span-1"}`}>
                        <Link
                            href={`/${locale}/bio`}
                            className="cursor-pointer relative inline-block pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0_0.35_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                        >
                            {t("nav.bio")}
                        </Link>
                    </div>

                    <div className={`${locale === "ar" ? "col-start-3 col-span-8" : "col-start-2 col-span-9"}`}>
                        <Link
                            href={`/${locale}`}
                            className="cursor-pointer relative inline-block pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0_0.35_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                        >
                            {t("nav.work")}
                        </Link>
                    </div>

                    {/* En / Ar Language Switcher */}
                    <div className="col-start-11 col-span-1 flex gap-2 items-center">
                        {locale === "en" ? (
                            <span className="font-medium opacity-100">En</span>
                        ) : (
                            <a
                                href={getTargetUrl("en")}
                                className="opacity-40 hover:opacity-100 transition-opacity"
                            >
                                En
                            </a>
                        )}
                        <span className="opacity-20 font-light">/</span>
                        {locale === "ar" ? (
                            <span className="font-medium opacity-100">Ar</span>
                        ) : (
                            <a
                                href={getTargetUrl("ar")}
                                className="opacity-40 hover:opacity-100 transition-opacity"
                            >
                                Ar
                            </a>
                        )}
                    </div>

                    <div className="col-start-12 col-span-1">
                        <span className="cursor-pointer relative inline-block pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-black">
                            {t("nav.contact")}
                        </span>
                    </div>
                </header>

                <div className="flex-grow flex flex-col justify-center px-4 md:px-12 max-w-5xl">
                    <RevealText delay={0} duration={1.2}>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[7vw] font-bold leading-[0.85] tracking-tighter uppercase mb-6 rtl:text-right">
                            {t("contactPage.heading")}
                        </h1>
                    </RevealText>

                    <RevealText delay={0.1} duration={1.1}>
                        <p className="text-base sm:text-lg md:text-2xl max-w-2xl mb-12 md:mb-16 text-zinc-600 rtl:text-right">
                            {t("contactPage.subtext")}
                        </p>
                    </RevealText>

                    <div className="flex flex-col gap-6 font-medium text-base md:text-lg">
                        <RevealText delay={0.15} duration={1}>
                            <div className="flex flex-col sm:flex-row sm:gap-4 rtl:text-right">
                                <span className="text-zinc-500 w-32 rtl:text-right">{t("contactPage.emailLabel")}</span>
                                <span className="rtl:text-right">{t("contactPage.emailValue")}</span>
                            </div>
                        </RevealText>

                        <RevealText delay={0.2} duration={1}>
                            <div className="flex flex-col sm:flex-row sm:gap-4 rtl:text-right">
                                <span className="text-zinc-500 w-32 rtl:text-right">{t("contactPage.phoneLabel")}</span>
                                <span className="rtl:text-right">{t("contactPage.phoneValue")}</span>
                            </div>
                        </RevealText>

                        <RevealText delay={0.25} duration={1}>
                            <div className="flex flex-col sm:flex-row sm:gap-4 rtl:text-right">
                                <a
                                    href={t("contactPage.instagramLink")}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity inline-block rtl:text-right"
                                >
                                    {t("contactPage.instagramLabel")}
                                </a>
                            </div>
                        </RevealText>
                    </div>
                </div>
            </main>
        </div>
    );
}
