const loadLessons =() =>{
    fetch('https://openapi.programming-hero.com/api/levels/all') //response Promise
    .then(res => res.json())
    .then(json => displayLesson(json.data))
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
        <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button >
    `;
    // 4. Append into container 
    levelContainer.append(btnDiv);
    console.log(levelContainer)
    }
    
}
loadLessons()