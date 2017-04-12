;(function(CanvasManager, SpriteManager, AudioManager, GameArray) {

    window.CANVAS_WIDTH = MAX_WIDTH = 1200;
    window.CANVAS_HEIGHT = MAX_HEIGHT =  800;

    window.GameComponents = null;
    window.LevelContent = null;

    TYPE_MOUSEDOWN = 'mousedown';
    TYPE_MOUSEUP = 'mouseup';

    CANVAS_PLAY = 'playfield';
    CANVAS_BG = 'background';
    CANVAS_HUD = 'hud';

    /**
     * imports
     */
    var component = game.component;
    var canvasIds = [CANVAS_PLAY, CANVAS_BG, CANVAS_HUD];
    var startScreen;
    var container;
    var lastTime;
    var background;
    var player = null;
    var level = null;
    var hud = null;

    function initialize() {
        AudioManager.disableSound();

        GameComponents = new GameArray();

        LevelContent = {
            enemies : new GameArray(),
            bullets : new GameArray()
        };
        
        container = document.querySelector('#container');

        var loadScreen = new game.screen.LoadScreen(SpriteSheet, AudioBook);
            loadScreen.onCompleted(assetsLoaded);

        setGameWidth(window.innerWidth, window.innerHeight);

        setupCanvas();
    }

    function setGameWidth(width, height) {
        if(!canvasses) {
            var canvasses = document.querySelectorAll('.canvas');
        }

        var sw = (width > MAX_WIDTH) ? MAX_WIDTH : width;
        var sh = (height > MAX_HEIGHT) ? MAX_HEIGHT : height;

        var w = CANVAS_WIDTH = (sw) ? sw : CANVAS_WIDTH;
        var h = CANVAS_HEIGHT = (sh) ? sh: CANVAS_HEIGHT;


        _.each(canvasses, function(element){
            if(element.nodeName === 'CANVAS') {
                element.width = w;
                element.height = h;
            } else {
                element.style.width = w + 'px';
                element.style.height = h+ 'px';
            }
        });

        if(background) {
            background.createBackground();
        }
    }

    function setupCanvas() {
        _.each(canvasIds, function(id){
            CanvasManager.setCanvas(id);
        });

        component.GameObject.setContext(CanvasManager.getContext(CANVAS_PLAY));
        component.background.Background.setContext((CanvasManager.getContext(CANVAS_BG)));
        component.HUD.setContext(CanvasManager.getContext(CANVAS_HUD));

        gameLoop(new Date());
    }

    function assetsLoaded(spriteData, audioData) {
        SpriteManager.data(spriteData);
        AudioManager.data(audioData);


        addEvents();
        showStart();
    }
    function addEvents() {
        game.mouseX = 100;
        game.mouseY = 100;

        //container.addEventListener('mousedown', handleMouseClick);
        //container.addEventListener('mouseup', handleMouseClick);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('touchstart', handleTouch);
         container.addEventListener('touchmove', handleTouch);
        window.addEventListener('resize', handleResize);
    }

    function handleMouseClick(e) {
        var eventType = e.type;

        switch(eventType) {
            case TYPE_MOUSEUP:
                break;
            case TYPE_MOUSEDOWN:
                break
        }
    }

    function handleMouseMove(e) {
        game.mouseX = e.layerX;
        game.mouseY = e.layerY;
    }

    function handleTouch(e) {
        e.preventDefault();
        var touch = e.changedTouches[0];
        
        game.mouseX = (touch.pageX - container.offsetLeft);
        game.mouseY = (touch.pageY - container.offsetTop);
    }

    function handleResize(e) {
        setGameWidth(window.innerWidth, window.innerHeight);
    }

    function showStart() {
        startScreen = new game.screen.StartScreen();
        startScreen.onStart(startGame);

        background = new component.background.Background();
        GameComponents.add(background);
    }

    function startGame() {
        if(player === null) loadComponents();
        level.restart();

        GameComponents.addArray([player, level, hud]);
    }

    function loadComponents() {
        player = new component.player.Ship(100, 100);
        hud = new component.HUD(container);
        level = new component.level.Level1(player, hud);
        
        level.showStartScreen = gameOver;
    }

    function gameOver() {
        GameComponents.remove(player);
        GameComponents.remove(hud);
        GameComponents.remove(level);
        startScreen.show();
    }

    function gameLoop(timestamp) {
        var now = Date.now();
        var gameTime = (now - lastTime) / 1000;

        update(gameTime, timestamp);
        lastTime = now;

        requestAnimationFrame(gameLoop);
    }

    function update(gameTime, timestamp) {
        CanvasManager.clearContext(CANVAS_WIDTH, CANVAS_HEIGHT);

        _.each(GameComponents, function(component) {
            if(component.toDraw !== false) component.draw(gameTime, timestamp);
            if(component.update !== false) component.update();
        });
    }

    initialize();

})(game.library.CanvasManager, game.library.SpriteManager, game.library.AudioManager, game.library.GameArray);