(function (angular) {
	'use strict';
	var app=angular.module("todosapp",['service']);
	app.controller('todosCon',['$scope','$location','myservice', function ($scope,$location,myservice) {
		$scope.data=myservice.data;
		//1.任务的展示
		//2. 添加任务
		$scope.news="";
		$scope.add= function () {
			myservice.add($scope.news);
			$scope.news="";
		}
		//3. 删除任务
		$scope.remov= function (id) {
			myservice.remove(id);
		}
		//4. 修改任务内容
		$scope.dbclickid=-1;
		$scope.xiugai= function (id) {
			$scope.dbclickid=id;
		}
		$scope.gai= function () {
			myservice.save($scope.data);
			$scope.dbclickid=-1;
		}
		//5. 切换任务完成与否的状态
		$scope.chang= function () {
			myservice.save($scope.data);
		}
		//6. 批量切换任务完成与否的状态
		$scope.checkall= function () {
			var num=0;
			for(var i=0;i<$scope.data.length;i++){
				if($scope.data[i].completed==true){
					num++;
				}
			}
			if(num==$scope.data.length){
				return true;
			}else{
				return false;
			}
		};
		$scope.allcheck= function () {
			var c=!$scope.checkall();
			for(var i=0;i<$scope.data.length;i++){
				$scope.data[i].completed=c;
			}
			myservice.save($scope.data);
		}
		//7. 显示未完成的任务数
		$scope.notcomp= function () {
			return myservice.notComp();
		}
		//8. 清除所有已完成任务
		$scope.clearcomp= function () {
			myservice.clearComp();
		}
		//9. 切换显示不同状态的任务
		$scope.f="";
		$scope.u=$location;
		$scope.$watch('u.url()', function(now,old){
			switch (now){
				case "/":
					$scope.f="";
					break;
				case "/active":
					$scope.f=false;
					break;
				case "/completed":
					$scope.f=true;
					break;
			}
		})
	}])
})(angular);
