"use client";

import { useTranslations, useLocale } from "next-intl";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import RevealText from "@/components/animations/RevealText";
import RevealImage from "@/components/animations/RevealImage";

export default function Home() {
    const t = useTranslations();
    const locale = useLocale();
    const pathname = usePathname();

    const getTargetUrl = (targetLocale: string) => {
        if (!pathname) return `/${targetLocale}`;
        // pathname from `next/navigation` includes the locale, e.g. "/en/bio".
        // We regex replace the exact leading locale folder with the new locale.
        return pathname.replace(/^\/(en|ar)/, `/${targetLocale}`);
    };

    return (
        <div className="bg-white min-h-screen text-black font-mono selection:bg-black selection:text-white">
            {/* Hero Section */}
            <main className="min-h-screen p-6 md:p-12 flex flex-col justify-between">
                {/* Top Header */}
                <header className="grid grid-cols-12 mb-12 md:mb-20 text-[10px] sm:text-xs md:text-base gap-x-2 md:gap-x-4">
                    {/* Bio: 1 col in English (short word), 2 cols in Arabic (long word) */}
                    <div className={`col-start-1 ${locale === "ar" ? "col-span-2" : "col-span-1"}`}>
                        <Link href={`/${locale}/bio`} className="cursor-pointer relative inline-block pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0_0.35_1)] hover:after:origin-bottom-left hover:after:scale-x-100">
                            {t("nav.bio")}
                        </Link>
                    </div>

                    {/* Work: col-start-2 in English, col-start-3 in Arabic */}
                    <div className={`${locale === "ar" ? "col-start-3 col-span-8" : "col-start-2 col-span-9"}`}>
                        <span className="cursor-pointer relative inline-block pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-black">
                            {t("nav.work")}
                        </span>
                    </div>

                    {/* En / Ar Language Switcher */}
                    <div className="col-start-11 col-span-1 flex gap-1 items-center">
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

                {/* Main Content Area w/ Name */}
                <div className="flex-grow flex items-center min-h-[50vh] relative">
                    <div className="grid grid-cols-12 w-full gap-x-4 items-center">
                        {/* Name Display - Col 1 to 5 */}
                        <div className="col-span-12 mt-8 md:mt-0 md:col-span-5 order-2 md:order-1">
                            <RevealText delay={0.2} duration={1.6}>
                                <h1 className={`text-[14vw] sm:text-[12vw] md:text-[8vw] font-bold tracking-tighter uppercase rtl:text-right ${locale === "ar" ? "leading-[1.1]" : "leading-[0.8]"}`}>
                                    {t("hero.firstName")}
                                    <br />
                                    {t("hero.lastName")}
                                </h1>
                            </RevealText>
                        </div>

                        {/* Empty Space on desktop */}
                        <div className="hidden md:block md:col-span-1 order-3 md:order-2"></div>

                        {/* Hero Image at Column 7 - Non-intrusive height on desktop */}
                        <div className="col-span-12 md:col-start-7 md:col-span-6 order-3 md:order-2 md:relative">
                            <div className="md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 md:w-full">
                                <RevealImage delay={0.3} duration={1.6}>
                                    <div className="relative overflow-hidden w-full">
                                        <Image
                                            src="/1773250254319-11472f46-9b0e-4ae4-a2a7-c6cba87ddf24.png"
                                            alt="Hussein Ibrahim"
                                            width={1200}
                                            height={900}
                                            className="w-full h-auto block"
                                        />
                                    </div>
                                </RevealImage>
                            </div>
                        </div>

                        {/* AKA K3KE Display - Col 4 to 5 */}
                        <div className="col-span-12 mt-4 md:col-start-4 md:col-span-2 text-left order-4 rtl:text-right">
                            <p className="text-xs md:text-sm font-medium text-zinc-500 uppercase tracking-widest">
                                {t("hero.aka")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Area within Hero */}
                <div className="grid grid-cols-12 gap-x-4 items-end mt-8 md:mt-12">
                    {/* Bottom Left Text -> Bio: same 5-col width as hero name */}
                    <div className="col-span-12 md:col-start-1 md:col-span-5 mb-8 md:mb-0 flex flex-col items-start text-left order-2 md:order-1 rtl:text-right rtl:items-end">
                        <RevealText delay={0.5} duration={1.2} stagger={0.05}>
                            <p className="text-sm md:text-base leading-relaxed text-zinc-900 rtl:text-right">
                                {t("hero.bio")}
                            </p>
                        </RevealText>
                    </div>

                    {/* Empty space middle col 6-8 */}
                    <div className="hidden md:block md:col-start-6 md:col-span-3 order-3 md:order-2"></div>

                    {/* Bottom Right Text -> Now Showreel */}
                    <div className="col-span-12 md:col-span-4 flex flex-col md:items-end md:text-end order-1 md:order-3 rtl:text-right rtl:items-end">
                        <RevealText delay={0.4} duration={1.2}>
                            <p className={`text-3xl md:text-5xl font-bold tracking-tight rtl:text-right ${locale === "ar" ? "leading-[1.2]" : "leading-[0.8]"}`}>
                                {t("hero.showreel")
                                    .split("\n")
                                    .map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                            </p>
                        </RevealText>
                    </div>
                </div>
            </main>

            {/* Selected Work Section */}
            <section className="p-6 md:p-12 pb-32 mt-32">
                <div className="grid grid-cols-12 gap-x-4 gap-y-6">

                    {/* Section Header */}
                    <div className="col-span-12 mb-12">
                        <RevealText delay={0.1}>
                            <h2 className="text-sm font-bold tracking-widest uppercase">
                                <span className="cursor-pointer relative inline-block pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0_0.35_1)] hover:after:origin-bottom-left hover:after:scale-x-100">
                                    {t("work.sectionLabel")}
                                </span>
                            </h2>
                        </RevealText>
                    </div>

                    {/* Grid Items (15 placeholders: 11 landscape, 4 portrait) */}

                    {/* 1 - Landscape (Center-ish) */}
                    <div className="col-span-12 md:col-start-3 md:col-span-8 aspect-video">
                        <RevealImage>
                            <div className="relative overflow-hidden w-full h-full">
                                <Image
                                    src="/1773262025407-3f747ec2-e6f1-4d39-9990-3f91aac79390.png"
                                    alt="Work #1"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </RevealImage>
                    </div>

                    {/* 2 - Landscape & 3 - Landscape (Side by side) */}
                    <div className="col-span-12 md:col-start-2 md:col-span-4 aspect-[822/1002]">
                        <RevealImage>
                            <div className="relative overflow-hidden w-full h-full">
                                <Image
                                    src="/Screenshot 2026-03-11 at 8.19.03 PM.png"
                                    alt="Work #2"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </RevealImage>
                    </div>
                    <div className="col-span-12 md:col-start-7 md:col-span-5 aspect-video md:aspect-[16/9] mt-2 md:mt-6">
                        <RevealImage delay={0.2}>
                            <div className="relative overflow-hidden w-full h-full">
                                <Image
                                    src="/Screenshot 2026-03-11 at 8.20.50 PM.png"
                                    alt="Work #3"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </RevealImage>
                    </div>

                    {/* 4 - Vertical */}
                    <div className="col-span-12 md:col-start-7 md:col-span-4 aspect-[1000/1148]">
                        <RevealImage>
                            <div className="relative overflow-hidden w-full h-full">
                                <Image
                                    src="/Screenshot 2026-03-11 at 11.57.36 PM.png"
                                    alt="Work #4"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </RevealImage>
                    </div>

                    {/* 5 - Landscape (Full-ish width) */}
                    <div className="col-span-12 md:col-start-2 md:col-span-10 aspect-video">
                        <RevealImage><div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400 font-bold text-lg">5</div></RevealImage>
                    </div>

                    {/* 6 - Vertical & 7 - Landscape */}
                    <div className="col-span-12 md:col-start-1 md:col-span-3 aspect-[2/3]">
                        <RevealImage><div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400 font-bold text-lg">6</div></RevealImage>
                    </div>
                    <div className="col-span-12 md:col-start-5 md:col-span-5 aspect-video md:aspect-[16/9] mt-4 md:mt-8">
                        <RevealImage delay={0.2}><div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400 font-bold text-lg">7</div></RevealImage>
                    </div>

                    {/* 8 - Landscape */}
                    <div className="col-span-12 md:col-start-3 md:col-span-4 aspect-[4/3]">
                        <RevealImage><div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400 font-bold text-lg">8</div></RevealImage>
                    </div>

                    {/* 9 - Vertical */}
                    <div className="col-span-12 md:col-start-10 md:col-span-3 aspect-[3/4] mt-4 md:-mt-40">
                        <RevealImage delay={0.1}><div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400 font-bold text-lg">9</div></RevealImage>
                    </div>

                    {/* 10 - Landscape & 11 - Landscape */}
                    <div className="col-span-12 md:col-start-1 md:col-span-5 aspect-[16/9]">
                        <RevealImage><div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400 font-bold text-lg">10</div></RevealImage>
                    </div>
                    <div className="col-span-12 md:col-start-7 md:col-span-6 aspect-[4/3]">
                        <RevealImage delay={0.2}><div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400 font-bold text-lg">11</div></RevealImage>
                    </div>



                </div>
            </section>

            {/* Footer Section */}
            <footer className="p-6 md:p-12 pb-6 min-h-screen flex flex-col justify-between">

                {/* Main Footer Content */}
                <div className="grid grid-cols-12 gap-x-4 mt-32">

                    {/* CONTACT Label */}
                    <div className="col-span-12 md:col-span-4 mb-12 md:mb-0">
                        <h2 className="text-sm font-bold tracking-widest uppercase">
                            <span className="cursor-pointer relative inline-block pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0_0.35_1)] hover:after:origin-bottom-left hover:after:scale-x-100">
                                {t("footer.sectionLabel")}
                            </span>
                        </h2>
                    </div>

                    {/* "Get in touch" Area */}
                    <div className="col-span-12 md:col-start-5 md:col-span-8 pt-4">
                        {/* Giant Heading */}
                        <RevealText duration={1.5}>
                            <Link href={`/${locale}/contact`} className="block w-full">
                                <h1 className="text-[14vw] sm:text-[12vw] md:text-[6.5vw] lg:text-[7vw] font-bold leading-[0.85] tracking-tighter mb-4 pb-4 cursor-pointer block w-full whitespace-nowrap relative after:absolute after:bottom-0 after:left-0 after:h-2 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0_0.35_1)] hover:after:origin-bottom-left hover:after:scale-x-100 rtl:text-right">
                                    {t("footer.headline.get")} {t("footer.headline.in")} {t("footer.headline.touch")}
                                </h1>
                            </Link>
                        </RevealText>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="grid grid-cols-12 gap-x-4 items-center mt-32 text-xs md:text-sm font-medium">
                    <div className="col-span-12 md:col-span-4 mb-4 md:mb-0">
                        {t("footer.copyright")}
                    </div>

                    <div className="col-span-12 md:col-span-4 text-left md:text-center mb-4 md:mb-0">
                        <a href="#" className="underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity">
                            {t("footer.credit")}
                        </a>
                    </div>

                    <div className="col-span-12 md:col-span-4 text-left md:text-right">
                        <a href="#" className="underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity flex items-center md:justify-end gap-1">
                            <span>↑</span> {t("footer.backToTop")}
                        </a>
                    </div>
                </div>

            </footer>
        </div>
    );
}
