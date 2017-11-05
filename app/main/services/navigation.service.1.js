(function(){
	var NavigationService=function($http,$q,$rootScope,$window)
	{
		this.getProjectsByTenantId=function(userId)
		{
			return $http.get('getUserById',{params:{"userId": userId}}).then(function(response) {
				return response.data;
			}, function() {
				console.log('in the error method');
			});
		};
		this.getDashboardData = function(tenantId,userId){
			
			return $http.get('getDashboardData',{params:{"tenantId":tenantId, "userId":userId}}).then(function(response){
				return response;
			})
		}
		this.getModules=function(projectId,userId)
		{
			return $http.get('getProjectModules',{params:{"projectId": projectId,"userId":userId}}).then(function(data) {
				console.log("getProjectModules : " + data)
	            return data;
	        	}, function() {
	        		console.log('in the error method');
        	});
		};
		
		this.getVMsByTenantId=function(tenantId){
			return $http.get('getTenantVM',{params:{"tenantId": tenantId}}).then(function(data) {
	            //console.log('got success: ' + JSON.stringify(data.data));   
	            return data;
			}, function() {
				console.log('in the error method');
			});
		};
		
		this.jenkinsBuildAndDeploy=function(JenkinsSelectedModuleNames,userId,buildId){
			return $http.get('jenkinsBuildAndDeploy',{params:{"JenkinsSelectedModuleName": JenkinsSelectedModuleNames,"userId": userId, "buildId":buildId}}).then(function(data) {
                return data;
			}, function() {
			    console.log('in the error method');
			});
		};
		/*this.codeCoveragePdf=function(JenkinsSelectedModuleNames,executionStatusId){
			return $http.get('getCodeCoveragePdf',{params:{"JenkinsSelectedModuleName": JenkinsSelectedModuleNames,"executionStatusId":executionStatusId}}).then(function(data){
				return data;
			},function(){
				console.log('in the error method');
			});
		};*/
		
		this.codeCoveragePdf = function (JenkinsSelectedModuleNames,executionStatusId){
	       return $http({
	            url : 'getCodeCoveragePdf',
	            method : 'GET',
	            params :{"JenkinsSelectedModuleName": JenkinsSelectedModuleNames,"executionStatusId":executionStatusId},
	            headers : {
	                'Content-type' : 'application/pdf'
	            },
	            responseType : 'arraybuffer'
	        }).then(function(data, status, headers, config) {
	            return data;
	        },function() {
			    console.log('in the error method');
			});
	    };
	    
		this.getWstafReport = function(wstafExecutionId,userId){
			return $http.get('getWstafReport',{params:{"executionId": wstafExecutionId,"userId": userId}}).then(function(data) {
                return data;
			}, function() {
			    console.log('in the error method');
			});
		};
		this.getEmbeddedReport = function(){
			return $http.get('getEmbeddedReport').then(function(data) {
                return data;
			}, function() {
			    console.log('in the error method');
			});
		};
		this.getUiliteReport = function(uiliteExecutionId,userId){
			return $http.get('getUiliteReport',{params:{"executionId": uiliteExecutionId,"userId": userId}}).then(function(data) {
                return data;
			}, function() {
			    console.log('in the error method');
			});
		};
		
		
		this.getSafReport = function(safExecutionId,userId){
			return $http.get('getSafReport',{params:{"executionId": safExecutionId,"userId": userId}}).then(function(data) {
                return data;
			}, function() {
			    console.log('in the error method');
			});
		};
		
		this.getMistReport = function(safExecutionId,userId){
			return $http.get('getMistReport',{params:{"executionId": safExecutionId,"userId": userId}}).then(function(data) {
                return data;
			}, function() {
			    console.log('in the error method');
			});
		};
		
		this.getJenkinsLog=function(jenkinsURL)
        {
             return $http.get('getJenkinsLog',{params:{"jenkinsURL": jenkinsURL}}).then(function(response) {
                  return response.data;
             }, function(response) {
                  console.log('in the error method...'+JSON.stringify(response));
             });
        };
        

		
		this.executeConcurrent = function executeConcurrent(userId,WSTAFSelectedModuleNames,SAFSelectedModuleNames,MobiwatchModuleNames,UiliteModulesNames,MistSelectedModuleNames,EmbeddedModuleNames,SeleniumModuleNames,buildId){
			return $http.get('executeConcurrent').then(function(response){
				if(typeof WSTAFSelectedModuleNames!== "undefined" && WSTAFSelectedModuleNames.length>0){
					 this.executeWSTAFModules($http,userId,WSTAFSelectedModuleNames,buildId,$rootScope);
				  }
				  if(typeof SAFSelectedModuleNames!== "undefined" && SAFSelectedModuleNames.length>0){
					  this.executeSAFModules($http,userId,SAFSelectedModuleNames,buildId,$rootScope);
				  }
				  if(typeof MobiwatchModuleNames!== "undefined" && MobiwatchModuleNames.length>0){
					  this.executeMobiWatchModules($http,userId,MobiwatchModuleNames,buildId);
				  }
				  if(typeof UiliteModulesNames!== "undefined" && UiliteModulesNames.length>0){
					  this.executeUiliteModules($http,userId,UiliteModulesNames,buildId,$rootScope);
				  }
				  if(typeof MistSelectedModuleNames!== "undefined" && MistSelectedModuleNames.length>0){
					  this.executeMistModules($http,userId,MistSelectedModuleNames,buildId,$rootScope);
				  }
				  if(typeof EmbeddedModuleNames!== "undefined" && EmbeddedModuleNames.length>0){
					  this.executeEmbeddedModules($http,userId,EmbeddedModuleNames,buildId);
				  }
				  if(typeof SeleniumModuleNames!=  "undefined" && SeleniumModuleNames.length>0){
					  this.executeSeleniumModules($http,userId,SeleniumModuleNames,buildId);
				  }
				  return response;
			});
			
		}	
		this.getJenkinsStatus=function getJenkinsStatus(userId,executionStatusId,WSTAFSelectedModuleNames,SAFSelectedModuleNames,MobiwatchModuleNames,UiliteModulesNames,MistSelectedModuleNames,EmbeddedModuleNames,SeleniumModuleNames,buildId,JenkinsSelectedModuleNames){
			return $http.get('getJenkinsStatus' , {params:{"executionStatusId":executionStatusId}}).then(function(response){
				if(response.data.result=="SUCCESS"){
					 $http({
				            url : 'getCodeCoveragePdf',
				            method : 'GET',
				            params :{"JenkinsSelectedModuleName": JenkinsSelectedModuleNames,"executionStatusId":executionStatusId},
				            headers : {
				                'Content-type' : 'application/pdf'
				            },
				            responseType : 'arraybuffer'
				        }).then(function(data, status, headers, config) {
					    	$("#id_buildProgressBar").hide();
					    	console.log("byte lenght"+data.data.byteLength);
					        if( data.data.byteLength !=0 )
					        	{
					        	 $("#id_config").text("SONAR REPORT").show();
					        	 $("#id_config").prop('disabled', false);
					        	}
					        else{
					        	 $("#id_config").text("BUILD SUCCESS").show();
					        	 $("#id_config").prop('disabled', true);
					        }
					        
					    },function() {
						    console.log('in the error method');
						});
					  if(typeof WSTAFSelectedModuleNames!== "undefined" && WSTAFSelectedModuleNames.length>0){
						 this.executeWSTAFModules($http,userId,WSTAFSelectedModuleNames,buildId,$rootScope);
					  }
					  if(typeof SAFSelectedModuleNames!== "undefined" && SAFSelectedModuleNames.length>0){
						  this.executeSAFModules($http,userId,SAFSelectedModuleNames,buildId,$rootScope);
					  }
					  if(typeof MobiwatchModuleNames!== "undefined" && MobiwatchModuleNames.length>0){
						  this.executeMobiWatchModules($http,userId,MobiwatchModuleNames,buildId);
					  }
					  if(typeof UiliteModulesNames!== "undefined" && UiliteModulesNames.length>0){
						  this.executeUiliteModules($http,userId,UiliteModulesNames,buildId,$rootScope);
					  }
					  if(typeof MistSelectedModuleNames!== "undefined" && MistSelectedModuleNames.length>0){
						  this.executeMistModules($http,userId,MistSelectedModuleNames,buildId,$rootScope);
					  }
					  if(typeof EmbeddedModuleNames!== "undefined" && EmbeddedModuleNames.length>0){
						  this.executeEmbeddedModules($http,userId,EmbeddedModuleNames,buildId);
					  }
					  if(typeof SeleniumModuleNames!=  "undefined" && SeleniumModuleNames.length>0){
						  this.executeSeleniumModules($http,userId,SeleniumModuleNames,buildId);
					  }
					
					  return response;
				  }else if(response.data.result == "FAILURE"){
					  console.log("Failed");
					  $("#id_buildProgressBar").hide();
					  $("#id_config").text("BUILD FAILED").show();
					  $("#id_config").prop('disabled', true);
					  executeSelectedModule($http,userId,WSTAFSelectedModuleNames,SAFSelectedModuleNames,MobiwatchModuleNames,UiliteModulesNames,MistSelectedModuleNames,EmbeddedModuleNames,SeleniumModuleNames,buildId,JenkinsSelectedModuleNames);
					  $("#id_buildProgressBar").hide();
					  $("#id_config").text("BUILD FAILED").show();
					  return response;
				  }else{
					  setTimeout(function(){
						  getJenkinsStatus(userId,executionStatusId,WSTAFSelectedModuleNames,
								  SAFSelectedModuleNames,MobiwatchModuleNames,UiliteModulesNames,MistSelectedModuleNames,EmbeddedModuleNames,SeleniumModuleNames,buildId,JenkinsSelectedModuleNames);
					    }, 20000);
				  };
			},function(){
				console.log("in error method");
			});
		};
		this.getJenkinsStatusRemoteAgent=function getJenkinsStatusRemoteAgent(userId,executionStatusId,WSTAFSelectedModuleNames,SAFSelectedModuleNames,MobiwatchModuleNames,UiliteModulesNames,tenantId,project){
			return $http.get('getJenkinsStatus' , {params:{"executionStatusId":executionStatusId}}).then(function(response){
				if(response.data.result=="SUCCESS"){
					 $("#id_buildProgressBar").hide();
					  $("#id_config").show();
					  this.executeSelectedModuleRemoteAgent($http,userId,WSTAFSelectedModuleNames,SAFSelectedModuleNames,MobiwatchModuleNames,UiliteModulesNames,tenantId,project);
					  console.log("Success");
					 
					  return response;
				  }else if(response.data.result == "FAILURE"){
					  console.log("Failed");
					  executeSelectedModuleRemoteAgent($http,userId,WSTAFSelectedModuleNames,SAFSelectedModuleNames,MobiwatchModuleNames,UiliteModulesNames,tenantId,project);
					  $("#id_buildProgressBar").hide();
					  $("#id_config").show();
					  return response;
				  }else{
					  setTimeout(function(){
						  getJenkinsStatusRemoteAgent(userId,executionStatusId,WSTAFSelectedModuleNames,
								  SAFSelectedModuleNames,MobiwatchModuleNames,UiliteModulesNames,tenantId,project);
					    }, 20000);
				  };
			},function(){
				console.log("in error method");
			});
		};
		
		this.saveNewRelease=function(newReleaseName, newReleaseDesc, projectId)
		{
			return $http.get('saveNewReleaseData',{params:{"newReleaseName":newReleaseName, "newReleaseDesc":newReleaseDesc,"projectId": projectId}}).then(function(data) {
	            return data;
	        	},  function(data) {
					console.log('in the error method');
					return $q.reject(errResponse);
				} );
		};
		
		this.saveNewBuild=function(newBuildName, newBuildDesc, projectId)
		{
			return $http.get('saveNewBuildData',{params:{"newBuildName":newBuildName, "newBuildDesc":newBuildDesc,"projectId": projectId}}).then(function(data) {
	            return data;
	        	},  function(data) {
					console.log('in the error method');
					return $q.reject(errResponse);
				} );
		};
		
		this.scheduleJenkinsJobService=function(cronSecond, cronMinute, cronHour, cronDOM, cronMonth,
				cronDOW, allSelectedModules, userId)
		{
			$http.get('scheduleJenkinsJobs',{params:{"cronSecond":cronSecond, "cronMinute":cronMinute,"cronHour": cronHour,"cronDOM":cronDOM,"cronMonth":cronMonth,
				"cronDOW":cronDOW, "allSelectedModules":allSelectedModules,"userId":userId}}).then(function(data) {
	           // return data;
	            JobExecutionIDS = [];
	    		var JobExecutionResults = [];
	    		JobExecutionResults=data.data.executionIDs;
	    		console.log("execution ids"+data.data.executionIDs)
	    		if(JobExecutionResults != undefined){
	    		for (var i = 0; i < JobExecutionResults.length; i++){
	    			notification.push(JobExecutionResults[i]);
	    			if(JobExecutionResults[i].status !="failure" ){
	    				JobExecutionIDS.push(JobExecutionResults[i].executionId);
	    			}}
	    		}
	    		  $http.get('getNotifications').then(function(d) {
	    				$rootScope.notifications=d.data;
	    				console.log("d.data from notification: "+JSON.stringify(d.data));
	    			},function(d){
	    				//alert("something went wrong while getting notification, status: "+d.status);
	    				});
	    		  return data;
	        	},
	        	function(d) {
					console.log('in the error method');
					return $q.reject(errResponse);
				});
		};
	};
	angular.module("dtepApp.services").service("NavigationService", NavigationService);
}()); 
function executeSelectedModuleRemoteAgent(http,userId,WSTAFSelectedModuleNames,SAFSelectedModuleNames,MobiwatchModuleNames,UiliteModulesNames,tenantId,project){

	var mindtreeIpModules = {};
	if(typeof WSTAFSelectedModuleNames!== "undefined" && WSTAFSelectedModuleNames.length>0){
		$("button[id='Service Testing_execution']").show();
		$("button[id='Service Testing_download']").hide();
		mindtreeIpModules['wstaf'] =  WSTAFSelectedModuleNames;
	}
	if(typeof SAFSelectedModuleNames!== "undefined" && SAFSelectedModuleNames.length>0){
		$("button[id='Functional Testing_execution']").show();
		$("button[id='Functional Testing_download']").hide();
		mindtreeIpModules['saf'] =  SAFSelectedModuleNames;
	}
	if(typeof MobiwatchModuleNames!== "undefined" && MobiwatchModuleNames.length>0){
		$("button[id='Performance Testing_execution']").show();
		$("button[id='Performance Testing_download']").hide();
		mindtreeIpModules['mobiWatch'] =  MobiwatchModuleNames;
	}
	if(typeof UiliteModulesNames!== "undefined" && UiliteModulesNames.length>0){
		$("button[id='UI Testing_execution']").show();
		$("button[id='UI Testing_download']").hide();
		mindtreeIpModules['uilite'] =  UiliteModulesNames;
	}
	mindtreeIpModules['userId'] = userId;
	mindtreeIpModules['tenantId'] = tenantId;
	mindtreeIpModules['tenantName'] = "mindtree";
	mindtreeIpModules['projectName'] = project.projectName;
	mindtreeIpModules['projectId'] = project.projectId;
	http.get('runModulesRemoteAgent',{params:{"moduleNames": mindtreeIpModules}}).then(function(data) {
		$("button[id='Service Testing_execution']").hide();
		$("button[id='Service Testing_download']").show();
        
	}, function(d) {
		$("button[id='Service Testing_execution']").hide();
		$("button[id='Service Testing_download']").show();
	    console.log('in the error method');
	} );
	return true;

}

