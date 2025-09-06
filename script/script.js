const createElements = (arr) =>{
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`)
    return htmlElements.join(" ")
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner =(status) =>{
    if(status == true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('word-container').classList.add('hidden')
    }
    else{
        document.getElementById('word-container').classList.remove('hidden')
        document.getElementById('spinner').classList.add('hidden')
    }
}

const loadLessons =() =>{
    fetch('https://openapi.programming-hero.com/api/levels/all') //response Promise
    .then(res => res.json())
    .then(json => displayLesson(json.data))
}

const removeActive = () =>{
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach(btn => btn.classList.remove('active'))

}

const loadLevelWord = (id) => {
    manageSpinner(true)
    console.log(id)
    const url =`https://openapi.programming-hero.com/api/level/${id}`;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive() //remove all active class
        const clickBtn =document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add("active"); //add active class
        displayLevelWord(data.data);
    })
}

const loadWordDetails =async(id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json()
    displayWordDetails(details.data);
}

const displayWordDetails = (word) =>{
    // console.log(details.data)
    const detailsBox =document.getElementById('details-container');
    detailsBox.innerHTML = `
    <div class="">
        <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
       </div>
       <div class="">
        <h2 class="font-bold">Meaning</h2>
        <p class="font-bangla">${word.meaning}</p>
       </div>
       <div class="">
        <h2 class="font-bold">Example</h2>
        <p class="font-bangla">${word.sentence}</p>
       </div>
        <div class="">
        <h2 class="font-bold">Synonym</h2>${createElements(word.synonyms)}</div>
    `;
    document.getElementById('word_modal').showModal()
}

const displayLevelWord =(words) => {
    console.log(words)
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = "";

    if(words.length == 0){
        wordContainer.innerHTML = `
            <div class="font-bangla col-span-full rounded py-10 space-y-6 text-center ">
                <img class="mx-auto" src="./assets/alert-error.png"/>
                <p class="text-xl font-medium text-gray-400 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
            </div>
        `;
        manageSpinner(false);
        return;
    }

    words.forEach(word => {
        console.log(word)
    const card = document.createElement("div")
    card.innerHTML =`
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
      <h2 class="font-bold text-2xl ">${word.word ? word.word : "Not Found"}</h2>
      <p class="font-semibold">Meaning /Pronounciation</p>
      <div class="font-bangla text-medium text-2xl">"${word.meaning ? word.meaning : "Meaning Not Found"} / ${word.pronunciation ? word.pronunciation : "Pronunciation Not Found"}" </div>
      <div class="flex justify-between items-center">
        <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
        <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>

      </div>
    </div>
    `
    wordContainer.append(card)
    });
    manageSpinner(false);
}

const displayLesson = (lessons) => {
    // console.log(lessons);

    // 1. Get the Container & Empty 
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = ""
    // 2. get into every lesson 
    for(let lesson of lessons){
    // 3. Create Element 
    const btnDiv = document.createElement('div')
    btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" class="btn  btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button >
    `;
    // 4. Append into container 
    levelContainer.append(btnDiv);
    console.log(levelContainer)
    }
    
}
loadLessons()


document.getElementById("btn-search").addEventListener('click',()=>{
    removeActive()
    const input = document.getElementById("input-search")
    const searchValue =input.value.trim().toLowerCase();

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then((data)=> {
        const allWords = data.data
        const filterWords = allWords.filter((word) =>word.word.toLowerCase().includes(searchValue));
        displayLevelWord(filterWords);
    })
    
})