"use client";
import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
    Image,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";

export default function DataCard({
    CardType,
    time,
}: {
    CardType: string;
    time: any;
}) {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch("/api/graphql");
                const data = await result.json();
                setData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                await new Promise((resolve) => setTimeout(resolve, 20000));
                const result = await fetch("/api/graphql");
                const data = await result.json();
                setData(data);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        if (CardType == "education") {
            return <Spinner label="Loading Education Qualifications..." />;
        } else {
            return <Spinner label="Loading Right to Work..." />;
        }
    }

    const VerifiedOn = new Date(
        data[0]["data"][CardType]["items"][0]["verificationResult"][
            "verifiedAt"
        ]
    );

    if (CardType == "education") {
        var cardTitle = "Education Qualifications";
        var fieldNameOne = "University";
        var fieldValueOne =
            data[0]["data"][CardType]["items"][0]["verificationResult"][
                "educationProvider"
            ];
        var fieldNameTwo = "Qualification";
        var fieldValueTwo =
            data[0]["data"][CardType]["items"][0]["verificationResult"][
                "qualification"
            ];
        var fieldNameThree = "Conferral Year";
        var fieldValueThree =
            data[0]["data"][CardType]["items"][0]["verificationResult"][
                "conferralYear"
            ];
    } else {
        var cardTitle = "Right to Work";
        var fieldNameOne = "Visa Sub Class";
        var fieldValueOne =
            data[0]["data"][CardType]["items"][1]["verificationResult"][
                "visaSubclassDisplayText"
            ];
        var fieldNameTwo = "Work rights";
        var fieldValueTwo =
            data[0]["data"][CardType]["items"][1]["verificationResult"][
                "resultDisplayText"
            ];
        var fieldNameThree = "Expiry date";
        const fieldValueThreeBefore = new Date(
            data[0]["data"][CardType]["items"][1]["verificationResult"][
                "expiryDate"
            ]
        );
        var fieldValueThree = fieldValueThreeBefore.toLocaleDateString(
            "en-GB",
            { day: "numeric", month: "short", year: "numeric" }
        );
    }

    return (
        <Card className="max-w-[600px] w-5/6">
            <div className="flex flex-col py-2">
                <p className="text-2xl text-center text-blue-500">
                    {cardTitle}
                </p>
            </div>
            <Divider />
            <div className="flex items-center justify-center">
                <div className="flex items-center">
                    <svg
                        viewBox="0 0 42.5 48"
                        xmlns="http://www.w3.org/2000/svg"
                        height="12px"
                        width="12px"
                    >
                        <g>
                            <path
                                fill=""
                                d="M1.9 10.6 19.4.5c1.1-.7 2.6-.7 3.7 0l17.6 10.1c1.2.7 1.9 1.9 1.9 3.2v20.3c0 1.3-.7 2.6-1.9 3.2L23.1 47.5c-1.1.7-2.6.7-3.7 0L1.9 37.3C.7 36.7 0 35.5 0 34.1V13.9c0-1.4.7-2.6 1.9-3.3"
                            ></path>
                            <path
                                fill="currentColor"
                                d="M18.4 35.2c-.1 0-.2 0-.2-.1L9.7 28c-.2-.2-.4-.5-.4-.8v-7.5c0-.1.1-.2.2-.3h.2l8.7 7.2L39 9.7 23.1.5c-1.1-.7-2.6-.7-3.7 0L1.9 10.6C.7 11.3 0 12.5 0 13.9v20.3c0 1.3.7 2.6 1.9 3.2l17.6 10.2c1.1.7 2.6.7 3.7 0l17.6-10.2c1.2-.7 1.9-1.9 1.9-3.2v-19L18.6 35.1c-.1.1-.1.1-.2.1"
                            ></path>
                        </g>
                    </svg>
                    <div>
                        <span>
                            <p className="text-sm text-center text-blue-500">
                                &nbsp;Verified{" "}
                                {VerifiedOn.toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </p>
                        </span>
                    </div>
                </div>
            </div>
            <CardBody>
                <table className="table-fixed">
                    <tbody>
                        <tr className="col-w/2 pb-5">
                            <td className="pb-4">
                                <p className="text-xs">{fieldNameOne}</p>
                                <p className="text-sm">{fieldValueOne}</p>
                            </td>
                            <td className="pb-4">
                                <p className="text-xs">{fieldNameTwo}</p>
                                <p className="text-sm">{fieldValueTwo}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className="text-xs">{fieldNameThree}</p>
                                <p className="text-sm">{fieldValueThree}</p>
                            </td>
                            <td>
                                <p className="text-xs">Verified On</p>
                                <p className="text-sm">
                                    {VerifiedOn.toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}
