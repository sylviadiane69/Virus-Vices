var newGame = new CardsAgainstHumanity();
var players = new Players();
var clicked = new Audio();
var selectedCard = new Audio();
clicked.src = "https://www.soundjay.com/button/sounds/button-21.mp3";
selectedCard.src = "https://www.soundjay.com/button/sounds/button-30.mp3";

// JQUERY ACTION
$(document).ready(function () {

    //Fade In Our Welcome Elements
    //Hides everything first to enable animations.
    $("body .welcome .welcome-wrapper").hide().fadeIn(1000);
    $("body .welcome .welcome-wrapper #title, #subtitle, #instructions, #start-wrapper").hide();
    $("body .welcome .welcome-wrapper").fadeIn(1000);
    $("body .welcome .welcome-wrapper #title").fadeIn(2100);
    $("#subtitle").delay(2000).fadeIn(2100);
    $("#instructions").delay(4000).fadeIn(2100);
    $("#start-wrapper").delay(4000).fadeIn(2100);


    //When you pick a black card, pick it randomly.  Remove any cards that are present.
    //Reenable the player white cards after the new black card is chosen.
    $(".black-cards").text("Click to Pull a Black Card");
    $(".black-cards").on("click", function () {
        $(".player-black").text(newGame.randomBlack());
        $(".card-czar .player-white, .card-czar .player-white-2").remove();
        $(".player-one .select-button").prop("disabled", false);
        $(".player-two .select-button").prop("disabled", false);
    });

    //Start Button
    //Fades in the Player Div's When Clicked
    $("#start").on("click", function () {
        $(".welcome").fadeOut(1000);
        $(".navbar").fadeIn(1250);
        $(".container").fadeIn(1250);
    });


    //Giving the Players White Cards
    players.createPlayerDecks(newWhiteDeck);



    //WRITING PLAYER CARDS TO DIVS
    //Writing Select Buttons to Divs
    for (var i = 0; i < players.player1.length; i++) {
        // console.log(i);
        var p = $('<p></p>');
        p.html(players.player1[i]);

        var button = $('<button></button>');
        button.addClass("select-button");
        button.html("select");

        var div = $("<div></div>");
        div.addClass("player-white");
        div.append(p);
        div.append(button);

        $(".player-one").append(div);

    }

    for (var j = 0; j < players.player2.length; j++) {
        var p = $('<p></p>');
        p.html(players.player2[j]);

        var button = $("<button></button>");
        button.addClass("select-button");
        button.html("select");

        var div = $("<div></div>");
        div.addClass("player-white-2");
        div.append(p);
        div.append(button);

        $(".player-two").append(div);

    }

    //Make the cards disabled at start.
    $(".player-one .select-button").prop("disabled", true);
    $(".player-two .select-button").prop("disabled", true);


    //SELECT BUTTON
    //Moves selection to the Card-Czar card for decision.
    //Selection by Card-Czar should award one point to corresponding player.
    //We select 'body' first for our onclick event.  Bc we are creating dynamically,
    //the later logic needs to start with the body to see if there's something that
    //needs to be manipulated.  If we start with a class, such as 'card-czar', jquery
    //doesn't see any changes.

    //Write the Player Cards to their Deck
    var switchDivOne;
    var switchDivTwo;

    $("body").on("click", ".player-one .select-button", function () {
        clicked.play();
        switchDivOne = $(this).closest(".player-one > .player-white").addClass("player-one-czar").remove();
        $(".card-czar .card-container").append(switchDivOne);
        $(".player-one .select-button").prop("disabled", true);

        //Check player 1 card length after each card selection.
        players.checkCardLengthOne();

    });

    $("body").on("click", ".player-two .select-button", function () {
        clicked.play();
        switchDivTwo = $(this).closest(".player-two > .player-white-2").addClass("player-two-czar").remove();
        $(".card-czar .card-container").append(switchDivTwo);
        $(".player-two .select-button").prop("disabled", true);

        //Check player 2 card length after each card selection.
        players.checkCardLengthTwo();
    });

    //When the Card Czar Chooses a winning card, selection awards point to corresponding player.
    $("body").on("click", ".card-czar .player-one-czar .select-button", function () {
        selectedCard.play();
        players.awardPointOne();
        //Disabling the button after clicked to avoid accidental overscoring.
        $(".player-one-czar .select-button").prop("disabled", true);
        $(".player-two-czar .select-button").prop("disabled", true);
        $(".awesome-score-one").text(players.playerOneScore);
        // console.log(Number($(".awesome-score-one").html()));

        players.whoWon();

    });

    $("body").on("click", ".card-czar .player-two-czar .select-button", function () {
        selectedCard.play();
        players.awardPointTwo();
        //Disabling the button after clicked to avoid accidental overscoring.
        $(".player-two-czar .select-button").prop("disabled", true);
        $(".player-one-czar .select-button").prop("disabled", true);
        $(".awesome-score-two").text(players.playerTwoScore);
        // console.log($(".awesome-score-two").html());

        players.whoWon();
    });


    // GAMBLE! Player One
    $("body").on("click", "#gamble-one", function () {
        $(".player-one .select-button").prop("disabled", false);

        // Checks if Card Czar Chooses Player One After Gamble
        $("body .card-czar .player-one-czar .select-button").click(function () {
            selectedCard.play();
            players.awardPointOne();
        });

        // Checks if Card Czar Chooses Player Two After Gamble
        //If so, award point to player two, and remove point from player one.
        //Update player two score.
        $("body .card-czar .player-two-czar .select-button").click(function () {
            selectedCard.play();
            players.awardPointTwo();
            players.removePointOne();

            $(".awesome-score-one").empty();
            $(".awesome-score-one").text(players.playerOneScore);
            console.log(Number($(".awesome-score-one").html()));
        });
    });


    // GAMBLE! Player Two
    $("body").on("click", "#gamble-two", function () {
        $(".player-two .select-button").prop("disabled", false);

        // Checks if Card Czar Chooses Player Two After Gamble
        //If so, award point.
        $("body .card-czar .player-two-czar .select-button").click(function () {
            selectedCard.play();
            players.awardPointTwo();
        });

        // Checks if Card Czar Chooses Player One After Gamble
        //If so, award point to player one, and remove point from player two.
        //Update player two score.
        $("body .card-czar .player-one-czar .select-button").click(function () {
            selectedCard.play();
            players.awardPointOne();
            players.removePointTwo();

            $(".awesome-score-two").empty();
            $(".awesome-score-two").text(players.playerTwoScore);
            console.log(Number($(".awesome-score-two").html()));
        });
    });


    $("body").on("click", "#gamble-two", function () {
        $(".player-two .select-button").prop("disabled", false);
    });







    //NEW GAME BUTTON
    //We shuffle the deck of white cards, create the new player decks, and drop
    $("body").on("click", "#new-game", function () {
        $(".card-czar").children().show();
        clicked.play();
        $(".win-img").remove();
        var newDecks;
        newDecks = newGame.shuffleDeck();
        console.log(newDecks);
        players.createPlayerDecks(newDecks);
        $("body .player-one, body .player-two").empty();
        $(".awesome-score-one, .awesome-score-two").empty();
        players.playerOneScore = 0;
        players.playerTwoScore = 0;
        $(".player-black").empty();
        $(".black-cards").text("Click to Pull a Black Card");
        $(".card-container").empty();


        for (var i = 0; i < players.player1.length; i++) {
            var p = $('<p></p>');
            p.html(players.player1[i]);

            var button = $('<button></button>');
            button.addClass("select-button");
            button.html("select");

            var div = $("<div></div>");
            div.addClass("player-white");
            div.append(p);
            div.append(button);

            $(".player-one").append(div);

        }

        for (var j = 0; j < players.player2.length; j++) {
            var p = $('<p></p>');
            p.html(players.player2[j]);

            var button = $("<button></button>");
            button.addClass("select-button");
            button.html("select");

            var div = $("<div></div>");
            div.addClass("player-white-2");
            div.append(p);
            div.append(button);

            $(".player-two").append(div);
        }
    });














});
