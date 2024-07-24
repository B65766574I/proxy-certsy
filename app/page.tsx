import { title, subtitle } from "@/components/primitives";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import React from "react";
import DataCard from "../components/card";
import Collapse from "../components/collapsible";
import Code from "../components/code";
import Image from "next/image";

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
          "data": {
            "auRtw": {
              "items": [
                {
                  "id": "eae8d279-ca07-4340-8921-d1503bfcad29",
                  "status": "verified",
                  "createdAt": "2024-06-06T03:01:33Z",
                  "verificationResult": {
                    "expirationStatus": null,
                    "expiryDate": "2025-12-08",
                    "fullName": "Balakrishnan Chidambaram",
                    "resultDisplayText": "Temporary unrestricted work rights in Australia",
                    "verificationDocumentFullName": "Balakrishnan Chidambaram",
                    "verificationDocument": "au_visa_grant_notice",
                    "visaSubclassDisplayText": "Temporary Graduate Visa (485)",
                    "verifiedAt": "2024-06-06T03:03:16Z"
                  }
                },
                {
                  "id": "924f13fb-6a3f-42a4-a1d0-c92a15293fc8",
                  "status": "verified",
                  "createdAt": "2024-06-22T16:44:13Z",
                  "verificationResult": {
                    "expirationStatus": null,
                    "expiryDate": "2027-12-08",
                    "fullName": "Balakrishnan Chidambaram",
                    "resultDisplayText": "Temporary unrestricted work rights in Australia",
                    "verificationDocumentFullName": "Balakrishnan Chidambaram",
                    "verificationDocument": "au_visa_grant_notice",
                    "visaSubclassDisplayText": "Temporary Graduate Visa (485)",
                    "verifiedAt": "2024-06-22T16:45:41Z"
                  }
                }
              ]
            },
            "education": {
              "items": [
                {
                  "id": "4604363a-01ab-47f6-9c4c-56df14723c72",
                  "status": "verified",
                  "createdAt": "2024-06-06T03:10:26Z",
                  "verificationResult": {
                    "fullName": "Balakrishnan Chidambaram",
                    "educationProvider": "The University of New South Wales",
                    "qualification": "Master of Information Technology",
                    "conferralYear": "2022",
                    "verifiedAt": "2024-06-06",
                    "courseName": "Master of Information Technology",
                    "majors": [],
                    "withHonours": false
                  }
                }
              ]
            }
          }
        }
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
                <a
                    href="https://www.postman.com/dark-meadow-987259/workspace/public-proxycertsy/collection/17852534-02496ba0-431d-4d51-99e6-f0fb23969498"
                    target="_blank"
                >
                    <Image
                        src="https://run.pstmn.io/button.svg"
                        width={150}
                        height={100}
                        alt="Run in Postman"
                    />
                </a>
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
