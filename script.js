//getting all the comments
c = document.querySelectorAll('.comment')
//copying the comments into a modifiable array
var comments = []
for (i = 0; i < c.length; i++){
    comments[i] = c[i]
}

//array of colors for different comments that are going to appear
const colors = ['bisque', 'gray', 'lightblue', 'aqua', 'beige', 'darkkhaki', 'aquamarine']

let paused = false
let commented = false

let video = document.querySelector('.video')
let body=document.querySelector('.body')
let box1=document.querySelector('.box1')
let interaction = document.querySelector('.interaction')
let cmnt = document.querySelector('.comments-container input')
let cmnt_sec = document.querySelector('.comment-section')

//hiding the interaction panel
interaction.style.display='none'; 
//hiding all the comments
for (i = 0; i < comments.length; i++){
    comments[i].style.display = "none";
}

//function to show only relevant comments according to the parameter passed based on video time
show_comments = (n) => {
    for (i = 0; i < comments.length; i++){
        comments[i].style.display = "none";
    }
    for (i = 0; i < n; i++){
        if(i<6 || (i>=6 && commented)){ //show the last comment only if the user has already interacted
            comments[i].querySelector('h1').style.backgroundColor = colors[i]
            comments[i].style.display = "";
        }
    }
}

//function to let the user interact through the interaction panel
interact = ()=>{
    body = document.querySelector('.body')
    body.style.backgroundColor = 'gray'
    interaction.style.display="";
}

//function to resume the video after the interaction
close_alert = (val)=>{
    interaction.style.display='none'
    body.style.backgroundColor = ''

    if (val==='yes'){
        comments[6] = c[6]
    }
    else{
        comments[6] = c[7]
    }
    commented = true
    video.play()
}

//function to add comments live by the user
cmnt.addEventListener('keyup', (event)=>{
    if (event.key === 'Enter'){
        new_cmnt = comments[6].cloneNode(true);
        new_cmnt.querySelectorAll('p')[1].innerText = event.target.value;
        new_cmnt.style.display='';
        cmnt_sec.appendChild(new_cmnt)
        console.log(event.target.value)
        event.target.value = ''
    }
})

//function repeated every second to check if the relevant comment has to appear based on the video time
a = setInterval(()=>{
    if(video.currentTime < 109){
        paused = false
    }
    if (video.currentTime > 110){
        paused = false
        show_comments(7)
    }
    else if (video.currentTime > 109 && video.currentTime < 110){
        if (!paused){
            video.pause()
            paused = true;
            interact();
        }
    }
    else if (video.currentTime > 86){
        show_comments(6)
    }
    else if (video.currentTime > 74){
        show_comments(5)
    }
    else if (video.currentTime > 72){
        show_comments(4)
    }
    else if (video.currentTime > 70){
        show_comments(3)
    }
    else if (video.currentTime > 55){        
        show_comments(2)
    }
    else if (video.currentTime > 10){
        show_comments(1)
    }
    else{
        show_comments(0)
    }
}, 1000);

//function repeated every second to check if the relevant effect (screen flickering) has to appear/stop based on the video time
b=setInterval(()=>{
    if(video.currentTime > 179 && video.currentTime< 215){
        body.style.animation = 'blinkingBackground 1s infinite'
        box1.style.animation = 'header 2s infinite'
    }
    else{
        body.style.animation = ''
        box1.style.animation = ''
    }
}, 1000);
