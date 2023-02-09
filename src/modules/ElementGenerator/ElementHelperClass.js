import { CSSStyler } from "../Objects"



function generateInnerProgressbar(width) { 
    let progress = document.createElement('div')
    progress.style = `
    background-color: ${CSSStyler.COLOR_ACCENT};
    width: ${width}%;
    height: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    `
    return progress
}


function styleHeader(headerElement) { 
    //TODO: move styling to CSS file
    headerElement.style.textDecoration = "underline"
    headerElement.style.cursor = "pointer"
    headerElement.style.fontWeight = "bold"
    headerElement.style.color = CSSStyler.TEXT_COLOR
} 

export { 
generateInnerProgressbar, 
styleHeader, 
}