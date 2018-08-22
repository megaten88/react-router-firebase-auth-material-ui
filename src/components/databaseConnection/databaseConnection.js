import { db, firebaseAuth } from '../../config/constants';
import firebase from 'firebase';

export function saveCard(dataObject){
    return db
        .ref('posts').push({
            title: dataObject.title,
            content: dataObject.content,
            privacy: dataObject.value,
            user: firebaseAuth().currentUser.uid,
            likes: 0,
            date: firebase.database.ServerValue.TIMESTAMP,
        });
}