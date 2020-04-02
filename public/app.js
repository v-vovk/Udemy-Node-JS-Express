document.querySelectorAll('.price').forEach(node => {
  node.textContent = new Intl.NumberFormat('uk-UK', {
    currency: 'uah',
    style: 'currency'
  }).format(node.textContent)
})
