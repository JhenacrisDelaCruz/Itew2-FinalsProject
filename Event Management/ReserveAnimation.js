// ANIMATION FOE HEADER
$(function() {
  var shrinkHeader = 100;
    $(window).scroll(function() {
      var scroll = getCurrentScroll();
      if (scroll >= shrinkHeader) {
        $('header').addClass('shrink');
      } else {
        $('header').removeClass('shrink');
      }
    });

  function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }
});



// RESERVATION FORM
$(document).ready(function() {
// Listen for form submission
  $('#reservationForm').submit(function(event) {
  event.preventDefault(); // Prevent the form from submitting

// Collect the form data
  var name = $('#name').val();
  var email = $('#email').val();
  var phone = $('#phone').val();
  var eventDate = $('#event-date').val();
  var eventTime = $('#event-time').val();
  var eventTimeAmPm = $('#event-time-am-pm').val();
  var eventType = $('#event-type').val();
  var venue = $('#venue-location').val();
  var theme = $('#theme').val();
  var numAttendees = $('#num-attendees').val();
  var services = [];
  $('input[name="event_service"]:checked').each(function() {
    services.push($(this).val());
  });
  var addons = [];
  $('input[name="add_on"]:checked').each(function() {
    addons.push($(this).val());
  });
  var additionalMessage = $('#message').val();

  // Create an object to store the reservation data
  var reservation = {
    name: name,
    email: email,
    phone: phone,
    eventDate: eventDate,
    eventTime: eventTime,
    eventTimeAmPm: eventTimeAmPm,
    eventType: eventType,
    venue: venue,
    theme: theme,
    numAttendees: numAttendees,
    services: services,
    addons: addons,
    additionalMessage: additionalMessage,
    status: 'Pending' // Add a status with a default value of 'Pending'
  };

  // Check if the reservation conflicts with existing reservations
  var reservations = localStorage.getItem('reservations');
  if (reservations) {
    reservations = JSON.parse(reservations);
    var conflictingReservation = reservations.find(function(existingReservation) {
      return (
        existingReservation.eventDate === eventDate &&
        existingReservation.eventTime === eventTime &&
        existingReservation.eventTimeAmPm === eventTimeAmPm
      );
    });

    if (conflictingReservation) {
      // Reservation conflict, alert the user
      alert(
        'Event date or time slot is already reserved.\n\nPlease choose a different date or time.'
      );
      return; // Exit the function, preventing the reservation from being saved
    }
  } else {
    reservations = [];
  }

  // Save the reservation data to localStorage
  reservations.push(reservation);
  localStorage.setItem('reservations', JSON.stringify(reservations));

  // Display the reservation information
  var reservationInfo = '';
    reservationInfo += 'Name: ' + name + '\n';
    reservationInfo += 'Email: ' + email + '\n';
    reservationInfo += 'Phone: ' + phone + '\n';
    reservationInfo += 'Event Date: ' + eventDate + '\n';
    reservationInfo += 'Event Time: ' + eventTime + ' ' + eventTimeAmPm + '\n';
    reservationInfo += 'Event Type: ' + eventType + '\n';
    reservationInfo += 'Venue: ' + venue + '\n';
    reservationInfo += 'Theme: ' + theme + '\n';
    reservationInfo += 'Number of Attendees: ' + numAttendees + '\n';
    reservationInfo += 'Services: ' + services.join(', ') + '\n';
    reservationInfo += 'Add-ons: ' + addons.join(', ') + '\n';
    reservationInfo += 'Additional Message: ' + additionalMessage + '\n';
    reservationInfo += 'Status: ' + reservation.status; // Include the status in the reservation information

    alert('Reservation submitted successfully!');

  // Clear the form fields
    $('#reservationForm')[0].reset();
  });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// VENUE DETAIL ( VENUE AND STYLING)
// Define a class called Item2
class Item2 {
  // Constructor function for creating Item2 objects
  constructor(name, price, type) {
    this.name = name;
    this.price = price;
    this.type = type;
  }
  
  // Method to create a table row from the item object
  createRow2() {
    // Create a new table row element
    var row = $("<tr>");
    
    // Create a new table cell element with the item's name and append it to the row
    $("<td>").text(this.name).appendTo(row);
    
    // Create a new table cell element with the item's price and append it to the row
    $("<td>").text(this.price).appendTo(row);
    
    // Return the created row
    return row;
  }
}

// When the document is ready
$(document).ready(function() {
  // Load stored items from local storage or create an empty array
  var storedItems = JSON.parse(localStorage.getItem("venueDetails")) || [];
  
  // Loop through each stored item
  for (var i = 0; i < storedItems.length; i++) {
    // Create a new Item2 object with the stored item's name, price, and type
    var item = new Item2(storedItems[i].name, storedItems[i].price, storedItems[i].type);
    
    // Set the initial table ID to an empty string
    var tableID = "";
    
    // Determine the table ID based on the stored item's type
    if (storedItems[i].type === "venue") {
      tableID = "#venue";
    } else if (storedItems[i].type === "styling") {
      tableID = "#styling";
    }
    
    // Append the newly created row for the item to the corresponding table
    $(tableID).append(item.createRow2());
  }
  
  // Add an event listener to the "Add Item" button
  $("#btnAddOption2").click(function() {
    // Get the values of the item name, price, and type from the input fields
    var name = $("#tfItemName2").val();
    var price = $("#tfItemPrice2").val();
    var type = $("#item_type2").val();
    
    // Create a new Item2 object with the input values
    var item = new Item2(name, price, type);
    
    // Set the initial table ID to an empty string
    var tableID = "";
    
    // Determine the table ID based on the selected item type
    if (type === "venue") {
      tableID = "#venue";
    } else if (type === "styling") {
      tableID = "#styling";
    }
    
    // If both the name and price fields are not empty
    if (name.length !== 0 && price.length !== 0) {
      // Append the newly created row for the item to the corresponding table
      $(tableID).append(item.createRow2());
      
      // Clear the input fields for name and price
      $("#tfItemName2").val("");
      $("#tfItemPrice2").val("");
      
      // Save the item to local storage by adding it to the storedItems array
      storedItems.push(item);
      localStorage.setItem("venueDetails", JSON.stringify(storedItems));
    }
  });
});



/// EVENT DETAIL (EVENT TYPE, SERVICES, AND ADD-ONS)
// Create a class called "Item" to represent an item with a name and price
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  // Create a table row from the item object
  createRow() {
    var row = $("<tr>");
    $("<td>").text(this.name).appendTo(row);
    $("<td>").text(this.price).appendTo(row);
    return row;
  }
}

$(document).ready(function() {
  // Retrieve stored item details from local storage or initialize an empty array
  var storedItem = JSON.parse(localStorage.getItem("eventDetails")) || [];

  // Load stored items and add them to the table
  for (var i = 0; i < storedItem.length; i++) {
    var item = new Item(storedItem[i].name, storedItem[i].price);
    var tableID = "";

    // Check the type of the stored item and update the corresponding elements
    if (storedItem[i].type === "event") {
      tableID = "#event";
      // Add event type to the event-type select element
      $("#event-type").append(`<option value="${item.name}">${item.name}</option>`);
    } else if (storedItem[i].type === "service") {
      tableID = "#service";
      // Add service to the servicesList ul element
      $("#servicesList").append(`
        <li>
          <input type="checkbox" id="${item.name}" name="event_service" value="${item.name}">
          <label for="${item.name}">${item.name}</label>
        </li>
      `);
    } else if (storedItem[i].type === "add-ons") {
      tableID = "#add-ons";
      // Add add-on to the addOnsList ul element
      $("#addOnsList").append(`
        <li>
          <input type="checkbox" id="${item.name}" name="add_on" value="${item.name}">
          <label for="${item.name}">${item.name}</label>
        </li>
      `);
    }

    // Append the item's table row to the specified table element
    $(tableID).append(item.createRow());
  }

  // Add event listener to the "Add Item" button
  $("#btnAddOption").click(function() {
    // Retrieve the input values for the new item
    var name = $("#tfItemName").val();
    var price = $("#tfItemPrice").val();
    var type = $("#item_type").val();

    // Create a new item object
    var item = new Item(name, price);
    item.type = type;

    // Get the table ID based on the selected item type
    var tableID = "";
    if (type === "event") {
      tableID = "#event";
      // Add event type to the event-type select element
      $("#event-type").append(`<option value="${item.name}">${item.name}</option>`);
    } else if (type === "service") {
      tableID = "#service";
      // Add service to the servicesList ul element
      $("#servicesList").append(`
        <li>
          <input type="checkbox" id="${item.name}" name="event_service" value="${item.name}">
          <label for="${item.name}">${item.name}</label>
        </li>
      `);
    } else if (type === "add-ons") {
      tableID = "#add-ons";
      // Add add-on to the addOnsList ul element
      $("#addOnsList").append(`
        <li>
          <input type="checkbox" id="${item.name}" name="add_on" value="${item.name}">
          <label for="${item.name}">${item.name}</label>
        </li>
      `);
    }

    // Add the new row to the table and clear the input fields if the name and price are not empty
    if (!name.length == 0 || !price.length == 0) {
      $(tableID).append(item.createRow());
      $("#tfItemName").val("");
      $("#tfItemPrice").val("");

      // Save the item to local storage
      storedItem.push(item);
      localStorage.setItem("eventDetails", JSON.stringify(storedItem));
    }
  });
});