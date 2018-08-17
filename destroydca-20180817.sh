heroku pipelines:destroy dca-20180817-pipeline
heroku apps:destroy -a dca-20180817-dev -c dca-20180817-dev
heroku apps:destroy -a dca-20180817-staging -c dca-20180817-staging
heroku apps:destroy -a dca-20180817-prod -c dca-20180817-prod
rm -- "destroydca-20180817.sh"
