var app = angular.module("myapp", ["ngRoute"]);
		app.config(function ($routeProvider) {
			$routeProvider
				.when("/home", {
					templateUrl: "index.html",
					controller:"myctrl"
				})
                .when("/about", {
					templateUrl: "about.html",
				})
                .when("/shop", {
					templateUrl: "shop.html",
                    controller :"myctrl1"
				})
                .when("/blog", {
					templateUrl: "blog.html",
				})
                .when("/contact", {
					templateUrl: "contact.html",
				})
                .when("/login", {
					templateUrl: "login.html",
				})
                .when("/cart/:img/:price/:name", {
					templateUrl: "cart.html",
                    controller: "cartbig"
				})
                .when("/cart",{
                    templateUrl: "cart.html",
                    controller: "cartbig"
                })
				.otherwise({
					redirectTo : "/home"
				});
		});
		app.run(function ($rootScope) {
			$rootScope.$on('$routeChangeStart', function () {
				$rootScope.loading = true;
			});
			$rootScope.$on('$routeChangeSuccess', function () {
				$rootScope.loading = false;
			});
			$rootScope.$on('$routeChangeError', function () {
				$rootScope.loading = false;
				alert("Lỗi")
			});

		});

    app.controller("myctrl", function ($scope, $http) {
         $scope.items = [];
            
        
        
        $scope.products = [];
        $http.get("js/list_product.json").then(function (response) {
            $scope.products = response.data;
        });
        
       
        
    });
    app.controller("myctrl1", function ($scope, $http) {
        $scope.items = [{
               img: "14.jpg",
               name: "T-SHIRT",
               price: 10000
           },
           {
               img: "15.jpg",
               name: "SHIRT",
               price: 20000
           }];
           
       
       
       $scope.products = [];
       $http.get("js/list_product.json").then(function (response) {
           $scope.products = response.data;
       }); 
   });
    app.controller("myctrl2", function ($scope) {
        

    });
    app.controller("cartbig",function($scope, $routeParams){
        $scope.img = $routeParams.img;
        $scope.name = $routeParams.name;
        $scope.price = $routeParams.price;
        
        
        $scope.remove_item = function(item){
            if(item){
                $scope.items.splice($scope.items.indexOf(item),1);
                $scope.amount -= item.price;
            }
        }
        $scope.getAmount = function () {
            var amount = 0;
            for (var i = 0; i < $scope.items.length; i++) {
                amount += $scope.items[i].price * $scope.items[i].quantity;
            }
            return amount;
        }
        
        $scope.items = [{
            img: "14.jpg",
            name: "T-SHIRT",
            price: 10000
        },
        {
            img: "15.jpg",
            name: "SHIRT",
            price: 20000
        }];
    });
        
        
