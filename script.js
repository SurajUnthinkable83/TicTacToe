let turn='O';
let winner='Player 1';
let player1=document.getElementById('p1');
let player2=document.getElementById('p2');
player1.style.backgroundColor='#236b52';

player1score=+player1.children[0].textContent;
player2score=+player2.children[0].textContent;

let result=document.querySelector('.conclusion');

let draw=9;
let tempcellarray=[['-1','-1','-1'],
                   ['-1','-1','-1'],
                   ['-1','-1','-1']];

// buttons
let buttons = document.getElementsByTagName('button');
//replay button
buttons[0].addEventListener('click',()=>{
        tempcellarray=[['-1','-1','-1'],
                       ['-1','-1','-1'],
                       ['-1','-1','-1']];
        draw=9;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                let cell=document.getElementById(`cell_${i}_${j}`);
                cell.innerHTML='';
            }
        }
        result.style.zIndex="-10";
        
});

//reset button
buttons[2].addEventListener('click',()=>{
    window.location.reload();
});

//change turn button
buttons[1].addEventListener('click',()=>{
    if(draw==9){
        changeTurn();
    }
});


//onclick handler
for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
       let cell=document.getElementById(`cell_${i}_${j}`);
       cell.addEventListener('click',()=>{check(i,j)});
    }
}

// change the turn 
function changeTurn(){
    if(turn==='O'){
        turn='X';
        winner='Player 2';
        player1.style.backgroundColor='transparent';
        player2.style.backgroundColor='#944E63';
    }
    else{
        turn='O';
        winner='Player 1';
        player1.style.backgroundColor='#236b52';
        player2.style.backgroundColor='transparent';
    }
}


// check if wins
function check(i,j){
    let cell=document.getElementById(`cell_${i}_${j}`);
    cell.innerHTML=turn;
    tempcellarray[i][j]=turn;
    
     let cnt=0;
    // along diagonal (0,0) to (2,2)
    for(let k=0;k<3;k++){
        if(tempcellarray[k][k]!=turn){
            cnt=0; 
            break;
        }else{
            cnt++;
        }
    }
    if(cnt===3){
        resultDisplay();
        return;
    }
    // along diagonal (0,2) to  (2,0)
    for(let k=0;k<3;k++){
        if(tempcellarray[k][2-k]!=turn){
            cnt=0; 
            break;
        }
        else{
            cnt++;
        }
    }
    if(cnt===3){
        resultDisplay();
        return;
    }
    // along row 
    for(let k=0;k<3;k++){
        if(tempcellarray[i][k]!=turn){
            cnt=0; 
            break;
        }
        else{
            cnt++;
        }
    }
    if(cnt===3){
        resultDisplay();
        return;
    }
    // along column
    for(let k=0;k<3;k++){
        if(tempcellarray[k][j]!=turn){
            cnt=0; 
            break;
        }
        else{
            cnt++;
        }
    }
    if(cnt===3){
        resultDisplay();
        return;
    }
    draw--;
    if(draw==0){
        result.children[0].innerHTML=`Draw`;
        result.style.zIndex="10";
        return;
    }
    changeTurn();
}

function resultDisplay(){
    if(winner==='Player 1'){
        player1score++;
        player1.children[0].textContent=player1score
    }
    else{
        player2score++;
        player2.children[0].textContent=player2score;
    }
    result.children[0].innerHTML=`${winner} wins`;
    result.style.zIndex="10";
}