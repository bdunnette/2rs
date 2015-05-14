/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({
  'click #record-audio': function(event) {
    recorder && recorder.record();
    console.log(recorder);
    event.target.disabled = true;
    event.target.nextElementSibling.disabled = false;
    console.log('Recording...');
  },

  'click #stop-recording': function() {
    recorder && recorder.stop();
    event.target.disabled = true;
    event.target.previousElementSibling.disabled = false;
    console.log('Stopped recording.');
  }
});

function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  console.log('Media stream created.');
  // Uncomment if you want the audio to feedback directly
  //input.connect(audio_context.destination);
  //__log('Input connected to audio context destination.');

  recorder = new Recorder(input);
  console.log('Recorder initialised.');
}

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({

});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function() {

};

Template.Home.rendered = function() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    audio_context = new AudioContext();
    console.log('Audio context set up.');
    console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  }
  catch (e) {
    console.log(e);
  }

  navigator.getUserMedia({
    audio: true
  }, startUserMedia, function(e) {
    console.log(e);
  });

};

Template.Home.destroyed = function() {};
