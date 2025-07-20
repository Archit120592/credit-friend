# 🚀 Credit Friend MVP Deployment Guide

This guide will help you deploy Credit Friend to a public URL for your MVP stage.

## 🎯 Quick Deployment Options

### Option 1: Automated Deployment (Recommended)
```bash
./deploy.sh
```

### Option 2: Manual Deployment
Follow the step-by-step instructions below.

## 📋 Prerequisites

1. **Node.js** (v16 or higher)
2. **Git** installed
3. **Heroku CLI** (for backend)
4. **Netlify CLI** (for frontend)
5. **MongoDB Atlas** account (free tier)
6. **OpenAI API** key

## 🔧 Step-by-Step Deployment

### 1. Setup MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user with read/write permissions
5. Get your connection string
6. Whitelist your IP address (or use `0.0.0.0/0` for all IPs)

**Connection string format:**
```
mongodb+srv://username:password@cluster.mongodb.net/credit-friend?retryWrites=true&w=majority
```

### 2. Setup OpenAI API

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create an account
3. Get your API key
4. Add billing information (required for API usage)

### 3. Deploy Backend to Heroku

#### Install Heroku CLI
```bash
# macOS
brew install heroku/brew/heroku

# Windows
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

#### Deploy Backend
```bash
cd backend

# Login to Heroku
heroku login

# Create new Heroku app
heroku create credit-friend-backend-$(date +%s)

# Set environment variables
heroku config:set MONGODB_URI="your-mongodb-connection-string"
heroku config:set JWT_SECRET="your-super-secret-jwt-key"
heroku config:set OPENAI_API_KEY="your-openai-api-key"
heroku config:set NODE_ENV="production"

# Deploy
git add .
git commit -m "Deploy backend for MVP"
git push heroku main

# Get your backend URL
heroku info -s | grep web_url
```

**Your backend will be available at:** `https://your-app-name.herokuapp.com`

### 4. Deploy Frontend to Netlify

#### Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Deploy Frontend
```bash
cd frontend

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=build

# Set environment variable for API URL
netlify env:set REACT_APP_API_URL "https://your-backend-url.herokuapp.com/api"
```

**Your frontend will be available at:** `https://your-app-name.netlify.app`

### 5. Alternative: Deploy to Vercel

If you prefer Vercel over Netlify:

```bash
cd frontend

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Set environment variable
vercel env add REACT_APP_API_URL
```

## 🔗 Final URLs

After deployment, you'll have:

- **Frontend:** `https://your-app-name.netlify.app`
- **Backend API:** `https://your-backend-url.herokuapp.com/api`

## 🧪 Testing Your Deployment

1. **Visit your frontend URL**
2. **Register an admin account** with your license key
3. **Test the main features:**
   - Add a company
   - Generate a credit report
   - Access the admin panel
   - Try the Finance Academy

## 📊 Monitoring & Maintenance

### Heroku Backend Monitoring
```bash
# View logs
heroku logs --tail

# Check app status
heroku ps

# Monitor dyno usage
heroku ps:scale web=1
```

### Netlify Frontend Monitoring
- Go to your Netlify dashboard
- Check deployment status
- Monitor form submissions
- View analytics

## 🔧 Environment Variables Reference

### Backend (Heroku)
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/credit-friend
JWT_SECRET=your-super-secret-jwt-key
OPENAI_API_KEY=sk-your-openai-api-key
NODE_ENV=production
```

### Frontend (Netlify/Vercel)
```bash
REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
REACT_APP_ENV=production
```

## 🚨 Troubleshooting

### Common Issues

1. **Backend deployment fails**
   - Check Heroku logs: `heroku logs --tail`
   - Verify environment variables are set
   - Ensure MongoDB connection string is correct

2. **Frontend can't connect to backend**
   - Verify `REACT_APP_API_URL` is set correctly
   - Check CORS settings in backend
   - Ensure backend is running

3. **MongoDB connection issues**
   - Verify connection string format
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has correct permissions

4. **OpenAI API errors**
   - Verify API key is correct
   - Check billing status
   - Monitor API usage limits

### Getting Help

1. Check the logs: `heroku logs --tail`
2. Verify environment variables: `heroku config`
3. Test API endpoints directly
4. Check browser console for frontend errors

## 📈 Scaling for Production

### Backend Scaling (Heroku)
```bash
# Scale to multiple dynos
heroku ps:scale web=2

# Add add-ons for production
heroku addons:create mongolab:sandbox
heroku addons:create papertrail:choklad
```

### Frontend Scaling (Netlify)
- Enable CDN (automatic)
- Set up custom domain
- Configure redirects and headers

## 🔐 Security Considerations

1. **Use strong JWT secrets**
2. **Enable HTTPS** (automatic on Heroku/Netlify)
3. **Set up proper CORS** in backend
4. **Monitor API usage** and costs
5. **Regular security updates**

## 📞 Support

For deployment issues:
1. Check this guide
2. Review platform documentation
3. Check application logs
4. Contact the development team

---

**🎉 Congratulations!** Your Credit Friend MVP is now live and ready for users! 