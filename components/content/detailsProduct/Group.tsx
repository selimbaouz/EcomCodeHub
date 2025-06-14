import React from 'react';

const Group = () => {
    return (
        <div className="space-y-6 py-4">
            <p>
                <strong className="underline">Accès VIP réservé aux abonnés :</strong>{" "}
                En tant qu’abonné, vous bénéficiez d’un accès privilégié à un groupe privé VIP. Cet espace exclusif vous permet d’échanger avec d’autres membres, de partager vos idées, de poser vos questions et de suggérer des fonctionnalités à ajouter. 
                <br />
                Des audits de boutiques y sont également proposés pour analyser leur potentiel de conversion.
                <br />
                Une fois connecté, vous pouvez accéder au groupe depuis votre <strong>profil</strong>, en cliquant sur l’onglet <strong>“Groupe privé”</strong>.
            </p>
        </div>
    );
};

export default Group;
