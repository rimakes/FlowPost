import { toCanvas } from 'html-to-image';
import { jsPDF } from 'jspdf';

/**
 * Converts the given html elements to a pdf, one element per page
 */
export const fromHtmlElementsToPdf = async (htmlElements: HTMLDivElement[]) => {
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [1350, 1080],
    });
    // REVIEW: How can we optimize this?
    // First add as many pages as elements in the array
    for (let i = 0; i < htmlElements.length; i++) {
        pdf.addPage();
    }
    console.log('pages added');

    // Then add the content of each element to the corresponding page
    let promises = htmlElements.map((element, index) => {
        console.log('element');
        return addHtmlElementToPdf(element, pdf, index);
    });

    // then await the promises
    console.log('awaiting for the promises to finish');
    await Promise.all(promises);
    console.log('promises finished');

    const arrayBuffer = pdf.output('arraybuffer');

    return arrayBuffer;
};

/**
 * Adds the given html element to the given pdf in the given page
 */
export const addHtmlElementToPdf = async (
    htmlElement: HTMLDivElement,
    pdf: jsPDF,
    page: number
) => {
    try {
        const dataUrl = await toCanvas(htmlElement, {
            quality: 1,
            includeQueryParams: true,
            pixelRatio: 2,
        });
        pdf.setPage(page + 1);
        pdf.addImage({
            imageData: dataUrl,
            format: 'PNG',
            x: 0,
            y: 0,
            height: 1350,
            width: 1080,
            compression: 'MEDIUM', // or 'SLOW' for better compression
        });
    } catch (error) {}
};
