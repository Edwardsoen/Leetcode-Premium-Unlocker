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

function generateRedInnerProgressBar(width) { 
    let progress = document.createElement('div')
    progress.style = `
    background-color: red;
    width: ${width}%;
    height: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    `
    return progress
}

export { 
generateInnerProgressbar, 
generateRedInnerProgressBar
}