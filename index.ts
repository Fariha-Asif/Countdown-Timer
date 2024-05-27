#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";

console.log(chalk.blueBright("//////////"), chalk.magentaBright.italic.bold("WELCOME TO COUNTDOWN TIMER APPLICATION"), chalk.blueBright("//////////"));

let name = await inquirer.prompt({
    name: "name",
    type: "input",
    message: "Write your name here."
})

async function promptUser (){ 
    const value = await inquirer.prompt({
    name: "value",
    type: "number",
    message: chalk.redBright.bold("please enter the amount in seconds."),
    validate: (input)=>{
        if(isNaN(input)){
            return chalk.yellowBright("Kindly Enter Valid Number")
    } else if(input > 60){
        return chalk.yellowBright("Seconds must be in 60")
    } else {
        return true;
    }
}
})
return value.value
}


function startTime (value: number) {
    return new Promise((resolve) => {
    const initial = new Date().setSeconds(new Date().getSeconds() + value)
    const intervalTime = new Date(initial); 
    const interValue = setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if(timeDiff <= 0){
            clearInterval(interValue);
            console.log(chalk.yellowBright("Timer has Expired"));
            resolve(null);
        }else{
        const minutes = Math.floor((timeDiff %(3600*24))/3600)
        const seconds = Math.floor((timeDiff % 60));
        console.log(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    }},1000)
})}

async function exit() {
    let shouldContinue = true;
    while(shouldContinue){
const input = await promptUser() 
 await startTime(input)
 const answer = await inquirer.prompt({
    name: "continue",
    type: "confirm",
    message: "Do you want to try again?",
    default: true
 })
    shouldContinue = answer.continue
}
    console.log(chalk.cyanBright.bold.italic("Dear"), chalk.magentaBright.italic.bold(`${name.name},`), chalk.cyanBright.bold.italic("THANKYOU FOR USING COUNTDOWN TIMER. HOPE YOU ENJOYED"));
    
}
exit()