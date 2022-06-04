const $ = window.$;
$('document').ready(function () {
  const amenities = {};
  const url = 'http://localhost:5001/api/v1/status/';

  $.get(url, function (response) {
    if (response.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    $('.amenities H4').text(Object.values(amenities).join(', '));
  });

  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search/',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      $.each(data, function (key, val) {
        $(`<article>
        <div class="title_box">
          <h2>${val.name}</h2>
          <div class="price_by_night">$${val.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${val.max_guest} Guest</div>
                <div class="number_rooms">${val.number_rooms} Bedroom</div>
                <div class="number_bathrooms">${val.number_bathrooms} Bathroom</div>
        </div>
              <div class="description">
          ${val.description}
              </div>
      </article>`).appendTo('.places');
      });
    }
  });
});