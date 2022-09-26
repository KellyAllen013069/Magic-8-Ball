function shake(){

    let ball= document.getElementById("ball")
    let messageText = document.getElementById("message")
 
    //remove prev message
    if(messageText != null){
     messageText.parentNode.removeChild(messageText);
    }
    
    //css animation
    ball.classList.add("shake");
 
    //remove shake class
    setTimeout(function(){ ball.classList.remove("shake"); }, 1500);
    
    //call the fortune function
    setTimeout(function(){ getFortune(); }, 1500);
 }
 
 
 //generate the fortune
 function getFortune(){
     //array of fortunes
     let fortunes = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes -- definitely', 'You may rely on it', 
     'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy', 'Try again', 'Ask again later',
      'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Do not count on it', 'My reply is no', 
      'My sources say no', 'Outlook not so good', 'Very doubtful']
 
     //get a random fortune message message
     let fortune = fortunes[Math.floor(Math.random()*fortunes.length)];
 
     //display the fortune
     let parent = document.getElementById("fortune");
     let newMessage = document.createElement("div");
     newMessage.setAttribute('id', "message");
     newMessage.innerHTML = "\""+fortune+"\"";
     parent.appendChild(newMessage);
 }