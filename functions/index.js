const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.emojify = functions.database.ref("/messages/{pushId}/text")
    .onCreate((snapshot, context) => {
      const originalText = snapshot.val();
      const emojifiedText = emojifyText(originalText);
      // Return a JavaScript Promise to update the database node
      return snapshot.ref.set(emojifiedText);
    });

/**
 * Replacing with the regular expression /.../ig does a case-insensitive
 * search (i flag) for all occurrences (g flag) in the string.
 *
 * @param {string} originalText plain text
 * @return {string} text with keywords replaced by emoji
 */
function emojifyText(originalText) {
  let emojifiedText = originalText;
  emojifiedText = emojifiedText.replace(/\blol\b/ig, "😂");
  emojifiedText = emojifiedText.replace(/\bcat\b/ig, "😸");
  return emojifiedText;
}
