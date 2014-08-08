var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

// TODO consider this
var params = {
    Filters: [
        {
         Name: 'tag:Env',
         Values: ['dev']
        }
    ]
};

/* GET instance listing. */
router.get('/', function(req, res) {
    new AWS.EC2().describeInstances(params, function(error,data){
        if(error){
            console.log("ERROR:");
            console.log(error);
            res.send("ERROR");
        }else{
	    var data = data.Reservations;
	    var instance = [] 
	    console.log("Length:", data.length);
	    for(var i=0; i<data.length; i++){
		var instances = data[i].Instances;
		for(var j=0; j<instances.length; j++){
			var id = instances[j].InstanceId;
			var tags = instances[j].Tags;
			var status = instances[j].State.Name;
			for(var k=0; k<tags.length; k++){
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
            res.send(JSON.stringify(instance, undefined, 2));
        }
    });
});

module.exports = router;
