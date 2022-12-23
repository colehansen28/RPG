let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");
const button3 = document.querySelector(".button3");
const text = document.querySelector(".text");
const xptext = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector(".monsterStats");
const MonsterNameText = document.querySelector(".monsterName");
const MonsterHealthText = document.querySelector(".monsterHealth");
const modal = document.querySelector('.modal');
const modalHeader = document.querySelector('.modalHeader');
const modalRemarks = document.querySelector('.modalRemarks');
const closeModal = document.querySelector('.closeModal');
const image = document.querySelector('.image');

const monsters = [
    {
        name: 'Slime',
        level: 5,
        health: 100
    },
    {
        name: 'Beast',
        level: 9,
        health: 150
    },
    {
        name: 'Dragon',
        level: 18,
        health: 300
    },
]

const weapons = [
    {
        name: 'stick',
        power: 5
    },
    {
        name: 'dagger',
        power: 30
    },
    {
        name: 'claw hammer',
        power: 50
    },
    {
        name: 'Sword',
        power: 100
    },
];

const locations = [
    {
        name: 'town square',
        'button text':["Go to store", "Go to cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text:"You are in the Town Squre. You seen a sign that says 'Store'."
    },
    {
        name: 'Store',
        'button text':["Buy 10 health (10 Gold) ", "Buy a Weapon (30 Gold)", "Go to Town Square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text:"You entered the store.."
    },
    {
        name: "cave",
        'button text':["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text:"You enter the cave and you see some monsters."
    },
    {
        name: "fight",
        'button text':["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text:"You are fighting a monster."
    },
];

const images =[
    {img:"images/Main Hero Image.png"},
    {img:"images/Town Square Image.png"},
    {img:"images/Store Image.png"},
    {img:"images/Cave image.png"},
    {img:"images/Slime Monster Image.png"},
    {img:"images/Fanged Beast Image.png"},
    {img:"images/Dragon image.png"},
    
]

//initialize buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    button1.innerHTML = location['button text'][0];
    button2.innerHTML = location['button text'][1];
    button3.innerHTML = location['button text'][2];
    button1.onclick = location['button functions'][0];
    button2.onclick = location['button functions'][1];
    button3.onclick = location['button functions'][2];
    text.innerHTML = location.text;

};

function goTown(){
   update(locations[0]); 
   monsterStats.classList.add('hidden');
   console.log(monsterStats.classList)
   image.src = images[1].img;
};

function goStore(){
    update(locations[1]);
    image.src = images[2].img;
};

function goCave(){
    update(locations[2]);
    image.src = images[3].img;
};

function fightSlime(){
    fighting = 0;
    goFight();
    text.innerHTML = "You are now fighting the SLIME.";
    image.src = images[4].img;
};

function fightBeast(){
    fighting = 1;
    goFight();
    text.innerHTML = "You are now fighting the BEAST.";
    image.src = images[5].img;

};

function fightDragon(){
    fighting = 2;
    goFight();
    image.src = images[6].img;


};

function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.classList.remove('hidden');
    MonsterNameText.innerHTML = monsters[fighting].name;
    MonsterHealthText.innerHTML = monsters[fighting].health;
};

function attack(){
    text.innerHTML = "The " + monsters[fighting].name + " is attacking";
    text.innerHTML += " You strike it with your " + weapons[currentWeapon].name + ".";
    if(isMonsterHit()){
        health -= monsters[fighting].level;
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random()) + 1;
    }
    else{
        text.innerHTML = " You missed your strike."
        monsterHealth = monsterHealth
    }
    healthText.innerHTML = health;
    MonsterHealthText.innerHTML = monsterHealth;
    if(monsterHealth <= 0){
        console.log('you killed the monster');
       fighting == 2 ? endGame() : defeatMonster();
    }
    else if(health <= 0){
        console.log('you died')
        lose();
    }
    if(Math.random() <= .1 && inventory.length !== 1){
        text.innerHTML = "Your" + inventory.pop() + " has broken."
        currentWeapon--;
    }
};

function dodge(){

};

function isMonsterHit(){
    return Math.random()>.15 || health < 20;
}


function buyHealth(){
    if(gold >= 10 && health < 100){
        gold -= 10;
        health += 10;
        goldText.innerHTML = gold;
        healthText.innerHTML = health;
    }
    else{
        text.innerHTML = "Not Enough Gold";
    }
    if(health == 100){
        gold == gold;
        text.innerHTML = "Your health is full."
    }
};

function buyWeapon(){
    if(currentWeapon < weapons.length - 1){
        if (gold >= 30){
            gold -= 30
            currentWeapon++;
            goldText.innerHTML = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerHTML = "You now have a " +  newWeapon + ".";
            inventory.push(newWeapon)
            text.innerHTML += " In your Inventory you now have: " + inventory;
        }

    }
    else{
        text.innerHTML = "You already have the most powerful weapon."
        button2.innerHTML = "Sell weapon for 15 Gold";
        button2.onclick = sellWeapon
    } 
};

function sellWeapon(){
    if(inventory.lenght > 1){
        gold.innerHTML = gold += 15;
        let currentWeapon = inventory.shift();
        text.innerHTML = "You sold a " + currentWeapon + ".";
        text.innerHTML += " In your inventory you have: " + inventory;
    }
    else{
        text.innerHTML = "You cant sell your only weapon, for even a stick is mightier than a fist."
    }
};

function lose(){
    text.innerHTML = "You have been defeated. The Beasts have claimed another tophy to add to their mountain of slain soldiers."
    modal.showModal();
    modalHeader.innerHTML = "You have been defeated by the " + monsters[fighting].name;
    modalRemarks.innerHTML = "The Beasts have claimed another tophy to add to their mountain of slain soldiers. Your name will be shammed for all of eternity and you will forever be known as the man who wasn't 'man enough'.";
    closeModal.innerHTML = "Go Home"
    closeModal.addEventListener('click', function(){
        window.location.reload();
    });
};

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    goldText.innerHTML = gold;
    xp += monsters[fighting].level;
    xptext.innerHTML = xp;
    goHome();
};

function goHome(){
    modal.showModal();
    modalHeader.innerHTML = "You have defeated the " + monsters[fighting].name;
    modalRemarks.innerHTML = "Well done brave knight! You are one step closer to defeating the Dragon!."
    closeModal.innerHTML = 'Go to town Suare';
    closeModal.addEventListener('click', function(){
        goTown();
        modal.close()
    });
};

function endGame(){
    modal.showModal();
    modalHeader.innerHTML = "You have defeated the " + monsters[fighting].name;
    modalRemarks.innerHTML = "Well done brave knight! Your name will live on in infammy as the Dragon Slayer. Go forth and bask in your glory!";
    closeModal.innerHTML = "Go Home"
    closeModal.addEventListener('click', function(){
        window.location.reload();

    });
};

function death(){
    modal.showModal();
    closeModal.addEventListener('click', function(){
        modalHeader.innerHTML = "You have been defeated by the " + monsters[fighting].name;
        modalRemarks.innerHTML = "Your name will be shamed for all of eternity. You will forever be known as the man who wasnt 'man enough'.";
    });
};
    




