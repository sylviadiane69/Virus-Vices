//Creating an empty variable to hold a new shuffled white deck each time the
//game is loaded.  Setting it equal to the white deck in the class below.
//Calling my createPlayerDecks prototype in my index.js and passing it the
//freshly shuffled deck.
var newWhiteDeck;

//Class holding my Black and White Decks
function CardsAgainstHumanity(blackCards, whiteCards) {
    this.blackCards = [
        "How did I lose my virginity?", "Why can't I sleep at night?", "What's that smell?",
        "I got 99 problems but ______________ ain't one.", "Maybe she's born with it.  Maybe it's ______________.",
        "What's the next Happy Meal toy?",
        "Here is the church. \n Here is the steeple. \n Open the doors \n And there is ________________.",
        "It's a pity that kids these days are all getting involved with _______________.",
        "Alternative medicine is now embracing the curative powers of _____________.",
        "What's that sound?",
        "What ended my last relationship?",
        "MTV's new reality show features eight washed-up celebrities living with __________.", "I drink to forget ____________.", "I'm sorry Professor, but I couldn't complete my homework because of _________.", "What is Batman's guilty pleasure?", "What's a girl's best friend?", "TSA guidelines now prohibit __________ on airplanes.", "_____________.  That's how I want to die.", "Instead of coal, Santa now gives the bad children ___________.", "In 1,000 years, when paper money is a distant memory, how will we pay for goods and services?", "A romantic candlelit dinner would be incomplete without ___________.", "_________.  Betcha can't have just one!", "White people like ___________.", "__________.  High five, bro.", "Next from J.K. Rowling:  Harry Potter and the Chamber of _________.", "War!  What is it good for?", "During sex, I like to think about _____________.", "What are my parents hiding from me?", "What will always get you laid?", "In L.A. County Jail, word is you can trade 200 cigarettes for ____________.",
        "What will I bring back in time to convince people that I am a powerful wizard?",
        "Coming to Broadyway this season, ____________: The Musical.",
        "After the earthquake, Sean Penn brought __________ to the people of Haiti.",
        "When Pharaoh remained unmoved, Moses called down a Plague of ________.",
        "What's there a ton of in heaven?", "What would grandma find disturbing, yet oddly charming?",
        "What did the U.S. airdrop to the children of Afghanistan?",
        "What helps Obama unwind?", "_________: \n good to the last drop.",
        "What gets better with age?", "_________: \n kid-tested, mother-approved.",
        "Life for American Indians was forever changed when the white man introduced them to _________.",
        "What never fails to liven up the party?",
        "Fun tip!  When your man asks you to go down on him, try surprising him with ________ instead.",
        "Donald Trump's _______ are so good.  They're the best, folks.", "America is really good at __________."


    ];

    this.whiteCards = [
        "Donald Trump", "Being on fire.", "Racism", "Old-people smell.", "Women in yogurt commercials",
        "Trump's micropenis", "Gonorrhea", "Not giving a shit about the Third World",
        "Court ordered rehab.", "A windmill full of corpses.", "The gays.", "Oversized lollipops.",
        "African children.", "An asymmetric boob job.", "Bingeing and purging.", "An Oedipus complex.",
        "A tiny horse.", "Boogers.", "Penis Envy.", "Barack Obama.", "Scientology.", "Dry heaving.",
        "Skeletor.", "Darth Vader.", "Advice from a wise, old black man.", "Five dollar footlongs.",
        "Elderly Japanese men.", "Free samples.", "Estrogen.", "Sexual tension.", "Famine.",
        "Men.", "Heartwarming orphans.", "Chunks of dead hitchhiker. :(", "A bag of magic beans.",
        "Repression.", "Prancing.", "My relationship status.", "Overcompensation.", "Peeing a little bit.",
        "Pooping back and forth, forever.", "A ball of earwax, semen, and toenail clippings.", "Testicular torsion.",
        "The Devil himself.", "Dick Cheney.", "MechaHitler.", "Being fabulous.", "Pictures of Boobs.",
        "A gentle caress of the inner thigh.", "The Amish.", "The rhythms of Africa.", "Lance Armstrong's missing testicle",
        "Pedophiles.", "The Pope.", "Flying Sex Snakes.", "Sarah Palin.", "Sexy Pillow Fights.", "Invading Poland.",
        "Civilian Casualties.", "The female orgasm.", "Dying of dysentary.", "Magnets.", "Jewish Fraternities.",
        "Surprise sex!", "The Trail of Tears.", "An M. Night Shyamalan plot twist.", "Funky fresh rhymes.",
        "The light of a billion suns.", "Amputees.", "Throwing a virgin into a volcano.", "Italians.", "Explosions.",
        "A good sniff.", "Destroying the evidence.", "Children on leashes.", "Catapults.", "One trillion dollars.",
        "Friends with benefits.", "Dying.", "Silence.", "Growing a pair.", "Justin Bieber.", "The Holy Bible.",
        "Balls.", "Praying the gay away.", "Teenage pregnancy.", "German dungeon porn.", "Powerful thighs.",
        "Crippling debt.", "Kamikaze pilots.", "Teaching a robot to love.", "Police brutality.", "Horse meat.",
        "All you can eat shrimp, for $4.99.", "Michael Jackson.", "A really cool hat.", "Copping a feel.",
        "Crystal meth.", "A disappointing birthday party.", "The Patriarchy.", "My soul.", "A sausage festival.",
        "Eugenics.", "RoboCop.", "Serfdom.", "Stephen Hawking talking dirty.", "A man on the brink of orgasm.",
        "Bio-engineered assault turtles with acid breath.", "Wet dreams.", "Panda sex.", "Necrophilia.",
        "Grave robbing.", "A monkey smoking a cigar.", "Passive aggressive Post-It notes.",
        "A bucket of fish heads.", "The heart of a child.", "Crumbs all over the god damn carpet.",
        "Half-assed foreplay.", "Edible underpants.", "My collection of high-tech sex toys.",
        "A micropig wearing a tiny raincoat and booties.", "Drinking alone.",
        "A middle-aged man on roller skates.", "Spectacular abs.", "Viagra.",
        "An erection that lasts longer than four hours.", "The profoundly hadicapped.",
        "Alter boys.", "50,000 volts straight to the nipples.", "The folly of man.", "72 virgins.",
        "Extremely tight pants.", "Our first chimpanzee president.", "Two midgets shitting into a bucket.",
        "Dropping a chandelier on your enemies and riding the rope up.",
        "Donald Trump's terrible breath.", "A botched vasectomy.", "Your naked roommate.", "Bitches.",
        "The art of seduction.", "Awkward eye contact.", "Crippling debt.", "Fiery poops.", "Same sex ice dancing.",
        "When you fart and a little bit comes out.", "Concealing a boner.", "A robust mongoloid.", "The Rapture.",
        "Harry Potter erotica.", "Winking at old people.", "Being a motherfucking sorcerer.",
        "A homoerotic volleyball montage.", "Assless chaps.", "A sad handjob.", "White privilege.",
        "Ethnic cleansing."
    ];

    newWhiteDeck = this.shuffleDeck();
}


//Shuffling the White Cards
//Shuffle function using Lodash.
CardsAgainstHumanity.prototype.shuffleDeck = function () {
    return _.shuffle(this.whiteCards);
};


//Chooses a Random Black Card
CardsAgainstHumanity.prototype.randomBlack = function () {
    return this.blackCards[Math.floor(Math.random() * newGame.blackCards.length)];
};
