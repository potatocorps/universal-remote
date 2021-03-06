/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
function AppViewModel() {
	var self = this; // Used to remove "this" ambiguity.

	// KO Properties
	self.deviceName = ko.observable();
	self.deviceIP = ko.observable();
	self.availableRemotes = ko.observableArray();
	self.selectedRemote = ko.observable({"html":""});
	self.selectedDevice = ko.observable();
	self.keyControl;
	self.mediaControl;

	// KO Computed Properties
	self.deviceDescription = ko.pureComputed(function() {
		var answer = "No Device Selected";
		var answer2 = this.deviceName() + ": ";

		if(self.selectedDevice !== undefined) {
		  answer = answer2;
		}

		return answer;

		},self
	);


   /*********************************************************************************
	 *
	 *	Application Constructor
	 *
	 ********************************************************************************/
  self.initialize = function() {
      console.log("Intializing App");

      self.bindEvents();

	    // TESTING - SHOULD BE MOVED TO DEVICE READY FUNCTION
	    self.loadRemoteBindings();

  };


   /*********************************************************************************
	 *
	 *	Bind Event Listeners
	 *	Bind any "device specific" (i.e. phone/tablet/etc) events that are required on startup.
	 * 	Common events are: 'load', 'deviceready', 'offline', and 'online'.
	 *
	 ********************************************************************************/
  self.bindEvents = function() {
      console.log("Binding 'deviceready' event to DOM");
      document.addEventListener('deviceready', this.onDeviceReady, false);
  };


  /*********************************************************************************
	 *
	 *	deviceready Event Handler - Device API's are now available
	 *	Note: The scope of 'this' is the event.
	 * 	References to app properties must use the "self" variable
	 *
	 ********************************************************************************/

  self.onDeviceReady = function() {
	  console.log("Device Ready");
	  
    var directoryReader;
    
    function onFileSystemSuccess(fileSystem) {
	    var directoryEntry = fileSystem.root;
	    
	    //directoryReader = dir.createReader();
	    alert("Name: " + directoryEntry.name);
    }
    
    function onFileSystemFail(event) {
		  alert(event.target.error.code);
		}
    
    /*


    function successCallback(dir) {

	    directoryReader = dir.createReader();
    }


    function success(entries) {
		    var i;
		    for (i=0; i<entries.length; i++) {
		        console.log(entries[i].name);
		    }
		}

		function fail(error) {
		    alert("Failed to list directory contents: " + error.code);
		}

    */
    
    //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
    
    //directoryReader.readEntries(success,fail);
      
 


    //window.resolveLocalFileSystemURL(cordova.file.applicationDirectory, successCallback, errorCallback);

    //directoryReader.readEntries(success,fail);

    console.log("Device Ready");

    //self.quickDiscovery(); // Automatically search for devices on startup
    self.loadSpudFiles();
    
    

  };


	/*********************************************************************************
	 *
	 *	Setup Custom Event Listeners for Remote Buttons
	 *	Events are mapped to custom Device Handler Functions
	 *
	 ********************************************************************************/
	self.loadRemoteBindings = function(){

		// Load Static Bindings
		$("#select-device").click(function(){
			self.selectDevice();
		});

		/*$("#select-remote").click(function(){
			self.selectRemote();
		});
		*/
		// Load Dynamic Bindings
		$( "body" ).on( "click", ".rb", function() {

			if(self.selectedDevice !== undefined) {

        /*

        // Would this work in place of the switch statement? Or something similar?

        var keys[] = {"up", "down", "left", "right", "home"};
        var plays[] = {"play", "stop", "rw", "ff"}
        if ($.inArray(this.id, keys[]) != -1 && $.inArray(this.id, plays[] > -1)){
          self.keyControl.[this.id]();
        }else if ($.inArray(this.id, keys[]) > -1 && $.inArray(this.id, plays[] != -1)){
          self.mediaControl.[this.id]();
        }

        */

				console.log(this.id);
				switch(this.id){

					case "up":
						self.keyControl.up()
							.success(function(launchSession){
								//alert("success");
							})
							.error(function(error){
								alert("error");

							});
						console.log(this.id + " CALLED");
						break;
					case "down":
						self.keyControl.down()
							.success(function(launchSession){
								//alert("success");
							})
							.error(function(error){
								alert("error");

							});
						console.log(this.id + " CALLED");
						break;
					case "left":
						self.keyControl.left()
							.success(function(launchSession){
								//alert("success");
							})
							.error(function(error){
								alert("error");
								});
						console.log(this.id + " CALLED");
						break;
					case "right":
						self.keyControl.right()
							.success(function(launchSession){
								//alert("success");
							})
							.error(function(error){
								alert("error");
							});
						console.log(this.id + " CALLED");
						break;
					case "home":
						self.keyControl.home()
							.success(function(launchSession){
								//alert("success");
							})
							.error(function(error){
								alert("error");
							});
						console.log(this.id + " CALLED");
						break;
					case "back":
						self.keyControl.back()
							.success(function(launchSession){
								//alert("success");
							})
							.error(function(error){
								alert("error");
							});
						console.log(this.id + " CALLED");
						break;
					case "okay":
						self.keyControl.ok()
							.success(function(launchSession){
								//alert("success");
							})
							.error(function(error){
								alert("error");
							});
						console.log(this.id + " CALLED");
						break;
					case "play":
						self.mediaControl.play()
							.success(function(launchSession){
								//alert("success");
							})
							.error(function(error){
								alert("Play/Pause error");
							});
						console.log(this.id + " CALLED");
						break;
					case "stop":
						self.mediaControl.stop()
							.success(function(launchSession){
								//alert("success");
							})
							.error(function(error){
								alert("error");
							});
						console.log(this.id + " CALLED");
						break;
					case "rw":
						self.mediaControl.rewind()
							.success(function(launchSession){
								//alert("success");
							})
							.error(function(error){
								alert("Error: " + error);
							});
						console.log(this.id + " CALLED");
						break;
					case "ff":
						self.mediaControl.fastForward()
							.success(function(launchSession){
								//alert("success");
							})
							.error(function(error){
								alert("Error: " + error);
							});
						console.log(this.id + " CALLED");
						break;
					default: alert("unknown command " + this.id + " selected");
				}



			} else {
					console.log("No Device Selected");

			}


		});

	};

	/*********************************************************************************
	 *
	 *	Loads Remote Files from Core & Custom Directories
	 *
	 *
	 ********************************************************************************/
	self.loadSpudFiles = function () {
		console.log("Spud Searching");

		// Load Cache file if it exists
		
		
		
		// Helper Function: Searches "core/remote" directory for subdirectories
		function discoverCustomRemotes(path){
			window.resolveLocalFileSystemURL(path,
				function (fileSystem) {
		      var reader = fileSystem.createReader();
		      reader.readEntries(
	        	function (entries) {
		        	for (i=0; i<entries.length; i++) {											// Call self.loadspudfile for each subdirectory found
			        		str = JSON.stringify(entries[i], null, 4); 
			        		if(entries[i].isDirectory) {
				        		entry = entries[i].fullPath;
				        		
				        		// Following commands are to format the entry string before calling loadSpudFile
				        		entry = entry.split("/");
				        		entry.shift();
				        		entry.shift();
				        		entry = entry.join("/");
				        		
				        		
			        			self.loadSpudFile(entry);
			        		}
			        	}
	         	 return entries;
	        	},
	        	function (err) {
		        	alert("Error reading File")
	          	console.log(err);
	        	}
					);
    		}, function (err) {
	    			alert("Error resolving local file system URl")
      		console.log(err);
    		}
			);
		}
		
		discoverCustomRemotes(cordova.file.applicationDirectory + "www/core/remote");

		
		
		// Update Cache
		
		
	};
	
	
	
	
	
	/*********************************************************************************
	 *
	 *	Loads a specific SPUD file and its contained files
	 *	@arg: path represents the path of the spud file to load
	 *
	 ********************************************************************************/
	self.loadSpudFile = function (path) {
		$.ajax({"url": path + "config.json", "dataType": "json"})
			.done(function (results) {
					try {
					  var obj = results;
					  
					  obj.path = path;
					  obj.spudURL = obj.path + obj.spud;
					  obj.css = obj.path + "remote.css";
					  $.ajax({
						 	"url":  obj.spudURL,
						 	"dataType": "html",
						 	"success" : function(html) {

							 	obj.html = html;

							  self.availableRemotes.push(obj);
							  
								
								//console.log("Selected Remote HTML: " + app.selectedRemote().html);
						 	},
						  "fail" : function(error) {
							  alert(error);
						  }
					  });


					} catch (error) {
						alert(error);

					}
					//app.availableRemotes.push($.parseJSON(result));
					//alert(app.availableRemotes[0].html);

			})
			.fail(function(xmlHttpRequest, textStatus, errorThrown) {
					alert("Readystate: " + xmlHttpRequest.readyState + " | Status: "+ xmlHttpRequest.status);
			});


		// Search custom/remotes directory

		// Foreach directory found, add the remote to the remote array


	};

	/*********************************************************************************
	 *
	 *	Searches For Devices on the connected network.
	 *	Stops searching after 10 seconds.
	 *
	 ********************************************************************************/
	self.quickDiscovery = function () {
		//alert("qD called");
		ConnectSDK.discoveryManager.startDiscovery();

		setTimeout(function() {
				console.log("Stop Searching");
				ConnectSDK.discoveryManager.stopDiscovery();
			},
		10000); // Stop Searching After 10 Seconds
	};


	/*********************************************************************************
	 *
	 *	Launches Device Selector
	 *	Stores Selected Device Info
	 *
	 ********************************************************************************/
	self.selectDevice = function() {
		self.quickDiscovery();
		ConnectSDK.discoveryManager.pickDevice().success(function(device){

			function configureDevice(){
				self.selectedDevice(device);
				self.keyControl = device.getKeyControl();
				self.mediaControl = device.getMediaControl();
				self.deviceName(device.getFriendlyName());
				self.deviceIP(device.getIPAddress());
			}

			if (device.isReady()) { // already connected
            configureDevice();
        } else {
            device.on("ready", configureDevice);
            device.connect();
        }
		});
	};
	
	
	/*********************************************************************************
	 *
	 *	Set's Selected Remote Property to the new remote
	 *	Updates CSS accodingly
	 *	Note: this property is binded and will update view accordingly
	 *	@arg: the "remote" argument is a reference to the selected remote object
	 *
	 ********************************************************************************/
	self.selectRemote = function(remote) {

		// Remove prior remote's css file if it exists
		$("#remote_css").remove(); 
		
		// Set selectedRemote property
		self.selectedRemote( remote);

		// add new remote's css file
		$("head").append("<link rel='stylesheet' type='text/css' href='"+self.selectedRemote().css+"'>");
	}

};


/*********************************************************************************
*
*	Instantiate an AppViewModel
*
********************************************************************************/
$(document).ready(function(){
	var app = new AppViewModel();

	ko.applyBindings(app);
	app.initialize();

});
