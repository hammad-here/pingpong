let isStart=false; //starting ball to move (stopping from increasing speed)
let leftHit = true;//points the last hit (ball moves upward or downward)
let topHit = true; //points the last hit (ball moves left or right)
let xBall = 0;     //ball's left margin
let yBall = 0;     //ball's top margin
let p1 = 0;        //first paddle's top margin 
let p2 = 0;        //second paddle's top margin
let score1=0;      //player1 score
let score2=0;      //player2 score
let range1={       //location of first paddle
    min:0,
    max:screen.height*0.12
}
let range2={      //location of second paddle
    min:0,
    max:screen.height*0.12
} //pressing any key will cause ball to start move

function game(event){
        if(!isStart) {
        isStart=true
        setInterval(() => {
            leftHit ? xBall += screen.width / 200 : xBall -= screen.width / 200;
            topHit ? yBall += screen.height / 250 : yBall -= screen.height / 250;
            //changing ball's direction (horizontaly)
            if (xBall >= (window.innerWidth * 0.9)) {
                leftHit = false;
                if(yBall<range1.min||yBall>=range1.max){
                    console.log("player 1 failed");
                    score1+=1;
                    document.getElementById("leftCounter").innerText=score1
                }
            } else if (xBall <= 50 && !leftHit) {
                leftHit = true;
                if(yBall<range2.min||yBall>=range2.max){
                    console.log("player 2 failed");
                    score2+=1
                    document.getElementById("rightCounter").innerText=score2
                }
            }
            //changing ball's direction (vertically)
            if (yBall >= (window.innerHeight * 0.8)) {
                topHit = false
            } else if (yBall <= 10 && !topHit) {
                topHit = true
            }
            document.querySelector("#ball").style.marginLeft = xBall + "px";
            document.querySelector("#ball").style.marginTop = yBall + "px";
        },20)
      }
          //changing paddles on clicking
        function paddleManagement(range,paddle,inc){
           paddle = inc?paddle + screen.height /60: paddle - screen.height /60;
                  range.min=paddle-30;
                  range.max=paddle+(window.innerHeight)*0.3;
                  return paddle;
            }
        switch (event.key) {
            case "ArrowUp": if (p1 >= 15) {p1= paddleManagement(range1,p1,false)}            
                break
            case "ArrowDown": if (p1 <= window.innerHeight * 0.65) { p1=paddleManagement(range1,p1,true)}
                break
            case "w": if (p2 >= 15) { p2 =paddleManagement(range2,p2,false); }
                break
            case "s": if (p2 <= window.innerHeight * 0.65) { p2=paddleManagement(range2,p2,true)}
                break
        }
        document.querySelector("#player2").style.marginTop=p1+"px";
        document.querySelector("#player1").style.marginTop=p2+"px";
     } 

window.addEventListener("keydown",(e)=>game(e))

let stat = undefined

let btn1 = document.getElementsByClassName("btn1")
btn1[0].onclick = (()=> stat = stat=="w"?undefined:"w")
btn1[1].onclick = (()=> stat = stat=="ArrowUp"?undefined:"ArrowUp")


let btn2 = document.getElementsByClassName("btn2")
btn2[0].onclick = (()=>{stat = stat=="s"?undefined:"s"})
btn2[1].onclick = (()=>{stat = stat=="ArrowDown"?undefined:"ArrowDown"})

setInterval(() => {
    if(stat!=undefined){
        game({key:stat})
    }
},50)

setInterval(()=>{
    if(screen.width<screen.height){
        alert("rotate your device for better experience")
    }
},20000)