#!/bin/bash

set -e

echo "====================================="
echo "BUILDING FRONTEND"
echo "====================================="

cd ~/Kalyam/Client

npm install

npm run build

echo "====================================="
echo "DEPLOYING FRONTEND"
echo "====================================="

sudo mkdir -p /var/www/kalyam-client

sudo rm -rf /var/www/kalyam-client/*

sudo cp -r dist/* /var/www/kalyam-client/

sudo chown -R www-data:www-data /var/www/kalyam-client

sudo chmod -R 755 /var/www/kalyam-client

echo "====================================="
echo "RESTARTING NGINX"
echo "====================================="

sudo nginx -t

sudo systemctl restart nginx

echo "====================================="
echo "RESTARTING BACKEND"
echo "====================================="

cd ~/Kalyam/Server

npm install

npm run pm2:restart

echo "====================================="
echo "DEPLOYMENT COMPLETED"
echo "====================================="
