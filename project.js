//  step 1 :Deposit some Money...
//  step 2 :Determine the no. of lines to bet on..
//  step 3 :Collect a bet amount...
//  step 4 :spin the slot machine..
//  step 5 :check if the user won...
//  step 6 :Give the user their winnings..
//  step 7 :Play Again..


// function deposit(){
//     return 1
// }

//step 1;
const prompt = require("prompt-sync")(); // two jobs - 1. importing lib prompt-sync.  2. calls it to take the input/

const Rows = 3;
const cols = 3;

const Symbols_count = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const Symbols_values = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}



const deposit = () => {
    while(true){
    const depositAmount = prompt("Enter a deposit amount: "); //Take the deposit amount by calling the prompt function/
    const depositAmountNumber = parseFloat(depositAmount); // converting the string recieved from above func. to number. (eg. "17.2" -> 17.2).
    if(isNaN(depositAmountNumber) || depositAmount <= 0){
        console.log("Invalid Deposit Amount, Try Again.")
    }
    else{
        return depositAmountNumber;
    }
 }
};

// step 2;
 const get_no_of_lines = () => {
 while(true){
    const NumberofLines = prompt("Enter No. of lines to bet : (1-3) "); //Take the No. of lines to deposit amount by calling the prompt function/
    const Num_oflines = parseFloat(NumberofLines); // converting the string recieved from above func. to number. (eg. "17.2" -> 17.2).
    if(isNaN(Num_oflines) || Num_oflines <= 0 || Num_oflines > 3){
        console.log("Invalid Number of lines, Try Again.")
    }
    else{
        return Num_oflines;
    }
 }
  
 };
  
 // step 3;

 const getbet = (balance, lines) => {
   while(true){
    const bet = prompt("Enter the bet per line : "); //Take the bet amount by calling the prompt function/
    const Num_bet = parseFloat(bet); // converting the string recieved from above func. to number. (eg. "17.2" -> 17.2).
    if(isNaN(Num_bet) || Num_bet <= 0 || Num_bet > balance / lines){
        console.log("Invalid Number of lines, Try Again.")
    }
    else{
        return bet;
    }
 }
  
 }

// step 4;

const spin = () => {
    const symbols = [];
    for(const[symbol,count] of Object.entries(Symbols_count)) {
      for(let i=0; i< count; i++){
        symbols.push(symbol);
      }
    }
    const reels = [];
    for(let i=0; i < cols; i++){
        reels.push([]);
        const reelsymbols = [...symbols];
        for(let j=0; j < Rows; j++){
            const randomIndex = Math.floor(Math.random() * reelsymbols.length)
            const selectedsymbol = reelsymbols[randomIndex];
            reels[i].push(selectedsymbol);
            reelsymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = []

    for(let i=0; i< Rows; i++){
        rows.push([]);
        for(let j=0; j< cols; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
}

const Printrows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for(const [i, symbol] of row.entries()) {
            rowString += symbol;
            if(i != rows.length - 1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    
    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allsame  = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]) {
                allsame = false;
                break;
            }
        }

        if(allsame){
            winnings += bet * Symbols_values[symbols[0]]
        }
    }
    return winnings;
}


const game = () => {

let balance = deposit();

while(true){

 console.log("You have a balance left of Rs." + balance);
const Numb_of_lines = get_no_of_lines();
const betamount = getbet(balance, Numb_of_lines);
balance -= betamount * Numb_of_lines; 
const reels = spin();

const rows = transpose(reels);
Printrows(rows);

const winnings = getWinnings(rows, betamount, Numb_of_lines);
balance += winnings;
console.log("You won Rs." + winnings.toString());
   
   if(balance <= 0) {
      console.log("You ran out of Money!");
      break;
   }
   const Playagain = prompt("Do you want to play again (y/n)? ");

   if(Playagain != "y") break;
  }
};
game();