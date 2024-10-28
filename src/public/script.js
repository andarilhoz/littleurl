// script.js

document.getElementById('urlForm').addEventListener('submit', async function (e) {
    e.preventDefault()
  
    const targetUrl = document.getElementById('targetUrl').value
    const ttlSeconds = document.getElementById('ttlSeconds').value
    const resultDiv = document.getElementById('result')
  
    // Limpar o resultado anterior
    resultDiv.innerHTML = ''
  
    try {
      const response = await fetch('http://localhost:3000/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'f26ba4a95c9aa3b60731b764ef542202' // Altere para sua API Key
        },
        body: JSON.stringify({
          targetUrl: targetUrl,
          ttlSeconds: ttlSeconds ? parseInt(ttlSeconds) : null
        })
      })
  
      const data = await response.json()
  
      if (response.ok) {
        resultDiv.innerHTML = `
          <div class="alert alert-success">
            <strong>Success!</strong> Your shortened URL: <a href="${data.message}" target="_blank">${data.message}</a>
          </div>
        `
      } else {
        resultDiv.innerHTML = `
          <div class="alert alert-danger">
            <strong>Error!</strong> ${data.message}
          </div>
        `
      }
    } catch (error) {
      resultDiv.innerHTML = `
        <div class="alert alert-danger">
          <strong>Error!</strong> Unable to process your request.
        </div>
      `
    }
  })
  