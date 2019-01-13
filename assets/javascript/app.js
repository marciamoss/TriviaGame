$(document).ready(function() {
    var lapse=[];var clicked;
    var trivia=[trivia1,trivia2,trivia3,trivia4,trivia5,trivia6,trivia7,trivia8,trivia9,trivia10], 
    correctAns=[], wrongAns=[], unAns=[];

    function display(lapseTime){

        lapse.push(lapseTime);
        
        $("#question").html("<br>"+trivia[(lapse.length-1)].q+"<br>");
        for(var j=0;j<4;j++){
            var x = document.createElement("INPUT");
            x.setAttribute("type", "radio");
            x.setAttribute("name",(lapse.length-1));
            x.setAttribute("value",trivia[(lapse.length-1)].a[j]);
            x.setAttribute("class","answer");
            x.setAttribute("id","answer"+(lapse.length-1));
            $("#question").append(x);

            $("#question").append(trivia[(lapse.length-1)].a[j]+"<br>");
        } 

        function showAnswer(txt,imgAns){
            $("#question,#answer1, #answer2, #answer3, #answer4").empty();
            $("#question").html(txt);
            var isrc='<img id="theImg" src="assets/images/'+imgAns+'.jpg" />';
            $('#question').append("<br>"+isrc);
            

        }
        clicked=trivia[(lapse.length-1)].correct;
        
        //checking the answers
        $(":radio").click(function(){
            var radioName = $(this).attr("name"); //Get radio name
            var radioValue = $(this).attr("value"); //Get radio name
            $(":radio[name='"+radioName+"']").attr("disabled", true); //Disable all with the same name
            if(radioValue===(trivia[$(this).attr("name")].correct)){
                var txt="You Got It Right!!!"+"<br>"+"Correct Answer Is: "+(trivia[$(this).attr("name")].correct);
                var imgAns=trivia[$(this).attr("name")].correct;
                correctAns.push($(this).attr("name"));
                
            }else{
                var txt="Incorrect!!!"+"<br>"+"Correct Answer Is: "+(trivia[$(this).attr("name")].correct);
                var imgAns=trivia[$(this).attr("name")].correct;
                wrongAns.push($(this).attr("name"));
            }
            showAnswer(txt,imgAns);
            clicked=1;
        });

        function notAnswer(){
            if(clicked!==1){
                var txt="Out of Time!!!<br>Correct Answer is: "+clicked;
                var imgAns=clicked;
                showAnswer(txt,imgAns);
                clearInterval(x);
                unAns.push(trivia[(lapse.length-1)].correct);
            }
        }

        setTimeout(notAnswer,6000);
        return clicked;
    }
    
    
    $(".start").on("click", function() {       
        
        $("#timeCounter").empty();       
        $('#timeCounter').css("border", "none");  
    
        //JUST FOR THE TIMER
        var countDownQ =new Date().getTime()+80000;
        var y = setInterval(function() {
            var nowQ = new Date().getTime();
            var distanceQ = countDownQ - nowQ;
            var daysQ = Math.floor(distanceQ / (1000 * 60 * 60 * 24));
            var hoursQ = Math.floor((distanceQ % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutesQ = Math.floor((distanceQ % (1000 * 60 * 60)) / (1000 * 60));
            var secondsQ = Math.floor((distanceQ % (1000 * 60)) / 1000);

            if(secondsQ>=0){$("#timeCounter").html("Time remaining: Minutes:"+minutesQ+" Seconds: "+ secondsQ); }
            
            if (distanceQ < 0 ) {
                clearInterval(y);
            }
        }, 1000);
        //END OF TIMER

        //this call is to display first question without delay
        clicked=display(110);

        // Set the date we're counting down to
        var countDownDate =new Date().getTime()+80000;
        
        // Update the count down every 1 second
        var x = setInterval(function() {

            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
            // display questions
            
            if(lapse.length<10 ){
                clicked=display((minutes*60+seconds));
            }
            
            //end of display questions

            if (distance < 0 ) {
                clearInterval(x);
                txt="All done, here's how you did!<br>Correct Answers: "+correctAns.length+
                "<br>Incorrect Answers: "+wrongAns.length+"<br>Unanswered: "+unAns.length+"<br>";
                $("#question,#answer1, #answer2, #answer3, #answer4").empty();
                $("#question").html(txt);

                var retry = $('<input type="button" id="retry"/>');
                retry.appendTo("#question");
                $("#question").append("<br>Click the flag to Retry");
                $("#retry").on("click", function() { 

                    location.reload();
                });
            }
        }, 8000); 
    });
});