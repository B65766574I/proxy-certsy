import { title, subtitle } from "@/components/primitives";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import React from "react";
import DataCard from "../components/card";
import Collapse from "../components/collapsible";
import Code from "../components/code";

export default function Home() {
    const selectvalue = "bash";
    const frontend = process.env.NEXT_PUBLIC_BASE_URL;

    const textfield =
        'curl -X POST \'https://app.certsy.com/api/v1/candidate/graphql_query.json\' \\\n--header \'content-type: application/json\' \\\n--header "authorization: Bearer $(curl -s frontend/api/certsyjwt --retry 2 --retry-delay 20 | tr -d \'"\')" \\\n--data \'[{"operationName": "getDashboardData","variables": {},"query": "query getDashboardData {\\n\\n  auRtw: candidateAuRtwSubmissionSignalCollectionFetch {\\n items {\\n id\\n status\\n createdAt\\n verificationResult {\\n expirationStatus\\n expiryDate\\n fullName\\n resultDisplayText\\n verificationDocumentFullName\\n verificationDocument\\n visaSubclassDisplayText\\n verifiedAt\\n }\\n }\\n}\\n\\n  education: candidateEducationSubmissionCollectionFetch {\\n items {\\n id\\n status\\n createdAt\\n verificationResult {\\n fullName\\n educationProvider\\n qualification\\n conferralYear\\n verifiedAt\\n courseName\\n majors\\n withHonours\\n}\\n}\\n}\\n}"}]\''.replace(
            "frontend",
            frontend
        );
    const output = [
        {
            data: {
                auRtw: {
                    items: [
                        {
                            id: "6058278c-318c-4572-bc95-26ae4a9aff06",
                            status: "verified",
                            createdAt: "2024-03-27T12:49:15Z",
                            verificationResult: {
                                expirationStatus: null,
                                expiryDate: "2025-12-08",
                                fullName: "Balakrishnan Chidambaram",
                                resultDisplayText:
                                    "Temporary unrestricted work rights in Australia",
                                verificationDocumentFullName:
                                    "Balakrishnan Chidambaram",
                                verificationDocument: "au_visa_grant_notice",
                                visaSubclassDisplayText:
                                    "Temporary Graduate Visa (485)",
                                verifiedAt: "2024-03-27T12:50:29Z",
                            },
                        },
                    ],
                },
                education: {
                    items: [
                        {
                            id: "869daa0a-e37a-419d-89cd-f6ba7c2ddae9",
                            status: "verified",
                            createdAt: "2024-03-27T12:51:12Z",
                            verificationResult: {
                                fullName: "Balakrishnan Chidambaram",
                                educationProvider:
                                    "The University of New South Wales",
                                qualification:
                                    "Master of Information Technology",
                                conferralYear: "2022",
                                verifiedAt: "2024-03-28",
                                courseName: "Master of Information Technology",
                                majors: [],
                                withHonours: false,
                            },
                        },
                    ],
                },
            },
        },
    ];

    const title1 = "Curl Command";
    const desc1 =
        "cURL command for making a GraphQL query to the Certsy API, which returns the Australian Right to Work Visa Entitlement and Educational Qualification";

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-2">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title()}>Balaji&#39;s&nbsp;</h1>
                <h1 className={title({ color: "violet" })}>Certsy Proxy</h1>
                <br />
            </div>
            <div className="w-5/6">
                <Collapse
                    title={title1}
                    description={desc1}
                    key="1"
                    alabel={title1}
                />
            </div>
            <div className="h-full w-5/6 flex flex-col rounded-md overflow-hidden text-xs">
                <Code language="bash" code={textfield} />
            </div>
            <div className="w-5/6">
                <h2 className={subtitle()}>GraphQL Response</h2>
            </div>
            <div className="h-full w-5/6 flex flex-col rounded-md overflow-hidden text-xs">
                <Code language="json" code={JSON.stringify(output, null, 1)} />
            </div>
            <DataCard CardType="auRtw" time={Date.now()} />
            <DataCard CardType="education" time={Date.now()} />
        </section>
    );
}
