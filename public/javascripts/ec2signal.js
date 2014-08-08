var SIG = angular.module('ec2Signal', [])

SIG.factory('getInstances', function($http){
	return {
		getJson: function(){
			var url = 'instances';
			return $http.get(url);
		}
	}
});

SIG.controller('ec2Controller', function(getInstances, $scope){
	$scope.showLoading = true;

	$scope.clickOnRow = function(info){
		alert(info.TagName);
	}

	getInstances.getJson().then(function(infos){
		$scope.infos = infos.data;
		$scope.showLoading = false;
	});
});
