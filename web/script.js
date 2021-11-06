(() => {
  let transcriptions = [];

  async function fetchTranscriptions() {
    const response = await fetch('http://localhost:3001/transcription');
    const json = await response.json();
    if (json.length > 0) transcriptions = [...json];
    populateTranscriptions();
  }

  function populateTranscriptions() {
    const bodyTable = document.querySelector('.body-table');
    bodyTable.innerHTML = '';
    transcriptions.forEach((transcription) => {
      bodyTable.innerHTML += `
        <tr>
            <td>${transcription._id}</td>
            <td>${transcription.text}</td>
            <td>${transcription.nlu}</td>
            <td>${transcription.ta}</td>
        </tr>
          `;
    });
  }

  fetchTranscriptions();
  setInterval(fetchTranscriptions, 5000);
})();
