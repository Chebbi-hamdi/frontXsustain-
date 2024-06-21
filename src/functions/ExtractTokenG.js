import React, { useEffect } from 'react';

const ExtractTokenG = (RedPage) => {
    useEffect(() => {
        const fetchData = async () => {
            // Extraction du token de l'URL
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            if (token) {
                await localStorage.setItem('token', token);

                // Stockage local du token
            } else {
                // Gérer le cas où aucun token n'est présent dans l'URL
                console.error('Aucun token trouvé dans l\'URL.');
            }

            // Redirection vers la page spécifiée
            window.location.href = RedPage; // Assurez-vous de remplacer 'RedPage' par l'URL de votre page de redirection
        };

        fetchData();
    }, []); // Les dépendances sont vides, donc ce code ne s'exécutera qu'une fois après le rendu initial

    return null; // Composant sans rendu
}

export default ExtractTokenG;
