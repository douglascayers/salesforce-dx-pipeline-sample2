#!/usr/bin/env bash

set -o errexit    # always exit on error
set -o nounset    # fail on unset variables

#################################################################
# Script to setup a fully configured pipeline for Salesforce DX #
#################################################################

### Declare values

# Name of your team (optional)
HEROKU_TEAM_NAME=""

# Descriptive name for the Heroku app
HEROKU_APP_NAME="dca-20180825"

# Name of the Heroku apps you'll use
HEROKU_DEV_APP_NAME="$HEROKU_APP_NAME-dev"
HEROKU_STAGING_APP_NAME="$HEROKU_APP_NAME-staging"
HEROKU_PROD_APP_NAME="$HEROKU_APP_NAME-prod"

# Pipeline
HEROKU_PIPELINE_NAME="$HEROKU_APP_NAME-pipeline"

# Usernames or aliases of the orgs you're using
DEV_HUB_USERNAME="HubOrg"
DEV_USERNAME="DevOrg"
STAGING_USERNAME="TestOrg"
PROD_USERNAME="ProdOrg"

# Your package name from force:package:list
PACKAGE_NAME="Pkg20180817"

# Repository with your code (username/repo)
# Only specify a value if you have already connected your GitHub account with Heroku,
# otherwise connect GitHub to your pipeline via the Heroku Dashboard after the script finishes.
GITHUB_REPO=

# Connected App OAuth Settings
OAUTH_SALESFORCE_CLIENT_ID=
OAUTH_SALESFORCE_CLIENT_SECRET=
OAUTH_SALESFORCE_LOGIN_URL=
OAUTH_SALESFORCE_REDIRECT_URI=