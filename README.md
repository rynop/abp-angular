# abp-angular

Convention over configuration based [AWS Blueprint](https://github.com/rynop/aws-blueprint) for running Angular web apps in AWS driven by CI/CD and CloudFormation.

## What this gives you

- Multi-stage, feature branch, CI/CD driven via CodePipeline and Codebuild
- Angular assets gzipped & CDN cached and hosted from S3 origin - supporting Angular routing
- No-maintence, free HTTPS via ACM
- Root domain apex support with redirection
- Local HTTPS support via [ngrok](https://ngrok.com/)
- Node module vendoring (aka commit `node_modules`) with [yarn autoclean](https://yarnpkg.com/lang/en/docs/cli/autoclean/)

## Prerequisites

1.  Create a [github access token](https://github.com/settings/tokens). This token will be used by the CI/CD to pull code. Required scopes: ` admin:repo_hook, repo`
1.  An SNS topic for CI/CD code promotion approvals. Subscribe your email address to it.
1.  [Yarn](https://yarnpkg.com)
1.  **Optional**: free [ngrok](https://ngrok.com/) account required for local HTTPS support

## Quickstart

1. `make install`
1. `make run/local-webapp`
1. **Optonal**: For local HTTPS, in another terminal tab: `make run/ngrok-webapp` (free [ngrok](https://ngrok.com/) account required).

## Setup CI/CD

1.  Set values in [aws/cloudformation/parameters/*.json](./aws/cloudformation/parameters).  The CI/CD CodePipeline will pass these into the cloud formation template ([aws/cloudformation/template.yml](./aws/cloudformation/template.yml)) for each stage stack that is created. Typically the values are the same for each `.json` file except for `StageName`.  Setting `CreateCloudFront` to `false` is helpful early on to bypass slow CDN creation while you are working out kinks.
1.  Create a new CloudFormation stack using [aws/cloudformation/pipeline.yml](./aws/cloudformation/pipeline.yml).  Stack naming convention: `[repo]--[branch]--webapp--cicd`. Ex: `abp-angular--master--webapp-cicd`.  This `pipeline.yml` creates a CodePipeline that is your CI/CD.
1.  Do a `git push` and watch the newly created CodePipeline.  As each stage in the pipeline completes, look at the `Outputs` tab of the executed CloudFormation changeset for the `AppURL`.  Don't see `AppURL`? Make sure `CreateCloudFront` is `true` in [aws/cloudformation/parameters/*.json](./aws/cloudformation/parameters) (just `git push` after changing it to `true`).