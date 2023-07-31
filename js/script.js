//main js file

//main configuration
const prod_prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);

const app_id = '32bdc28e-c6e3-45da-9cb5-18bef90f56b4';

const config = {
	host: window.location.hostname,
	prefix: prod_prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};

require.config({
	baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
});

require(["js/qlik"], function (qlik) {

	qlik.on("error", function (error) {
		$('#popupText').append(error.message + "<br>");
		$('#popup').fadeIn(1000);
	});

	$("#closePopup").click(function () {
		$('#popup').hide();
	});


	//activate CSS theme
	//qlik.theme.apply('LightClassicIMA');


	//callbacks -- inserted here --

	//open apps -- inserted here --
	const app = qlik.openApp(app_id, config);

	//get objects -- inserted here --
	app.getObject('kpi-4', 'APMrPn');

	app.getObject('kpi-5', '519a3e3c-b24e-4c82-9bc5-2a155f916c74');

	app.getObject('kpi-6', '78ad36d4-26d6-4221-976b-3045813534f4');
	app.getObject('filter_panel_1', '777fcdca-c73e-4fbd-b509-373905cc7771');

	app.getObject('kpi-2', 'mGTWM');
	app.getObject('kpi-1', 'LXJP');

	app.getObject('kpi-3', 'pYKMV');

	app.getObject('object-3', 'sbKWJCb');
	app.getObject('object-1', 'bNgKCVp');


	//create cubes and lists -- inserted here --


	//get current selection
	if (typeof (app) != "undefined") {
		//get current object
		app.getObject('CurrentSelections', 'CurrentSelections');

	} else {
		$('#CurrentSelections').css("display", "none");
	}

	/* Bookmarks code */

	//create bookmarks
	//https://sense.qlikil.net/sense/app/eae92878-8a18-4795-9bb8-d2395b194465/
	//qlik.app.bookmark.create(title, description, sheetId)
	//app.bookmark.create('Test11','Test bookmark 11','72724607-46d5-44d3-9549-6748dee8fc60');

	// Get the button element
	const getBookmarkButton = document.getElementById('get_bookmark');

	// Add a click event listener to the button
	getBookmarkButton.addEventListener('click', function () {
		// Get the input field element
		const bookmarkInput = document.getElementById('bookmark-input');

		// Get the value from the input field
		const bookmarkValue = bookmarkInput.value;

		// Do something with the bookmark value
		console.log('Bookmark:', bookmarkValue);

		if (bookmarkValue !== "" || typeof (bookmarkValue) != 'undefined') {
			app.bookmark.create(bookmarkValue, bookmarkValue + " description");
		}
		//clear field
		bookmarkInput.value = "";
	});

	/* setTimeout(() => {

	    function applyBookmark(element, bookmark_id){
	        app.bookmark.apply(bookmark_id);
	        //add active class
	        $('.BookmarkList li').removeClass('active');
	        $(element).addClass('active');
	    }

	}, 500); */

	app.getList("BookmarkList", function (BookmarkList) {

		console.log('BookmarkList', BookmarkList.qBookmarkList.qItems);

		var list = "<ul class='BookmarkList'>";
		$.each(BookmarkList.qBookmarkList.qItems, function (key, value) {
			list += '<li data-id="' + value.qInfo.qId + '">' + value.qMeta.title + '</li>';
			//console.log(' value', value.qMeta.title);
		});
		list += "</ul>";

		document.getElementById('bookmarks_container').innerHTML = list;

	});

	/**
	 * Apply bookmark on the click
	 */
	$(document).on('click', '.BookmarkList li', (event) => {

		let bookmarkId = $(event.target).attr('data-id');
		//console.log('bookmarkId', bookmarkId);

		//apply bookmark
		app.bookmark.apply(bookmarkId);
		//add active class
		$('.BookmarkList li').removeClass('active');
		$(event.target).addClass('active');

		
	})

	//get current selections and clear active class if selections cleared
	app.getList("CurrentSelections", function(reply){
		//console.log('qSelectionObject', reply.qSelectionObject.qSelections);
		if(reply.qSelectionObject.qSelections.length == 0){
			$('.BookmarkList li').removeClass('active');
		}
	});


});