import { checkProduct } from '@/data';
import { cn } from '@/lib/utils';
import React from 'react';
import styles from './feature-checklist.module.css';
import ContainerSnippet from '../ContainerSnippet';

const FeatureChecklist = () => {
  return (
    <ContainerSnippet>
      <ul className={cn(styles.list)}>
        {checkProduct.map((data, index) => (
          <li key={index} className={cn(styles.item)}>
            <data.icon className={cn(styles.icon)} />
            <p className={cn(styles.text)}>{data.title}</p>
          </li>
        ))}
      </ul>
    </ContainerSnippet>
  );
};

export default FeatureChecklist;
