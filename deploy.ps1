Write-Host "🚀 Credit Friend MVP Deployment Script" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check requirements
Write-Status "Checking deployment requirements..."

try {
    $nodeVersion = node --version
    Write-Success "Node.js found: $nodeVersion"
} catch {
    Write-Error "Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
}

try {
    $npmVersion = npm --version
    Write-Success "npm found: $npmVersion"
} catch {
    Write-Error "npm is not installed. Please install npm."
    exit 1
}

try {
    $gitVersion = git --version
    Write-Success "Git found: $gitVersion"
} catch {
    Write-Error "Git is not installed. Please install Git."
    exit 1
}

Write-Success "All requirements met!"
Write-Host ""

# Show deployment options
Write-Status "Choose deployment option:"
Write-Host "1. Full deployment (Backend + Frontend)" -ForegroundColor Cyan
Write-Host "2. Backend only (Heroku)" -ForegroundColor Cyan
Write-Host "3. Frontend only (Netlify)" -ForegroundColor Cyan
Write-Host "4. Setup instructions only" -ForegroundColor Cyan
Write-Host ""

$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Status "Starting full deployment..."
        Write-Host ""
        Write-Warning "Please ensure you have:"
        Write-Host "  - Heroku CLI installed and logged in" -ForegroundColor Yellow
        Write-Host "  - Netlify CLI installed" -ForegroundColor Yellow
        Write-Host "  - MongoDB Atlas account" -ForegroundColor Yellow
        Write-Host "  - OpenAI API key" -ForegroundColor Yellow
        Write-Host ""
        Write-Status "Follow the manual deployment steps in DEPLOYMENT.md"
    }
    "2" {
        Write-Status "Backend deployment instructions:"
        Write-Host ""
        Write-Host "1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli" -ForegroundColor Cyan
        Write-Host "2. Login: heroku login" -ForegroundColor Cyan
        Write-Host "3. Create app: heroku create credit-friend-backend-[timestamp]" -ForegroundColor Cyan
        Write-Host "4. Set environment variables:" -ForegroundColor Cyan
        Write-Host "   heroku config:set MONGODB_URI='your-mongodb-uri'" -ForegroundColor Cyan
        Write-Host "   heroku config:set JWT_SECRET='your-jwt-secret'" -ForegroundColor Cyan
        Write-Host "   heroku config:set OPENAI_API_KEY='your-openai-key'" -ForegroundColor Cyan
        Write-Host "5. Deploy: git push heroku main" -ForegroundColor Cyan
    }
    "3" {
        Write-Status "Frontend deployment instructions:"
        Write-Host ""
        Write-Host "1. Install Netlify CLI: npm install -g netlify-cli" -ForegroundColor Cyan
        Write-Host "2. Build: npm run build" -ForegroundColor Cyan
        Write-Host "3. Deploy: netlify deploy --prod --dir=build" -ForegroundColor Cyan
        Write-Host "4. Set API URL: netlify env:set REACT_APP_API_URL 'your-backend-url'" -ForegroundColor Cyan
    }
    "4" {
        Write-Status "Setup instructions:"
        Write-Host ""
        Write-Host "📋 Required Accounts:" -ForegroundColor Cyan
        Write-Host "  - MongoDB Atlas: https://www.mongodb.com/atlas" -ForegroundColor Yellow
        Write-Host "  - OpenAI API: https://platform.openai.com" -ForegroundColor Yellow
        Write-Host "  - Heroku: https://heroku.com" -ForegroundColor Yellow
        Write-Host "  - Netlify: https://netlify.com" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📋 Required Tools:" -ForegroundColor Cyan
        Write-Host "  - Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli" -ForegroundColor Yellow
        Write-Host "  - Netlify CLI: npm install -g netlify-cli" -ForegroundColor Yellow
    }
    default {
        Write-Error "Invalid choice. Exiting..."
        exit 1
    }
}

Write-Host ""
Write-Success "Deployment instructions provided!"
Write-Host ""
Write-Status "For detailed instructions, check DEPLOYMENT.md"
Write-Status "For quick setup, check quick-setup.md" 