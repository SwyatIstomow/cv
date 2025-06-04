document.addEventListener('DOMContentLoaded', function() {
  const customSelect = document.querySelector('.custom-select');
  const selectedOption = customSelect.querySelector('.selected-option');
  const options = customSelect.querySelector('.options');
  const optionItems = customSelect.querySelectorAll('.option');
  const hiddenSelect = customSelect.querySelector('#lang-select');
  
  const initialOption = optionItems[0];
  updateSelected(initialOption);
  
  selectedOption.addEventListener('click', function() {
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
  });
  
  optionItems.forEach(option => {
    option.addEventListener('click', function() {
      updateSelected(option);
      options.style.display = 'none';
    });
  });
  
  document.addEventListener('click', function(e) {
    if (!customSelect.contains(e.target)) {
      options.style.display = 'none';
    }
  });
  
  function updateSelected(option) {
    const flag = option.querySelector('.flag').cloneNode(true);
    const text = option.querySelector('.text').textContent;
    const value = option.getAttribute('data-value');
    
    selectedOption.innerHTML = '';
    selectedOption.appendChild(flag);
    selectedOption.insertAdjacentHTML('beforeend', `<span class="text">${text}</span>`);
    
    
    hiddenSelect.value = value;
    
    hiddenSelect.dispatchEvent(new Event('change'));
  }
});