function executeSAFModules(http,userId,SAFSelectedModuleNames,buildId,rootScope){
	$("button[id='Functional Testing_execution']").show();
	$("button[id='Functional Testing_download']").hide();
	 http.get('runSAF',{params:{"moduleNames": SAFSelectedModuleNames ,"userId": userId,"buildId":buildId}}).then(function(data) {
		$("button[id='Functional Testing_execution']").hide();
		$("button[id='Functional Testing_download']").show();
		SAFExecutionIDs = [];
		var SAFExecutionResults =[];
		SAFExecutionResults=data.data.executionIDs;
		if(SAFExecutionResults != undefined){
		for (var i = 0; i < SAFExecutionResults.length; i++){
			notification.push(SAFExecutionResults[i]);
			if(SAFExecutionResults[i].status !="failure"){
			SAFExecutionIDs.push(SAFExecutionResults[i].executionId);
			}}
		}
		  http.get('getNotifications').then(function(d) {
				rootScope.notifications=d.data;
				console.log("d.data from notification: "+JSON.stringify(d.data));
			},function(d){
				//alert("something went wrong while getting notification, status: "+d.status);
				});
        return data;
	}, function(d) {
		$("button[id='Functional Testing_execution']").hide();
		$("button[id='Functional Testing_download']").show();
	    console.log('in the error method');
	} );
}

