function showRecipe(id) {
    document.getElementById(id).style.display = 'block';
}

function closeRecipe(id) {
    document.getElementById(id).style.display = 'none';
}

function bookmarkFood(foodName) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    if (!bookmarks.includes(foodName)) {
        bookmarks.push(foodName);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        alert(`${foodName} has been bookmarked!`);
    } else {
        alert(`${foodName} is already bookmarked.`);
    }
}
