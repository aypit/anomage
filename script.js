document.addEventListener('DOMContentLoaded', function() {
    var pollSections = document.querySelectorAll('.poll-section');
    var optionButtons = document.querySelectorAll('.option-button');
    var resultModal = document.getElementById('result-modal');
    var closeModalButton = document.querySelector('.close-button');
    var resultImage = document.getElementById('result-image');
    var resultTitle = document.getElementById('result-title');
    var finalResultText = document.getElementById('final-result-text');
    var solveAgainButton = document.getElementById('solve-again-button');
    var shareOnXButton = document.getElementById('share-on-x-button');
    var downloadButton = document.getElementById('download-button');
    var resultHandle = document.getElementById('result-handle');
    var personalityTraitsSection = document.getElementById('personality-traits');
    var traitsList = document.getElementById('traits-list');


    var welcomeScreen = document.getElementById('welcome-screen');
    var startQuizButton = document.getElementById('start-quiz-button');
    var quizContainer = document.querySelector('.container');
    
    var answeredQuestionsCount = 0;
    var userSelections = {};
    var lastResultType = '';


    var downloadUrl = 'https://www.anomage.w3w.agency/images/xpostimage.png';

    var profileData = {
        'Adrian Brink': {
            image: 'adrianbrink.jpg',
            handle: '@adrianbrink',
            title: "Pragmatic Idealist: You Are the Bridge Between What Is and What Could Be",
            traits: ['Visionary and Forward-Thinking', 'Confident and Opinionated', 'Passionate and Enthusiastic', 'Analytical and Reflective', 'Community-Oriented and Inclusive', 'Provocative and Bold']
        },
        'Chris Holt': {
            image: 'Chri5H0lt.jpg',
            handle: '@Chri5H0lt',
            title: "The Architect of Joyful Disruption",
            traits: ['Creative and Playful', 'Visionary and Innovative', 'Community-Oriented and Engaging', 'Passionate and Enthusiastic', 'Witty and Cryptic', 'Collaborative and Team-Focused']
        },
        'awa': {
            image: 'awasunyin.jpg',
            handle: '@awasunyin',
            title: "The Builder With a Compass and a Spark",
            traits: ['Passionate and Mission-Driven', 'Engaging and Community-Focused', 'Playful and Creative', 'Visionary and Strategic', 'Confident and Influential', 'Privacy-Advocating and Principled']
        },
        'Maurice': {
            image: 'MauriceWbr.png',
            handle: '@MauriceWbr',
            title: "The Art of Taking Things Seriously, Without Being So Serious",
            traits: ['Creative and Humorous', 'Passionate and Engaged', 'Curious and Open-Minded', 'Relaxed and Relatable']
        },
        'chimpfone': {
            image: 'chimpfone2047.jpg',
            handle: '@chimpfone2047',
            title: "The Chaos-Coded Genius",
            traits: ['Humorous and Sarcastic', 'Enthusiastic and Energetic', 'Creative and Playful', 'Tech-Savvy and Trend-Aware', 'Confident and Bold']
        },
        'MRG': {
            image: 'thespacecatjr.jpg',
            handle: '@thespacecatjr',
            title: "The Firestarter of What's Next",
            traits: ['Enthusiastic and Passionate', 'Innovative and Forward-Thinking', 'Curious and Trend-Savvy', 'Confident and Knowledgeable']
        },
        'ASJ': {
            image: 'thekerukeion.jpg',
            handle: '@thekerukeion',
            title: "The Heartbeat of a New Culture",
            traits: ['Playful and Charismatic', 'Community-Oriented and Inclusive', 'Culturally Engaged and Eclectic', 'Passionated and Enthusiastic', 'Principled and Idealistic']
        },
        'Fren': {
            image: '0xFrenxbtdotxrp.jpg',
            handle: '@0xFrenxbtdotxrp',
            title: "The Vibe You Can Count On",
            traits: ['Confident and Optimistic', 'Relaxed and Easygoing', 'Passionate and Loyal', 'Playful and Humorous']
        },
        'monty': {
            image: 'hellomonty_.jpg',
            handle: '@hellomonty_',
            title: "The Meme Lord of Web3 (With a Brain)",
            traits: ['Witty and Sarcastic', 'Playful and Lighthearted', 'Bold and Opinionated', 'Crypto-Savvy and Engaged']
        }
    };

    const resultMessages = {
        'Adrian Brink': {
            title: "Pragmatic Idealist: You Are the Bridge Between What Is and What Could Be",
            text: "You move through the world with eyes wide open, not just to what’s in front of you, but to the patterns underneath, the systems behind, the futures ahead. You’re a visionary, but not the kind that floats above the clouds. You’re grounded. You build. You execute. You know that dreams without action are just noise. Your confidence is hard-won, shaped by experience and sharpened by perspective. You don’t speak just to be heard, you speak because ideas matter, and yours are rooted in reflection and rigor. You welcome challenge, not as confrontation, but as collaboration. You’re not afraid to take a stand even when it’s uncomfortable, because the world doesn’t shift by playing it safe. Passion fuels you. Enthusiasm drives you. But you are no blind optimist. You reflect. You analyze. You revise. You know that clarity comes not from always being right, but from always being honest. About what works. About what doesn’t. About what needs to change. You believe in people, deeply. Not in some abstract, idealized way, but in a real, roll-up-your-sleeves-and-build-with-them way. You make space. You invite voices. You create belonging. Because community isn’t just a value, it’s your strategy. And yes, you are provocative. Bold. You don’t just think outside the box, you question why the box exists in the first place. But even in your rebellion, there is purpose. Even in your risk, there is care. You push not for the sake of pushing, but because you know better is possible and you’re ready to prove it. You are the rare kind of person who dreams with fire and builds with precision. You are a pragmatic idealist. And the future is shaped by people like you."
        },
        'Chris Holt': {
            title: "The Architect of Joyful Disruption",
            text: "You’re not here to play by the rules, you’re here to reinvent the game. To redesign the board. To hand out new pieces and invite everyone to play together. You blend creativity with curiosity like it’s second nature. Your ideas sparkle, not because they’re loud, but because they’re alive. People gravitate toward your energy, your wit, your way of making the complex feel like a riddle waiting to be unlocked. You’re visionary, but never isolated. You see the future, but you don’t hoard it, you share it, sketch it out, remix it with others. Collaboration isn’t just a method for you; it’s the medium. You believe that great things happen together, in circles, not pyramids. Community is your canvas. You don’t just build things for people, you build with them. You listen, you engage, you co-create. You’re the spark that gets others to contribute, the one who turns group chats into brainstorming bonfires. Your passion? Contagious. Your playfulness? Strategic. Your cryptic one-liners? Legendary. You leave trails of curiosity wherever you go, not because you're mysterious, but because you know the best ideas are invitations, not declarations. You are the joyful disruptor. The inside joke in a blueprint. The bright thread that weaves a team into something more than the sum of its parts. And in a world that often forgets how to wonder, you remind us."
        },
        'awa': {
            title: "The Builder With a Compass and a Spark",
            text: "You’re not just here to participate, you’re here to shift the paradigm. You carry a mission like a compass: steady, unwavering, quietly pulsing beneath everything you do. And yet, you're anything but rigid. You bring play, creativity, and warmth into even the most serious pursuits. People listen when you speak, not because you're loud, but because you mean it. You carry conviction without ego, influence without dominance. Your confidence is rooted in clarity, a deep understanding of your values and the world you're working to reshape. You see systems, not just symptoms. Strategies, not just slogans. You zoom out to design the blueprint, and zoom in to make it human. Every decision you make has two lenses: one fixed on the future, and one tuned to the people beside you. Community isn’t a checkbox, it’s your fuel. You engage, you co-create, you uplift. You know that real change doesn’t happen alone. It happens through trust, play, and shared direction. And at the core of it all? Principle. You don’t trade privacy for convenience. You don’t build things that erode the dignity of others. You stand for transparency, agency, and respect, not just in your work, but in your worldview. You are the rare kind of leader who can laugh while building a revolution. A strategist with a spark. A protector of privacy, a gatherer of people, a believer in a better way. You don’t just build systems. You build momentum."
        },
        'Maurice': {
            title: "The Art of Taking Things Seriously, Without Being So Serious",
            text: "You’ve mastered a rare kind of magic: caring deeply without getting uptight, showing up fully without taking over the room, being funny without ever losing sincerity. You’re creative, but not precious. Curious, but not preachy. You have ideas, questions, and punchlines, all in equal measure. People connect with you because you’re real. You speak the way people think, laugh when things get weird, and ask questions others didn’t know they needed answers to. You keep things light, but never shallow. Your passion doesn’t scream, it shines. You’re engaged because you want to be, because something sparked your interest and you followed the thread. You don’t pretend to know it all and that’s exactly why people listen. Where others push to persuade, you invite to explore. You’d rather open a door than close a debate. For you, being open-minded isn’t about being neutral, it’s about staying flexible, playful, and always just a little bit amazed. You remind us that being thoughtful doesn't mean being stiff. That we can be serious about impact while still laughing at ourselves. That passion can sound like a deep belly laugh, not just a keynote speech. You make the world feel a little more human. A little more curious. A lot more fun. And we’re better for it."
        },
        'chimpfone': {
            title: "The Chaos-Coded Genius",
            text: "You walk into a room (or a group chat), and suddenly everything’s just... more alive. More chaotic. More fun. You don’t just have ideas, you launch them with a wink, a meme, and a hot take that no one saw coming (but everyone secretly agrees with). You're the person who knows what’s trending before it trends and if it’s not worth your time, you’ll roast it anyway. You navigate tech like it’s second nature and mock it like a seasoned comic. Your sarcasm? A finely tuned tool. Your humor? Equal parts dagger and delight. You don’t apologize for being bold. You don’t ask for permission to be weird. You just are. You take risks, break patterns, and somehow make it look easy, like building the future while juggling three jokes and a new app beta. Creativity oozes out of you, but not in a tortured-artist kind of way, more like a 'what if we did this, but ironically?' kind of way. You don’t wait for inspiration; you summon it, then toss it a Red Bull and tell it to keep up. You’re the digital-age jester, sharp, fast, hilarious but underneath the snark is real confidence and a clever instinct for what matters next. You don’t just ride the wave. You are the glitch in the system. And honestly? We needed it."
        },
        'MRG': {
            title: "The Firestarter of What’s Next",
            text: "You bring energy into every room, not the kind that demands attention, but the kind that magnetizes it. Your enthusiasm is contagious. People don’t just listen to you, they lean in, because they feel that you care, and they trust that you know what you're talking about. You’re not content to follow the path, you’re too busy building the next one. Innovation isn’t just something you admire; it’s something you do. You live slightly ahead of the present, catching signals others haven’t tuned into yet. Trends don’t surprise you, you see them coming. You connect dots before the rest of the world realizes they are dots. That’s your secret power: curiosity sharpened by insight, fueled by instinct. You’re not just aware of what’s happening now, you’re asking, “What’s the next layer?” Confidence is your engine, but it’s never empty noise. It’s grounded. Earned. Built on experience, pattern recognition, and a hunger to always keep learning. You know your stuff, and you’re generous with it. You’re the kind of person who not only talks about the future, you make it feel real, possible, and exciting. And for those lucky enough to be around you? They start to believe they can shape it too."
        },
        'ASJ': {
            title: "The Heartbeat of a New Culture",
            text: "You don’t just walk into a space, you light it up. With charm, with play, with that effortless charisma that puts people at ease and pulls them into something bigger than themselves. You’re the kind of person who makes belonging feel like a warm invitation, not a box to fit into. Your energy is joyful, but never shallow. Beneath the laughter, there are values, deep ones. You care fiercely. About people. About culture. About creating spaces where everyone gets to bring their whole, messy, brilliant selves. You move through worlds with eclectic ease, mixing styles, voices, traditions, and ideas into something fresh and vibrant. You know that richness comes from remixing, from listening, from celebrating difference without erasing roots. Your passion isn’t performative, it’s magnetic. You show up. You speak up. You create not just to entertain, but to elevate. And you make it fun. You remind us that change doesn’t have to be cold or clinical, it can be soulful, social, and full of rhythm. You dream with open eyes. You act with open arms. And you stand for something, even when it’s inconvenient. You are culture’s connective tissue, the laughter in the movement, the voice in the crowd that says, “We’re building something beautiful, want in?”"
        },
        'Fren': {
            title: "The Vibe You Can Count On",
            text: "You’re the calm in the storm and the spark at the party, somehow, effortlessly, both. People trust you not just because you’re confident, but because your confidence is real. It’s the kind that doesn’t need to shout. It’s in how you show up, how you listen, how you laugh. You move through life with optimism that isn’t naive, it’s chosen. You believe things can get better, and you’ve got the loyalty to stick around and make them better. For your friends, your crew, your cause, you’re ride or die. And they know it. But don’t mistake your chill for indifference. You care deeply. You’re passionate about what matters to you and when you light up, others do too. Whether it's a side project, a weekend plan, or a late-night debate about life, you're all in. Your humor is your superpower, not just for laughs (though you deliver plenty), but for connection. You disarm with ease. You make people feel like they belong. You know when to poke fun and when to hold space and you never take yourself too seriously. You’re the person people want in the room: grounded, loyal, lighthearted, and full of heart. And in a world that often moves too fast, you remind us to breathe, smile, and stay true."
        },
        'monty': {
            title: "The Meme Lord of Web3 (With a Brain)",
            text: "You don’t mince words, you dice them, season them with sarcasm, and serve them with a side of “I told you so.” You’re bold, you’re loud (in a good way), and your takes cut through the noise like a well-placed GIF in a DAO thread. You live at the intersection of crypto chaos and comedic relief. Rug pulls? You called it. New L2 drama? You’ve got a thread and a meme ready. But underneath the jokes is real signal, because you don’t just watch the space, you get it. Your playfulness is strategic. You know that a joke lands better than a lecture, and that humor is the ultimate onboarding tool. People follow you for laughs, but stay for the insights, even if they have to read between the punchlines. You’re opinionated, and unapologetically so. You’ve got the receipts, the repos, and the sarcastic tweets to back it up. But you’re not here to gatekeep, you’re here to stir the pot and set the table. Decentralized, of course. In a space full of buzzwords and bravado, you’re the reminder that Web3 doesn’t have to be boring, and shouldn't take itself too seriously. You are the troll with purpose, the alpha wrapped in a meme, the voice that makes crypto fun and a little bit smarter."
        }
    };

    // Hide quiz container initially
    quizContainer.style.display = 'none';

    // Start button event listener
    startQuizButton.addEventListener('click', function() {
        welcomeScreen.style.display = 'none';
        quizContainer.style.display = 'block';
    });

    // Option buttons event listeners
    optionButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var currentOptionsContainer = button.closest('.options-container');
            var pollId = currentOptionsContainer.dataset.pollId;

            if (!userSelections[pollId]) {
                answeredQuestionsCount++;
            }
            userSelections[pollId] = button.dataset.optionId;

            var previouslySelectedButton = currentOptionsContainer.querySelector('.option-button.selected');
            if (previouslySelectedButton) {
                previouslySelectedButton.classList.remove('selected');
            }

            button.classList.add('selected');

            var currentPollIndex = Array.from(pollSections).findIndex(function(el) {
                return el.id === 'poll-' + pollId;
            });
            
            if (currentPollIndex < pollSections.length - 1) {
                var nextPollSection = pollSections[currentPollIndex + 1];
                nextPollSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            if (answeredQuestionsCount === 10) {
                setTimeout(showFinalResult, 1000);
            }
        });
    });

   function showFinalResult() {
    document.body.classList.add('quiz-completed');

    var profileNames = Object.keys(profileData);
    var randomValue = Math.random();

    if (randomValue <= 0.25) {
        lastResultType = 'ASJ';
    } else {
        var otherProfiles = profileNames.filter(function(name) {
            return name !== 'ASJ';
        });
        var randomProfileIndex = Math.floor(Math.random() * otherProfiles.length);
        lastResultType = otherProfiles[randomProfileIndex];
    }
    
    var result = resultMessages[lastResultType];
    var profile = profileData[lastResultType];
    
    resultImage.src = 'images/' + profile.image;
    resultHandle.textContent = profile.handle;
    resultTitle.textContent = result.title;
    finalResultText.innerHTML = result.text;
    
    personalityTraitsSection.querySelector('h3').textContent = 'Same Personality Traits as ' + lastResultType;
    traitsList.innerHTML = '';
    
    profile.traits.forEach(function(trait) {
        var li = document.createElement('li');
        li.textContent = trait;
        traitsList.appendChild(li);
    });

    resultModal.style.display = 'block';
}

    function resetAndClose() {
        location.reload();
    }

  

    solveAgainButton.addEventListener('click', function() {
        resetAndClose();
    });

    shareOnXButton.addEventListener('click', function() {
        if (lastResultType) {
            var resultTitleText = resultMessages[lastResultType].title; 
            var resultHandle = profileData[lastResultType].handle;
            var quizLink = window.location.href;
            
            var tweetText = 'Just completed the Anomages Quiz by @watzenweb3 and found out that ' + resultTitleText + ' ' + resultHandle + ' is the person I resemble the most. Want to find out too? > ' + quizLink;
            
            var encodedText = encodeURIComponent(tweetText);
            var twitterUrl = 'https://twitter.com/intent/tweet?text=' + encodedText;
            
            window.open(twitterUrl, '_blank');
        } else {
            console.error("Result type is not defined. Please complete the quiz first.");
        }
    });

    
    downloadButton.addEventListener('click', function() {
        var link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'anomage-quiz-result';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    closeModalButton.addEventListener('click', function() {
        resetAndClose();
    });

    window.addEventListener('click', function(event) {
        if (event.target === resultModal) {
            resetAndClose();
        }
    });
});