function executeWSTAFModules(http,userId,WSTAFSelectedModuleNames,buildId,rootScope){
	$("button[id='Service Testing_execution']").show();
	$("button[id='Service Testing_download']").hide();
	http.get('runWSTAF',{params:{"moduleNames": WSTAFSelectedModuleNames ,"userId": userId,"buildId":buildId}}).then(function(data) {
		$("button[id='Service Testing_execution']").hide();
		$("button[id='Service Testing_download']").show();
		WSTAFExecutionIDS = [];
		var WSTAFExecutionResults = [];
		WSTAFExecutionResults=data.data.executionIDs;
		if(WSTAFExecutionResults != undefined){
		for (var i = 0; i < WSTAFExecutionResults.length; i++){
			notification.push(WSTAFExecutionResults[i]);
			if(WSTAFExecutionResults[i].status !="failure" ){
			WSTAFExecutionIDS.push(WSTAFExecutionResults[i].executionId);
			}}
		}
		  http.get('getNotifications').then(function(d) {
				rootScope.notifications=d.data;
				console.log("d.data from notification: "+JSON.stringify(d.data));
			},function(d){
				//alert("something went wrong while getting notification, status: "+d.status);
				});
	}, function(d) {
		$("button[id='Service Testing_execution']").hide();
		$("button[id='Service Testing_download']").show();
	    console.log('in the error method');
	} );
}
function executeUiliteModules(http,userId,UiliteModulesNames,buildId,rootScope){
	$("button[id='UI Testing_execution']").show();
	$("button[id='UI Testing_download']").hide();
	return http.get('runUilite',{params:{"moduleNames": UiliteModulesNames ,"userId": userId,"buildId":buildId}}).then(function(data) {
			$("button[id='UI Testing_execution']").hide();
			$("button[id='UI Testing_download']").show();
			UiliteExecutionIDs = [];
			var UiliteExecutionResults = [];
			UiliteExecutionResults = data.data.executionIDs;
			if(UiliteExecutionResults != undefined){
			for (var i = 0; i < UiliteExecutionResults.length; i++){
				notification.push(UiliteExecutionResults[i]);
				if(UiliteExecutionResults[i].status !="failure"){
				UiliteExecutionIDs.push(UiliteExecutionResults[i].executionId);
				}}
			}
			  http.get('getNotifications').then(function(d) {
					rootScope.notifications=d.data;
					console.log("d.data from notification: "+JSON.stringify(d.data));
				},function(d){
					//alert("something went wrong while getting notification, status: "+d.status);
					});
			return data;
		}, function(d) {
			$("button[id='UI Testing_execution']").hide();
			$("button[id='UI Testing_download']").show();
		    console.log('in the error method');
		} );
}
function executeMobiWatchModules(http,userId,MobiwatchModuleNames,buildId){
	$("button[id='Performance Testing_execution']").show();
	$("button[id='Performance Testing_download']").hide();
	 return http.get('runMobiwatch',{params:{"moduleNames": MobiwatchModuleNames ,"userId": userId,"buildId":buildId}}).then(function(data) {
		$("button[id='Performance Testing_execution']").hide();
		$("button[id='Performance Testing_download']").show();
        return data;
	}, function(d) {
		$("button[id='Performance Testing_execution']").hide();
		$("button[id='Performance Testing_download']").show();
	    console.log('in the error method');
	} );
}

