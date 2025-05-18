# Lbzar Express - Guide de Test Local

## Configuration Initiale
1. **Dépendances** :  
   - Node.js (v18+)
   - npm
   - MongoDB (v5.0+)
   - MongoDB Compass (facultatif)

2. **Variables d'environnement** :  
   Créez un fichier `.env.local` dans le répertoire racine avec :
   ```
   MONGO_URI=mongodb://localhost:27017/lbzar
   JWT_SECRET=your-secret-key-here
   ```

3. **Base de données** :  
   - Assurez-vous que MongoDB est en cours d'exécution sur le port 27017.
   - Vérifiez que la base de données `lbzar` est accessible.

## Lancement des Services
1. **Client** :  
   ```bash
   cd client
   npm install
   npm run dev
   ```
   - Le client devrait démarrer sur http://localhost:3000

2. **Serveur** :  
   ```bash
   cd server
   npm install
   npm run server
   ```
   - Le serveur devrait démarrer sur http://localhost:5000

## Vérification des Fonctionnalités
### 1. Authentification
- Testez l'inscription avec un email valide (ex. `test@example.com`)
- Testez la connexion avec des identifiants corrects et incorrects
- Vérifiez que les tokens JWT sont générés correctement

### 2. Formulaire Client
- Remplissez le formulaire de commande avec des données valides
- Vérifiez que la commande est enregistrée dans la base de données
- Testez les validations de formulaire (ex. email invalide, téléphone mal formaté)

### 3. Interface Admin
- Connectez-vous en tant qu'administrateur
- Vérifiez la visualisation des commandes assignées
- Testez la modification et la suppression de commandes
- Vérifiez les filtres de recherche et de tri

### 4. Statuts de Livraison
- Simulez la mise à jour des statuts via l'API
- Vérifiez la synchronisation en temps réel entre le client et le serveur
- Testez les notifications de statut (console.log pour le débogage)

### 5. Redirection WhatsApp
- Cliquez sur les boutons WhatsApp pour vérifier la redirection
- Vérifiez que les URLs sont correctement formatées (ex. `https://wa.me/...`)

### 6. Routing React
- Testez l'accès aux routes principales : `/`, `/commandes`, `/livreurs`
- Vérifiez l'absence d'erreurs 404
- Testez le comportement des liens internes

## Contraintes
- Les tests doivent être effectués dans un environnement isolé
- Les données de test doivent être nettoyées après chaque vérification
- Les erreurs techniques doivent être documentées avec des logs détaillés
- Les ports 3000, 5000, et 27017 doivent être disponibles
