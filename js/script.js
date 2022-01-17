const name = document.getElementById('name');
const author = document.getElementById('author');
const isbn = document.getElementById('isbn');
const submitBtn = document.getElementById('submit');
const tbody = document.getElementById('tbody');
const clearBtn=document.getElementById('clear');

//alerts
const alertDelete = document.getElementById('alertDelete');
const alertAdd = document.getElementById('alertAdd');
const alertNoSubmit = document.getElementById('alertNoSubmit');

//Necessary Functions---starts

//localstorage functionalities
const findStorage = () => {
    return localStorage.getItem('bookStorage');
}

const clearStorage = () => {
    localStorage.removeItem('bookStorage');
}

const updateStorage = (data) => {
    localStorage.setItem('bookStorage', JSON.stringify(data));
}

const addToStorage = (bookInfo) => {
    const storage = JSON.parse(findStorage());
    console.log(storage);
    if (storage) {
        storage.push(bookInfo);
        updateStorage(storage);
    }
    else {
        const newStorage = [];
        newStorage.push(bookInfo);
        updateStorage(newStorage);
    }
}

const removeFromStorage = (isbn) => {
    const currentStorage = JSON.parse(findStorage());
    const updatedStorage = currentStorage.filter(book => book.isbn !== isbn);
    updateStorage(updatedStorage);
}


//UI Operations
const removeBookFromUI = () => {
    if (document.getElementById('deleteBtn') !== null) {
        document.getElementById('deleteBtn').addEventListener('click', (e) => {
            e.preventDefault();
            e.target.parentElement.remove();
            removeFromStorage(e.target.previousElementSibling.textContent);
            alertDelete.classList.remove('d-none');
            alertDelete.classList.add('d-block');
            alertAdd.classList.remove('d-block');
            alertAdd.classList.add('d-none');
            alertNoSubmit.classList.remove('d-block');
            alertNoSubmit.classList.add('d-none');
            console.log('Deleted one book from the list!');
        })
    }
}
removeBookFromUI();

//Necessary Functions---ends


//DOM operations
document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const books = JSON.parse(findStorage());
    if (books?.length > 0) {
        books.forEach((book) => {
            const element = `
                <tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td class="btn" id="deleteBtn">x</td>
                </tr>
            `;
            tbody.insertAdjacentHTML('afterbegin', element);

            //manage remove from ui & manage remove from localstorage
            removeBookFromUI();
        })
    }
    else {
        return;
    }
})
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    //get all values;
    const bookName = name.value;
    const authorName = author.value;
    const isbnData = isbn.value;

    if ((bookName.length < 1) || (authorName.length < 1) || (isbnData.length < 1)) {
        alertDelete.classList.remove('d-block');
        alertDelete.classList.add('d-none');
        alertAdd.classList.remove('d-block');
        alertAdd.classList.add('d-none');
        alertNoSubmit.classList.remove('d-none');
        alertNoSubmit.classList.add('d-block');
        return;
    }
    else {
        console.log(bookName.length, authorName.length, isbnData.length);
        alertDelete.classList.remove('d-block');
        alertDelete.classList.add('d-none');
        alertNoSubmit.classList.remove('d-block');
        alertNoSubmit.classList.add('d-none');
        alertAdd.classList.remove('d-none');
        alertAdd.classList.add('d-block');

        //add to the list
        const element = `
        <tr>
            <td>${bookName}</td>
            <td>${authorName}</td>
            <td>${isbnData}</td>
            <td class="btn" id="deleteBtn">x</td>
        </tr>
        `;
        tbody.insertAdjacentHTML('afterbegin', element);
        //add to the localstorage
        addToStorage({ name: bookName, author: authorName, isbn: isbnData });
        //manage remove from ui & manage remove from localstorage
        removeBookFromUI();

    }
    console.log(bookName, authorName, isbnData);
    name.value = "";
    author.value = "";
    isbn.value = "";
});

alertDelete.addEventListener('click',()=>{
    alertDelete.classList.remove('d-block');
    alertDelete.classList.add('d-none');
})

alertNoSubmit.addEventListener('click',()=>{
    alertNoSubmit.classList.remove('d-block');
    alertNoSubmit.classList.add('d-none');
})

alertAdd.addEventListener('click',()=>{
    alertAdd.classList.remove('d-block');
    alertAdd.classList.add('d-none');
})

clearBtn.addEventListener('click',()=>{
    const storage=JSON.parse(findStorage());
    if(storage?.length>0){
        clearStorage();
        document.getElementById('tbody').innerHTML="";
    }
    else{
        return;
    }
});



