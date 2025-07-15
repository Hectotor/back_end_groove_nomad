import Airtable from 'airtable';
import { Base, Table } from 'airtable';
import { getFirestore } from 'firebase-admin/firestore';

// Configuration Airtable
const getAirtableConfig = async () => {
  const db = getFirestore();
  const configDoc = await db.collection('api_key_stripe').doc('api').get();
  
  if (!configDoc.exists) {
    throw new Error('Configuration Airtable non trouvée dans Firestore');
  }
  
  const data = configDoc.data();
  if (!data || !data._airtableAccessToken || !data._airtableBaseId) {
    throw new Error('Données de configuration Airtable incomplètes');
  }
  
  return {
    accessToken: data._airtableAccessToken,
    baseId: data._airtableBaseId
  };
};

let airtableConfig: any;

export const getAirtableBase = async () => {
  try {
    if (!airtableConfig) {
      airtableConfig = await getAirtableConfig();
      const airtable = new Airtable({
        apiKey: airtableConfig.accessToken,
        apiVersion: '2023-07-15',
      });
      airtableConfig.base = airtable.base(airtableConfig.baseId);
    }
    return airtableConfig.base;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation d\'Airtable:', error);
    throw error;
  }
};

export const tables = {
  users: 'Utilisateurs',
  // Ajoutez d'autres tables ici selon vos besoins
};
