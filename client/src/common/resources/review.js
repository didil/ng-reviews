angular.module('resources.review', ['firebase'])
  .constant("FIREBASE_URI", "https://ng-reviews.firebaseio.com/reviews")
  .factory('Review', function (FIREBASE_URI, $firebase) {
    var ref = new Firebase(FIREBASE_URI);
    return $firebase(ref);
  });