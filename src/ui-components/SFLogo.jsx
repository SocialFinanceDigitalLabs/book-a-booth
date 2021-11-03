import React from "react";
import { SvgIcon } from "@mui/material";

const SFLogo = ({width, height, color, textColor, showText}) => {
    const styles = {width: '100px', height: '100px'};
    if (width) styles.width = width;
    if (height) styles.height = height;
    if (!color) color = '#000';
    if (!textColor) textColor = '#fff'
    if (showText === undefined) showText = true;

    return (
        <SvgIcon viewBox="0 0 50 20" style={styles}>
            <g id="logo-socialfinance">
                <circle id="circle" cx="10" cy="10" r="10" color={color}/>
                <rect x="22" y="1" width="18" height="18" color={color}/>
                {showText && (
                    <>
                        <text x="10" y="18" style={{font: "heavy 20px Klavika Bold, sans-serif", color: textColor}}>s
                        </text>
                        <text x="33" y="21" style={{font: "heavy 20px Klavika Bold, sans-serif", color: textColor}}>f
                        </text>
                    </>
                )}
            </g>
        </SvgIcon>
    );
};

export default SFLogo;