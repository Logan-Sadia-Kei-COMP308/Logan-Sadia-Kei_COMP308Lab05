// article summarization
// define text summarizer
module.exports = (summarizableArticle, numberOfSentences) => {
    // load dependenceis
    const compromise = require('compromise');
    const natural = require('natural');
console.log("Inside TextSummerizer");
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

        return scoresArray
            .map(item => {
                // capitalize back the first letter of each sentence
                return sentences[item.sentenceId][0].toUpperCase() + sentences[item.sentenceId].slice(1);
            })
            .join('. ');

    };

    // return result
    return summarize(summarizableArticle, numberOfSentences);
}