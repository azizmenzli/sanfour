import React from "react";
import { Steps } from 'rsuite';

// Styles CSS en JS pour le composant Steps
const stepStyles = {
  stepsContainer: {
    width: '200px',
    display: 'inline-table',
    verticalAlign: 'top',
    '--step-indicator-size': '30px',
    '--step-line-width': '2px',
    '--step-completed-color': '#4caf50',
    '--step-pending-color': '#ccc',
    '--step-current-color': '#ff9800',
  },
  stepActive: {
    animation: 'pulse 2s infinite',
  }
};

// Animation keyframes pour l'indicateur de l'étape actuelle
const pulseAnimation = `
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 152, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 152, 0, 0);
  }
}
`;

const Stepss = () => (
  <>
    <style>{pulseAnimation}</style>
    <Steps current={0} vertical style={stepStyles.stepsContainer}>
      <Steps.Item title="En attente" description="Ville fournisseur - date & heure" />
      <Steps.Item title="Au dépôt" description="Borj Cédria - date & heure" />
      <Steps.Item title="En cours de livraison" description="Vers Ville client - date & heure" />
      <Steps.Item title="Livré" description="Ville client - date & heure" />
    </Steps>
  </>
);

export default Stepss;
