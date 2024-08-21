import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/Noteslist';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
	const [notes, setNotes] = useState(() => {
		// Retrieve notes from localStorage or use initial notes
		const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
		return savedNotes || [
			{
				id: nanoid(),
				text: 'This is my first note!',
				date: '15/04/2021',
			},
			{
				id: nanoid(),
				text: 'This is my second note!',
				date: '21/04/2021',
			},
			{
				id: nanoid(),
				text: 'This is my third note!',
				date: '28/04/2021',
			},
			{
				id: nanoid(),
				text: 'This is my new note!',
				date: '30/04/2021',
			},
		];
	});

	const [searchText, setSearchText] = useState('');
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
	}, [notes]);

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		setNotes((prevNotes) => [...prevNotes, newNote]);
	};

	const deleteNote = (id) => {
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
	};

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText.toLowerCase())
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
			</div>
		</div>
	);
};

export default App;
