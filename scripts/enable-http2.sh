#!/bin/bash

# Script pour activer HTTP/2 sur Nginx
# Ce script modifie la configuration Nginx pour activer HTTP/2

set -e

echo "🚀 Activation de HTTP/2 sur Nginx..."
echo ""

# Vérifier si on est root ou sudo
if [ "$EUID" -ne 0 ]; then
    echo "❌ Ce script doit être exécuté avec sudo"
    echo "Usage: sudo bash scripts/enable-http2.sh"
    exit 1
fi

# Chemin du fichier de configuration Nginx
NGINX_CONFIG="/etc/nginx/sites-available/lodennstudio"

# Vérifier que le fichier existe
if [ ! -f "$NGINX_CONFIG" ]; then
    echo "❌ Fichier de configuration non trouvé : $NGINX_CONFIG"
    exit 1
fi

echo "📝 Modification de la configuration Nginx..."

# Backup de la configuration actuelle
cp "$NGINX_CONFIG" "$NGINX_CONFIG.backup-$(date +%Y%m%d-%H%M%S)"
echo "✅ Backup créé"

# Modifier la configuration pour activer HTTP/2
# Remplacer "listen 443 ssl;" par "listen 443 ssl http2;"
sed -i 's/listen 443 ssl;/listen 443 ssl http2;/g' "$NGINX_CONFIG"

echo "✅ Configuration modifiée"
echo ""

# Tester la configuration Nginx
echo "🔍 Test de la configuration Nginx..."
if nginx -t; then
    echo ""
    echo "✅ Configuration valide"
    echo ""

    # Redémarrer Nginx
    echo "🔄 Redémarrage de Nginx..."
    systemctl restart nginx

    echo ""
    echo "✅ Nginx redémarré avec succès"
    echo ""
    echo "🎉 HTTP/2 est maintenant activé !"
    echo ""
    echo "📊 Pour vérifier, utilisez :"
    echo "   curl -I --http2 https://lodennstudio.com"
    echo ""
else
    echo ""
    echo "❌ Erreur dans la configuration Nginx"
    echo "🔄 Restauration du backup..."
    mv "$NGINX_CONFIG.backup-"* "$NGINX_CONFIG"
    echo "✅ Configuration restaurée"
    exit 1
fi
