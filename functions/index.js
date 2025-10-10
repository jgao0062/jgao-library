/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.countBooks = onRequest({invoker: "public"}, (req, res) => {
  cors(req, res, async () => {
    try {
      // Initialize Firebase Admin if not already initialized
      if (!admin.apps.length) {
        admin.initializeApp();
      }
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.addBookCapitalized = onRequest({invoker: "public"}, (req, res) => {
  cors(req, res, async () => {
    try {
      // Initialize Firebase Admin if not already initialized
      if (!admin.apps.length) {
        admin.initializeApp();
      }

      if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
      }

      const { isbn, name } = req.body;

      if (!isbn || !name) {
        res.status(400).send('ISBN and name are required');
        return;
      }

      // Capitalize the book name
      const capitalizedName = name.toUpperCase();

      // Add to Firestore with capitalized name
      const docRef = await admin.firestore().collection('books').add({
        isbn: Number(isbn),
        name: capitalizedName,
        originalName: name, // Keep original for reference
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      res.status(200).send({
        success: true,
        id: docRef.id,
        book: {
          isbn: Number(isbn),
          name: capitalizedName,
          originalName: name
        }
      });
    } catch (error) {
      console.error("Error adding book:", error.message);
      res.status(500).send("Error adding book");
    }
  });
});

exports.getAllBooks = onRequest({invoker: "public"}, (req, res) => {
  cors(req, res, async () => {
    try {
      // Initialize Firebase Admin if not already initialized
      if (!admin.apps.length) {
        admin.initializeApp();
      }
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();

      const books = [];
      snapshot.forEach(doc => {
        books.push({
          id: doc.id,
          ...doc.data()
        });
      });

      res.status(200).send({
        success: true,
        count: books.length,
        books: books
      });
    } catch (error) {
      console.error("Error getting all books:", error.message);
      res.status(500).send("Error getting all books");
    }
  });
});
