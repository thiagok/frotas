app.controller('VehicleController', ['$scope', function($scope) { 

  $scope.currentPage = 0;
  $scope.pageSize = 5;
  $scope.itens = [];
  $scope.originalVehicle = $scope.editedVehicle = null;
  $scope.query = {}
  $scope.queryBy = 'marca'
  $scope.form_state = 'add';

  $scope.numberOfPages = function() {
      return Math.ceil($scope.itens.length/$scope.pageSize);                
  };

  if(!localStorage.getItem("itens")) {
    $scope.itens.push(
      {combustivel: 3, imagem: null, marca: "Volkswagen", modelo: "Gol", placa: "FFF-5498"},
      {combustivel: 1, imagem: null, marca: "Volkswagen", modelo: "Fox", placa: "FOX-4125"},
      {
        combustivel: 2, 
        imagem: "http://origin.fstatic.com.br/240x180/fusca-84-alcool-original-vendido-_756125e3.jpg", 
        marca: "Volkswagen", 
        modelo: "Fusca", 
        placa: "PAI-4121"
      }
    );
    localStorage["itens"] = JSON.stringify($scope.itens);
  } else {
    var fromStorage = localStorage.getItem("itens");
    $scope.itens = JSON.parse(localStorage["itens"]);
  }

  $scope.orderProp = "placa";
  $scope.combustiveis = [{id: 1, name: "Gasolina"}, {id: 2, name: "Álcool"}, {id: 3, name: "Flex"}];

  $scope.update = function() {
    if($scope.form_state == "add") $scope.addRow();
    else $scope.save();
    return false;
  }

  $scope.addRow = function() {
    $scope.itens.push({combustivel: $scope.vel.combustivel, imagem: $scope.vel.imagem, marca: $scope.vel.marca, modelo: $scope.vel.modelo, placa: $scope.vel.placa});
    
    $("#modalAdd").modal('hide');
    $scope.cleanScreenVars();
    $scope.refreshLocalStorage();

    // API Post
    //$http.post("https://azulfrotas.herokuapp.com/", {vehicle: $scope.itens});
  };

  $scope.remove = function(vehicle) {
    if(vehicle != -1)
      $scope.itens.splice(vehicle, 1);

    $scope.refreshLocalStorage();

  };

  $scope.edit = function(vehicle) {
    $scope.form_state = "edit";
    $scope.vel = vehicle;
    $("#modalAdd").modal('show');
  };

  $scope.save = function() {
    $("#modalAdd").modal('hide');
    $scope.refreshLocalStorage();
  };

  $scope.cleanScreenVars = function() {
    $scope.combustivel = "";
    $scope.imagem = "";
    $scope.marca = "";
    $scope.modelo = "";
    $scope.placa = "";
  };

  $scope.refreshLocalStorage = function(){
    localStorage.removeItem("itens");
    localStorage["itens"] = JSON.stringify($scope.itens);
  };

}]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
