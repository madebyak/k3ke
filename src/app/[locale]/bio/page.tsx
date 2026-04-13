"use client";

import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import RevealText from "@/components/animations/RevealText";

export default function BioPage() {
    const t = useTranslations();
    const locale = useLocale();
    const pathname = usePathname();

    const getTargetUrl = (targetLocale: string) => {
        if (!pathname) return `/${targetLocale}`;
        return pathname.replace(/^\/(en|ar)/, `/${targetLocale}`);
    };

    return (
        <div className="bg-white min-h-screen text-black font-mono selection:bg-black selection:text-white">
            <main className="min-h-screen p-6 md:p-12 flex flex-col justify-between">
                <header className="grid grid-cols-12 mb-12 md:mb-20 text-[10px] sm:text-xs md:text-base gap-x-2 md:gap-x-4">
                    <div className={`col-start-1 ${locale === "ar" ? "col-span-2" : "col-span-1"}`}>
                        <span className="cursor-pointer relative inline-block pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-black">
                            {t("nav.bio")}
                        </span>
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
                        <Link href={`/${locale}/contact`} className="cursor-pointer relative inline-block pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0_0.35_1)] hover:after:origin-bottom-left hover:after:scale-x-100">
                            {t("nav.contact")}
                        </Link>
                    </div>
                </header>

                {/* Bio Content — name on left, bio text on right */}
                <div className="flex-grow flex items-start pt-8">
                    <div className="grid grid-cols-12 w-full gap-x-4 items-start">

                        {/* Name — left side (col 1-4) */}
                        <div className="col-span-12 md:col-span-6">
                            <RevealText delay={0.2} duration={1.6}>
                                <h1 className="text-[14vw] sm:text-[12vw] md:text-[8vw] font-bold leading-[0.8] tracking-tighter uppercase rtl:text-right">
                                    {t("hero.firstName")}
                                    <br />
                                    {t("hero.lastName")}
                                </h1>
                            </RevealText>
                        </div>

                        {/* Bio text — right side (col 5-12) */}
                        <div className="col-span-12 md:col-start-5 md:col-span-8 mt-8 md:mt-0">
                            <RevealText delay={0.4} duration={1.2} stagger={0.03}>
                                <p className="text-sm md:text-base leading-relaxed text-zinc-700 max-w-prose rtl:text-right">
                                    {t("hero.bio")}
                                </p>
                            </RevealText>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
