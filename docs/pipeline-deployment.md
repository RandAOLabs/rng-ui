# Pipeline Deployment Guide

## Prerequisites

1. **ArConnect Wallet**
   - Get a wallet at [ArConnect](https://www.arconnect.io/)

2. **ArNS Name**
   - Purchase a name at [ArNS](https://arns.app/)
   - Get your process ID at [ArNS Manager](https://arns.app/#/manage/names)

## Setting Up GitHub Secrets

1. Go to [repository settings → secrets](https://github.com/RandAOLabs/rng-ui/settings/secrets/actions)

2. Add `DEPLOY_KEY`
   - Your ArConnect wallet key (Base64 encoded JSON)
   - Use a VSCode plugin to encode the JSON to Base64

3. Add `DEPLOY_ANT_PROCESS`
   - Your ArNS process ID

4. (Optional) Add `DEPLOY_UNDERNAME`
   - Your ArNS name for deployment
   - If not set, deployment will proceed without an Undername
