import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const notifySuccess = (message) => {
  toast.success(message, {
    position: "top-right"
  });

};

// Fonction pour afficher une notification d'erreur
const notifyError = (message) =>  {
  toast.error(message, {
    position: "top-right"
  });

};

// Export the NotificationComponent function
export {notifySuccess,notifyError};
