$(document).ready(function(){
	var map = {0: "blue", 1: "green", 2: "red", 3: "yellow"};
	var mapRev = {"blue": 0, "green": 1, "red": 2, "yellow": 3};
	var sequence = [];
	var userInp = [];
	var id; //id of button clicked
	var count = 1;
	var startState = 0;
	var strictState = 0;
	var index = 0;

	//Play sound
	function playClip(val){
		var clip;

		if(val === "blue")
		{
			clip = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
			clip.play();
		}
		else if(val === "green")
		{
			clip = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
			clip.play();
		}
		else if(val === "red")
		{
			clip = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
			clip.play();
		}
		else if(val === "yellow")
		{
			clip = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
			clip.play();
		}
	}
	//Reset game
	function reset(){
		sequence = [];
		count = 1;
		startState = 0;
		index = 0;
		$("#startButt").removeClass("turnRed");
		$("#countForm").val("");
	}
	//flash function
	function flash(val){
		if(startState == 1)
		{
			playClip(val);
			$("#" + val).addClass("turnRed");
			$("#" + val).addClass("animated pulse");
			setTimeout(function(){
				$("#" + val).removeClass("turnRed animated pulse")
			;}, 450);
		}
	}
	//Flash entire sequence array
	function flashAll(){
		sequence.forEach(function(val, i, sequence){
			setTimeout(function(){
				flash(map[val]);
			}, 2000 * i);
		});
	}
	//Find next in sequence
	function next(){
		var rand = Math.floor(Math.random() * 4);

		sequence.push(rand);
		setTimeout(function(){
			flashAll();
		}, 2000);
	}
	//Check winning condition
	function winCheck(val){
		if(sequence[index] !== userInp[index] && strictState == 1)
		{
			reset();
			alert("INCORRECT! GAME OVER!");
			return;
		}
		else if(sequence[index] !== userInp[index] && strictState === 0)
		{
			index = 0;
			userInp = [];
			alert("INCORRECT! TRY AGAIN!");
			setTimeout(function(){
				flashAll();
			}, 2000);
			return;
		}
		//if sequence is correct
		if(index == sequence.length-1)
		{
			//Check if game is won
			if(sequence.length == 20)
			{
				alert("YOU WIN!!");
				reset();
				return;
			}
			index = 0;
			userInp = [];
			++count;
			$("#countForm").val(count);
			next();
		}
		else
		{
			++index;
		}
	}
	//Buzzer button function
	function buzzer(){
		if(startState == 1)
		{
			id = this.id;
			userInp.push(mapRev[id]);
			//flash buzzer and conduct a winCheck
			flash(id);
			winCheck(id);
		}
	}
	//start button function
	function start(){
		if(startState === 0)
		{
			reset();
			$("#startButt").addClass("turnRed");
			startState = 1;
			$("#countForm").val(count);
			next();
		}
		else if(startState == 1)
		{
			reset();
			$("#startButt").removeClass("turnRed");
			startState = 0;
			$("#countForm").val("");
		}
	}
	//strict button function
	function strict(){
		if(strictState === 0)
		{
			$("#strictButt").addClass("turnRed");
			strictState = 1;
		}
		else if(strictState == 1)
		{
			$("#strictButt").removeClass("turnRed");
			strictState = 0;
		}
	}
	//Buzzer buttons clicked
	$("#blue").on("click", buzzer);
	$("#green").on("click", buzzer);
	$("#red").on("click", buzzer);
	$("#yellow").on("click", buzzer);
	//Start button clicked
	$("#startButt").on("click", start);
	//Strict button clicked
	$("#strictButt").on("click", strict);
});
