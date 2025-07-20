#!/bin/bash

echo "🚀 Credit Friend MVP Deployment Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking deployment requirements..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 16 or higher."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        print_error "git is not installed. Please install git."
        exit 1
    fi
    
    print_success "All requirements met!"
}

# Deploy Backend to Heroku
deploy_backend() {
    print_status "Deploying backend to Heroku..."
    
    cd backend
    
    # Check if Heroku CLI is installed
    if ! command -v heroku &> /dev/null; then
        print_warning "Heroku CLI not found. Please install it first:"
        echo "https://devcenter.heroku.com/articles/heroku-cli"
        echo ""
        print_status "Alternatively, you can deploy manually:"
        echo "1. Create a Heroku app: heroku create your-app-name"
        echo "2. Set environment variables:"
        echo "   heroku config:set MONGODB_URI=your-mongodb-uri"
        echo "   heroku config:set JWT_SECRET=your-jwt-secret"
        echo "   heroku config:set OPENAI_API_KEY=your-openai-key"
        echo "3. Deploy: git push heroku main"
        return 1
    fi
    
    # Check if Heroku app exists
    if ! heroku apps:info &> /dev/null; then
        print_status "Creating new Heroku app..."
        heroku create credit-friend-backend-$(date +%s)
    fi
    
    # Set environment variables
    print_status "Setting environment variables..."
    heroku config:set NODE_ENV=production
    
    # Deploy
    print_status "Deploying to Heroku..."
    git add .
    git commit -m "Deploy backend for MVP" || true
    git push heroku main
    
    # Get the app URL
    BACKEND_URL=$(heroku info -s | grep web_url | cut -d= -f2)
    print_success "Backend deployed to: $BACKEND_URL"
    
    cd ..
    return 0
}

# Deploy Frontend to Netlify
deploy_frontend() {
    print_status "Deploying frontend to Netlify..."
    
    cd frontend
    
    # Build the project
    print_status "Building frontend..."
    npm run build
    
    # Check if Netlify CLI is installed
    if ! command -v netlify &> /dev/null; then
        print_warning "Netlify CLI not found. Please install it first:"
        echo "npm install -g netlify-cli"
        echo ""
        print_status "Alternatively, you can deploy manually:"
        echo "1. Go to https://app.netlify.com"
        echo "2. Drag and drop the 'build' folder"
        echo "3. Set environment variable REACT_APP_API_URL to your backend URL"
        return 1
    fi
    
    # Deploy to Netlify
    print_status "Deploying to Netlify..."
    netlify deploy --prod --dir=build
    
    print_success "Frontend deployed successfully!"
    
    cd ..
    return 0
}

# Setup MongoDB Atlas (free tier)
setup_mongodb() {
    print_status "Setting up MongoDB Atlas..."
    echo ""
    echo "📋 MongoDB Atlas Setup Instructions:"
    echo "1. Go to https://www.mongodb.com/atlas"
    echo "2. Create a free account"
    echo "3. Create a new cluster (free tier)"
    echo "4. Create a database user"
    echo "5. Get your connection string"
    echo "6. Set it as MONGODB_URI in your backend environment"
    echo ""
    print_warning "Make sure to whitelist your IP address in MongoDB Atlas"
}

# Setup OpenAI API
setup_openai() {
    print_status "Setting up OpenAI API..."
    echo ""
    echo "📋 OpenAI API Setup Instructions:"
    echo "1. Go to https://platform.openai.com"
    echo "2. Create an account and get your API key"
    echo "3. Set OPENAI_API_KEY in your backend environment"
    echo ""
    print_warning "OpenAI API has usage costs. Monitor your usage!"
}

# Main deployment function
main() {
    echo ""
    print_status "Starting Credit Friend MVP deployment..."
    echo ""
    
    # Check requirements
    check_requirements
    
    echo ""
    print_status "Choose deployment option:"
    echo "1. Full deployment (Backend + Frontend)"
    echo "2. Backend only (Heroku)"
    echo "3. Frontend only (Netlify)"
    echo "4. Setup instructions only"
    echo ""
    read -p "Enter your choice (1-4): " choice
    
    case $choice in
        1)
            print_status "Starting full deployment..."
            deploy_backend
            if [ $? -eq 0 ]; then
                deploy_frontend
            fi
            ;;
        2)
            deploy_backend
            ;;
        3)
            deploy_frontend
            ;;
        4)
            setup_mongodb
            setup_openai
            ;;
        *)
            print_error "Invalid choice. Exiting..."
            exit 1
            ;;
    esac
    
    echo ""
    print_success "Deployment process completed!"
    echo ""
    print_status "Next steps:"
    echo "1. Set up your environment variables"
    echo "2. Test your deployed application"
    echo "3. Share the URL with your users"
    echo ""
    print_status "For support, check the README.md file"
}

# Run the main function
main 