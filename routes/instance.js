var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

/* GET instance listing. */
router.get('/', function(req, res) {
  new AWS.EC2().describeInstances({}, function(err,data){
      if(err){
        res.send("Unknown Error");
      }else{
        var data = data.Reservations;
	      var instance = [] 
        for(var i = 0; i < data.length; i++){
          var instances = data[i].Instances;
          for(var j = 0; j < instances.length; j++){
            var id = instances[j].InstanceId;
            var tags = instances[j].Tags;
            var status = instances[j].State.Name;
            for(var k = 0; k < tags.length; k++){
              var key = tags[k].Key;
              if(key == "Name"){
                var name = tags[k].Value;
              }
            }
          var content = {};
          content["ID"] = id;
          content["TagName"] = name;
          content["Status"] = status;
          instance.push(content);
          }
	      }
        var description = {};
        description["InstanceDescriptions"] = instance;
        res.send(JSON.stringify(description, undefined, 2));
      }
  });
});

router.get('/start/:id', function(req, res) {
  var id = req.params.id;
  new AWS.EC2().startInstances({InstanceIds: [id]}, function(err,data){
    if(err){
      res.send(err);
    }
    // deregister, register ELB
    new AWS.ELB().describeLoadBalancers({}, function(err,data){
      var lbname;
      if (err){
        console.log(err, err.stack);
      }else{
        var desc = data.LoadBalancerDescriptions;
        for(var i = 0; i < desc.length; i++){
          var instances = desc[i].Instances;
          var name = desc[i].LoadBalancerName;
          for(var j = 0; j < instances.length; j++){
            if(instances[j]["InstanceId"] == id){
              // TODO need multiple instances consideration
              lbname = name;
            }
          }
        }
        if(lbname){
          var params = {
            Instances: [
              {
              InstanceId: id
              }
            ],
            LoadBalancerName: lbname
          }
          new AWS.ELB().deregisterInstancesFromLoadBalancer(params, function(err, data){
            if (err){
              console.log(err, err.stack);
            }else{
              new AWS.ELB().registerInstancesWithLoadBalancer(params, function(err, data){
                if (err){
                  console.log(err, err.stack);
                }else{
                }
              });
            }
          });
        }
      }
    });
    res.send(data);
  });
});

router.get('/stop/:id', function(req, res) {
  new AWS.EC2().stopInstances({InstanceIds: [req.params.id]}, function(err,data){
    if(err){
      res.send(err);
    }
    res.send(data);
  });
});

module.exports = router;
