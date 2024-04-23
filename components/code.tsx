"use client";
import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FiCopy, FiCheck } from 'react-icons/fi';

export default function Code({
    language,
    code,
}: {
    language: string;
    code: string;
}) {

    const style = atomOneDarkReasonable;
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    };

return (
    <div className='relative'>
        <CopyToClipboard text={code} onCopy={handleCopy}>
            <button className="absolute flex flex-row  top-0 right-0 p-2" >
                {copied ? <FiCheck /> : <FiCopy />}
            </button>
        </CopyToClipboard>
        <SyntaxHighlighter
            language={language}
            style={style}
        >
            {code}
        </SyntaxHighlighter>
    </div>

)
}
