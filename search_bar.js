// JavaScript Document

var searchButtonBlack = function() {
	"use strict";
	var searchButton = document.getElementById("searchButton");
	searchButton.style.backgroundImage = "url(search_bar_images/search_icon_hover.png)";
};
document.getElementById("searchButton").onmouseover = searchButtonBlack;
document.getElementById("searchButton").onmouseup = searchButtonBlack;

var searchButtonGrey = function() {
	"use strict";
	var searchButton = document.getElementById("searchButton");
	searchButton.style.backgroundImage = "url(search_bar_images/search_icon.png)";
};
document.getElementById("searchButton").onmouseout = searchButtonGrey;
document.getElementById("searchButton").onmousedown = searchButtonGrey;

/********************* End of JS to handle Search Button *********************/

var searchValue;
var responseArray;

var setSearchValue = function() {
	"use strict";
	var stringValue = document.getElementById("searchBar").value;
	stringValue = stringValue.toLowerCase();
    stringValue = stringValue.trim();
	while(stringValue.indexOf(" ") > -1) {
	    stringValue = stringValue.replace(" ", "_");
	}
	searchValue = stringValue + "_";
	getResponse();
};
document.getElementById("searchBar").onchange = setSearchValue;

var getResponse = function() {
	"use strict";
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if(request.readyState === 4 && request.status === 200) {
			responseArray = JSON.parse(request.responseText);
		}
	};
	request.open("GET", "search_bar.php?q=" + searchValue, true);
	request.send();
};

var removeSearchResults = function() {
	"use strict";
	var searchCont = document.getElementById("searchCont");
	while(searchCont.childNodes.length > 10) {
		searchCont.removeChild(searchCont.lastChild);
	}
};

var searchButtonClick = function() {
	"use strict";
	
	removeSearchResults();
	
	if(responseArray !== undefined) {
	    for(var i = 0; i < responseArray.length; i++) {
		    var itemCont = document.createElement("div");
		    var itemImage = document.createElement("div");
		    var itemTitle = document.createElement("div");
		    var itemSellType = document.createElement("div");
		    var itemPrice = document.createElement("div");
		    var itemStock = document.createElement("div");
		    itemCont.appendChild(itemImage);
		    itemCont.appendChild(itemTitle);
		    itemCont.appendChild(itemSellType);
		    itemCont.appendChild(itemPrice);
		    itemCont.appendChild(itemStock);
		    itemCont.className = "searchItem";
		    itemImage.className = "itemImage";
		    itemTitle.className = "itemTitle";
		    itemSellType.className = "itemSellType";
		    itemPrice.className = "itemPrice";
		    itemStock.className = "itemStock";
		    itemImage.style.backgroundImage = "url(search_bar_images/" + responseArray[i][1] + ".jpg" + ")";
		    itemTitle.innerHTML = responseArray[i][0];
		
		    if(responseArray[i][2] === "0") {
			    itemSellType.innerHTML = "Pre-owned";
		    }
		    if(responseArray[i][2] === "1") {
			    itemSellType.innerHTML = "New";
		    }
		    if(responseArray[i][2] === "2") {
			    itemSellType.innerHTML = "Pre-order";
		    }
		
		    itemPrice.innerHTML = "£" + responseArray[i][3];
		
		    if(responseArray[i][4] === "0") {
		        itemStock.innerHTML = "In-Stock";	
		    }
		
		    if(responseArray[i][4] === "1") {
		        itemStock.innerHTML = "Out-of-Stock";	
		    }
		
		    itemCont.style.backgroundColor = "#dbf0fd";
		    document.getElementById("searchCont").appendChild(itemCont);
	    }
	}
};
searchButton.onclick = searchButtonClick;

var playstationOnClick = function() {
	"use strict";
	searchValue = "playstation_";
	getResponse();
};
document.getElementById("playstationButton").onmousedown = playstationOnClick;
document.getElementById("playstationButton").onmouseup = searchButtonClick;
var xboxOnClick = function() {
	"use strict";
	searchValue = "xbox_";
	getResponse();
};
document.getElementById("xboxButton").onmousedown = xboxOnClick;
document.getElementById("xboxButton").onmouseup = searchButtonClick;
var nintendoOnClick = function() {
	"use strict";
	searchValue = "nintendo_";
	getResponse();
};
document.getElementById("nintendoButton").onmousedown = nintendoOnClick;
document.getElementById("nintendoButton").onmouseup = searchButtonClick;
var pcOnClick = function() {
	"use strict";
	searchValue = "pc_";
	getResponse();
};
document.getElementById("pcButton").onmousedown = pcOnClick;
document.getElementById("pcButton").onmouseup = searchButtonClick;
