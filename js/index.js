$(function(){
//		
		var audio=$("#audio").get(0);
		var play=$("#play");
		var pause=$("#pause");
		var now=$("#current-time");
		var all=$("#duration");
		var jd=$("#progress");
		var jy=$("#p-i");
		var vol=$("#volume");
		var vy=$("#v-i");
		var mute=$("#mute");
		
		
		var index=0;
		var music=[
		{name:" Vincent",
		src:"Don Mclean - Vincent - 1992重制版.mp3",
		zz:"Don Mclean"},
		{name:" All of Me",
		src:"John Legend - All of Me - 重制版.mp3",
		zz:"John Legend"},
		{name:" New Soul",
		src:"Yael Naim - New Soul.mp3",
		zz:"Yael Naim"}
		];
		function render(){
			$("#ul").empty();
			$.each(music,function(i,v){
				var c=(i===index)?"active":"";
				$('<li class="'+c+'"><span>'+music[i].name+'</span><span>'+music[i].zz+'</span></li>').appendTo("#ul");
			})
		}
		$("#ul").on("click","li",function(){
			$("#ul").find("li").removeClass("active");
			$(this).addClass("active");
			index=$(this).index();
			audio.src=music[index].src;
			audio.play();
		})
		render();
		
	
	$('.music-list').on('touchend','div',function(){
		var Index = $(this).index();
		current = Index;
		index = Index;
		audio.src = database[current].src;
		render();
	})
	
	//下一首
	function next() {
		var indexs=index+1;
		if(indexs>=music.length){
			indexs=0;
		}
		audio.src=music[indexs].src;
		index=indexs;
		current += 1;
		if(current === database.length){
			current = 0;
		}
		audio.src = database[current].src;
		render();
	}
	
	
	//上一首
	function prev() {
		var indexs=index-1;
		if(indexs>=music.length){
			indexs=0;
		}
		audio.src=music[indexs].src;
		index=indexs;
		current -=1;
		if(current === -1){
			current = database.length-1;
		}
		audio.src = database[current].src;
		render();
	}
	
	
	
	//调用
	$("#next").on('touchend' , next);
	$("#prev").on('touchend' , prev);
	
	render();

	
	function time(v){
		v = Math.floor(v)
		var s= v % 60;
		s = s < 10 ? ("0"+s ):s ;
		var z= Math.floor(v / 60)
		return z+":"+s;
	}
	
	audio.oncanplay=function(){
		all.html(time(audio.duration))
	}
	
	play.on("click",function(){
		if(audio.paused){
			audio.play();
		}else{
			audio.pause();
		}
	});
	$(audio).on("play",function(){
			play.html('<img src="images/5.png">');
	});
	$(audio).on("pause",function(){
		play.html('<img src="images/8.png">');
	});
	
	
	jd.on("click",function(e){
		var q=e.offsetX/jd.width()*audio.duration;
		audio.currentTime=q;
		jy.css("left",e.offsetX+"px");
	});
	jd.on("click",false);
	

	jy.on("click",false);
	jy.on("mousedown",function(e){
		var r=jy.innerWidth()/2;
		var start=r-e.offsetX;
		$(document).on("mousemove",function(e){
			var left=e.clientX-jd.position().left+start;
			var c=left/jd.width()*audio.duration;
			if(c>=audio.duration||c<=0){
				return;
			}
			audio.currentTime=c;
		});
		return false;
	});
	$(document).on("mouseup",function(){
		$(document).off("mousemove");
	});
	
	
	$(audio).on("timeupdate",function(){
		now.html(time(audio.currentTime));
		var left1=jd.width()*audio.currentTime/audio.duration-jy.width()/2;
		

		jy.css("left",left1);
	})
	
	
	vy.on("click",false);
	vy.on("mousedown",function(e){
		var r=vy.width()/2;
		var start=r-e.offsetX;
		$(document).on("mousemove",function(e){
			var left=e.clientX-vol.position().left+start;
			var v=left/vol.width();
			if(v>1||v<0){
				return;
			}
			audio.volume=v;
		});
		return false;
	});
	
	vol.on("click",function(e){
		v=e.offsetX/vol.width();
		audio.volume=v;
		mute.removeAttr("dv");
	})
	mute.on("click",function(){
		if($(this).attr("dv")){
			audio.volume=$(this).attr("dv");
			$(this).removeAttr("dv");
		}else{
			$(this).attr("dv",audio.volume);
			audio.volume=0;
		}
	});
	$(audio).on("volumechange",function(){
		vy.css("left",vol.width()*audio.volume-vy.width()/2);
	});

})
