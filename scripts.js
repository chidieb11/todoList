let addBtn = document.getElementById('addBtn')

addBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    // console.log('clicks')

    let noteText = document.getElementById('note-text')
    if(noteText.value == ''){
        return alert('Please fill out the field provided!')
    }

    let notesObj;
    let notes = localStorage.getItem('notes')
    if(notes == null){
        notesObj = []
    } else{
        notesObj = JSON.parse(notes)
    }

    let myObj;
    myObj = {
        text: noteText.value
    }
    notesObj.unshift(myObj)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    console.log(notesObj)

    noteText.value = ''

    showNotes()
})

// show notes
function showNotes(){
    let notes = localStorage.getItem('notes')
    if(notes == null){
        notesObj = []
    } else{
        notesObj = JSON.parse(notes)
    }

    let html = ''
    notesObj.forEach(function(element, index){
        html += `
        <div id="note">
            <p id="note-title">${element.text}</p>
            <button id="${index}" class="editBtn" onclick="editNote(this.id)">Edit</button>
            <button id="${index}" class="deleteBtn" onclick="deleteNote(this.id)">Delete</button>
        </div>
        `
    })

    let notesElem = document.getElementById('notes')
    if(notesObj.length != 0){
        notesElem.innerHTML = html
    } else{
        notesElem.innerHTML = 'Nothing todo yet'
    }
}



// delete notes
function deleteNote(index){
    let confirmDel = confirm('You want to delete this item?')
    if(confirmDel == true){
        let notes = localStorage.getItem('notes')
        if(notes == null){
            notesObj = []
        } else{
            notesObj = JSON.parse(notes)
        }

        notesObj.splice(index, 1)
        localStorage.setItem('notes', JSON.stringify(notesObj))

        showNotes()
    }
}

// edit notes
function editNote(index){
    let notes = localStorage.getItem('notes')
    let noteText = document.getElementById('note-text')

    if(notes == null){
        notesObj = []
    } else{
        notesObj = JSON.parse(notes)
    }

    if(noteText.value !== ''){
        return alert('Field must be empty')
    }

    notesObj.findIndex(function(element, index){
        noteText.value = element.text
    })

    notesObj.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj))

    showNotes()
}

showNotes()