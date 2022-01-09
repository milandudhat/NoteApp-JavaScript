shownotes();

document.querySelector('#addnotes').addEventListener('click', function () {
    document.getElementById('addnotes').style.display = "none";
    document.getElementById('search').style.display = "flex";
    document.getElementById('Note-main-container').style.display = "block";
})

document.querySelector('.close-btn').addEventListener('click', function () {
    document.getElementById('Note-main-container').style.display = "none";

    document.getElementById('addnotes').style.display = "flex";
    document.getElementById('search').style.display = "none";
})

document.querySelector('#save-btn').addEventListener('click', function () {

    
    let title = document.getElementById('title')
    let content = document.getElementById('content');
    let notes = localStorage.getItem('notes');

    if (title.value === '' || content.value === '') {
        show_error(fill_data);
        
    }
    else{
    if (notes == null) {

        notesobj = [];
    }
    else {

        notesobj = JSON.parse(notes)
    }
     
    let tempobj = {
        title : title.value , 
        content :content.value

    }

    notesobj.push(tempobj)

    localStorage.setItem('notes', JSON.stringify(notesobj));

    title.value = '';
    content.value = '';
    // console.log(notesobj);

    show_error(success_data);
    shownotes();
}
})

// here function for show all notes in localStorage
function shownotes() {
    // console.log("hey");
    let notes = localStorage.getItem('notes');

    if (notes == null) {

        notesobj = [];
    }
    else {

        notesobj = JSON.parse(notes)
    }
    let defaulthtml = `<div class="container-sm px-4 my-4" id="alert-cont">
    <hr>
    <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">You don't have any notes</h4>
        <hr>
        <p class="mb-0">Enter Notes in OneNote book app</p>
    </div>
</div>`;
    let displaynotes = ``;
    notesobj.forEach(function (element, index) {
        displaynotes += `<div id="notes" class="container-sm my-4 px-5 notecard">
            <div class="note-card card mb-1 mx-5">
            <div class="card-body card m-3 shadow-sm bg-white rounded">
                <h5>${element.title}</h5>
                <p class="mb-0">${element.content}</p>
                <hr>
                <div class="text-center ">
                <button type="button" class=" mt-0 mb-0 btn btn-primary my-2" id="${index}" onclick="deletefunc(this.id)">Delete</button>
            </div>
            </div>
            </div>
        </div>`;
    });

    let notesele = document.getElementById('notes');
    if (notesobj.length !== 0) {
        notesele.innerHTML = displaynotes;
        // document.getElementById('alert-cont').style.display = "none";
    }
    else {
        notesele.innerHTML = defaulthtml;
    }
}



// delete note from notebook
function deletefunc(index) {

    show_error(delete_data);
    
    let notes = localStorage.getItem('notes');

    if (notes == null) {

        notesobj = [];
    }
    else {

        notesobj = JSON.parse(notes)
    }

    notesobj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    document.addEventListener('DOMContentLoaded', shownotes());
    shownotes();
}







let search = document.getElementById('search-txt');
search.addEventListener("input", function () {
    // console.log("input event fire");

    document.getElementById('Note-main-container').style.display = "none";


    let inputval = search.value.toLowerCase();
    // console.log("inpuut event fired",inputval);

    let notecard = document.getElementsByClassName('notecard');

    Array.from(notecard).forEach(function (ele) {
        let divtxt = ele.getElementsByTagName('p')[0].innerText;
        // console.log(divtxt);

        if (divtxt.includes(inputval)) {
            ele.style.display = 'block';

        }
        else {
            ele.style.display = 'none';
        }



    })
})




// alert function 
function show_error(err_type) {

    switch (err_type) {
        case fill_data:
            document.getElementById('fill_data').style = "display:block;";
            setTimeout(() => document.getElementById('fill_data').style = "display:none;", 500);
            break;
        case delete_data:
            document.getElementById('delete_data').style = "display:block;";
            setTimeout(() => document.getElementById('delete_data').style = "display:none;", 500);
            break;
        case success_data:
            document.getElementById('success_data').style = "display:block;";
            setTimeout(() => document.getElementById('success_data').style = "display:none;", 500);
            break;
        case update_data:
            document.getElementById('update_data').style = "display:block;";
            setTimeout(() => document.getElementById('update_data').style = "display:none;", 500);
            break;
    }

}



