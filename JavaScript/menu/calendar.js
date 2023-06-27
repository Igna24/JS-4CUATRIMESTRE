export function initializeCalendar() {
  $(document).ready(function() {
    // Hacer una llamada al API para obtener los eventos
    $.ajax({
      url: 'https://knassbani2.execute-api.us-east-2.amazonaws.com/events/sports',
      method: 'GET',
      success: function(response) {
        var eventsData = response;

        // Inicializar el calendario y configurar las opciones
        $('#calendar').fullCalendar({
          events: eventsData, // Asignar los eventos obtenidos del API
          defaultView: 'month', // Vista predeterminada: mes
          header: {
            left:'prev,next,today',
            center: 'title',
            right:'month,agendaWeek,agendaDay'
          },
          eventRender: function(event, element) {
            // Resaltar el día del evento
            var eventDate = moment(event.start).format('YYYY-MM-DD');
            $('.fc-day[data-date="' + eventDate + '"]').addClass('event-day');
          },
          eventMouseover: function(event, jsEvent, view) {
            // Mostrar el modal con la descripción del evento cuando se pasa el mouse por encima
            var modalContent = '<div class="event-modal">' +
              '<div class="event-modal-content">' +
              '<h3>' + event.title + '</h3>' +
              '<p>Date: ' + moment(event.start).format('YYYY-MM-DD') + '</p>' +
              '<p>Location: ' + event.location.city + ', ' + event.location.state + '</p>' +
              '<p>Price: $' + event.price + '</p>' +
              '</div>' +
              '</div>';
              $('body').append(modalContent);
              $('body').addClass('dark-overlay');
              $(this).css('z-index', 9999);
              $('.event-modal').css({
                top: jsEvent.pageY,
                left: jsEvent.pageX
              });
          },
          eventMouseout: function(event, jsEvent, view) {
            // Ocultar el modal cuando se retira el mouse
            $('.event-modal').remove();
            $('body').removeClass('dark-overlay');
          }
        });
      },
      error: function() {
        // Error al obtener los eventos del API
        console.log('Error al obtener los eventos del API.');
      }
    });
  });
}