#!/bin/bash

################################################################################
# Script de déploiement automatique pour Lodenn Studio Website
# Exécuté par GitHub Actions après chaque push sur main
################################################################################

set -e  # Exit on error

echo "=========================================="
echo "🚀 Déploiement de Lodenn Studio Website"
echo "=========================================="

# Variables
APP_DIR="/var/www/lodennstudio"
BRANCH="main"

# Navigation vers le répertoire de l'application
echo ""
echo "📁 Navigation vers $APP_DIR..."
cd $APP_DIR

# Récupération des dernières modifications
echo ""
echo "📥 Récupération du code depuis GitHub..."
# Note: Nécessite une clé SSH configurée sur le VPS
git fetch origin $BRANCH
git reset --hard origin/$BRANCH

# Installation des dépendances
echo ""
echo "📦 Installation des dépendances..."
npm ci --production=false

# Build du projet
echo ""
echo "🔨 Build du projet Next.js..."
npm run build

# Redémarrage de l'application avec PM2
echo ""
echo "🔄 Redémarrage de l'application..."
if pm2 list | grep -q "lodennstudio"; then
  echo "Redémarrage de l'application existante..."
  pm2 reload ecosystem.config.js --update-env
else
  echo "Première exécution, démarrage de l'application..."
  pm2 start ecosystem.config.js
fi

# Sauvegarde de la configuration PM2
pm2 save

# Nettoyage des anciens builds (optionnel)
echo ""
echo "🧹 Nettoyage..."
npm prune --production

echo ""
echo "=========================================="
echo "✅ Déploiement terminé avec succès !"
echo "=========================================="
echo ""
echo "📊 Statut de l'application:"
pm2 status

echo ""
echo "💡 Commandes utiles:"
echo "   - Voir les logs: pm2 logs lodennstudio"
echo "   - Redémarrer: pm2 restart lodennstudio"
echo "   - Arrêter: pm2 stop lodennstudio"
echo ""
