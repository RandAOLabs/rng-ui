# Pipeline Deployment Guide

## Prerequisites

1. **ArConnect Wallet**
   - Get a wallet at [ArConnect](https://www.arconnect.io/)
   - Ensure it's funded with AR tokens

2. **ArNS Name**
   - Purchase a name at [ArNS](https://arns.app/)
   - Get your process ID at [ArNS Manager](https://arns.app/#/manage/names)

## GitHub Secrets Configuration

Configure the following in your repository's GitHub secrets:

1. `DEPLOY_KEY`
   - Your ArConnect wallet key (Base64 encoded JSON)
   - Use a VSCode plugin to encode the JSON to Base64

2. `DEPLOY_ANT_PROCESS`
   - Your ArNS process ID

3. `DEPLOY_NAME` (Optional)
   - Required only if deploying under an ArNS name

## Setting Up Secrets

1. Go to repository settings → "Secrets and variables" → "Actions"
2. Add each required secret
