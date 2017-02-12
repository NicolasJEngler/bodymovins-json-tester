$(document).ready(function() {
  // Add click event handler to button
  var $fileInput = $('#file'),
      $label = $('#label'),
      $fileSubmit = $('#load-file'),
      $outputWrapper = $('#output-wrapper');

  $fileInput.on('change', function() {
    var filename = $(this)[0].files[0].name;

    $label.text(filename);
  });

  $fileSubmit.on('click', function() {
    if (!window.FileReader) {
      return alert('FileReader API is not supported by your browser.');
    }

    var $i = $fileInput,
        input = $i[0];

    if (input.files && input.files[0]) {
      file = input.files[0];
      fileReader = new FileReader();

      fileReader.onload = function() {
        $outputWrapper.removeClass('is-hidden');

        $fileSubmit.val('Reload');
        $fileSubmit.off('click');

        $fileSubmit.on('click', function() {
          location.reload();
        });

        bodymovin.loadAnimation({
          container: document.getElementById('file-content'),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: JSON.parse(fileReader.result)
        });
      };

      fileReader.readAsText(file);
    } else {
      // Errors should be palced here
      alert('File not selected or browser incompatible.')
    }
  });
});
