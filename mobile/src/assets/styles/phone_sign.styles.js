import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent:"center",
    marginTop:"40%"
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 16,
  },
  textContainer:{
  flex:1,
  color:"white",
  
  },

  logo: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bottomSection: {
    width: '100%',
    marginBottom: 30,
  },
  phoneInputContainer: {
    marginBottom: 16,
  },
  phoneInput: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#4B5563',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
  },
  countryCode: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  countryCodeText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  phoneInputText: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: '#9CA3AF',
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: '#ffffffff',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    marginTop:20
  },
  signInButtonText: {
    color: '#c4cdf2ff',
    fontSize: 16,
    fontWeight: '600',
    alignItems:"center",
    alignSelf:"center"
  },
   GetCodeButtonText: {
    color: '#c7a0e7ff',
    fontSize: 16,
    fontWeight: '600',
     alignItems:"center",
    alignSelf:"center"
  },
  disclaimer: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 16,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  footer: {
    fontSize: 14,
    color: '#D1D5DB',
    textAlign: 'center',
    marginBottom: 30,
  },
    phoneNumberDisplay: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  phoneNumberText: {
    color: '#FFFFFF',
    fontSize: 20,
    justifyContent:"center",
    alignItems:"flex-start"
  },
});
export default styles;