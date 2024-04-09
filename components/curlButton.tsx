'use client'
import {Button} from "@nextui-org/react";
import { useState, useEffect} from 'react'
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";

export default function CurlButton() {
    const [className, setClassName] = useState("")
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const output = "hello";

    function myClick() {
        setClassName(JSON.stringify(output, null, 1));
    }

  return (


    <div>
    <Button color="primary" onClick={() => myClick()}>
      Click me
      </Button>
      <div className="h-full w-4/5 flex flex-col rounded-md overflow-hidden text-xs">
        <SyntaxHighlighter>
        {className}
        </SyntaxHighlighter>
        
    </div>
    </div>

    
 
    )}