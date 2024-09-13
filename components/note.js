import React from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Note component that takes in note, deleteNote, and editNote as props
const Note = ({ note, deleteNote, editNote }) => {
  return (
    <View style={styles.noteContainer}> 
    {/* Container for each note */}
      <TouchableOpacity onPress={() => editNote(note)}> 
        {/* When the note is pressed, call editNote with the note */}
        <Text style={styles.noteTitle}>{note.title}</Text> 
        {/* Display the note's title */}
        <Text style={styles.noteContent}>{note.content}</Text> 
        {/* Display the note's content */}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteNote(note.id)}> 
        {/* When the delete text is pressed, call deleteNote with the note's id */}
        <Text style={styles.deleteText}>Delete</Text> 
        {/* Display the delete text */}
      </TouchableOpacity>
    </View>
  );
};

// Styles for the Note component
const styles = StyleSheet.create({
  noteContainer: {
    flexDirection: 'row', // Arrange items in a row
    justifyContent: 'space-between', // Space between the note text and delete button
    alignItems: 'center', // Center align items
    padding: 10, // Padding around the container
    marginVertical: 5, // Vertical margin between notes
    backgroundColor: '#444', // Background color of the note container
    borderRadius: 5, // Rounded corners for the note container
  },
  noteTitle: {
    color: '#fff', // Color of the note title text
    fontWeight: 'bold', // Bold font for the note title
  },
  noteContent: {
    color: '#ccc', // Color of the note content text
  },
  deleteText: {
    color: '#ff6b6b', // Color of the delete text
  },
});

export default Note; 
