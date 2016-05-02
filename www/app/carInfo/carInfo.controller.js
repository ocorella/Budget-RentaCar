(function() {
  'use strict';

  angular
  .module('budgetrentacar.carInfo')
  .controller('CarInfoController', CarInfoController);

  CarInfoController.$inject = ['CarInfoFirebaseService',
                               '$state',
                               'RevisionService',
                               'LastRevisionService',
                               '$ionicNavBarDelegate'];

  function CarInfoController(CarInfoFirebaseService,
                             $state,
                             RevisionService,
                             LastRevisionService,
                             $ionicNavBarDelegate) {
    var vm = this;
    vm.goToCarView = goToCarView;
    vm.RevisionService = RevisionService;
    vm.CarInfoFirebaseService = CarInfoFirebaseService;

    activate();

    function setNewRevisionType() {
      var lastRevision = LastRevisionService.revision;
      if (lastRevision) {
        RevisionService.setNewType(lastRevision.type);
          if (lastRevision.contract_number) {
            RevisionService.setContractNumber(lastRevision.contract_number);
          }
      } else {
        RevisionService.setNewType('check-in');
      }
    }

    function goToCarView() {
      RevisionService.setLicensePlate(CarInfoFirebaseService.carInfo.license_plate);
      RevisionService.setCarMVA(CarInfoFirebaseService.carInfo.MVA);
      $state.go('carDeliveryInfo');
    }

    function activate() {
      $ionicNavBarDelegate.showBackButton(false);
      setNewRevisionType();
      CarInfoFirebaseService.carInfo.model ?
      vm.isLoaded = true : vm.isLoaded = false;
      setTimeout(function() {
        if (!vm.isLoaded) {
          $state.go('scanner-error');
        }
      }, 7000);
    }
  }
})();
