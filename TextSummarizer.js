// article summarization
// define text summarizer
module.exports = (summarizableArticle, numberOfSentences) => {
    // load dependenceis
    const compromise = require('compromise');
    const natural = require('natural');

    // define summarize function
    const summarize = (article, maxSentences = 3) => {
        // make setences in lowercase, remove punctuation, and split article into an array
        const sentences = compromise(article).sentences().out('array');

        // create the instances of NLP libraries and configure stemmer and tokenizer
        const db = new natural.TfIdf();
        const tokenizer = new natural.WordTokenizer();
        const stemmer = natural.PorterStemmer.stem;
        const stemAndTokenize = text => tokenizer.tokenize(text).map(token => stemmer(token));
        const scoresMap = {};

        // add each sentence to the document
        sentences.forEach(sentence => db.addDocument(stemAndTokenize(sentence)));

        // run stemmer and tokenizer on the article
        stemAndTokenize(article).forEach(token => {
            // calculate and map scores
            db.tfidfs(token, (sentenceId, score) => {
                if (!scoresMap[sentenceId]) scoresMap[sentenceId] = 0;
                scoresMap[sentenceId] += score;
                //                console.log("DocID " + sentenceId + " has score: " + score);
            });
        });

        // Convert our scoresMap into an array so that we can easily sort it
        let scoresArray = Object.entries(scoresMap).map(item => ({ score: item[1], sentenceId: item[0] }));
        scoresArray.sort((a, b) => a.score < b.score ? 1 : -1); // sorting by descending score

        // pick the top maxSentences sentences
        scoresArray = scoresArray.slice(0, maxSentences);

        // display top 3
        scoresArray
            .forEach(item => {
                console.log("SentenseId: " + item.sentenceId);
                console.log("Score: " + item.score);
                console.log("Sentence: \n" + sentences[item.sentenceId]);
                console.log("\n")
            })

        // re-sort by ascending sentenceId so that the sentences are sorted in the original order
        scoresArray.sort((a, b) => parseInt(a.sentenceId) < parseInt(b.sentenceId) ? -1 : 1);

        // return the summary as a paragraph
        return scoresArray
            .map(item => sentences[item.sentenceId])
            .join('. ');
    };

    // return result
    return summarize(summarizableArticle, numberOfSentences);
}

// // caller
// // load file
// const textSummarizer = require('./TextSummarizer')

// // input
// let summarizableArticle = "One of the most popular metrics used in search relevance, text mining, and information retrieval is the term frequency - inverse document frequency score, or tf-idf for short. In essence, tf-idf measures how significant a word is to a particular document. The tf-idf metric therefore only makes sense in the context of a word in a document that's part of a larger corpus of documents. Imagine you have a corpus of documents, like blog posts on varying topics, that you want to make searchable. The end user of your application runs a search query for fashion style. How do you then find matching documents and rank them by relevance? The tf-idf score is made of two separate but related components. The first is term frequency, or the relative frequency of a specific term in a given document. If a 100-word blog post contains the word fashion four times, then the term frequency of the word fashion is 4% for that one document. Note that term frequency only requires a single term and a single document as parameters; the full corpus of documents is not required for the term frequency component of tf-idf. Term frequency by itself is not sufficient to determine relevance, however. Words like this and the appear very frequently in most text and will have high term frequencies, but those words are not typically relevant to any search.";
// const NUM_SENTENCE = 3;

// // run summarizer
// let summary = textSummarizer(summarizableArticle, NUM_SENTENCE);

// // display the result
// console.log("=====original text=====");
// console.log(summarizableArticle);
// console.log("\n");

// console.log(`=====${NUM_SENTENCE}-sentence summary=====`);
// console.log(summary);
// console.log("\n");