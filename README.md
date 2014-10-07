# ec2-signal

AWS EC2 web controller
 - See instance running status
 - Control instance power on, off
 - Automatic ELB deregister, register
 - Used angular.js + express(node.js) + jade + stylus

## Requirements
- npm
- bower (npm install -g bower)
- AWS account(Need some IAM policies. See below)

### IAM policies
- EC2
 * DescribeInstances
 * StartInstances
 * StopInstances
- ELB
 * DescribeLoadBalancers
 * DeregisterInstancesFromLoadBalancer
 * RegisterInstancesWithLoadBalancer

### IAM policy example
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1406618523000",
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances"
      ],
      "Resource": [
        "*"
      ]
    },
    {
      "Sid": "Stmt1406618546000",
      "Effect": "Allow",
      "Action": [
        "ec2:StartInstances",
        "ec2:StopInstances"
      ],
      "Resource": [
        "*"
      ]
    },
    {
      "Sid": "Stmt1406618546001",
      "Effect": "Allow",
      "Action": [
            "elasticloadbalancing:DescribeLoadBalancers",
            "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
            "elasticloadbalancing:RegisterInstancesWithLoadBalancer"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
```

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

## Use API
- See example (tools/control.sh)
 * You can auto start/stop instance (Combination with cron/jenkins)

## Why signal?
- I don't know. Ask horiken-san
  - horiken-san said: 信号以外ないっしょ？
