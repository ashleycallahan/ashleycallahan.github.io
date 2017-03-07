$(document).ready(function(){
	
	/****************************************
	 * Get site root
	 ****************************************/
	
	var siteroot = window.location;


	/****************************************
	 * Detect IE 8-6
	 ****************************************/

	var isIE = false;
	if($.browser.msie && $.browser.version=="6.0" || $.browser.msie && $.browser.version=="7.0" || $.browser.msie && $.browser.version=="8.0") {
		isIE = true;
	}


	/****************************************
	 * Detect mobile
	 ****************************************/
	
	var isMobile = false;
	if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i)){
		isMobile = true;
	}
	
	
	/****************************************
	 * Get breakpoints from CSS
	 ****************************************/
	
	var activeMediaQuery = "";
	if(isIE==false){
		activeMediaQuery = window.getComputedStyle(document.body,':after').getPropertyValue('content');
		$(window).resize(function(){
			activeMediaQuery = window.getComputedStyle(document.body,':after').getPropertyValue('content');
		});
		if(activeMediaQuery==""){
			$("head").append("<link href='"+siteroot+"css/oldie.css' rel='stylesheet' type='text/css' media='screen' />");
		}
	}
	
	
	/****************************************
	* Check for fixed position support
	****************************************/
	
	var fixedCapable = fixedSupport();


	/****************************************
	* Get window width
	****************************************/

	if($.browser.webkit || isIE==true){
		var windowWidth = $(window).width();
		$(window).resize(function(){
			windowWidth = $(window).width();
		});
	}
	else {
		var windowWidth = window.innerWidth;
		$(window).resize(function(){
			windowWidth = window.innerWidth;
		});
	}


	/****************************************
	* Add class to <html>
	****************************************/
     
    $("html").addClass("js");

	/* Add class if fixed positioning is supported */
	if(fixedCapable==true && isMobile==false){
		$("html").addClass("fixed-capable");
	}
    

	/******************************************
	* Responsive Headline
	******************************************/

	if(isIE==false){
		headlineResize(windowWidth)
		$(window).resize(function(){
			headlineResize(windowWidth)
		});
	}


	/******************************************
	* Smooth Scroll
	******************************************/
	
	var anchorName;
	var sectionTop;
	var top = 0;
	$("nav li a, .top a").click(function(event){
		anchorName = $(this).attr("href");
		if(anchorName.indexOf("#")!=-1 && anchorName.indexOf("index.html#")==-1){
			event.preventDefault();
			if(anchorName=='#'){
				sectionTop = 0;	
			}
			else{
				sectionTop = $(anchorName).offset().top;
			}
			$("html, body").animate({scrollTop:sectionTop}, 1000);
		}
	});


	/******************************************
	* Current Navigation State
	******************************************/

	var currentTop;
	var currentSectionAnchor;
	if(window.location.hash){
		currentSectionAnchor = window.location.hash;
	}
	var currentIndex = $(currentSectionAnchor).index()-2;
	$("nav li:eq("+currentIndex+")").addClass("current");
	var currentSectionTop;
	var firstSectionAnchor = $("nav li:eq(0) a").attr("href");
	var firstSectionTop = $(firstSectionAnchor).offset();
	if(fixedCapable==true && isMobile==false && $("body").attr("id")=="home"){
		$(window).scroll(function(){
			currentTop = $(window).scrollTop()+60;
			for(i=0; i<$("nav li").length; i++){
				currentSectionAnchor = $("nav li:eq("+i+") a").attr("href");
				if(currentSectionAnchor.indexOf("#")!=-1){
					currentSectionTop = $(currentSectionAnchor).offset();
					if(currentTop>=currentSectionTop.top){
						$("nav li:eq("+i+")").addClass("current").siblings().removeClass("current");
					}
				}
			}
			if(currentTop<=firstSectionTop.top){
				$("nav li").removeClass("current");
			}
		});
	}

});


// Calculate headline size based on window width
function headlineResize(windowWidth) {
	var maxHeadlineSize = 100;
    var minHeadlineSize = 40;
	var headlineOffset;
	var headlineAdjust;
	if(windowWidth<1000){
		headlineOffset = (1000-windowWidth)*0.13;
		headlineAdjust = maxHeadlineSize-headlineOffset;
		if(headlineAdjust>=minHeadlineSize){
			$("h1").css("font-size", headlineAdjust+"px");
		}
		else {
			$("h1").css("font-size", minHeadlineSize+"px");
		}	
	}
	else {
		$("h1").attr("style","");
	}
}

// Check for fixed position support
function fixedSupport() {
  var isSupported = null;
  if (document.createElement) {
      var el = document.createElement("div");
      if (el && el.style) {
          el.style.position = "fixed";
          el.style.top = "10px";
          var root = document.body;
          if (root && root.appendChild && root.removeChild) {
              root.appendChild(el);
              isSupported = el.offsetTop === 10;
              root.removeChild(el);
          }
      }
  }
  return isSupported;
}