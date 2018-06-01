var dancing_text;
var rate = 10;

function popText(text, duration) {
    this.growing = 2; //edit
    this.font = "Impact";
    this.color = "purple";
    this.color_outline = "green";

    this.text = text;
    this.duration = duration;
    this.split_text = text.split(" ");
    this.time = 0;

    this.x = 300;
    this.y = 300;


    this.rotation = 0;

    this.rotation_old = 0;
    this.magnify_old = 30;
    this.text_old = "";

    this.word_index = 0;
    this.magnify = 1;

    this.rotate_speed = 0;

    this.update = function() {
        var date = new Date();
        var t = date.getSeconds() + date.getMilliseconds() / 1000;

        if ((this.time + this.duration) % 59.9 < t ) {
            this.text_old = this.split_text[this.word_index];
            this.magnify_old = this.magnify;
            this.rotation_old = this.rotation;
            this.fade_old = 1;
            this.rotation = Math.random()*0.1 - 0.05;
            this.rotate_speed = Math.random()*0.05 -0.025;

            this.word_index = (this.word_index + 1) % (this.split_text.length);
            this.time = t;
            this.magnify = 1;
        }
        this.rotation += this.rotate_speed;
        this.magnify += this.growing;
        this.fade_old = this.fade_old * 0.95;

    }

    this.draw = function() {

        var canvas = document.getElementById("rotateText");
        var ctx = canvas.getContext("2d");	

        this.x = canvas.width*0.5;
        this.y = canvas.height*0.5;

        ctx.fillStyle = this.color; 
        ctx.strokeStyle = this.color_outline; 

        ctx.font = this.magnify + "px " + this.font;
        var textWidth = ctx.measureText(this.split_text[this.word_index]).width;
        ctx.translate((this.x), (this.y)); //moves the canvas
        ctx.rotate(this.rotation); //rotate canvas
        ctx.lineWidth = 20;
        ctx.fillText(this.split_text[this.word_index], -textWidth/2, +this.magnify/2);
        ctx.lineWidth = 1;
        ctx.strokeText(this.split_text[this.word_index], -textWidth/2, +this.magnify/2);
        ctx.rotate(-this.rotation); //rotate canvas
        ctx.translate(-(this.x), -(this.y)); //moves the canvas



        ctx.font = this.magnify_old + "px " + this.font;
        textWidth = ctx.measureText(this.text_old).width;
        ctx.translate((this.x), (this.y)); //moves the canvas
        ctx.rotate(this.rotation_old); //rotate canvas
        ctx.globalAlpha = this.fade_old;
        ctx.lineWidth = 20;
        ctx.fillText(this.text_old, -textWidth/2, +this.magnify_old/2);
        ctx.lineWidth = 1;
        ctx.strokeText(this.text_old, -textWidth/2, +this.magnify_old/2);


        ctx.globalAlpha = 1;
        ctx.rotate(-this.rotation_old); //rotate canvas
        ctx.translate(-(this.x), -(this.y)); //moves the canvas		
    }
}

function initObjects() {
    dancing_text = new popText(" Chef Reek Ryant was raised in Philadelphia and can remember his passion developing for the culinary arts as early as 7 years old. His time at SCI Somerset is where he earned his first apprenticeship and was certified by the state of Pennsylvania as a journeyman “cook”. He later attended Community College of Philadelphia, Temple University Fox School of Business and finally the Restaurant School at Walnut Hill College earning degrees at all three universities. While still attending The Restaurant School, he interned with Jeffery Miller Catering and eventually stayed on as a party chef specializing in wedding receptions and private events. He also opened up Frankies on Fairview in Delaware County during that time. A 2016, Spirit of the Industry Award winner Reek Ryant was acknowledged for his passion, leadership and detail with every plate by The Restaurant School. In addition to the Spirit of the Industry award Reek Ryant is locally involved with the South and Southwest Philadelphia Community and is a member of the Neighborhood Advisory Subcommittee for the South West CDC.</p>Now the Chef is taking his talents to Rhythm and Brunch, come check him out, he’s there right now “cheffing” the impossible!", 1);   
}

/***************************************
 * setUpPage
 * sets the canvas to full width and height
 * author: wiessmann
 ***************************************/
function setUpPage() {
    var canvas = document.getElementById("rotateText");
    canvas.width = window.innerWidth/2; 
    canvas.height = window.innerWidth/2 + 300; 
}

/***************************************
 * resizeWindow: called when the window is resized
 *
 * author: wiessmann
 ***************************************/
function resizeWindow() {
    setUpPage();
}
/***************************************
 * listen: sets a bunch of event listeners
 *
 * author: wiessmann
 ***************************************/
function listen() {
    window.addEventListener("resize", resizeWindow, false);	
}
/***************************************
 * update: called at a set interval
 *
 * author: wiessmann
 ***************************************/
function update() {	
    clearCanvas();
    dancing_text.update();
    dancing_text.draw();

}
/***************************************
 * clearCanvas: erases everthing on the canvas
 *
 * author: wiessmann
 ***************************************/
function clearCanvas() {
    var ctx = document.getElementById('rotateText').getContext("2d");
    var canvas = document.getElementById("rotateText");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


/***************************************
 * main: called when canvas loads
 *
 * author: wiessmann
 ***************************************/
function dancing_text_main() {
    listen();
    setUpPage();
    initObjects();
    setInterval(update, rate);

    //drawFilledCircle(100, 100, 75);
    //drawCircle(100, 100, 75);
}