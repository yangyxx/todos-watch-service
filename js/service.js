/**
 * Created by Administrator on 2017/10/30.
 */
(function (angular) {
	var ap=angular.module('service',[]);
	ap.service('myservice',['$window',function ($window) {
		var str=$window.localStorage.getItem('datas')||"[]";
		var data=JSON.parse(str);
		this.data=data;
		this.save= save;
		//2. 添加任务
		this.add= function (item) {
			if(!item){
				return;
			}
			data.push({id:Math.random(),name:item,completed:false});
			save(data);
		}
		//3. 删除任务
		this.remove= function (id) {
			for(var i=0;i<data.length;i++){
				if(data[i].id==id){
					data.splice(i,1);
				}
			}
			save(data);
		}
		//7. 显示未完成的任务数
		this.notComp= function () {
			var n=0;
			for(var i=0;i<data.length;i++){
				if(!data[i].completed){
					n++;
				}
			}
			return n;
		}
		//8. 清除所有已完成任务
		this.clearComp= function () {
			for(var i=data.length-1;i>=0;i--){
				if(data[i].completed){
					data.splice(i,1);
				}
			}
			save(data);
		}
		function save(data){
			$window.localStorage.setItem('datas',JSON.stringify(data));
		}
	}])
})(angular)
