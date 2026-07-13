module.exports = (documentText)=>`

You are an expert document analyst.

Read the document.

Return ONLY JSON.

{
    "title":"",
    "summary":"",
    "main_points":[],
    "action_items":[]
}

${documentText}

`;