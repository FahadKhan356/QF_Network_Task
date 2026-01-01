import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  backButton: {
    padding: 20,
    marginTop: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingTop: 40,
  },
  instructionText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    fontWeight: '500',
  },
  phoneNumber: {
    fontWeight: 'bold',
  },
  otpContainer: {
    marginBottom: 20,
    width: '100%',
  },
  otpInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Translucent boxes
    borderRadius: 12,
    borderWidth: 1,
    borderBottomWidth: 1, // Override default library style
    color: '#FFF',
    width: 45,
    height: 55,
  },
  activationText: {
    color: '#E0E0E0',
    fontSize: 14,
    marginTop: 20,
  },
  resendText: {
    color: '#B0B0B0',
    marginTop: 15,
  },
  resendLink: {
    color: '#4169E1', // Royal Blue link
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  footer: {
    padding: 30,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
  },
});
export default styles;