function executeMistModules(http,userId,MistSelectedModuleNames,buildId,rootScope){
	$("button[id='Integrated Testing_execution']").show();
	$("button[id='Integrated Testing_download']").hide();
	http.get('runMIST',{params:{"moduleNames": MistSelectedModuleNames ,"userId": userId,"buildId":buildId}}).then(function(data) {
		$("button[id='Integrated Testing_execution']").hide();
		$("button[id='Integrated Testing_download']").show();
		MistExecutionIDs = [];
		var MISTExecutionResults = [];
		MISTExecutionResults=data.data.executionIDs;
		if(MISTExecutionResults != undefined){
		for (var i = 0; i < MISTExecutionResults.length; i++){
			notification.push(MISTExecutionResults[i]);
			if(MISTExecutionResults[i].status !="failure" ){
				MistExecutionIDs.push(MISTExecutionResults[i].executionId);
			}}
		}
		  http.get('getNotifications').then(function(d) {
				rootScope.notifications=d.data;
				console.log("d.data from notification: "+JSON.stringify(d.data));
			},function(d){
				//alert("something went wrong while getting notification, status: "+d.status);
				});
	}, function(d) {
		$("button[id='Integrated Testing_execution']").hide();
		$("button[id='Integrated Testing_download']").show();
	    console.log('in the error method');
	} );
}

	 function executeEmbeddedModules(http,userId,EmbeddedModuleNames,buildId){
			$("button[id='Embedded Testing_execution']").show();
			$("button[id='Embedded Testing_download']").hide();
			 return http.get('runEmbedded').then(function(data) {
				$("button[id='Embedded Testing_execution']").hide();
				$("button[id='Embedded Testing_download']").show();
		        return data;
			}, function(d) {
				$("button[id='Embedded Testing_execution']").hide();
				$("button[id='Embedded Testing_download']").show();
			    console.log('in the error method');
			} );
}
function executeSeleniumModules(http,userId,SeleniumModuleNames,buildId){
	
	$("button[id='Selenium Testing_execution']").show();
	$("button[id='Selenium Testing_download']").hide();
	 return http.get('runSelenium',{params:{"moduleNames": SeleniumModuleNames ,"userId": userId,"buildId":buildId}}).then(function(data) {
		$("button[id='Selenium Testing_execution']").hide();
		$("button[id='Selenium Testing_download']").show();
        return data;
	}, function(d) {
		$("button[id='Selenium Testing_execution']").hide();
		$("button[id='Selenium Testing_download']").show();
	    console.log('in the error method');
	} );
}

