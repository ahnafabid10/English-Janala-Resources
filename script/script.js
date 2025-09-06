const loadLessons =() =>{
    fetch('https://openapi.programming-hero.com/api/levels/all') //response Promise
    .then(res => res.json())
    .then(json => displayLesson(json.data))
}

const loadLevelWord = (id) => {
    console.log(id)
    const url =`https://openapi.programming-hero.com/api/level/${id}`;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWord(data.data))
}

const displayLevelWord =(words) => {
    console.log(words)
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = "";
    words.forEach(word => {
        console.log(word)
    const card = document.createElement("div")
    card.innerHTML =`
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
      <h2 class="font-bold text-2xl ">${word.word}</h2>
      <p class="font-semibold">Meaning /Pronounciation</p>
      <div class="font-bangla text-medium text-2xl">"${word.meaning} / ${word.pronunciation}" </div>
      <div class="flex justify-between items-center">
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>

      </div>
    </div>
    `
    wordContainer.append(card)
    });

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
        <button onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button >
    `;
    // 4. Append into container 
    levelContainer.append(btnDiv);
    console.log(levelContainer)
    }
    
}
loadLessons()