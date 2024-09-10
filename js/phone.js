const loadPhone = async (phoneSearch, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneSearch}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);

}
const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.textContent = '';
    const moreContainer = document.getElementById('more-container');
    if(phones.length > 15 && !isShowAll){
        moreContainer.classList.remove('hidden');
    }
    else{
        moreContainer.classList.add('hidden');
    }

    if(!isShowAll){
        phones = phones.slice(0,15);
    }
    phones.forEach(phone => {
        // console.log(phone);
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
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>
            `;
        phoneContainer.appendChild(phoneCard);
    });
    
    toggleLoadingSpinner(false);
}
// handle search......
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById("search-field");
    const phoneSearch = searchField.value;
    // console.log(phoneSearch);
    loadPhone(phoneSearch, isShowAll);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}
// handle more btn
const handleMoreBtn = () =>{
    handleSearch(true);
}

// handle show details
const handleShowDetails = async (id) =>{
    // console.log("show", id);
    //load single phone details
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();

    const phone = data.data;
    showPhoneDetails(data);
} 

const showPhoneDetails = (phone) =>{
    const show_details_container = document.getElementById('phone-details-container');
    show_details_container.innerHTML =`
    <div class="mx-10 mt-5"> 
    <figure class="bg-[#0D6EFD0D] w-[42rem] h-[25rem] flex justify-center items-center rounded-2xl">
                <img
                  src="${phone.data.image}"
                  alt="Phone"
                  class="rounded-xl w-[16.75rem] h-[23.8rem]" />
            </figure> </div>
            <div class="card-body">
              <h2 class="card-title text-[#403F3F] font-bold text-3xl">${phone.data.name}</h2>
              <h3><span class="text-[#403F3F] text-xl font-semibold">Storage :</span>${phone.data?.mainFeatures?.storage}</h3>
              <h3><span class="text-[#403F3F] text-xl font-semibold">Display Size :</span>${phone.data?.mainFeatures?.displaySize}</h3>
              <h3><span class="text-[#403F3F] text-xl font-semibold">Chipset :</span>${phone.data?.mainFeatures?.chipSet}</h3>
              <h3><span class="text-[#403F3F] text-xl font-semibold">Memory :</span>${phone.data?.mainFeatures?.memory}</h3>
              <h3><span class="text-[#403F3F] text-xl font-semibold">Slug :</span>${phone.data?.slug}</h3>
              <h3><span class="text-[#403F3F] text-xl font-semibold">Release data :</span>${phone.data?.releaseDate}</h3>
              <h3><span class="text-[#403F3F] text-xl font-semibold">Brand :</span>${phone.data?.brand}</h3>
              <h3><span class="text-[#403F3F] text-xl font-semibold">GPS :</span>${phone.data?.others?.GPS}</h3>
              `
    console.log(phone);
    show_details_modal.showModal();
}
loadPhone('iphone');