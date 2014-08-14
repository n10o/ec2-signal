# ec2-signal

AWS EC2 web controller

## Requirements
npm
bower (npm install -g bower)
AWS IAM account(need some policies)

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
cd <angry-signal-directory>
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
