<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ashley Callahan | Web Developer. Problem Solver. Nerdish Geek.</title>
    <meta name="keywords" content="Ashley Callahan, front-end development, web development, development, programming, website, html, html5, css, css3, javascript, jquery, php, wordpress, user interface, mobile, user experience, accessibility, responsive web development, responsive web design, usability, bloomington, indiana, nerd, geek, social media, seo, api" />
    <meta name="description" content="The portfolio of Ashley Callahan, an experienced, award-winning web developer located in Bloomington, Indiana." />
    <link href="css/styles.css" rel="stylesheet" type="text/css"/>
</head>
<body>
    <header>
        <h1><a href="index.html">Ashley Callahan</a></h1>
        <p class="lead">Web Developer | Problem Solver | Nerdish Geek</p>
        <div class="intro">
			<?php
				if(isset($_GET['submit'])) {
					 
					$to_email = "hello@ashleycallahan.net";
					$subject = "Message from ashleycallahan.net";
					$from = strip_tags($_POST['email']);
					$headers = "From:".$from;
					
					$name = strip_tags($_POST['name']);
					$message = strip_tags($_POST['message']);
					$botty = strip_tags($_POST['dsb']);
					if($botty != NULL){
						die;
					}
					
					$content .= "Name: ".$name."\n";
					$content .= "Email: ".$from."\n";
					$content .= "Message: ".$message."\n";
					$content .= "Botty: ".$botty."\n";
					
					if($name!='' || $from!='' || $message!=''){
						mail($to_email, $subject, $content, $headers);
					}
					else {
						$error = true;  
					}
                    if($error==true){
                        echo "<p><strong>Something bad happened. Sorry.</strong> Please go back and try again.</p>";
                    }
                    else {
                        echo "<p><strong>Thank you!</strong></p><p>I&#8217;ll be in touch with you shortly regarding your message.</p>"; 
                    }
                }
            ?>
            </div>
        </div>
    </header>
    <nav>
    	<h2><a href="#menu" class="icon-align-justify"><span>Menu</span></a></h2>
        <ul id="menu">
            <li><a href="/#work">Recent Work</a></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#contact">Contact</a></li>
            <li><a href="resume.html">R&eacute;sum&eacute;</a></li>
        </ul>
        <h2 class="close"><a href="#" class="icon-align-justify"><span>Close Menu</span></a></h2>
    </nav>
    <script type="text/javascript">
	
	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-3709725-1']);
	  _gaq.push(['_trackPageview']);
	
	  (function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();
	
    </script>
</body>
</html>