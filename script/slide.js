// force livequery update
$("body").mousemove(function(e) {
	$("#flow").text(e.pageX + ", " + e.pageY);
});

//sort workflow items
$(".workflows").livequery(function(){
    $(this).sortable({
		revert: 		true,
		dropOnEmpty:	true,
		cancel: 		'li.empty'
	});
});

//expand current workflow
//TODO move boolean in a class (flag)
var expanded = false;
$(".expander").click(function() {
	if (expanded) {
		$("#workflows .content").slideUp();
		$(".expander").removeClass("expander-up");
	} else {
		$("#workflows .content").slideDown();		
		$(".expander").addClass("expander-up");
	}
	expanded = !expanded;
});

//trash bin for workflow items
$(".workflowtrash").livequery(function(){
	$(this).droppable({
		accept: 'ul.workflows > li',
		activeClass: 'trash-active',
		hoverClass: 'trash-hover',
		drop:	function(event, ui) {
			$(ui.draggable).remove();
			$(this).parents(".bar").removeClass("trash-hover");
			$(this).parents(".bar").removeClass("trash-active");
		},
		over:	function(event, ui) {
			$(this).parents(".bar").addClass("trash-hover");
		},
		out:	function(event, ui) {
			$(this).parents(".bar").removeClass("trash-hover");
		},
		activate:	function(event, ui) {
			$(this).parents(".bar").addClass("trash-active");
		},
		deactivate:	function(event, ui) {
			$(this).parents(".bar").removeClass("trash-active");
		}		
	});
});

//sort tasks
$(".action").livequery(function(){
    $(this).sortable({
		revert: 		true,
		connectWith:	'.action',
		dropOnEmpty:	true,
		cancel: 		'li.empty'
	});
});

//trash bin for tasks
$(".trash").livequery(function(){
	$(this).droppable({
		//accept: 'li',
		//accept 'li' with common parrent
		accept: function(el) {
			if ($(el)[0].localName != "li") {
				return false;
			}
			var p1 = $(this).parents(".tab");
			var p2 = $(el).parents(".tab");
			return p1.length > 0 && p2.length > 0 && p1[0] == p2[0];
		},
		activeClass: 'trash-active',
		hoverClass: 'trash-hover',
		drop:	function(event, ui) {
			$(ui.draggable).remove();
			$(this).parents(".bar").removeClass("trash-hover");
			$(this).parents(".bar").removeClass("trash-active");
		},
		over:	function(event, ui) {
			$(this).parents(".bar").addClass("trash-hover");
		},
		out:	function(event, ui) {
			$(this).parents(".bar").removeClass("trash-hover");
		},
		activate:	function(event, ui) {
			$(this).parents(".bar").addClass("trash-active");
		},
		deactivate:	function(event, ui) {
			$(this).parents(".bar").removeClass("trash-active");
		}		
	});
});

//sort task sets
$("#container").livequery(function(){
    $(this).sortable({
		scroll:	true,
		revert: true,
		handle:	'h4',
		start:	function() {
			ignoreClick = true;
		}
	});
});

var timeout;
var ignoreClick = false;

var workflowExpanded = true;

$("#workflow h3").livequery(function() {
    $(this).bind("click", function() {
		if (ignoreClick) {
			ignoreClick = false;
			return;
		}
		var parent = $(this).parent();
        if (!timeout) {
			timeout = setTimeout(function() {
			    timeout = null;
                //$(".content", parent).toggle("blind", null, 200);
				if (workflowExpanded) {
					$(".content", parent).slideUp();
					$("#workflow h3").addClass("collapsed");
				} else {
					$(".content", parent).slideDown();
					$("#workflow h3").removeClass("collapsed");
				}
				workflowExpanded = !workflowExpanded;
            }, 200);
		}
    }).bind("dblclick", function() {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    });
});

//for the editable titles filter doubleclicks, and collapse on single click
$(".title").livequery(function() {
    $(this).bind("click", function() {
		if (ignoreClick) {
			ignoreClick = false;
			return;
		}
		var parent = $(this).parent();
        if (!timeout) {
			timeout = setTimeout(function() {
			    timeout = null;
                $(".content", parent).toggle("blind", null, 200);
            }, 200);
		}
    }).bind("dblclick", function() {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    });
	$(this).ellipsis();
});

//editable items
$('.title, .action li, #workflow h3, ul.workflows > li').livequery(function() {
	var type = ($(this).text().length > 50)?"textarea":"text";
	
    $(this).editable(function(value, settings) {
        $(this).effect("highlight", null, 2500);
        return value;
    }, {
        event: 	'dblclick',
        style: 	'inherit',
		type:	type,
		onblur:	"submit"
    });
});

//delete taskset
$("a.delete").livequery(function() {
    $(this).bind("click", function() {
		$(this).parents(".tab").addClass("tab-deleted").slideUp("normal", function() {
			$(this).remove();
		});
		return false;
	});
});


//dev bookmarklets

//Load http://www.sprymedia.co.uk/article/Design bookmarklet
//function fnStartDesign(sUrl) {var nScript = document.createElement('script');nScript.setAttribute('language','JavaScript');nScript.setAttribute('src',sUrl);document.body.appendChild(nScript);}fnStartDesign('http://www.sprymedia.co.uk/design/design/media/js/design-loader.js');

//Load http://getfirebug.com/lite.html
//var firebug=document.createElement('script');firebug.setAttribute('src','http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js');document.body.appendChild(firebug);(function(){if(window.firebug.version){firebug.init();}else{setTimeout(arguments.callee);}})();void(firebug);