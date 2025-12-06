(function ($) {
  Backdrop.behaviors.holidaySnow = {
    attach: function (context, settings) {
      // Ensure we run this only once per page load to avoid duplicate snow layers.
      if ($('#holiday-snow-container', context).length > 0) {
        return;
      }

      var zIndex = settings.holiday_snow.zIndex || 9999;

      // Create the container
      var $snowContainer = $('<div id="holiday-snow-container" aria-hidden="true"></div>');
      $snowContainer.css({
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'width': '100%',
        'height': '100%',
        'pointer-events': 'none', // Click-through enabled
        'z-index': zIndex
      });

      $('body', context).append($snowContainer);

      // Simple snowflake generator
      function createSnowflake() {
        var $flake = $('<div class="snowflake">❄</div>');

        // Randomize start position and animation duration
        var startLeft = Math.random() * 100; // percent
        var duration = Math.random() * 5 + 5; // between 5 and 10s
        var size = Math.random() * 10 + 10; // between 10px and 20px
        var opacity = Math.random() * 0.5 + 0.3;

        $flake.css({
          'left': startLeft + '%',
          'animation-duration': duration + 's',
          'font-size': size + 'px',
          'opacity': opacity
        });

        $snowContainer.append($flake);

        // Remove flake after animation to keep DOM light
        setTimeout(function() {
          $flake.remove();
        }, duration * 1000);
      }

      // Generate flakes at intervals
      setInterval(createSnowflake, 300);
    }
  };
})(jQuery);