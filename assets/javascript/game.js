
var gameModes = ['selectPlayer', 'selectOpponent', 'play', 'clean-up'];
var currentMode = gameModes[0];

var currentFighter = {
    id: "",
    hp: 100,
    hpFieldId: "",
    shortName: "",
    attackPower: 5
};
var currentOpponent = {
    id: "",
    hp: 100,
    hpFieldId: "",
    shortName: "",
    counterAttackPower: 5
};


$(document).ready(function () {


    $("div[id^='fighter']").hide();
    $("div[id^='opponent']").hide();

    // attach click event to the attack button
    $('#attackButton').click(function () {
        attackOpponent();
    });
    $('#attackButton')
        .prop('disabled', true);

    // attach click event to the character div's

    $("div[id^='character']").each(function () {

        $(this).click(function () {

            if (currentMode === gameModes[0]) {

                var fidArray = this.id.split('-');
                var partOne = fidArray[1];
                var partTwo = fidArray[2];
                var fid = partOne + '-' + partTwo;
                var hpField = `fighter-${partOne}-hp`;
                var shortName = `${partOne}`;

                $(this).hide();
                $('#fighter-' + fid).show();
                currentFighter.id = "fighter-" + fid;
                currentFighter.shortName = partOne;
                currentFighter.hpFieldId = hpField;
                currentFighter.hp = 100;
                currentMode = gameModes[1];

                $(`#fighter-${partOne}-hp`).html(currentFighter.hp)



                console.log(currentFighter);


            } else if (currentMode === gameModes[1]) {

                var fidArray = this.id.split('-');
                var partOne = fidArray[1];
                var partTwo = fidArray[2];
                var fid = partOne + '-' + partTwo;
                var hpField = `opponent-${partOne}-hp`;
                console.log(hpField);

                $(this).hide();
                $('#opponent-' + fid).show();
                currentOpponent.id = "opponent-" + fid;
                currentOpponent.shortName = partOne;
                currentOpponent.hpFieldId = hpField;
                currentMode = gameModes[2];
                currentOpponent.hp = 100;
                $(`#opponent-${partOne}-hp`).html(currentOpponent.hp);



                console.log(currentOpponent);
                console.log(currentMode);


                playGame();
                return hpField;
            }

        });
    });



});


function playGame() {
    $('#attackButton').prop('disabled', false);
}

function attackOpponent() {

    if (currentFighter.hp > 1 && currentOpponent.hp > 1) {
        console.log('attacking...');
        
        var randFightAttack = (currentFighter.attackPower + Math.floor(Math.random() * 20));
        var randOpponentAttack = currentOpponent.counterAttackPower + (Math.floor(Math.random() * 20));
        
        // attack opponent and subtract from currentOpponent.hp

        currentFighter.hp = currentFighter.hp - randOpponentAttack;
        $(`#${currentFighter.hpFieldId}`).html(currentFighter.hp);
        console.log(`${currentOpponent.shortName} hit you for: ${randOpponentAttack}`);
        console.log(`Fighter health: ${currentFighter.hp}`);

        // counter-attack fighter and subtract from currentFighter.hp


        currentOpponent.hp = currentOpponent.hp - randFightAttack;
        $(`#${currentOpponent.hpFieldId}`).html(currentOpponent.hp);

        console.log(`Attack Power Multiplier ${currentFighter.attackPower}`)
        console.log(`You hit you ${currentOpponent.shortName}: ${randFightAttack}`);
        console.log(`Opponent Health: ${currentOpponent.hp}`);

        currentFighter.attackPower += 5;

    }

    else {

        console.log('here in co.hp');
        // the currentOpponent has fallen, player must select another

        // currentOpponent should disappear

        // game mode is back at selectOpponent
        $('#attackButton').prop('disabled', true);
        $(`#${currentOpponent.id}`).hide();
        currentMode = gameModes[1];
      

    }

    if (currentFighter.hp <= 0) {
        console.log('here in cf.hp');
        location.reload();
        // end the game.

    }


}

function resetGame() {
    $("div[id^='character']").show();
    $("div[id^='fighter']").hide();
    $("div[id^='opponent']").hide();
    currentMode = gameModes[0];
}
