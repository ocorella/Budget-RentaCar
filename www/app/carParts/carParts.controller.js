(function() {
  'use strict';

  angular
    .module('budgetrentacar.carParts')
    .controller('CarPartsController', CarPartsController);

    CarPartsController.$inject = ['CarPartsService',
                                  'CarInfoFirebaseService',
                                  '$state',
                                  'ACCESORIES',
                                  'SELECTED_ACCESORIES',
                                  'RevisionService'];

  function CarPartsController(CarPartsService,
                              CarInfoFirebaseService,
                              $state,
                              ACCESORIES,
                              SELECTED_ACCESORIES,
                              RevisionService) {

    var vm = this;
    vm.CarPartsService = CarPartsService;
    vm.CarInfoFirebaseService = CarInfoFirebaseService;
    vm.goToEndOrFeedback = goToEndOrFeedback;
    vm.accesories = ACCESORIES;
    vm.accesory = SELECTED_ACCESORIES;

    function resetItems() {
      vm.accesory = SELECTED_ACCESORIES;
    }

    function goToEndOrFeedback() {
      RevisionService.setCarAccesories(vm.accesory);
      resetItems();
      (RevisionService.getRevision().type == 'check-out') ?
        $state.go('feedback') : $state.go('login');
    }
  }
})();
