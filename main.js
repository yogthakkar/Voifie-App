var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start()
{
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function(event)
{
    console.log(event);
    var Content = event.results[0][0].transcript;
    
    document.getElementById("textbox").innerHTML = Content;
    console.log(Content);
    if (Content =="take my selfie")
    {
        console.log("taking your selfie in 3 seconds");
        speak();
    }
    Webcam.attach(camera);
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "Taking you selfie in 3 seconds";
    var utteThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utteThis);

    setTimeout(function()
    {
        takeSnapShot();
        save();
    }, 3000);
}

Webcam.set({
    width:360,
    height:250,
    image_format : 'png',
    png_quality:90
});
camera = document.getElementById("camera");

function takeSnapShot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'">';
    })
}

function save()
{
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click();
}