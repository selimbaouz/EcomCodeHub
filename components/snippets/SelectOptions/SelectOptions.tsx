"use client";
import React, { useState } from 'react';
import styles from './select-options.module.css';
import ContainerSnippet from '../ContainerSnippet';

export const contentData = (selected: number) => {
    switch (selected) {
    case 0:
      return {
        title: "Crème Hydratante",
        description: "Offrez à votre peau une hydratation longue durée grâce à notre crème légère et nourrissante. Parfaite pour tous les types de peau.",
      };
    case 1:
      return {
        title: "Sérum Anti-Âge",
        description: "Réduisez les signes de l’âge avec ce sérum raffermissant qui stimule la régénération cellulaire pour une peau plus ferme et éclatante.",
      };
    case 2:
      return {
        title: "Masque Purifiant",
        description: "Détendez-vous et purifiez votre peau avec ce masque, qui élimine les impuretés tout en laissant votre teint frais et lumineux.",
      };
    case 3:
      return {
        title: "Shampooing Revitalisant",
        description: "Restaurez la vitalité de vos cheveux avec ce shampooing riche en vitamines, idéal pour les cheveux secs et abîmés.",
      };
    case 4:
      return {
        title: "Exfoliant Doux",
        description: "Offrez à votre peau une exfoliation douce et efficace grâce à cet exfoliant qui enlève les cellules mortes tout en hydratant la peau.",
      };
    default:
      return {
        title: "Crème Hydratante",
        description: "Offrez à votre peau une hydratation longue durée grâce à notre crème légère et nourrissante. Parfaite pour tous les types de peau.",
      };
    }
};

const SelectOptions = () => {
    const [select, setselect] = useState(0);

    return (
      <ContainerSnippet>
        <div className={styles.container}>
            <div className={styles.optionsWrapper}>
                {[
                    { title: "Crème Hydratante" },
                    { title: "Sérum Anti-Âge" },
                    { title: "Masque Purifiant" },
                    { title: "Shampooing Revitalisant" },
                    { title: "Exfoliant Doux" },
                ].map((data, index) => (
                    <button
                    key={index}
                    className={`${styles.optionButton} ${select === index && styles.activeOption}`}
                    onClick={() => {
                        contentData(index);
                        setselect(index);
                    }}
                    >
                    {data.title}
                    </button>
                ))}
            </div>

            <div id="content" className={styles.contentWrapper}>
                <h2 id="title" className={styles.title}>{contentData(select).title}</h2>
                <p id="description" className={styles.description}>{contentData(select).description}</p>
            </div>
        </div>
      </ContainerSnippet>
    );
};

export default SelectOptions;
