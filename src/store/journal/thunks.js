import { async } from "@firebase/util"
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";


export const startNewNote = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        console.log(uid);

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const ref = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(ref, newNote);
        
        newNote.id = ref.id;
        
        dispatch( addNewEmptyNote(newNote));
        dispatch( setActiveNote(newNote));
        dispatch( savingNewNote());

    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        const uid = getState().auth.uid;

        if(!uid) throw new Error("El id no está establecido");
        const notes = await loadNotes( uid );
        dispatch( setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {
        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await setDoc( docRef, noteToFireStore, { merge: true});

        dispatch( updateNote( note ) );

    }
}

export const startUploadingFiles = (files = []) => {
    return async( dispatch ) => {
        dispatch( setSaving() );
        // await fileUpload(files[0]);
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload(file) );
        }
        const photosUrls = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote( photosUrls ));
    }
}


export const startDeletingNote = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;
        
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById(note.id) );
    }
}