"use client"

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LitepaperPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div id="top"></div>
            {/* Google Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Noto+Sans:wght@600&family=Bruno+Ace&family=Archivo+Black&display=swap"
                rel="stylesheet"
            />

            {/* Fixed Background */}
            <div
                className="fixed inset-0 z-0 bg-black"
                style={{
                    backgroundImage: 'url(/landingPage/background.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            <div className="relative z-10 min-h-screen">
                {/* Navigation */}
                <nav className="sticky top-0 z-50" style={{ backgroundColor: 'rgba(36, 36, 36, 0.8)', borderBottom: '1px solid rgba(88, 101, 242, 0.2)' }}>
                    <div className="container mx-auto px-4 py-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
                                <Image
                                    src="/litepaperPage/logo_HP_Landscape.png"
                                    width={300}
                                    height={80}
                                    style={{ width: 'clamp(150px, 40vw, 300px)', height: 'auto' }}
                                    alt="Health Protocol"
                                />
                            </Link>
                            <Link
                                href="/"
                                className="rounded-lg font-semibold transition-all transform hover:scale-105 hover:opacity-80 whitespace-nowrap flex-shrink-0"
                                style={{
                                    backgroundColor: '#5865F2',
                                    color: '#242424',
                                    padding: 'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px)',
                                    fontSize: 'clamp(13px, 3vw, 16px)'
                                }}
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
                    {/* Header */}
                    <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 lg:p-10" style={{ backgroundColor: 'rgba(36, 36, 36, 0.3)', border: '1px solid rgba(88, 101, 242, 0.3)' }}>
                        {/* Logos Row */}
                        <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
                            <Image
                                src="/litepaperPage/logo_HS_Landscape.png"
                                alt="Health Shared Logo"
                                width={300}
                                height={80}
                                className="w-48 sm:w-56 md:w-64 lg:w-72 xl:max-w-xs h-auto"
                            />
                            <Image
                                src="/litepaperPage/logo_HP_Landscape.png"
                                alt="Health Protocol Logo"
                                width={300}
                                height={80}
                                className="w-48 sm:w-56 md:w-64 lg:w-72 xl:max-w-xs h-auto"
                            />
                        </div>

                        <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-center px-2" style={{ color: '#FFFFFF' }}>
                            Web 3.0 decentralised health - achieving better health by uniting stakeholders in online Communities.
                        </p>
                        <p className="italic text-xs sm:text-sm md:text-base leading-relaxed text-center max-w-3xl mx-auto px-2 sm:px-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Health is a human right, that the inequalities in existing health status are 'politically, socially and economically unacceptable' and that essential health care must be made 'accessible to individuals and families in the community through their full participation' (1)
                        </p>
                    </div>

                    {/* Table of Contents */}
                    <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl" style={{ backgroundColor: 'rgba(36, 36, 36, 0.3)', border: '1px solid rgba(88, 101, 242, 0.3)' }}>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 flex items-center gap-2 md:gap-3" style={{ color: '#5865F2' }}>
                            <span className="w-1.5 sm:w-2 h-6 sm:h-7 md:h-8 rounded-full" style={{ backgroundColor: '#5865F2' }}></span>
                            Contents
                        </h2>
                        <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 text-xs sm:text-sm md:text-base">
                            {[
                                { id: "abstract", title: "Abstract" },
                                { id: "background", title: "1.0 Background" },
                                { id: "problem", title: "2.0 The problem: An unsustainable Illness Economy and fragmented health ecosystem." },
                                { id: "solution", title: "3.0 The solution: Aligning health stakeholders via incentivised Decentralised Autonomous Communities." },
                                { id: "patient-activation", title: "3.1 Empowering people through 'Patient Activation' and 'Supported Self Management'", indent: 1 },
                                { id: "aligning-stakeholders", title: "3.2 Aligning health Stakeholders to incentivise Patient Activation via Communities.", indent: 1 },
                                { id: "market", title: "4.0 Market" },
                                { id: "web3", title: "5.0 Web3 for health promotion." },
                                { id: "web3-decentralised", title: "5.1 Decentralised token economy and its value to health", indent: 1 },
                                { id: "web3-token-flow", title: "5.2 Token Flow", indent: 1 },
                                { id: "web3-staking", title: "5.3 Token Staking to DAOs, TVL and Token burn.", indent: 1 },
                                { id: "web3-validation", title: "5.4 Trust-less Community DAO Validation", indent: 1 },
                                { id: "web3-utility", title: "5.5 Token utility", indent: 1 },
                                { id: "web3-concepts", title: "5.6 Token concepts", indent: 1 },
                                { id: "web3-concepts-type", title: "5.6.1 Token Type", indent: 2 },
                                { id: "web3-concepts-supply", title: "5.6.2 Token supply.", indent: 2 },
                                { id: "web3-concepts-allocation", title: "5.5.3 Token allocation (team, investors, community)", indent: 2 },
                                { id: "web3-concepts-sale", title: "5.6.4 Token sale model", indent: 2 },
                                { id: "web3-challenges", title: "5.7 Challenges", indent: 1 },
                                { id: "web3-challenges-regulatory", title: "5.7.1 Regulatory compliance", indent: 2 },
                                { id: "web3-challenges-volatility", title: "5.7.2 Market volatility", indent: 2 },
                                { id: "web3-challenges-tech", title: "5.7.3 Technological risks", indent: 2 },
                                { id: "roadmap", title: "6.0 Roadmap" },
                                { id: "roadmap-bootstrapping", title: "6.1 Bootstrapping phase", indent: 1 },
                                { id: "roadmap-bootstrapping-partners", title: "6.1.1 Partners", indent: 2 },
                                { id: "roadmap-bootstrapping-token", title: "6.1.2 Token adoption", indent: 2 },
                                { id: "roadmap-bootstrapping-comms", title: "6.1.3 Communications", indent: 2 },
                                { id: "roadmap-growth", title: "6.2 Growth phase", indent: 1 },
                                { id: "roadmap-growth-partners", title: "6.2.1 Partners.", indent: 2 },
                                { id: "roadmap-growth-token", title: "6.2.2 Token adoption", indent: 2 },
                                { id: "roadmap-growth-comms", title: "6.2.3 Communications", indent: 2 },
                                { id: "roadmap-labs", title: "6.3 'Labs' phase", indent: 1 },
                                { id: "roadmap-labs-partners", title: "6.3.1 Partners", indent: 2 },
                                { id: "roadmap-labs-token", title: "6.3.2 Token adoption", indent: 2 },
                                { id: "roadmap-labs-comms", title: "6.3.3 Communications", indent: 2 },
                                { id: "team", title: "7.0 Team" },
                                { id: "team-management", title: "7.1 Management team", indent: 1 },
                                { id: "team-clinical", title: "7.2 Clinical leaders for communities.", indent: 1 },
                                { id: "team-kol", title: "7.3 Key opinion leaders to promote tokenisation", indent: 1 },
                                { id: "team-development", title: "7.4 Development Team", indent: 1 },
                                { id: "team-crypto", title: "7.5 Crypto advisors", indent: 1 },
                                { id: "references", title: "8.0 References" },
                                { id: "appendix", title: "9.0 Appendix" }
                            ].map((item) => (
                                <li
                                    key={item.id}
                                    className={
                                        item.indent === 2 ? "ml-6 sm:ml-8 md:ml-12" :
                                            item.indent === 1 ? "ml-3 sm:ml-4 md:ml-8" : ""
                                    }
                                >
                                    <a
                                        href={`#${item.id}`}
                                        className="transition-colors inline-flex items-center gap-1.5 sm:gap-2 group hover:underline"
                                        style={{ color: '#00D7E9' }}
                                    >
                                        <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full group-hover:scale-150 transition-transform flex-shrink-0" style={{ backgroundColor: '#00D7E9' }}></span>
                                        <span className="break-words">{item.title}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Abstract */}
                    <section id="abstract" className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 scroll-mt-20 sm:scroll-mt-24">
                        <div className="rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 lg:p-10" style={{ backgroundColor: 'rgba(36, 36, 36, 0.2)', border: '1px solid rgba(0, 215, 233, 0.3)' }}>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6" style={{ color: '#00D7E9' }}>
                                Abstract
                            </h1>
                            <div className="space-y-3 sm:space-y-4 md:space-y-6 leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                <p>
                                    Tokenisation offers an ideal solution to align all health stakeholders into a web 3.0 decentralised economy.
                                </p>
                                <p>
                                    Healthcare costs associated with treating an ever-increasing burden of complications from chronic diseases grow unrelentingly and are unsustainable. Leading healthcare organisations including the NHS and WHO support the use of 'patient activation' and 'supported self management' in order to turn this tide. Patient activation through 'Communities of Practice' empowers people to become more engaged with their health, making better health choices resulting in better health, earlier treatment of illness and less cost.
                                </p>
                                <p className="font-medium" style={{ color: '#FF9400' }}>
                                    Tokenisation of Patient Activation through online Communities of Practice results in a win-win scenario for all stakeholders in population health. The Health-Shared token offers a unique opportunity to establish a decentralised solution with landscape shaping potential in health.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 1.0 Background */}
                    <section id="background" className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 scroll-mt-20 sm:scroll-mt-24">
                        <div className="rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 lg:p-10" style={{ backgroundColor: 'rgba(36, 36, 36, 0.2)', border: '1px solid rgba(88, 101, 242, 0.3)' }}>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6" style={{ color: '#5865F2' }}>
                                1.0 Background
                            </h1>
                            <div className="space-y-3 sm:space-y-4 md:space-y-6 leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                <p>
                                    The opening statement of this document is the 1978 call for community participation - the Alma Ata declaration by the WHO. Legacy activity to address this right involved training Community health workers modelled on China's 'Barefoot Doctors'. In theory, they acted as community 'change agents' who would make an impact on poor health behaviours and 'empower' communities to make joint decisions about health care (2).
                                </p>
                                <p className="font-medium" style={{ color: '#FF9400' }}>
                                    Today's world is digitally connected but physically fractured. Web3 digital health offers a far reaching and cost effective potential to achieve the ambitions of the 1978 declaration.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 2.0 The Problem */}
                    <section id="problem" className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 scroll-mt-20 sm:scroll-mt-24">
                        <div className="rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 lg:p-10" style={{ backgroundColor: 'rgba(36, 36, 36, 0.2)', border: '1px solid rgba(225, 118, 125, 0.3)' }}>
                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight" style={{ color: '#E1767D' }}>
                                2.0 The problem: An unsustainable Illness Economy and fragmented health ecosystem
                            </h1>
                            <div className="space-y-3 sm:space-y-4 md:space-y-6 leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                <p>
                                    Population ageing is endemic in developed countries. By 2050 the number of persons over 60 years is expected to double, from 901 million to nearly 2.1 billion (3). This puts pressure on health systems, increasing the demand for care, services, and technologies to prevent and treat noncommunicable diseases and chronic conditions associated with old age. Chronic noncommunicable diseases are responsible for 68% of world's deaths (4) and account for over 70% of healthcare spending in the US and European Union (5,6). Approximately 15 million people in England are living with a chronic condition (7), significantly impacting health-related quality of life (8).
                                </p>
                                <div className="p-3 sm:p-4 md:p-6 rounded-r-lg" style={{ backgroundColor: 'rgba(225, 118, 125, 0.15)', borderLeft: '3px solid #E1767D' }}>
                                    <p className="font-medium" style={{ color: '#E1767D' }}>
                                        The healthcare sector has a major impact on national economies, accounting, in the European Union, for 10% of GDP and 8% of the total workforce. UK healthcare costs have increased dramatically over the 21st century from £78.9 billion in 2000 to £269.5 billion in 2020 (9).  Policymakers including the EU have made statements like "the need to make health systems sustainable by making them more effective, accessible and resilient has been duly recognised by policy-makers at the EU and national level"  (10).
                                    </p>
                                </div>
                                <p>
                                    15 chronic conditions will cost the Global health economy $371 billion over the next 15 years (11,12). These 15 chronic conditions account for 80% of total healthcare spending (4). The drivers behind these conditions are 8 health related behaviours (4): smoking, alcohol consumption, physical inactivity, poor diet, poor adherence, poor stress management, insufficient sleep, and lack of health screening. Adhering to just 4 healthy behaviours has been shown to reduce the risk of developing type 2 diabetes by 93% and risk of having a myocardial infarction by 81% (13) .
                                </p>
                                <p>
                                    In order to re-focus on a 'prevention is better than cure' paradigm and empowering patients to self-care the currently siloed multiple stakeholders in the health journey need to work together.
                                </p>
                                <div
                                    className="p-3 sm:p-4 md:p-6 rounded-xl"
                                    style={{
                                        backgroundColor: 'rgba(88, 101, 242, 0.1)',
                                        border: '1px solid rgba(88, 101, 242, 0.3)',
                                    }}
                                >
                                    <p
                                        className="font-semibold mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base md:text-lg"
                                        style={{ color: '#5865F2' }}
                                    >
                                        Stakeholders include:
                                    </p>

                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 mb-3">
                                        {[
                                            'Patients',
                                            'Healthcare providers',
                                            'Payers',
                                            'Public health',
                                            'Policy makers',
                                            'Manufacturers of pharmaceuticals and medical devices (14).',
                                        ].map((stakeholder) => (
                                            <li
                                                key={stakeholder}
                                                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base"
                                                style={{ color: '#FFFFFF' }}
                                            >
                                                <span
                                                    className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full flex-shrink-0"
                                                    style={{ backgroundColor: '#00D7E9' }}
                                                ></span>
                                                <span>{stakeholder}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <p className="text-xs sm:text-sm md:text-base text-white">
                                        Collaboration between stakeholders currently lacks structure (15). Collaboration, if achieved, can have a potential ‘fly-wheel’ effect and improve outcomes whilst constraining costs (16).
                                    </p>
                                </div>

                            </div>
                        </div>
                    </section>

                    {/* 3.0 The Solution */}
                    <section id="solution" className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 scroll-mt-20 sm:scroll-mt-24">
                        <div className="rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 lg:p-10" style={{ backgroundColor: 'rgba(36, 36, 36, 0.2)', border: '1px solid rgba(0, 215, 233, 0.3)' }}>
                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight" style={{ color: '#00D7E9' }}>
                                3.0 The solution: Aligning health stakeholders via incentivised Decentralised Autonomous Communities.
                            </h1>

                            <div className="space-y-3 sm:space-y-4 md:space-y-6 leading-relaxed text-xs sm:text-sm md:text-base mb-6" style={{ color: '#FFFFFF' }}>
                                <p>
                                    Tokenisation has previously been used to incentivise patients into ‘rewardable actions’ (17). The size of the token reward was found to correlate with the likelihood of a user allowing access to their health information. Token rewards have been shown to relate to a three fold increase in adherence to activities of daily living (18) and also to participate in clinical trials in a simulation study (17).
                                </p>
                            </div>

                            {/* 3.1 Patient Activation */}
                            <div id="patient-activation" className="mb-6 sm:mb-7 md:mb-8 lg:mb-10 scroll-mt-20 sm:scroll-mt-24">
                                <div className="p-3 sm:p-4 md:p-6 rounded-xl mb-4 sm:mb-5 md:mb-6" style={{ backgroundColor: 'rgba(88, 101, 242, 0.1)', border: '1px solid rgba(88, 101, 242, 0.3)' }}>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight" style={{ color: '#5865F2' }}>
                                        3.1 Empowering people through 'Patient Activation' and 'Supported Self Management'
                                    </h2>
                                </div>
                                <div
                                    className="space-y-3 sm:space-y-4 md:space-y-6 leading-relaxed text-xs sm:text-sm md:text-base"
                                    style={{ color: '#FFFFFF' }}
                                >
                                    <p>
                                        'Patient activation' and 'Supported self-management' have the potential to promote better health and Quality of Life (QoL) outcomes through empowering individuals. The WHO defines patient empowerment as ‘a process through which people gain greater control over decisions and actions affecting their health’ (19), and is a priority area to improve healthcare outcomes (20).
                                    </p>

                                    <p>
                                        Patient activation and increased capacity to self manage can be promoted by Cognitive Behavioral Therapy or motivational interview approaches, but these strategies do not scale and are prohibitively expensive.
                                    </p>

                                    <p>
                                        Patient activation can be improved with other strategies i.e. using an online health record resulted in patients having higher rates of adherence to medication (21). Adhering to just four healthy behaviours has been shown to reduce the risk of developing type 2 diabetes by 93% and risk of having a myocardial infarction by 81% (12).
                                    </p>

                                    <p>
                                        The patient activation measure (PAM-13) is a 13-item questionnaire that has been used in over 700 peer-reviewed publications and is a well validated measurement tool which we intend to use as an indicator of patient empowerment. Higher PAM scores are associated with increased health promoting behaviour, such as regular check-ups, healthy diet, and regular exercise as well as reduced health-damaging behaviour such as smoking and illicit drug use (22). These are corroborated by lower body mass index scores, HbA1c levels, blood pressure, and cholesterol readings. Furthermore, PAM scores are predictive of the next year’s healthcare costs, with those with lower scores having significantly higher costs (19). Importantly, PAM scores can be impacted by interventions, with changes ranging from 2.5 to 6.5 on the 100-point scale (19).
                                    </p>
                                </div>

                            </div>

                            {/* 3.2 Aligning Stakeholders */}
                            <div
                                id="aligning-stakeholders"
                                className="mb-6 sm:mb-7 md:mb-8 lg:mb-10 scroll-mt-20 sm:scroll-mt-24"
                            >
                                <div
                                    className="p-3 sm:p-4 md:p-6 rounded-xl mb-4 sm:mb-5 md:mb-6"
                                    style={{
                                        backgroundColor: "rgba(255, 148, 0, 0.1)",
                                        border: "1px solid rgba(255, 148, 0, 0.3)",
                                    }}
                                >
                                    <h2
                                        className="text-lg sm:text-xl md:text-2xl font-bold leading-tight"
                                        style={{ color: "#FF9400" }}
                                    >
                                        3.2 Aligning health Stakeholders to incentivise Patient Activation via Communities
                                    </h2>
                                </div>

                                <div
                                    className="space-y-3 sm:space-y-4 md:space-y-6 leading-relaxed text-xs sm:text-sm md:text-base"
                                    style={{ color: "#FFFFFF" }}
                                >
                                    <p className="font-medium" style={{ color: "#FF9400" }}>
                                        Achieving patient activation is in the interests of all stakeholders in the health.
                                    </p>

                                    <ul className="space-y-3 sm:space-y-4 md:space-y-5">
                                        <li
                                            className="p-3 sm:p-4 md:p-5 rounded-xl"
                                            style={{
                                                backgroundColor: "rgba(36, 36, 36, 0.3)",
                                                borderLeft: "3px solid #5865F2",
                                            }}
                                        >
                                            <strong style={{ color: "#5865F2" }}>Everyday people</strong> benefit by achieving
                                            better outcomes for themselves and better quality of life through a gamified
                                            approach to activation.
                                        </li>

                                        <li
                                            className="p-3 sm:p-4 md:p-5 rounded-xl"
                                            style={{
                                                backgroundColor: "rgba(36, 36, 36, 0.3)",
                                                borderLeft: "3px solid #00D7E9",
                                            }}
                                        >
                                            <strong style={{ color: "#00D7E9" }}>Public Health</strong> — Better health and
                                            reduction of chronic disease and its complications achieves the goals of Public
                                            Health.
                                        </li>

                                        <li
                                            className="p-3 sm:p-4 md:p-5 rounded-xl"
                                            style={{
                                                backgroundColor: "rgba(36, 36, 36, 0.3)",
                                                borderLeft: "3px solid #FF9400",
                                            }}
                                        >
                                            <strong style={{ color: "#FF9400" }}>Government and Society</strong> benefit by
                                            reducing the economic and social burden of ill health.
                                        </li>

                                        <li
                                            className="p-3 sm:p-4 md:p-5 rounded-xl"
                                            style={{
                                                backgroundColor: "rgba(36, 36, 36, 0.3)",
                                                borderLeft: "3px solid #E1767D",
                                            }}
                                        >
                                            <strong style={{ color: "#E1767D" }}>Industry</strong> (pharma and med tech)
                                            benefit in a number of ways:
                                            <ul className="space-y-1.5 sm:space-y-2 mt-2 sm:mt-3 ml-3 sm:ml-4 md:ml-6">
                                                <li className="flex items-start gap-1.5 sm:gap-2">
                                                    <span
                                                        className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"
                                                        style={{ backgroundColor: "#E1767D" }}
                                                    ></span>
                                                    <span>
                                                        Patients achieve optimal outcomes from therapies and are more likely to seek
                                                        medical help and treatment earlier in their personal journeys.
                                                    </span>
                                                </li>

                                                <li className="flex items-start gap-1.5 sm:gap-2">
                                                    <span
                                                        className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"
                                                        style={{ backgroundColor: "#E1767D" }}
                                                    ></span>
                                                    <span>
                                                        Achieving good clinical results in the real world also protects the
                                                        health-economic analysis basis of their pricing.
                                                    </span>
                                                </li>

                                                <li className="flex items-start gap-1.5 sm:gap-2">
                                                    <span
                                                        className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"
                                                        style={{ backgroundColor: "#E1767D" }}
                                                    ></span>
                                                    <span>
                                                        Recruitment to clinical trials is more likely when people are activated (17).
                                                    </span>
                                                </li>

                                                <li className="flex items-start gap-1.5 sm:gap-2">
                                                    <span
                                                        className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"
                                                        style={{ backgroundColor: "#E1767D" }}
                                                    ></span>
                                                    <span>
                                                        Sharing of health data for new drug development is more likely when people
                                                        are activated.
                                                    </span>
                                                </li>
                                            </ul>
                                        </li>

                                        <li
                                            className="p-3 sm:p-4 md:p-5 rounded-xl"
                                            style={{
                                                backgroundColor: "rgba(36, 36, 36, 0.3)",
                                                borderLeft: "3px solid #5865F2",
                                            }}
                                        >
                                            <strong style={{ color: "#5865F2" }}>Healthcare providers</strong> (caregivers/
                                            clinics/ health systems) benefit from patient activation as the patients they
                                            treat will have better outcomes. Optimising care given is a marker of quality which
                                            is important in an increasingly ‘payment by results’ payment regime.
                                        </li>
                                    </ul>

                                    <p>
                                        Communities of practice (CoPs) are groups of people who share a concern, a set of
                                        problems, or a passion about a topic, and who deepen their knowledge and expertise by
                                        interacting on an ongoing basis (23). Online CoPs are increasingly recognised as a
                                        key enabler of better self-management by WHO and the NHS (24,25). Health-Shared
                                        communities empower people to ‘patient activation’ through the optimised functioning
                                        of online Communities of Practice.
                                    </p>

                                    <div
                                        className="my-6 sm:my-7 md:my-8 lg:my-10 p-3 sm:p-4 rounded-xl"
                                        style={{
                                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                                            border: "1px solid rgba(88, 101, 242, 0.2)",
                                        }}
                                    >
                                        <div className="relative w-full" style={{ paddingBottom: "66.5%" }}>
                                            <Image
                                                src="/litepaperPage/image9.png"
                                                alt="All stakeholders benefit from patient activation"
                                                fill
                                                className="rounded-lg object-contain"
                                            />
                                        </div>
                                        <p
                                            className="text-xs md:text-sm mt-2 sm:mt-3 md:mt-4 italic text-center px-2 sm:px-4"
                                            style={{ color: "rgba(255, 255, 255, 0.6)" }}
                                        >
                                            Figure 1. All stakeholders in the health journey benefit from patient activation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4.0 Market */}
                    <section id="market" className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 scroll-mt-20 sm:scroll-mt-24">
                        <div className="rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 lg:p-10" style={{ backgroundColor: 'rgba(36, 36, 36, 0.2)', border: '1px solid rgba(0, 215, 233, 0.3)' }}>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6" style={{ color: '#00D7E9' }}>
                                4.0 Market
                            </h1>
                            <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                <p className="text-base sm:text-lg md:text-xl font-semibold" style={{ color: '#FF9400' }}>
                                    The Global Health and Wellness economy is projected to cost £8.5 trillion by 2027 (38).
                                </p>

                                <div className="my-6 sm:my-7 md:my-8 lg:my-10 p-3 sm:p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(88, 101, 242, 0.2)' }}>
                                    <div className="relative w-full" style={{ paddingBottom: '45.5%' }}>
                                        <Image
                                            src="/litepaperPage/image8.png"
                                            alt="Market Analysis"
                                            fill
                                            className="rounded-lg object-contain"
                                        />
                                    </div>
                                    <p className="text-xs md:text-sm mt-2 sm:mt-3 md:mt-4 italic text-center px-2 sm:px-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                        Figure 2. SOM, SAM and TAM for Health-Shared.
                                    </p>
                                </div>
                                <div className="space-y-3 sm:space-y-4 md:space-y-6 leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                    <p>
                                       The total revenue for 2,193 healthcare companies listed on Reuters Aggregates reports is $1.89 trillion for LTM (26). 90% of listed companies have revenue ranging $10 million to $1 billion. Healthcare marketing budgets average 10% of revenue (27). This roughly equates to $2Bn. We assume that we can capture 10% of these budgets equating to 200M from industry alone. The Digital Therapeutics market has been projected to be worth $14.7B by 2027 with a CAGR >21% (28). This translates to a Serviceable Available Market of between $200M and $1.47Bn.
                                    </p>
                                    <p>
                                        The patient activation space is becoming more crowded with multiple entrants. Most fall into well defined categories including online Cognitive Behaviour Therapy/ Motivational Interviewing; Condition/ persona specific ‘personalised’ solutions; Online content sites; Activity gamification and patient communities. The critical dimensions to achieving better health outcomes, better quality of life and lower cost to society involve patient activation capability and scalability with platform economics. Typical market competitors are illustrated below.
                                    </p>
                                </div>

                                <div className="my-6 sm:my-7 md:my-8 lg:my-10 p-3 sm:p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(88, 101, 242, 0.2)' }}>
                                    <div className="relative w-full" style={{ paddingBottom: '60%' }}>
                                        <Image
                                            src="/litepaperPage/image11.png"
                                            alt="Competitor Analysis"
                                            fill
                                            className="rounded-lg object-contain"
                                        />
                                    </div>
                                    <p className="text-xs md:text-sm mt-2 sm:mt-3 md:mt-4 italic text-center px-2 sm:px-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                        Figure 3. Competitor analysis for potential solutions to transform from an illness to a health activation economy.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 5.0 Web3 */}
                    <section id="web3" className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 scroll-mt-20 sm:scroll-mt-24">
                        <div className="rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 lg:p-10" style={{ backgroundColor: 'rgba(36, 36, 36, 0.2)', border: '1px solid rgba(255, 148, 0, 0.3)' }}>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-7 md:mb-8" style={{ color: '#FF9400' }}>
                                5.0 Web3 for health promotion
                            </h1>

                            <div className="space-y-8 sm:space-y-9 md:space-y-10 lg:space-y-12">
                                {/* 5.1 */}
                                <div id="web3-decentralised" className="scroll-mt-20 sm:scroll-mt-24">
                                    <div className="p-3 sm:p-4 md:p-6 rounded-xl mb-4 sm:mb-5 md:mb-6" style={{ backgroundColor: 'rgba(88, 101, 242, 0.1)', border: '1px solid rgba(88, 101, 242, 0.3)' }}>
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight" style={{ color: '#5865F2' }}>
                                            5.1 Decentralised token economy and its value to health
                                        </h2>
                                    </div>
                                    <p className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        A decentralised web3 approach solves some of the core problems with the health ecosystem, namely, its fragmentation and the misaligned interests of key stakeholders. Tokenisation can align all health stakeholders to promote Patient Activation resulting in positive behaviour change at population scale. Communities function as a common mechanism through which multiple stakeholders can collaborate.

                                    </p>
                                    <p className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        The benefits stakeholders gain and hence the reasons to align and participate in Health-Shared communities can vary according to the stakeholder and have been enumerated in section 3.2. The Health-Shared token economy consists of the health stakeholders mentioned above as well as Degens and Validators. In this ecosystem, ‘health stakeholders’ are essentially Health Activation Partners.
                                    </p>
                                    <div className="my-6 sm:my-7 md:my-8 lg:my-10 p-3 sm:p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(88, 101, 242, 0.2)' }}>
                                        <div className="relative w-full" style={{ paddingBottom: '67.8%' }}>
                                            <Image
                                                src="/litepaperPage/image10.png"
                                                alt="Token Economy Components"
                                                fill
                                                className="rounded-lg object-contain"
                                            />
                                        </div>
                                        <p className="text-xs md:text-sm mt-2 sm:mt-3 md:mt-4 italic text-center px-2 sm:px-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                            Figure 4. Components of the Health-Shared token economy.
                                        </p>
                                    </div>
                                    <p
                                        className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base"
                                        style={{ color: '#FFFFFF' }}
                                    >
                                        Stakeholder/Activation partners and Community members’ motives have been described above.
                                        The remaining three components have essential functions:
                                    </p>

                                    <div className="space-y-3 sm:space-y-4 md:space-y-5 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        <p>
                                            <strong className="text-[#5865F2]">Community DAO:</strong> The DAO is responsible for on-boarding members
                                            and engaging them in relevant content creation. It establishes community needs
                                            (light and warm; explicit and tacit knowledge) through consensus. The DAO also
                                            facilitates further creation and scheduling of content for the community feed
                                            based on the results of the community Systemic Equation Model (SEM).
                                        </p>

                                        <p>
                                            <strong className="text-[#5865F2]">Degens:</strong> Stake tokens to a community DAO in the expectation of a yield.
                                        </p>

                                        <p>
                                            <strong className="text-[#5865F2]">Validators:</strong> Facilitate auditing of Community DAO operations.
                                        </p>
                                    </div>

                                </div>

                                {/* 5.2 */}
                                <div id="web3-token-flow" className="scroll-mt-20 sm:scroll-mt-24">
                                    <div className="p-3 sm:p-4 md:p-6 rounded-xl mb-4 sm:mb-5 md:mb-6" style={{ backgroundColor: 'rgba(88, 101, 242, 0.1)', border: '1px solid rgba(88, 101, 242, 0.3)' }}>
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight" style={{ color: '#5865F2' }}>
                                            5.2 Token Flow
                                        </h2>
                                    </div>
                                    <p className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        An overall schema for functioning of the Health-Shared token economy and how it incentivises all component parts of the health ecosystem is described below.
                                    </p>

                                    <div className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10">
                                        <div className="p-3 sm:p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(0, 215, 233, 0.2)' }}>
                                            <div className="relative w-full" style={{ paddingBottom: '102%' }}>
                                                <Image
                                                    src="/litepaperPage/image13.png"
                                                    alt="Token Flow Ecosystem"
                                                    fill
                                                    className="rounded-lg object-contain"
                                                />
                                            </div>
                                            <p
                                                className="text-xs md:text-sm mt-2 sm:mt-3 md:mt-4 italic text-center px-2 sm:px-4 mb-3"
                                                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                                            >
                                                Figure 5. How component parts of the Health-Shared ecosystem interact to
                                                achieve population-scale Patient Activation.
                                            </p>
                                        </div>
                                        <p
                                            className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base"
                                            style={{ color: '#FFFFFF' }}
                                        >
                                            Community DAOs are linked to territories but not necessarily exclusively.
                                            Multiple communities dealing with similar issues can occupy the same or
                                            overlapping territories and can serve differing groups. Positive interactions
                                            between content contributors and consumers are rewarded by Community DAOs.
                                            Health-Shared users are free to join any number of Community DAOs. Validation
                                            of community members is done via Oracles or KYC mechanisms, social graph
                                            analysis in conjunction with face-to-face Validators, who in return for
                                            staking and the work they perform, receive a yield.
                                            <br />
                                            <br />
                                            Community DAOs with verified members generate an activation score for the
                                            Community DAO, which is visible to Health Activation partners who can donate
                                            to relevant Community DAOs to amplify their effect.
                                            <br />
                                            <br />
                                            A simplified token flow is described below. It begins with Community DAOs
                                            issuing tokens to community members as a reward for interacting in the
                                            community and creating content.
                                            <br />
                                            <br />
                                            Other stakeholders can purchase tokens from an exchange to be used to augment
                                            the community token reward allocations. The interaction between directly
                                            community-earned tokens and stakeholder-supplemented incentivisation is shown
                                            in the figure below.
                                        </p>


                                        <div className="p-3 sm:p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(0, 215, 233, 0.2)' }}>
                                            <div className="relative w-full" style={{ paddingBottom: '79.5%' }}>
                                                <Image
                                                    src="/litepaperPage/image12.png"
                                                    alt="Token Flow Chart"
                                                    fill
                                                    className="rounded-lg object-contain"
                                                />
                                            </div>
                                            <p
                                                className="text-xs md:text-sm mt-2 sm:mt-3 md:mt-4 italic text-center px-2 sm:px-4 mb-3"
                                                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                                            >
                                                Figure 6. Flowchart demonstrating token flow. Demonstrating how Industry will
                                                incentivise DAO community activation activities by purchasing and distributing
                                                tokens via Community DAOs.
                                            </p>
                                        </div>
                                        <p
                                            className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base"
                                            style={{ color: '#FFFFFF' }}
                                        >
                                            Community member token holders can choose to hold tokens for appreciation over
                                            time, or redeem them for real-world rewards. Real-world rewards are a way of,
                                            for instance, incentivising community members to interact and support
                                            communities locally. The local nature of these real-world rewards is highly
                                            aligned to incentivise local people to act for their local communities.
                                            Redemption of tokens for real-world rewards will result in tokens being burned
                                            and lost to the general pool.
                                            <br />
                                            <br />
                                            Community DAOs will reward community members for engaging in a number of
                                            activities which are beneficial to community effectiveness. The magnitude of
                                            these rewards is determined by inference from the community Systemic Equation
                                            Model, designed to optimise community performance. This is described in the
                                            figure below. Identification of individuals in the community who are more
                                            likely to contribute has also been established (29). Such individuals can
                                            potentially be targeted for incentivisation.
                                        </p>

                                        <div className="p-3 sm:p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(0, 215, 233, 0.2)' }}>
                                            <div className="relative w-full" style={{ paddingBottom: '78%' }}>
                                                <Image
                                                    src="/litepaperPage/image15.png"
                                                    alt="Token Distribution"
                                                    fill
                                                    className="rounded-lg object-contain"
                                                />
                                            </div>
                                            <p className="text-xs md:text-sm mt-2 sm:mt-3 md:mt-4 italic text-center px-2 sm:px-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                                Flowchart demonstrating confluence of ‘earned’ tokens for rewardable community activities and ‘supplemented’ tokens issued via health activation partners.                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* 5.3 */}
                                <div id="web3-staking" className="scroll-mt-20 sm:scroll-mt-24">
                                    <div className="p-3 sm:p-4 md:p-6 rounded-xl mb-4 sm:mb-5 md:mb-6" style={{ backgroundColor: 'rgba(0, 215, 233, 0.1)', border: '1px solid rgba(0, 215, 233, 0.3)' }}>
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight" style={{ color: '#00D7E9' }}>
                                            5.3 Token Staking to DAOs, TVL and Token burn
                                        </h2>
                                    </div>
                                    <p className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Once the community model is established, community DAOs will be encouraged to act autonomously. They can raise capital in the form of tokens from Degen investors. They can use this capital to engage in activation activities including curating and creating content and rewarding community activism.  They can earn an income from stakeholder (industry and government partners) awards to support activation. After covering administration costs, they will disburse excess tokens to Degen investors as yield.
                                    </p>
                                    <p className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Investors can choose to stake DAOs based on their community activation metrics for a yield on the staked tokens. This staking mechanism will result in a percentage total value lock.
                                    </p>
                                    <p className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Community members who have earned tokens can redeem them for real world benefits provided by activation partners or reward networks. Redemption of tokens results in token burn. The combination of TVL and token burn creates deflationary pressure.                                    </p>
                                    <div className="my-6 sm:my-7 md:my-8 lg:my-10 p-3 sm:p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 148, 0, 0.2)' }}>
                                        <div className="relative w-full" style={{ paddingBottom: '70.4%' }}>
                                            <Image
                                                src="/litepaperPage/image14.png"
                                                alt="Token Staking Flow"
                                                fill
                                                className="rounded-lg object-contain"
                                            />
                                        </div>
                                        <p className="text-xs md:text-sm mt-2 sm:mt-3 md:mt-4 italic text-center px-2 sm:px-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                            Figure 8. Flow chart demonstrating Degen staking, yield and resulting total value lock.
                                        </p>
                                    </div>
                                </div>

                                {/* 5.4 */}
                                <div id="web3-validation" className="scroll-mt-20 sm:scroll-mt-24">
                                    <div className="p-3 sm:p-4 md:p-6 rounded-xl mb-4 sm:mb-5 md:mb-6" style={{ backgroundColor: 'rgba(225, 118, 125, 0.1)', border: '1px solid rgba(225, 118, 125, 0.3)' }}>
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight" style={{ color: '#E1767D' }}>
                                            5.4 Trust-less Community DAO Validation
                                        </h2>
                                    </div>
                                    <p className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Activation partners require assurance that the Community DAOs are achieving the desired common goal. This requires two objectives being met. The first is proof of humanity for community members and the second is to validate that the community DAOs are achieving measurable activation (PAM13 score). Below is a schema to achieve these aims.

                                    </p>
                                    <div className="my-6 sm:my-7 md:my-8 lg:my-10 p-3 sm:p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(225, 118, 125, 0.2)' }}>
                                        <div className="relative w-full" style={{ paddingBottom: '54.3%' }}>
                                            <Image
                                                src="/litepaperPage/image17.png"
                                                alt="DAO Validation"
                                                fill
                                                className="rounded-lg object-contain"
                                            />
                                        </div>
                                        <p className="text-xs md:text-sm mt-2 sm:mt-3 md:mt-4 italic text-center px-2 sm:px-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                            Figure 9. Flowchart demonstrating Community DAO validation.
                                        </p>
                                    </div>
                                    <p className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Proof of humanity can be achieved by using Social Graphs in conjunction with verification by Validators based in territories who can prove a sample of community members are real humans through face to face interaction. Proof of humanity can also be corroborated using Oracles ie in the UK, the National Health Service has a verification scheme which can be accessed via API call.                                    </p>
                                    <p className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Proof of effectiveness of Community DAOs should be via measurable and verifiable patient reported outcomes metrics (PROMS) - namely increment in the PAM13 score. Both sides of this assurance are measurable and verifiable and reportable to a sequencer who will report using a zero-knowledge roll up protocol.                                    </p>
                                    <p className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        With these two aspects assured, activation partners can invest into DAOs with confidence in their investment. Ultimately all validation functions will be processed programmatically on chain.                                    </p>
                                </div>

                                {/* 5.5 */}
                                <div id="web3-utility" className="scroll-mt-20 sm:scroll-mt-24">
                                    <div className="p-3 sm:p-4 md:p-6 rounded-xl mb-4 sm:mb-5 md:mb-6" style={{ backgroundColor: 'rgba(255, 148, 0, 0.1)', border: '1px solid rgba(255, 148, 0, 0.3)' }}>
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight" style={{ color: '#FF9400' }}>
                                            5.5 Token utility
                                        </h2>
                                    </div>
                                    <div className="space-y-3 sm:space-y-4 md:space-y-6 leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        <p>The utility to stakeholders can be seen in four categories:</p>
                                        <ul className="space-y-3 sm:space-y-4">
                                            <li className="p-3 sm:p-4 md:p-5 rounded-xl" style={{ backgroundColor: 'rgba(36, 36, 36, 0.3)', borderLeft: '3px solid #00D7E9' }}>
                                                <strong style={{ color: '#00D7E9' }}>Patient activation</strong> - Relevant health stakeholders can purchase tokens to disburse to community members who have earned tokens through community activity.
                                            </li>
                                            <li className="p-3 sm:p-4 md:p-5 rounded-xl" style={{ backgroundColor: 'rgba(36, 36, 36, 0.3)', borderLeft: '3px solid #5865F2' }}>
                                                <strong style={{ color: '#5865F2' }}>Real world rewards</strong> - Tokens can be redeemed for rewards via local Community DAOs ( in partnership with government or other partner organisations, eg gym memberships/ healthy lifestyle services discounts, health coaching, health insurance etc). Tokens redeemed for these rewards will be exchanged for Soul Bound NFTs by local Community DAOs. These NFTS can then be used. This will result in token burn.
                                            </li>
                                            <li className="p-3 sm:p-4 md:p-5 rounded-xl" style={{ backgroundColor: 'rgba(36, 36, 36, 0.3)', borderLeft: '3px solid #FF9400' }}>
                                                <strong style={{ color: '#FF9400' }}>Governance</strong> - Communities will act as DAOs. In order to have voting rights, community members must possess tokens. Representation of community members will be dependent on the amount of tokens held.
                                            </li>
                                        </ul>
                                        <p>This is demonstrated in the figure below.</p>


                                        <div className="my-6 sm:my-7 md:my-8 lg:my-10 p-3 sm:p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(88, 101, 242, 0.2)' }}>
                                            <div className="relative w-full" style={{ paddingBottom: '41.8%' }}>
                                                <Image
                                                    src="/litepaperPage/image16.png"
                                                    alt="Token Utility"
                                                    fill
                                                    className="rounded-lg object-contain"
                                                />
                                            </div>
                                            <p className="text-xs md:text-sm mt-2 sm:mt-3 md:mt-4 italic text-center px-2 sm:px-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                                Figure 10. Flowchart demonstrating token utility.
                                            </p>
                                        </div>

                                        <p className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                            The Structural Equation Model (SEM) analysing community interaction data will ascertain which aspects of community activity need to be incentivised at higher levels to maintain optimum community functioning. These outputs will adjust smart contract parameters which issue token rewards to community members.                                        </p>
                                        <p className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                            The role of the SEM analysis inputting into smart contracts which issue tokens to community members is demonstrated in the figure below.
                                        </p>


                                        <div className="my-6 sm:my-7 md:my-8 lg:my-10 flex justify-center">
                                            <div className="p-3 sm:p-4 rounded-xl w-full sm:max-w-sm md:max-w-md" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(88, 101, 242, 0.2)' }}>
                                                <div className="relative w-full" style={{ paddingBottom: '207.3%' }}>
                                                    <Image
                                                        src="/litepaperPage/image6.png"
                                                        alt="SEM Integration"
                                                        fill
                                                        className="rounded-lg object-contain"
                                                    />
                                                </div>
                                                <p className="text-xs md:text-sm mt-2 sm:mt-3 md:mt-4 italic text-center px-2 sm:px-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                                    Figure 11. Interaction between Structural Equation Model of factors affecting community outcomes and community DAO. This cycle ensures that there is continuous real world monitoring and adjustment to optimise community outcomes.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 5.6 */}
                                <div id="web3-concepts" className="scroll-mt-20 sm:scroll-mt-24">
                                    <div className="p-3 sm:p-4 md:p-6 rounded-xl mb-4 sm:mb-5 md:mb-6" style={{ backgroundColor: 'rgba(225, 118, 125, 0.1)', border: '1px solid rgba(225, 118, 125, 0.3)' }}>
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight" style={{ color: '#E1767D' }}>
                                            5.6 Token concepts
                                        </h2>
                                    </div>

                                    <div className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10">
                                        <div id="web3-concepts-type" className="scroll-mt-20 sm:scroll-mt-24">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#E1767D' }}>5.6.1 Token Type</h3>
                                            <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>The Health Coin will be an ERC-20 Token.</p>
                                        </div>

                                        <div id="web3-concepts-supply" className="scroll-mt-20 sm:scroll-mt-24">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#E1767D' }}>5.6.2 Token supply</h3>
                                            <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>Token supply will be deflationary. As the Health-Shared ecosystem grows, less incentivisation will be required for community members to create, share, invite, moderate etc and hence token supply will become harder.</p>
                                        </div>

                                        <div id="web3-concepts-allocation" className="scroll-mt-20 sm:scroll-mt-24">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#E1767D' }}>5.6.3 Token allocation (team, investors, community)</h3>
                                            <p className="mb-3 sm:mb-4 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>The Tokens will be minted and initially distributed through a Token Generation Event.
                                            </p>

                                            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(225, 118, 125, 0.3)' }}>
                                                <table className="w-full border-collapse min-w-[500px]" style={{ backgroundColor: 'rgba(36, 36, 36, 0.4)' }}>
                                                    <thead style={{ backgroundColor: 'rgba(225, 118, 125, 0.15)' }}>
                                                        <tr>
                                                            <th className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-left text-xs sm:text-sm md:text-base" style={{ color: '#E1767D', border: '1px solid rgba(225, 118, 125, 0.2)' }}>Recipient</th>
                                                            <th className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-center text-xs sm:text-sm md:text-base" style={{ color: '#E1767D', border: '1px solid rgba(225, 118, 125, 0.2)' }}>Allocation</th>
                                                            <th className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-center text-xs sm:text-sm md:text-base" style={{ color: '#E1767D', border: '1px solid rgba(225, 118, 125, 0.2)' }}>Unlock Cliff</th>
                                                            <th className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-center text-xs sm:text-sm md:text-base" style={{ color: '#E1767D', border: '1px solid rgba(225, 118, 125, 0.2)' }}>Post Cliff Vesting</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                        {[
                                                            { recipient: "Public sale", allocation: "4%", cliff: "0 months", vesting: "12 months" },
                                                            { recipient: "Community reserve", allocation: "58%", cliff: "0 months", vesting: "60 months" },
                                                            { recipient: "Pre-seed investors", allocation: "5%", cliff: "3 months", vesting: "24 months" },
                                                            { recipient: "Strategic investors", allocation: "8%", cliff: "3 months", vesting: "36 months" },
                                                            { recipient: "Core team", allocation: "22%", cliff: "12 months", vesting: "48 months" },
                                                            { recipient: "Token advisors", allocation: "2.5%", cliff: "12 months", vesting: "24 months" },
                                                            { recipient: "Global ambassadors", allocation: "0.50%", cliff: "12 months", vesting: "36 months" }
                                                        ].map((row, index) => (
                                                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "rgba(36, 36, 36, 0.2)" : "transparent" }}>
                                                                <td className="px-2 sm:px-3 md:px-4 py-2 md:py-3" style={{ border: '1px solid rgba(225, 118, 125, 0.2)' }}>{row.recipient}</td>
                                                                <td className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-center" style={{ border: '1px solid rgba(225, 118, 125, 0.2)' }}>{row.allocation}</td>
                                                                <td className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-center" style={{ border: '1px solid rgba(225, 118, 125, 0.2)' }}>{row.cliff}</td>
                                                                <td className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-center" style={{ border: '1px solid rgba(225, 118, 125, 0.2)' }}>{row.vesting}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div id="web3-concepts-sale" className="scroll-mt-20 sm:scroll-mt-24">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#E1767D' }}>5.6.4 Token sale model</h3>
                                            <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>Tokens will be disbursed through a TGE.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 5.7 */}
                                <div id="web3-challenges" className="scroll-mt-20 sm:scroll-mt-24">
                                    <div className="p-3 sm:p-4 md:p-6 rounded-xl mb-4 sm:mb-5 md:mb-6" style={{ backgroundColor: 'rgba(225, 118, 125, 0.1)', border: '1px solid rgba(225, 118, 125, 0.3)' }}>
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight" style={{ color: '#E1767D' }}>
                                            5.7 Challenges
                                        </h2>
                                    </div>

                                    <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
                                        <div id="web3-challenges-regulatory" className="scroll-mt-20 sm:scroll-mt-24">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#E1767D' }}>5.7.1 Regulatory compliance</h3>
                                            <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                We are compliant with region specific pharma and med tech codes of conduct and have a robust governance structure in place. Health-Shared is governed by a charter and oversight is through the board, an external governance advisory board and a clinical advisory group made up of recognised experts in their respective fields.                                            </p>
                                        </div>

                                        <div id="web3-challenges-volatility" className="scroll-mt-20 sm:scroll-mt-24">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#E1767D' }}>5.7.2 Market volatility</h3>
                                            <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                We will need to reserve a liquidity pool of tokens to be deployed responsively to maintain market liquidity.
                                            </p>
                                        </div>

                                        <div id="web3-challenges-tech" className="scroll-mt-20 sm:scroll-mt-24">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#E1767D' }}>5.7.3 Technological risks</h3>
                                            <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                Health-Shared platform is operational as is the ability to analyse and categorise content into light (explicit) and warm (content). We have a proven track record of being able to deliver technological solutions include the systemic equation model and the psychographics ML model. Token aspects will be managed and delivered by Ten, our blockchain partners.                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 6.0 Roadmap */}
                    <section id="roadmap" className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 scroll-mt-20 sm:scroll-mt-24">
                        <div className="rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 lg:p-10" style={{ backgroundColor: 'rgba(36, 36, 36, 0.2)', border: '1px solid rgba(88, 101, 242, 0.3)' }}>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6" style={{ color: '#5865F2' }}>
                                6.0 Roadmap
                            </h1>

                            {/* Route to Market Roadmap */}
                            <div
                                className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 leading-relaxed text-xs sm:text-sm md:text-base"
                                style={{ color: '#FFFFFF' }}
                            >
                                <p>
                                    Health-Shared has identified three phases in establishing fully functional tokenised
                                    communities with measurable population scale patient activation improvement. The
                                    strategy adopted is of <em>‘inverting the sales funnel’ (49)</em>. This relates to a
                                    B2B strategy rather than a B2C. The stakeholders we are partnering with are natural
                                    early adopters and have access to the population at large. Hence they represent our
                                    ‘entry wedge’ into the market at large.
                                </p>

                                <p className="font-medium" style={{ color: '#FF9400' }}>
                                    The route to market roadmap consists of:
                                </p>

                                <ol className="space-y-1.5 sm:space-y-2 ml-3 sm:ml-4 md:ml-6">
                                    <li className="flex items-center gap-2 sm:gap-3">
                                        <span
                                            className="flex-shrink-0 w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm"
                                            style={{ backgroundColor: '#5865F2', color: '#FFFFFF' }}
                                        >
                                            1
                                        </span>
                                        Bootstrapping phase
                                    </li>

                                    <li className="flex items-center gap-2 sm:gap-3">
                                        <span
                                            className="flex-shrink-0 w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm"
                                            style={{ backgroundColor: '#00D7E9', color: '#242424' }}
                                        >
                                            2
                                        </span>
                                        Growth phase
                                    </li>

                                    <li className="flex items-center gap-2 sm:gap-3">
                                        <span
                                            className="flex-shrink-0 w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm"
                                            style={{ backgroundColor: '#FF9400', color: '#242424' }}
                                        >
                                            3
                                        </span>
                                        ‘Labs’ phase
                                    </li>
                                </ol>
                            </div>


                            <div className="my-6 sm:my-7 md:my-8 lg:my-10 p-3 sm:p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(88, 101, 242, 0.2)' }}>
                                <div className="relative w-full" style={{ paddingBottom: '49.4%' }}>
                                    <Image
                                        src="/litepaperPage/image18.png"
                                        alt="Product Roadmap"
                                        fill
                                        className="rounded-lg object-contain"
                                    />
                                </div>
                                <p className="text-xs md:text-sm mt-2 sm:mt-3 md:mt-4 italic text-center px-2 sm:px-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                    Figure 12. Product roadmap showing key milestones.
                                </p>
                            </div>

                            <div className="space-y-8 sm:space-y-9 md:space-y-10 lg:space-y-12 mt-8 sm:mt-9 md:mt-10">
                                {/* 6.1 Bootstrapping */}
                                <div id="roadmap-bootstrapping" className="scroll-mt-20 sm:scroll-mt-24">
                                    <div className="p-3 sm:p-4 md:p-6 rounded-xl mb-4 sm:mb-5 md:mb-6" style={{ backgroundColor: 'rgba(88, 101, 242, 0.1)', border: '1px solid rgba(88, 101, 242, 0.3)' }}>
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight" style={{ color: '#5865F2' }}>6.1 Bootstrapping phase</h2>
                                    </div>
                                    <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
                                        <div id="roadmap-bootstrapping-partners" className="scroll-mt-20 sm:scroll-mt-24">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#5865F2' }}>6.1.1 Partners</h3>
                                            <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                In this phase, all community DAOs will be created and managed by Health-Shared on behalf of partners. This phase is currently seeking partnerships with local government public health departments. Contracts are undertaken to establish and run local communities for specific conditions which are priorities for the local government. Our pilot community is ‘Diabetes and Weight Management’ in the London Borough of Kensington and Chelsea. Through the Borough infrastructure, we will reach all residents who this community is relevant to or who may be interested or have affected friends or family. This is estimated to be around 30-40,000 people in a population of 170,000.                                            </p>
                                            <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                We are also partnering with other early adopter organisations including healthcare networks who are paid according to a capitation model and are heavily incentivised to reduce the burden of illness. We are in early discussions with a large US healthcare network in the state of Maryland for this.                                                </p>
                                        </div>
                                        <div id="roadmap-bootstrapping-token" className="scroll-mt-20 sm:scroll-mt-24">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#5865F2' }}>6.1.2 Token adoption</h3>
                                            <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                In this phase, the tokens will be issued for community activism and burned on redemption of local government sponsored health promotion and healthy eating offers. No open trading will occur and corporate buying will not be promoted.                                            </p>
                                        </div>
                                        <div id="roadmap-bootstrapping-comms" className="scroll-mt-20 sm:scroll-mt-24">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#5865F2' }}>6.1.3 Communications</h3>
                                            <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                Communications will be focussed around the benefits of communities and the ‘paying it forward’ recognition of early community members. Key opinion leaders who span industry and healthcare will be recruited to be ambassadors for the value proposition that Health-Shared offers. These ambassadors will co-create regular pieces of content to lay the foundation of the growth phase. We will also promote the patient activation activities we are co-delivering with local government public health departments to attract new partnerships.                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* 6.2 Growth */}
                                <div id="roadmap-growth" className="scroll-mt-20 sm:scroll-mt-24">
                                    <div className="p-3 sm:p-4 md:p-6 rounded-xl mb-4 sm:mb-5 md:mb-6" style={{ backgroundColor: 'rgba(0, 215, 233, 0.1)', border: '1px solid rgba(0, 215, 233, 0.3)' }}>
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight" style={{ color: '#00D7E9' }}>6.2 Growth phase</h2>
                                    </div>
                                    <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
                                        <div id="roadmap-growth-partners" className="scroll-mt-20 sm:scroll-mt-24">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#00D7E9' }}>6.2.1 Partners</h3>
                                            <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                In this phase we will be widening our outreach to large healthcare organisations as the bootstrapping phase will have lowered the barrier for these organisations to engage. This phase will also include partnering with organisations who will be keen to access the audience we have built in the bootstrapping phase including specialist societies and patient associations.                                            </p>
                                        </div>
                                        <div id="roadmap-growth-token" className="scroll-mt-20 sm:scroll-mt-24">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#00D7E9' }}>6.2.2 Token adoption</h3>
                                            <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                We may develop and deploy analytics systems to be able to identify individuals who are relevant to industry stakeholders in an anonymous manner and increase the number of tokens they earn from community activism.                                            </p>
                                        </div>
                                        <div id="roadmap-growth-comms" className="scroll-mt-20 sm:scroll-mt-24">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#00D7E9' }}>6.2.3 Communications</h3>
                                            <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                We will publicise the successes of the bootstrapping phase and begin to talk about how tokens incentivise communities to activate everyday people.                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* 6.3 Labs */}
                                <div id="roadmap-labs" className="scroll-mt-20 sm:scroll-mt-24">
                                    <div className="p-3 sm:p-4 md:p-6 rounded-xl mb-4 sm:mb-5 md:mb-6" style={{ backgroundColor: 'rgba(255, 148, 0, 0.1)', border: '1px solid rgba(255, 148, 0, 0.3)' }}>
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight" style={{ color: '#FF9400' }}>6.3 'Labs' phase</h2>
                                    </div>
                                    <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
                                        <div id="roadmap-labs-partners" className="scroll-mt-20 sm:scroll-mt-24">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#FF9400' }}>6.3.1 Partners</h3>
                                            <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                In the ‘labs’ phase, health-shared will no longer need to manage all communities centrally as the token incentivisation mechanisms will be in place to facilitate Community DAOs to function. We will engage with pharma and medical technology companies with the proposition of facilitating them to activate everyday people relevant to conditions they would like to support.                                            </p>
                                        </div>
                                        <div id="roadmap-labs-token" className="scroll-mt-20 sm:scroll-mt-24">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#FF9400' }}>6.3.2 Token adoption</h3>
                                            <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                Tokens will be listed on exchanges. The pharmaceutical and medical technology industry will be facilitated in purchasing and disbursing incentive tokens to relevant Health-Shared users.                                            </p>
                                        </div>
                                        <div id="roadmap-labs-comms" className="scroll-mt-20 sm:scroll-mt-24">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#FF9400' }}>6.3.3 Communications</h3>
                                            <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                A change in communications to tokens being critical to mass, population scale patient activation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 7.0 Team */}
                    <section id="team" className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 scroll-mt-20 sm:scroll-mt-24">
                        <div className="rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 lg:p-10" style={{ backgroundColor: 'rgba(36, 36, 36, 0.2)', border: '1px solid rgba(88, 101, 242, 0.3)' }}>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-7 md:mb-8" style={{ color: '#5865F2' }}>
                                7.0 Team
                            </h1>

                            {/* 7.1 Management team */}
                            <div id="team-management" className="mb-10 sm:mb-11 md:mb-12 lg:mb-16 scroll-mt-20 sm:scroll-mt-24">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-7 md:mb-8" style={{ color: '#00D7E9' }}>7.1 Management team</h2>

                                <div className="grid sm:grid-cols-2 gap-6 sm:gap-7 md:gap-8 lg:gap-10">
                                    {/* Prof Usman Jaffer */}
                                    <div className="p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl text-center" style={{ backgroundColor: 'rgba(0, 215, 233, 0.08)', border: '1px solid rgba(0, 215, 233, 0.3)' }}>
                                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden" style={{ border: '3px solid rgba(0, 215, 233, 0.3)' }}>
                                            <Image
                                                src="/litepaperPage/usman-jaffer.jpg"
                                                alt="Prof Usman Jaffer"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2" style={{ color: '#00D7E9' }}>Prof Usman Jaffer</h3>
                                        <p className="mb-2 sm:mb-3 text-xs sm:text-sm md:text-base" style={{ color: '#00D7E9', opacity: 0.8 }}>CEO</p>
                                        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#FFFFFF' }}>
                                            Usman Jaffer is a Consultant Vascular Surgeon and academic. Usman founded health-shared as a result of lived experiences.                                        </p>
                                    </div>

                                    {/* Carl Dempsey */}
                                    <div className="p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl text-center" style={{ backgroundColor: 'rgba(88, 101, 242, 0.08)', border: '1px solid rgba(88, 101, 242, 0.3)' }}>
                                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden" style={{ border: '3px solid rgba(88, 101, 242, 0.3)' }}>
                                            <Image
                                                src="/litepaperPage/carl-dempsey.jpg"
                                                alt="Carl Dempsey"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2" style={{ color: '#5865F2' }}>Carl Dempsey</h3>
                                        <p className="mb-2 sm:mb-3 text-xs sm:text-sm md:text-base" style={{ color: '#5865F2', opacity: 0.8 }}>Chief Strategy Officer</p>
                                        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#FFFFFF' }}>
                                            Carl and Usman met over a health encounter. Carl immediately felt drawn to support the benefit health-shared has to offer to the world. Carl has over 20 years of senior board level leadership at J&J dealing with strategic partnerships.                                        </p>
                                    </div>

                                    {/* Nikolai Matiushev */}
                                    <div className="p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl text-center" style={{ backgroundColor: 'rgba(255, 148, 0, 0.08)', border: '1px solid rgba(255, 148, 0, 0.3)' }}>
                                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden" style={{ border: '3px solid rgba(255, 148, 0, 0.3)' }}>
                                            <Image
                                                src="/litepaperPage/nikolai-matiushev.jpg"
                                                alt="Nikolai Matiushev"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2" style={{ color: '#FF9400' }}>Nikolai Matiushev</h3>
                                        <p className="mb-2 sm:mb-3 text-xs sm:text-sm md:text-base" style={{ color: '#FF9400', opacity: 0.8 }}>Chief Technical Officer</p>
                                        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#FFFFFF' }}>
                                            Nikolai Matiushev is a senior polyglot software developer. Nikolai has 20+ years of experience spanning multiple industries from mobile, embedded and web development to enterprise systems at major investment banks and hedge funds.
                                            Nikolai holds MSc degree in Applied Mathematics and Physics from Moscow Institute of Physics and Technology (National Research University)                                        </p>
                                    </div>

                                    {/* Dr Sadie Syed */}
                                    <div className="p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl text-center" style={{ backgroundColor: 'rgba(225, 118, 125, 0.08)', border: '1px solid rgba(225, 118, 125, 0.3)' }}>
                                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden" style={{ border: '3px solid rgba(225, 118, 125, 0.3)' }}>
                                            <Image
                                                src="/litepaperPage/sadie-syed.jpg"
                                                alt="Dr Sadie Syed"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2" style={{ color: '#E1767D' }}>Dr Sadie Syed</h3>
                                        <p className="mb-2 sm:mb-3 text-xs sm:text-sm md:text-base" style={{ color: '#E1767D', opacity: 0.8 }}>Director of Content</p>
                                        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#FFFFFF' }}>
                                            Dr Sadie Syed is a Consultant Anaesthetist at Imperial College London and Director of Simulation and also leads the ‘How Our Teams Transform Program’ at Imperial.                                        </p>
                                    </div>

                                    {/* Arif Minhas */}
                                    <div className="p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl text-center" style={{ backgroundColor: 'rgba(0, 215, 233, 0.08)', border: '1px solid rgba(0, 215, 233, 0.3)' }}>
                                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden" style={{ border: '3px solid rgba(0, 215, 233, 0.3)' }}>
                                            <Image
                                                src="/litepaperPage/arif-minhas.jpg"
                                                alt="Arif Minhas"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2" style={{ color: '#00D7E9' }}>Arif Minhas</h3>
                                        <p className="mb-2 sm:mb-3 text-xs sm:text-sm md:text-base" style={{ color: '#00D7E9', opacity: 0.8 }}>Head, Strategic Partnership</p>
                                        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#FFFFFF' }}>
                                            Arif’s experience spans nearly 20 years in new business development and strategic partnerships with a strong trans-Atlantic & pan-European focus, He was also formerly part of Charing Cross Symposium.

                                        </p>
                                    </div>

                                    {/* Prof Usman Khan */}
                                    <div className="p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl text-center" style={{ backgroundColor: 'rgba(88, 101, 242, 0.08)', border: '1px solid rgba(88, 101, 242, 0.3)' }}>
                                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden" style={{ border: '3px solid rgba(88, 101, 242, 0.3)' }}>
                                            <Image
                                                src="/litepaperPage/usman-khan.jpg"
                                                alt="Prof Usman Khan"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2" style={{ color: '#5865F2' }}>Prof Usman Khan</h3>
                                        <p className="mb-2 sm:mb-3 text-xs sm:text-sm md:text-base" style={{ color: '#5865F2', opacity: 0.8 }}>Non-exec Director</p>
                                        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#FFFFFF' }}>
                                            Usman Khan is a past executive chair of the European patient forum. He is chair of the Motor Neuron Disease Association and is a public health expert. He has had multiple roles in the patient associations as well as health policy and governance.

                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 7.2 Clinical leaders */}
                            <div id="team-clinical" className="mb-10 sm:mb-11 md:mb-12 lg:mb-16 scroll-mt-20 sm:scroll-mt-24">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6" style={{ color: '#5865F2' }}>7.2 Clinical leaders for communities</h2>
                                <p className="mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                    We have a strong team of clinical leaders to manage clinical issues related to communities.
                                </p>
                                <div className="p-3 sm:p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(88, 101, 242, 0.2)' }}>
                                    <div className="relative w-full" style={{ paddingBottom: '25.8%' }}>
                                        <Image
                                            src="/litepaperPage/image25.png"
                                            alt="Clinical Leaders"
                                            fill
                                            className="rounded-lg object-contain"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 7.3 Key opinion leaders */}
                            <div id="team-kol" className="mb-10 sm:mb-11 md:mb-12 lg:mb-16 scroll-mt-20 sm:scroll-mt-24">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6" style={{ color: '#FF9400' }}>7.3 Key opinion leaders to promote tokenisation</h2>
                                <p className="text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                    We have KOLs in the wings, ready to go.
                                </p>

                                <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl text-center" style={{ backgroundColor: 'rgba(255, 148, 0, 0.08)', border: '1px solid rgba(255, 148, 0, 0.3)' }}>
                                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden" style={{ border: '3px solid rgba(255, 148, 0, 0.3)' }}>
                                        <Image
                                            src="/litepaperPage/image1.png"
                                            alt="Professor Nadey Hakim"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2" style={{ color: '#FF9400' }}>Professor Nadey Hakim</h3>
                                    <p className="mb-2 sm:mb-3 text-xs sm:text-sm md:text-base" style={{ color: '#FF9400', opacity: 0.8 }}>Head of KOL relationships</p>
                                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#FFFFFF' }}>
                                        Professor Hakim is a world renowned transplant surgeon and past Vice president of the Royal Society of Medicine. He holds numerous positions on various boards and organisations and is International relations lead at the Cleveland Clinic London.                                    </p>
                                </div>
                            </div>

                            {/* 7.4 Development Team */}
                            <div id="team-development" className="mb-10 sm:mb-11 md:mb-12 lg:mb-16 scroll-mt-20 sm:scroll-mt-24">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6" style={{ color: '#00D7E9' }}>7.4 Development Team</h2>
                                <p className="mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                    Our development team is five members strong and has a proven track record of delivering complex technical solutions.
                                </p>
                                <div className="p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl" style={{ backgroundColor: 'rgba(0, 215, 233, 0.08)', border: '1px solid rgba(0, 215, 233, 0.3)' }}>
                                    <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        {["Alexey Slyusur", "Ivan Suslov", "Ivan Kukhshinov", "Ruslan Kazarinskov"].map((name) => (
                                            <li key={name} className="flex items-center gap-1.5 sm:gap-2">
                                                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#00D7E9' }}></span>
                                                {name}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                                        <div className="pt-4 sm:pt-5 md:pt-6" style={{ borderTop: '1px solid rgba(0, 215, 233, 0.3)' }}>
                                            <h3 className="font-bold mb-1.5 sm:mb-2 text-sm sm:text-base md:text-lg" style={{ color: '#00D7E9' }}>Ben Szubert</h3>
                                            <p className="mb-1.5 sm:mb-2 text-xs sm:text-sm" style={{ color: '#00D7E9', opacity: 0.8 }}>Machine Learning Engineer</p>
                                            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#FFFFFF' }}>
                                                Ben has worked at a number of health startups and has been co-author on our tensor decomposition paper. He has also helped set up our psychographics pipeline.

                                            </p>
                                        </div>
                                        <div className="pt-4 sm:pt-5 md:pt-6" style={{ borderTop: '1px solid rgba(0, 215, 233, 0.3)' }}>
                                            <h3 className="font-bold mb-1.5 sm:mb-2 text-sm sm:text-base md:text-lg" style={{ color: '#00D7E9' }}>Cain Clark</h3>
                                            <p className="mb-1.5 sm:mb-2 text-xs sm:text-sm" style={{ color: '#00D7E9', opacity: 0.8 }}>Statistician</p>
                                            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#FFFFFF' }}>
                                                Cain is associate professor in statistics at the University of Birmingham and has an interest in Systemic Equation Modelling which is important to the underlying monitoring of community function and prioritisation of token allocation for community activism.                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 7.5 Crypto advisors */}
                            <div id="team-crypto" className="mb-6 sm:mb-7 md:mb-8 scroll-mt-20 sm:scroll-mt-24">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6" style={{ color: '#5865F2' }}>7.5 Crypto advisors</h2>
                                <div className="p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl" style={{ backgroundColor: 'rgba(88, 101, 242, 0.08)', border: '1px solid rgba(88, 101, 242, 0.3)' }}>
                                    <div className="mb-4 sm:mb-5 md:mb-6 p-3 sm:p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(88, 101, 242, 0.2)' }}>
                                        <div className="relative w-full" style={{ paddingBottom: '40.9%' }}>
                                            <Image
                                                src="/litepaperPage/image2.jpg"
                                                alt="Ten Protocol"
                                                fill
                                                className="rounded-lg object-contain"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs sm:text-sm md:text-base leading-relaxed" style={{ color: '#FFFFFF' }}>
                                        Ten is a Layer 2 rollup that hyper-scales and encrypts Ethereum. Ten allows Ethereum smart contracts to contain both public and private elements without changing the user or developer experience. Ten is supporting this TGE.                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 8.0 References */}
                    <section id="references" className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 scroll-mt-20 sm:scroll-mt-24">
                        <div className="rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 lg:p-10" style={{ backgroundColor: 'rgba(36, 36, 36, 0.2)', border: '1px solid rgba(88, 101, 242, 0.3)' }}>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6" style={{ color: '#5865F2' }}>
                                8.0 References
                            </h1>
                            <div className="space-y-2 sm:space-y-2.5 md:space-y-3 text-xs sm:text-xs md:text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                <p>1. Report of the International Conference on Primary Health Care, Alma-Ata, USSR, [Internet]. WHO; 1978. Available from: https://www.who.int/publications/i/item/9241800011</p>
                                <p>2. Nations U. Department of Economic and Social Affairs. Popul Div [Internet]. 2015 [cited 2024 Jan 13]; Available from: https://www.un.org/en/development/desa/policy/wess/wess_archive/1967wes_part2.pdf</p>
                                <p>3. Organization WH. Global status report on noncommunicable diseases 2014 [Internet]. World Health Organization; 2014 [cited 2024 Jan 13]. Available from: https://apps.who.int/iris/bitstream/handle/10665/148114/?sequence=6</p>
                                <p>4. Tackling Chronic Disease Report 2010. [Internet]. World Economic Forum; Available from: https://www3.weforum.org/docs/WEF_HE_TacklingChronicDisease_Report_2010.pdf</p>
                                <p>5. Gerteis J, Izrael D, Deitz D, LeRoy L, Ricciardi R, Miller T, et al. Multiple chronic conditions chartbook. Rockville (MD): Agency for Healthcare Research and Quality; 2014. AHRQ Publications No, Q14-0038.[Google Scholar]; 2014.</p>
                                <p>6. Long-term conditions compendium of Information: 3rd edition. Department of Health, UK; 2012.</p>
                                <p>7. Megari K. Quality of life in chronic disease patients. Health Psychol Res. 2013 Sep 23;1(3):27.</p>
                                <p>8. Healthcare expenditure, UK Health Accounts provisional estimates: 2020. Office for National Statistics; 2022.</p>
                                <p>9. Commission E. Joint Report on Health Care and Long-Term Care Systems and Fiscal Sustainability. Eur Comm Bruss. 2016;</p>
                                <p>10. Health Care Survey [Internet]. AON Hewitt; 2012. Available from: https://www.aon.com/attachments/human-capital-consulting/2012_Health_Care_Survey_final.pdf</p>
                                <p>11. Investing in global health: A common objective [Internet]. Wold Health Organisation; 2023. Available from: https://www.who.int/news-room/commentaries/detail/investing-in-global-health--a-common-objective</p>
                                <p>12. Healthy Living Is the Best Revenge: Findings From the European Prospective Investigation Into Cancer and Nutrition–Potsdam Study. Arch Intern Med. 2009 Aug 10;169(15):1355.</p>
                                <p>13. Wu J, Wang Y, Tao L, Peng J. Stakeholders in the healthcare service ecosystem. Procedia CIRP. 2019;83:375–9.</p>
                                <p>14. Kanter RM. Becoming PALs: Pooling, Allying, and Linking Across Companies. Acad Manag Perspect. 1989 Aug;3(3):183–93.</p>
                                <p>15. How To Achieve The Healthcare Flywheel Effect [Internet]. [cited 2024 Jan 13]. Available from: https://www.forbes.com/sites/forbesbusinesscouncil/2023/11/10/synergy-of-technology-and-services-organizations-the-healthcare-flywheel-effect/#</p>
                                <p>16. Health promotion glossary. World Health Organization; Geneva; 1998.</p>
                                <p>17. Health 2020: A European policy framework and strategy for the 21st century. World Health Organization. Regional Office for Europe.World Health Organization; 2013.</p>
                                <p>18. Wright E, Darer J, Tang X, Thompson J, Tusing L, Fossa A, et al. Sharing Physician Notes Through an Electronic Portal is Associated With Improved Medication Adherence: Quasi-Experimental Study. J Med Internet Res. 2015 Oct 8;17(10):e226.</p>
                                <p>19. Hibbard JH, Greene J. What The Evidence Shows About Patient Activation: Better Health Outcomes And Care Experiences; Fewer Data On Costs. Health Aff (Millwood). 2013 Feb;32(2):207–14.</p>
                                <p>20. Edgar WB, Albright KS. Knowledge management activities: Conceptual foundations and research issues. J Inf Sci. 2023 Dec;49(6):1656–76.</p>
                                <p>21. Wenger, Etienne & McDermott, Richard & Snyder, William. Cultivating Communities of Practice: A Guide to Managing Knowledge. 2002.</p>
                                <p>22. WHO guideline on self-care interventions for health and well-being, 2022 revision. Geneva. [Internet]. World Health Organization; 2022. Available from: https://www.ncbi.nlm.nih.gov/books/NBK582359/</p>
                                <p>23. NHS Long Term Plan [Internet]. NHS; Available from: https://www.longtermplan.nhs.uk/wp-content/uploads/2019/08/nhs-long-term-plan-version-1.2.pdf</p>
                                <p>24. Ranmuthugala G, Plumb JJ, Cunningham FC, Georgiou A, Westbrook JI, Braithwaite J. How and why are communities of practice established in the healthcare sector? A systematic review of the literature. BMC Health Serv Res. 2011 Dec;11(1):273.</p>
                                <p>25. Lesser EL, Storck J. Communities of practice and organizational performance. IBM Syst J. 2001;40(4):831–41.</p>
                                <p>26. Prusak L. Knowledge in Organisations [Internet]. 0 ed. Routledge; 2009 [cited 2024 Jan 12]. Available from: https://www.taylorfrancis.com/books/9781136390104</p>
                                <p>27. Polanyi M. Personal knowledge: towards a post-critical philosophy. Nachdr. Chicago: Univ. of Chicago Press; 2009. 428 p.</p>
                                <p>28. Gabbay J, le May A. Mindlines: making sense of evidence in practice. Br J Gen Pract J R Coll Gen Pract. 2016 Aug;66(649):402–3.</p>
                                <p>29. Noar AP, Jeffery HE, Ponniah HS, Jaffer U. The aims and effectiveness of communities of practice in healthcare: A systematic review. PLOS ONE. 2023 Oct 10;18(10):e0292343.</p>
                                <p>30. Winkelman WJ, Choo CW. Provider‐sponsored virtual communities for chronic patients: improving health outcomes through organizational patient‐centred knowledge management. Health Expect. 2003 Dec;6(4):352–8.</p>
                                <p>31. Peer Mentoring and Financial Incentives to Improve Glucose Control in African American Veterans. Ann Intern Med. 2012 Mar 20;156(6):I–50.</p>
                                <p>32. Richardson CR, Buis LR, Janney AW, Goodrich DE, Sen A, Hess ML, et al. An Online Community Improves Adherence in an Internet-Mediated Walking Program. Part 1: Results of a Randomized Controlled Trial. J Med Internet Res. 2010 Dec 17;12(4):e71.</p>
                                <p>33. Changing patient behavior: the next frontier in healthcare value report. [Internet]. McKinsey & Company; 2012. Available from: https://www.mckinsey.com/industries/healthcare-systems-and-services/our-insights/changing-patient-behavior-the-next-frontier-in-healthcare</p>
                                <p>34. Cyril S, Smith BJ, Possamai-Inesedy A, Renzaho AMN. Exploring the role of community engagement in improving the health of disadvantaged populations: a systematic review. Glob Health Action. 2015 Dec;8(1):29842.</p>
                                <p>35. Bild E, Pachana NA. Social prescribing: A narrative review of how community engagement can improve wellbeing in later life. J Community Appl Soc Psychol. 2022 Nov;32(6):1148–215.</p>
                                <p>36. Oktay LA, Abuelgasim E, Abdelwahed A, Houbby N, Lampridou S, Normahani P, et al. Factors Affecting Engagement in Web-Based Health Care Patient Information: Narrative Review of the Literature. J Med Internet Res. 2021 Sep 23;23(9):e19896.</p>
                                <p>37. Michie S, Van Stralen MM, West R. The behaviour change wheel: A new method for characterising and designing behaviour change interventions. Implement Sci. 2011 Dec;6(1):42.</p>
                                <p>38. WELLNESS ECONOMY STATISTICS & FACTS [Internet]. Global Wellness Institute; Available from: https://globalwellnessinstitute.org/press-room/statistics-and-facts/</p>
                                <p>39. Guni A, Normahani P, Davies A, Jaffer U. Harnessing Machine Learning to Personalize Web-Based Health Care Content. J Med Internet Res. 2021 Oct 19;23(10):e25497.</p>
                                <p>40. Health B. Why the Cambridge Analytica Scandal is Important for Health Data [Internet]. Medium. 2018 [cited 2024 Jan 14]. Available from: https://bowheadhealth.medium.com/why-the-cambridge-analytica-scandal-is-important-for-health-data-db6b9fa1a17e</p>
                                <p>41. Robinson D, Cybenko G. A Cyber-based Behavioral Model. J Def Model Simul Appl Methodol Technol. 2012 Jul;9(3):195–203.</p>
                                <p>42. Robinson DJ, Berk VH, Cybenko GV. Online Behavioral Analysis and Modeling Methodology (OBAMM). In: Liu H, Salerno JJ, Young MJ, editors. Social Computing, Behavioral Modeling, and Prediction [Internet]. Boston, MA: Springer US; 2008 [cited 2024 Jan 14]. p. 100–9. Available from: http://link.springer.com/10.1007/978-0-387-77672-9_12</p>
                                <p>43. Poushpas S, Normahani P, Kisil I, Szubert B, Mandic DP, Jaffer U. Tensor decomposition and machine learning for the detection of arteriovenous fistula stenosis: An initial evaluation. PloS One. 2023;18(7):e0286952.</p>
                                <p>44. Powezka K, Pettipher A, Hemakom A, Adjei T, Normahani P, Mandic DP, et al. A Pilot Study of Heart Rate Variability Synchrony as a Marker of Intraoperative Surgical Teamwork and Its Correlation to the Length of Procedure. Sensors. 2022 Nov 21;22(22):8998.</p>
                                <p>45. Powezka K, Adjei T, Von Rosenberg W, Normahani P, Goverdovsky V, Standfield NJ, et al. A pilot study of preoperative heart rate variability predicting pain during local anesthetic varicose vein surgery. J Vasc Surg Venous Lymphat Disord. 2019 May;7(3):382–6.</p>
                                <p>46. Von Rosenberg W, Chanwimalueang T, Adjei T, Jaffer U, Goverdovsky V, Mandic DP. Resolving Ambiguities in the LF/HF Ratio: LF-HF Scatter Plots for the Categorization of Mental and Physical Stress from HRV. Front Physiol. 2017 Jun 14;8:360.</p>
                                <p>47. Normahani P, Makwana N, Von Rosenberg W, Syed S, Mandic DP, Goverdovsky V, et al. Self-assessment of surgical ward crisis management using video replay augmented with stress biofeedback. Patient Saf Surg. 2018 Dec;12(1):6.</p>
                                <p>48. Belle A, Hargraves RH, Najarian K. An Automated Optimal Engagement and Attention Detection System Using Electrocardiogram. Comput Math Methods Med. 2012;2012:1–12.</p>
                                <p>49. Marketing 101: What is funnel creation? | MarketingSherpa Blog [Internet]. [cited 2024 Jan 14]. Available from: https://sherpablog.marketingsherpa.com/website-and-landing-page-design/marketing-101-funnel-creation/</p>
                            </div>
                        </div>
                    </section>

                    {/* 9.0 Appendix */}
                    <section id="appendix" className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 scroll-mt-20 sm:scroll-mt-24">
                        <div className="rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 lg:p-10" style={{ backgroundColor: 'rgba(36, 36, 36, 0.2)', border: '1px solid rgba(255, 148, 0, 0.3)' }}>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-7 md:mb-8" style={{ color: '#FF9400' }}>
                                9.0 Appendix
                            </h1>

                            <div className="space-y-8 sm:space-y-9 md:space-y-10 lg:space-y-12">
                                <div>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-3.5 md:mb-4" style={{ color: '#5865F2' }}>Knowledge management in Communities of Practice</h2>
                                    <p className="leading-relaxed mb-3 sm:mb-3.5 md:mb-4 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Knowledge management is defined as 'the collection of methods related to creating, sharing, using, and managing the knowledge and information'. Tacit knowledge, first described by Polanyi, the Hungarian-British philosopher in 1966, as opposed to explicit knowledge, is very difficult to directly codify and share. It can be communicated through direct observation and imitation as well as through conversations, stories, and metaphors.
                                    </p>
                                    <p className="leading-relaxed mb-3 sm:mb-3.5 md:mb-4 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        CoPs are an effective form of knowledge management that have been successfully used in the business sector and increasingly so in healthcare. CoPs are highly effective knowledge transfer vehicles particularly for difficult to communicate tacit knowledge and can foster interdisciplinary care by bringing practitioners from a range of specialities together.
                                    </p>
                                    <p className="leading-relaxed mb-3 sm:mb-3.5 md:mb-4 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        We have reviewed CoPs and have reported encouraging outcomes. Interestingly, the most important facilitator reported was strong clinical involvement. Online CoPs centred around particular chronic conditions place the patient as a practitioner of their own health. Here, they will be able to learn from both the explicit and tacit knowledge of fellow patients as well as healthcare professionals with expertise in their condition.
                                    </p>
                                    <p className="leading-relaxed mb-3 sm:mb-3.5 md:mb-4 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Randomised controlled trials show how peer support interventions can lead to improved glucose control and increased adherence to lifestyle interventions. Furthermore, hospital costs are 24% higher for socially isolated individuals than for socially connected individuals. Community participation has been linked to improved real world outcomes particularly in disadvantaged communities. Other related concepts such as social prescribing have shown similar benefits. Additionally, community participation has been shown to reduce attrition rates in internet mediated health programs.
                                    </p>
                                    <p className="leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        The combination of the knowledge gained (explicit and tacit) as well as social support provided by Health-Shared CoP provides all the ingredients which have been shown to be effective at promoting healthy change. Our group has previously published on factors affecting engagement with online health content. We highlighted many factors relevant to content features including community origin and emotionally relevant, and relevance.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-3.5 md:mb-4" style={{ color: '#00D7E9' }}>Behaviour Change through Communities</h2>
                                    <p className="leading-relaxed mb-3 sm:mb-3.5 md:mb-4 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        The COM-B model of behaviour change frames the different facets required for an individual to change their behaviour. They need to have the capability, opportunity, and motivation to generate the desired behaviour. Capability is defined as the psychological and physical requirements to perform the task. Opportunity represents the physical and social factors outside of the individual that make the behaviour possible, and motivation is defined as both reflective and automatic brain activity that energises and directs behaviour.
                                    </p>
                                    <p className="leading-relaxed mb-3 sm:mb-3.5 md:mb-4 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Health-Shared CoPs will allow patients to find those dealing with similar health related issues to share experiences and problem solve providing them with the capability and motivation to make the behaviour changes they need. As a novel form of social support in their lives, patients will also have the opportunity to engage in healthy behaviours. They will also have trust in the information they are receiving as they will be interacting with trained healthcare professionals with expertise in their particular condition.
                                    </p>
                                    <p className="leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Online CoPs are well placed to incorporate many of the intervention techniques for behaviour change namely education through the content they are exposed to on the platform as well as modelling from expert patients who have experience and skill at living with their condition. But also enablement, training and incentivisation.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-3.5 md:mb-4" style={{ color: '#5865F2' }}>Community Establishment</h2>
                                    <p className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        A Health-Shared CoP includes a core and periphery. The core comprises net content creators and represents all stakeholders in the patient journey - patients, healthcare providers, patient and healthcare provider organisations and industry. The periphery are net content consumers - i.e. people seeking answers. CoP are moderated by human in the loop AI system to prevent bias and ensure safeguarding.
                                    </p>

                                    <div className="my-6 sm:my-7 md:my-8 lg:my-10 p-3 sm:p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(88, 101, 242, 0.2)' }}>
                                        <div className="relative w-full" style={{ paddingBottom: '48.7%' }}>
                                            <Image
                                                src="/litepaperPage/image3.png"
                                                alt="Community Structure"
                                                fill
                                                className="rounded-lg object-contain"
                                            />
                                        </div>
                                        <p className="text-xs md:text-sm mt-2 sm:mt-3 md:mt-4 italic text-center px-2 sm:px-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                            Figure. Structure of Health-Shared CoP. Core community members comprise of all key stakeholders in the patient journey. Periphery community members consist of people seeking information.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-3.5 md:mb-4" style={{ color: '#FF9400' }}>Flagship Communities</h2>
                                    <p className="leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Health-Shared will provide national flagship communities for the 15 chronic conditions which account for 80 percent of global health costs.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-3.5 md:mb-4" style={{ color: '#00D7E9' }}>Local Communities</h2>
                                    <p className="leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Health-Shared is seeking to partner with local government and local public health services to provide locally based communities for conditions which have been identified as local priorities. There may be much overlap in the explicit content between the flagship and the local communities. The reason people may wish to join one or more local communities over and above flagship communities is the variation in tacit knowledge which may well be local specific.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-3.5 md:mb-4" style={{ color: '#5865F2' }}>Communities as Distributed Autonomous Organisations</h2>
                                    <p className="leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Communities should advocate for the needs of the members. Themes relevant to the community are established from thematic analysis of stakeholder interviews, user generated content and user search behaviour. Priorities will be set via polling of the community members. This data will provide a unique and objective view of community needs which can be shared with partners.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-3.5 md:mb-4" style={{ color: '#00D7E9' }}>Process for establishing Health-Shared community</h2>
                                    <p className="leading-relaxed mb-3 sm:mb-3.5 md:mb-4 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Health-Shared has a unique methodology for establishment of Communities. A protocolised sequence is following:
                                    </p>
                                    <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        {[
                                            "Establishment of stakeholder steering committee",
                                            "Nomination of ambassadors to form core of the community",
                                            "Initial discovery interviews are done with ambassadors covering issues across four seasons",
                                            "Thematic analysis is done using proprietary AI co-pilot technology",
                                            "Content plan is constructed across four seasons in line with themes emerging from discovery interviews",
                                            "Continuous evaluation using PAM13 and SF12 quality of life instrument"
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                                                <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" style={{ backgroundColor: '#00D7E9' }}></span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="my-6 sm:my-7 md:my-8 lg:my-10 p-3 sm:p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(88, 101, 242, 0.2)' }}>
                                        <div className="relative w-full" style={{ paddingBottom: '50%' }}>
                                            <Image
                                                src="/litepaperPage/image4.jpg"
                                                alt="Community Process"
                                                fill
                                                className="rounded-lg object-contain"
                                            />
                                        </div>
                                        <p className="text-xs md:text-sm mt-2 sm:mt-3 md:mt-4 italic text-center px-2 sm:px-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                            Figure 3. Process for establishment of communities
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-3.5 md:mb-4" style={{ color: '#5865F2' }}>Personalisation of content</h2>
                                    <p className="leading-relaxed mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Content is personalised to users along the Health-Shared concept of light and warmth. We describe communities as camp fires in a dark forest. Users see explicit knowledge from afar (light) and come closer to the campfire (community). When near, they notice the warmth (tacit knowledge) which aligns with themes including: hopes, fears, solutions, strategies, successes and failures.
                                    </p>

                                    <div className="my-6 sm:my-7 md:my-8 lg:my-10 p-3 sm:p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(88, 101, 242, 0.2)' }}>
                                        <div className="relative w-full" style={{ paddingBottom: '44.4%' }}>
                                            <Image
                                                src="/litepaperPage/image5.jpg"
                                                alt="Light and Warmth Concept"
                                                fill
                                                className="rounded-lg object-contain"
                                            />
                                        </div>
                                        <p className="text-xs md:text-sm mt-2 sm:mt-3 md:mt-4 italic text-center px-2 sm:px-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                            Figure. Communities purvey light (explicit knowledge) and warmth (tacit knowledge).
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-3.5 md:mb-4" style={{ color: '#FF9400' }}>Token incentivisation for Community Activism</h2>
                                    <p className="leading-relaxed mb-3 sm:mb-3.5 md:mb-4 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Tokenising community activism allows Health stakeholders to support users activate. Health-Shared will issue tokens for 'rewardable' community activities including:
                                    </p>
                                    <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        {[
                                            "Inviting friends to join",
                                            "Commenting on a community post",
                                            "Sharing a community post to their contacts",
                                            "Voting for community/DAO priorities",
                                            "Sharing experiences as 'user generated content'"
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                                                <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" style={{ backgroundColor: '#00D7E9' }}></span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="leading-relaxed mt-3 sm:mt-3.5 md:mt-4 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        Partner stakeholders can incentivise community activism and hence activation of community members by increasing numbers of tokens issued for each activity.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-3.5 md:mb-4" style={{ color: '#00D7E9' }}>Technology Description</h2>
                                    <p className="leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                        The technological backbone of Health-Shared CoP is accomplished by the use of web 3.0 including 'folksonomies' (tag cloud based, flat metadata structure for content), complex algorithmic medicine and machine learning. This allows participants to enhance their self management journey by associating with tags, themes and personalised content.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-3.5 md:mb-4" style={{ color: '#5865F2' }}>Community and Personal feed determinants</h2>

                                    <div className="space-y-6 sm:space-y-7 md:space-y-8">
                                        <div>
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#5865F2' }}>Community Feeds</h3>
                                            <p className="leading-relaxed mb-3 sm:mb-3.5 md:mb-4 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                The community feed is determined by the scheduled content programme as set up by the community owner. The schedule should follow the themes extracted from discovery interviews with ambassadors as well as surveys and polls of community members.
                                            </p>
                                            <p className="leading-relaxed mb-3 sm:mb-3.5 md:mb-4 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                With the establishment of a community DAO, this process will be governed by smart contracts. Discovery interviews conducted as the community is set up will create a map of light and warm themes (explicit and tacit).
                                            </p>
                                            <p className="leading-relaxed mb-3 sm:mb-3.5 md:mb-4 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                This theme map will be continually updated in light of user generated content in the community and search terms being used.
                                            </p>
                                            <p className="leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                Community DAO members will be asked to vote on priority themes for the next season and content will be scheduled based on the DAO priorities.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#00D7E9' }}>Personal feed</h3>
                                            <p className="leading-relaxed mb-3 sm:mb-3.5 md:mb-4 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                A users personal feed is the cumulation of all the communities being followed as well as light and warm (explicit and tacit) tags associated with that users. These tags are derived from the following sources:
                                            </p>
                                            <ol className="space-y-2 sm:space-y-2.5 md:space-y-3 mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base ml-3 sm:ml-4 md:ml-6" style={{ color: '#FFFFFF' }}>
                                                <li className="flex items-start gap-2 sm:gap-3">
                                                    <span className="flex-shrink-0 w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm" style={{ backgroundColor: '#00D7E9', color: '#242424' }}>1</span>
                                                    <span>Selection from probabilistic recommendations from the Global Burden of Disease database (WHO). Users enter their age, gender and location and are presented with a list of 20 conditions which they can select or deselect.</span>
                                                </li>
                                                <li className="flex items-start gap-2 sm:gap-3">
                                                    <span className="flex-shrink-0 w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm" style={{ backgroundColor: '#00D7E9', color: '#242424' }}>2</span>
                                                    <span>Interaction history. All content is associated with light and warm tags. Interacting with content associates those tags with the user.</span>
                                                </li>
                                                <li className="flex items-start gap-2 sm:gap-3">
                                                    <span className="flex-shrink-0 w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm" style={{ backgroundColor: '#00D7E9', color: '#242424' }}>3</span>
                                                    <span>Machine learning algorithm which we will develop using interaction data in health-shared communities.</span>
                                                </li>
                                            </ol>
                                        </div>

                                        <div>
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#FF9400' }}>Vector DB explicit (light) and tacit (warmth) recommendation system</h3>
                                            <p className="leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                We have a custom implementation of the Weaviate vector database. The vector database calculates a three dimensional vector as an aggregate of the light and warm (explicit and tacit) tags associated with your profile.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 underline underline-offset-4" style={{ color: '#E1767D' }}>Psychographics engine development</h3>
                                            <p className="leading-relaxed mb-3 sm:mb-3.5 md:mb-4 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                Psychographics has received negative press in the wake of national election influencing in the Cambridge Analytica scandal, however, in its essence, psychographics can be used to present content (both explicit and tacit) in a manner which a user is most likely to be affected by. Others have proposed that cyber based behavioural models are important.
                                            </p>
                                            <p className="leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                Health-shared will create a psychographics ML engine to provide an additional layer of personalisation to content being displayed in users personal feeds. We will use user features including personality scores and tags associations and content features including sentiment analysis, content type, length and other off the shelf descriptions as well as novel computer vision approaches that we have previously implemented.
                                            </p>
                                        </div>

                                        <div>
                                            <p className="leading-relaxed mb-3 sm:mb-3.5 md:mb-4 text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                Wearable heart rate variability based algorithm to personalise content to individual users psychographic profile.

                                            </p>
                                            <p className="leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: '#FFFFFF' }}>
                                                Health-Shared will refine its psychographics engine with individual user physiological data as well as simple web interaction data. We have previous published in this field. There are validated signal processing algorithms for detecting attention using ECG heart rate variability. We will perform bench research to correlate features of a wrist worn PPG sensor (eg smartwatch) with the ECG heart rate variability detected features of engagement previously reported. We will then incorporate a wrist worn device PPG signal into a psychographics model which will individualise to users.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Back to Top Button */}
                    <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
                        <a
                            href="#"
                            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all transform hover:scale-105 flex items-center gap-2 hover:opacity-80"
                            style={{ backgroundColor: '#5865F2', color: '#242424' }}
                        >
                            Back to Top
                        </a>
                    </div>
                </main >
            </div >
        </>
    );
}