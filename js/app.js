// creates a <ol> list element and functions

var itemList = document.querySelector('#item-list');
itemList.count = 0;
// create form element
var form = document.querySelector('#item-form');
var edit = document.querySelector('#edit_item');


var tmp;
function refresh() {
	db.collection('applications')
		.orderBy('name','asc')
		.get().then(snapshot => {
			itemList.count = 0;
		        console.log('displaying contents of db...');
			while(itemList.firstChild){
				itemList.removeChild(itemList.firstChild);
			}
	    		snapshot.docs.forEach(doc => {
				itemList.count += 1;
				console.log(itemList.count);
				renderDB(doc);
	    });
	});//end of get data
		clearForm();
}

function todaysDate()	
{	
    var today = new Date();	
    var dd = String(today.getDate()).padStart(2, '0');	
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!	
    var yyyy = today.getFullYear();	
    today = mm + '/' + dd + '/' + yyyy;	
    return today;	
}	

function clearForm()
{
      form.name.value = '';
      form.title.value = '';
      form.wordsA.value = '';
      form.wordsB.value = '';
      form.wordsC.value = '';
	form.wordsD.value = '';
      form.subject.value = '';
}



// create element & render cafe
function renderDB(doc){
  itemList.count += 1; 	
  var current_date = doc.data().date;	

  if((itemList.count > 1)&&(current_date == previous_date))	
  {	
	  date_flag = false;	
  } else {	
	  date_flag = true;	
  }	

  previous_date = current_date;	

  if(date_flag == true)	
  {	
          // append list	
	 // li.appendChild(date);	
	 // var item_date = doc.data().date;	
	  //var myJSON = JSON.stringify(todaysDate());	
	let date_label = document.createElement('label');	
	label.style = "color:black; text-align: center; display: block; font-weight: bold"; // apply your style	
	  date_label.textContent = doc.data().date;	
	itemList.appendChild(date_label);	
  }	
	
	
  // create list document elements
  let li = document.createElement('li');
  li.setAttribute('data-id', doc.id);  //Each document gets an id.
  let name = document.createElement('span');
  name.classList.add("name_data");
  let title = document.createElement('span');
  title.classList.add("name_data");
  let wordsA = document.createElement('span');
  wordsA.classList.add("words_data");
  let wordsB = document.createElement('span');
  wordsB.classList.add("words_data");
  let wordsC = document.createElement('span');
  wordsC.classList.add("words_data");
  let wordsD = document.createElement('span');
  wordsD.classList.add("words_data_last");
  //wordsC.style.cssText = "font-family: Arial, Helvetica, sans-serif; font-size: 16px; padding: 3px 0px 6px 12px; display: block; border-bottom: 2px solid black";

  let subject = document.createElement('span');
  subject.classList.add('subject_data');
  //subject.style.cssText = "padding: 3px 0px 6px 12px; display: block;";

 // let cross = document.createElement('div');
 // cross.textContent = 'x';



  // create elements for labels for each data to display
  let label_name = document.createElement('span');
  label_name.textContent = "NAME"; //&nbsp;
  label_name.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";

 // create elements for labels for each data to display
  let label_title = document.createElement('span');
  label_title.textContent = "TITLE"; //&nbsp;
  label_title.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";

  let label_words = document.createElement('span');
  label_words.textContent = "LOCATION";
  label_words.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";

  let label_subject = document.createElement('span');
  label_subject.textContent = "DESCRIPTION";
  label_subject.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";

  // generate content for fields

  name.textContent = doc.data().name;
  title.textContent = doc.data().title;
  wordsA.textContent = doc.data().wordsA;
  wordsB.textContent = doc.data().wordsB;
  wordsC.textContent = doc.data().wordsC;
  wordsD.textContent = doc.data().wordsD;
  subject.textContent = doc.data().subject;

/*
	const data = doc.data();
	for (const key in data) {
	    const value = data[key];

			//alert("key: " + key + " value: " + value);
		if(value)
			{
			  label_name.textContent = key;
				//alert(key);
				var newDiv = document.createElement('span');
				newDiv.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"
				var newContent = document.createTextNode(key);
				var newDiv1 = document.createElement('span');
				newDiv1.classList.add("name_data");
				var newContent1 = document.createTextNode(value);
				newDiv.appendChild(newContent);
				newDiv1.appendChild(newContent1);
				li.appendChild(newDiv);
				li.appendChild(newDiv1);
			}
	   // // now key and value are the property name and value
	}
	*/

  // append list
  //li.appendChild(cross);

  li.appendChild(label_name);
  li.appendChild(name);

  li.appendChild(label_title);
  li.appendChild(title);

  li.appendChild(label_words);
  li.appendChild(wordsA);
  li.appendChild(wordsB);
  li.appendChild(wordsC);
  li.appendChild(wordsD);

  li.appendChild(label_subject);
  li.appendChild(subject);

  // put the <tbody> in the <table>

  itemList.appendChild(li);
}





// real-time listener
db.collection('applications').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
	    if(change.type == 'added'){
		    console.log("New item: ", change.doc.data());

		    renderDB(change.doc);
	    }

	    if (change.type == 'modified'){
		    console.log("Modified item: ", change.doc.data());

		    let li = itemList.querySelector('[data-id=' + change.doc.id + ']');
		    itemList.removeChild(li);
		    renderDB(change.doc);

	    }

	    if (change.type == 'removed'){
		    console.log("Removed item: ", change.doc.data());
		    let li = itemList.querySelector('[data-id=' + change.doc.id + ']');
		    itemList.removeChild(li);
	    }
    });
});

