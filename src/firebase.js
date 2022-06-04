import { initializeApp } from 'firebase/app';
import {
  getFirestore , collection, getDocs, addDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB9L7HN2L090uJs1t2lvwRVETIrdpwNtKU",
    authDomain: "wordle-react-c41cc.firebaseapp.com",
    projectId: "wordle-react-c41cc",
    storageBucket: "wordle-react-c41cc.appspot.com",
    messagingSenderId: "536433150040",
    appId: "1:536433150040:web:9fcba4e5ea98b84274622d"
};

//initilize firebase app
initializeApp(firebaseConfig);

//initilize Services
const db = getFirestore();

const gettingDocs = getDocs(collection(db, 'solutions'));

export default gettingDocs;