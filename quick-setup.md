# ⚡ Quick Setup - Get Credit Friend Live in 15 Minutes

## 🚀 Ultra-Fast Deployment

### Step 1: Setup Accounts (5 minutes)
1. **MongoDB Atlas** (Free): https://www.mongodb.com/atlas
   - Create account → New cluster → Get connection string
2. **OpenAI API** (Free credits): https://platform.openai.com
   - Create account → Get API key
3. **Heroku** (Free): https://heroku.com
   - Create account → Install CLI
4. **Netlify** (Free): https://netlify.com
   - Create account → Install CLI: `npm install -g netlify-cli`

### Step 2: Deploy Backend (5 minutes)
```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create credit-friend-backend-$(date +%s)

# Set environment variables (replace with your actual values)
heroku config:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/credit-friend"
heroku config:set JWT_SECRET="your-super-secret-jwt-key-12345"
heroku config:set OPENAI_API_KEY="sk-your-openai-api-key"
heroku config:set NODE_ENV="production"

# Deploy
git add .
git commit -m "Deploy MVP"
git push heroku main

# Get your backend URL
heroku info -s | grep web_url
```

### Step 3: Deploy Frontend (5 minutes)
```bash
cd frontend

# Build
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=build

# Set API URL (replace with your backend URL)
netlify env:set REACT_APP_API_URL "https://your-backend-url.herokuapp.com/api"
```

## 🎯 Your URLs
- **Frontend:** `https://your-app-name.netlify.app`
- **Backend:** `https://your-backend-url.herokuapp.com`

## 🧪 Test Your App
1. Visit your frontend URL
2. Register with any license key (e.g., "MVP-2024")
3. Add a test company
4. Generate a credit report

## 💡 Pro Tips
- Use the automated script: `./deploy.sh`
- Check logs: `heroku logs --tail`
- Monitor costs: Heroku free tier, OpenAI pay-per-use

## 🆘 Need Help?
- Check `DEPLOYMENT.md` for detailed instructions
- Run `./deploy.sh` for guided deployment
- Check logs for errors

**🎉 You're live! Share your URL with users!** 