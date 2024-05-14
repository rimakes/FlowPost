export const createWrittingStylePrompt = `
You are a content writting style analyst. Given a set of posts, you analyse them and create create a writting style that can be applied to future posts mimicking the author style.

Your analysis has the following suggested structure (but you are free to add any section you consider necessary) in the language of the posts you are analysing (write it in Spanish if the posts are in Spanish, for example):

### START OF WRITTING STYLE ANALYSIS ###

- Post opening: How does the author typically start their posts? Copy here 10 examples.

- Post ending: How does the author finis their posts? Copy here 10 examples.

- Syntax and Grammar: Describe the author's syntax and grammar. Are they correct? are they clear? Does the author use a lot of punctuation? Add 5 examples.

- Post length: Does the author have a consistend post length or does it vary?
Of the posts you analysed, write the: shortest lenght, longest length, and average length.

- Phrase and Sentence Structure and rythm: How long are the author's sentences? Are they complex or simple? how does he keep the rythm of the text? Add 5 examples.

- Vocabulary and Diction: What kind of words does the author use? Are they simple or complex? Are they very carefully chosen? Add 5 examples of words that represent well the author's vocabulary.

- Tone and Voice: Analyze the author's tone and voice. Are they formal or informal? Do they use humor or sarcasm? Are they authoritative or friendly? Add 5 short examples that represent well the author's tone and voice.

- Hashtags: Does the author use hashtags? How many? Related to the content of the post or something else? Add 3 - 5 examples.

- Emojis: Does the author use emojis? how many? To complement the text or to substitute it? With what end? If so, add 3 - 5 examples of the hashtags and the 3 - 5 words around them.

- Other elements: is there something else that stands out in the author's posts?
Can you identify a particular structure that the author tends to follow?

### END OF WRITTING STYLE ANALYSIS ###

Now create the style analysis for the following posts:

{postsForAnalysis}

### START OF WRITTING STYLE ANALYSIS ###


`;

export const createWrittingStylePrompt2 = `
Given a set of posts, answer the following questions:

### START OF WRITTING STYLE ANALYSIS ###


1. Copy here the first 50 words of each posts.

2. Copy here the last 50 words of each posts.

3. Does the author have a consistend post length or does it vary? Of the posts you analysed, write the: shortest lenght, longest length, and average length.

4. Analyze the length and complexity of the author's sentences. Does the author use long paragraphs or short ones?

5. Analyze the author's tone and voice. Are they formal or informal? Do they use humor or sarcasm? Are they authoritative or friendly? Add 5 short examples that represent well the author's tone and voice.

7. Does the author use figures of speech? If so, which ones? Add as many examples of each as you can find.

8. Does the author use hashtags? How many? Related to the content of the post or something else? Add 3 - 5 examples.

9. Does the author use emojis? how many? To complement the text or to substitute it? With what end? If so, add 3 - 5 examples of the hashtags and the 3 - 5 words around them.

11. Does the author seem to talk to a specific audience? If so, who?

12. Does the author talk as a friend or as an expert?


Here are the posts: 

{postsForAnalysis}

`;
