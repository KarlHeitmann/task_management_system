import { GoogleLogin } from '@react-oauth/google'
// import axios from 'axios'

export default function GoogleLoginButton({ userType }) {
  const handleSuccess = async (credentialResponse) => {
    // debugger
    const { credential } = credentialResponse

    try {
      // const response = await axios.post(
      //   `http://localhost:3000/auth/google_oauth2/callback?user_type=${userType}`,
      //   {},
      //   {
      //     headers: { Authorization: `Bearer ${credential}` },
      //     withCredentials: true, // important if using session cookies
      //   }
      // )

      // Change the code below to use fetch instead of axios
      const response = await fetch(
        `/auth/google_oauth2/callback?user_type=${userType}`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credential}` 
          },
          credentials: 'include', // important if using session cookies
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Login successful', data);
      // Save user info in Redux or context
    } catch (error) {
      console.error('Login error', error)
    }
  }

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.error('Login Failed')}
      useOneTap
    />
  )
}