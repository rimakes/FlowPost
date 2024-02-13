export const promptGenerateCarousel = `

Given this text:

"
{post}
"
Use the copy of that text to create an array of slides with the following structure:

{format_instructions}

Create the array of slides that meet that structure. Only output the array, not intro, no outro, no logs. VERY IMPORTANT: Don't go above the allowed length on ANY of the slide contents.

const array =

`;
