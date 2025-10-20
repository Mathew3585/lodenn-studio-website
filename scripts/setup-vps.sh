#!/bin/bash

################################################################################
# Script d'installation initiale du VPS pour Lodenn Studio Website
# Ubuntu 24.04 LTS
################################################################################

set -e  # Exit on error

echo "=========================================="
echo "🚀 Configuration du VPS pour Lodenn Studio"
echo "=========================================="

# Vérifier si on est root
if [ "$EUID" -ne 0 ]; then
  echo "❌ Ce script doit être exécuté en tant que root"
  echo "Utilisez: sudo bash setup-vps.sh"
  exit 1
fi

# Mise à jour du système
echo ""
echo "📦 Mise à jour du système..."
apt update && apt upgrade -y

# Installation des dépendances de base
echo ""
echo "📦 Installation des outils de base..."
apt install -y curl git ufw build-essential

# Installation de Node.js 20 LTS
echo ""
echo "📦 Installation de Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Vérification de l'installation Node.js
echo ""
echo "✅ Node.js version:"
node --version
echo "✅ NPM version:"
npm --version

# Installation de PM2 globalement
echo ""
echo "📦 Installation de PM2 (Process Manager)..."
npm install -g pm2

# Configuration de PM2 pour démarrer au boot
echo ""
echo "⚙️  Configuration de PM2 pour démarrer automatiquement..."
env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root
pm2 save

# Installation de Nginx
echo ""
echo "📦 Installation de Nginx..."
apt install -y nginx

# Installation de Certbot pour SSL
echo ""
echo "📦 Installation de Certbot (Let's Encrypt SSL)..."
apt install -y certbot python3-certbot-nginx

# Configuration du firewall UFW
echo ""
echo "🔒 Configuration du firewall..."
ufw --force enable
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw status

# Création du répertoire pour l'application
echo ""
echo "📁 Création du répertoire de l'application..."
mkdir -p /var/www/lodennstudio
chown -R root:root /var/www/lodennstudio

# Clone du repository (vous devrez peut-être configurer les credentials GitHub)
echo ""
echo "📥 Clone du repository GitHub..."
cd /var/www/lodennstudio

# Note: Si le repo est privé, vous devrez configurer une clé SSH ou un token
if [ -d ".git" ]; then
  echo "Le repository existe déjà, mise à jour..."
  git pull origin main
else
  echo "Clone du repository..."
  git clone https://github.com/Mathew3585/lodenn-studio-website.git .
fi

# Installation des dépendances du projet
echo ""
echo "📦 Installation des dépendances du projet..."
npm install --production

# Build du projet Next.js
echo ""
echo "🔨 Build du projet Next.js..."
npm run build

# Création du fichier .env.production (à configurer manuellement après)
if [ ! -f ".env.production" ]; then
  echo ""
  echo "📝 Création du fichier .env.production..."
  cat > .env.production << 'EOF'
NODE_ENV=production
# RESEND_API_KEY=votre_clé_api_resend (à configurer plus tard)
EOF
fi

echo ""
echo "=========================================="
echo "✅ Installation terminée !"
echo "=========================================="
echo ""
echo "📋 Prochaines étapes:"
echo ""
echo "1. Configurez le fichier Nginx:"
echo "   - Copiez la configuration depuis scripts/nginx-config.txt"
echo "   - Vers /etc/nginx/sites-available/lodennstudio"
echo "   - Créez le lien symbolique: ln -s /etc/nginx/sites-available/lodennstudio /etc/nginx/sites-enabled/"
echo "   - Testez: nginx -t"
echo "   - Redémarrez: systemctl restart nginx"
echo ""
echo "2. Configurez les DNS pour pointer lodennstudio.com vers votre VPS"
echo ""
echo "3. Démarrez l'application avec PM2:"
echo "   cd /var/www/lodennstudio"
echo "   pm2 start ecosystem.config.js"
echo "   pm2 save"
echo ""
echo "4. Une fois les DNS propagés, configurez SSL:"
echo "   certbot --nginx -d lodennstudio.com -d www.lodennstudio.com"
echo ""
echo "5. Consultez DEPLOYMENT.md pour plus de détails"
echo ""
