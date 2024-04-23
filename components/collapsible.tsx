"use client";
import React from "react";
import {Accordion, AccordionItem} from "@nextui-org/react";

export default function Collapse({
    title,
    description,
    key,
    alabel
}: {
    title: string;
    description: string;
    key: string;
    alabel: string;
}) {


return (
    <Accordion className="p-0">
    <AccordionItem className="text-sm" key={key} aria-label={alabel} title={title}>
        {description}
    </AccordionItem>
    </Accordion>
    
)

}