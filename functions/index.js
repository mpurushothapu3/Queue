const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const functions = require('firebase-functions');
const { DatabaseBuilder } = require('firebase-functions/lib/providers/firestore');

const FieldValue = require('firebase-admin').firestore.FieldValue;

exports.documentWriteListener =
    functions.firestore.document('{collectionUid}/{documentUid}')
    .onWrite((change, context) => {

    if (!change.before.exists) {
        // New document Created : add one to count
        if (context.params.documentUid !== "counter") {
            var docRef = db.collection(context.params.collectionUid).doc(context.params.documentUid);
            var counterRef = db.collection(context.params.collectionUid).doc("counter");
            return db.runTransaction(function (transaction) {
                return transaction.get(counterRef).then((counterDoc) => {
                    var newSize = counterDoc.data().numberOfDocs + 1;
                    transaction.set(docRef, {position: newSize}, {merge: true});
                    transaction.update(counterRef, {numberOfDocs: newSize});
                    return newSize;
                });
            }).catch(function(error) {console.error(error)});
        }
    } else if (change.before.exists && change.after.exists) {
        // Updating existing document : Do nothing

    } else if (!change.after.exists) {
        // Deleting document : subtract one from count
        var previousDoc = change.before;
        var previousPos = previousDoc.data().position;

        counterRef = db.collection(context.params.collectionUid).doc("counter");
            //Decrement all values above position
        return db.runTransaction(function(transaction) {
            return transaction.get(db.collection(context.params.collectionUid)).then((querySnapshot) => {
                transaction.update(counterRef, {numberOfDocs: FieldValue.increment(-1)});
                querySnapshot.forEach((doc) => {
                    if (doc.id !== "counter") {
                        if (doc.data().position > previousPos) {
                            transaction.update(doc.ref,{position: FieldValue.increment(-1)});
                        }
                    }
                });
                return null;
            })
        });
    }

return;
});

exports.clearQueue = functions.https.onCall((data, context) => {
    const collectionID = data.collectionID;
    const batch = db.batch();
    return db.collection(collectionID).orderBy('position', 'desc').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });
        return batch.commit();
    }).catch((error) => {
        console.log(error);
    });
});

exports.addToQueue = functions.https.onCall((data, context) => {
    const collectionID = data.collectionID;
    var addDocs = async function () {
        await db.collection(collectionID).add( {
            name: 'Alucard',
            time: Date.now()
        });
        await db.collection(collectionID).add( {
            name: 'Integra',
            time: Date.now()
        });
        await db.collection(collectionID).add( {
            name: 'Bernadotte',
            time: Date.now()
        });
        await db.collection(collectionID).add( {
            name: 'Alexander Anderson',
            time: Date.now()
        });
        await db.collection(collectionID).add( {
            name: 'Maxwell',
            time: Date.now()
        });
        await db.collection(collectionID).add( {
            name: 'Walter',
            time: Date.now()
        });
        await db.collection(collectionID).add( {
            name: 'Seras Victoria',
            time: Date.now()
        });
        await db.collection(collectionID).add( {
            name: 'The Major',
            time: Date.now()
        });
        await db.collection(collectionID).add( {
            name: 'Penwood',
            time: Date.now()
        });
        await db.collection(collectionID).add( {
            name: 'Hellsing',
            time: Date.now()
        });
    };
    return addDocs();
})