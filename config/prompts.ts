export const promptGenerateCarousel = `

Act as a professional copy writting machine and create a carousel that summarizes the following Linkedin post:

Given this text:

"
{post}
"
Use the copy of that text to create an array of slides that tells a summarized version of that text using the same tone and style.

{format_instructions}

Please remember:
- The array should work fine as a standalone carousel, without the need of the original text and with the same tone, person, and style.
- You should create as many slides as necesary to summarize the original text. The sweet spot is between 7 and 10 slides, but adapt to the content.
- Use a mix of different slide types when possible - showcase your creativity!
- Regarding the differnt slide types:
1- BigNumberSlide: Don't use it for everything, only when it makes sense.
2- TextOnlySlide: This is the most versatile slide type, use it wisely.
3- ImageAndTextHorizontal: This is the most impresive slide type to the user, try to use it at least once (if it makes sense). In the image property, put a query in Spanish that could be use to find an image that is relevant for the slide.
4- Cover and CallToAction: Always use them at the beginning and end of the carousel.
- Write in Spanish from Spain and follow the instructions: it's very important for me.
- "paragraphs" is an array with only ONE element, and that you MUST USE HTML here. You can use several <p>, <ul>, <li> and <strong> tags. Format the text properly so it looks less monotone and more engaging. Use several <p> when it fits.

const array =

`;

const promptGenerateCarousel0304 = `

Act as a professional copy writting machine and create a carousel that summarizes the following Linkedin post:

Given this text:

"
{post}
"
Use the copy of that text to create an array of slides that tells a summarized version of that text using the same tone and style.

{format_instructions}

Please remember:
- The array should work fine as a standalone carousel, without the need of the original text.
- You should create as many slides as necesary to summarize the original text.


Here you have an example of each type of slide:

Cover: always add a cover slide at the beginning of the array.
    {{
        "title": "Comercio Electrónico y Sostenibilidad",
        "tagline": "No es solo de compras y ventas",
        "design": "Cover"
    }},

BigNumberSlide: use it when the main element of the text is (or can be interpreted as) a list and you want to use one slide per item of the list. The title must be maximum 15 characters!
    {{
      "title": "Adáptate", // maximum 15 characters
      "bigCharacter": "1",
      "tagline": "Lo primero es estar al día de las tendencias de tu sector, ¿estás al tanto?",
      "design": "BigNumberSlide"
    }},


ImageAndTextHorizontal: use it when you want to show an image with a small paragraph of text. The paragraph must be concise (follow the schema). in the image property, put a query in Spanish that could be use to find an image that is relevant for the slide.

{{
  "title": "Un enfoque moderno",
  "paragraphs": ["Mientras tú estás aquí, tu competencia ya está en TikTok, Instagram y Facebook. ¿Dónde estás tú?"],
  "image": "redes sociales móvil",
  "imageLocation": "left",
  "imageCaption": "¡Tus clientes están aquí!",
  "design": "ImageAndTextHorizontal"
}}


TextOnlySlide: You can use it for two things: 1) as a "title and text" slide, when you have a chunk of paragraph that is important. But remember, only one paragraph per slide and a concise one.

      {{
        "title": "¡Lo nuevo >>> Lo viejo!",
        "paragraphs": [
          "Es momento de adaptarse y aprovechar estas tendencias para mantenerse competitivo"],
        "design": "TextOnlySlide"
      }}, 

TextOnlySlide: the second thing you can use it for 2) as a "list" slide, when the text has a list but the list is not the only part of the text, so you want to use only one slide for the list. IMPORTANT!!!! If the total list length (the sum of all the items text) has more than 60 characters, split it into several slides...Whenever there is a list that is not the main thing of the content, use this slide type.

      {{
        "title": "Enfoque tradicional",
        "paragraphs": [
          "<ul>
            <li>Enfocarse principalmente en ventas físicas</li>
            <li>Un solo canal de ventas online</li>
            <li>Marketing tradicional, poco uso de redes sociales</li>
          </ul>"],
        "design": "TextOnlySlide"
      }}, 
    
CallToAction: always add a call to action slide at the end of the array.
      {{
        "title": "¿Y tú qué opinas?",
        "paragraphs": ["Cuéntamelo en comentarios y comparte con tus amigos si te gustó este contenido. Sígueme para más contenido."],
        "tagline": "Sígueme para más contenido",
        "design": "CallToAction"
      }}
      


Now build the array.

Try to use a mix of different slide types when possible.

Escribe en Español de España y respeta las instrucciones: es muy importante para mí.

Usa diversidad de tipos de slides cuando sea posible.

const array =

`;

// FOR NOW WE ARE TESTING NOT USING THE LIST SLIDE

// ListSlide: use it when the text has a list but the list is not the only part of the text, so you want to use only one slide for the list. IMPORTANT!!!! If the total list length (the sum of all the items text) has more than 30 characters, split it into several slides.
//     {{
//         "title": "Enfoque tradicional",
//         "paragraphs": [
//           "Enfocarse principalmente en ventas físicas",
//           "Un solo canal de ventas online",
//           "Marketing tradicional, poco uso de redes sociales"
//         ],
//         "design": "ListSlide"
//       }},
