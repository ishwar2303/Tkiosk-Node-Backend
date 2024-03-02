# TwitterBackend

# Deploy Application to AWS ElasticBeanstalk

### Create IAM User for GitHub Actions
Let's name it `github-actions-tskiosk-backend`

Add inline-policy lets call it `deploy-backend-application-to-elasticbeanstalk`
```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": [
				"cloudformation:GetTemplate",
				"cloudformation:DescribeStackResource",
				"cloudformation:DescribeStackResources",
				"elasticbeanstalk:CreateApplicationVersion",
				"elasticbeanstalk:DescribeApplications",
				"elasticbeanstalk:DescribeApplicationVersions",
				"elasticbeanstalk:DescribeEnvironments",
				"autoscaling:*",
				"elasticbeanstalk:CreateApplicationVersion"
			],
			"Resource": "*"
		},
		{
			"Effect": "Allow",
			"Action": [
				"elasticbeanstalk:UpdateEnvironment"
			],
			"Resource": "arn:aws:elasticbeanstalk:ap-south-1:796111410382:environment/TwitterBackend/TwitterBackend-env"
		}
	]
}
```

Also Give AWS S3 Full Access directly attach this permission to user

Note: Permissions granted to the user must be thouhrougly checked as we can limit the permissions to user based on the actions performed by them in aws account.

Create Access Key
    Users > Security Credentials > Access Keys

With these access keys github will be able to upload the zip of source code to s3 bucket and deploy the latest code to elasticbeanstalk environment

# Store Secrets
AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_EB_APP_NAME, AWS_EB_ENV_ID, AWS_REGION, AWS_S3_BUCKET

Store the secrets as these are being used in the pipeline setup.
In case of any change we don't have to update the pipeline but the secrets.
For example: Using New AWS credentials or region etc.


# To Do
Update pipeline to utilize different .env while deploying to elasticbeanstalk
For example:
	.env.qa on devtest branch
	.env.prod on master branch

	