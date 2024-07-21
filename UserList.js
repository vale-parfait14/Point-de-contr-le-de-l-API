// src/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  // Déclaration de l'état pour stocker les utilisateurs
  const [listOfUsers, setListOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utilisation de useEffect pour obtenir les données après le premier rendu
  useEffect(() => {
    // Fonction pour obtenir les utilisateurs
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setListOfUsers(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des utilisateurs');
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Le tableau vide signifie que l'effet s'exécute uniquement lors du premier rendu

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Liste des Utilisateurs</h1>
      <ul>
        {listOfUsers.map(user => (
          <li key={user.id}>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Téléphone: {user.phone}</p>
            <p>Site Web: <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
