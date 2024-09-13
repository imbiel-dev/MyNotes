import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e', // Darker background for better contrast
    padding: 20,
  },
  title: {
    fontSize: 28, // Slightly larger font for better visibility
    color: '#fff',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center', // Center the title
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Slightly more transparent
    color: '#fff',
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, // Increased shadow opacity for more depth
    shadowRadius: 10, // Increased shadow radius for softer shadow
  },
  textArea: {
    height: 120, // Increased height for better usability
    textAlignVertical: 'top',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker background for modal
  },
  modalView: {
    width: '85%',
    padding: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  blurView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Slightly more transparent
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Outline for buttons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, // Increased shadow opacity for more depth
    shadowRadius: 10, // Increased shadow radius for softer shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
