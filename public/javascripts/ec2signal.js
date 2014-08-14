var SIG = angular.module('ec2Signal', ['ui.bootstrap']);

SIG.factory('instanceCtrl', function($http){
	return {
		getList: function(){
			var url = 'instance';
			return $http.get(url);
		},
		start: function(id){
			var url = 'instance/start/' + id;
			console.log("START:" + id);
			return $http.get(url);
		},
		stop: function(id){
			var url = 'instance/stop/' + id;
			console.log("STOP:" + id);
			return $http.get(url);
		}
	}
});

SIG.controller('ec2Controller', function(instanceCtrl, $scope, $http, $timeout, $modal){
  $scope.showLoading = true;
  $scope.showAlert = false;
  $scope.disableAlert = function(){
    $scope.showAlert = false;
  }

	$scope.clickOnRow = function(instance){
    $scope.instance = instance;
    $scope.modalInstance = $modal.open({
      templateUrl: 'modalContent.html',
      scope: $scope
    });
	}

  $scope.clickForReload = function(){
    $scope.showLoading = true;
    instanceCtrl.getList().then(function(infos){
      $scope.infos = infos.data.InstanceDescriptions;
      $scope.showLoading = false;
    });
  }

  $scope.changeStatus = function(instance){
    var status = instance.Status;
    var id = instance.ID;
    // TODO more error handling
    if(instance.Status == "running"){
      instanceCtrl.stop(id).then(function(result){
        havePermissionFromStatuscode(result.data.statusCode);
      });
    }else if(status == "stopped"){
      instanceCtrl.start(id).then(function(result){
        havePermissionFromStatuscode(result.data.statusCode);
      });
    }else{
      console.log("Unknown status error");
    } 
    $scope.modalInstance.close();
    $scope.showLoading = true;
    $timeout(function(){$scope.clickForReload()}, 5000);
  };

  function havePermissionFromStatuscode(status){
    if(status == 403){
      $scope.alertText = "You don't have permission";
      $scope.showAlert = true;
    }
  }

  $scope.clickForReload();
});
