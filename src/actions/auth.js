import { auth, facebookAuthProvider, googleAuthProvider } from '../firebase/firebase'

export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

export const logout = () => ({
    type: 'LOGOUT'
})

export const startGoogleLogin = () => {
    return () => {
        return auth.signInWithPopup(googleAuthProvider)
    }
}

export const startFacebookLogin = () => {
    return () => {
        return auth.signInWithPopup(facebookAuthProvider)
    }
}

export const startLogout = () => {
    return () => {
        return auth.signOut()
    }
}