class Snap {
	constructor(){
		if(! Snap.instance){
      			this._data = [];
      			Snap.instance = this;
			//alert("constructor called");
    }

    return Snap.instance;
	}

	setData(doc){
		//var _data = [];
		var data = doc.data();
		this.name = data.name;
		this.tite = data.title;
		this.wordsA = data.wordsA;
		this.wordsB = data.wordsB;
		this.wordsC = data.wordsC;
		this.wordsD = data.wordsD;
		this.subject = data.subject;
	}

	//get(id){
	//	return this._data.find(d => d.id === id);
	//}

	setForm(){
		form.name.value =  this.name;
		form.title.value = this.title;
		form.wordsA.value = this.wordsA;
		form.wordsB.value = this.wordsB;
		form.wordsC.value = this.wordsC;
		form.wordsD.value = this.wordsD;
		form.subject.value = this.subject;
	}
}

//export default instance;

//itemList.addEventListener('click',selectedListener,false);


//JQUERY FUNCTIONS
$(function(){
	$('.sidebar').addClass('closed');
	$("#edit_item").hide();
	$("#delete_item").hide();
	$('.content').hide();
	$('.min').show();

	// Display min-sidebar
	function display_min(){
		$('.sidebar').addClass('closed');
		$("#edit_item").hide();
		$("#delete_item").hide();
		$('.content').hide();
		$('.min').show();
	}

	function display_full(){
		 $('.sidebar').removeClass('closed');
		 $( ".docs" ).toggleClass('blur-me');
		 $(".min").hide();
		 $(".content").show();
	         $(".max").hide().fadeIn(1000);
	}


	// Animate slide for create new form
	function display_add(){
		//flag_refresh = true;
		$("#item_edit").hide();
		$("#item_submit").show();
		display_full();
	}

	// Add new document button show
	$("#new_item").click(function(){
		//$("#item_submit").attr('value', 'Submit').attr('type','submit');
		display_add();
		clearForm();
	});

	// Animate slide for edit form
	function display_edit(){
		$("#item_edit").show();
		$("#item_submit").hide();
		 display_full();
	}

	//Edit new document button show
  	$("#edit_item").click(function(){
		//$("#item_submit").attr('value', 'Append').attr('type','append');
	  	display_edit();
 	 });

 	$("#item_submit").click(function(){
	        $( ".docs" ).toggleClass('blur-me');
		display_min();
  	});

	$("#item_edit").click(function(){
	        $( ".docs" ).toggleClass('blur-me');
		display_min();
  	});

	$("#item_cancel").click(function(){
		//flag_refresh = true;
		$( ".docs" ).toggleClass('blur-me');
		$("#edit_item").hide();
		$("#delete_item").hide();


		if($('#item-list li').hasClass('selected')){
			$('#item-list li').removeClass('selected');
		}

		display_min();

		clearForm();
		//refresh();
	});


//	$("#item-list").hover('li',function(){
//	    $(this).addClass( "selected" );
//	});


	$("#item-list").on('click','li',function() {
		let target = $(this);
		let others = $(this).siblings();

		target.toggleClass('selected');
		others.removeClass('selected');


		if(target.hasClass('selected')){
			$("#edit_item").show();
			$("#delete_item").show();
		} else {
			$("#edit_item").hide();
			$("#delete_item").hide();
		}

		//const id = $(this).attr('data-id');

	});

});


var selectedListener = function(e) {
	  //itemList.removeEventListener('click',selectListener);
		const element = e.target.parentElement;
		const id = element.getAttribute('data-id');
		//element.classList.add('selected');

		if(!element.hasAttribute('data-id'))
				return;
		else{
			const id = element.getAttribute('data-id');
		}

		var ref = db.collection("applications").doc(id);

		ref.get().then(doc=>{
		//	const spell = new Spell(doc);
		//	spell.setForm();

			const instance = new Snap();
			instance.setData(doc);
			instance.setForm();
			//Object.freeze(instance);
		});


		$('#delete_item').click(function(){
			if(!element.classList.contains('selected')) return;
			ref.delete();
		});


};

itemList.addEventListener('click',selectedListener,false);

var submit = document.querySelector('input[type=submit][value=Submit]');
//submit.addEventListener('click',)
submit.onclick = function(){
	db.collection('applications').add({
			name: form.name.value,
			title: form.title.value,
			wordsA: form.wordsA.value,
			wordsB: form.wordsB.value,
			wordsC: form.wordsC.value,
		        wordsD: form.wordsD.value,
			subject: form.subject.value,
			date: todaysDate()
	});
};

var apply = document.querySelector('input[type=submit][value=Apply]');
apply.onclick = function(){
	alert("Editing...");
	var x = document.getElementById("item-list");
	for (let element of x.children) {
		if(element.className == 'selected')
		{
			var id = element.getAttribute('data-id');
					var ref = db.collection('applications').doc(id);
					ref.update({
									name: form.name.value,
									title: form.title.value,
									wordsA: form.wordsA.value,
									wordsB: form.wordsB.value,
									wordsC: form.wordsC.value,
									wordsD: form.wordsD.value,
									subject: form.subject.value
								});
					}
				}
};

//save new to db
form.addEventListener('submit', (e) => {
    e.preventDefault();
});
