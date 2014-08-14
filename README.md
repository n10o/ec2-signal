# ec2-signal

AWS EC2 web controller

## Requirements
- npm
- bower (npm install -g bower)
- AWS IAM account(Need some policies. See below)

### IAM policies
- EC2
 * DescribeInstances
 * StartInstances
 * StopInstances
- ELB
 * DescribeLoadBalancers
 * DeregisterInstancesFromLoadBalancer
 * RegisterInstancesWithLoadBalancer

## Signal UNLEASHED
```
cd <ec2-signal-directory>
vim config.json
cat config.json
> { "accessKeyId": "<YOURKEY>", "secretAccessKey": "<YOURKEY>", "region": "<YOURREGION:e.g.)ap-northeast-1>" }
npm install
bower install
npm start
```

## Become daemon(see package.json)
```
npm run-script run
npm run-script stop
```

## Why signal?
I don't know. Ask horiken-san
