angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };


})

.controller('AudioCtrl', function($scope, $cordovaMedia, $cordovaNativeAudio, MediaService) {
  $scope.isSoundLoaded = false;
  $scope.audio = null;
  $scope.media = null;

  $scope.playMedia = function()
  {
      $scope.media = MediaService.PlayMedia('sounds/sound.mp3');
      
  }
  $scope.stopMedia = function()
  {
    $scope.media.stop();
  }

  function playNativeSound(name){
    $cordovaNativeAudio.play(name);
  }

  function loadSound()
  {
    $cordovaNativeAudio
            .preloadSimple('mySound', 'sounds/sound.mp3')
            .then(function (msg) {
            }, function (error) {
              alert(error);
            });
      $scope.isSoundLoaded = true;
      playNativeSound('mySound');
  }

  $scope.playNative = function()
  {
    if($scope.isSoundLoaded)
    {
      playNativeSound('mySound');
    }
    else
    {
      loadSound();
    }
  }

  $scope.playNativeLoop = function ()
  {
    if($scope.isSoundLoaded)
    {
      $cordovaNativeAudio.loop('mySound');
    }
    else
    {
      loadSound();
    }
  }

  $scope.stopNative = function(){
      $cordovaNativeAudio.stop('mySound');
  }

  $scope.playWebAudio = function()
  {
    try{
      $scope.audio = new Audio('http://codedreaming.com/wp-content/uploads/main_tune.mp3');
      $scope.audio.play();
    }
    catch(e){
      alert(e);
    }
  }

  $scope.playWebAudioLoop = function()
  {
    $scope.audio = new Audio('http://codedreaming.com/wp-content/uploads/main_tune.mp3');
    $scope.audio.loop = true;
    $scope.audio.play();
  }

  $scope.stopWeb = function()
  {
    $scope.audio.pause();
  }


});
