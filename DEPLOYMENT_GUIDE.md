# AWS Ubuntu Deployment Guide (MobaXterm)

## Prerequisites
- AWS Account
- MobaXterm installed locally

---

## Step 1: Create AWS EC2 Instance
1. Login to AWS Console → EC2 → Launch Instance
2. Name: `e-learning-backend`
3. AMI: **Ubuntu Server 22.04 LTS (Free Tier)**
4. Instance Type: `t2.micro` (Free Tier eligible)
5. Key Pair: Create new → Download `.pem` file → Save to `C:\Users\[User]\.ssh\your-key.pem`
6. Network Settings:
   - Allow SSH (port 22) - Anywhere
   - Allow HTTP (port 80) - Anywhere
   - Allow Custom TCP (port 3000) - Anywhere (or your app port)
7. Launch Instance

---

## Step 2: Connect via MobaXterm
1. Open MobaXterm → Session → SSH
2. Host: `[Your-EC2-Public-IP]` (e.g., `3.12.45.10`)
3. Username: `ubuntu`
4. Private Key: Browse to your `.pem` file
5. Click OK

---

## Step 3: Server Setup (Run in MobaXterm SSH)
```bash
# Update & install essentials
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx mysql-server

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/nodesource-setup.sh | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version && npm --version
```

---

## Step 4: Configure Firewall
```bash
# If using ufw
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

---

## Step 5: Deploy Application
```bash
# Clone repository
git clone https://github.com/Rathana-SOKHA/E_Learning_Management_System_Backend.git
cd E_Learning_Management_System_Backend

# Install dependencies
npm install --production

# Copy environment file
cp .env.example .env
nano .env
```

**Edit `.env` with your values:**
```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_DATABASE=your_database
```

---

## Step 6: Setup MySQL Database
```bash
# Secure MySQL
sudo mysql_secure_installation

# Login to MySQL
sudo mysql

# In MySQL:
CREATE DATABASE e_learning_db;
CREATE USER 'e_learning_user'@'localhost' IDENTIFIED BY 'Elearning123!';
GRANT ALL PRIVILEGES ON e_learning_db.* TO 'e_learning_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Step 7: Build & Run Application
```bash
# Build TypeScript
npm run build

# Run with PM2 (recommended for production)
sudo npm install -g pm2
pm2 start dist/server.js --name "e-learning-api"

# Enable PM2 startup
pm2 startup systemd
pm2 save
```

---

## Step 8: Configure Nginx Reverse Proxy
```bash
sudo nano /etc/nginx/sites-available/default
```

**Replace with:**
```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Test & restart Nginx
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

---

## Step 9: Final Verification
```bash
# Check app status
pm2 logs e-learning-api

# Test endpoint
curl http://localhost:3000

# Check Nginx
sudo systemctl status nginx
```

---

## Access Your API
`http://[Your-EC2-Public-IP]` or `http://[Your-EC2-Public-DNS]`

---

## Useful Commands
```bash
# View logs
pm2 logs e-learning-api

# Restart app
pm2 restart e-learning-api

# Monitor
pm2 monit

# Deploy updates
git pull origin main && npm run build && pm2 restart e-learning-api
```