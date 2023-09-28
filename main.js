prediction_1=""
prediction_2=""

Webcam.set({
    height:300,
    width:300,
    image_format:'jpeg',
    jpeg_quality:100
});
Webcam.attach("#webcam");

function take_snapshot(){
    Webcam.snap(function(data_uri){
document.getElementById("snapshot").innerHTML='<img id="output" src="'+data_uri+'">'
    })
}


console.log('ml5version',ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/IskcsrjlD/model.json",loaded);
 function loaded(){
    console.log("Model is loaded");

 }
 function check(){
    img=document.getElementById("output")
    classifier.classify(img,got_result)
 }
 function got_result(error,result){
    if(error){
        console.log(error);
    }else{
        console.log(result);
        document.getElementById("emotion1name").innerHTML=result[0].label;
        document.getElementById("emotion2name").innerHTML=result[1].label;
        prediction_1=result[0].label;
        prediction_2=result[1].label;
        speak()
        if(result[0].label=="Happy"){
            document.getElementById("emotion1emoje").innerHTML="&#128512;"
        }
        if(result[0].label=="Sad"){
            document.getElementById("emotion1emoje").innerHTML="&#128557;"
        }
        if(result[0].label=="Angry"){
            document.getElementById("emotion2emoje").innerHTML="&#128545;"
        }
        if(result[1].label=="Happy"){
            document.getElementById("emotion2emoje").innerHTML="&#128512;"
        }
        if(result[1].label=="Sad"){
            document.getElementById("emotion2emoje").innerHTML="&#128557;"
        }
        if(result[1].label=="Angry"){
            document.getElementById("emotion2emoje").innerHTML="&#128545;"
        }
        
        
    }
 }
 function speak(){
    var synth= window.speechSynthesis;
    speak1="The first prediction is"+prediction_1;
    speak2="And the second prediction is"+prediction_2;
    var utter_this=new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(utter_this);
 }
