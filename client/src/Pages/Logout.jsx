import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Cette fonction sera exécutée lorsque le composant est monté
    setCurrentUser(null); // Met à jour l'utilisateur actuel à null
    navigate('/login'); // Redirige vers la page de connexion
  }, []); // Le tableau vide [] indique que cet effet ne dépend d'aucune valeur, donc il ne sera exécuté qu'une seule fois après le premier rendu

  return (
    <div>Logout</div>
  );
}

export default Logout;


/*import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const Logout = () => {

  const {setCurrentUser} = useContext(UserContext)
  const navigate = useNavigate();

  setCurrentUser(null)
  navigate('/login')
  return (
    <div>Logout</div>
  )
}
*/