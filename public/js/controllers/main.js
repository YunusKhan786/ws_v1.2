angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;



		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;

				$scope.selected = [];    
    			$scope.selectedValues = [];    			
    			$scope.checkboxModel = [];
		});

		$scope.$watch('selected', function(nowSelected){
        $scope.selectedValues = [];
        
        if( ! nowSelected ){
            // here we've initialized selected already
            // but sometimes that's not the case
            // then we get null or undefined
            return;
        }
        angular.forEach(nowSelected, function(val){
            $scope.selectedValues.push( val.id.toString() );
        });
    });

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen			

     		if ($scope.checkboxModel.value1 == true ) { $scope.formData.workitem1 = "Plumbing" ; }
     		if ($scope.checkboxModel.value2 == true ) { $scope.formData.workitem2 = "Pest Control" ; }
     		if ($scope.checkboxModel.value3 == true ) { $scope.formData.workitem3 = "Gardening" ; }
			$scope.formData.selectedValues=$scope.selectedValues;
			$scope.formData.name
			if ($scope.formData.name || 
				( $scope.formData.house_no || 
				$scope.formData.street || 
				$scope.formData.area || 
				$scope.formData.city || 
				$scope.formData.country || 
				$scope.formData.pincode ) && 
				$scope.formData.email &&
				($scope.formData.phone_no || $scope.formData.mobile) != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
	}]);