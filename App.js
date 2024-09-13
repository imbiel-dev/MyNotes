import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native'; 
import { StatusBar } from 'expo-status-bar'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { BlurView } from 'expo-blur'; // Import BlurView from expo-blur for glassmorphism effect
import Note from './components/note';
import { styles } from './components/styles';

export default function App() {
  // State hooks for managing notes, modal visibility, and the current note being edited/added
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '' });

  // Load notes from AsyncStorage when the component mounts
  useEffect(() => {
    loadNotes();
  }, []);

  // Function to load notes from AsyncStorage
  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes)); // Parse and set the notes if they exist
      }
    } catch (error) {
      console.error('Failed to load notes.', error); // Log an error if loading fails
    }
  };

  // Function to save notes to AsyncStorage
  const saveNotes = async (notes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes)); // Stringify and save the notes
    } catch (error) {
      console.error('Failed to save notes.', error); // Log an error if saving fails
    }
  };

  // Function to add or edit a note
  const addOrEditNote = () => {
    if (currentNote.title.length > 0 && currentNote.content.length > 0) {
      let updatedNotes = [];
      if (currentNote.id) {
        // If the note exists, update it
        updatedNotes = notes.map(note => note.id === currentNote.id ? currentNote : note);
      } else {
        // If the note is new, add it to the list
        currentNote.id = Date.now();
        updatedNotes = [...notes, currentNote];
      }
      setNotes(updatedNotes); // Update state
      saveNotes(updatedNotes); // Save updated notes
      setCurrentNote({ id: null, title: '', content: '' }); // Reset current note
      setModalVisible(false); // Close modal
    }
  };

  // Function to delete a note
  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id); // Filter out the deleted note
    setNotes(updatedNotes); // Update state
    saveNotes(updatedNotes); // Save updated notes
  };

  // Function to edit a note
  const editNote = (note) => {
    setCurrentNote(note); // Set the current note to the selected note
    setModalVisible(true); // Open modal
  };

  // Function to close modal and reset current note state
  const handleCloseModal = () => {
    setModalVisible(false); // Close modal
    setCurrentNote({ id: null, title: '', content: '' }); // Reset current note
  };

  return (
    <View style={styles.container}> 
    {/* Main container */}
      <StatusBar style="light" backgroundColor="#313338" /> 
      {/* Set the status bar style and background color */}
      <Text style={styles.title}>MyNotes</Text>
       {/* App title */}
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}> 
        {/* Button to open modal */}
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableOpacity>
      <FlatList
        data={notes} // Data source for the list
        renderItem={({ item }) => (
          <Note
            note={item} // Pass the note item
            deleteNote={deleteNote} // Pass delete function
            editNote={editNote} // Pass edit function
          />
        )}
        keyExtractor={item => item.id.toString()} // Key extractor for each note
      />
      <Modal
        animationType="slide" // Modal animation type
        transparent={true} // Modal transparency
        visible={modalVisible} // Modal visibility
        onRequestClose={handleCloseModal} // Function to call when the modal is requested to close
      >
        <View style={styles.modalBackground}> 
          {/* Modal background */}
          <BlurView intensity={90} style={styles.modalView}> 
            {/* Apply glassmorphism effect */}
            <Text style={styles.modalTitle}>{currentNote.id ? "Edit Note" : "Add Note"}</Text> 
            {/* Modal title */}
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#ddd" // Placeholder text color
              onChangeText={(text) => setCurrentNote(prevState => ({ ...prevState, title: text }))} // Update title
              value={currentNote.title}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Content"
              placeholderTextColor="#ddd" // Placeholder text color
              onChangeText={(text) => setCurrentNote(prevState => ({ ...prevState, content: text }))} // Update content
              value={currentNote.content}
              multiline={true} // Allow multiline input
            />
            <TouchableOpacity style={styles.button} onPress={addOrEditNote}> 
              {/* Button to add or edit note */}
              <Text style={styles.buttonText}>{currentNote.id ? "Save Changes" : "Add Note"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCloseModal}> 
              {/* Button to cancel */}
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      </Modal>
    </View>
  );
}
