# abp-angular

[AWS Blueprint](https://github.com/rynop/aws-blueprint) for running Angular web apps AWS

## What this gives you

- Angular assets gzipped & CDN hosted out of S3 - supporting Angular routing
- No-maintence, free HTTPS
- Root domain apex support with redirection
- Angular build & deploy scripts
- Local development HTTPS support with self signed cert generation
- Pre-commit git hook that does linting

## Setup

Note: This blueprint asserts you use [yarn](https://yarnpkg.com/en/)

1.  Generate an Angular app via [ng generate](https://angular.io/cli/generate)
1.  Copy the following dirs from this repo to your project root: `aws,dev-bin,dev-etc`
1.  Create a CloudFormation stack using [aws/cloudformation/app-resources.yaml](./aws/cloudformation/app-resources.yaml)
    1.  Make sure you have created your [nested-stacks aws-blueprint](https://github.com/rynop/aws-blueprint) bucket. This only needs to be done once per AWS account.
    1.  You will need to replace the string `YourS3BersionId` in `app-resources.yaml` with the S3 version ID of `angular-custom-domain.yaml` in your nested-stacks aws-blueprint bucket. You can easily find this version DI by running:
    ```
    aws s3api list-object-versions --bucket <yourNestedStacksS3Bucket> --prefix nested-stacks/cloudfront/angular-custom-domain.yaml --query 'Versions[?IsLatest].[VersionId]' --output text
    ```
1.  Copy the `scripts` and `devDependencies` attributes out of [./package.json](./package.json) into your generated `package.json`
    1.  Modify `deploy:prod`: replace `us-east-1--prod--master--www.rynop.com` with your S3 bucket name. Bucket was created by CloudFormation stack above (see outputs tab).
1.  Run `yarn install`
1.  Setup [HTTPS for local devlopment](https://rynop.com/2018/11/12/setup-secure-https-certificate-for-local-angular-development-on-macos-mojave/). Save the ssl files in `dev-etc`.
1.  Optional: setup git pre-commit lint hook: `git config core.hooksPath .githooks`
1.  Optional: setup root apex redirect (both HTTP&HTTPS). Ex: `rynop.com` -> `https://www.rynop.com`. Follow [my directions here](https://rynop.com/2017/04/20/howto-serve-angular2-app-from-s3-and-cloudfront-with-free-https/), jump right to step 5.

## Local development

Run `yarn run start`. This will use the SSL cert you generated above.

## Deploying

Run `yarn deploy:prod`. This will:

- Run `build:prod` (does an `ng build` for production)
- Gzip all assets
- Execute [dev-bin/deploy.sh](./dev-bin/deploy.sh) passing the name of the bucket you want to deploy to. `deploy.sh` does the following:
  - Does an `aws s3 sync` setting content type and `cache-control` headers for all assets other than `index.html`
  - Copies `index.html` telling CloudFront to not cache. This allows quick updates to your web app.

## TODO

- Setup CI/CD
