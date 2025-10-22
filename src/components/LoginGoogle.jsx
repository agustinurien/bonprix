import React, { useEffect, useState } from "react";
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase/config";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const LoginGoogle = () => {
  const [userName, setUserName] = useState("");

  const saveUserToFirestore = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        points: 0,
        createdAt: new Date(),
      });
      console.log("Usuario registrado en Firestore ✅");
    } else {
      console.log("Usuario ya registrado en Firestore");
    }
  };

  const handleLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await saveUserToFirestore(user);

      // Aquí ya tenés el usuario autenticado
      console.log("Usuario logueado:", user);

      // Ejemplo de comprobación simple: ¿tiene email verificado?
      if (user.emailVerified || user.providerData.length > 0) {
        alert(`Bienvenido ${user.displayName} 🚀`);
      } else {
        alert("Usuario no válido");
      }

      // Opcional: guardarlo en tu estado global o contexto
      // setUser(user);
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName); // usuario logueado
      } else {
        setUserName(""); // no hay usuario
      }
    });

    return () => unsubscribe(); // cleanup al desmontar
  }, []);

  return (
    <>
      {userName ? (
        <div>
          <p>Bienvenido, {userName}!</p>
          <button onClick={() => auth.signOut()}>Cerrar sesión</button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Iniciar con Google
        </button>
      )}
    </>
  );
};

export default LoginGoogle;
