const loadPhone = async (phoneSearch) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneSearch}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);

}
const displayPhones = phones => {
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.textContent = '';
    const moreContainer = document.getElementById('more-container');
    if(phones.length > 15 ){
        moreContainer.classList.remove('hidden');
    }
    else{
        moreContainer.classList.add('hidden');
    }

    phones = phones.slice(0,15);
    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
            <figure class="px-10 pt-10">
                <img
                  src="${phone.image}"
                  alt="Phone"
                  class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p></p>
              <div class="card-actions">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
            `;
        phoneContainer.appendChild(phoneCard);
    })
}
// handle search......
const handleSearch = () =>{
    const searchField = document.getElementById("search-field");
    const phoneSearch = searchField.value;
    console.log(phoneSearch);
    loadPhone(phoneSearch);
}
// loadPhone();