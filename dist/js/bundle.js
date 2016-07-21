function LoginController(loginService,$location){var self=this;self.email="",self.password="",self.errorMessage="",self.$onInit=function(){},self.login=function(){loginService.login(self.email,self.password).then(function(data){self.errorMessage="",$location.path("/customers")},function(err){self.errorMessage=err.data})},self.clear=function(){self.email="",self.password="",self.errorMessage=""}}function LoginService($http){var factory={};return factory.login=function(email,password){return $http.post("/api/user/authenticate",{email:email,password:password})},factory}function FooterController(){}function NavigationController(){}function UtilsService(){return{findById:function(a,id){for(var i=0;i<a.length;i++)if(a[i].id==id)return a[i];return null}}}function CustomerDetailsController(customerDetailsService,$routeParams){var self=this;self.customer={},self.house={},self.params=$routeParams,self.$onInit=function(){self.params&&getCustomerDetails(self.params.id,getHomeDetails)};var getCustomerDetails=function(id,callback){customerDetailsService.getCustomerByID(id).then(function(data){self.customer=data.data,callback(self.customer.homeID)},function(error){throw new Error(error)})},getHomeDetails=function(id){customerDetailsService.getHomeByCustomerHomeId(id).then(function(data){self.house=data.data},function(err){throw new Error(err)})}}function CustomerDetailsService($http){var factory={};return factory.getCustomerByID=function(id){return $http.get("/api/customer/"+id)},factory.getHomeByCustomerHomeId=function(id){return $http.get("/api/house/"+id)},factory}function CustomerAddController(customerAddService){var self=this;self.customer={firstName:"",lastName:"",address:"",phoneNumber:"",email:""},self.home={totalSize:0,numStories:0,numBedrooms:0,numBathrooms:0,acType:"",heatingType:"",installationDate:null},self.room={size:null,numWindows:null,numStory:null},self.rooms=[],self.options=[1,2,3,4,5,6],self.acTypes=["Central Air","Window Unit","Mini Split","Other"],self.heatTypes=["Furnace","Boiler","Heat Pump","Gas","Other"],self.clearRoomForm=function(){self.room.size=null,self.room.numWindows=null,self.room.numStory=null},self.addRoom=function(room){self.rooms.push(room),self.clearRoomForm(),console.log(self.rooms)},self.removeRoom=function(index){self.rooms.splice(index,1),console.log(self.rooms)}}function CustomerAddService($http){var factory={};return factory}function CustomerListController(customerListService,$location){var self=this;self.customers=[],self.$onInit=function(){customerListService.getCustomerList().then(function(data){console.log(data),self.customers=data.data},function(err){throw new Error(err)})},self.viewCustomerDetails=function(id){$location.path("/customer/"+id)},self.addNewCustomer=function(){$location.path("/customer/new")}}function CustomerListService($http){var factory={};return factory.getCustomerList=function(){return $http.get("/api/customers")},factory}angular.module("main",["ngMaterial","ngMessages","ngRoute"]).config(["$routeProvider",function($routeProvider){$routeProvider.when("/",{template:"<login></login>"}).when("/customers",{template:"<customer-list></customer-list>"}).when("/customer/new",{template:"<customer-add></customer-add>"}).when("/customer/:id",{template:"<customer-details></customer-details>"})}]),angular.module("main").component("login",{templateUrl:"views/login/login.template.html",controller:LoginController}),LoginController.$inject=["login.service","$location"],angular.module("main").factory("login.service",LoginService),LoginService.$inject=["$http"],angular.module("main").component("bottomNav",{templateUrl:"views/common/footer.template.html",controller:FooterController}),FooterController.$inject=[],angular.module("main").component("topNav",{templateUrl:"views/common/header.template.html"}),NavigationController.$inject=[],angular.module("main").factory("utils.service",UtilsService),UtilsService.$inject=[],angular.module("main").component("customerDetails",{templateUrl:"views/customer/customer-details/customer-details.template.html",controller:CustomerDetailsController}),CustomerDetailsController.$inject=["customer-details.service","$routeParams"],angular.module("main").factory("customer-details.service",CustomerDetailsService),CustomerDetailsService.$inject=["$http"],angular.module("main").component("customerAdd",{templateUrl:"views/customer/customer-add/customer-add.template.html",controller:CustomerAddController}),CustomerAddController.$inject=["customer-add.service"],angular.module("main").factory("customer-add.service",CustomerAddService),CustomerAddService.$inject=["$http"],angular.module("main").component("customerList",{templateUrl:"views/customer/customer-list/customer-list.template.html",controller:CustomerListController}),CustomerListController.$inject=["customer-list.service","$location"],angular.module("main").factory("customer-list.service",CustomerListService),CustomerListService.$inject=["$http"];
//# sourceMappingURL=bundle.js.map
