import 'core-js';
import 'regenerator-runtime';

// Get quote from API

const author = document.getElementById('author');
const quote = document.getElementById('quote');
const newquote = document.getElementById('newquote');
const tweet = document.getElementById('twitter');

async function getQuote() {
   const apiUrl =
      'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
   const proxyUrl = 'https://hidden-garden-24182.herokuapp.com/';
   try {
      const response = await fetch(proxyUrl + apiUrl);
      const data = await response.json();

      if (data.quoteAuthor === '') {
         author.innerText = 'Unknown';
      } else {
         author.innerText = data.quoteAuthor;
      }
      if (data.quoteText.length > 120) {
         quote.classList.add('long-quote');
      } else {
         quote.classList.remove('long-quote');
      }
      quote.innerText = data.quoteText;
   } catch (error) {
      getQuote();
      console.log('no quote', error);
   }
}

const newFeature = function () {
   console.log('Welcome to the application');
};

//Tweet quote
function tweetQuote() {
   const quotet = quote.innerText;
   const authort = author.innerText;
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quotet} - ${authort}`;
   window.open(twitterUrl, '_blank');
}

//Event listeners
newquote.addEventListener('click', getQuote);
tweet.addEventListener('click', tweetQuote);

//Load
getQuote();
newFeature();
