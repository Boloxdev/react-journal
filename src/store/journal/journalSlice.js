import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
        // active: {
        //     id: 'abc123',
        //     title: '',
        //     body: '',
        //     date: 123456,
        //     imageUrls: [],
        // }
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload );
            state.isSaving = false;
            state.messageSaved = '';
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.messageSaved = '';
            state.isSaving = true;
            //todo: msg de error
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes && state.notes.map( note => {
                if ( note.id === action.payload.id ){
                    
                    return action.payload;
                }
                return note;
            });
            state.messageSaved = `${action.payload.title }, actualizada correctamente`;
        },

        setPhotosToActiveNote: ( state, action ) => {
            state.active.imageUrls= [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        }
    }
});


export const {
    addNewEmptyNote,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    clearNotesLogout,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
} = journalSlice.actions;