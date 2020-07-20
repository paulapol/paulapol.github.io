function initialiseContent() {	
	initialiseMenu();
	initialiseSlider();
	populateMenu();
}

function Menu_item (url, name, category, price) {
	this.url = url;
	this.name = name;
	this.category = category;
	this.price = price;
}

function initialiseMenu() {
	localStorage.clear();
	let allMenuItems = [];

	let m1 = new Menu_item("images/carbonara.jpg", "Pasta Carbonara", "Second Course", "9.00");
	let m2 = new Menu_item("images/soup.jpg", "Chicken Soup", "Entrees", "13.00");
	let m3 = new Menu_item("images/salad2.jpg", "Vitamin Salad", "Salads", "7.00");
	let m4 = new Menu_item("images/pizza.jpg", "Pizza", "Main Course", "15.00");
	let m5 = new Menu_item("images/pancakes.jpg", "Pancakes", "Desserts", "9.00");
	
	allMenuItems.push(m1);
	allMenuItems.push(m2);
	allMenuItems.push(m3);
	allMenuItems.push(m4);
	allMenuItems.push(m5);

	localStorage.setItem("allMenuItems", JSON.stringify(allMenuItems));
}

function populateMenu() {
	let newList = JSON.parse(localStorage.getItem("allMenuItems"));
	populateContainer(newList);
}

function populateContainer(dishList) {
	let cardContainer = document.getElementById("div-container2");

	let maxLength=cardContainer.childNodes.length;
	for (var i = 1; i<=maxLength; i++) {
		cardContainer.removeChild(cardContainer.childNodes[0]);
	}

	dishList.forEach( dish =>{
	let htmlText = `
                      <img class="dish-image" src=${dish.url} alt="dish">
                      <div class="card-details-container">
                      	<h4><b>${dish.name}</b></h4>
                      	<p>${dish.category}</p>
                      	<p class="dish-price">$${dish.price}</p>
                      </div>
                      `;

   	let card = document.createElement("div");
	let attr = document.createAttribute("class");
	attr.value = "card";
	card.setAttributeNode(attr);

	card.innerHTML = htmlText;

	cardContainer.appendChild(card);
	});
}

function initialiseSlider() {
	var dollarPrefixFormat = wNumb({prefix: '$', decimals: 0})
	var slider = document.getElementById('range');
	var slider2 =noUiSlider.create(slider, {
	start:[5,20],
    connect: true,
    range: {
        'min': 5,
        'max': 20
   	},
   	margin: 1,
    tooltips: [dollarPrefixFormat, dollarPrefixFormat],
    pips: {
        mode: 'steps',
        density: 5,
        format: dollarPrefixFormat
    }
   
	});

	slider2.on('update', function(values){
	 	let newList = JSON.parse(localStorage.getItem("allMenuItems"));
	    let filteredItems = filterItems(newList, values)
	    populateContainer(filteredItems);
	})
}

function filterItems(items, price) {
    return items.filter(item => {
    	return parseFloat(item.price) >= parseFloat(price[0]) && parseFloat(item.price) <= parseFloat(price[1])
    })
}
