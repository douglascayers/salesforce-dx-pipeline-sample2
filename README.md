# Salesforce DX Heroku Pipelines Sample App

This sample uses unlocked second generation packages [(2GPs)](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_dev2gp.htm) to deploy project updates.

Using this sample app and the resources in this repo, you can setup a Heroku Pipeline to drive CI / CD for Salesforce DX.
If you're new to Heroku Pipelines, check out this overview video [How High Performing Software Teams Use Heroku Pipelines for Continuous Delivery](https://www.youtube.com/watch?v=Vqt6ZNLxqnY).

This sample uses the [salesforce-buildpack](https://github.com/douglascayers/salesforce-buildpack2) and the [salesforce-cli-buildpack](https://github.com/heroku/salesforce-cli-buildpack).

![image](https://user-images.githubusercontent.com/746259/36068129-5c8a19b2-0e82-11e8-96b5-a9fed295a33d.png)

## Demo

Watch Doug Ayers' [demo](https://www.youtube.com/watch?v=GDdIfnN2KsE) to the Bay Area Salesforce Developers Group how to use the Salesforce Buildpack using this sample application.

## Requirements

To use Heroku Pipelines with any Salesforce DX project, you only need to do two things:

1. Create a `app.json` file.

2. Create a `sfdx.yml` file.

That's it. Along with the one-time setup scripts (`setup-vars.sh`, `setup-pipeline.sh`, and `setup-oauth.sh`) you find in this repo, the buildpacks do the rest.

## Setup

1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

2. Install the [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli).

3. Log into to the four orgs you'll use with the Salesforce CLI, using `force:auth:web:login` command, and give them aliases:

    - **Dev Hub (e.g.. "HubOrg")**: this will create scratch orgs for your Review Apps
    - **Development Org (e.g. "DevOrg")**: this is the first environment you'll update using a package deploy
    - **Staging Org (e.g. "TestOrg")**: this is the first environment from which you'll promote your code via release phase
    - **Prod Org : "ProdOrg"**: this is your production org

    Note: You could cheat and, simply for demo purposes, use the same org for the DevOrg, TestOrg, and ProdOrg.

    Note: Do not use `force:auth:jwt:grant` command as it does not provide a refresh token nor a `sfdxAuthUrl` from `force:org:display --verbose` command used by the `setup.sh`.

4. Ensure you see all four orgs when you run `sfdx force:org:list`.

5. Fork this repository.

6. Clone the repository locally.

7. Update the values in `setup-vars.sh` accordingly, ignoring the oauth vars for now (e.g. `HEROKU_TEAM_NAME`, `HEROKU_APP_NAME`, `DEV_HUB_USERNAME`, `DEV_USERNAME`, `STAGING_USERNAME`, `PROD_USERNAME`, `GITHUB_REPO`, and `PACKAGE_NAME`).

8. Create an unlocked package in your Dev Hub org, then commit and push the auto-updated `sfdx-project.json` to GitHub.

    ```
    sfdx force:package:create -n <PACKAGE_NAME> -d <PACKAGE_DESCRIPTION> -t Unlocked -e -v <DEV_HUB_USERNAME>
    ```

9. Run `./setup-pipeline.sh` to build your pipeline.

10. Open your pipeline: `heroku pipelines:open <PIPELINE_NAME>`

11. For the review stage, click **Enable Review Apps..**.

12. For the development stage, click the expansion button and then click **Configure automatic deploys..**. Then click **Enable Automatic Deploys**. Do not check "Wait for CI to pass before deploy" unless you have CI setup.

13. Create a Connected App for OAuth ([instructions](https://github.com/douglascayers/salesforce-buildpack2#one-click-login-to-salesforce-orgs-via-heroku-app-urls)).

14. Update the oauth values in `setup-vars.sh` accordingly (e.g. `OAUTH_SALESFORCE_CLIENT_ID`, `OAUTH_SALESFORCE_CLIENT_SECRET`, `OAUTH_SALESFORCE_LOGIN_URL`, and `OAUTH_SALESFORCE_REDIRECT_URI`).

15. Run `./setup-oauth.sh` to update the Heroku apps' config vars.

Now you're all set.

## Usage

1. Open a pull request on GitHub, this will cause a review app to be created in your Heroku Pipeline automatically.

    - It's easiest to do through the GitHub UI. Simply edit a page, then instead of committing directly to the branch, create a pull request.
    - Once created, the review app is ready to go.

2. Close the pull request on GitHub, this will also delete the empemeral review app as it is no longer necessary.

    - If you accepted and merged the changes into your `master` branch, then the buildpack will create and install a new package version into your development org.

3. Promote the app from the development stage to staging and production stages, this will install the same package version that was last built by the development stage.

## Updating Buildpacks

If you want to work against the latest buildpacks, update the version # (or remove entirely) in `app.json` and `setup.sh`.
If you have already ran the `setup.sh` script to create your pipeline, then you will also need to manually update the assigned buildpacks to each Heroku app in the pipeline.

## Clean up

At any time you can run `./destroy.sh` to delete your pipeline and apps.
