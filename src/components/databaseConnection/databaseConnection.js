import { db, firebaseAuth } from '../../config/constants';
import firebase from 'firebase';

export function saveCard(dataObject){
    return db
        .ref('posts').push({
            title: dataObject.title,
            content: dataObject.content,
            privacy: dataObject.value,
            user: firebaseAuth().currentUser.uid,
            avatar: firebaseAuth().currentUser.displayName.match(/(?<=(\s|^))[a-z]/gi).join('').toUpperCase(),
            likes: 0,
            liked: [{}],
            date: Date.now(),
        });
}